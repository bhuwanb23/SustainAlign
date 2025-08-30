/**
 * Test script to verify frontend-backend connection
 * Run this in the browser console to test the project API
 */

// Test data for project creation
const testProjectData = {
  title: "Test Digital Literacy Project",
  short_description: "A test project for verifying frontend-backend connection",
  ngo_name: "Test NGO Foundation",
  location_city: "Test City",
  location_region: "Test Region",
  location_country: "India",
  sdg_goals: [4, 9, 10],
  csr_focus_areas: ["Education", "Technology", "Rural Development"],
  target_beneficiaries: ["Students", "Rural Communities", "Youth"],
  total_project_cost: 1000000,
  funding_required: 500000,
  currency: "INR",
  csr_eligibility: true,
  preferred_contribution_type: "cash",
  start_date: "2024-06-01",
  end_date: "2024-12-31",
  expected_outcomes: {
    "students_enrolled": 100,
    "villages_covered": 2,
    "computer_labs_established": 1
  },
  kpis: {
    "digital_literacy_rate": "75%",
    "employment_placement": "50%",
    "community_engagement": "80%"
  },
  ngo_registration_number: "TEST001",
  ngo_80g_status: "Valid",
  ngo_fcra_status: "Valid",
  ngo_rating: 4,
  ngo_verification_badge: "Verified",
  past_projects_completed: 5,
  project_images: ["https://example.com/test1.jpg"],
  proposal_document_url: "https://example.com/test-proposal.pdf",
  status: "draft",
  visibility: "public"
};

// Test functions
const testConnection = {
  // Test if backend is reachable
  async testBackendHealth() {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      console.log('✅ Backend health check:', data);
      return true;
    } catch (error) {
      console.error('❌ Backend health check failed:', error);
      return false;
    }
  },

  // Test project creation (without auth)
  async testProjectCreation() {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testProjectData)
      });
      
      if (response.status === 401) {
        console.log('✅ Project creation endpoint working (auth required)');
        return true;
      } else if (response.status === 201) {
        const data = await response.json();
        console.log('✅ Project created successfully:', data);
        return true;
      } else {
        const errorData = await response.json();
        console.log('⚠️ Project creation response:', response.status, errorData);
        return false;
      }
    } catch (error) {
      console.error('❌ Project creation test failed:', error);
      return false;
    }
  },

  // Test getting projects list
  async testGetProjects() {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      console.log('✅ Projects list retrieved:', data);
      return true;
    } catch (error) {
      console.error('❌ Get projects test failed:', error);
      return false;
    }
  },

  // Test NGO profiles endpoint
  async testGetNGOs() {
    try {
      const response = await fetch('/api/ngos');
      const data = await response.json();
      console.log('✅ NGO profiles retrieved:', data);
      return false;
    } catch (error) {
      console.error('❌ Get NGOs test failed:', error);
      return false;
    }
  },

  // Test with authentication token
  async testWithAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('⚠️ No auth token found. Please log in first.');
      return false;
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testProjectData)
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log('✅ Authenticated project creation successful:', data);
        return true;
      } else {
        const errorData = await response.json();
        console.log('⚠️ Authenticated project creation failed:', response.status, errorData);
        return false;
      }
    } catch (error) {
      console.error('❌ Authenticated project creation test failed:', error);
      return false;
    }
  },

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting frontend-backend connection tests...\n');
    
    const results = {
      backendHealth: await this.testBackendHealth(),
      projectCreation: await this.testProjectCreation(),
      getProjects: await this.testGetProjects(),
      getNGOs: await this.testGetNGOs(),
      authenticatedCreation: await this.testWithAuth()
    };

    console.log('\n📊 Test Results:');
    console.log('================');
    Object.entries(results).forEach(([test, result]) => {
      console.log(`${result ? '✅' : '❌'} ${test}: ${result ? 'PASSED' : 'FAILED'}`);
    });

    const passedTests = Object.values(results).filter(Boolean).length;
    const totalTests = Object.keys(results).length;
    
    console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
      console.log('🎉 All tests passed! Frontend-backend connection is working perfectly.');
    } else if (passedTests >= totalTests - 1) {
      console.log('⚠️ Most tests passed. Check the failed test(s) above.');
    } else {
      console.log('❌ Multiple tests failed. Check backend configuration and network connectivity.');
    }

    return results;
  }
};

// Export for use in browser console
window.testConnection = testConnection;

// Auto-run tests if this file is loaded
if (typeof window !== 'undefined') {
  console.log('🔧 Project connection test script loaded.');
  console.log('Run "testConnection.runAllTests()" to test the connection.');
  console.log('Or run individual tests:');
  console.log('- testConnection.testBackendHealth()');
  console.log('- testConnection.testProjectCreation()');
  console.log('- testConnection.testGetProjects()');
  console.log('- testConnection.testGetNGOs()');
  console.log('- testConnection.testWithAuth()');
}

export default testConnection;
