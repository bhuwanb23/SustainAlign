"""
Sample Data for User Models
Contains realistic sample data for testing and development
"""

from datetime import datetime, date
import json

# Sample Users Data - Only including fields that exist in the User model
# Passwords are properly hashed for testing - these will work with the login system
SAMPLE_USERS = [
    {
        'id': 1,
        'email': 'admin@techcorp.com',
        'password_hash': 'e15650964e661a8dfb4edde0067fa8a5e32c7264f781606c565caa3b383a0b91',  # admin123
        'role': 'corporate',
        'created_at': datetime(2024, 1, 10, 12, 0, 0)
    },
    {
        'id': 2,
        'email': 'sustainability@greenenergy.com',
        'password_hash': '08ca92bcf08ff542fccc1ba6fb085c5ceb5059f2d04c0329a22f2bda912a1b2e',  # green123
        'role': 'corporate',
        'created_at': datetime(2024, 1, 15, 14, 30, 0)
    },
    {
        'id': 3,
        'email': 'director@healthtech.com',
        'password_hash': 'a85b976f78a6dec7e10246175e31776197ef50ba5f91057b5fbbd69fbe20b2e1',  # health123
        'role': 'corporate',
        'created_at': datetime(2024, 1, 20, 9, 15, 0)
    },
    {
        'id': 4,
        'email': 'csr@edutech.com',
        'password_hash': '625abf7dc40e579d70b019418f7cc481552dce84c6dede68802bee89132e20eb',  # edu123
        'role': 'corporate',
        'created_at': datetime(2024, 1, 25, 16, 45, 0)
    },
    {
        'id': 5,
        'email': 'manager@agritech.com',
        'password_hash': 'ba045410b95bc1fa9dd322fdc46572092ae6b814008977b7de54962f6efba94c',  # agri123
        'role': 'corporate',
        'created_at': datetime(2024, 1, 30, 11, 20, 0)
    },
    {
        'id': 6,
        'email': 'director@womenempowerment.org',
        'password_hash': '5cf2054803f5ca38ed2e7fe7be94c2d40834e8d091d45958b117af66098b8e8e',  # women123
        'role': 'ngo',
        'created_at': datetime(2024, 1, 10, 12, 0, 0)
    },
    {
        'id': 7,
        'email': 'coordinator@waterforall.org',
        'password_hash': 'dbadc98aa5a0565ff3abd24225938e490255478f074c8317dc73f9d06ce8e997',  # water123
        'role': 'ngo',
        'created_at': datetime(2024, 1, 15, 14, 30, 0)
    },
    {
        'id': 8,
        'email': 'program@youthempowerment.org',
        'password_hash': '0249bb6b025abb06160241b8ef6f549a4a0e4d46f5bece874384d8a713eb20f4',  # youth123
        'role': 'ngo',
        'created_at': datetime(2024, 1, 20, 9, 15, 0)
    },
    {
        'id': 9,
        'email': 'medical@healthforall.org',
        'password_hash': '49e29587ac37289bfbb99dd58e5562cec285299a71247e50276e082f41137c22',  # medical123
        'role': 'ngo',
        'created_at': datetime(2024, 1, 25, 16, 45, 0)
    },
    {
        'id': 10,
        'email': 'coordinator@greenearth.org',
        'password_hash': 'cc90f519fc20c8dfaae6651a5e46a2bcfcfc9cf782f1ef5f86c64f8419b6dded',  # earth123
        'role': 'ngo',
        'created_at': datetime(2024, 1, 30, 11, 20, 0)
    },
    {
        'id': 11,
        'email': 'admin@sustainalign.local',
        'password_hash': 'e15650964e661a8dfb4edde0067fa8a5e32c7264f781606c565caa3b383a0b91',  # admin123
        'role': 'admin',
        'created_at': datetime(2024, 1, 1, 0, 0, 0)
    },
    {
        'id': 12,
        'email': 'auditor@regulatory.gov.in',
        'password_hash': 'de5b78ff5364058ecd5b51ca57675d102500c8f4febb63aaba216bd9d48448b9',  # audit123
        'role': 'regulator',
        'created_at': datetime(2024, 1, 5, 10, 0, 0)
    },
    {
        'id': 13,
        'email': 'inspector@csr.gov.in',
        'password_hash': '8c96ee79f9999e49c64413de9be7c7c5ab41479142651a735231973e010037bb',  # inspect123
        'role': 'regulator',
        'created_at': datetime(2024, 1, 8, 14, 30, 0)
    },
    {
        'id': 14,
        'email': 'guest-ngo@sustainalign.local',
        'password_hash': '235712585f3d06ae3ee00f303d9743e9928bdca7e7262fef58d860862e210914',  # guest123
        'role': 'ngo',
        'created_at': datetime(2024, 1, 1, 0, 0, 0)
    },
    {
        'id': 15,
        'email': 'guest-corporate@sustainalign.local',
        'password_hash': '235712585f3d06ae3ee00f303d9743e9928bdca7e7262fef58d860862e210914',  # guest123
        'role': 'corporate',
        'created_at': datetime(2024, 1, 1, 0, 0, 0)
    }
]

# Quick reference for login credentials
LOGIN_CREDENTIALS = {
    'admin@techcorp.com': 'admin123',
    'sustainability@greenenergy.com': 'green123',
    'director@healthtech.com': 'health123',
    'csr@edutech.com': 'edu123',
    'manager@agritech.com': 'agri123',
    'director@womenempowerment.org': 'women123',
    'coordinator@waterforall.org': 'water123',
    'program@youthempowerment.org': 'youth123',
    'medical@healthforall.org': 'medical123',
    'coordinator@greenearth.org': 'earth123',
    'admin@sustainalign.local': 'admin123',
    'auditor@regulatory.gov.in': 'audit123',
    'inspector@csr.gov.in': 'inspect123',
    'guest-ngo@sustainalign.local': 'guest123',
    'guest-corporate@sustainalign.local': 'guest123'
}

def get_sample_users():
    """Return sample users data"""
    return SAMPLE_USERS

def get_login_credentials():
    """Return email:password mapping for easy testing"""
    return LOGIN_CREDENTIALS

def get_all_sample_data():
    """Return all sample data for user models"""
    return {
        'users': SAMPLE_USERS
    }
