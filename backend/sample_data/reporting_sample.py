"""
Sample Data for Reporting Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json

# Sample Report Templates Data
SAMPLE_REPORT_TEMPLATES = [
    {
        'id': 1,
        'name': 'CSR Annual Report Template',
        'description': 'Comprehensive CSR annual report template covering all mandatory sections and impact metrics',
        'type': 'csr_annual',
        'sections': [
            {
                'id': 'executive_summary',
                'title': 'Executive Summary',
                'type': 'text',
                'required': True,
                'order': 1
            },
            {
                'id': 'company_overview',
                'title': 'Company Overview',
                'type': 'text',
                'required': True,
                'order': 2
            },
            {
                'id': 'csr_policy',
                'title': 'CSR Policy & Governance',
                'type': 'text',
                'required': True,
                'order': 3
            },
            {
                'id': 'project_overview',
                'title': 'Project Overview',
                'type': 'table',
                'required': True,
                'order': 4
            },
            {
                'id': 'impact_metrics',
                'title': 'Impact Metrics',
                'type': 'chart',
                'required': True,
                'order': 5
            },
            {
                'id': 'financial_summary',
                'title': 'Financial Summary',
                'type': 'table',
                'required': True,
                'order': 6
            },
            {
                'id': 'stakeholder_engagement',
                'title': 'Stakeholder Engagement',
                'type': 'text',
                'required': False,
                'order': 7
            },
            {
                'id': 'future_plans',
                'title': 'Future Plans & Commitments',
                'type': 'text',
                'required': True,
                'order': 8
            }
        ],
        'variables': [
            'company_name',
            'reporting_period',
            'total_csr_spend',
            'number_of_projects',
            'beneficiaries_reached'
        ],
        'created_by': 1,
        'created_at': datetime(2024, 1, 15, 10, 0, 0),
        'updated_at': datetime(2024, 1, 15, 10, 0, 0)
    },
    {
        'id': 2,
        'name': 'ESG Quarterly Report Template',
        'description': 'ESG quarterly report template focusing on environmental, social, and governance metrics',
        'type': 'esg_quarterly',
        'sections': [
            {
                'id': 'quarterly_highlights',
                'title': 'Quarterly Highlights',
                'type': 'text',
                'required': True,
                'order': 1
            },
            {
                'id': 'environmental_metrics',
                'title': 'Environmental Metrics',
                'type': 'chart',
                'required': True,
                'order': 2
            },
            {
                'id': 'social_impact',
                'title': 'Social Impact',
                'type': 'chart',
                'required': True,
                'order': 3
            },
            {
                'id': 'governance_updates',
                'title': 'Governance Updates',
                'type': 'text',
                'required': True,
                'order': 4
            },
            {
                'id': 'risk_assessment',
                'title': 'Risk Assessment',
                'type': 'table',
                'required': True,
                'order': 5
            },
            {
                'id': 'next_quarter_plans',
                'title': 'Next Quarter Plans',
                'type': 'text',
                'required': True,
                'order': 6
            }
        ],
        'variables': [
            'quarter',
            'year',
            'co2_reduction',
            'water_saved',
            'beneficiaries',
            'projects_completed'
        ],
        'created_by': 2,
        'created_at': datetime(2024, 1, 20, 14, 30, 0),
        'updated_at': datetime(2024, 1, 20, 14, 30, 0)
    },
    {
        'id': 3,
        'name': 'Project Progress Report Template',
        'description': 'Detailed project progress report template for individual project tracking',
        'type': 'project_progress',
        'sections': [
            {
                'id': 'project_overview',
                'title': 'Project Overview',
                'type': 'text',
                'required': True,
                'order': 1
            },
            {
                'id': 'progress_summary',
                'title': 'Progress Summary',
                'type': 'text',
                'required': True,
                'order': 2
            },
            {
                'id': 'milestones',
                'title': 'Milestones & Achievements',
                'type': 'table',
                'required': True,
                'order': 3
            },
            {
                'id': 'financial_status',
                'title': 'Financial Status',
                'type': 'chart',
                'required': True,
                'order': 4
            },
            {
                'id': 'impact_metrics',
                'title': 'Impact Metrics',
                'type': 'chart',
                'required': True,
                'order': 5
            },
            {
                'id': 'challenges_risks',
                'title': 'Challenges & Risks',
                'type': 'text',
                'required': True,
                'order': 6
            },
            {
                'id': 'next_steps',
                'title': 'Next Steps & Timeline',
                'type': 'text',
                'required': True,
                'order': 7
            }
        ],
        'variables': [
            'project_name',
            'ngo_name',
            'start_date',
            'end_date',
            'budget_allocated',
            'amount_spent',
            'beneficiaries_reached'
        ],
        'created_by': 3,
        'created_at': datetime(2024, 1, 25, 9, 15, 0),
        'updated_at': datetime(2024, 1, 25, 9, 15, 0)
    },
    {
        'id': 4,
        'name': 'Compliance Report Template',
        'description': 'Regulatory compliance report template for CSR and ESG reporting requirements',
        'type': 'compliance',
        'sections': [
            {
                'id': 'compliance_summary',
                'title': 'Compliance Summary',
                'type': 'text',
                'required': True,
                'order': 1
            },
            {
                'id': 'regulatory_requirements',
                'title': 'Regulatory Requirements Met',
                'type': 'table',
                'required': True,
                'order': 2
            },
            {
                'id': 'spending_compliance',
                'title': 'Spending Compliance',
                'type': 'chart',
                'required': True,
                'order': 3
            },
            {
                'id': 'documentation_status',
                'title': 'Documentation Status',
                'type': 'table',
                'required': True,
                'order': 4
            },
            {
                'id': 'audit_findings',
                'title': 'Audit Findings',
                'type': 'text',
                'required': False,
                'order': 5
            },
            {
                'id': 'remediation_plans',
                'title': 'Remediation Plans',
                'type': 'text',
                'required': False,
                'order': 6
            }
        ],
        'variables': [
            'reporting_period',
            'total_spend',
            'mandatory_spend',
            'compliance_percentage',
            'audit_status'
        ],
        'created_by': 1,
        'created_at': datetime(2024, 2, 1, 11, 45, 0),
        'updated_at': datetime(2024, 2, 1, 11, 45, 0)
    }
]

# Sample Report Instances Data
SAMPLE_REPORT_INSTANCES = [
    {
        'id': 1,
        'template_id': 1,
        'company_id': 1,
        'title': 'TechCorp Solutions Ltd. - CSR Annual Report 2023-24',
        'period': 'FY2023-24',
        'status': 'published',
        'data': {
            'company_name': 'TechCorp Solutions Ltd.',
            'reporting_period': 'April 2023 - March 2024',
            'total_csr_spend': 'INR 2.5 Crores',
            'number_of_projects': 5,
            'beneficiaries_reached': 2500
        },
        'generated_at': datetime(2024, 4, 1, 9, 30, 0),
        'published_at': datetime(2024, 4, 1, 10, 0, 0),
        'created_by': 1,
        'created_at': datetime(2024, 4, 1, 9, 0, 0),
        'updated_at': datetime(2024, 4, 1, 10, 0, 0)
    },
    {
        'id': 2,
        'template_id': 2,
        'company_id': 2,
        'title': 'GreenEnergy Industries - ESG Q1 2024 Report',
        'period': 'Q1 2024',
        'status': 'published',
        'data': {
            'quarter': 'Q1',
            'year': '2024',
            'co2_reduction': '78.2 tons',
            'water_saved': '450,000 liters',
            'beneficiaries': 1800,
            'projects_completed': 3
        },
        'generated_at': datetime(2024, 4, 15, 14, 30, 0),
        'published_at': datetime(2024, 4, 15, 15, 0, 0),
        'created_by': 2,
        'created_at': datetime(2024, 4, 15, 14, 0, 0),
        'updated_at': datetime(2024, 4, 15, 15, 0, 0)
    },
    {
        'id': 3,
        'template_id': 3,
        'company_id': 1,
        'title': 'Digital Literacy Project - Progress Report March 2024',
        'period': 'March 2024',
        'status': 'draft',
        'data': {
            'project_name': 'Digital Literacy for Rural Women',
            'ngo_name': 'Women Empowerment Foundation',
            'start_date': '2024-01-15',
            'end_date': '2024-12-31',
            'budget_allocated': 1500000,
            'amount_spent': 850000,
            'beneficiaries_reached': 500
        },
        'generated_at': datetime(2024, 4, 5, 11, 20, 0),
        'published_at': None,
        'created_by': 1,
        'created_at': datetime(2024, 4, 5, 11, 0, 0),
        'updated_at': datetime(2024, 4, 5, 11, 20, 0)
    },
    {
        'id': 4,
        'template_id': 4,
        'company_id': 3,
        'title': 'HealthTech Solutions - Compliance Report Q4 2023',
        'period': 'Q4 2023',
        'status': 'published',
        'data': {
            'reporting_period': 'October - December 2023',
            'total_spend': 'INR 1.8 Crores',
            'mandatory_spend': 'INR 1.5 Crores',
            'compliance_percentage': 95.2,
            'audit_status': 'Clean'
        },
        'generated_at': datetime(2024, 1, 15, 16, 45, 0),
        'published_at': datetime(2024, 1, 15, 17, 30, 0),
        'created_by': 3,
        'created_at': datetime(2024, 1, 15, 16, 0, 0),
        'updated_at': datetime(2024, 1, 15, 17, 30, 0)
    },
    {
        'id': 5,
        'template_id': 2,
        'company_id': 4,
        'title': 'EduTech Innovations - ESG Q4 2023 Report',
        'period': 'Q4 2023',
        'status': 'published',
        'data': {
            'quarter': 'Q4',
            'year': '2023',
            'co2_reduction': '15.3 tons',
            'water_saved': '120,000 liters',
            'beneficiaries': 1500,
            'projects_completed': 2
        },
        'generated_at': datetime(2024, 1, 20, 10, 15, 0),
        'published_at': datetime(2024, 1, 20, 11, 0, 0),
        'created_by': 4,
        'created_at': datetime(2024, 1, 20, 10, 0, 0),
        'updated_at': datetime(2024, 1, 20, 11, 0, 0)
    }
]

# Sample Report Sections Data
SAMPLE_REPORT_SECTIONS = [
    {
        'id': 1,
        'report_id': 1,
        'section_id': 'executive_summary',
        'title': 'Executive Summary',
        'content': {
            'text': 'TechCorp Solutions Ltd. is pleased to present its CSR Annual Report for the financial year 2023-24. During this period, we successfully implemented 5 impactful projects across education, women empowerment, and digital inclusion, reaching over 2,500 beneficiaries. Our total CSR spend of INR 2.5 Crores demonstrates our commitment to sustainable development and community welfare.',
            'highlights': [
                '5 projects successfully implemented',
                '2,500+ beneficiaries reached',
                'INR 2.5 Crores CSR spend',
                '100% compliance with regulatory requirements'
            ]
        },
        'order': 1,
        'created_at': datetime(2024, 4, 1, 9, 30, 0),
        'updated_at': datetime(2024, 4, 1, 9, 30, 0)
    },
    {
        'id': 2,
        'report_id': 1,
        'section_id': 'project_overview',
        'title': 'Project Overview',
        'content': {
            'table_data': [
                {
                    'project_name': 'Digital Literacy for Rural Women',
                    'ngo': 'Women Empowerment Foundation',
                    'location': 'Rajasthan',
                    'budget': 'INR 1.5 Cr',
                    'beneficiaries': 500,
                    'status': 'In Progress'
                },
                {
                    'project_name': 'Clean Water Access',
                    'ngo': 'Water for All Foundation',
                    'location': 'Madhya Pradesh',
                    'budget': 'INR 2.0 Cr',
                    'beneficiaries': 1000,
                    'status': 'Completed'
                },
                {
                    'project_name': 'Skill Development for Youth',
                    'ngo': 'Youth Empowerment Society',
                    'location': 'Maharashtra',
                    'budget': 'INR 1.2 Cr',
                    'beneficiaries': 300,
                    'status': 'In Progress'
                },
                {
                    'project_name': 'Healthcare Access',
                    'ngo': 'Health for All Trust',
                    'location': 'Jharkhand',
                    'budget': 'INR 1.8 Cr',
                    'beneficiaries': 1500,
                    'status': 'Completed'
                },
                {
                    'project_name': 'Sustainable Agriculture',
                    'ngo': 'Green Earth Foundation',
                    'location': 'Maharashtra',
                    'budget': 'INR 1.0 Cr',
                    'beneficiaries': 400,
                    'status': 'In Progress'
                }
            ]
        },
        'order': 4,
        'created_at': datetime(2024, 4, 1, 9, 30, 0),
        'updated_at': datetime(2024, 4, 1, 9, 30, 0)
    },
    {
        'id': 3,
        'report_id': 2,
        'section_id': 'environmental_metrics',
        'title': 'Environmental Metrics',
        'content': {
            'chart_type': 'bar',
            'chart_data': {
                'labels': ['CO2 Reduction', 'Water Saved', 'Trees Planted', 'Energy Generated'],
                'values': [78.2, 450, 2200, 25000],
                'units': ['tons', 'kL', 'trees', 'kWh']
            },
            'summary': 'Q1 2024 saw significant environmental impact with 78.2 tons of CO2 reduction, 450,000 liters of water saved, 2,200 trees planted, and 25,000 kWh of renewable energy generated.'
        },
        'order': 2,
        'created_at': datetime(2024, 4, 15, 14, 30, 0),
        'updated_at': datetime(2024, 4, 15, 14, 30, 0)
    },
    {
        'id': 4,
        'report_id': 2,
        'section_id': 'social_impact',
        'title': 'Social Impact',
        'content': {
            'chart_type': 'pie',
            'chart_data': {
                'labels': ['Education', 'Healthcare', 'Skill Development', 'Community Development'],
                'values': [45, 25, 20, 10],
                'units': ['%', '%', '%', '%']
            },
            'summary': 'Social impact distribution shows 45% focus on education, 25% on healthcare, 20% on skill development, and 10% on community development initiatives.'
        },
        'order': 3,
        'created_at': datetime(2024, 4, 15, 14, 30, 0),
        'updated_at': datetime(2024, 4, 15, 14, 30, 0)
    },
    {
        'id': 5,
        'report_id': 3,
        'section_id': 'progress_summary',
        'title': 'Progress Summary',
        'content': {
            'text': 'The Digital Literacy for Rural Women project has made excellent progress in Q1 2024. We have successfully established 8 training centers across Rajasthan, trained 500 women in basic computer skills, and generated 25 direct employment opportunities. The project is 57% complete and on track to meet all objectives.',
            'key_achievements': [
                '8 training centers established',
                '500 women trained',
                '25 employment opportunities created',
                '57% project completion'
            ]
        },
        'order': 2,
        'created_at': datetime(2024, 4, 5, 11, 20, 0),
        'updated_at': datetime(2024, 4, 5, 11, 20, 0)
    },
    {
        'id': 6,
        'report_id': 3,
        'section_id': 'financial_status',
        'title': 'Financial Status',
        'content': {
            'chart_type': 'progress',
            'chart_data': {
                'budget_allocated': 1500000,
                'amount_spent': 850000,
                'amount_remaining': 650000,
                'spending_percentage': 56.7
            },
            'summary': 'Financial status shows 56.7% budget utilization with INR 8.5 Lakhs spent out of allocated INR 15 Lakhs. The remaining budget is sufficient to complete the project objectives.'
        },
        'order': 4,
        'created_at': datetime(2024, 4, 5, 11, 20, 0),
        'updated_at': datetime(2024, 4, 5, 11, 20, 0)
    }
]

def get_sample_report_templates():
    """Return sample report templates data"""
    return SAMPLE_REPORT_TEMPLATES

def get_sample_report_instances():
    """Return sample report instances data"""
    return SAMPLE_REPORT_INSTANCES

def get_sample_report_sections():
    """Return sample report sections data"""
    return SAMPLE_REPORT_SECTIONS

def get_all_sample_data():
    """Return all sample data for reporting models"""
    return {
        'report_templates': SAMPLE_REPORT_TEMPLATES,
        'report_instances': SAMPLE_REPORT_INSTANCES,
        'report_sections': SAMPLE_REPORT_SECTIONS
    }
