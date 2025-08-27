from flask import Blueprint, jsonify, request, current_app
from models import db, User, Project, ProjectMilestone, ProjectApplication, ProjectImpactReport, NGOProfile, AIMatch, Company, NGORiskAssessment, ApprovalRequest, ApprovalStep, ImpactMetricSnapshot, ImpactTimeSeries, ImpactRegionStat, ImpactGoal, ProjectTrackingInfo, ProjectTimelineEntry
from utils import decode_token
import json
from datetime import datetime

projects_bp = Blueprint('projects', __name__)


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


@projects_bp.get('/projects')
def list_projects():
    """Get all projects with optional filtering (public)"""
    
    # Get query parameters for filtering
    status = request.args.get('status')
    sdg_goal = request.args.get('sdg_goal')
    focus_area = request.args.get('focus_area')
    location = request.args.get('location')
    min_budget = request.args.get('min_budget')
    max_budget = request.args.get('max_budget')
    
    # Start with base query
    query = Project.query
    
    # Apply filters
    if status:
        query = query.filter(Project.status == status)
    if sdg_goal:
        query = query.filter(Project.sdg_goals.contains(str(sdg_goal)))
    if focus_area:
        query = query.filter(Project.csr_focus_areas.contains(focus_area))
    if location:
        query = query.filter(
            (Project.location_city.contains(location)) |
            (Project.location_region.contains(location)) |
            (Project.location_country.contains(location))
        )
    if min_budget:
        query = query.filter(Project.funding_required >= float(min_budget))
    if max_budget:
        query = query.filter(Project.funding_required <= float(max_budget))
    
    # Get projects
    projects = query.order_by(Project.created_at.desc()).all()
    
    return jsonify({
        'projects': [project.to_dict() for project in projects],
        'total': len(projects)
    })


@projects_bp.get('/ai-matches')
def list_ai_matches():
    """Get AI matches combining company and project data (public)"""
    company_id = request.args.get('company_id', type=int)
    min_score = request.args.get('min_score', default=0, type=int)

    query = AIMatch.query
    if company_id:
        query = query.filter(AIMatch.company_id == company_id)
    if min_score:
        query = query.filter(AIMatch.alignment_score >= min_score)

    matches = query.order_by(AIMatch.alignment_score.desc()).limit(100).all()
    return jsonify([m.to_dict() for m in matches])


@projects_bp.get('/ngo-risk')
def list_ngo_risk():
    """Summaries for NGO risk scoring page (public)"""
    # Optional filters
    q = request.args.get('q', type=str)
    risk = request.args.get('risk', type=str)

    query = NGORiskAssessment.query.join(NGOProfile, NGORiskAssessment.ngo_id == NGOProfile.id)
    if q:
        like = f"%{q.lower()}%"
        query = query.filter(db.func.lower(NGOProfile.name).like(like))
    if risk and risk in ('Low', 'Medium', 'High'):
        query = query.filter(NGORiskAssessment.risk_level == risk)

    items = query.order_by(NGORiskAssessment.updated_at.desc()).limit(200).all()
    ngos = [i.to_summary() for i in items]

    # Headline counts
    total = len(ngos)
    low = sum(1 for n in ngos if n['risk'] == 'Low')
    medium = sum(1 for n in ngos if n['risk'] == 'Medium')
    high = sum(1 for n in ngos if n['risk'] == 'High')

    return jsonify({
        'ngos': ngos,
        'metrics': { 'total': total, 'low': low, 'medium': medium, 'high': high }
    })


@projects_bp.get('/ngo-risk/<int:ngo_id>')
def get_ngo_risk_detail(ngo_id: int):
    item = NGORiskAssessment.query.filter_by(ngo_id=ngo_id).order_by(NGORiskAssessment.updated_at.desc()).first()
    if not item:
        return jsonify({'error': 'Risk assessment not found'}), 404
    return jsonify(item.to_detail())


# Approval workflow endpoints (public for dev)
@projects_bp.post('/approvals')
def create_approval():
    data = request.get_json() or {}
    req = ApprovalRequest(
        project_id=data.get('project_id'),
        company_id=data.get('company_id'),
        title=data.get('title') or 'Approval Request',
        summary=data.get('summary'),
        status=data.get('status', 'pending'),
        created_by=None,
    )
    db.session.add(req)
    db.session.flush()

    for idx, step in enumerate(data.get('steps') or []):
        db.session.add(ApprovalStep(
            request_id=req.id,
            name=step.get('name') or f'Step {idx+1}',
            order_index=step.get('order', idx),
            assignee_user_id=step.get('assignee_user_id'),
            assignee_role=step.get('assignee_role'),
            status=step.get('status', 'pending'),
            decision_notes=step.get('decision_notes')
        ))

    db.session.commit()
    return jsonify({'message': 'created', 'approval': req.to_dict()}), 201


