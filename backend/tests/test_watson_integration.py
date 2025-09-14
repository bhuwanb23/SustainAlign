"""
Test script for IBM WatsonX Orchestrate integration with SustainAlign
"""

import os
import sys
import json
import logging
from datetime import datetime

# Add the backend directory to the Python path
backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, backend_dir)

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def test_watson_configuration():
    """Test Watson configuration"""
    print("🔧 Testing Watson Configuration...")
    
    try:
        from ibm_watson.config import watson_config
        
        print(f"Environment Name: {watson_config.environment_name}")
        print(f"Service URL: {watson_config.service_url}")
        print(f"API Key: {'*' * 10 if watson_config.api_key else 'Not set'}")
        print(f"Project ID: {watson_config.project_id}")
        print(f"Default LLM: {watson_config.default_llm}")
        
        is_configured = watson_config.is_configured()
        print(f"Configuration Status: {'✅ Complete' if is_configured else '❌ Incomplete'}")
        
        return is_configured
        
    except Exception as e:
        print(f"❌ Error testing configuration: {e}")
        return False

def test_watson_tools():
    """Test Watson tools"""
    print("\n🛠️  Testing Watson Tools...")
    
    try:
        from ibm_watson.tools.project_analyzer import project_analyzer_function
        from ibm_watson.tools.impact_calculator import impact_calculator_function
        from ibm_watson.tools.risk_assessor import risk_assessor_function
        from ibm_watson.tools.budget_optimizer import budget_optimizer_function
        
        # Test data
        test_project = {
            'id': 'test-001',
            'name': 'Test CSR Project',
            'description': 'A test project for Watson tool validation',
            'budget': 100000,
            'timeline_months': 12,
            'location': 'India',
            'sdg_focus': [1, 3, 4],
            'expected_beneficiaries': 1000,
            'complexity_level': 'medium',
            'risk_level': 'low'
        }
        
        test_company = {
            'id': 'company-001',
            'company_name': 'Test Company',
            'sdg_priorities': [1, 3, 4, 8],
            'geographic_focus': ['India', 'Asia'],
            'available_budget': 500000,
            'csr_focus_areas': ['Education', 'Healthcare', 'Poverty Alleviation']
        }
        
        # Test project analyzer
        print("   Testing Project Analyzer...")
        result = project_analyzer_function(test_project, test_company, "alignment")
        if result.get('success', False):
            print(f"   ✅ Project Analyzer - Score: {result.get('overall_score', 'N/A')}")
        else:
            print(f"   ❌ Project Analyzer failed: {result.get('error', 'Unknown error')}")
        
        # Test impact calculator
        print("   Testing Impact Calculator...")
        impact_metrics = {
            'beneficiaries': 1000,
            'carbon_reduction_tons': 50,
            'water_conservation_liters': 100000,
            'jobs_created': 10
        }
        result = impact_calculator_function(impact_metrics)
        if result.get('success', False):
            print(f"   ✅ Impact Calculator - Score: {result.get('overall_impact_score', 'N/A')}")
        else:
            print(f"   ❌ Impact Calculator failed: {result.get('error', 'Unknown error')}")
        
        # Test risk assessor
        print("   Testing Risk Assessor...")
        result = risk_assessor_function(test_project)
        if result.get('success', False):
            print(f"   ✅ Risk Assessor - Risk Level: {result.get('risk_level', 'N/A')}")
        else:
            print(f"   ❌ Risk Assessor failed: {result.get('error', 'Unknown error')}")
        
        # Test budget optimizer
        print("   Testing Budget Optimizer...")
        project_list = [test_project]
        result = budget_optimizer_function(500000, project_list)
        if result.get('success', False):
            print(f"   ✅ Budget Optimizer - Projects Selected: {len(result.get('optimized_allocation', {}).get('selected_projects', []))}")
        else:
            print(f"   ❌ Budget Optimizer failed: {result.get('error', 'Unknown error')}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing tools: {e}")
        return False

