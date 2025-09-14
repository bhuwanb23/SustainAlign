#!/usr/bin/env python3
"""
Generate password hashes for sample users
Run this script to get the correct hashed passwords for the sample data
"""

import os
import hashlib

def hash_password(password: str) -> str:
    """Hash password using the same method as utils.py"""
    salt = os.environ.get('PASSWORD_SALT', 'static-salt').encode()
    return hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100_000).hex()

if __name__ == "__main__":
    print("Generated password hashes for sample users:")
    print("=" * 50)
    
    passwords = {
        'admin123': 'admin@techcorp.com, admin@sustainalign.local',
        'green123': 'sustainability@greenenergy.com',
        'health123': 'director@healthtech.com',
        'edu123': 'csr@edutech.com',
        'agri123': 'manager@agritech.com',
        'women123': 'director@womenempowerment.org',
        'water123': 'coordinator@waterforall.org',
        'youth123': 'program@youthempowerment.org',
        'medical123': 'medical@healthforall.org',
        'earth123': 'coordinator@greenearth.org',
        'audit123': 'auditor@regulatory.gov.in',
        'inspect123': 'inspector@csr.gov.in',
        'guest123': 'guest-ngo@sustainalign.local, guest-corporate@sustainalign.local'
    }
    
    for password, emails in passwords.items():
        hashed = hash_password(password)
        print(f"'{password}' -> '{hashed}'  # {emails}")
    
    print("\nCopy these hashes to replace the password_hash values in user_sample.py")
