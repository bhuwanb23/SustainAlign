from flask import Blueprint, jsonify, request, current_app
import os
from models import db, User, Company, CompanyBranch, CSRContact, Budget, FocusArea, ComplianceDocument, NGOPreference, AIConfig, UserRole, Project, NGOProfile
from utils import decode_token, hash_password
import json

profile_bp = Blueprint('profile', __name__)


def get_current_user():
    """Get current user from JWT token"""
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    
    token = auth_header.split(' ')[1]
    payload = decode_token(token)
    if not payload or 'user_id' not in payload:
        return None
    
    return User.query.get(payload['user_id'])


@profile_bp.get('/test-dev')
def test_dev_mode():
    """Test endpoint to verify development mode detection"""
    is_dev = (
        current_app.config.get('ENV') == 'development' or
        current_app.config.get('FLASK_ENV') == 'development' or
        current_app.debug or
        os.environ.get('FLASK_ENV') == 'development' or
        os.environ.get('FLASK_DEBUG') == '1' or
        str(os.environ.get('DEV_NO_AUTH', '')).lower() in ('1', 'true', 'yes')
    )
    
    return jsonify({
        'debug_mode': current_app.debug,
        'env': current_app.config.get('ENV'),
        'flask_env': os.environ.get('FLASK_ENV'),
        'flask_debug': os.environ.get('FLASK_DEBUG'),
        'dev_no_auth': os.environ.get('DEV_NO_AUTH'),
        'is_development': is_dev
    })