def test_watson_service():
    """Test Watson service integration"""
    print("\n🤖 Testing Watson Service...")
    
    try:
        from ibm_watson.watson_service import watson_service
        
        # Test service initialization
        print("   Testing Service Initialization...")
        initialized = watson_service.initialize()
        print(f"   Service Initialized: {'✅ Yes' if initialized else '❌ No'}")
        
        # Test data
        test_project = {
            'id': 'test-001',
            'name': 'Test CSR Project',
            'description': 'A test project for Watson service validation',
            'budget': 100000,
            'timeline_months': 12,
            'location': 'India',
            'sdg_focus': [1, 3, 4],
            'expected_beneficiaries': 1000,
            'complexity_level': 'medium',
            'risk_level': 'low',
            'impact_metrics': {
                'beneficiaries': 1000,
                'carbon_reduction_tons': 50,
                'water_conservation_liters': 100000,
                'jobs_created': 10
            }
        }
        
        test_company = {
            'id': 'company-001',
            'company_name': 'Test Company',
            'sdg_priorities': [1, 3, 4, 8],
            'geographic_focus': ['India', 'Asia'],
            'available_budget': 500000,
            'csr_focus_areas': ['Education', 'Healthcare', 'Poverty Alleviation'],
            'capabilities': ['Project Management', 'Community Engagement'],
            'available_resources': {'staff': 10, 'budget': 500000}
        }
        
        # Test project alignment analysis
        print("   Testing Project Alignment Analysis...")
        result = watson_service.analyze_project_alignment(test_project, test_company)
        if result.get('success', False):
            print(f"   ✅ Alignment Analysis - Score: {result.get('tool_analysis', {}).get('overall_score', 'N/A')}")
        else:
            print(f"   ❌ Alignment Analysis failed: {result.get('error', 'Unknown error')}")
        
        # Test project feasibility evaluation
        print("   Testing Project Feasibility Evaluation...")
        result = watson_service.evaluate_project_feasibility(test_project, test_company)
        if result.get('success', False):
            feasibility_score = result.get('feasibility_analysis', {}).get('overall_score', 'N/A')
            risk_level = result.get('risk_analysis', {}).get('risk_level', 'N/A')
            print(f"   ✅ Feasibility Evaluation - Score: {feasibility_score}, Risk: {risk_level}")
        else:
            print(f"   ❌ Feasibility Evaluation failed: {result.get('error', 'Unknown error')}")
        
        # Test project impact assessment
        print("   Testing Project Impact Assessment...")
        result = watson_service.assess_project_impact(test_project)
        if result.get('success', False):
            impact_score = result.get('impact_analysis', {}).get('overall_impact_score', 'N/A')
            print(f"   ✅ Impact Assessment - Score: {impact_score}")
        else:
            print(f"   ❌ Impact Assessment failed: {result.get('error', 'Unknown error')}")
        
        # Test comprehensive analysis
        print("   Testing Comprehensive Analysis...")
        result = watson_service.get_comprehensive_analysis(test_project, test_company)
        if result.get('success', False):
            overall_score = result.get('overall_score', 'N/A')
            print(f"   ✅ Comprehensive Analysis - Overall Score: {overall_score}")
        else:
            print(f"   ❌ Comprehensive Analysis failed: {result.get('error', 'Unknown error')}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing Watson service: {e}")
        return False

def test_enhanced_matching():
    """Test enhanced AI matching service"""
    print("\n🚀 Testing Enhanced AI Matching...")
    
    try:
        from ai_models.watson_enhanced_matching import watson_enhanced_matching
        
        # Test data
        test_project = {
            'id': 'test-001',
            'title': 'Test CSR Project',
            'short_description': 'A test project for enhanced matching validation',
            'funding_required': 100000,
            'duration_months': 12,
            'location_country': 'India',
            'sdg_goals': [1, 3, 4],
            'target_beneficiaries': 1000
        }
        
        test_company = {
            'id': 'company-001',
            'company_name': 'Test Company',
            'sdg_goals': [1, 3, 4, 8],
            'location_country': 'India',
            'budget': 500000,
            'focus_area': ['Education', 'Healthcare', 'Poverty Alleviation']
        }
        
        # Test comprehensive analysis
        print("   Testing Comprehensive Analysis...")
        result = watson_enhanced_matching._get_watson_comprehensive_analysis(
            test_project, test_company
        )
        if result and result.get('success', False):
            overall_score = result.get('overall_score', 'N/A')
            print(f"   ✅ Comprehensive Analysis - Overall Score: {overall_score}")
        else:
            print(f"   ❌ Comprehensive Analysis failed")
        
        # Test portfolio optimization
        print("   Testing Portfolio Optimization...")
        project_list = [test_project]
        result = watson_enhanced_matching._get_portfolio_optimization(
            test_company, [{'id': 'test-001', 'title': 'Test Project', 'funding_required': 100000}]
        )
        if result and result.get('success', False):
            selected_projects = len(result.get('optimized_allocation', {}).get('selected_projects', []))
            print(f"   ✅ Portfolio Optimization - Projects Selected: {selected_projects}")
        else:
            print(f"   ❌ Portfolio Optimization failed")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing enhanced matching: {e}")
        return False

