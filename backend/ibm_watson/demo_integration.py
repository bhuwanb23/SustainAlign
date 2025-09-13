#!/usr/bin/env python3
"""
Demo IBM WatsonX Orchestrate Integration
This script demonstrates the SustainAlign agents and tools in action
"""

import os
import sys
import json
import logging
from pathlib import Path

# Add current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def demo_project_analysis():
    """Demonstrate project analysis capabilities"""
    logger.info("🔍 DEMO: Project Analysis")
    logger.info("=" * 50)
    
    try:
        from tools.project_analyzer import project_analyzer_function
        
        # Sample project data
        project_data = {
            "name": "Rural Education Initiative",
            "description": "Improve access to quality education in rural areas",
            "budget": 50000,
            "timeline_months": 18,
            "location": "Rural India",
            "sdg_focus": [4, 10],  # Quality Education, Reduced Inequalities
            "expected_beneficiaries": 5000,
            "complexity_level": "medium",
            "sustainability_score": 0.8
        }
        
        # Sample company profile
        company_profile = {
            "name": "TechCorp Global",
            "sdg_priorities": [4, 10, 17],  # Education, Inequality, Partnerships
            "geographic_focus": ["India", "Southeast Asia"],
            "available_budget": 200000,
            "capabilities": ["education", "technology", "community_development"]
        }
        
        # Test alignment analysis
        logger.info("Testing project alignment analysis...")
        alignment_result = project_analyzer_function(
            project_data=project_data,
            company_profile=company_profile,
            analysis_type="alignment"
        )
        
        if alignment_result.get("success", False):
            logger.info(f"✅ Alignment Score: {alignment_result['overall_score']}")
            logger.info(f"📊 Detailed Scores:")
            for key, value in alignment_result['detailed_scores'].items():
                logger.info(f"   - {key}: {value}")
            logger.info(f"💡 Recommendations:")
            for rec in alignment_result['recommendations']:
                logger.info(f"   - {rec}")
        else:
            logger.error(f"❌ Analysis failed: {alignment_result.get('error', 'Unknown error')}")
        
        # Test feasibility analysis
        logger.info("\nTesting project feasibility analysis...")
        feasibility_result = project_analyzer_function(
            project_data=project_data,
            company_profile=company_profile,
            analysis_type="feasibility"
        )
        
        if feasibility_result.get("success", False):
            logger.info(f"✅ Feasibility Score: {feasibility_result['overall_score']}")
            logger.info(f"📊 Detailed Scores:")
            for key, value in feasibility_result['detailed_scores'].items():
                logger.info(f"   - {key}: {value}")
        else:
            logger.error(f"❌ Analysis failed: {feasibility_result.get('error', 'Unknown error')}")
            
    except Exception as e:
        logger.error(f"Error in project analysis demo: {e}")

def demo_impact_calculation():
    """Demonstrate impact calculation capabilities"""
    logger.info("\n🌍 DEMO: Impact Calculation")
    logger.info("=" * 50)
    
    try:
        from tools.impact_calculator import impact_calculator_function
        
        # Sample impact metrics
        project_metrics = {
            "beneficiaries": 5000,
            "education_metrics": {
                "students_reached": 5000,
                "schools_improved": 25,
                "teachers_trained": 100
            },
            "health_metrics": {
                "people_served": 2000,
                "facilities_improved": 5,
                "workers_trained": 20
            },
            "carbon_reduction_tons": 50,
            "water_conservation_liters": 100000,
            "waste_reduction_kg": 5000,
            "jobs_created": 15,
            "local_spending_usd": 30000
        }
        
        logger.info("Calculating project impact...")
        impact_result = impact_calculator_function(
            project_metrics=project_metrics,
            baseline_data={},
            timeframe="12_months"
        )
        
        if impact_result.get("success", False):
            logger.info(f"✅ Overall Impact Score: {impact_result['overall_impact_score']}")
            logger.info(f"📊 Impact Breakdown:")
            logger.info(f"   - Social Impact: {impact_result['social_impact']['score']}")
            logger.info(f"   - Environmental Impact: {impact_result['environmental_impact']['score']}")
            logger.info(f"   - Economic Impact: {impact_result['economic_impact']['score']}")
            logger.info(f"💡 Insights:")
            for insight in impact_result['insights']:
                logger.info(f"   - {insight}")
        else:
            logger.error(f"❌ Impact calculation failed: {impact_result.get('error', 'Unknown error')}")
            
    except Exception as e:
        logger.error(f"Error in impact calculation demo: {e}")

