"""
Impact Calculator Tool for IBM WatsonX Orchestrate
Calculates social and environmental impact metrics
"""

import logging
from typing import Dict, Any, List
import math
from ibm_watsonx_orchestrate.agent_builder.tools import tool

logger = logging.getLogger(__name__)

@tool
def impact_calculator_function(project_metrics: Dict[str, Any], 
                             baseline_data: Dict[str, Any] = None,
                             timeframe: str = "12_months") -> Dict[str, Any]:
    """
    Calculate social and environmental impact metrics
    
    Args:
        project_metrics: Project impact metrics and data
        baseline_data: Baseline impact data for comparison
        timeframe: Assessment timeframe (6_months, 12_months, 24_months)
    
    Returns:
        Calculated impact metrics and analysis
    """
    try:
        logger.info("Calculating project impact metrics")
        
        # Calculate different types of impact
        social_impact = _calculate_social_impact(project_metrics, baseline_data)
        environmental_impact = _calculate_environmental_impact(project_metrics, baseline_data)
        economic_impact = _calculate_economic_impact(project_metrics, baseline_data)
        
        # Calculate overall impact score
        overall_impact = _calculate_overall_impact(social_impact, environmental_impact, economic_impact)
        
        # Generate impact insights
        insights = _generate_impact_insights(social_impact, environmental_impact, economic_impact)
        
        return {
            "timeframe": timeframe,
            "overall_impact_score": round(overall_impact, 2),
            "social_impact": social_impact,
            "environmental_impact": environmental_impact,
            "economic_impact": economic_impact,
            "insights": insights,
            "recommendations": _generate_impact_recommendations(overall_impact, social_impact, environmental_impact, economic_impact),
            "success": True
        }
        
    except Exception as e:
        logger.error(f"Error in impact calculation: {str(e)}")
        return {
            "error": f"Impact calculation failed: {str(e)}",
            "success": False
        }

def _calculate_social_impact(project_metrics: Dict[str, Any], baseline_data: Dict[str, Any] = None) -> Dict[str, Any]:
    """Calculate social impact metrics"""
    
    # Extract social metrics
    beneficiaries = project_metrics.get('beneficiaries', 0)
    education_impact = project_metrics.get('education_metrics', {})
    health_impact = project_metrics.get('health_metrics', {})
    community_impact = project_metrics.get('community_metrics', {})
    
    # Calculate individual scores
    beneficiary_score = _normalize_beneficiary_impact(beneficiaries)
    education_score = _calculate_education_impact(education_impact)
    health_score = _calculate_health_impact(health_impact)
    community_score = _calculate_community_impact(community_impact)
    
    # Weighted social impact score
    social_score = (
        beneficiary_score * 0.3 +
        education_score * 0.25 +
        health_score * 0.25 +
        community_score * 0.2
    )
    
    return {
        "score": round(social_score, 2),
        "beneficiary_impact": {
            "count": beneficiaries,
            "score": round(beneficiary_score, 2)
        },
        "education_impact": {
            "metrics": education_impact,
            "score": round(education_score, 2)
        },
        "health_impact": {
            "metrics": health_impact,
            "score": round(health_score, 2)
        },
        "community_impact": {
            "metrics": community_impact,
            "score": round(community_score, 2)
        }
    }

def _calculate_environmental_impact(project_metrics: Dict[str, Any], baseline_data: Dict[str, Any] = None) -> Dict[str, Any]:
    """Calculate environmental impact metrics"""
    
    # Extract environmental metrics
    carbon_reduction = project_metrics.get('carbon_reduction_tons', 0)
    water_conservation = project_metrics.get('water_conservation_liters', 0)
    waste_reduction = project_metrics.get('waste_reduction_kg', 0)
    biodiversity_impact = project_metrics.get('biodiversity_metrics', {})
    
    # Calculate individual scores
    carbon_score = _normalize_carbon_impact(carbon_reduction)
    water_score = _normalize_water_impact(water_conservation)
    waste_score = _normalize_waste_impact(waste_reduction)
    biodiversity_score = _calculate_biodiversity_impact(biodiversity_impact)
    
    # Weighted environmental impact score
    environmental_score = (
        carbon_score * 0.4 +
        water_score * 0.3 +
        waste_score * 0.2 +
        biodiversity_score * 0.1
    )
    
    return {
        "score": round(environmental_score, 2),
        "carbon_impact": {
            "reduction_tons": carbon_reduction,
            "score": round(carbon_score, 2)
        },
        "water_impact": {
            "conservation_liters": water_conservation,
            "score": round(water_score, 2)
        },
        "waste_impact": {
            "reduction_kg": waste_reduction,
            "score": round(waste_score, 2)
        },
        "biodiversity_impact": {
            "metrics": biodiversity_impact,
            "score": round(biodiversity_score, 2)
        }
    }