@profile_bp.post('/ngo-onboarding')
def save_ngo_onboarding():
    """Save NGO onboarding data by creating/updating NGOProfile and a starter Project."""
    user = get_current_user()
    # Always allow fallback to guest NGO user if unauthenticated
    if not user:
        guest_email = 'guest-ngo@sustainalign.local'
        user = User.query.filter_by(email=guest_email).first()
        if not user:
            try:
                user = User(email=guest_email, password_hash=hash_password('guest'), role='ngo')
                db.session.add(user)
                db.session.flush()
            except Exception:
                db.session.rollback()
                return jsonify({'error': 'Failed to initialize guest user'}), 500

    data = request.get_json() or {}

    try:
        # Create or fetch NGO profile by name
        ngo_name = (data.get('ngo') or '').strip() or 'NGO'
        ngo = NGOProfile.query.filter_by(name=ngo_name).first()
        if not ngo:
            ngo = NGOProfile(name=ngo_name, country='India')
            db.session.add(ngo)
        if data.get('region'):
            ngo.city = data.get('region')
        if data.get('verification'):
            ngo.verification_badge = data.get('verification')
        # Enrich NGOProfile from onboarding data
        if data.get('sector'):
            ngo.primary_sectors = data.get('sector')
        if data.get('sdgs'):
            ngo.sdg_focus = data.get('sdgs')  # store as semicolon- or comma-separated string
        if data.get('region'):
            ngo.geographic_focus = data.get('region')
        try:
            ngo.annual_budget = float(data.get('allocated') or 0)
        except Exception:
            ngo.annual_budget = 0
        ngo.currency = 'INR'
        ngo.status = 'active'
        db.session.flush()

        # Build a starter project from onboarding
        from datetime import datetime, date
        def parse_date(s):
            try:
                return datetime.strptime(s, '%Y-%m-%d').date()
            except Exception:
                return date.today()

        title = (data.get('title') or 'Untitled Project').strip()
        start_date = parse_date(data.get('start') or '')
        end_date = parse_date(data.get('end') or '')

        project = Project(
            title=title,
            short_description=f"{data.get('sector') or ''} · {data.get('region') or ''}",
            ngo_name=ngo_name,
            location_city='',
            location_region=data.get('region') or '',
            location_country='India',
            total_project_cost=float(data.get('allocated') or 0),
            funding_required=float(data.get('remaining') or 0),
            currency='INR',
            csr_eligibility=True,
            preferred_contribution_type='cash',
            start_date=start_date,
            end_date=end_date,
            ngo_registration_number=None,
            ngo_80g_status=None,
            ngo_fcra_status=None,
            ngo_rating=None,
            ngo_verification_badge=data.get('verification') or 'Pending',
            past_projects_completed=0,
            status='draft',
            visibility='public',
            created_by=(user.id if user else None)
        )

        sdgs = [s.strip() for s in (data.get('sdgs') or '').split(';') if s.strip()]
        if sdgs:
            project.set_sdg_goals(sdgs)
        if data.get('sector'):
            project.set_csr_focus_areas([data.get('sector')])

        kpis = {}
        if data.get('kpi1'): kpis['kpi1'] = data.get('kpi1')
        if data.get('kpi2'): kpis['kpi2'] = data.get('kpi2')
        if data.get('kpi3'): kpis['kpi3'] = data.get('kpi3')
        if data.get('kpi4'): kpis['kpi4'] = data.get('kpi4')
        if kpis:
            project.set_kpis(kpis)

        db.session.add(project)
        db.session.commit()

        return jsonify({'message': 'Onboarding saved', 'ngo': ngo.to_dict(), 'project': project.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"NGO onboarding save failed: {str(e)}")
        return jsonify({'error': 'Failed to save onboarding'}), 500


@profile_bp.get('/me')
def me():
    """Get current user profile"""
    user = get_current_user()
    if not user:
        # Development fallback: return/create guest user
        guest_email = 'guest@sustainalign.local'
        user = User.query.filter_by(email=guest_email).first()
        if not user:
            try:
                user = User(email=guest_email, password_hash=hash_password('guest'), role='corporate')
                db.session.add(user)
                db.session.commit()
            except Exception:
                db.session.rollback()
                return jsonify({'error': 'Failed to initialize guest user'}), 500
    return jsonify(user.to_dict())


@profile_bp.get('/companies')
def get_companies():
    """Get all companies for current user"""
    user = get_current_user()
    if not user:
        # Development: return all companies to make UI work without auth
        companies = Company.query.order_by(Company.id.desc()).all()
    else:
        companies = Company.query.filter_by(user_id=user.id).all()
    return jsonify({
        'companies': [company.to_dict() for company in companies]
    })


@profile_bp.get('/companies/<int:company_id>')
def get_company(company_id):
    """Get specific company details"""
    user = get_current_user()
    if not user:
        # Development: allow fetching by id without user restriction
        company = Company.query.filter_by(id=company_id).first()
    else:
        company = Company.query.filter_by(id=company_id, user_id=user.id).first()
    if not company:
        return jsonify({'error': 'Company not found'}), 404
    
    return jsonify(company.to_dict())


@profile_bp.post('/companies')
def create_company():
    """Create a new company profile. In development, allow unauthenticated and use/create a guest user."""
    user = get_current_user()
    if not user:
        # Development fallback: create or reuse a guest user
        guest_email = 'guest@sustainalign.local'
        user = User.query.filter_by(email=guest_email).first()
        if not user:
            try:
                user = User(email=guest_email, password_hash=hash_password('guest'), role='corporate')
                db.session.add(user)
                db.session.flush()
            except Exception:
                db.session.rollback()
                return jsonify({'error': 'Failed to initialize guest user'}), 500
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        # Create main company record
        company = Company(
            user_id=user.id,
            company_name=data.get('company', {}).get('companyName', ''),
            logo_url=data.get('company', {}).get('logoFile', ''),
            registration_id=data.get('company', {}).get('registrationId', ''),
            industry=data.get('company', {}).get('industry', ''),
            hq_country=data.get('company', {}).get('hq', {}).get('country', ''),
            hq_state=data.get('company', {}).get('hq', {}).get('state', ''),
            hq_city=data.get('company', {}).get('hq', {}).get('city', ''),
            website=data.get('contact', {}).get('website', '')
        )
        
        db.session.add(company)
        db.session.flush()  # Get the company ID
        
        # Create company branches
        branches_data = data.get('company', {}).get('branches', [])
        for branch_data in branches_data:
            branch = CompanyBranch(
                company_id=company.id,
                country=branch_data.get('country', ''),
                state=branch_data.get('state', ''),
                city=branch_data.get('city', '')
            )
            db.session.add(branch)
        
        # Create CSR contact
        contact_data = data.get('contact', {})
        if contact_data:
            csr_contact = CSRContact(
                company_id=company.id,
                contact_name=contact_data.get('csrContactName', ''),
                contact_role=contact_data.get('csrContactRole', ''),
                email=contact_data.get('csrEmail', ''),
                phone=contact_data.get('csrPhone', '')
            )
            db.session.add(csr_contact)
        
        # Create budget
        budget_data = data.get('budget', {})
        if budget_data:
            budget = Budget(
                company_id=company.id,
                amount=budget_data.get('amount', 0),
                currency=budget_data.get('currency', 'INR'),
                project_size=budget_data.get('projectSize', 'Medium')
            )
            budget.set_splits(budget_data.get('splits', {}))
            db.session.add(budget)
        
        # Create focus area
        focus_data = data.get('focus', {})
        if focus_data:
            focus_area = FocusArea(
                company_id=company.id,
                esg_goals=focus_data.get('esgGoals', ''),
                themes=focus_data.get('themes', ''),
                target_year=focus_data.get('targetYear', ''),
                reporting_standard=focus_data.get('reportingStandard', '')
            )
            focus_area.set_priority_sdgs(focus_data.get('prioritySdgs', []))
            db.session.add(focus_area)
        
        # Create NGO preferences
        ngo_data = data.get('ngoPrefs', {})
        if ngo_data:
            ngo_prefs = NGOPreference(
                company_id=company.id,
                ngo_size=ngo_data.get('ngoSize', 'Mid-level'),
                partnership_model=ngo_data.get('partnershipModel', 'Funding + Execution'),
                spend_history=ngo_data.get('spendHistory', '')
            )
            ngo_prefs.set_regions(ngo_data.get('regions', []))
            db.session.add(ngo_prefs)
        
        # Create AI config
        ai_data = data.get('ai', {})
        if ai_data:
            ai_config = AIConfig(
                company_id=company.id,
                risk_appetite=ai_data.get('riskAppetite', 'Medium'),
                alignment_mode=ai_data.get('alignmentMode', 'Strict compliance')
            )
            ai_config.set_optimize_for(ai_data.get('optimizeFor', []))
            ai_config.set_integrations(ai_data.get('integrations', []))
            db.session.add(ai_config)
        
        # Create user roles
        access_data = data.get('access', {})
        roles_data = access_data.get('roles', [])
        for role_data in roles_data:
            user_role = UserRole(
                company_id=company.id,
                email=role_data.get('email', ''),
                role=role_data.get('role', 'CSR Manager')
            )
            db.session.add(user_role)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Company profile created successfully',
            'company': company.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error creating company: {str(e)}")
        return jsonify({'error': 'Failed to create company profile'}), 500


@profile_bp.put('/companies/<int:company_id>')
def update_company(company_id):
    """Update company profile"""
    user = get_current_user()
    if not user:
        # Development: allow update by id only
        company = Company.query.filter_by(id=company_id).first()
    else:
        company = Company.query.filter_by(id=company_id, user_id=user.id).first()
    if not company:
        return jsonify({'error': 'Company not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        # Update main company record
        company_data = data.get('company', {})
        if company_data:
            company.company_name = company_data.get('companyName', company.company_name)
            company.logo_url = company_data.get('logoFile', company.logo_url)
            company.registration_id = company_data.get('registrationId', company.registration_id)
            company.industry = company_data.get('industry', company.industry)
            company.hq_country = company_data.get('hq', {}).get('country', company.hq_country)
            company.hq_state = company_data.get('hq', {}).get('state', company.hq_state)
            company.hq_city = company_data.get('hq', {}).get('city', company.hq_city)
            company.website = data.get('contact', {}).get('website', company.website)
        
        # Update branches (delete existing and create new)
        CompanyBranch.query.filter_by(company_id=company.id).delete()
        branches_data = data.get('company', {}).get('branches', [])
        for branch_data in branches_data:
            branch = CompanyBranch(
                company_id=company.id,
                country=branch_data.get('country', ''),
                state=branch_data.get('state', ''),
                city=branch_data.get('city', '')
            )
            db.session.add(branch)
        
        # Update CSR contact
        contact_data = data.get('contact', {})
        if contact_data:
            if company.csr_contact:
                company.csr_contact.contact_name = contact_data.get('csrContactName', company.csr_contact.contact_name)
                company.csr_contact.contact_role = contact_data.get('csrContactRole', company.csr_contact.contact_role)
                company.csr_contact.email = contact_data.get('csrEmail', company.csr_contact.email)
                company.csr_contact.phone = contact_data.get('csrPhone', company.csr_contact.phone)
            else:
                csr_contact = CSRContact(
                    company_id=company.id,
                    contact_name=contact_data.get('csrContactName', ''),
                    contact_role=contact_data.get('csrContactRole', ''),
                    email=contact_data.get('csrEmail', ''),
                    phone=contact_data.get('csrPhone', '')
                )
                db.session.add(csr_contact)
        
        # Update budget
        budget_data = data.get('budget', {})
        if budget_data:
            if company.budget:
                company.budget.amount = budget_data.get('amount', company.budget.amount)
                company.budget.currency = budget_data.get('currency', company.budget.currency)
                company.budget.project_size = budget_data.get('projectSize', company.budget.project_size)
                company.budget.set_splits(budget_data.get('splits', {}))
            else:
                budget = Budget(
                    company_id=company.id,
                    amount=budget_data.get('amount', 0),
                    currency=budget_data.get('currency', 'INR'),
                    project_size=budget_data.get('projectSize', 'Medium')
                )
                budget.set_splits(budget_data.get('splits', {}))
                db.session.add(budget)
        
        # Update focus area
        focus_data = data.get('focus', {})
        if focus_data:
            if company.focus_area:
                company.focus_area.esg_goals = focus_data.get('esgGoals', company.focus_area.esg_goals)
                company.focus_area.themes = focus_data.get('themes', company.focus_area.themes)
                company.focus_area.target_year = focus_data.get('targetYear', company.focus_area.target_year)
                company.focus_area.reporting_standard = focus_data.get('reportingStandard', company.focus_area.reporting_standard)
                company.focus_area.set_priority_sdgs(focus_data.get('prioritySdgs', []))
            else:
                focus_area = FocusArea(
                    company_id=company.id,
                    esg_goals=focus_data.get('esgGoals', ''),
                    themes=focus_data.get('themes', ''),
                    target_year=focus_data.get('targetYear', ''),
                    reporting_standard=focus_data.get('reportingStandard', '')
                )
                focus_area.set_priority_sdgs(focus_data.get('prioritySdgs', []))
                db.session.add(focus_area)
        
        # Update NGO preferences
        ngo_data = data.get('ngoPrefs', {})
        if ngo_data:
            if company.ngo_preferences:
                company.ngo_preferences.ngo_size = ngo_data.get('ngoSize', company.ngo_preferences.ngo_size)
                company.ngo_preferences.partnership_model = ngo_data.get('partnershipModel', company.ngo_preferences.partnership_model)
                company.ngo_preferences.spend_history = ngo_data.get('spendHistory', company.ngo_preferences.spend_history)
                company.ngo_preferences.set_regions(ngo_data.get('regions', []))
            else:
                ngo_prefs = NGOPreference(
                    company_id=company.id,
                    ngo_size=ngo_data.get('ngoSize', 'Mid-level'),
                    partnership_model=ngo_data.get('partnershipModel', 'Funding + Execution'),
                    spend_history=ngo_data.get('spendHistory', '')
                )
                ngo_prefs.set_regions(ngo_data.get('regions', []))
                db.session.add(ngo_prefs)
        
        # Update AI config
        ai_data = data.get('ai', {})
        if ai_data:
            if company.ai_config:
                company.ai_config.risk_appetite = ai_data.get('riskAppetite', company.ai_config.risk_appetite)
                company.ai_config.alignment_mode = ai_data.get('alignmentMode', company.ai_config.alignment_mode)
                company.ai_config.set_optimize_for(ai_data.get('optimizeFor', []))
                company.ai_config.set_integrations(ai_data.get('integrations', []))
            else:
                ai_config = AIConfig(
                    company_id=company.id,
                    risk_appetite=ai_data.get('riskAppetite', 'Medium'),
                    alignment_mode=ai_data.get('alignmentMode', 'Strict compliance')
                )
                ai_config.set_optimize_for(ai_data.get('optimizeFor', []))
                ai_config.set_integrations(ai_data.get('integrations', []))
                db.session.add(ai_config)
        
        # Update user roles
        access_data = data.get('access', {})
        roles_data = access_data.get('roles', [])
        UserRole.query.filter_by(company_id=company.id).delete()
        for role_data in roles_data:
            user_role = UserRole(
                company_id=company.id,
                email=role_data.get('email', ''),
                role=role_data.get('role', 'CSR Manager')
            )
            db.session.add(user_role)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Company profile updated successfully',
            'company': company.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error updating company: {str(e)}")
        return jsonify({'error': 'Failed to update company profile'}), 500


@profile_bp.delete('/companies/<int:company_id>')
def delete_company(company_id):
    """Delete company profile"""
    user = get_current_user()
    if not user:
        company = Company.query.filter_by(id=company_id).first()
    else:
        company = Company.query.filter_by(id=company_id, user_id=user.id).first()
    if not company:
        return jsonify({'error': 'Company not found'}), 404
    
    try:
        db.session.delete(company)
        db.session.commit()
        
        return jsonify({'message': 'Company profile deleted successfully'})
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error deleting company: {str(e)}")
        return jsonify({'error': 'Failed to delete company profile'}), 500


@profile_bp.post('/companies/<int:company_id>/documents')
def upload_document(company_id):
    """Upload compliance document"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    company = Company.query.filter_by(id=company_id, user_id=user.id).first()
    if not company:
        return jsonify({'error': 'Company not found'}), 404
    
    # This is a placeholder for file upload functionality
    # In a real implementation, you would handle file upload here
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        document = ComplianceDocument(
            company_id=company.id,
            document_type=data.get('document_type', 'policy'),
            file_name=data.get('file_name', ''),
            file_url=data.get('file_url', ''),
            file_size=data.get('file_size', 0)
        )
        db.session.add(document)
        db.session.commit()
        
        return jsonify({
            'message': 'Document uploaded successfully',
            'document': document.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error uploading document: {str(e)}")
        return jsonify({'error': 'Failed to upload document'}), 500


