"""
Sample Data for Projects and Related Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date, timedelta
import json
from decimal import Decimal

# Sample Projects Data
SAMPLE_PROJECTS = [
    {
        'id': 1,
        'title': 'Digital Literacy for Rural Women',
        'short_description': 'Empowering rural women with digital skills through community-based training centers',
        'ngo_name': 'Women Empowerment Foundation',
        'location_city': 'Jaipur',
        'location_region': 'Rajasthan',
        'location_country': 'India',
        'sdg_goals': [4, 5, 10],  # Quality Education, Gender Equality, Reduced Inequalities
        'csr_focus_areas': ['Education', 'Women Empowerment', 'Digital Inclusion'],
        'target_beneficiaries': ['Rural Women', 'Adolescent Girls', 'Women Entrepreneurs'],
        'total_project_cost': Decimal('2500000.00'),
        'funding_required': Decimal('1500000.00'),
        'currency': 'INR',
        'csr_eligibility': True,
        'preferred_contribution_type': 'cash',
        'start_date': date(2024, 6, 1),
        'end_date': date(2025, 5, 31),
        'duration_months': 12,
        'expected_outcomes': {
            'women_trained': 500,
            'digital_centers_established': 10,
            'employment_generated': 50,
            'communities_reached': 25
        },
        'kpis': {
            'training_completion_rate': '85%',
            'employment_rate': '60%',
            'community_engagement': '90%',
            'sustainability_score': '8.5/10'
        },
        'past_impact': {
            'previous_projects': 3,
            'total_beneficiaries': 1200,
            'success_rate': '92%',
            'awards_received': ['Best NGO Award 2023', 'Digital India Excellence']
        },
        'ngo_registration_number': 'NGO-RAJ-2020-001',
        'ngo_80g_status': 'Valid',
        'ngo_fcra_status': 'Valid',
        'ngo_rating': 4,
        'ngo_verification_badge': 'Verified',
        'past_projects_completed': 15,
        'project_images': [
            'https://example.com/images/digital-literacy-1.jpg',
            'https://example.com/images/digital-literacy-2.jpg'
        ],
        'proposal_document_url': 'https://example.com/documents/digital-literacy-proposal.pdf',
        'video_link': 'https://youtube.com/watch?v=digital-literacy-project',
        'status': 'published',
        'visibility': 'public',
        'created_by': 1,
        'created_at': datetime(2024, 1, 15, 10, 30, 0),
        'updated_at': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'title': 'Clean Water Access in Tribal Villages',
        'short_description': 'Providing clean drinking water through solar-powered water purification systems',
        'ngo_name': 'Water for All Foundation',
        'location_city': 'Bhopal',
        'location_region': 'Madhya Pradesh',
        'location_country': 'India',
        'sdg_goals': [6, 7, 13],  # Clean Water, Clean Energy, Climate Action
        'csr_focus_areas': ['Water & Sanitation', 'Renewable Energy', 'Climate Action'],
        'target_beneficiaries': ['Tribal Communities', 'Rural Households', 'School Children'],
        'total_project_cost': Decimal('3500000.00'),
        'funding_required': Decimal('2000000.00'),
        'currency': 'INR',
        'csr_eligibility': True,
        'preferred_contribution_type': 'cash',
        'start_date': date(2024, 7, 1),
        'end_date': date(2025, 6, 30),
        'duration_months': 12,
        'expected_outcomes': {
            'villages_covered': 20,
            'households_benefited': 1000,
            'water_systems_installed': 25,
            'health_improvement': '40% reduction in water-borne diseases'
        },
        'kpis': {
            'water_quality_improvement': '95%',
            'system_uptime': '98%',
            'community_ownership': '100%',
            'maintenance_sustainability': '9/10'
        },
        'past_impact': {
            'previous_projects': 8,
            'total_beneficiaries': 5000,
            'success_rate': '96%',
            'awards_received': ['Water Excellence Award 2023', 'Green Innovation Prize']
        },
        'ngo_registration_number': 'NGO-MP-2018-005',
        'ngo_80g_status': 'Valid',
        'ngo_fcra_status': 'Valid',
        'ngo_rating': 5,
        'ngo_verification_badge': 'Verified',
        'past_projects_completed': 25,
        'project_images': [
            'https://example.com/images/clean-water-1.jpg',
            'https://example.com/images/clean-water-2.jpg'
        ],
        'proposal_document_url': 'https://example.com/documents/clean-water-proposal.pdf',
        'video_link': 'https://youtube.com/watch?v=clean-water-project',
        'status': 'published',
        'visibility': 'public',
        'created_by': 2,
        'created_at': datetime(2024, 2, 10, 14, 20, 0),
        'updated_at': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 3,
        'title': 'Skill Development for Urban Youth',
        'short_description': 'Vocational training and job placement for underprivileged urban youth',
        'ngo_name': 'Youth Empowerment Society',
        'location_city': 'Mumbai',
        'location_region': 'Maharashtra',
        'location_country': 'India',
        'sdg_goals': [1, 4, 8],  # No Poverty, Quality Education, Decent Work
        'csr_focus_areas': ['Skill Development', 'Employment Generation', 'Poverty Alleviation'],
        'target_beneficiaries': ['Urban Youth', 'School Dropouts', 'Unemployed Youth'],
        'total_project_cost': Decimal('1800000.00'),
        'funding_required': Decimal('1200000.00'),
        'currency': 'INR',
        'csr_eligibility': True,
        'preferred_contribution_type': 'cash',
        'start_date': date(2024, 8, 1),
        'end_date': date(2025, 7, 31),
        'duration_months': 12,
        'expected_outcomes': {
            'youth_trained': 300,
            'job_placements': 200,
            'training_centers': 5,
            'average_salary_increase': '150%'
        },
        'kpis': {
            'training_completion_rate': '90%',
            'placement_rate': '75%',
            'salary_improvement': '150%',
            'employer_satisfaction': '4.2/5'
        },
        'past_impact': {
            'previous_projects': 12,
            'total_beneficiaries': 2500,
            'success_rate': '88%',
            'awards_received': ['Skill Development Excellence', 'Youth Empowerment Award']
        },
        'ngo_registration_number': 'NGO-MH-2019-012',
        'ngo_80g_status': 'Valid',
        'ngo_fcra_status': 'Valid',
        'ngo_rating': 4,
        'ngo_verification_badge': 'Verified',
        'past_projects_completed': 30,
        'project_images': [
            'https://example.com/images/skill-development-1.jpg',
            'https://example.com/images/skill-development-2.jpg'
        ],
        'proposal_document_url': 'https://example.com/documents/skill-development-proposal.pdf',
        'video_link': 'https://youtube.com/watch?v=skill-development-project',
        'status': 'published',
        'visibility': 'public',
        'created_by': 3,
        'created_at': datetime(2024, 3, 5, 9, 15, 0),
        'updated_at': datetime(2024, 3, 5, 9, 15, 0)
    },
    {
        'id': 4,
        'title': 'Healthcare Access in Remote Areas',
        'short_description': 'Mobile healthcare units providing medical services to remote tribal communities',
        'ngo_name': 'Health for All Trust',
        'location_city': 'Ranchi',
        'location_region': 'Jharkhand',
        'location_country': 'India',
        'sdg_goals': [3, 10],  # Good Health, Reduced Inequalities
        'csr_focus_areas': ['Healthcare', 'Rural Development', 'Community Health'],
        'target_beneficiaries': ['Tribal Communities', 'Rural Population', 'Children & Women'],
        'total_project_cost': Decimal('4200000.00'),
        'funding_required': Decimal('2800000.00'),
        'currency': 'INR',
        'csr_eligibility': True,
        'preferred_contribution_type': 'cash',
        'start_date': date(2024, 9, 1),
        'end_date': date(2025, 8, 31),
        'duration_months': 12,
        'expected_outcomes': {
            'communities_served': 30,
            'patients_treated': 5000,
            'mobile_units': 8,
            'health_awareness_sessions': 100
        },
        'kpis': {
            'patient_satisfaction': '92%',
            'treatment_success_rate': '85%',
            'community_engagement': '95%',
            'health_improvement': '60%'
        },
        'past_impact': {
            'previous_projects': 6,
            'total_beneficiaries': 15000,
            'success_rate': '94%',
            'awards_received': ['Healthcare Excellence Award', 'Rural Development Prize']
        },
        'ngo_registration_number': 'NGO-JH-2021-003',
        'ngo_80g_status': 'Valid',
        'ngo_fcra_status': 'Valid',
        'ngo_rating': 5,
        'ngo_verification_badge': 'Verified',
        'past_projects_completed': 18,
        'project_images': [
            'https://example.com/images/healthcare-1.jpg',
            'https://example.com/images/healthcare-2.jpg'
        ],
        'proposal_document_url': 'https://example.com/documents/healthcare-proposal.pdf',
        'video_link': 'https://youtube.com/watch?v=healthcare-project',
        'status': 'published',
        'visibility': 'public',
        'created_by': 4,
        'created_at': datetime(2024, 4, 12, 11, 45, 0),
        'updated_at': datetime(2024, 4, 12, 11, 45, 0)
    },
    {
        'id': 5,
        'title': 'Sustainable Agriculture Training',
        'short_description': 'Training farmers in organic farming and sustainable agricultural practices',
        'ngo_name': 'Green Earth Foundation',
        'location_city': 'Pune',
        'location_region': 'Maharashtra',
        'location_country': 'India',
        'sdg_goals': [2, 12, 15],  # Zero Hunger, Responsible Consumption, Life on Land
        'csr_focus_areas': ['Agriculture', 'Environmental Conservation', 'Rural Development'],
        'target_beneficiaries': ['Small Farmers', 'Agricultural Workers', 'Rural Communities'],
        'total_project_cost': Decimal('1600000.00'),
        'funding_required': Decimal('1000000.00'),
        'currency': 'INR',
        'csr_eligibility': True,
        'preferred_contribution_type': 'cash',
        'start_date': date(2024, 10, 1),
        'end_date': date(2025, 9, 30),
        'duration_months': 12,
        'expected_outcomes': {
            'farmers_trained': 400,
            'acres_converted': 2000,
            'income_increase': '80%',
            'demonstration_farms': 10
        },
        'kpis': {
            'training_completion_rate': '88%',
            'adoption_rate': '75%',
            'income_improvement': '80%',
            'environmental_impact': '9/10'
        },
        'past_impact': {
            'previous_projects': 9,
            'total_beneficiaries': 3000,
            'success_rate': '91%',
            'awards_received': ['Agricultural Innovation Award', 'Green Excellence Prize']
        },
        'ngo_registration_number': 'NGO-MH-2020-008',
        'ngo_80g_status': 'Valid',
        'ngo_fcra_status': 'Valid',
        'ngo_rating': 4,
        'ngo_verification_badge': 'Verified',
        'past_projects_completed': 22,
        'project_images': [
            'https://example.com/images/agriculture-1.jpg',
            'https://example.com/images/agriculture-2.jpg'
        ],
        'proposal_document_url': 'https://example.com/documents/agriculture-proposal.pdf',
        'video_link': 'https://youtube.com/watch?v=agriculture-project',
        'status': 'published',
        'visibility': 'public',
        'created_by': 5,
        'created_at': datetime(2024, 5, 20, 16, 30, 0),
        'updated_at': datetime(2024, 5, 20, 16, 30, 0)
    }
]

# Sample Project Milestones Data
SAMPLE_MILESTONES = [
    # Milestones for Project 1 (Digital Literacy)
    {
        'id': 1,
        'project_id': 1,
        'title': 'Community Assessment & Planning',
        'description': 'Conduct needs assessment and establish community partnerships',
        'target_date': date(2024, 7, 31),
        'completion_date': date(2024, 7, 25),
        'status': 'completed',
        'progress_percentage': 100,
        'created_at': datetime(2024, 6, 1, 10, 0, 0),
        'updated_at': datetime(2024, 7, 25, 15, 30, 0)
    },
    {
        'id': 2,
        'project_id': 1,
        'title': 'Training Center Setup',
        'description': 'Establish 10 digital literacy training centers',
        'target_date': date(2024, 9, 30),
        'completion_date': date(2024, 9, 20),
        'status': 'completed',
        'progress_percentage': 100,
        'created_at': datetime(2024, 6, 1, 10, 0, 0),
        'updated_at': datetime(2024, 9, 20, 14, 15, 0)
    },
    {
        'id': 3,
        'project_id': 1,
        'title': 'First Batch Training',
        'description': 'Complete training for first batch of 100 women',
        'target_date': date(2024, 12, 31),
        'completion_date': None,
        'status': 'in_progress',
        'progress_percentage': 60,
        'created_at': datetime(2024, 6, 1, 10, 0, 0),
        'updated_at': datetime(2024, 11, 15, 9, 45, 0)
    },
    # Milestones for Project 2 (Clean Water)
    {
        'id': 4,
        'project_id': 2,
        'title': 'Site Survey & Planning',
        'description': 'Conduct water quality tests and site surveys',
        'target_date': date(2024, 8, 31),
        'completion_date': date(2024, 8, 25),
        'status': 'completed',
        'progress_percentage': 100,
        'created_at': datetime(2024, 7, 1, 10, 0, 0),
        'updated_at': datetime(2024, 8, 25, 11, 20, 0)
    },
    {
        'id': 5,
        'project_id': 2,
        'title': 'System Installation',
        'description': 'Install solar-powered water purification systems',
        'target_date': date(2024, 11, 30),
        'completion_date': None,
        'status': 'in_progress',
        'progress_percentage': 70,
        'created_at': datetime(2024, 7, 1, 10, 0, 0),
        'updated_at': datetime(2024, 11, 10, 16, 30, 0)
    }
]

# Sample Project Applications Data
SAMPLE_APPLICATIONS = [
    {
        'id': 1,
        'project_id': 1,
        'company_id': 1,
        'application_type': 'funding',
        'amount_offered': Decimal('1000000.00'),
        'contribution_details': 'Full funding support for digital literacy project with quarterly progress monitoring',
        'status': 'approved',
        'notes': 'Excellent project alignment with our CSR focus on education and women empowerment',
        'created_at': datetime(2024, 2, 15, 14, 30, 0),
        'updated_at': datetime(2024, 3, 1, 10, 15, 0)
    },
    {
        'id': 2,
        'project_id': 2,
        'company_id': 2,
        'application_type': 'funding',
        'amount_offered': Decimal('1500000.00'),
        'contribution_details': 'Partial funding with technical support for water purification systems',
        'status': 'pending',
        'notes': 'Project shows strong environmental impact potential',
        'created_at': datetime(2024, 3, 10, 9, 45, 0),
        'updated_at': datetime(2024, 3, 10, 9, 45, 0)
    },
    {
        'id': 3,
        'project_id': 3,
        'company_id': 3,
        'application_type': 'partnership',
        'amount_offered': None,
        'contribution_details': 'Partnership for skill development with job placement support',
        'status': 'approved',
        'notes': 'Strong alignment with our workforce development initiatives',
        'created_at': datetime(2024, 4, 5, 11, 20, 0),
        'updated_at': datetime(2024, 4, 20, 15, 30, 0)
    }
]

# Sample Project Impact Reports Data
SAMPLE_IMPACT_REPORTS = [
    {
        'id': 1,
        'project_id': 1,
        'report_period': 'quarterly',
        'report_date': date(2024, 9, 30),
        'impact_metrics': {
            'women_trained': 150,
            'centers_established': 8,
            'employment_generated': 25,
            'community_engagement': '85%'
        },
        'challenges_faced': 'Limited internet connectivity in some rural areas',
        'lessons_learned': 'Community involvement is crucial for project success',
        'next_steps': 'Expand to additional villages and strengthen partnerships',
        'attachments': [
            'https://example.com/reports/digital-literacy-q3-2024.pdf',
            'https://example.com/reports/digital-literacy-photos-q3.zip'
        ],
        'created_by': 1,
        'created_at': datetime(2024, 10, 5, 12, 0, 0),
        'updated_at': datetime(2024, 10, 5, 12, 0, 0)
    },
    {
        'id': 2,
        'project_id': 2,
        'report_period': 'quarterly',
        'report_date': date(2024, 9, 30),
        'impact_metrics': {
            'villages_covered': 12,
            'households_benefited': 600,
            'systems_installed': 15,
            'health_improvement': '35% reduction in water-borne diseases'
        },
        'challenges_faced': 'Delays in equipment procurement due to supply chain issues',
        'lessons_learned': 'Local capacity building is essential for system maintenance',
        'next_steps': 'Complete remaining installations and conduct maintenance training',
        'attachments': [
            'https://example.com/reports/clean-water-q3-2024.pdf',
            'https://example.com/reports/water-quality-tests-q3.xlsx'
        ],
        'created_by': 2,
        'created_at': datetime(2024, 10, 8, 14, 30, 0),
        'updated_at': datetime(2024, 10, 8, 14, 30, 0)
    }
]

def get_sample_projects():
    """Return sample projects data"""
    return SAMPLE_PROJECTS

def get_sample_milestones():
    """Return sample milestones data"""
    return SAMPLE_MILESTONES

def get_sample_applications():
    """Return sample applications data"""
    return SAMPLE_APPLICATIONS

def get_sample_impact_reports():
    """Return sample impact reports data"""
    return SAMPLE_IMPACT_REPORTS

def get_all_sample_data():
    """Return all sample data for projects and related models"""
    return {
        'projects': SAMPLE_PROJECTS,
        'milestones': SAMPLE_MILESTONES,
        'applications': SAMPLE_APPLICATIONS,
        'impact_reports': SAMPLE_IMPACT_REPORTS
    }
