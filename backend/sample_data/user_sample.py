"""
Sample Data for User Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json

# Sample Users Data - Only including fields that exist in the User model
SAMPLE_USERS = [
    {
        'id': 1,
        'email': 'admin@techcorp.com',
        'password_hash': 'hashed_password_1',
        'role': 'corporate',
        'created_at': datetime(2024, 1, 10, 12, 0, 0)
    },
    {
        'id': 2,
        'email': 'sustainability@greenenergy.com',
        'password_hash': 'hashed_password_2',
        'role': 'corporate',
        'created_at': datetime(2024, 1, 15, 14, 30, 0)
    },
    {
        'id': 3,
        'email': 'director@healthtech.com',
        'password_hash': 'hashed_password_3',
        'role': 'corporate',
        'created_at': datetime(2024, 1, 20, 9, 15, 0)
    },
    {
        'id': 4,
        'email': 'csr@edutech.com',
        'password_hash': 'hashed_password_4',
        'role': 'corporate',
        'created_at': datetime(2024, 1, 25, 16, 45, 0)
    },
    {
        'id': 5,
        'email': 'manager@agritech.com',
        'password_hash': 'hashed_password_5',
        'role': 'corporate',
        'created_at': datetime(2024, 1, 30, 11, 20, 0)
    },
    {
        'id': 6,
        'email': 'director@womenempowerment.org',
        'password_hash': 'hashed_password_6',
        'role': 'ngo',
        'created_at': datetime(2024, 1, 10, 12, 0, 0)
    },
    {
        'id': 7,
        'email': 'coordinator@waterforall.org',
        'password_hash': 'hashed_password_7',
        'role': 'ngo',
        'created_at': datetime(2024, 1, 15, 14, 30, 0)
    },
    {
        'id': 8,
        'email': 'program@youthempowerment.org',
        'password_hash': 'hashed_password_8',
        'role': 'ngo',
        'created_at': datetime(2024, 1, 20, 9, 15, 0)
    },
    {
        'id': 9,
        'email': 'medical@healthforall.org',
        'password_hash': 'hashed_password_9',
        'role': 'ngo',
        'created_at': datetime(2024, 1, 25, 16, 45, 0)
    },
    {
        'id': 10,
        'email': 'coordinator@greenearth.org',
        'password_hash': 'hashed_password_10',
        'role': 'ngo',
        'created_at': datetime(2024, 1, 30, 11, 20, 0)
    },
    {
        'id': 11,
        'email': 'admin@sustainalign.local',
        'password_hash': 'hashed_password_11',
        'role': 'admin',
        'created_at': datetime(2024, 1, 1, 0, 0, 0)
    },
    {
        'id': 12,
        'email': 'auditor@regulatory.gov.in',
        'password_hash': 'hashed_password_12',
        'role': 'regulator',
        'created_at': datetime(2024, 1, 5, 10, 0, 0)
    },
    {
        'id': 13,
        'email': 'inspector@csr.gov.in',
        'password_hash': 'hashed_password_13',
        'role': 'regulator',
        'created_at': datetime(2024, 1, 8, 14, 30, 0)
    },
    {
        'id': 14,
        'email': 'guest-ngo@sustainalign.local',
        'password_hash': 'hashed_password_14',
        'role': 'ngo',
        'created_at': datetime(2024, 1, 1, 0, 0, 0)
    },
    {
        'id': 15,
        'email': 'guest-corporate@sustainalign.local',
        'password_hash': 'hashed_password_15',
        'role': 'corporate',
        'created_at': datetime(2024, 1, 1, 0, 0, 0)
    }
]

def get_sample_users():
    """Return sample users data"""
    return SAMPLE_USERS

def get_all_sample_data():
    """Return all sample data for user models"""
    return {
        'users': SAMPLE_USERS
    }
