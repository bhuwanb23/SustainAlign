"""
Sample Data for AI Matching Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json
from decimal import Decimal

# Sample AI Matches Data
SAMPLE_AI_MATCHES = [
    {
        'id': 1,
        'project_id': 1,
        'company_id': 1,
        'alignment_score': 95,
        'investment_min': Decimal('1000000.00'),
        'investment_max': Decimal('1500000.00'),
        'investment_currency': 'INR',
        'timeline_months': 12,
        'location_text': 'Jaipur, Rajasthan, India',
        'tags': [
            {'icon': '🎓', 'bg': 'bg-blue-100', 'fg': 'text-blue-600'},
            {'icon': '👩', 'bg': 'bg-pink-100', 'fg': 'text-pink-600'},
            {'icon': '💻', 'bg': 'bg-green-100', 'fg': 'text-green-600'}
        ],
        'rationale': 'Excellent alignment with TechCorp\'s focus on digital literacy and women empowerment. Strong NGO credibility and proven track record.',
        'created_at': datetime(2024, 2, 15, 14, 30, 0)
    },
    {
        'id': 2,
        'project_id': 2,
        'company_id': 2,
        'alignment_score': 92,
        'investment_min': Decimal('1500000.00'),
        'investment_max': Decimal('2000000.00'),
        'investment_currency': 'INR',
        'timeline_months': 12,
        'location_text': 'Bhopal, Madhya Pradesh, India',
        'tags': [
            {'icon': '💧', 'bg': 'bg-blue-100', 'fg': 'text-blue-600'},
            {'icon': '☀️', 'bg': 'bg-yellow-100', 'fg': 'text-yellow-600'},
            {'icon': '🌱', 'bg': 'bg-green-100', 'fg': 'text-green-600'}
        ],
        'rationale': 'Perfect match for GreenEnergy\'s environmental focus. Solar-powered water purification aligns with renewable energy goals.',
        'created_at': datetime(2024, 3, 10, 9, 45, 0)
    },
    {
        'id': 3,
        'project_id': 3,
        'company_id': 4,
        'alignment_score': 88,
        'investment_min': Decimal('800000.00'),
        'investment_max': Decimal('1200000.00'),
        'investment_currency': 'INR',
        'timeline_months': 12,
        'location_text': 'Mumbai, Maharashtra, India',
        'tags': [
            {'icon': '🎯', 'bg': 'bg-purple-100', 'fg': 'text-purple-600'},
            {'icon': '💼', 'bg': 'bg-indigo-100', 'fg': 'text-indigo-600'},
            {'icon': '📈', 'bg': 'bg-emerald-100', 'fg': 'text-emerald-600'}
        ],
        'rationale': 'Strong alignment with EduTech\'s mission to bridge digital divide. Skill development focus matches educational technology goals.',
        'created_at': datetime(2024, 4, 5, 11, 20, 0)
    },
    {
        'id': 4,
        'project_id': 4,
        'company_id': 3,
        'alignment_score': 96,
        'investment_min': Decimal('2000000.00'),
        'investment_max': Decimal('2800000.00'),
        'investment_currency': 'INR',
        'timeline_months': 12,
        'location_text': 'Ranchi, Jharkhand, India',
        'tags': [
            {'icon': '🏥', 'bg': 'bg-red-100', 'fg': 'text-red-600'},
            {'icon': '🚑', 'bg': 'bg-orange-100', 'fg': 'text-orange-600'},
            {'icon': '❤️', 'bg': 'bg-pink-100', 'fg': 'text-pink-600'}
        ],
        'rationale': 'Exceptional match for Healthcare Plus. Mobile healthcare units align perfectly with improving healthcare access in underserved areas.',
        'created_at': datetime(2024, 5, 12, 16, 15, 0)
    },
    {
        'id': 5,
        'project_id': 5,
        'company_id': 5,
        'alignment_score': 90,
        'investment_min': Decimal('800000.00'),
        'investment_max': Decimal('1000000.00'),
        'investment_currency': 'INR',
        'timeline_months': 12,
        'location_text': 'Pune, Maharashtra, India',
        'tags': [
            {'icon': '🌾', 'bg': 'bg-green-100', 'fg': 'text-green-600'},
            {'icon': '🌿', 'bg': 'bg-emerald-100', 'fg': 'text-emerald-600'},
            {'icon': '🌍', 'bg': 'bg-teal-100', 'fg': 'text-teal-600'}
        ],
        'rationale': 'Excellent fit for AgriTech Solutions. Sustainable agriculture training aligns with agricultural technology and sustainability goals.',
        'created_at': datetime(2024, 6, 8, 13, 45, 0)
    },
    {
        'id': 6,
        'project_id': 1,
        'company_id': 4,
        'alignment_score': 85,
        'investment_min': Decimal('1200000.00'),
        'investment_max': Decimal('1500000.00'),
        'investment_currency': 'INR',
        'timeline_months': 12,
        'location_text': 'Jaipur, Rajasthan, India',
        'tags': [
            {'icon': '🎓', 'bg': 'bg-blue-100', 'fg': 'text-blue-600'},
            {'icon': '👩', 'bg': 'bg-pink-100', 'fg': 'text-pink-600'},
            {'icon': '💻', 'bg': 'bg-green-100', 'fg': 'text-green-600'}
        ],
        'rationale': 'Good alignment with EduTech\'s educational focus. Digital literacy component fits well with technology education goals.',
        'created_at': datetime(2024, 2, 20, 10, 15, 0)
    },
    {
        'id': 7,
        'project_id': 2,
        'company_id': 1,
        'alignment_score': 78,
        'investment_min': Decimal('1000000.00'),
        'investment_max': Decimal('1500000.00'),
        'investment_currency': 'INR',
        'timeline_months': 12,
        'location_text': 'Bhopal, Madhya Pradesh, India',
        'tags': [
            {'icon': '💧', 'bg': 'bg-blue-100', 'fg': 'text-blue-600'},
            {'icon': '☀️', 'bg': 'bg-yellow-100', 'fg': 'text-yellow-600'},
            {'icon': '🌱', 'bg': 'bg-green-100', 'fg': 'text-green-600'}
        ],
        'rationale': 'Moderate alignment with TechCorp\'s broader CSR goals. Environmental impact is secondary to their primary education focus.',
        'created_at': datetime(2024, 3, 15, 14, 30, 0)
    },
    {
        'id': 8,
        'project_id': 3,
        'company_id': 1,
        'alignment_score': 82,
        'investment_min': Decimal('1000000.00'),
        'investment_max': Decimal('1200000.00'),
        'investment_currency': 'INR',
        'timeline_months': 12,
        'location_text': 'Mumbai, Maharashtra, India',
        'tags': [
            {'icon': '🎯', 'bg': 'bg-purple-100', 'fg': 'text-purple-600'},
            {'icon': '💼', 'bg': 'bg-indigo-100', 'fg': 'text-indigo-600'},
            {'icon': '📈', 'bg': 'bg-emerald-100', 'fg': 'text-emerald-600'}
        ],
        'rationale': 'Good alignment with TechCorp\'s skill development initiatives. Urban focus complements their digital literacy programs.',
        'created_at': datetime(2024, 4, 10, 9, 20, 0)
    }
]

def get_sample_ai_matches():
    """Return sample AI matches data"""
    return SAMPLE_AI_MATCHES

def get_all_sample_data():
    """Return all sample data for AI matching models"""
    return {
        'ai_matches': SAMPLE_AI_MATCHES
    }