@projects_bp.get('/approvals')
def list_approvals():
    q = ApprovalRequest.query.order_by(ApprovalRequest.created_at.desc()).limit(200).all()
    return jsonify([r.to_dict() for r in q])


@projects_bp.get('/approvals/<int:approval_id>')
def get_approval(approval_id: int):
    r = ApprovalRequest.query.get(approval_id)
    if not r:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(r.to_dict())


@projects_bp.put('/approvals/<int:approval_id>/steps/<int:step_id>')
def update_approval_step(approval_id: int, step_id: int):
    step = ApprovalStep.query.filter_by(id=step_id, request_id=approval_id).first()
    if not step:
        return jsonify({'error': 'Not found'}), 404
    data = request.get_json() or {}
    if 'status' in data:
        step.status = data['status']
        if data['status'] in ('approved', 'rejected'):
            step.decided_at = datetime.utcnow()
    if 'decision_notes' in data:
        step.decision_notes = data['decision_notes']
    db.session.commit()
    return jsonify(step.to_dict())


# Impact dashboard endpoints (public)
@projects_bp.get('/impact/overview')
def impact_overview():
    # latest snapshot (optionally scope by company_id)
    company_id = request.args.get('company_id', type=int)
    q = ImpactMetricSnapshot.query
    if company_id:
        q = q.filter(ImpactMetricSnapshot.company_id == company_id)
    snap = q.order_by(ImpactMetricSnapshot.as_of_date.desc()).first()
    cards = snap.to_cards() if snap else []
    return jsonify({ 'cards': cards })


@projects_bp.get('/impact/trends')
def impact_trends():
    metric = request.args.get('metric', default='co2_reduced_tons', type=str)
    company_id = request.args.get('company_id', type=int)
    q = ImpactTimeSeries.query.filter(ImpactTimeSeries.metric_name == metric).order_by(ImpactTimeSeries.ts_date.asc())
    if company_id:
        q = q.filter(ImpactTimeSeries.company_id == company_id)
    points = [r.to_point() for r in q.limit(365).all()]
    return jsonify({ 'metric': metric, 'series': points })


@projects_bp.get('/impact/regions')
def impact_regions():
    metric = request.args.get('metric', default='co2_reduced_tons', type=str)
    period = request.args.get('period', type=str)
    company_id = request.args.get('company_id', type=int)
    q = ImpactRegionStat.query.filter(ImpactRegionStat.metric_name == metric)
    if period:
        q = q.filter(ImpactRegionStat.period_month == period)
    if company_id:
        q = q.filter(ImpactRegionStat.company_id == company_id)
    rows = [r.to_row() for r in q.limit(1000).all()]
    return jsonify({ 'metric': metric, 'rows': rows })


@projects_bp.get('/impact/goals')
def impact_goals():
    company_id = request.args.get('company_id', type=int)
    q = ImpactGoal.query
    if company_id:
        q = q.filter(ImpactGoal.company_id == company_id)
    goals = [g.to_dict() for g in q.order_by(ImpactGoal.period_month.asc()).limit(100).all()]
    return jsonify({ 'goals': goals })


# Project tracker endpoints (public)
@projects_bp.get('/tracker/projects')
def tracker_projects():
    status = request.args.get('status')  # all | on-track | delayed | completed
    q = db.session.query(ProjectTrackingInfo).join(Project, ProjectTrackingInfo.project_id == Project.id)
    if status and status != 'all':
        q = q.filter(ProjectTrackingInfo.status == status)
    items = q.order_by(ProjectTrackingInfo.updated_at.desc()).limit(200).all()
    return jsonify([i.to_card() for i in items])


@projects_bp.get('/tracker/timeline')
def tracker_timeline():
    items = ProjectTimelineEntry.query.order_by(ProjectTimelineEntry.created_at.asc()).limit(50).all()
    return jsonify([i.to_item() for i in items])


@projects_bp.get('/projects/<int:project_id>')
def get_project(project_id):
    """Get specific project details (public)"""
    
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    return jsonify(project.to_dict())


