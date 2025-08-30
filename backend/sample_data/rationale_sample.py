"""
Sample Data for Rationale Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json

# Sample Decision Rationales Data
SAMPLE_DECISION_RATIONALES = [
    {
        'id': 1,
        'project_id': 1,
        'company_id': 1,
        'title': 'Digital Literacy Project Investment Decision',
        'context': {
            'company_name': 'TechCorp Solutions Ltd.',
            'project_name': 'Digital Literacy for Rural Women',
            'ngo_name': 'Women Empowerment Foundation',
            'requested_amount': 1500000,
            'currency': 'INR',
            'decision_date': '2024-02-20'
        },
        'criteria': {
            'impact': 0.4,
            'cost': 0.3,
            'risk': 0.3
        },
        'options': [
            {
                'key': 'approve_full',
                'label': 'Approve Full Funding',
                'data': {
                    'amount': 1500000,
                    'duration': 12,
                    'expected_impact': '500 women trained'
                }
            },
            {
                'key': 'approve_partial',
                'label': 'Approve Partial Funding',
                'data': {
                    'amount': 1000000,
                    'duration': 8,
                    'expected_impact': '300 women trained'
                }
            },
            {
                'key': 'reject',
                'label': 'Reject Proposal',
                'data': {
                    'amount': 0,
                    'duration': 0,
                    'expected_impact': 'No impact'
                }
            }
        ],
        'selected_option': 'approve_full',
        'pros': [
            'Strong alignment with company CSR focus on education and women empowerment',
            'Proven NGO track record with 15 completed projects',
            'Measurable impact metrics and clear outcomes',
            'Cost-effective implementation plan',
            'High community engagement potential'
        ],
        'cons': [
            'Requires significant upfront investment',
            'Long-term commitment needed for sustainability',
            'Dependency on NGO execution capabilities'
        ],
        'reasoning_steps': [
            'Evaluated project alignment with TechCorp\'s CSR priorities',
            'Assessed NGO credibility and past performance',
            'Analyzed cost-benefit ratio and ROI potential',
            'Reviewed risk factors and mitigation strategies',
            'Considered stakeholder impact and community benefits'
        ],
        'score_breakdown': {
            'approve_full': {
                'impact': 0.9,
                'cost': 0.7,
                'risk': 0.8
            },
            'approve_partial': {
                'impact': 0.7,
                'cost': 0.8,
                'risk': 0.9
            },
            'reject': {
                'impact': 0.0,
                'cost': 1.0,
                'risk': 1.0
            }
        },
        'attachments': [
            {
                'name': 'Project Feasibility Report',
                'url': 'https://example.com/documents/digital-literacy-feasibility.pdf'
            },
            {
                'name': 'NGO Credibility Assessment',
                'url': 'https://example.com/documents/women-empowerment-assessment.pdf'
            }
        ],
        'created_by': 1,
        'created_at': datetime(2024, 2, 20, 14, 30, 0),
        'updated_at': datetime(2024, 2, 20, 16, 45, 0)
    },
    {
        'id': 2,
        'project_id': 2,
        'company_id': 2,
        'title': 'Clean Water Project Partnership Decision',
        'context': {
            'company_name': 'GreenEnergy Industries',
            'project_name': 'Clean Water Access in Tribal Villages',
            'ngo_name': 'Water for All Foundation',
            'requested_amount': 2000000,
            'currency': 'INR',
            'decision_date': '2024-03-25'
        },
        'criteria': {
            'environmental_impact': 0.5,
            'cost': 0.3,
            'sustainability': 0.2
        },
        'options': [
            {
                'key': 'approve_full',
                'label': 'Approve Full Partnership',
                'data': {
                    'amount': 2000000,
                    'duration': 12,
                    'expected_impact': '20 villages, 1000 households'
                }
            },
            {
                'key': 'approve_technical',
                'label': 'Technical Support Only',
                'data': {
                    'amount': 500000,
                    'duration': 6,
                    'expected_impact': '5 villages, 250 households'
                }
            },
            {
                'key': 'reject',
                'label': 'Decline Partnership',
                'data': {
                    'amount': 0,
                    'duration': 0,
                    'expected_impact': 'No impact'
                }
            }
        ],
        'selected_option': 'approve_full',
        'pros': [
            'Perfect alignment with GreenEnergy\'s environmental mission',
            'Proven solar-powered water purification technology',
            'Strong community ownership and sustainability model',
            'Clear environmental impact metrics',
            'Scalable solution for other regions'
        ],
        'cons': [
            'High initial investment required',
            'Complex implementation in remote areas',
            'Long-term maintenance considerations'
        ],
        'reasoning_steps': [
            'Assessed environmental impact alignment with company goals',
            'Evaluated technical feasibility and proven track record',
            'Analyzed community engagement and ownership model',
            'Reviewed sustainability and long-term maintenance plans',
            'Considered scalability and replication potential'
        ],
        'score_breakdown': {
            'approve_full': {
                'environmental_impact': 0.95,
                'cost': 0.7,
                'sustainability': 0.9
            },
            'approve_technical': {
                'environmental_impact': 0.6,
                'cost': 0.9,
                'sustainability': 0.7
            },
            'reject': {
                'environmental_impact': 0.0,
                'cost': 1.0,
                'sustainability': 0.0
            }
        },
        'attachments': [
            {
                'name': 'Environmental Impact Assessment',
                'url': 'https://example.com/documents/clean-water-eia.pdf'
            },
            {
                'name': 'Technical Feasibility Study',
                'url': 'https://example.com/documents/water-purification-study.pdf'
            }
        ],
        'created_by': 2,
        'created_at': datetime(2024, 3, 25, 9, 30, 0),
        'updated_at': datetime(2024, 3, 25, 11, 15, 0)
    },
    {
        'id': 3,
        'project_id': 3,
        'company_id': 4,
        'title': 'Skill Development Project Evaluation',
        'context': {
            'company_name': 'EduTech Innovations',
            'project_name': 'Skill Development for Urban Youth',
            'ngo_name': 'Youth Empowerment Society',
            'requested_amount': 1200000,
            'currency': 'INR',
            'decision_date': '2024-04-10'
        },
        'criteria': {
            'educational_impact': 0.4,
            'cost': 0.3,
            'employability': 0.3
        },
        'options': [
            {
                'key': 'approve_conditional',
                'label': 'Approve with Conditions',
                'data': {
                    'amount': 1000000,
                    'duration': 10,
                    'expected_impact': '250 youth trained, 180 placements'
                }
            },
            {
                'key': 'approve_full',
                'label': 'Approve Full Funding',
                'data': {
                    'amount': 1200000,
                    'duration': 12,
                    'expected_impact': '300 youth trained, 225 placements'
                }
            },
            {
                'key': 'reject',
                'label': 'Reject Proposal',
                'data': {
                    'amount': 0,
                    'duration': 0,
                    'expected_impact': 'No impact'
                }
            }
        ],
        'selected_option': 'approve_conditional',
        'pros': [
            'Good alignment with EduTech\'s mission to bridge digital divide',
            'Strong job placement track record (75% success rate)',
            'Scalable implementation model',
            'Clear monitoring and evaluation framework',
            'Urban focus complements existing rural programs'
        ],
        'cons': [
            'Higher cost per beneficiary compared to other programs',
            'Dependency on employer partnerships for placements',
            'Limited long-term impact measurement'
        ],
        'reasoning_steps': [
            'Evaluated alignment with educational technology goals',
            'Assessed job placement success rates and employer partnerships',
            'Analyzed cost-effectiveness and scalability',
            'Reviewed monitoring and evaluation framework',
            'Considered complementarity with existing programs'
        ],
        'score_breakdown': {
            'approve_conditional': {
                'educational_impact': 0.8,
                'cost': 0.8,
                'employability': 0.85
            },
            'approve_full': {
                'educational_impact': 0.85,
                'cost': 0.7,
                'employability': 0.9
            },
            'reject': {
                'educational_impact': 0.0,
                'cost': 1.0,
                'employability': 0.0
            }
        },
        'attachments': [
            {
                'name': 'Skill Development Assessment',
                'url': 'https://example.com/documents/skill-development-assessment.pdf'
            },
            {
                'name': 'Employer Partnership Analysis',
                'url': 'https://example.com/documents/employer-partnerships.pdf'
            }
        ],
        'created_by': 4,
        'created_at': datetime(2024, 4, 10, 13, 20, 0),
        'updated_at': datetime(2024, 4, 10, 15, 30, 0)
    }
]

# Sample Rationale Notes Data
SAMPLE_RATIONALE_NOTES = [
    {
        'id': 1,
        'rationale_id': 1,
        'author': 'Priya Sharma',
        'content': 'Important to consider the long-term sustainability of the digital literacy centers. Recommend establishing a maintenance fund for equipment upgrades.',
        'created_at': datetime(2024, 2, 20, 15, 0, 0)
    },
    {
        'id': 2,
        'rationale_id': 1,
        'author': 'Rajesh Kumar',
        'content': 'The NGO has demonstrated strong community engagement in previous projects. This increases confidence in successful implementation.',
        'created_at': datetime(2024, 2, 20, 15, 30, 0)
    },
    {
        'id': 3,
        'rationale_id': 1,
        'author': 'Amit Singh',
        'content': 'Consider the potential for scaling this model to other regions. The initial investment could serve as a pilot for broader implementation.',
        'created_at': datetime(2024, 2, 20, 16, 0, 0)
    },
    {
        'id': 4,
        'rationale_id': 2,
        'author': 'Dr. Meera Patel',
        'content': 'The solar-powered water purification technology has been proven effective in similar tribal areas. Low maintenance requirements are a significant advantage.',
        'created_at': datetime(2024, 3, 25, 10, 0, 0)
    },
    {
        'id': 5,
        'rationale_id': 2,
        'author': 'Sunita Reddy',
        'content': 'Environmental impact assessment shows significant reduction in water-borne diseases. This aligns perfectly with our sustainability goals.',
        'created_at': datetime(2024, 3, 25, 10, 30, 0)
    },
    {
        'id': 6,
        'rationale_id': 3,
        'author': 'Amit Singh',
        'content': 'The conditional approval approach allows us to test the program effectiveness before committing full funding. Recommend quarterly progress reviews.',
        'created_at': datetime(2024, 4, 10, 14, 0, 0)
    },
    {
        'id': 7,
        'rationale_id': 3,
        'author': 'Priya Sharma',
        'content': 'The urban focus complements our existing rural education programs. This creates a comprehensive approach to digital literacy across different demographics.',
        'created_at': datetime(2024, 4, 10, 14, 30, 0)
    }
]

def get_sample_decision_rationales():
    """Return sample decision rationales data"""
    return SAMPLE_DECISION_RATIONALES

def get_sample_rationale_notes():
    """Return sample rationale notes data"""
    return SAMPLE_RATIONALE_NOTES

def get_all_sample_data():
    """Return all sample data for rationale models"""
    return {
        'decision_rationales': SAMPLE_DECISION_RATIONALES,
        'rationale_notes': SAMPLE_RATIONALE_NOTES
    }
