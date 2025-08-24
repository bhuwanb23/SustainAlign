from flask import Blueprint, jsonify, request, current_app
from models import db, User, Project, ProjectMilestone, ProjectApplication, ProjectImpactReport, NGOProfile
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
    """Get all projects with optional filtering"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
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


@projects_bp.get('/projects/<int:project_id>')
def get_project(project_id):
    """Get specific project details"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    return jsonify(project.to_dict())


@projects_bp.post('/projects')
def create_project():
    """Create a new project"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        # Parse dates
        start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d').date() if data.get('start_date') else None
        end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d').date() if data.get('end_date') else None
        
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