@projects_bp.post('/projects')
def create_project():
    """Create a new project (no auth required)"""
    user = get_current_user()
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        # Parse dates
        start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d').date() if data.get('start_date') else None
        end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d').date() if data.get('end_date') else None
        
        # Fallback to a guest user if unauthenticated
        if not user:
            guest = User.query.filter_by(email='guest@sustainalign.local').first()
            if not guest:
                from utils import hash_password
                guest = User(email='guest@sustainalign.local', password_hash=hash_password('guest'), role='guest')
                db.session.add(guest)
                db.session.flush()
            user = guest

        # Create project
        project = Project(
            title=data.get('title'),
            short_description=data.get('short_description'),
            ngo_name=data.get('ngo_name'),
            location_city=data.get('location_city'),
            location_region=data.get('location_region'),
            location_country=data.get('location_country'),
            total_project_cost=data.get('total_project_cost'),
            funding_required=data.get('funding_required'),
            currency=data.get('currency', 'INR'),
            csr_eligibility=data.get('csr_eligibility', True),
            preferred_contribution_type=data.get('preferred_contribution_type'),
            start_date=start_date,
            end_date=end_date,
            ngo_registration_number=data.get('ngo_registration_number'),
            ngo_80g_status=data.get('ngo_80g_status'),
            ngo_fcra_status=data.get('ngo_fcra_status'),
            ngo_rating=data.get('ngo_rating'),
            ngo_verification_badge=data.get('ngo_verification_badge'),
            past_projects_completed=data.get('past_projects_completed', 0),
            status=data.get('status', 'draft'),
            visibility=data.get('visibility', 'public'),
            created_by=user.id
        )
        
        # Set JSON fields using helper methods
        if data.get('sdg_goals'):
            project.set_sdg_goals(data['sdg_goals'])
        if data.get('csr_focus_areas'):
            project.set_csr_focus_areas(data['csr_focus_areas'])
        if data.get('target_beneficiaries'):
            project.set_target_beneficiaries(data['target_beneficiaries'])
        if data.get('expected_outcomes'):
            project.set_expected_outcomes(data['expected_outcomes'])
        if data.get('kpis'):
            project.set_kpis(data['kpis'])
        if data.get('past_impact'):
            project.set_past_impact(data['past_impact'])
        if data.get('project_images'):
            project.set_project_images(data['project_images'])
        
        # Set other fields
        if data.get('proposal_document_url'):
            project.proposal_document_url = data['proposal_document_url']
        if data.get('video_link'):
            project.video_link = data['video_link']
        
        # Calculate duration
        project.calculate_duration()
        
        db.session.add(project)
        db.session.commit()
        
        return jsonify({
            'message': 'Project created successfully',
            'project': project.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to create project: {str(e)}'}), 500


@projects_bp.put('/projects/<int:project_id>')
def update_project(project_id):
    """Update an existing project"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    # Check if user owns the project or has admin rights
    if project.created_by != user.id and user.role != 'admin':
        return jsonify({'error': 'Not authorized to update this project'}), 403
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        # Update basic fields
        if 'title' in data:
            project.title = data['title']
        if 'short_description' in data:
            project.short_description = data['short_description']
        if 'ngo_name' in data:
            project.ngo_name = data['ngo_name']
        if 'location_city' in data:
            project.location_city = data['location_city']
        if 'location_region' in data:
            project.location_region = data['location_region']
        if 'location_country' in data:
            project.location_country = data['location_country']
        if 'total_project_cost' in data:
            project.total_project_cost = data['total_project_cost']
        if 'funding_required' in data:
            project.funding_required = data['funding_required']
        if 'currency' in data:
            project.currency = data['currency']
        if 'csr_eligibility' in data:
            project.csr_eligibility = data['csr_eligibility']
        if 'preferred_contribution_type' in data:
            project.preferred_contribution_type = data['preferred_contribution_type']
        if 'status' in data:
            project.status = data['status']
        if 'visibility' in data:
            project.visibility = data['visibility']
        
        # Update dates
        if data.get('start_date'):
            project.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        if data.get('end_date'):
            project.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        
        # Update JSON fields
        if 'sdg_goals' in data:
            project.set_sdg_goals(data['sdg_goals'])
        if 'csr_focus_areas' in data:
            project.set_csr_focus_areas(data['csr_focus_areas'])
        if 'target_beneficiaries' in data:
            project.set_target_beneficiaries(data['target_beneficiaries'])
        if 'expected_outcomes' in data:
            project.set_expected_outcomes(data['expected_outcomes'])
        if 'kpis' in data:
            project.set_kpis(data['kpis'])
        if 'past_impact' in data:
            project.set_past_impact(data['past_impact'])
        if 'project_images' in data:
            project.set_project_images(data['project_images'])
        
        # Update other fields
        if 'proposal_document_url' in data:
            project.proposal_document_url = data['proposal_document_url']
        if 'video_link' in data:
            project.video_link = data['video_link']
        
        # Recalculate duration if dates changed
        if 'start_date' in data or 'end_date' in data:
            project.calculate_duration()
        
        project.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Project updated successfully',
            'project': project.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update project: {str(e)}'}), 500


@projects_bp.delete('/projects/<int:project_id>')
def delete_project(project_id):
    """Delete a project"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    # Check if user owns the project or has admin rights
    if project.created_by != user.id and user.role != 'admin':
        return jsonify({'error': 'Not authorized to delete this project'}), 403
    
    try:
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': 'Project deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to delete project: {str(e)}'}), 500


@projects_bp.get('/projects/<int:project_id>/milestones')
def get_project_milestones(project_id):
    """Get milestones for a specific project"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    milestones = ProjectMilestone.query.filter_by(project_id=project_id).order_by(ProjectMilestone.target_date).all()
    
    return jsonify({
        'milestones': [milestone.to_dict() for milestone in milestones]
    })


@projects_bp.post('/projects/<int:project_id>/milestones')
def create_project_milestone(project_id):
    """Create a milestone for a project"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    # Check if user owns the project or has admin rights
    if project.created_by != user.id and user.role != 'admin':
        return jsonify({'error': 'Not authorized to create milestones for this project'}), 403
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        target_date = datetime.strptime(data.get('target_date'), '%Y-%m-%d').date() if data.get('target_date') else None
        
        milestone = ProjectMilestone(
            project_id=project_id,
            title=data.get('title'),
            description=data.get('description'),
            target_date=target_date,
            status=data.get('status', 'pending'),
            progress_percentage=data.get('progress_percentage', 0)
        )
        
        db.session.add(milestone)
        db.session.commit()
        
        return jsonify({
            'message': 'Milestone created successfully',
            'milestone': milestone.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to create milestone: {str(e)}'}), 500


@projects_bp.get('/projects/<int:project_id>/applications')
def get_project_applications(project_id):
    """Get applications for a specific project"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    applications = ProjectApplication.query.filter_by(project_id=project_id).all()
    
    return jsonify({
        'applications': [application.to_dict() for application in applications]
    })


@projects_bp.post('/projects/<int:project_id>/apply')
def apply_to_project(project_id):
    """Apply to a project (for companies)"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    # Check if project is open for applications
    if project.status != 'published':
        return jsonify({'error': 'Project is not open for applications'}), 400
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        # Get user's company
        company = user.companies[0] if user.companies else None
        if not company:
            return jsonify({'error': 'No company profile found. Please create a company profile first.'}), 400
        
        # Check if already applied
        existing_application = ProjectApplication.query.filter_by(
            project_id=project_id, 
            company_id=company.id
        ).first()
        
        if existing_application:
            return jsonify({'error': 'Already applied to this project'}), 400
        
        application = ProjectApplication(
            project_id=project_id,
            company_id=company.id,
            application_type=data.get('application_type'),
            amount_offered=data.get('amount_offered'),
            contribution_details=data.get('contribution_details'),
            status='pending'
        )
        
        db.session.add(application)
        db.session.commit()
        
        return jsonify({
            'message': 'Application submitted successfully',
            'application': application.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to submit application: {str(e)}'}), 500


@projects_bp.get('/ngos')
def list_ngos():
    """Get all NGO profiles"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    # Get query parameters for filtering
    sector = request.args.get('sector')
    sdg_focus = request.args.get('sdg_focus')
    location = request.args.get('location')
    rating = request.args.get('rating')
    
    # Start with base query
    query = NGOProfile.query
    
    # Apply filters
    if sector:
        query = query.filter(NGOProfile.primary_sectors.contains(sector))
    if sdg_focus:
        query = query.filter(NGOProfile.sdg_focus.contains(str(sdg_focus)))
    if location:
        query = query.filter(
            (NGOProfile.city.contains(location)) |
            (NGOProfile.state.contains(location)) |
            (NGOProfile.country.contains(location))
        )
    if rating:
        query = query.filter(NGOProfile.rating >= int(rating))
    
    # Get NGOs
    ngos = query.order_by(NGOProfile.rating.desc()).all()
    
    return jsonify({
        'ngos': [ngo.to_dict() for ngo in ngos],
        'total': len(ngos)
    })


@projects_bp.get('/ngos/<int:ngo_id>')
def get_ngo(ngo_id):
    """Get specific NGO profile"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    ngo = NGOProfile.query.get(ngo_id)
    if not ngo:
        return jsonify({'error': 'NGO not found'}), 404
    
    return jsonify(ngo.to_dict())


