"""
Sample Data for NGO Marketplace Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json
from decimal import Decimal

# Sample NGO Profiles Data
SAMPLE_NGO_PROFILES = [
    {
        'id': 1,
        'name': 'Women Empowerment Foundation',
        'registration_number': 'NGO-RAJ-2020-001',
        'legal_status': 'Trust',
        'year_established': 2020,
        'address': '123 Women Empowerment Street, Jaipur',
        'city': 'Jaipur',
        'state': 'Rajasthan',
        'country': 'India',
        'phone': '+91-9876543210',
        'email': 'info@womenempowerment.org',
        'website': 'https://www.womenempowerment.org',
        'pan_number': 'ABCDE1234F',
        'tan_number': 'JAIP1234567',
        'gst_number': '08ABCDE1234F1Z5',
        '_80g_status': 'Valid',
        'fcra_status': 'Valid',
        'fcra_number': '123456789',
        'rating': 4,
        'verification_badge': 'Verified',
        'total_projects_completed': 15,
        'total_beneficiaries_reached': 5000,
        'primary_sectors': json.dumps(['Education', 'Women Empowerment', 'Digital Inclusion']),
        'sdg_focus': json.dumps([4, 5, 10]),
        'geographic_focus': json.dumps(['Rajasthan', 'Maharashtra', 'Delhi']),
        'annual_budget': Decimal('25000000.00'),
        'currency': 'INR',
        'funding_sources': json.dumps(['Corporate CSR', 'Government Grants', 'Individual Donations']),
        'logo_url': 'https://example.com/logos/women-empowerment-logo.png',
        'profile_image_url': 'https://example.com/images/women-empowerment-profile.jpg',
        'documents': json.dumps([
            'https://example.com/documents/registration-certificate.pdf',
            'https://example.com/documents/80g-certificate.pdf',
            'https://example.com/documents/fcra-certificate.pdf'
        ]),
        'about': 'Women Empowerment Foundation is dedicated to empowering rural women through digital literacy, skill development, and economic independence programs. We have successfully trained over 5000 women across Rajasthan and neighboring states.',
        'status': 'active',
        'created_at': datetime(2024, 1, 10, 12, 0, 0),
        'updated_at': datetime(2024, 4, 15, 16, 30, 0)
    },
    {
        'id': 2,
        'name': 'Water for All Foundation',
        'registration_number': 'NGO-MP-2018-005',
        'legal_status': 'Society',
        'year_established': 2018,
        'address': '456 Water Conservation Road, Bhopal',
        'city': 'Bhopal',
        'state': 'Madhya Pradesh',
        'country': 'India',
        'phone': '+91-9876543211',
        'email': 'contact@waterforall.org',
        'website': 'https://www.waterforall.org',
        'pan_number': 'BCDEF2345G',
        'tan_number': 'BHOP2345678',
        'gst_number': '23BCDEF2345G2Z6',
        '_80g_status': 'Valid',
        'fcra_status': 'Valid',
        'fcra_number': '234567890',
        'rating': 5,
        'verification_badge': 'Verified',
        'total_projects_completed': 25,
        'total_beneficiaries_reached': 15000,
        'primary_sectors': json.dumps(['Water & Sanitation', 'Renewable Energy', 'Climate Action']),
        'sdg_focus': json.dumps([6, 7, 13]),
        'geographic_focus': json.dumps(['Madhya Pradesh', 'Gujarat', 'Rajasthan']),
        'annual_budget': Decimal('35000000.00'),
        'currency': 'INR',
        'funding_sources': json.dumps(['Environmental Grants', 'Corporate Partnerships', 'International Aid']),
        'logo_url': 'https://example.com/logos/water-for-all-logo.png',
        'profile_image_url': 'https://example.com/images/water-for-all-profile.jpg',
        'documents': json.dumps([
            'https://example.com/documents/water-registration.pdf',
            'https://example.com/documents/water-80g.pdf',
            'https://example.com/documents/water-fcra.pdf'
        ]),
        'about': 'Water for All Foundation works to provide clean drinking water to tribal and rural communities through sustainable water purification systems. We have installed over 100 solar-powered water systems across central India.',
        'status': 'active',
        'created_at': datetime(2024, 1, 15, 14, 30, 0),
        'updated_at': datetime(2024, 4, 10, 11, 45, 0)
    },
    {
        'id': 3,
        'name': 'Youth Empowerment Society',
        'registration_number': 'NGO-MH-2019-012',
        'legal_status': 'Society',
        'year_established': 2019,
        'address': '789 Youth Development Avenue, Mumbai',
        'city': 'Mumbai',
        'state': 'Maharashtra',
        'country': 'India',
        'phone': '+91-9876543212',
        'email': 'info@youthempowerment.org',
        'website': 'https://www.youthempowerment.org',
        'pan_number': 'CDEFG3456H',
        'tan_number': 'MUMB3456789',
        'gst_number': '27CDEFG3456H3Z7',
        '_80g_status': 'Valid',
        'fcra_status': 'Valid',
        'fcra_number': '345678901',
        'rating': 4,
        'verification_badge': 'Verified',
        'total_projects_completed': 30,
        'total_beneficiaries_reached': 8000,
        'primary_sectors': json.dumps(['Skill Development', 'Employment Generation', 'Poverty Alleviation']),
        'sdg_focus': json.dumps([1, 4, 8]),
        'geographic_focus': json.dumps(['Maharashtra', 'Karnataka', 'Delhi']),
        'annual_budget': Decimal('20000000.00'),
        'currency': 'INR',
        'funding_sources': json.dumps(['Skill Development Grants', 'Corporate CSR', 'Government Programs']),
        'logo_url': 'https://example.com/logos/youth-empowerment-logo.png',
        'profile_image_url': 'https://example.com/images/youth-empowerment-profile.jpg',
        'documents': json.dumps([
            'https://example.com/documents/youth-registration.pdf',
            'https://example.com/documents/youth-80g.pdf',
            'https://example.com/documents/youth-fcra.pdf'
        ]),
        'about': 'Youth Empowerment Society focuses on providing vocational training and job placement for underprivileged urban youth. We have successfully placed over 2000 youth in various industries.',
        'status': 'active',
        'created_at': datetime(2024, 1, 20, 9, 15, 0),
        'updated_at': datetime(2024, 4, 12, 13, 20, 0)
    },
    {
        'id': 4,
        'name': 'Health for All Trust',
        'registration_number': 'NGO-JH-2021-003',
        'legal_status': 'Trust',
        'year_established': 2021,
        'address': '321 Healthcare Street, Ranchi',
        'city': 'Ranchi',
        'state': 'Jharkhand',
        'country': 'India',
        'phone': '+91-9876543213',
        'email': 'contact@healthforall.org',
        'website': 'https://www.healthforall.org',
        'pan_number': 'DEFGH4567I',
        'tan_number': 'RANC4567890',
        'gst_number': '20DEFGH4567I4Z8',
        '_80g_status': 'Valid',
        'fcra_status': 'Valid',
        'fcra_number': '456789012',
        'rating': 5,
        'verification_badge': 'Verified',
        'total_projects_completed': 18,
        'total_beneficiaries_reached': 25000,
        'primary_sectors': json.dumps(['Healthcare', 'Rural Development', 'Community Health']),
        'sdg_focus': json.dumps([3, 10]),
        'geographic_focus': json.dumps(['Jharkhand', 'Bihar', 'West Bengal']),
        'annual_budget': Decimal('40000000.00'),
        'currency': 'INR',
        'funding_sources': json.dumps(['Healthcare Grants', 'Corporate CSR', 'International Health Organizations']),
        'logo_url': 'https://example.com/logos/health-for-all-logo.png',
        'profile_image_url': 'https://example.com/images/health-for-all-profile.jpg',
        'documents': json.dumps([
            'https://example.com/documents/health-registration.pdf',
            'https://example.com/documents/health-80g.pdf',
            'https://example.com/documents/health-fcra.pdf'
        ]),
        'about': 'Health for All Trust provides mobile healthcare services to remote tribal communities. We operate 8 mobile healthcare units serving over 30 communities in eastern India.',
        'status': 'active',
        'created_at': datetime(2024, 1, 25, 16, 45, 0),
        'updated_at': datetime(2024, 4, 8, 10, 30, 0)
    },
    {
        'id': 5,
        'name': 'Green Earth Foundation',
        'registration_number': 'NGO-MH-2020-008',
        'legal_status': 'Society',
        'year_established': 2020,
        'address': '654 Green Technology Park, Pune',
        'city': 'Pune',
        'state': 'Maharashtra',
        'country': 'India',
        'phone': '+91-9876543214',
        'email': 'info@greenearth.org',
        'website': 'https://www.greenearth.org',
        'pan_number': 'EFGHI5678J',
        'tan_number': 'PUNE5678901',
        'gst_number': '27EFGHI5678J5Z9',
        '_80g_status': 'Valid',
        'fcra_status': 'Valid',
        'fcra_number': '567890123',
        'rating': 4,
        'verification_badge': 'Verified',
        'total_projects_completed': 22,
        'total_beneficiaries_reached': 12000,
        'primary_sectors': json.dumps(['Agriculture', 'Environmental Conservation', 'Rural Development']),
        'sdg_focus': json.dumps([2, 12, 15]),
        'geographic_focus': json.dumps(['Maharashtra', 'Karnataka', 'Gujarat']),
        'annual_budget': Decimal('30000000.00'),
        'currency': 'INR',
        'funding_sources': json.dumps(['Agricultural Grants', 'Environmental Funds', 'Corporate CSR']),
        'logo_url': 'https://example.com/logos/green-earth-logo.png',
        'profile_image_url': 'https://example.com/images/green-earth-profile.jpg',
        'documents': json.dumps([
            'https://example.com/documents/green-registration.pdf',
            'https://example.com/documents/green-80g.pdf',
            'https://example.com/documents/green-fcra.pdf'
        ]),
        'about': 'Green Earth Foundation promotes sustainable agriculture and environmental conservation. We have trained over 400 farmers in organic farming practices and established 10 demonstration farms.',
        'status': 'active',
        'created_at': datetime(2024, 1, 30, 11, 20, 0),
        'updated_at': datetime(2024, 4, 5, 15, 10, 0)
    }
]

# Sample NGO Impact Events Data
SAMPLE_NGO_IMPACT_EVENTS = [
    {
        'id': 1,
        'ngo_id': 1,
        'date': date(2024, 3, 15),
        'title': 'Digital Literacy Training Completion',
        'description': 'Successfully completed digital literacy training for 150 rural women in Jaipur district',
        'kpis': [
            {'label': 'Women Trained', 'value': '150'},
            {'label': 'Training Centers', 'value': '8'},
            {'label': 'Employment Generated', 'value': '25'}
        ],
        'color': 'blue',
        'created_at': datetime(2024, 3, 15, 16, 30, 0)
    },
    {
        'id': 2,
        'ngo_id': 2,
        'date': date(2024, 3, 20),
        'title': 'Solar Water Purification Installation',
        'description': 'Installed 5 new solar-powered water purification systems in tribal villages',
        'kpis': [
            {'label': 'Systems Installed', 'value': '5'},
            {'label': 'Villages Covered', 'value': '3'},
            {'label': 'Households Benefited', 'value': '250'}
        ],
        'color': 'green',
        'created_at': datetime(2024, 3, 20, 14, 15, 0)
    },
    {
        'id': 3,
        'ngo_id': 3,
        'date': date(2024, 3, 25),
        'title': 'Skill Development Program Launch',
        'description': 'Launched new skill development program for urban youth in Mumbai slums',
        'kpis': [
            {'label': 'Youth Enrolled', 'value': '100'},
            {'label': 'Training Centers', 'value': '2'},
            {'label': 'Expected Placements', 'value': '75'}
        ],
        'color': 'purple',
        'created_at': datetime(2024, 3, 25, 10, 45, 0)
    },
    {
        'id': 4,
        'ngo_id': 4,
        'date': date(2024, 3, 30),
        'title': 'Mobile Healthcare Camp',
        'description': 'Conducted comprehensive healthcare camp in remote tribal areas',
        'kpis': [
            {'label': 'Patients Treated', 'value': '500'},
            {'label': 'Communities Served', 'value': '4'},
            {'label': 'Health Awareness Sessions', 'value': '8'}
        ],
        'color': 'red',
        'created_at': datetime(2024, 3, 30, 18, 20, 0)
    },
    {
        'id': 5,
        'ngo_id': 5,
        'date': date(2024, 4, 5),
        'title': 'Sustainable Agriculture Workshop',
        'description': 'Conducted workshop on sustainable farming practices for 50 farmers',
        'kpis': [
            {'label': 'Farmers Trained', 'value': '50'},
            {'label': 'Acres Covered', 'value': '200'},
            {'label': 'Demonstration Farms', 'value': '2'}
        ],
        'color': 'emerald',
        'created_at': datetime(2024, 4, 5, 12, 0, 0)
    }
]

# Sample NGO Documents Data
SAMPLE_NGO_DOCUMENTS = [
    {
        'id': 1,
        'ngo_id': 1,
        'name': 'Registration Certificate',
        'kind': 'registration',
        'url': 'https://example.com/documents/women-empowerment-registration.pdf',
        'uploaded_at': datetime(2024, 1, 10, 12, 0, 0)
    },
    {
        'id': 2,
        'ngo_id': 1,
        'name': '80G Tax Exemption Certificate',
        'kind': 'certificate',
        'url': 'https://example.com/documents/women-empowerment-80g.pdf',
        'uploaded_at': datetime(2024, 1, 10, 12, 30, 0)
    },
    {
        'id': 3,
        'ngo_id': 1,
        'name': 'Annual Report 2023',
        'kind': 'annual_report',
        'url': 'https://example.com/documents/women-empowerment-annual-2023.pdf',
        'uploaded_at': datetime(2024, 1, 15, 14, 0, 0)
    },
    {
        'id': 4,
        'ngo_id': 2,
        'name': 'FCRA Registration Certificate',
        'kind': 'certificate',
        'url': 'https://example.com/documents/water-for-all-fcra.pdf',
        'uploaded_at': datetime(2024, 1, 15, 15, 0, 0)
    },
    {
        'id': 5,
        'ngo_id': 2,
        'name': 'Environmental Impact Assessment',
        'kind': 'policy',
        'url': 'https://example.com/documents/water-for-all-eia.pdf',
        'uploaded_at': datetime(2024, 1, 20, 10, 0, 0)
    },
    {
        'id': 6,
        'ngo_id': 3,
        'name': 'Skill Development Policy',
        'kind': 'policy',
        'url': 'https://example.com/documents/youth-empowerment-policy.pdf',
        'uploaded_at': datetime(2024, 1, 20, 11, 0, 0)
    },
    {
        'id': 7,
        'ngo_id': 4,
        'name': 'Healthcare Standards Document',
        'kind': 'policy',
        'url': 'https://example.com/documents/health-for-all-standards.pdf',
        'uploaded_at': datetime(2024, 1, 25, 16, 0, 0)
    },
    {
        'id': 8,
        'ngo_id': 5,
        'name': 'Sustainable Agriculture Guidelines',
        'kind': 'policy',
        'url': 'https://example.com/documents/green-earth-guidelines.pdf',
        'uploaded_at': datetime(2024, 1, 30, 11, 0, 0)
    }
]

# Sample NGO Transparency Reports Data
SAMPLE_NGO_TRANSPARENCY_REPORTS = [
    {
        'id': 1,
        'ngo_id': 1,
        'period': 'FY2023-24',
        'summary': 'Comprehensive transparency report covering all activities and financial utilization for the fiscal year 2023-24',
        'metrics': {
            'spent': 'INR 2.2Cr',
            'allocated': 'INR 2.5Cr',
            'projects_completed': 15,
            'beneficiaries_reached': 5000
        },
        'score': 92,
        'created_at': datetime(2024, 4, 1, 9, 30, 0)
    },
    {
        'id': 2,
        'ngo_id': 2,
        'period': 'FY2023-24',
        'summary': 'Annual transparency report highlighting environmental impact and community engagement',
        'metrics': {
            'spent': 'INR 3.1Cr',
            'allocated': 'INR 3.5Cr',
            'water_systems_installed': 25,
            'communities_served': 20
        },
        'score': 95,
        'created_at': datetime(2024, 4, 1, 10, 15, 0)
    },
    {
        'id': 3,
        'ngo_id': 3,
        'period': 'FY2023-24',
        'summary': 'Transparency report focusing on skill development outcomes and employment generation',
        'metrics': {
            'spent': 'INR 1.8Cr',
            'allocated': 'INR 2.0Cr',
            'youth_trained': 2500,
            'job_placements': 1800
        },
        'score': 88,
        'created_at': datetime(2024, 4, 1, 11, 0, 0)
    },
    {
        'id': 4,
        'ngo_id': 4,
        'period': 'FY2023-24',
        'summary': 'Healthcare transparency report covering medical services and community health impact',
        'metrics': {
            'spent': 'INR 3.8Cr',
            'allocated': 'INR 4.0Cr',
            'patients_treated': 15000,
            'mobile_units': 8
        },
        'score': 94,
        'created_at': datetime(2024, 4, 1, 12, 30, 0)
    },
    {
        'id': 5,
        'ngo_id': 5,
        'period': 'FY2023-24',
        'summary': 'Agricultural transparency report highlighting sustainable farming impact',
        'metrics': {
            'spent': 'INR 2.7Cr',
            'allocated': 'INR 3.0Cr',
            'farmers_trained': 3000,
            'acres_converted': 2000
        },
        'score': 90,
        'created_at': datetime(2024, 4, 1, 14, 45, 0)
    }
]

# Sample NGO Certificates Data
SAMPLE_NGO_CERTIFICATES = [
    {
        'id': 1,
        'ngo_id': 1,
        'title': 'ISO 9001:2015 Quality Management',
        'issuer': 'Bureau Veritas',
        'valid_from': date(2023, 1, 1),
        'valid_until': date(2026, 1, 1),
        'url': 'https://example.com/certificates/women-empowerment-iso9001.pdf'
    },
    {
        'id': 2,
        'ngo_id': 1,
        'title': 'Best NGO Award 2023',
        'issuer': 'Ministry of Women and Child Development',
        'valid_from': date(2023, 12, 15),
        'valid_until': None,
        'url': 'https://example.com/certificates/women-empowerment-award.pdf'
    },
    {
        'id': 3,
        'ngo_id': 2,
        'title': 'Environmental Excellence Certificate',
        'issuer': 'Ministry of Environment',
        'valid_from': date(2023, 6, 1),
        'valid_until': date(2025, 6, 1),
        'url': 'https://example.com/certificates/water-for-all-environmental.pdf'
    },
    {
        'id': 4,
        'ngo_id': 2,
        'title': 'Water Excellence Award 2023',
        'issuer': 'Water Resources Ministry',
        'valid_from': date(2023, 11, 20),
        'valid_until': None,
        'url': 'https://example.com/certificates/water-for-all-award.pdf'
    },
    {
        'id': 5,
        'ngo_id': 3,
        'title': 'Skill Development Excellence',
        'issuer': 'Ministry of Skill Development',
        'valid_from': date(2023, 8, 1),
        'valid_until': date(2025, 8, 1),
        'url': 'https://example.com/certificates/youth-empowerment-skill.pdf'
    },
    {
        'id': 6,
        'ngo_id': 4,
        'title': 'Healthcare Quality Certification',
        'issuer': 'National Accreditation Board',
        'valid_from': date(2023, 3, 1),
        'valid_until': date(2026, 3, 1),
        'url': 'https://example.com/certificates/health-for-all-quality.pdf'
    },
    {
        'id': 7,
        'ngo_id': 5,
        'title': 'Organic Farming Certification',
        'issuer': 'Organic Certification Board',
        'valid_from': date(2023, 9, 1),
        'valid_until': date(2025, 9, 1),
        'url': 'https://example.com/certificates/green-earth-organic.pdf'
    }
]

# Sample NGO Testimonials Data
SAMPLE_NGO_TESTIMONIALS = [
    {
        'id': 1,
        'ngo_id': 1,
        'author': 'Priya Sharma',
        'role': 'Beneficiary',
        'content': 'The digital literacy program changed my life. I can now use computers and have started a small online business. Thank you Women Empowerment Foundation!',
        'rating': 5,
        'created_at': datetime(2024, 3, 20, 14, 30, 0)
    },
    {
        'id': 2,
        'ngo_id': 1,
        'author': 'Rajesh Kumar',
        'role': 'Corporate Partner',
        'content': 'Excellent partnership with Women Empowerment Foundation. Their programs are well-structured and deliver measurable impact. Highly recommended.',
        'rating': 5,
        'created_at': datetime(2024, 3, 25, 10, 15, 0)
    },
    {
        'id': 3,
        'ngo_id': 2,
        'author': 'Village Head',
        'role': 'Community Leader',
        'content': 'Water for All Foundation has transformed our village. We now have clean drinking water and the health of our children has improved significantly.',
        'rating': 5,
        'created_at': datetime(2024, 3, 18, 16, 45, 0)
    },
    {
        'id': 4,
        'ngo_id': 3,
        'author': 'Amit Singh',
        'role': 'Former Trainee',
        'content': 'The skill development program helped me get a good job. The training was practical and the placement support was excellent.',
        'rating': 4,
        'created_at': datetime(2024, 3, 22, 11, 20, 0)
    },
    {
        'id': 5,
        'ngo_id': 4,
        'author': 'Dr. Meera Patel',
        'role': 'Healthcare Professional',
        'content': 'Health for All Trust provides exceptional healthcare services to remote areas. Their mobile units are well-equipped and staffed with qualified professionals.',
        'rating': 5,
        'created_at': datetime(2024, 3, 28, 13, 10, 0)
    },
    {
        'id': 6,
        'ngo_id': 5,
        'author': 'Farmer',
        'role': 'Agricultural Beneficiary',
        'content': 'The sustainable agriculture training has increased my crop yield and reduced my farming costs. Green Earth Foundation is doing great work.',
        'rating': 4,
        'created_at': datetime(2024, 4, 2, 9, 30, 0)
    }
]

def get_sample_ngo_profiles():
    """Return sample NGO profiles data"""
    return SAMPLE_NGO_PROFILES

def get_sample_ngo_impact_events():
    """Return sample NGO impact events data"""
    return SAMPLE_NGO_IMPACT_EVENTS

def get_sample_ngo_documents():
    """Return sample NGO documents data"""
    return SAMPLE_NGO_DOCUMENTS

def get_sample_ngo_transparency_reports():
    """Return sample NGO transparency reports data"""
    return SAMPLE_NGO_TRANSPARENCY_REPORTS

def get_sample_ngo_certificates():
    """Return sample NGO certificates data"""
    return SAMPLE_NGO_CERTIFICATES

def get_sample_ngo_testimonials():
    """Return sample NGO testimonials data"""
    return SAMPLE_NGO_TESTIMONIALS

def get_all_sample_data():
    """Return all sample data for NGO marketplace models"""
    return {
        'ngo_profiles': SAMPLE_NGO_PROFILES,
        'ngo_impact_events': SAMPLE_NGO_IMPACT_EVENTS,
        'ngo_documents': SAMPLE_NGO_DOCUMENTS,
        'ngo_transparency_reports': SAMPLE_NGO_TRANSPARENCY_REPORTS,
        'ngo_certificates': SAMPLE_NGO_CERTIFICATES,
        'ngo_testimonials': SAMPLE_NGO_TESTIMONIALS
    }
