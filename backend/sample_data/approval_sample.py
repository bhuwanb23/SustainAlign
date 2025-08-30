"""
Sample Data for Approval Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json
from decimal import Decimal

# Sample Approval Requests Data
SAMPLE_APPROVAL_REQUESTS = [
    {
        'id': 1,
        'project_id': 1,
        'company_id': 1,
        'title': 'Digital Literacy Project Funding Approval',
        'summary': 'Request for funding approval of Digital Literacy for Rural Women project with Women Empowerment Foundation',
        'status': 'in_review',
        'ai_recommendation': {
            'label': 'Strongly Recommended',
            'confidencePct': 95,
            'reasons': [
                'Excellent alignment with company CSR focus areas',
                'Strong NGO credibility and track record',
                'Measurable impact metrics and clear outcomes',
                'Cost-effective implementation plan'
            ]
        },
        'compliance_notes': [
            'EPA certification required for digital equipment',
            'ISO 14001 compliance for environmental impact',
            'Local government permits for training centers',
            'Data protection compliance for digital literacy programs'
        ],
        'compliance_metrics': {
            'complianceConfidencePct': 95,
            'impactPositive': True,
            'roi': 'strong'
        },
        'created_by': 1,
        'created_at': datetime(2024, 2, 15, 14, 30, 0),
        'updated_at': datetime(2024, 2, 20, 10, 15, 0)
    },
    {
        'id': 2,
        'project_id': 2,
        'company_id': 2,
        'title': 'Clean Water Project Partnership Approval',
        'summary': 'Request for approval of Clean Water Access project partnership with Water for All Foundation',
        'status': 'approved',
        'ai_recommendation': {
            'label': 'Recommended',
            'confidencePct': 88,
            'reasons': [
                'Strong environmental impact alignment',
                'Proven technology and implementation approach',
                'Clear community engagement strategy',
                'Sustainable long-term maintenance plan'
            ]
        },
        'compliance_notes': [
            'Water quality testing certification required',
            'Solar equipment safety compliance',
            'Environmental impact assessment needed',
            'Community consultation documentation'
        ],
        'compliance_metrics': {
            'complianceConfidencePct': 92,
            'impactPositive': True,
            'roi': 'good'
        },
        'created_by': 2,
        'created_at': datetime(2024, 3, 10, 9, 45, 0),
        'updated_at': datetime(2024, 3, 25, 16, 30, 0)
    },
    {
        'id': 3,
        'project_id': 3,
        'company_id': 4,
        'title': 'Skill Development Project Approval',
        'summary': 'Request for approval of Skill Development for Urban Youth project with Youth Empowerment Society',
        'status': 'pending',
        'ai_recommendation': {
            'label': 'Recommended with Conditions',
            'confidencePct': 82,
            'reasons': [
                'Good alignment with educational technology goals',
                'Strong job placement track record',
                'Scalable implementation model',
                'Clear monitoring and evaluation framework'
            ]
        },
        'compliance_notes': [
            'Educational institution accreditation required',
            'Employment verification system needed',
            'Data privacy compliance for student records',
            'Quality assurance framework implementation'
        ],
        'compliance_metrics': {
            'complianceConfidencePct': 85,
            'impactPositive': True,
            'roi': 'moderate'
        },
        'created_by': 4,
        'created_at': datetime(2024, 4, 5, 11, 20, 0),
        'updated_at': datetime(2024, 4, 5, 11, 20, 0)
    },
    {
        'id': 4,
        'project_id': 4,
        'company_id': 3,
        'title': 'Healthcare Access Project Approval',
        'summary': 'Request for approval of Healthcare Access in Remote Areas project with Health for All Trust',
        'status': 'approved',
        'ai_recommendation': {
            'label': 'Strongly Recommended',
            'confidencePct': 96,
            'reasons': [
                'Perfect alignment with healthcare company mission',
                'Proven mobile healthcare implementation',
                'Strong community health impact',
                'Comprehensive medical compliance framework'
            ]
        },
        'compliance_notes': [
            'Medical equipment certification required',
            'Healthcare provider licensing compliance',
            'Patient data protection compliance',
            'Emergency response protocol documentation'
        ],
        'compliance_metrics': {
            'complianceConfidencePct': 98,
            'impactPositive': True,
            'roi': 'excellent'
        },
        'created_by': 3,
        'created_at': datetime(2024, 5, 12, 16, 15, 0),
        'updated_at': datetime(2024, 5, 28, 14, 45, 0)
    },
    {
        'id': 5,
        'project_id': 5,
        'company_id': 5,
        'title': 'Sustainable Agriculture Project Approval',
        'summary': 'Request for approval of Sustainable Agriculture Training project with Green Earth Foundation',
        'status': 'in_review',
        'ai_recommendation': {
            'label': 'Recommended',
            'confidencePct': 90,
            'reasons': [
                'Strong alignment with agricultural technology goals',
                'Proven sustainable farming methods',
                'Clear economic impact for farmers',
                'Environmental conservation benefits'
            ]
        },
        'compliance_notes': [
            'Agricultural certification compliance required',
            'Organic farming standards verification',
            'Environmental impact assessment needed',
            'Farmer training certification framework'
        ],
        'compliance_metrics': {
            'complianceConfidencePct': 88,
            'impactPositive': True,
            'roi': 'good'
        },
        'created_by': 5,
        'created_at': datetime(2024, 6, 8, 13, 45, 0),
        'updated_at': datetime(2024, 6, 15, 9, 30, 0)
    }
]

# Sample Approval Steps Data
SAMPLE_APPROVAL_STEPS = [
    # Steps for Approval Request 1 (Digital Literacy)
    {
        'id': 1,
        'request_id': 1,
        'name': 'CSR Manager Review',
        'order_index': 1,
        'assignee_user_id': 1,
        'assignee_role': 'CSR Manager',
        'status': 'approved',
        'decision_notes': 'Excellent project alignment with our CSR focus. Strong NGO credibility and clear impact metrics.',
        'decided_at': datetime(2024, 2, 18, 10, 30, 0)
    },
    {
        'id': 2,
        'request_id': 1,
        'name': 'Legal Compliance Check',
        'order_index': 2,
        'assignee_user_id': 6,
        'assignee_role': 'Legal Officer',
        'status': 'approved',
        'decision_notes': 'All compliance requirements met. EPA and ISO certifications in place.',
        'decided_at': datetime(2024, 2, 19, 14, 15, 0)
    },
    {
        'id': 3,
        'request_id': 1,
        'name': 'Finance Review',
        'order_index': 3,
        'assignee_user_id': 7,
        'assignee_role': 'Finance Manager',
        'status': 'pending',
        'decision_notes': None,
        'decided_at': None
    },
    # Steps for Approval Request 2 (Clean Water)
    {
        'id': 4,
        'request_id': 2,
        'name': 'Sustainability Officer Review',
        'order_index': 1,
        'assignee_user_id': 2,
        'assignee_role': 'Sustainability Officer',
        'status': 'approved',
        'decision_notes': 'Perfect alignment with our environmental goals. Strong technical approach.',
        'decided_at': datetime(2024, 3, 15, 11, 20, 0)
    },
    {
        'id': 5,
        'request_id': 2,
        'name': 'Technical Assessment',
        'order_index': 2,
        'assignee_user_id': 8,
        'assignee_role': 'Technical Lead',
        'status': 'approved',
        'decision_notes': 'Solar water purification technology is proven and reliable.',
        'decided_at': datetime(2024, 3, 20, 16, 45, 0)
    },
    {
        'id': 6,
        'request_id': 2,
        'name': 'Board Approval',
        'order_index': 3,
        'assignee_user_id': 9,
        'assignee_role': 'Board Member',
        'status': 'approved',
        'decision_notes': 'Approved based on strong environmental impact and community benefit.',
        'decided_at': datetime(2024, 3, 25, 9, 30, 0)
    },
    # Steps for Approval Request 3 (Skill Development)
    {
        'id': 7,
        'request_id': 3,
        'name': 'CSR Coordinator Review',
        'order_index': 1,
        'assignee_user_id': 4,
        'assignee_role': 'CSR Coordinator',
        'status': 'pending',
        'decision_notes': None,
        'decided_at': None
    },
    # Steps for Approval Request 4 (Healthcare)
    {
        'id': 8,
        'request_id': 4,
        'name': 'CSR Director Review',
        'order_index': 1,
        'assignee_user_id': 3,
        'assignee_role': 'CSR Director',
        'status': 'approved',
        'decision_notes': 'Exceptional alignment with our healthcare mission. Strong medical compliance framework.',
        'decided_at': datetime(2024, 5, 20, 14, 30, 0)
    },
    {
        'id': 9,
        'request_id': 4,
        'name': 'Medical Compliance Check',
        'order_index': 2,
        'assignee_user_id': 10,
        'assignee_role': 'Medical Officer',
        'status': 'approved',
        'decision_notes': 'All medical equipment and protocols meet regulatory standards.',
        'decided_at': datetime(2024, 5, 25, 11, 15, 0)
    },
    {
        'id': 10,
        'request_id': 4,
        'name': 'Executive Approval',
        'order_index': 3,
        'assignee_user_id': 11,
        'assignee_role': 'CEO',
        'status': 'approved',
        'decision_notes': 'Approved. This project perfectly aligns with our healthcare mission.',
        'decided_at': datetime(2024, 5, 28, 16, 45, 0)
    },
    # Steps for Approval Request 5 (Agriculture)
    {
        'id': 11,
        'request_id': 5,
        'name': 'CSR Manager Review',
        'order_index': 1,
        'assignee_user_id': 5,
        'assignee_role': 'CSR Manager',
        'status': 'approved',
        'decision_notes': 'Strong alignment with our agricultural technology focus. Clear sustainability benefits.',
        'decided_at': datetime(2024, 6, 12, 10, 20, 0)
    },
    {
        'id': 12,
        'request_id': 5,
        'name': 'Agricultural Assessment',
        'order_index': 2,
        'assignee_user_id': 12,
        'assignee_role': 'Agricultural Specialist',
        'status': 'pending',
        'decision_notes': None,
        'decided_at': None
    }
]

def get_sample_approval_requests():
    """Return sample approval requests data"""
    return SAMPLE_APPROVAL_REQUESTS

def get_sample_approval_steps():
    """Return sample approval steps data"""
    return SAMPLE_APPROVAL_STEPS

def get_all_sample_data():
    """Return all sample data for approval models"""
    return {
        'approval_requests': SAMPLE_APPROVAL_REQUESTS,
        'approval_steps': SAMPLE_APPROVAL_STEPS
    }
