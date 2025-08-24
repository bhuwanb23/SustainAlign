#!/usr/bin/env python3
"""
Simple API test script for SustainAlign backend
Run this to test the API endpoints
"""

import requests
import json
import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

BASE_URL = "http://localhost:5000/api"
auth_token = None

def test_health():
    """Test health endpoint"""
    print("🔍 Testing health endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def test_signup():
    """Test user signup"""
    print("\n🔍 Testing user signup...")
    data = {
        "email": "test@example.com",
        "password": "test123",
        "role": "corporate"
    }
    response = requests.post(f"{BASE_URL}/auth/signup", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 201

def test_login():
    """Test user login"""
    global auth_token
    print("\n🔍 Testing user login...")
    data = {
        "email": "test@example.com",
        "password": "test123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        auth_token = response.json().get('token')
        print(f"✅ Got auth token: {auth_token[:20]}...")
        return True
    return False

def test_get_profile():
    """Test getting user profile"""
    print("\n🔍 Testing get user profile...")
    headers = {"Authorization": f"Bearer {auth_token}"} if auth_token else {}
    response = requests.get(f"{BASE_URL}/profile/me", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def test_create_company():
    """Test creating a company profile"""
    print("\n🔍 Testing create company profile...")
    headers = {"Authorization": f"Bearer {auth_token}"} if auth_token else {}
    
    data = {
        "company": {
            "companyName": "Test Corp",
            "logoFile": "https://example.com/logo.png",
            "registrationId": "TEST001",
            "industry": "Technology",
            "hq": {
                "country": "India",
                "state": "Karnataka",
                "city": "Bangalore"
            },
            "branches": [
                {
                    "country": "India",
                    "state": "Maharashtra",
                    "city": "Mumbai"
                }
            ]
        },
        "contact": {
            "csrContactName": "John Doe",
            "csrContactRole": "CSR Manager",
            "csrEmail": "john@testcorp.com",
            "csrPhone": "+91-9876543210",
            "website": "https://testcorp.com"
        },
        "budget": {
            "amount": 1000000,
            "currency": "INR",
            "projectSize": "Medium",
            "splits": {
                "education": 40,
                "healthcare": 30,
                "environment": 30
            }
        },
        "focus": {
            "prioritySdgs": ["Quality Education", "Climate Action"],
            "esgGoals": "Net Zero by 2030",
            "themes": "Digital literacy",
            "targetYear": "2030",
            "reportingStandard": "GRI"
        },
        "ngoPrefs": {
            "ngoSize": "Mid-level",
            "partnershipModel": "Funding + Execution",
            "regions": ["Local"],
            "spendHistory": "New company"
        },
        "ai": {
            "optimizeFor": ["Impact"],
            "riskAppetite": "Medium",
            "alignmentMode": "Strict compliance",
            "integrations": ["SAP"]
        },
        "access": {
            "roles": [
                {
                    "email": "admin@testcorp.com",
                    "role": "Admin"
                }
            ]
        }
    }
    
    response = requests.post(f"{BASE_URL}/profile/companies", json=data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 201

def test_get_companies():
    """Test getting companies list"""
    print("\n🔍 Testing get companies list...")
    headers = {"Authorization": f"Bearer {auth_token}"} if auth_token else {}
    response = requests.get(f"{BASE_URL}/profile/companies", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def main():
    """Run all tests"""
    print("🚀 Starting API tests...")
    print(f"Base URL: {BASE_URL}")
    
    tests = [
        ("Health Check", test_health),
        ("User Signup", test_signup),
        ("User Login", test_login),
        ("Get Profile", test_get_profile),
        ("Create Company", test_create_company),
        ("Get Companies", test_get_companies),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        try:
            if test_func():
                print(f"✅ {test_name} - PASSED")
                passed += 1
            else:
                print(f"❌ {test_name} - FAILED")
        except Exception as e:
            print(f"❌ {test_name} - ERROR: {str(e)}")
    
    print(f"\n📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
    else:
        print("⚠️  Some tests failed. Check the server logs for details.")

if __name__ == '__main__':
    main()
