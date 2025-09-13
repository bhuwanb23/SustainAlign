"""
Risk Assessor Tool for IBM WatsonX Orchestrate
Assesses project risks and mitigation strategies
"""

import logging
from typing import Dict, Any, List
import json
from ibm_watsonx_orchestrate.agent_builder.tools import tool

logger = logging.getLogger(__name__)

@tool
def risk_assessor_function(project_data: Dict[str, Any], 
                          risk_factors: List[Dict[str, Any]] = None,
                          mitigation_strategies: List[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Assess project risks and provide mitigation recommendations
    
    Args:
        project_data: Project information including budget, timeline, location, etc.
        risk_factors: Known risk factors and their details
        mitigation_strategies: Existing mitigation strategies
    
    Returns:
        Risk assessment with scores and recommendations
    """
    try:
        logger.info("Assessing project risks")
        
        # Identify and assess different risk categories
        financial_risks = _assess_financial_risks(project_data)
        operational_risks = _assess_operational_risks(project_data)
        environmental_risks = _assess_environmental_risks(project_data)
        social_risks = _assess_social_risks(project_data)
        regulatory_risks = _assess_regulatory_risks(project_data)
        
        # Calculate overall risk score
        overall_risk = _calculate_overall_risk(
            financial_risks, operational_risks, environmental_risks, 
            social_risks, regulatory_risks
        )
        
        # Generate risk mitigation recommendations
        mitigation_recommendations = _generate_mitigation_recommendations(
            financial_risks, operational_risks, environmental_risks,
            social_risks, regulatory_risks
        )
        
        return {
            "overall_risk_score": round(overall_risk, 2),
            "risk_categories": {
                "financial_risks": financial_risks,
                "operational_risks": operational_risks,
                "environmental_risks": environmental_risks,
                "social_risks": social_risks,
                "regulatory_risks": regulatory_risks
            },
            "mitigation_recommendations": mitigation_recommendations,
            "risk_level": _determine_risk_level(overall_risk),
            "success": True
        }
        
    except Exception as e:
        logger.error(f"Error in risk assessment: {str(e)}")
        return {
            "error": f"Risk assessment failed: {str(e)}",
            "success": False
        }

def _assess_financial_risks(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Assess financial risks"""
    
    budget = project_data.get('budget', 0)
    timeline = project_data.get('timeline_months', 12)
    funding_source = project_data.get('funding_source', 'unknown')
    currency_volatility = project_data.get('currency_volatility', 0.1)
    
    # Calculate risk factors
    budget_risk = _calculate_budget_risk(budget, timeline)
    funding_risk = _calculate_funding_risk(funding_source)
    currency_risk = _calculate_currency_risk(currency_volatility)
    
    # Weighted financial risk score
    financial_risk_score = (
        budget_risk * 0.4 +
        funding_risk * 0.4 +
        currency_risk * 0.2
    )
    
    return {
        "score": round(financial_risk_score, 2),
        "risk_factors": {
            "budget_risk": {
                "score": round(budget_risk, 2),
                "description": "Risk related to budget adequacy and cost overruns"
            },
            "funding_risk": {
                "score": round(funding_risk, 2),
                "description": "Risk related to funding source reliability"
            },
            "currency_risk": {
                "score": round(currency_risk, 2),
                "description": "Risk related to currency fluctuations"
            }
        },
        "mitigation_strategies": [
            "Establish contingency budget (10-20% of total budget)",
            "Diversify funding sources",
            "Use hedging strategies for currency risk",
            "Regular budget monitoring and reporting"
        ]
    }

def _assess_operational_risks(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Assess operational risks"""
    
    complexity = project_data.get('complexity_level', 'medium')
    team_size = project_data.get('team_size', 5)
    technology_requirements = project_data.get('technology_requirements', [])
    location = project_data.get('location', '')
    
    # Calculate risk factors
    complexity_risk = _calculate_complexity_risk(complexity)
    team_risk = _calculate_team_risk(team_size)
    technology_risk = _calculate_technology_risk(technology_requirements)
    location_risk = _calculate_location_risk(location)
    
    # Weighted operational risk score
    operational_risk_score = (
        complexity_risk * 0.3 +
        team_risk * 0.3 +
        technology_risk * 0.2 +
        location_risk * 0.2
    )
    
    return {
        "score": round(operational_risk_score, 2),
        "risk_factors": {
            "complexity_risk": {
                "score": round(complexity_risk, 2),
                "description": "Risk related to project complexity and scope"
            },
            "team_risk": {
                "score": round(team_risk, 2),
                "description": "Risk related to team capacity and expertise"
            },
            "technology_risk": {
                "score": round(technology_risk, 2),
                "description": "Risk related to technology requirements and availability"
            },
            "location_risk": {
                "score": round(location_risk, 2),
                "description": "Risk related to project location and logistics"
            }
        },
        "mitigation_strategies": [
            "Break down complex tasks into manageable phases",
            "Ensure adequate team training and capacity building",
            "Conduct technology feasibility assessment",
            "Develop robust logistics and supply chain management"
        ]
    }

def _assess_environmental_risks(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Assess environmental risks"""
    
    environmental_impact = project_data.get('environmental_impact', {})
    climate_vulnerability = project_data.get('climate_vulnerability', 'medium')
    resource_dependency = project_data.get('resource_dependency', [])
    sustainability_requirements = project_data.get('sustainability_requirements', [])
    
    # Calculate risk factors
    impact_risk = _calculate_environmental_impact_risk(environmental_impact)
    climate_risk = _calculate_climate_risk(climate_vulnerability)
    resource_risk = _calculate_resource_risk(resource_dependency)
    sustainability_risk = _calculate_sustainability_risk(sustainability_requirements)
    
    # Weighted environmental risk score
    environmental_risk_score = (
        impact_risk * 0.3 +
        climate_risk * 0.3 +
        resource_risk * 0.2 +
        sustainability_risk * 0.2
    )
    
    return {
        "score": round(environmental_risk_score, 2),
        "risk_factors": {
            "impact_risk": {
                "score": round(impact_risk, 2),
                "description": "Risk related to negative environmental impact"
            },
            "climate_risk": {
                "score": round(climate_risk, 2),
                "description": "Risk related to climate change vulnerability"
            },
            "resource_risk": {
                "score": round(resource_risk, 2),
                "description": "Risk related to resource availability and dependency"
            },
            "sustainability_risk": {
                "score": round(sustainability_risk, 2),
                "description": "Risk related to sustainability compliance"
            }
        },
        "mitigation_strategies": [
            "Conduct comprehensive environmental impact assessment",
            "Develop climate adaptation strategies",
            "Diversify resource sources and reduce dependency",
            "Implement sustainable practices and monitoring"
        ]
    }

def _assess_social_risks(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Assess social risks"""
    
    community_engagement = project_data.get('community_engagement', {})
    stakeholder_conflicts = project_data.get('stakeholder_conflicts', [])
    cultural_sensitivity = project_data.get('cultural_sensitivity', 'medium')
    social_impact = project_data.get('social_impact', {})
    
    # Calculate risk factors
    engagement_risk = _calculate_engagement_risk(community_engagement)
    conflict_risk = _calculate_conflict_risk(stakeholder_conflicts)
    cultural_risk = _calculate_cultural_risk(cultural_sensitivity)
    social_impact_risk = _calculate_social_impact_risk(social_impact)
    
    # Weighted social risk score
    social_risk_score = (
        engagement_risk * 0.3 +
        conflict_risk * 0.3 +
        cultural_risk * 0.2 +
        social_impact_risk * 0.2
    )
    
    return {
        "score": round(social_risk_score, 2),
        "risk_factors": {
            "engagement_risk": {
                "score": round(engagement_risk, 2),
                "description": "Risk related to community engagement and participation"
            },
            "conflict_risk": {
                "score": round(conflict_risk, 2),
                "description": "Risk related to stakeholder conflicts"
            },
            "cultural_risk": {
                "score": round(cultural_risk, 2),
                "description": "Risk related to cultural sensitivity and appropriateness"
            },
            "social_impact_risk": {
                "score": round(social_impact_risk, 2),
                "description": "Risk related to negative social impact"
            }
        },
        "mitigation_strategies": [
            "Develop comprehensive community engagement plan",
            "Establish conflict resolution mechanisms",
            "Conduct cultural sensitivity training",
            "Monitor social impact and adjust strategies accordingly"
        ]
    }

def _assess_regulatory_risks(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Assess regulatory risks"""
    
    regulatory_requirements = project_data.get('regulatory_requirements', [])
    compliance_status = project_data.get('compliance_status', 'unknown')
    legal_framework = project_data.get('legal_framework', 'stable')
    permits_required = project_data.get('permits_required', [])
    
    # Calculate risk factors
    compliance_risk = _calculate_compliance_risk(compliance_status)
    legal_risk = _calculate_legal_risk(legal_framework)
    permit_risk = _calculate_permit_risk(permits_required)
    
    # Weighted regulatory risk score
    regulatory_risk_score = (
        compliance_risk * 0.4 +
        legal_risk * 0.3 +
        permit_risk * 0.3
    )
    
    return {
        "score": round(regulatory_risk_score, 2),
        "risk_factors": {
            "compliance_risk": {
                "score": round(compliance_risk, 2),
                "description": "Risk related to regulatory compliance"
            },
            "legal_risk": {
                "score": round(legal_risk, 2),
                "description": "Risk related to legal framework stability"
            },
            "permit_risk": {
                "score": round(permit_risk, 2),
                "description": "Risk related to permit acquisition and maintenance"
            }
        },
        "mitigation_strategies": [
            "Conduct thorough regulatory compliance audit",
            "Monitor legal framework changes",
            "Ensure timely permit applications and renewals",
            "Establish legal advisory support"
        ]
    }

def _calculate_budget_risk(budget: float, timeline: int) -> float:
    """Calculate budget risk score"""
    if budget <= 0:
        return 1.0  # High risk if no budget
    
    # Risk increases with longer timelines and smaller budgets
    budget_per_month = budget / max(timeline, 1)
    
    if budget_per_month < 1000:
        return 0.8
    elif budget_per_month < 10000:
        return 0.5
    elif budget_per_month < 50000:
        return 0.3
    else:
        return 0.1

def _calculate_funding_risk(funding_source: str) -> float:
    """Calculate funding source risk score"""
    risk_levels = {
        'government': 0.2,
        'foundation': 0.3,
        'corporate': 0.4,
        'individual': 0.6,
        'crowdfunding': 0.7,
        'unknown': 0.8
    }
    return risk_levels.get(funding_source.lower(), 0.5)

def _calculate_currency_risk(volatility: float) -> float:
    """Calculate currency volatility risk score"""
    return min(volatility * 2, 1.0)  # Scale volatility to 0-1

def _calculate_complexity_risk(complexity: str) -> float:
    """Calculate project complexity risk score"""
    risk_levels = {
        'low': 0.2,
        'medium': 0.5,
        'high': 0.8,
        'very_high': 1.0
    }
    return risk_levels.get(complexity.lower(), 0.5)

def _calculate_team_risk(team_size: int) -> float:
    """Calculate team size risk score"""
    if team_size <= 2:
        return 0.8  # High risk with small team
    elif team_size <= 5:
        return 0.5  # Medium risk
    elif team_size <= 10:
        return 0.3  # Low risk
    else:
        return 0.2  # Very low risk

def _calculate_technology_risk(technology_requirements: List[str]) -> float:
    """Calculate technology risk score"""
    if not technology_requirements:
        return 0.1  # Low risk if no special tech requirements
    
    # Higher risk with more complex technology requirements
    complexity_score = len(technology_requirements) * 0.1
    return min(complexity_score, 1.0)

def _calculate_location_risk(location: str) -> float:
    """Calculate location risk score"""
    if not location:
        return 0.5  # Medium risk if no location info
    
    # Simple risk assessment based on location keywords
    high_risk_keywords = ['conflict', 'war', 'disaster', 'remote', 'rural']
    medium_risk_keywords = ['developing', 'emerging', 'transition']
    
    location_lower = location.lower()
    
    for keyword in high_risk_keywords:
        if keyword in location_lower:
            return 0.8
    
    for keyword in medium_risk_keywords:
        if keyword in location_lower:
            return 0.5
    
    return 0.3  # Low risk for stable locations

def _calculate_environmental_impact_risk(environmental_impact: Dict[str, Any]) -> float:
    """Calculate environmental impact risk score"""
    if not environmental_impact:
        return 0.2  # Low risk if no significant environmental impact
    
    # Higher risk with more significant environmental impact
    impact_score = len(environmental_impact) * 0.1
    return min(impact_score, 1.0)

def _calculate_climate_risk(climate_vulnerability: str) -> float:
    """Calculate climate vulnerability risk score"""
    risk_levels = {
        'low': 0.2,
        'medium': 0.5,
        'high': 0.8,
        'very_high': 1.0
    }
    return risk_levels.get(climate_vulnerability.lower(), 0.5)

def _calculate_resource_risk(resource_dependency: List[str]) -> float:
    """Calculate resource dependency risk score"""
    if not resource_dependency:
        return 0.1  # Low risk if no resource dependencies
    
    # Higher risk with more resource dependencies
    dependency_score = len(resource_dependency) * 0.15
    return min(dependency_score, 1.0)

def _calculate_sustainability_risk(sustainability_requirements: List[str]) -> float:
    """Calculate sustainability compliance risk score"""
    if not sustainability_requirements:
        return 0.2  # Low risk if no sustainability requirements
    
    # Higher risk with more sustainability requirements
    compliance_score = len(sustainability_requirements) * 0.1
    return min(compliance_score, 1.0)

def _calculate_engagement_risk(community_engagement: Dict[str, Any]) -> float:
    """Calculate community engagement risk score"""
    if not community_engagement:
        return 0.7  # High risk if no community engagement plan
    
    engagement_level = community_engagement.get('level', 'low')
    risk_levels = {
        'low': 0.7,
        'medium': 0.4,
        'high': 0.2
    }
    return risk_levels.get(engagement_level.lower(), 0.5)

def _calculate_conflict_risk(stakeholder_conflicts: List[str]) -> float:
    """Calculate stakeholder conflict risk score"""
    if not stakeholder_conflicts:
        return 0.1  # Low risk if no conflicts
    
    # Higher risk with more conflicts
    conflict_score = len(stakeholder_conflicts) * 0.2
    return min(conflict_score, 1.0)

def _calculate_cultural_risk(cultural_sensitivity: str) -> float:
    """Calculate cultural sensitivity risk score"""
    risk_levels = {
        'low': 0.8,
        'medium': 0.5,
        'high': 0.2
    }
    return risk_levels.get(cultural_sensitivity.lower(), 0.5)

def _calculate_social_impact_risk(social_impact: Dict[str, Any]) -> float:
    """Calculate social impact risk score"""
    if not social_impact:
        return 0.2  # Low risk if no significant social impact
    
    # Higher risk with more significant social impact
    impact_score = len(social_impact) * 0.1
    return min(impact_score, 1.0)

def _calculate_compliance_risk(compliance_status: str) -> float:
    """Calculate compliance risk score"""
    risk_levels = {
        'compliant': 0.1,
        'partially_compliant': 0.4,
        'non_compliant': 0.8,
        'unknown': 0.7
    }
    return risk_levels.get(compliance_status.lower(), 0.5)

def _calculate_legal_risk(legal_framework: str) -> float:
    """Calculate legal framework risk score"""
    risk_levels = {
        'stable': 0.2,
        'evolving': 0.5,
        'unstable': 0.8,
        'unknown': 0.6
    }
    return risk_levels.get(legal_framework.lower(), 0.5)

def _calculate_permit_risk(permits_required: List[str]) -> float:
    """Calculate permit risk score"""
    if not permits_required:
        return 0.1  # Low risk if no permits required
    
    # Higher risk with more permits required
    permit_score = len(permits_required) * 0.15
    return min(permit_score, 1.0)

def _calculate_overall_risk(financial_risks: Dict[str, Any], 
                          operational_risks: Dict[str, Any], 
                          environmental_risks: Dict[str, Any], 
                          social_risks: Dict[str, Any], 
                          regulatory_risks: Dict[str, Any]) -> float:
    """Calculate overall risk score"""
    
    # Weighted combination of all risk categories
    overall_risk = (
        financial_risks['score'] * 0.25 +
        operational_risks['score'] * 0.25 +
        environmental_risks['score'] * 0.2 +
        social_risks['score'] * 0.15 +
        regulatory_risks['score'] * 0.15
    )
    
    return overall_risk

def _determine_risk_level(risk_score: float) -> str:
    """Determine risk level based on score"""
    if risk_score <= 0.3:
        return "Low"
    elif risk_score <= 0.6:
        return "Medium"
    elif risk_score <= 0.8:
        return "High"
    else:
        return "Very High"

def _generate_mitigation_recommendations(financial_risks: Dict[str, Any], 
                                       operational_risks: Dict[str, Any], 
                                       environmental_risks: Dict[str, Any], 
                                       social_risks: Dict[str, Any], 
                                       regulatory_risks: Dict[str, Any]) -> List[str]:
    """Generate comprehensive mitigation recommendations"""
    recommendations = []
    
    # High-level recommendations based on overall risk levels
    all_risks = [financial_risks, operational_risks, environmental_risks, social_risks, regulatory_risks]
    high_risk_categories = [risk for risk in all_risks if risk['score'] > 0.7]
    
    if len(high_risk_categories) >= 3:
        recommendations.append("Project has multiple high-risk areas - consider comprehensive risk management plan")
    
    # Category-specific recommendations
    if financial_risks['score'] > 0.6:
        recommendations.extend(financial_risks['mitigation_strategies'][:2])
    
    if operational_risks['score'] > 0.6:
        recommendations.extend(operational_risks['mitigation_strategies'][:2])
    
    if environmental_risks['score'] > 0.6:
        recommendations.extend(environmental_risks['mitigation_strategies'][:2])
    
    if social_risks['score'] > 0.6:
        recommendations.extend(social_risks['mitigation_strategies'][:2])
    
    if regulatory_risks['score'] > 0.6:
        recommendations.extend(regulatory_risks['mitigation_strategies'][:2])
    
    # General recommendations
    recommendations.extend([
        "Establish regular risk monitoring and reporting system",
        "Develop contingency plans for high-risk scenarios",
        "Ensure adequate insurance coverage",
        "Maintain stakeholder communication and transparency"
    ])
    
    return list(set(recommendations))  # Remove duplicates