def _calculate_economic_impact(project_metrics: Dict[str, Any], baseline_data: Dict[str, Any] = None) -> Dict[str, Any]:
    """Calculate economic impact metrics"""
    
    # Extract economic metrics
    jobs_created = project_metrics.get('jobs_created', 0)
    local_spending = project_metrics.get('local_spending_usd', 0)
    skill_development = project_metrics.get('skill_development_metrics', {})
    market_development = project_metrics.get('market_development_metrics', {})
    
    # Calculate individual scores
    jobs_score = _normalize_jobs_impact(jobs_created)
    spending_score = _normalize_spending_impact(local_spending)
    skills_score = _calculate_skills_impact(skill_development)
    market_score = _calculate_market_impact(market_development)
    
    # Weighted economic impact score
    economic_score = (
        jobs_score * 0.3 +
        spending_score * 0.3 +
        skills_score * 0.2 +
        market_score * 0.2
    )
    
    return {
        "score": round(economic_score, 2),
        "employment_impact": {
            "jobs_created": jobs_created,
            "score": round(jobs_score, 2)
        },
        "spending_impact": {
            "local_spending_usd": local_spending,
            "score": round(spending_score, 2)
        },
        "skills_impact": {
            "metrics": skill_development,
            "score": round(skills_score, 2)
        },
        "market_impact": {
            "metrics": market_development,
            "score": round(market_score, 2)
        }
    }

def _calculate_overall_impact(social_impact: Dict[str, Any], 
                            environmental_impact: Dict[str, Any], 
                            economic_impact: Dict[str, Any]) -> float:
    """Calculate overall impact score"""
    
    # Weighted combination of all impact types
    overall_score = (
        social_impact['score'] * 0.4 +
        environmental_impact['score'] * 0.35 +
        economic_impact['score'] * 0.25
    )
    
    return overall_score

def _normalize_beneficiary_impact(beneficiaries: int) -> float:
    """Normalize beneficiary count to 0-1 score"""
    if beneficiaries <= 0:
        return 0.0
    elif beneficiaries <= 100:
        return 0.3
    elif beneficiaries <= 1000:
        return 0.6
    elif beneficiaries <= 10000:
        return 0.8
    else:
        return 1.0

def _normalize_carbon_impact(carbon_reduction: float) -> float:
    """Normalize carbon reduction to 0-1 score"""
    if carbon_reduction <= 0:
        return 0.0
    elif carbon_reduction <= 10:
        return 0.3
    elif carbon_reduction <= 100:
        return 0.6
    elif carbon_reduction <= 1000:
        return 0.8
    else:
        return 1.0

def _normalize_water_impact(water_conservation: float) -> float:
    """Normalize water conservation to 0-1 score"""
    if water_conservation <= 0:
        return 0.0
    elif water_conservation <= 10000:  # 10k liters
        return 0.3
    elif water_conservation <= 100000:  # 100k liters
        return 0.6
    elif water_conservation <= 1000000:  # 1M liters
        return 0.8
    else:
        return 1.0

def _normalize_waste_impact(waste_reduction: float) -> float:
    """Normalize waste reduction to 0-1 score"""
    if waste_reduction <= 0:
        return 0.0
    elif waste_reduction <= 100:  # 100kg
        return 0.3
    elif waste_reduction <= 1000:  # 1 ton
        return 0.6
    elif waste_reduction <= 10000:  # 10 tons
        return 0.8
    else:
        return 1.0

def _normalize_jobs_impact(jobs_created: int) -> float:
    """Normalize jobs created to 0-1 score"""
    if jobs_created <= 0:
        return 0.0
    elif jobs_created <= 5:
        return 0.3
    elif jobs_created <= 20:
        return 0.6
    elif jobs_created <= 100:
        return 0.8
    else:
        return 1.0

def _normalize_spending_impact(local_spending: float) -> float:
    """Normalize local spending to 0-1 score"""
    if local_spending <= 0:
        return 0.0
    elif local_spending <= 10000:  # $10k
        return 0.3
    elif local_spending <= 100000:  # $100k
        return 0.6
    elif local_spending <= 1000000:  # $1M
        return 0.8
    else:
        return 1.0

def _calculate_education_impact(education_metrics: Dict[str, Any]) -> float:
    """Calculate education impact score"""
    if not education_metrics:
        return 0.0
    
    students_reached = education_metrics.get('students_reached', 0)
    schools_improved = education_metrics.get('schools_improved', 0)
    teachers_trained = education_metrics.get('teachers_trained', 0)
    
    # Simple scoring based on metrics
    score = 0.0
    if students_reached > 0:
        score += 0.4
    if schools_improved > 0:
        score += 0.3
    if teachers_trained > 0:
        score += 0.3
    
    return min(score, 1.0)

