from flask import Blueprint, request, jsonify
from datetime import datetime
from models import ApprovalRequest, ApprovalStep, db
from functools import wraps

approvals_bp = Blueprint('approvals', __name__)


def require_auth(f):
    """Decorator to require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # For development, we'll be more flexible with authentication
        auth_header = request.headers.get('Authorization')
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            # TODO: Implement proper JWT validation
            # For now, we'll assume the token contains user info
            request.user_id = 1  # Default to first user for development
        else:
            # For development, allow requests without tokens
            # In production, this should require proper authentication
            request.user_id = 1  # Default to first user for development
        
        return f(*args, **kwargs)
    return decorated_function


@approvals_bp.route('/approvals', methods=['GET'])
@require_auth
def get_approvals():
    """Get all approval requests for the authenticated user"""
    try:
        # For now, return all approvals (in production, filter by user/company)
        approvals = ApprovalRequest.query.all()
        return jsonify({
            'success': True,
            'approvals': [approval.to_dict() for approval in approvals]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals/<int:approval_id>', methods=['GET'])
@require_auth
def get_approval(approval_id):
    """Get a specific approval request by ID"""
    try:
        approval = ApprovalRequest.query.get_or_404(approval_id)
        return jsonify({
            'success': True,
            'approval': approval.to_dict()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals', methods=['POST'])
@require_auth
def create_approval():
    """Create a new approval request"""
    try:
        data = request.get_json()
        
        # Create the approval request
        approval = ApprovalRequest(
            project_id=data.get('projectId'),
            company_id=data.get('companyId'),
            title=data.get('title'),
            summary=data.get('summary'),
            status=data.get('status', 'pending'),
            ai_recommendation=data.get('aiRecommendation'),
            compliance_notes=data.get('complianceNotes'),
            compliance_metrics=data.get('complianceMetrics'),
            created_by=data.get('createdBy')
        )
        
        db.session.add(approval)
        db.session.flush()  # Get the ID without committing
        
        # Create approval steps if provided
        if 'steps' in data:
            for step_data in data['steps']:
                step = ApprovalStep(
                    request_id=approval.id,
                    name=step_data.get('name'),
                    order_index=step_data.get('order', 0),
                    assignee_user_id=step_data.get('assigneeUserId'),
                    assignee_role=step_data.get('assigneeRole'),
                    status=step_data.get('status', 'pending')
                )
                db.session.add(step)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'approval': approval.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals/<int:approval_id>', methods=['PUT'])
@require_auth
def update_approval(approval_id):
    """Update an approval request"""
    try:
        approval = ApprovalRequest.query.get_or_404(approval_id)
        data = request.get_json()
        
        # Update fields
        if 'title' in data:
            approval.title = data['title']
        if 'summary' in data:
            approval.summary = data['summary']
        if 'status' in data:
            approval.status = data['status']
        if 'aiRecommendation' in data:
            approval.ai_recommendation = data['aiRecommendation']
        if 'complianceNotes' in data:
            approval.compliance_notes = data['complianceNotes']
        if 'complianceMetrics' in data:
            approval.compliance_metrics = data['complianceMetrics']
        
        approval.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'approval': approval.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals/<int:approval_id>', methods=['DELETE'])
@require_auth
def delete_approval(approval_id):
    """Delete an approval request"""
    try:
        approval = ApprovalRequest.query.get_or_404(approval_id)
        db.session.delete(approval)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Approval request deleted successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals/<int:approval_id>/steps', methods=['GET'])
@require_auth
def get_approval_steps(approval_id):
    """Get all steps for an approval request"""
    try:
        approval = ApprovalRequest.query.get_or_404(approval_id)
        steps = ApprovalStep.query.filter_by(request_id=approval_id).order_by(ApprovalStep.order_index).all()
        
        return jsonify({
            'success': True,
            'steps': [step.to_dict() for step in steps]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals/<int:approval_id>/steps', methods=['POST'])
@require_auth
def create_approval_step(approval_id):
    """Create a new step for an approval request"""
    try:
        approval = ApprovalRequest.query.get_or_404(approval_id)
        data = request.get_json()
        
        step = ApprovalStep(
            request_id=approval_id,
            name=data.get('name'),
            order_index=data.get('order', 0),
            assignee_user_id=data.get('assigneeUserId'),
            assignee_role=data.get('assigneeRole'),
            status=data.get('status', 'pending')
        )
        
        db.session.add(step)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'step': step.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals/<int:approval_id>/steps/<int:step_id>', methods=['GET'])
@require_auth
def get_approval_step(approval_id, step_id):
    """Get a specific step for an approval request"""
    try:
        step = ApprovalStep.query.filter_by(request_id=approval_id, id=step_id).first_or_404()
        
        return jsonify({
            'success': True,
            'step': step.to_dict()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals/<int:approval_id>/steps/<int:step_id>', methods=['PUT'])
@require_auth
def update_approval_step(approval_id, step_id):
    """Update a specific step for an approval request"""
    try:
        step = ApprovalStep.query.filter_by(request_id=approval_id, id=step_id).first_or_404()
        data = request.get_json()
        
        # Update step fields
        if 'name' in data:
            step.name = data['name']
        if 'order' in data:
            step.order_index = data['order']
        if 'assigneeUserId' in data:
            step.assignee_user_id = data['assigneeUserId']
        if 'assigneeRole' in data:
            step.assignee_role = data['assigneeRole']
        if 'status' in data:
            step.status = data['status']
        if 'decisionNotes' in data:
            step.decision_notes = data['decisionNotes']
        
        # Set decided_at if status is being changed to approved/rejected
        if 'status' in data and data['status'] in ['approved', 'rejected']:
            step.decided_at = datetime.utcnow()
        
        db.session.commit()
        
        # Recompute the overall approval status
        approval = ApprovalRequest.query.get(approval_id)
        if approval:
            approval.recompute_status()
            db.session.commit()
        
        return jsonify({
            'success': True,
            'step': step.to_dict(),
            'approval': approval.to_dict() if approval else None
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals/<int:approval_id>/steps/<int:step_id>', methods=['DELETE'])
@require_auth
def delete_approval_step(approval_id, step_id):
    """Delete a specific step for an approval request"""
    try:
        step = ApprovalStep.query.filter_by(request_id=approval_id, id=step_id).first_or_404()
        db.session.delete(step)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Approval step deleted successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@approvals_bp.route('/approvals/<int:approval_id>/steps/<int:step_id>/status', methods=['PUT'])
@require_auth
def update_step_status(approval_id, step_id):
    """Update just the status of a step (convenience endpoint)"""
    try:
        step = ApprovalStep.query.filter_by(request_id=approval_id, id=step_id).first_or_404()
        data = request.get_json()
        
        if 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
        
        old_status = step.status
        step.status = data['status']
        
        # Set decided_at if status is being changed to approved/rejected
        if data['status'] in ['approved', 'rejected']:
            step.decided_at = datetime.utcnow()
        
        # Add decision notes if provided
        if 'decisionNotes' in data:
            step.decision_notes = data['decisionNotes']
        
        db.session.commit()
        
        # Recompute the overall approval status
        approval = ApprovalRequest.query.get(approval_id)
        if approval:
            approval.recompute_status()
            db.session.commit()
        
        return jsonify({
            'success': True,
            'step': step.to_dict(),
            'approval': approval.to_dict() if approval else None,
            'message': f'Step status updated from {old_status} to {data["status"]}'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