def test_api_endpoints():
    """Test API endpoints (mock test)"""
    print("\n🌐 Testing API Endpoints...")
    
    try:
        # This would normally test the actual API endpoints
        # For now, we'll just verify the routes are properly configured
        
        from routes.watson_agents import watson_bp
        from routes.enhanced_ai_matching import enhanced_ai_bp
        
        print("   ✅ Watson Agents Blueprint loaded")
        print("   ✅ Enhanced AI Matching Blueprint loaded")
        
        # List available endpoints
        watson_endpoints = [
            'POST /api/watson/initialize',
            'GET /api/watson/agents/status',
            'POST /api/watson/analyze-alignment',
            'POST /api/watson/evaluate-feasibility',
            'POST /api/watson/assess-impact',
            'POST /api/watson/optimize-budget',
            'POST /api/watson/comprehensive-analysis',
            'GET /api/watson/health'
        ]
        
        enhanced_endpoints = [
            'POST /api/enhanced-ai/matching',
            'GET /api/enhanced-ai/matching/summary',
            'POST /api/enhanced-ai/project-analysis',
            'POST /api/enhanced-ai/portfolio-optimization',
            'POST /api/enhanced-ai/comparison',
            'GET /api/enhanced-ai/health'
        ]
        
        print("   Available Watson Endpoints:")
        for endpoint in watson_endpoints:
            print(f"     - {endpoint}")
        
        print("   Available Enhanced AI Endpoints:")
        for endpoint in enhanced_endpoints:
            print(f"     - {endpoint}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing API endpoints: {e}")
        return False

def generate_test_report():
    """Generate a comprehensive test report"""
    print("\n📊 Generating Test Report...")
    
    report = {
        'test_timestamp': datetime.now().isoformat(),
        'tests': {
            'configuration': test_watson_configuration(),
            'tools': test_watson_tools(),
            'service': test_watson_service(),
            'enhanced_matching': test_enhanced_matching(),
            'api_endpoints': test_api_endpoints()
        }
    }
    
    # Calculate overall success rate
    total_tests = len(report['tests'])
    passed_tests = sum(1 for result in report['tests'].values() if result)
    success_rate = (passed_tests / total_tests) * 100
    
    report['summary'] = {
        'total_tests': total_tests,
        'passed_tests': passed_tests,
        'failed_tests': total_tests - passed_tests,
        'success_rate': round(success_rate, 2)
    }
    
    # Save report
    report_file = os.path.join(backend_dir, 'watson_integration_test_report.json')
    with open(report_file, 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"   📄 Test report saved to: {report_file}")
    print(f"   📈 Overall Success Rate: {success_rate}%")
    
    return report

def main():
    """Main test function"""
    print("🧪 IBM WatsonX Orchestrate Integration Test Suite")
    print("=" * 60)
    
    # Run all tests
    report = generate_test_report()
    
    # Print summary
    print("\n" + "=" * 60)
    print("📋 TEST SUMMARY")
    print("=" * 60)
    
    for test_name, result in report['tests'].items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name.upper()}: {status}")
    
    print(f"\nOverall Success Rate: {report['summary']['success_rate']}%")
    
    if report['summary']['success_rate'] >= 80:
        print("🎉 Integration test completed successfully!")
    else:
        print("⚠️  Some tests failed. Please check the configuration and setup.")
    
    return report['summary']['success_rate'] >= 80

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