def _calculate_health_impact(health_metrics: Dict[str, Any]) -> float:
    """Calculate health impact score"""
    if not health_metrics:
        return 0.0
    
    people_served = health_metrics.get('people_served', 0)
    health_facilities_improved = health_metrics.get('facilities_improved', 0)
    health_workers_trained = health_metrics.get('workers_trained', 0)
    
    # Simple scoring based on metrics
    score = 0.0
    if people_served > 0:
        score += 0.4
    if health_facilities_improved > 0:
        score += 0.3
    if health_workers_trained > 0:
        score += 0.3
    
    return min(score, 1.0)

def _calculate_community_impact(community_metrics: Dict[str, Any]) -> float:
    """Calculate community impact score"""
    if not community_metrics:
        return 0.0
    
    community_groups_engaged = community_metrics.get('groups_engaged', 0)
    infrastructure_improved = community_metrics.get('infrastructure_improved', 0)
    social_cohesion_score = community_metrics.get('social_cohesion_score', 0)
    
    # Simple scoring based on metrics
    score = 0.0
    if community_groups_engaged > 0:
        score += 0.3
    if infrastructure_improved > 0:
        score += 0.3
    if social_cohesion_score > 0:
        score += 0.4
    
    return min(score, 1.0)

def _calculate_biodiversity_impact(biodiversity_metrics: Dict[str, Any]) -> float:
    """Calculate biodiversity impact score"""
    if not biodiversity_metrics:
        return 0.0
    
    species_protected = biodiversity_metrics.get('species_protected', 0)
    habitat_area_protected = biodiversity_metrics.get('habitat_area_hectares', 0)
    ecosystem_services_improved = biodiversity_metrics.get('ecosystem_services', 0)
    
    # Simple scoring based on metrics
    score = 0.0
    if species_protected > 0:
        score += 0.4
    if habitat_area_protected > 0:
        score += 0.4
    if ecosystem_services_improved > 0:
        score += 0.2
    
    return min(score, 1.0)

def _calculate_skills_impact(skill_development: Dict[str, Any]) -> float:
    """Calculate skills development impact score"""
    if not skill_development:
        return 0.0
    
    people_trained = skill_development.get('people_trained', 0)
    skills_taught = skill_development.get('skills_taught', [])
    certification_provided = skill_development.get('certification_provided', False)
    
    # Simple scoring based on metrics
    score = 0.0
    if people_trained > 0:
        score += 0.4
    if len(skills_taught) > 0:
        score += 0.4
    if certification_provided:
        score += 0.2
    
    return min(score, 1.0)

def _calculate_market_impact(market_development: Dict[str, Any]) -> float:
    """Calculate market development impact score"""
    if not market_development:
        return 0.0
    
    businesses_supported = market_development.get('businesses_supported', 0)
    market_access_improved = market_development.get('market_access_improved', False)
    value_chain_development = market_development.get('value_chain_development', 0)
    
    # Simple scoring based on metrics
    score = 0.0
    if businesses_supported > 0:
        score += 0.4
    if market_access_improved:
        score += 0.3
    if value_chain_development > 0:
        score += 0.3
    
    return min(score, 1.0)

def _generate_impact_insights(social_impact: Dict[str, Any], 
                            environmental_impact: Dict[str, Any], 
                            economic_impact: Dict[str, Any]) -> List[str]:
    """Generate insights from impact analysis"""
    insights = []
    
    # Social impact insights
    if social_impact['score'] > 0.8:
        insights.append("Excellent social impact potential with strong beneficiary reach")
    elif social_impact['score'] < 0.4:
        insights.append("Social impact could be enhanced with better beneficiary targeting")
    
    # Environmental impact insights
    if environmental_impact['score'] > 0.8:
        insights.append("Strong environmental benefits with significant carbon and resource savings")
    elif environmental_impact['score'] < 0.4:
        insights.append("Environmental impact could be improved with more sustainable practices")
    
    # Economic impact insights
    if economic_impact['score'] > 0.8:
        insights.append("High economic impact potential with job creation and local development")
    elif economic_impact['score'] < 0.4:
        insights.append("Economic impact could be strengthened with more local engagement")
    
    return insights

def _generate_impact_recommendations(overall_impact: float, 
                                   social_impact: Dict[str, Any], 
                                   environmental_impact: Dict[str, Any], 
                                   economic_impact: Dict[str, Any]) -> List[str]:
    """Generate recommendations for impact optimization"""
    recommendations = []
    
    if overall_impact < 0.5:
        recommendations.append("Consider redesigning project to improve overall impact potential")
    
    if social_impact['score'] < 0.5:
        recommendations.append("Enhance social impact by increasing beneficiary reach and community engagement")
    
    if environmental_impact['score'] < 0.5:
        recommendations.append("Improve environmental impact through sustainable practices and resource conservation")
    
    if economic_impact['score'] < 0.5:
        recommendations.append("Strengthen economic impact through local job creation and market development")
    
    if overall_impact > 0.8:
        recommendations.append("Excellent impact potential - proceed with implementation")
    
    return recommendations
