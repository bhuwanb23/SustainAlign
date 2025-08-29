from flask import Blueprint, jsonify, request, current_app
from models import db, User, Project, ProjectMilestone, ProjectApplication, ProjectImpactReport, NGOProfile, AIMatch, Company, NGORiskAssessment, ApprovalRequest, ApprovalStep, ImpactMetricSnapshot, ImpactTimeSeries, ImpactRegionStat, ImpactGoal, ProjectTrackingInfo, ProjectTimelineEntry, ReportJob, ReportArtifact, DecisionRationale, RationaleNote, AuditEvent, NGOImpactEvent, NGODocument, NGOTransparencyReport, NGOCertificate, NGOTestimonial
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from utils import decode_token
import json
from datetime import datetime

projects_bp = Blueprint('projects', __name__)
def ensure_column_exists(table_name: str, column_name: str, column_sql_type: str):
    try:
        inspector = db.inspect(db.engine)
        cols = {c['name'] for c in inspector.get_columns(table_name)}
        if column_name in cols:
            return
        with db.engine.begin() as conn:
            conn.execute(text(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_sql_type}"))
        current_app.logger.info(f"Added column {table_name}.{column_name}")
    except Exception as e:
        current_app.logger.warning(f"ensure_column_exists failed for {table_name}.{column_name}: {e}")



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


@projects_bp.put('/approvals/<int:approval_id>')
def update_approval(approval_id: int):
    r = ApprovalRequest.query.get(approval_id)
    if not r:
        return jsonify({'error': 'Not found'}), 404
    data = request.get_json() or {}
    if 'title' in data:
        r.title = data['title']
    if 'summary' in data:
        r.summary = data['summary']
    if 'status' in data:
        r.status = data['status']
    if 'aiRecommendation' in data:
        r.ai_recommendation = data['aiRecommendation']
    if 'complianceNotes' in data:
        r.compliance_notes = data['complianceNotes']
    if 'complianceMetrics' in data:
        r.compliance_metrics = data['complianceMetrics']
    db.session.commit()
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


@projects_bp.get('/tracker/projects/<int:project_id>')
def tracker_project_detail(project_id: int):
    rec = ProjectTrackingInfo.query.filter_by(project_id=project_id).first()
    if not rec:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(rec.to_detail())


# Audit trail endpoints (public)
@projects_bp.get('/audit-events')
def list_audit_events():
    entity_type = request.args.get('entity_type')
    entity_id = request.args.get('entity_id', type=int)
    q = AuditEvent.query.order_by(AuditEvent.created_at.desc())
    if entity_type:
        q = q.filter(AuditEvent.entity_type == entity_type)
    if entity_id:
        q = q.filter(AuditEvent.entity_id == entity_id)
    rows = [e.to_dict() for e in q.limit(500).all()]
    return jsonify(rows)


@projects_bp.post('/audit-events')
def create_audit_event():
    data = request.get_json() or {}
    evt = AuditEvent(
        entity_type=data.get('entity_type') or 'system',
        entity_id=data.get('entity_id'),
        action=data.get('action') or 'updated',
        actor_user_id=data.get('actor_user_id'),
        actor_role=data.get('actor_role'),
        source=data.get('source') or 'api',
        message=data.get('message'),
        metadata=data.get('metadata') or {},
    )
    db.session.add(evt)
    db.session.commit()
    return jsonify(evt.to_dict()), 201


# NGO marketplace endpoints (public)
@projects_bp.get('/ngos')
def list_ngos():
    try:
        ensure_column_exists('ngo_profiles', 'about', 'TEXT')
        # sanity check
        _ = db.inspect(db.engine).get_columns('ngo_profiles')
        rows = NGOProfile.query.order_by(NGOProfile.id.desc()).limit(200).all()
        return jsonify([r.to_summary() for r in rows])
    except OperationalError as oe:
        # Fallback path if column still missing: query minimal fields via raw SQL
        msg = str(oe)
        if 'no such column: ngo_profiles.about' in msg:
            try:
                ensure_column_exists('ngo_profiles', 'about', 'TEXT')
                # raw select limited fields
                sql = text("""
                    SELECT id, name, city, state, country, rating, verification_badge, primary_sectors, logo_url, profile_image_url, total_projects_completed, total_beneficiaries_reached
                    FROM ngo_profiles
                    ORDER BY id DESC LIMIT 200
                """)
                result = db.session.execute(sql).mappings().all()
                def parse_list(v):
                    try:
                        import json as _json
                        return _json.loads(v) if v else []
                    except Exception:
                        return []
                payload = []
                for r in result:
                    payload.append({
                        'id': r['id'],
                        'name': r['name'],
                        'location': { 'city': r['city'], 'state': r['state'], 'country': r['country'] },
                        'rating': r['rating'],
                        'verificationBadge': r['verification_badge'],
                        'sectors': parse_list(r['primary_sectors']),
                        'logoUrl': r['logo_url'],
                        'profileImageUrl': r['profile_image_url'],
                        'projectsCompleted': r['total_projects_completed'],
                        'beneficiariesReached': r['total_beneficiaries_reached'],
                    })
                return jsonify(payload)
            except Exception as e2:
                current_app.logger.error(f"/api/ngos raw fallback failed: {e2}")
                return jsonify({'error': 'failed', 'detail': str(e2)}), 500
        current_app.logger.error(f"/api/ngos operational error: {oe}")
        return jsonify({'error': 'failed', 'detail': msg}), 500
    except Exception as e:
        current_app.logger.error(f"/api/ngos failed: {e}")
        return jsonify({'error': 'failed', 'detail': str(e)}), 500


@projects_bp.get('/ngos/<int:ngo_id>')
def get_ngo(ngo_id: int):
    try:
        ensure_column_exists('ngo_profiles', 'about', 'TEXT')
        _ = db.inspect(db.engine).get_columns('ngo_profiles')
        ngo = NGOProfile.query.filter_by(id=ngo_id).first()
        if not ngo:
            return jsonify({'error': 'NGO not found'}), 404
        return jsonify(ngo.to_detail())
    except Exception as e:
        current_app.logger.error(f"/api/ngos/{ngo_id} failed: {e}")
        if current_app.debug:
            return jsonify({'error': 'failed', 'detail': str(e)}), 500
        return jsonify({'error': 'failed'}), 500

@projects_bp.get('/ngos/<int:ngo_id>/impact-timeline')
def ngo_impact_timeline(ngo_id: int):
    rows = NGOImpactEvent.query.filter_by(ngo_id=ngo_id).order_by(NGOImpactEvent.date.asc()).all()
    return jsonify([r.to_timeline_item() for r in rows])


@projects_bp.get('/ngos/<int:ngo_id>/documents')
def ngo_documents(ngo_id: int):
    rows = NGODocument.query.filter_by(ngo_id=ngo_id).order_by(NGODocument.uploaded_at.desc()).all()
    return jsonify([r.to_row() for r in rows])


@projects_bp.get('/ngos/<int:ngo_id>/transparency')
def ngo_transparency(ngo_id: int):
    rows = NGOTransparencyReport.query.filter_by(ngo_id=ngo_id).order_by(NGOTransparencyReport.created_at.desc()).limit(12).all()
    return jsonify([r.to_dict() for r in rows])


@projects_bp.get('/ngos/<int:ngo_id>/certificates')
def ngo_certificates(ngo_id: int):
    rows = NGOCertificate.query.filter_by(ngo_id=ngo_id).order_by(NGOCertificate.valid_until.desc().nullslast()).all()
    return jsonify([r.to_card() for r in rows])


@projects_bp.get('/ngos/<int:ngo_id>/testimonials')
def ngo_testimonials(ngo_id: int):
    rows = NGOTestimonial.query.filter_by(ngo_id=ngo_id).order_by(NGOTestimonial.created_at.desc()).limit(50).all()
    return jsonify([r.to_card() for r in rows])


# Reporting generator endpoints (public)
@projects_bp.post('/reports')
def create_report_job():
    data = request.get_json() or {}
    job = ReportJob(
        company_id=data.get('company_id'),
        period=data.get('period') or 'Q4 2024',
        report_type=data.get('report_type') or 'CSR Compliance',
        metrics=data.get('metrics') or {},
        status='queued',
        last_updated_human='just now'
    )
    db.session.add(job)
    db.session.commit()
    return jsonify(job.to_dict()), 201


@projects_bp.get('/reports')
def list_report_jobs():
    company_id = request.args.get('company_id', type=int)
    q = ReportJob.query.order_by(ReportJob.created_at.desc())
    if company_id:
        q = q.filter(ReportJob.company_id == company_id)
    jobs = [j.to_dict() for j in q.limit(50).all()]
    return jsonify(jobs)


@projects_bp.get('/reports/<int:job_id>')
def get_report_job(job_id: int):
    j = ReportJob.query.get(job_id)
    if not j:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(j.to_dict())


# Decision rationale endpoints (public)
@projects_bp.post('/rationales')
def create_rationale():
    data = request.get_json() or {}
    r = DecisionRationale(
        project_id=data.get('project_id'),
        company_id=data.get('company_id'),
        title=data.get('title') or 'Decision Rationale',
        context=data.get('context') or {},
        criteria=data.get('criteria') or {},
        options=data.get('options') or [],
        selected_option=data.get('selected_option'),
        pros=data.get('pros') or [],
        cons=data.get('cons') or [],
        reasoning_steps=data.get('reasoning_steps') or [],
        score_breakdown=data.get('score_breakdown') or {},
        attachments=data.get('attachments') or [],
    )
    db.session.add(r)
    db.session.commit()
    return jsonify(r.to_dict()), 201


@projects_bp.get('/rationales')
def list_rationales():
    project_id = request.args.get('project_id', type=int)
    q = DecisionRationale.query.order_by(DecisionRationale.created_at.desc())
    if project_id:
        q = q.filter(DecisionRationale.project_id == project_id)
    items = [i.to_dict() for i in q.limit(50).all()]
    return jsonify(items)


@projects_bp.get('/rationales/<int:rid>')
def get_rationale(rid: int):
    r = DecisionRationale.query.get(rid)
    if not r:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(r.to_dict())


@projects_bp.post('/rationales/<int:rid>/notes')
def add_rationale_note(rid: int):
    r = DecisionRationale.query.get(rid)
    if not r:
        return jsonify({'error': 'Not found'}), 404
    data = request.get_json() or {}
    n = RationaleNote(
        rationale_id=r.id,
        author=data.get('author'),
        content=data.get('content') or ''
    )
    db.session.add(n)
    db.session.commit()
    return jsonify(n.to_dict()), 201


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


