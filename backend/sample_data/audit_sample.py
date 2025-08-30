"""
Sample Data for Audit Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json

# Sample Audit Events Data
SAMPLE_AUDIT_EVENTS = [
    {
        'id': 1,
        'entity_type': 'project',
        'entity_id': 1,
        'action': 'created',
        'actor_user_id': 1,
        'actor_role': 'corporate',
        'source': 'ui',
        'message': 'Project "Digital Literacy for Rural Women" created by TechCorp Solutions',
        'meta': {
            'project_title': 'Digital Literacy for Rural Women',
            'ngo_name': 'Women Empowerment Foundation',
            'funding_required': 1500000,
            'currency': 'INR'
        },
        'created_at': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'entity_type': 'project',
        'entity_id': 1,
        'action': 'status_changed',
        'actor_user_id': 1,
        'actor_role': 'corporate',
        'source': 'ui',
        'message': 'Project status changed from "draft" to "published"',
        'meta': {
            'old_status': 'draft',
            'new_status': 'published',
            'project_title': 'Digital Literacy for Rural Women'
        },
        'created_at': datetime(2024, 1, 15, 11, 45, 0)
    },
    {
        'id': 3,
        'entity_type': 'approval',
        'entity_id': 1,
        'action': 'created',
        'actor_user_id': 1,
        'actor_role': 'corporate',
        'source': 'ui',
        'message': 'Approval request created for Digital Literacy project',
        'meta': {
            'approval_title': 'Digital Literacy Project Funding Approval',
            'project_id': 1,
            'company_id': 1,
            'requested_amount': 1500000
        },
        'created_at': datetime(2024, 2, 15, 14, 30, 0)
    },
    {
        'id': 4,
        'entity_type': 'approval',
        'entity_id': 1,
        'action': 'status_changed',
        'actor_user_id': 1,
        'actor_role': 'CSR Manager',
        'source': 'ui',
        'message': 'Approval step "CSR Manager Review" completed with status "approved"',
        'meta': {
            'step_name': 'CSR Manager Review',
            'old_status': 'pending',
            'new_status': 'approved',
            'decision_notes': 'Excellent project alignment with our CSR focus'
        },
        'created_at': datetime(2024, 2, 18, 10, 30, 0)
    },
    {
        'id': 5,
        'entity_type': 'company',
        'entity_id': 1,
        'action': 'updated',
        'actor_user_id': 1,
        'actor_role': 'corporate',
        'source': 'ui',
        'message': 'Company profile updated for TechCorp Solutions',
        'meta': {
            'company_name': 'TechCorp Solutions Ltd.',
            'updated_fields': ['csr_budget', 'focus_areas', 'contact_info'],
            'budget_amount': 50000000
        },
        'created_at': datetime(2024, 1, 20, 16, 15, 0)
    },
    {
        'id': 6,
        'entity_type': 'ai_match',
        'entity_id': 1,
        'action': 'generated',
        'actor_user_id': None,
        'actor_role': 'system',
        'source': 'system',
        'message': 'AI match generated for Project 1 and Company 1 with 95% alignment score',
        'meta': {
            'project_id': 1,
            'company_id': 1,
            'alignment_score': 95,
            'investment_range': 'INR 1,000,000 - 1,500,000',
            'match_reasons': ['education_focus', 'women_empowerment', 'digital_literacy']
        },
        'created_at': datetime(2024, 2, 15, 15, 0, 0)
    },
    {
        'id': 7,
        'entity_type': 'report',
        'entity_id': 1,
        'action': 'generated',
        'actor_user_id': 1,
        'actor_role': 'corporate',
        'source': 'ui',
        'message': 'CSR Report generated for TechCorp Solutions Q1 2024',
        'meta': {
            'report_type': 'CSR Compliance',
            'period': 'Q1 2024',
            'company_id': 1,
            'report_format': 'PDF',
            'file_size': 2048576
        },
        'created_at': datetime(2024, 4, 1, 9, 30, 0)
    },
    {
        'id': 8,
        'entity_type': 'user',
        'entity_id': 1,
        'action': 'login',
        'actor_user_id': 1,
        'actor_role': 'corporate',
        'source': 'ui',
        'message': 'User login successful for csr.team@techcorp.com',
        'meta': {
            'email': 'csr.team@techcorp.com',
            'ip_address': '192.168.1.100',
            'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'session_duration': 3600
        },
        'created_at': datetime(2024, 4, 15, 8, 45, 0)
    },
    {
        'id': 9,
        'entity_type': 'project',
        'entity_id': 2,
        'action': 'created',
        'actor_user_id': 2,
        'actor_role': 'corporate',
        'source': 'ui',
        'message': 'Project "Clean Water Access in Tribal Villages" created by GreenEnergy Industries',
        'meta': {
            'project_title': 'Clean Water Access in Tribal Villages',
            'ngo_name': 'Water for All Foundation',
            'funding_required': 2000000,
            'currency': 'INR'
        },
        'created_at': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 10,
        'entity_type': 'approval',
        'entity_id': 2,
        'action': 'status_changed',
        'actor_user_id': 9,
        'actor_role': 'Board Member',
        'source': 'ui',
        'message': 'Approval request approved by Board Member',
        'meta': {
            'approval_title': 'Clean Water Project Partnership Approval',
            'final_status': 'approved',
            'total_steps': 3,
            'completed_steps': 3
        },
        'created_at': datetime(2024, 3, 25, 9, 30, 0)
    },
    {
        'id': 11,
        'entity_type': 'ngo_profile',
        'entity_id': 1,
        'action': 'created',
        'actor_user_id': 13,
        'actor_role': 'ngo',
        'source': 'ui',
        'message': 'NGO profile created for Women Empowerment Foundation',
        'meta': {
            'ngo_name': 'Women Empowerment Foundation',
            'registration_number': 'NGO-RAJ-2020-001',
            'verification_status': 'pending',
            'total_projects': 15
        },
        'created_at': datetime(2024, 1, 10, 12, 0, 0)
    },
    {
        'id': 12,
        'entity_type': 'ngo_profile',
        'entity_id': 1,
        'action': 'status_changed',
        'actor_user_id': 14,
        'actor_role': 'admin',
        'source': 'ui',
        'message': 'NGO verification status changed from "pending" to "verified"',
        'meta': {
            'ngo_name': 'Women Empowerment Foundation',
            'old_status': 'pending',
            'new_status': 'verified',
            'verification_notes': 'All documents verified and compliance confirmed'
        },
        'created_at': datetime(2024, 1, 12, 15, 30, 0)
    },
    {
        'id': 13,
        'entity_type': 'impact',
        'entity_id': 1,
        'action': 'recorded',
        'actor_user_id': 1,
        'actor_role': 'corporate',
        'source': 'ui',
        'message': 'Impact metrics recorded for Digital Literacy project',
        'meta': {
            'project_id': 1,
            'beneficiaries': 150,
            'centers_established': 8,
            'employment_generated': 25,
            'reporting_period': 'Q1 2024'
        },
        'created_at': datetime(2024, 4, 5, 12, 0, 0)
    },
    {
        'id': 14,
        'entity_type': 'user',
        'entity_id': 15,
        'action': 'created',
        'actor_user_id': None,
        'actor_role': 'system',
        'source': 'system',
        'message': 'New user account created for ngo@womenempowerment.org',
        'meta': {
            'email': 'ngo@womenempowerment.org',
            'role': 'ngo',
            'registration_method': 'signup_form',
            'verification_required': True
        },
        'created_at': datetime(2024, 1, 8, 10, 15, 0)
    },
    {
        'id': 15,
        'entity_type': 'system',
        'entity_id': None,
        'action': 'backup_completed',
        'actor_user_id': None,
        'actor_role': 'system',
        'source': 'scheduler',
        'message': 'Daily database backup completed successfully',
        'meta': {
            'backup_size': 52428800,
            'backup_location': '/backups/daily_2024_04_15.sql',
            'tables_backed_up': 15,
            'backup_duration': 120
        },
        'created_at': datetime(2024, 4, 15, 2, 0, 0)
    }
]

def get_sample_audit_events():
    """Return sample audit events data"""
    return SAMPLE_AUDIT_EVENTS

def get_all_sample_data():
    """Return all sample data for audit models"""
    return {
        'audit_events': SAMPLE_AUDIT_EVENTS
    }
