"""
Sample Data for Company Details and Related Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json
from decimal import Decimal

# Sample Companies Data
SAMPLE_COMPANIES = [
    {
        'id': 1,
        'user_id': 1,
        'company_name': 'TechCorp Solutions Ltd.',
        'logo_url': 'https://example.com/logos/techcorp-logo.png',
        'registration_id': 'TECH001',
        'industry': 'Technology',
        'hq_country': 'India',
        'hq_state': 'Karnataka',
        'hq_city': 'Bangalore',
        'website': 'https://www.techcorp.com',
        'created_at': datetime(2024, 1, 15, 10, 30, 0),
        'updated_at': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'user_id': 2,
        'company_name': 'GreenEnergy Industries',
        'logo_url': 'https://example.com/logos/greenenergy-logo.png',
        'registration_id': 'GREEN002',
        'industry': 'Energy',
        'hq_country': 'India',
        'hq_state': 'Maharashtra',
        'hq_city': 'Mumbai',
        'website': 'https://www.greenenergy.com',
        'created_at': datetime(2024, 2, 10, 14, 20, 0),
        'updated_at': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 3,
        'user_id': 3,
        'company_name': 'Healthcare Plus Pvt. Ltd.',
        'logo_url': 'https://example.com/logos/healthcare-logo.png',
        'registration_id': 'HEALTH003',
        'industry': 'Healthcare',
        'hq_country': 'India',
        'hq_state': 'Delhi',
        'hq_city': 'New Delhi',
        'website': 'https://www.healthcareplus.com',
        'created_at': datetime(2024, 3, 5, 9, 15, 0),
        'updated_at': datetime(2024, 3, 5, 9, 15, 0)
    },
    {
        'id': 4,
        'user_id': 4,
        'company_name': 'EduTech Innovations',
        'logo_url': 'https://example.com/logos/edutech-logo.png',
        'registration_id': 'EDU004',
        'industry': 'Education',
        'hq_country': 'India',
        'hq_state': 'Telangana',
        'hq_city': 'Hyderabad',
        'website': 'https://www.edutech.com',
        'created_at': datetime(2024, 4, 12, 11, 45, 0),
        'updated_at': datetime(2024, 4, 12, 11, 45, 0)
    },
    {
        'id': 5,
        'user_id': 5,
        'company_name': 'AgriTech Solutions',
        'logo_url': 'https://example.com/logos/agritech-logo.png',
        'registration_id': 'AGRI005',
        'industry': 'Agriculture',
        'hq_country': 'India',
        'hq_state': 'Punjab',
        'hq_city': 'Chandigarh',
        'website': 'https://www.agritech.com',
        'created_at': datetime(2024, 5, 20, 16, 30, 0),
        'updated_at': datetime(2024, 5, 20, 16, 30, 0)
    }
]

# Sample Company Branches Data
SAMPLE_BRANCHES = [
    {
        'id': 1,
        'company_id': 1,
        'country': 'India',
        'state': 'Maharashtra',
        'city': 'Mumbai',
        'created_at': datetime(2024, 1, 20, 12, 0, 0)
    },
    {
        'id': 2,
        'company_id': 1,
        'country': 'India',
        'state': 'Delhi',
        'city': 'New Delhi',
        'created_at': datetime(2024, 1, 25, 14, 30, 0)
    },
    {
        'id': 3,
        'company_id': 2,
        'country': 'India',
        'state': 'Gujarat',
        'city': 'Ahmedabad',
        'created_at': datetime(2024, 2, 15, 10, 15, 0)
    },
    {
        'id': 4,
        'company_id': 3,
        'country': 'India',
        'state': 'Karnataka',
        'city': 'Bangalore',
        'created_at': datetime(2024, 3, 10, 16, 45, 0)
    },
    {
        'id': 5,
        'company_id': 4,
        'country': 'India',
        'state': 'Tamil Nadu',
        'city': 'Chennai',
        'created_at': datetime(2024, 4, 18, 9, 30, 0)
    }
]

# Sample CSR Contacts Data
SAMPLE_CSR_CONTACTS = [
    {
        'id': 1,
        'company_id': 1,
        'contact_name': 'Priya Sharma',
        'contact_role': 'CSR Manager',
        'email': 'priya.sharma@techcorp.com',
        'phone': '+91-9876543210',
        'created_at': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'company_id': 2,
        'contact_name': 'Rajesh Kumar',
        'contact_role': 'Sustainability Officer',
        'email': 'rajesh.kumar@greenenergy.com',
        'phone': '+91-9876543211',
        'created_at': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 3,
        'company_id': 3,
        'contact_name': 'Dr. Meera Patel',
        'contact_role': 'CSR Director',
        'email': 'meera.patel@healthcareplus.com',
        'phone': '+91-9876543212',
        'created_at': datetime(2024, 3, 5, 9, 15, 0)
    },
    {
        'id': 4,
        'company_id': 4,
        'contact_name': 'Amit Singh',
        'contact_role': 'CSR Coordinator',
        'email': 'amit.singh@edutech.com',
        'phone': '+91-9876543213',
        'created_at': datetime(2024, 4, 12, 11, 45, 0)
    },
    {
        'id': 5,
        'company_id': 5,
        'contact_name': 'Sunita Reddy',
        'contact_role': 'CSR Manager',
        'email': 'sunita.reddy@agritech.com',
        'phone': '+91-9876543214',
        'created_at': datetime(2024, 5, 20, 16, 30, 0)
    }
]

# Sample Budgets Data
SAMPLE_BUDGETS = [
    {
        'id': 1,
        'company_id': 1,
        'amount': Decimal('50000000.00'),
        'currency': 'INR',
        'project_size': 'Large',
        'splits': {
            'education': 30,
            'healthcare': 25,
            'environment': 20,
            'rural_development': 15,
            'women_empowerment': 10
        },
        'created_at': datetime(2024, 1, 15, 10, 30, 0),
        'updated_at': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'company_id': 2,
        'amount': Decimal('35000000.00'),
        'currency': 'INR',
        'project_size': 'Medium',
        'splits': {
            'environment': 40,
            'renewable_energy': 30,
            'water_conservation': 20,
            'climate_action': 10
        },
        'created_at': datetime(2024, 2, 10, 14, 20, 0),
        'updated_at': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 3,
        'company_id': 3,
        'amount': Decimal('40000000.00'),
        'currency': 'INR',
        'project_size': 'Large',
        'splits': {
            'healthcare': 45,
            'medical_research': 25,
            'rural_health': 20,
            'health_awareness': 10
        },
        'created_at': datetime(2024, 3, 5, 9, 15, 0),
        'updated_at': datetime(2024, 3, 5, 9, 15, 0)
    },
    {
        'id': 4,
        'company_id': 4,
        'amount': Decimal('25000000.00'),
        'currency': 'INR',
        'project_size': 'Medium',
        'splits': {
            'education': 50,
            'skill_development': 30,
            'digital_literacy': 20
        },
        'created_at': datetime(2024, 4, 12, 11, 45, 0),
        'updated_at': datetime(2024, 4, 12, 11, 45, 0)
    },
    {
        'id': 5,
        'company_id': 5,
        'amount': Decimal('30000000.00'),
        'currency': 'INR',
        'project_size': 'Medium',
        'splits': {
            'agriculture': 40,
            'rural_development': 30,
            'farmer_empowerment': 20,
            'sustainable_farming': 10
        },
        'created_at': datetime(2024, 5, 20, 16, 30, 0),
        'updated_at': datetime(2024, 5, 20, 16, 30, 0)
    }
]

# Sample Focus Areas Data
SAMPLE_FOCUS_AREAS = [
    {
        'id': 1,
        'company_id': 1,
        'priority_sdgs': ['Quality Education', 'Gender Equality', 'Industry, Innovation and Infrastructure'],
        'esg_goals': 'Promote digital literacy and technology adoption in rural areas',
        'themes': 'Digital Inclusion, Women Empowerment, Rural Development',
        'target_year': '2030',
        'reporting_standard': 'GRI Standards',
        'created_at': datetime(2024, 1, 15, 10, 30, 0),
        'updated_at': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'company_id': 2,
        'priority_sdgs': ['Affordable and Clean Energy', 'Climate Action', 'Life on Land'],
        'esg_goals': 'Achieve carbon neutrality and promote renewable energy adoption',
        'themes': 'Clean Energy, Environmental Conservation, Climate Action',
        'target_year': '2030',
        'reporting_standard': 'SASB Standards',
        'created_at': datetime(2024, 2, 10, 14, 20, 0),
        'updated_at': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 3,
        'company_id': 3,
        'priority_sdgs': ['Good Health and Well-being', 'Reduced Inequalities'],
        'esg_goals': 'Improve healthcare access in underserved communities',
        'themes': 'Healthcare Access, Rural Health, Medical Research',
        'target_year': '2030',
        'reporting_standard': 'GRI Standards',
        'created_at': datetime(2024, 3, 5, 9, 15, 0),
        'updated_at': datetime(2024, 3, 5, 9, 15, 0)
    },
    {
        'id': 4,
        'company_id': 4,
        'priority_sdgs': ['Quality Education', 'Decent Work and Economic Growth'],
        'esg_goals': 'Bridge the digital divide and enhance employability',
        'themes': 'Education Technology, Skill Development, Digital Literacy',
        'target_year': '2030',
        'reporting_standard': 'GRI Standards',
        'created_at': datetime(2024, 4, 12, 11, 45, 0),
        'updated_at': datetime(2024, 4, 12, 11, 45, 0)
    },
    {
        'id': 5,
        'company_id': 5,
        'priority_sdgs': ['Zero Hunger', 'Responsible Consumption and Production', 'Life on Land'],
        'esg_goals': 'Promote sustainable agriculture and food security',
        'themes': 'Sustainable Agriculture, Food Security, Rural Development',
        'target_year': '2030',
        'reporting_standard': 'GRI Standards',
        'created_at': datetime(2024, 5, 20, 16, 30, 0),
        'updated_at': datetime(2024, 5, 20, 16, 30, 0)
    }
]

# Sample Compliance Documents Data
SAMPLE_COMPLIANCE_DOCUMENTS = [
    {
        'id': 1,
        'company_id': 1,
        'document_type': 'policy',
        'file_name': 'CSR_Policy_2024.pdf',
        'file_url': 'https://example.com/documents/techcorp-csr-policy-2024.pdf',
        'file_size': 2048576,
        'upload_date': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'company_id': 1,
        'document_type': 'report',
        'file_name': 'CSR_Report_2023.pdf',
        'file_url': 'https://example.com/documents/techcorp-csr-report-2023.pdf',
        'file_size': 3145728,
        'upload_date': datetime(2024, 1, 20, 14, 15, 0)
    },
    {
        'id': 3,
        'company_id': 2,
        'document_type': 'policy',
        'file_name': 'Sustainability_Policy_2024.pdf',
        'file_url': 'https://example.com/documents/greenenergy-sustainability-policy-2024.pdf',
        'file_size': 1572864,
        'upload_date': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 4,
        'company_id': 3,
        'document_type': 'certificate',
        'file_name': 'ISO_14001_Certificate.pdf',
        'file_url': 'https://example.com/documents/healthcareplus-iso-14001.pdf',
        'file_size': 1048576,
        'upload_date': datetime(2024, 3, 5, 9, 15, 0)
    },
    {
        'id': 5,
        'company_id': 4,
        'document_type': 'report',
        'file_name': 'ESG_Report_2023.pdf',
        'file_url': 'https://example.com/documents/edutech-esg-report-2023.pdf',
        'file_size': 2621440,
        'upload_date': datetime(2024, 4, 12, 11, 45, 0)
    }
]

# Sample NGO Preferences Data
SAMPLE_NGO_PREFERENCES = [
    {
        'id': 1,
        'company_id': 1,
        'ngo_size': 'Mid-level',
        'partnership_model': 'Funding + Execution',
        'regions': ['Karnataka', 'Maharashtra', 'Delhi', 'Telangana'],
        'spend_history': 'Successfully partnered with 15+ NGOs in education and women empowerment',
        'created_at': datetime(2024, 1, 15, 10, 30, 0),
        'updated_at': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'company_id': 2,
        'ngo_size': 'Large',
        'partnership_model': 'Funding + Technical Support',
        'regions': ['Maharashtra', 'Gujarat', 'Rajasthan', 'Madhya Pradesh'],
        'spend_history': 'Invested in 20+ environmental and renewable energy projects',
        'created_at': datetime(2024, 2, 10, 14, 20, 0),
        'updated_at': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 3,
        'company_id': 3,
        'ngo_size': 'Mid-level',
        'partnership_model': 'Funding + Medical Support',
        'regions': ['Delhi', 'Karnataka', 'Tamil Nadu', 'Kerala'],
        'spend_history': 'Supported 25+ healthcare initiatives across India',
        'created_at': datetime(2024, 3, 5, 9, 15, 0),
        'updated_at': datetime(2024, 3, 5, 9, 15, 0)
    },
    {
        'id': 4,
        'company_id': 4,
        'ngo_size': 'Small',
        'partnership_model': 'Funding + Mentoring',
        'regions': ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Maharashtra'],
        'spend_history': 'Partnered with 10+ education-focused NGOs',
        'created_at': datetime(2024, 4, 12, 11, 45, 0),
        'updated_at': datetime(2024, 4, 12, 11, 45, 0)
    },
    {
        'id': 5,
        'company_id': 5,
        'ngo_size': 'Mid-level',
        'partnership_model': 'Funding + Agricultural Support',
        'regions': ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh'],
        'spend_history': 'Supported 18+ agricultural and rural development projects',
        'created_at': datetime(2024, 5, 20, 16, 30, 0),
        'updated_at': datetime(2024, 5, 20, 16, 30, 0)
    }
]

# Sample AI Configs Data
SAMPLE_AI_CONFIGS = [
    {
        'id': 1,
        'company_id': 1,
        'optimize_for': ['Impact Measurement', 'Cost Efficiency', 'Scalability'],
        'risk_appetite': 'Medium',
        'alignment_mode': 'Strict compliance',
        'integrations': ['SAP', 'Workday', 'Salesforce'],
        'created_at': datetime(2024, 1, 15, 10, 30, 0),
        'updated_at': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'company_id': 2,
        'optimize_for': ['Environmental Impact', 'Sustainability Metrics', 'Carbon Reduction'],
        'risk_appetite': 'Low',
        'alignment_mode': 'Flexible compliance',
        'integrations': ['Oracle', 'Microsoft Dynamics', 'Tableau'],
        'created_at': datetime(2024, 2, 10, 14, 20, 0),
        'updated_at': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 3,
        'company_id': 3,
        'optimize_for': ['Healthcare Outcomes', 'Patient Impact', 'Medical Research'],
        'risk_appetite': 'Medium',
        'alignment_mode': 'Strict compliance',
        'integrations': ['Epic Systems', 'Cerner', 'Meditech'],
        'created_at': datetime(2024, 3, 5, 9, 15, 0),
        'updated_at': datetime(2024, 3, 5, 9, 15, 0)
    },
    {
        'id': 4,
        'company_id': 4,
        'optimize_for': ['Educational Impact', 'Learning Outcomes', 'Student Success'],
        'risk_appetite': 'Medium',
        'alignment_mode': 'Balanced compliance',
        'integrations': ['Canvas', 'Blackboard', 'Moodle'],
        'created_at': datetime(2024, 4, 12, 11, 45, 0),
        'updated_at': datetime(2024, 4, 12, 11, 45, 0)
    },
    {
        'id': 5,
        'company_id': 5,
        'optimize_for': ['Agricultural Yield', 'Farmer Income', 'Sustainable Practices'],
        'risk_appetite': 'High',
        'alignment_mode': 'Flexible compliance',
        'integrations': ['FarmERP', 'AgriTech Solutions', 'CropIn'],
        'created_at': datetime(2024, 5, 20, 16, 30, 0),
        'updated_at': datetime(2024, 5, 20, 16, 30, 0)
    }
]

# Sample User Roles Data
SAMPLE_USER_ROLES = [
    {
        'id': 1,
        'company_id': 1,
        'email': 'csr.team@techcorp.com',
        'role': 'CSR Manager',
        'created_at': datetime(2024, 1, 15, 10, 30, 0)
    },
    {
        'id': 2,
        'company_id': 1,
        'email': 'sustainability@techcorp.com',
        'role': 'Sustainability Officer',
        'created_at': datetime(2024, 1, 20, 12, 0, 0)
    },
    {
        'id': 3,
        'company_id': 2,
        'email': 'csr@greenenergy.com',
        'role': 'CSR Director',
        'created_at': datetime(2024, 2, 10, 14, 20, 0)
    },
    {
        'id': 4,
        'company_id': 3,
        'email': 'csr.healthcare@healthcareplus.com',
        'role': 'CSR Manager',
        'created_at': datetime(2024, 3, 5, 9, 15, 0)
    },
    {
        'id': 5,
        'company_id': 4,
        'email': 'csr.edutech@edutech.com',
        'role': 'CSR Coordinator',
        'created_at': datetime(2024, 4, 12, 11, 45, 0)
    }
]

def get_sample_companies():
    """Return sample companies data"""
    return SAMPLE_COMPANIES

def get_sample_branches():
    """Return sample branches data"""
    return SAMPLE_BRANCHES

def get_sample_csr_contacts():
    """Return sample CSR contacts data"""
    return SAMPLE_CSR_CONTACTS

def get_sample_budgets():
    """Return sample budgets data"""
    return SAMPLE_BUDGETS

def get_sample_focus_areas():
    """Return sample focus areas data"""
    return SAMPLE_FOCUS_AREAS

def get_sample_compliance_documents():
    """Return sample compliance documents data"""
    return SAMPLE_COMPLIANCE_DOCUMENTS

def get_sample_ngo_preferences():
    """Return sample NGO preferences data"""
    return SAMPLE_NGO_PREFERENCES

def get_sample_ai_configs():
    """Return sample AI configs data"""
    return SAMPLE_AI_CONFIGS

def get_sample_user_roles():
    """Return sample user roles data"""
    return SAMPLE_USER_ROLES

def get_all_sample_data():
    """Return all sample data for company details and related models"""
    return {
        'companies': SAMPLE_COMPANIES,
        'branches': SAMPLE_BRANCHES,
        'csr_contacts': SAMPLE_CSR_CONTACTS,
        'budgets': SAMPLE_BUDGETS,
        'focus_areas': SAMPLE_FOCUS_AREAS,
        'compliance_documents': SAMPLE_COMPLIANCE_DOCUMENTS,
        'ngo_preferences': SAMPLE_NGO_PREFERENCES,
        'ai_configs': SAMPLE_AI_CONFIGS,
        'user_roles': SAMPLE_USER_ROLES
    }
