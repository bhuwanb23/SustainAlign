"""
Sample Data for Risk Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json

# Sample NGO Risk Assessments Data - Only including fields that exist in the model
SAMPLE_NGO_RISK_ASSESSMENTS = [
    {
        'id': 1,
        'ngo_id': 1,
        'risk_level': 'Low',
        'highlight_metric_label': 'Compliance Score',
        'highlight_metric_value_pct': 95,
        'financial_stability_pct': 92,
        'compliance_score_pct': 95,
        'execution_track_pct': 88,
        'transparency_pct': 90,
        'legal_standing_pct': 93,
        'radar_categories': ['Financial', 'Compliance', 'Execution', 'Transparency', 'Legal'],
        'radar_values': [92, 95, 88, 90, 93],
        'trend_categories': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'trend_avg': [85, 87, 89, 91, 93],
        'trend_bench': [80, 82, 84, 86, 88],
        'created_at': datetime(2024, 2, 15, 14, 30, 0),
        'updated_at': datetime(2024, 2, 15, 16, 45, 0)
    },
    {
        'id': 2,
        'ngo_id': 2,
        'risk_level': 'Medium',
        'highlight_metric_label': 'Financial Stability',
        'highlight_metric_value_pct': 75,
        'financial_stability_pct': 75,
        'compliance_score_pct': 80,
        'execution_track_pct': 85,
        'transparency_pct': 70,
        'legal_standing_pct': 82,
        'radar_categories': ['Financial', 'Compliance', 'Execution', 'Transparency', 'Legal'],
        'radar_values': [75, 80, 85, 70, 82],
        'trend_categories': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'trend_avg': [78, 79, 80, 81, 82],
        'trend_bench': [75, 76, 77, 78, 79],
        'created_at': datetime(2024, 3, 10, 11, 15, 0),
        'updated_at': datetime(2024, 3, 10, 13, 30, 0)
    },
    {
        'id': 3,
        'ngo_id': 3,
        'risk_level': 'Medium',
        'highlight_metric_label': 'Execution Track',
        'highlight_metric_value_pct': 70,
        'financial_stability_pct': 78,
        'compliance_score_pct': 75,
        'execution_track_pct': 70,
        'transparency_pct': 72,
        'legal_standing_pct': 80,
        'radar_categories': ['Financial', 'Compliance', 'Execution', 'Transparency', 'Legal'],
        'radar_values': [78, 75, 70, 72, 80],
        'trend_categories': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'trend_avg': [72, 73, 74, 75, 76],
        'trend_bench': [70, 71, 72, 73, 74],
        'created_at': datetime(2024, 4, 5, 9, 45, 0),
        'updated_at': datetime(2024, 4, 5, 12, 0, 0)
    },
    {
        'id': 4,
        'ngo_id': 4,
        'risk_level': 'Low',
        'highlight_metric_label': 'Transparency',
        'highlight_metric_value_pct': 98,
        'financial_stability_pct': 95,
        'compliance_score_pct': 96,
        'execution_track_pct': 94,
        'transparency_pct': 98,
        'legal_standing_pct': 97,
        'radar_categories': ['Financial', 'Compliance', 'Execution', 'Transparency', 'Legal'],
        'radar_values': [95, 96, 94, 98, 97],
        'trend_categories': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'trend_avg': [92, 93, 94, 95, 96],
        'trend_bench': [90, 91, 92, 93, 94],
        'created_at': datetime(2024, 3, 20, 15, 20, 0),
        'updated_at': datetime(2024, 3, 20, 17, 15, 0)
    },
    {
        'id': 5,
        'ngo_id': 5,
        'risk_level': 'Low',
        'highlight_metric_label': 'Legal Standing',
        'highlight_metric_value_pct': 90,
        'financial_stability_pct': 88,
        'compliance_score_pct': 92,
        'execution_track_pct': 85,
        'transparency_pct': 87,
        'legal_standing_pct': 90,
        'radar_categories': ['Financial', 'Compliance', 'Execution', 'Transparency', 'Legal'],
        'radar_values': [88, 92, 85, 87, 90],
        'trend_categories': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'trend_avg': [85, 86, 87, 88, 89],
        'trend_bench': [83, 84, 85, 86, 87],
        'created_at': datetime(2024, 4, 12, 10, 30, 0),
        'updated_at': datetime(2024, 4, 12, 12, 45, 0)
    }
]

# Sample Risk Factors Data
SAMPLE_RISK_FACTORS = [
    # Financial Risk Factors
    {
        'id': 1,
        'assessment_id': 1,
        'category': 'financial',
        'factor_name': 'Financial Stability',
        'description': 'Assessment of NGO financial health and sustainability',
        'score': 15,
        'weight': 0.25,
        'details': {
            'annual_budget': 'INR 2.5 Crores',
            'funding_diversity': 'High',
            'reserve_funds': '6 months operating expenses',
            'audit_status': 'Clean',
            'financial_transparency': 'Excellent'
        },
        'mitigation_strategies': [
            'Regular financial monitoring',
            'Diversified funding sources',
            'Maintain reserve funds'
        ],
        'created_at': datetime(2024, 2, 15, 14, 30, 0)
    },
    {
        'id': 2,
        'assessment_id': 1,
        'category': 'financial',
        'factor_name': 'Budget Management',
        'description': 'Efficiency in budget utilization and cost control',
        'score': 20,
        'weight': 0.20,
        'details': {
            'budget_utilization': '95%',
            'cost_efficiency': 'High',
            'overspending_incidents': 0,
            'financial_controls': 'Strong'
        },
        'mitigation_strategies': [
            'Regular budget reviews',
            'Cost optimization measures',
            'Strong internal controls'
        ],
        'created_at': datetime(2024, 2, 15, 14, 30, 0)
    },
    # Operational Risk Factors
    {
        'id': 3,
        'assessment_id': 1,
        'category': 'operational',
        'factor_name': 'Project Management',
        'description': 'Capability to deliver projects on time and within scope',
        'score': 25,
        'weight': 0.30,
        'details': {
            'projects_completed': 15,
            'on_time_delivery': '93%',
            'scope_creep_incidents': 1,
            'quality_standards': 'High'
        },
        'mitigation_strategies': [
            'Strong project planning',
            'Regular progress monitoring',
            'Quality assurance processes'
        ],
        'created_at': datetime(2024, 2, 15, 14, 30, 0)
    },
    {
        'id': 4,
        'assessment_id': 2,
        'category': 'operational',
        'factor_name': 'Technical Expertise',
        'description': 'Technical capabilities for water purification systems',
        'score': 30,
        'weight': 0.35,
        'details': {
            'technical_team_size': 8,
            'certifications': 'Solar Water Systems',
            'maintenance_capability': 'Good',
            'spare_parts_availability': 'Adequate'
        },
        'mitigation_strategies': [
            'Enhanced technical training',
            'Backup support systems',
            'Regular maintenance schedules'
        ],
        'created_at': datetime(2024, 3, 10, 11, 15, 0)
    },
    # Governance Risk Factors
    {
        'id': 5,
        'assessment_id': 1,
        'category': 'governance',
        'factor_name': 'Board Governance',
        'description': 'Effectiveness of NGO board and governance structure',
        'score': 10,
        'weight': 0.15,
        'details': {
            'board_size': 7,
            'independent_directors': 3,
            'meeting_frequency': 'Monthly',
            'transparency_score': 'High'
        },
        'mitigation_strategies': [
            'Regular board evaluations',
            'Independent director appointments',
            'Transparency initiatives'
        ],
        'created_at': datetime(2024, 2, 15, 14, 30, 0)
    },
    {
        'id': 6,
        'assessment_id': 2,
        'category': 'governance',
        'factor_name': 'Compliance Status',
        'description': 'Adherence to regulatory and legal requirements',
        'score': 20,
        'weight': 0.20,
        'details': {
            'fcra_status': 'Valid',
            '80g_status': 'Valid',
            'tax_compliance': 'Current',
            'regulatory_audits': 'Clean'
        },
        'mitigation_strategies': [
            'Regular compliance monitoring',
            'Legal advisory support',
            'Documentation maintenance'
        ],
        'created_at': datetime(2024, 3, 10, 11, 15, 0)
    },
    # Reputational Risk Factors
    {
        'id': 7,
        'assessment_id': 1,
        'category': 'reputational',
        'factor_name': 'Community Trust',
        'description': 'Level of trust and acceptance in target communities',
        'score': 15,
        'weight': 0.10,
        'details': {
            'community_engagement': 'High',
            'local_partnerships': 12,
            'beneficiary_satisfaction': '95%',
            'community_feedback': 'Positive'
        },
        'mitigation_strategies': [
            'Regular community consultations',
            'Transparent communication',
            'Local partnership strengthening'
        ],
        'created_at': datetime(2024, 2, 15, 14, 30, 0)
    },
    {
        'id': 8,
        'assessment_id': 3,
        'category': 'reputational',
        'factor_name': 'Stakeholder Relations',
        'description': 'Relationships with employers and placement partners',
        'score': 40,
        'weight': 0.25,
        'details': {
            'employer_partnerships': 25,
            'placement_success_rate': '75%',
            'employer_satisfaction': 'Good',
            'partnership_stability': 'Moderate'
        },
        'mitigation_strategies': [
            'Strengthen employer relationships',
            'Improve placement tracking',
            'Develop backup partnerships'
        ],
        'created_at': datetime(2024, 4, 5, 9, 45, 0)
    },
    # Environmental Risk Factors
    {
        'id': 9,
        'assessment_id': 2,
        'category': 'environmental',
        'factor_name': 'Environmental Impact',
        'description': 'Assessment of environmental sustainability practices',
        'score': 25,
        'weight': 0.25,
        'details': {
            'environmental_certifications': 'ISO 14001',
            'carbon_footprint': 'Low',
            'waste_management': 'Excellent',
            'sustainability_practices': 'Strong'
        },
        'mitigation_strategies': [
            'Environmental impact monitoring',
            'Sustainability training',
            'Green technology adoption'
        ],
        'created_at': datetime(2024, 3, 10, 11, 15, 0)
    },
    {
        'id': 10,
        'assessment_id': 5,
        'category': 'environmental',
        'factor_name': 'Climate Resilience',
        'description': 'Adaptation to climate change and weather risks',
        'score': 30,
        'weight': 0.30,
        'details': {
            'climate_adaptation_plans': 'In place',
            'weather_monitoring': 'Active',
            'crop_diversification': 'High',
            'irrigation_systems': 'Efficient'
        },
        'mitigation_strategies': [
            'Climate-smart agriculture',
            'Weather monitoring systems',
            'Crop diversification programs'
        ],
        'created_at': datetime(2024, 4, 12, 10, 30, 0)
    }
]

def get_sample_ngo_risk_assessments():
    """Return sample NGO risk assessments data"""
    return SAMPLE_NGO_RISK_ASSESSMENTS

def get_sample_risk_factors():
    """Return sample risk factors data"""
    return SAMPLE_RISK_FACTORS

def get_all_sample_data():
    """Return all sample data for risk models"""
    return {
        'ngo_risk_assessments': SAMPLE_NGO_RISK_ASSESSMENTS
    }