def demo_risk_assessment():
    """Demonstrate risk assessment capabilities"""
    logger.info("\n⚠️ DEMO: Risk Assessment")
    logger.info("=" * 50)
    
    try:
        from tools.risk_assessor import risk_assessor_function
        
        # Sample project data
        project_data = {
            "name": "Rural Education Initiative",
            "budget": 50000,
            "timeline_months": 18,
            "location": "Rural India",
            "complexity_level": "medium",
            "team_size": 8,
            "technology_requirements": ["internet", "computers"],
            "environmental_impact": {"carbon_footprint": "low"},
            "community_engagement": {"level": "high"},
            "regulatory_requirements": ["education_license"],
            "compliance_status": "compliant"
        }
        
        logger.info("Assessing project risks...")
        risk_result = risk_assessor_function(project_data=project_data)
        
        if risk_result.get("success", False):
            logger.info(f"✅ Overall Risk Score: {risk_result['overall_risk_score']}")
            logger.info(f"📊 Risk Level: {risk_result['risk_level']}")
            logger.info(f"📊 Risk Categories:")
            for category, details in risk_result['risk_categories'].items():
                logger.info(f"   - {category}: {details['score']}")
            logger.info(f"💡 Mitigation Recommendations:")
            for rec in risk_result['mitigation_recommendations'][:5]:  # Show first 5
                logger.info(f"   - {rec}")
        else:
            logger.error(f"❌ Risk assessment failed: {risk_result.get('error', 'Unknown error')}")
            
    except Exception as e:
        logger.error(f"Error in risk assessment demo: {e}")

def demo_budget_optimization():
    """Demonstrate budget optimization capabilities"""
    logger.info("\n💰 DEMO: Budget Optimization")
    logger.info("=" * 50)
    
    try:
        from tools.budget_optimizer import budget_optimizer_function
        
        # Sample project list
        project_list = [
            {
                "name": "Rural Education Initiative",
                "budget": 50000,
                "expected_return": 75000,
                "timeline_months": 18,
                "expected_beneficiaries": 5000,
                "sdg_alignment_score": 0.9,
                "sustainability_score": 0.8,
                "risk_level": "medium",
                "complexity_level": "medium",
                "location": "Rural India",
                "sdg_focus": [4, 10]
            },
            {
                "name": "Clean Water Project",
                "budget": 30000,
                "expected_return": 45000,
                "timeline_months": 12,
                "expected_beneficiaries": 3000,
                "sdg_alignment_score": 0.7,
                "sustainability_score": 0.9,
                "risk_level": "low",
                "complexity_level": "low",
                "location": "Rural India",
                "sdg_focus": [6, 3]
            },
            {
                "name": "Women Empowerment Program",
                "budget": 40000,
                "expected_return": 60000,
                "timeline_months": 24,
                "expected_beneficiaries": 2000,
                "sdg_alignment_score": 0.8,
                "sustainability_score": 0.7,
                "risk_level": "medium",
                "complexity_level": "high",
                "location": "Urban India",
                "sdg_focus": [5, 8]
            }
        ]
        
        available_budget = 100000
        
        logger.info(f"Optimizing budget allocation for {len(project_list)} projects...")
        optimization_result = budget_optimizer_function(
            available_budget=available_budget,
            project_list=project_list,
            constraints={}
        )
        
        if optimization_result.get("success", False):
            logger.info(f"✅ Budget Utilization: {optimization_result['utilization_percentage']}%")
            logger.info(f"📊 Selected Projects:")
            for project in optimization_result['optimized_allocation']['selected_projects']:
                logger.info(f"   - {project['name']}: ${project['allocated_budget']} (Score: {project['overall_score']})")
            logger.info(f"💡 Recommendations:")
            for rec in optimization_result['recommendations'][:5]:  # Show first 5
                logger.info(f"   - {rec}")
        else:
            logger.error(f"❌ Budget optimization failed: {optimization_result.get('error', 'Unknown error')}")
            
    except Exception as e:
        logger.error(f"Error in budget optimization demo: {e}")

def main():
    """Run all demos"""
    logger.info("🚀 SUSTAINALIGN WATSONX ORCHESTRATE INTEGRATION DEMO")
    logger.info("=" * 60)
    logger.info("This demo showcases the AI agents and tools for CSR project analysis")
    logger.info("=" * 60)
    
    # Run all demos
    demo_project_analysis()
    demo_impact_calculation()
    demo_risk_assessment()
    demo_budget_optimization()
    
    logger.info("\n🎉 DEMO COMPLETED!")
    logger.info("=" * 60)
    logger.info("Next steps:")
    logger.info("1. Deploy agents: python deploy_agents.py")
    logger.info("2. Test integration: python test_integration.py")
    logger.info("3. Start chat: orchestrate chat start")
    logger.info("4. Web interface: http://localhost:3000/chat-lite")
    logger.info("=" * 60)

if __name__ == "__main__":
    main()
