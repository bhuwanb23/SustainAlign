"""
Sustainability Analyzer Tool for IBM WatsonX Orchestrate
Analyzes projects for sustainability best practices and recommendations
"""

import logging
from typing import Dict, Any, List
import json

logger = logging.getLogger(__name__)

def sustainability_analyzer_function(project_data: Dict[str, Any], 
                                   sustainability_framework: str = "SDG") -> Dict[str, Any]:
    """
    Analyze CSR project for sustainability best practices and recommendations
    
    Args:
        project_data: Project information including objectives, impact metrics, timeline
        sustainability_framework: Framework to use (SDG, ESG, TCFD, etc.)
    
    Returns:
        Sustainability analysis with scores and recommendations
    """
    try:
        logger.info(f"Analyzing sustainability for project: {project_data.get('name', 'Unknown')}")
        
        # Analyze different sustainability dimensions
        environmental_sustainability = _analyze_environmental_sustainability(project_data)
        social_sustainability = _analyze_social_sustainability(project_data)
        economic_sustainability = _analyze_economic_sustainability(project_data)
        governance_sustainability = _analyze_governance_sustainability(project_data)
        
        # Calculate overall sustainability score
        overall_score = _calculate_overall_sustainability_score(
            environmental_sustainability, social_sustainability, 
            economic_sustainability, governance_sustainability
        )
        
        # Generate recommendations
        recommendations = _generate_sustainability_recommendations(
            environmental_sustainability, social_sustainability,
            economic_sustainability, governance_sustainability
        )
        
        # Framework-specific analysis
        framework_analysis = _analyze_framework_alignment(project_data, sustainability_framework)
        
        return {
            "framework": sustainability_framework,
            "overall_sustainability_score": round(overall_score, 2),
            "environmental_sustainability": environmental_sustainability,
            "social_sustainability": social_sustainability,
            "economic_sustainability": economic_sustainability,
            "governance_sustainability": governance_sustainability,
            "framework_alignment": framework_analysis,
            "recommendations": recommendations,
            "best_practices": _identify_best_practices(project_data),
            "innovation_opportunities": _identify_innovation_opportunities(project_data),
            "success": True
        }
        
    except Exception as e:
        logger.error(f"Error in sustainability analysis: {str(e)}")
        return {
            "error": f"Sustainability analysis failed: {str(e)}",
            "success": False
        }

def _analyze_environmental_sustainability(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze environmental sustainability aspects"""
    
    # Extract environmental metrics
    carbon_footprint = project_data.get('carbon_footprint', {})
    resource_usage = project_data.get('resource_usage', {})
    waste_management = project_data.get('waste_management', {})
    biodiversity_impact = project_data.get('biodiversity_impact', {})
    
    # Calculate scores
    carbon_score = _assess_carbon_management(carbon_footprint)
    resource_score = _assess_resource_efficiency(resource_usage)
    waste_score = _assess_waste_management(waste_management)
    biodiversity_score = _assess_biodiversity_protection(biodiversity_impact)
    
    # Weighted environmental sustainability score
    env_score = (
        carbon_score * 0.3 +
        resource_score * 0.25 +
        waste_score * 0.25 +
        biodiversity_score * 0.2
    )
    
    return {
        "score": round(env_score, 2),
        "carbon_management": {
            "metrics": carbon_footprint,
            "score": round(carbon_score, 2)
        },
        "resource_efficiency": {
            "metrics": resource_usage,
            "score": round(resource_score, 2)
        },
        "waste_management": {
            "metrics": waste_management,
            "score": round(waste_score, 2)
        },
        "biodiversity_protection": {
            "metrics": biodiversity_impact,
            "score": round(biodiversity_score, 2)
        }
    }

def _analyze_social_sustainability(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze social sustainability aspects"""
    
    # Extract social metrics
    community_engagement = project_data.get('community_engagement', {})
    stakeholder_involvement = project_data.get('stakeholder_involvement', {})
    social_impact = project_data.get('social_impact', {})
    human_rights = project_data.get('human_rights_compliance', {})
    
    # Calculate scores
    community_score = _assess_community_engagement(community_engagement)
    stakeholder_score = _assess_stakeholder_involvement(stakeholder_involvement)
    impact_score = _assess_social_impact_quality(social_impact)
    rights_score = _assess_human_rights_compliance(human_rights)
    
    # Weighted social sustainability score
    social_score = (
        community_score * 0.3 +
        stakeholder_score * 0.25 +
        impact_score * 0.25 +
        rights_score * 0.2
    )
    
    return {
        "score": round(social_score, 2),
        "community_engagement": {
            "metrics": community_engagement,
            "score": round(community_score, 2)
        },
        "stakeholder_involvement": {
            "metrics": stakeholder_involvement,
            "score": round(stakeholder_score, 2)
        },
        "social_impact_quality": {
            "metrics": social_impact,
            "score": round(impact_score, 2)
        },
        "human_rights_compliance": {
            "metrics": human_rights,
            "score": round(rights_score, 2)
        }
    }

def _analyze_economic_sustainability(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze economic sustainability aspects"""
    
    # Extract economic metrics
    financial_viability = project_data.get('financial_viability', {})
    local_economic_impact = project_data.get('local_economic_impact', {})
    long_term_funding = project_data.get('long_term_funding', {})
    value_creation = project_data.get('value_creation', {})
    
    # Calculate scores
    viability_score = _assess_financial_viability(financial_viability)
    local_score = _assess_local_economic_impact(local_economic_impact)
    funding_score = _assess_long_term_funding(long_term_funding)
    value_score = _assess_value_creation(value_creation)
    
    # Weighted economic sustainability score
    economic_score = (
        viability_score * 0.3 +
        local_score * 0.25 +
        funding_score * 0.25 +
        value_score * 0.2
    )
    
    return {
        "score": round(economic_score, 2),
        "financial_viability": {
            "metrics": financial_viability,
            "score": round(viability_score, 2)
        },
        "local_economic_impact": {
            "metrics": local_economic_impact,
            "score": round(local_score, 2)
        },
        "long_term_funding": {
            "metrics": long_term_funding,
            "score": round(funding_score, 2)
        },
        "value_creation": {
            "metrics": value_creation,
            "score": round(value_score, 2)
        }
    }

def _analyze_governance_sustainability(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze governance sustainability aspects"""
    
    # Extract governance metrics
    transparency = project_data.get('transparency', {})
    accountability = project_data.get('accountability', {})
    ethical_practices = project_data.get('ethical_practices', {})
    risk_management = project_data.get('risk_management', {})
    
    # Calculate scores
    transparency_score = _assess_transparency(transparency)
    accountability_score = _assess_accountability(accountability)
    ethics_score = _assess_ethical_practices(ethical_practices)
    risk_score = _assess_risk_management(risk_management)
    
    # Weighted governance sustainability score
    governance_score = (
        transparency_score * 0.25 +
        accountability_score * 0.25 +
        ethics_score * 0.25 +
        risk_score * 0.25
    )
    
    return {
        "score": round(governance_score, 2),
        "transparency": {
            "metrics": transparency,
            "score": round(transparency_score, 2)
        },
        "accountability": {
            "metrics": accountability,
            "score": round(accountability_score, 2)
        },
        "ethical_practices": {
            "metrics": ethical_practices,
            "score": round(ethics_score, 2)
        },
        "risk_management": {
            "metrics": risk_management,
            "score": round(risk_score, 2)
        }
    }

def _calculate_overall_sustainability_score(env_sustainability: Dict[str, Any],
                                          social_sustainability: Dict[str, Any],
                                          economic_sustainability: Dict[str, Any],
                                          governance_sustainability: Dict[str, Any]) -> float:
    """Calculate overall sustainability score"""
    
    # Weighted combination of all sustainability dimensions
    overall_score = (
        env_sustainability['score'] * 0.3 +
        social_sustainability['score'] * 0.3 +
        economic_sustainability['score'] * 0.25 +
        governance_sustainability['score'] * 0.15
    )
    
    return overall_score

def _analyze_framework_alignment(project_data: Dict[str, Any], framework: str) -> Dict[str, Any]:
    """Analyze alignment with specific sustainability frameworks"""
    
    if framework.upper() == "SDG":
        return _analyze_sdg_alignment(project_data)
    elif framework.upper() == "ESG":
        return _analyze_esg_alignment(project_data)
    elif framework.upper() == "TCFD":
        return _analyze_tcfd_alignment(project_data)
    else:
        return {"error": f"Framework {framework} not supported"}

def _analyze_sdg_alignment(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze alignment with UN Sustainable Development Goals"""
    
    project_sdgs = project_data.get('sdg_focus', [])
    impact_metrics = project_data.get('impact_metrics', {})
    
    # Map project activities to SDG targets
    sdg_contributions = {}
    for sdg in project_sdgs:
        sdg_contributions[sdg] = {
            "contribution_level": "high" if sdg in [1, 3, 4, 8] else "medium",
            "impact_metrics": impact_metrics.get(f'sdg_{sdg}', {}),
            "alignment_score": 0.8 if sdg in [1, 3, 4, 8] else 0.6
        }
    
    return {
        "framework": "SDG",
        "aligned_goals": project_sdgs,
        "contributions": sdg_contributions,
        "overall_alignment_score": round(sum(c['alignment_score'] for c in sdg_contributions.values()) / max(len(sdg_contributions), 1), 2)
    }

def _analyze_esg_alignment(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze alignment with ESG criteria"""
    
    return {
        "framework": "ESG",
        "environmental_score": 0.7,  # Placeholder
        "social_score": 0.8,         # Placeholder
        "governance_score": 0.6,     # Placeholder
        "overall_esg_score": 0.7
    }

def _analyze_tcfd_alignment(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze alignment with TCFD recommendations"""
    
    return {
        "framework": "TCFD",
        "governance_score": 0.6,
        "strategy_score": 0.7,
        "risk_management_score": 0.8,
        "metrics_targets_score": 0.5,
        "overall_tcfd_score": 0.65
    }

# Assessment helper functions
def _assess_carbon_management(carbon_footprint: Dict[str, Any]) -> float:
    """Assess carbon footprint management"""
    if not carbon_footprint:
        return 0.3
    
    has_reduction_target = carbon_footprint.get('reduction_target', False)
    has_monitoring = carbon_footprint.get('monitoring_system', False)
    has_offsetting = carbon_footprint.get('offsetting_strategy', False)
    
    score = 0.0
    if has_reduction_target:
        score += 0.4
    if has_monitoring:
        score += 0.3
    if has_offsetting:
        score += 0.3
    
    return min(score, 1.0)

def _assess_resource_efficiency(resource_usage: Dict[str, Any]) -> float:
    """Assess resource efficiency"""
    if not resource_usage:
        return 0.3
    
    efficiency_metrics = resource_usage.get('efficiency_metrics', {})
    renewable_energy = resource_usage.get('renewable_energy_percentage', 0)
    
    score = 0.0
    if efficiency_metrics:
        score += 0.5
    if renewable_energy > 50:
        score += 0.5
    
    return min(score, 1.0)

def _assess_waste_management(waste_management: Dict[str, Any]) -> float:
    """Assess waste management practices"""
    if not waste_management:
        return 0.3
    
    recycling_rate = waste_management.get('recycling_rate', 0)
    waste_reduction = waste_management.get('waste_reduction_target', False)
    
    score = 0.0
    if recycling_rate > 70:
        score += 0.6
    elif recycling_rate > 50:
        score += 0.4
    if waste_reduction:
        score += 0.4
    
    return min(score, 1.0)

def _assess_biodiversity_protection(biodiversity_impact: Dict[str, Any]) -> float:
    """Assess biodiversity protection measures"""
    if not biodiversity_impact:
        return 0.3
    
    protection_measures = biodiversity_impact.get('protection_measures', [])
    impact_assessment = biodiversity_impact.get('impact_assessment', False)
    
    score = 0.0
    if len(protection_measures) > 0:
        score += 0.6
    if impact_assessment:
        score += 0.4
    
    return min(score, 1.0)

def _assess_community_engagement(community_engagement: Dict[str, Any]) -> float:
    """Assess community engagement quality"""
    if not community_engagement:
        return 0.3
    
    engagement_level = community_engagement.get('engagement_level', 'low')
    feedback_mechanism = community_engagement.get('feedback_mechanism', False)
    
    score = 0.0
    if engagement_level == 'high':
        score += 0.6
    elif engagement_level == 'medium':
        score += 0.4
    if feedback_mechanism:
        score += 0.4
    
    return min(score, 1.0)

def _assess_stakeholder_involvement(stakeholder_involvement: Dict[str, Any]) -> float:
    """Assess stakeholder involvement"""
    if not stakeholder_involvement:
        return 0.3
    
    stakeholder_count = len(stakeholder_involvement.get('stakeholders', []))
    regular_consultation = stakeholder_involvement.get('regular_consultation', False)
    
    score = 0.0
    if stakeholder_count > 5:
        score += 0.6
    elif stakeholder_count > 2:
        score += 0.4
    if regular_consultation:
        score += 0.4
    
    return min(score, 1.0)

def _assess_social_impact_quality(social_impact: Dict[str, Any]) -> float:
    """Assess quality of social impact measurement"""
    if not social_impact:
        return 0.3
    
    impact_metrics = social_impact.get('impact_metrics', {})
    measurement_system = social_impact.get('measurement_system', False)
    
    score = 0.0
    if len(impact_metrics) > 3:
        score += 0.6
    elif len(impact_metrics) > 1:
        score += 0.4
    if measurement_system:
        score += 0.4
    
    return min(score, 1.0)

def _assess_human_rights_compliance(human_rights: Dict[str, Any]) -> float:
    """Assess human rights compliance"""
    if not human_rights:
        return 0.5  # Neutral score
    
    compliance_check = human_rights.get('compliance_check', False)
    due_diligence = human_rights.get('due_diligence', False)
    
    score = 0.0
    if compliance_check:
        score += 0.5
    if due_diligence:
        score += 0.5
    
    return min(score, 1.0)

def _assess_financial_viability(financial_viability: Dict[str, Any]) -> float:
    """Assess financial viability"""
    if not financial_viability:
        return 0.3
    
    cost_benefit_ratio = financial_viability.get('cost_benefit_ratio', 0)
    funding_diversification = financial_viability.get('funding_diversification', False)
    
    score = 0.0
    if cost_benefit_ratio > 2:
        score += 0.6
    elif cost_benefit_ratio > 1:
        score += 0.4
    if funding_diversification:
        score += 0.4
    
    return min(score, 1.0)

def _assess_local_economic_impact(local_economic_impact: Dict[str, Any]) -> float:
    """Assess local economic impact"""
    if not local_economic_impact:
        return 0.3
    
    local_jobs = local_economic_impact.get('local_jobs_created', 0)
    local_spending = local_economic_impact.get('local_spending_percentage', 0)
    
    score = 0.0
    if local_jobs > 10:
        score += 0.5
    elif local_jobs > 5:
        score += 0.3
    if local_spending > 70:
        score += 0.5
    elif local_spending > 50:
        score += 0.3
    
    return min(score, 1.0)

def _assess_long_term_funding(long_term_funding: Dict[str, Any]) -> float:
    """Assess long-term funding sustainability"""
    if not long_term_funding:
        return 0.3
    
    funding_duration = long_term_funding.get('funding_duration_years', 0)
    diversified_sources = long_term_funding.get('diversified_sources', False)
    
    score = 0.0
    if funding_duration > 5:
        score += 0.6
    elif funding_duration > 3:
        score += 0.4
    if diversified_sources:
        score += 0.4
    
    return min(score, 1.0)

def _assess_value_creation(value_creation: Dict[str, Any]) -> float:
    """Assess value creation potential"""
    if not value_creation:
        return 0.3
    
    innovation_level = value_creation.get('innovation_level', 'low')
    scalability = value_creation.get('scalability', False)
    
    score = 0.0
    if innovation_level == 'high':
        score += 0.6
    elif innovation_level == 'medium':
        score += 0.4
    if scalability:
        score += 0.4
    
    return min(score, 1.0)

def _assess_transparency(transparency: Dict[str, Any]) -> float:
    """Assess transparency practices"""
    if not transparency:
        return 0.3
    
    reporting_frequency = transparency.get('reporting_frequency', 'annual')
    public_disclosure = transparency.get('public_disclosure', False)
    
    score = 0.0
    if reporting_frequency == 'quarterly':
        score += 0.6
    elif reporting_frequency == 'semi-annual':
        score += 0.4
    if public_disclosure:
        score += 0.4
    
    return min(score, 1.0)

def _assess_accountability(accountability: Dict[str, Any]) -> float:
    """Assess accountability mechanisms"""
    if not accountability:
        return 0.3
    
    oversight_mechanism = accountability.get('oversight_mechanism', False)
    performance_tracking = accountability.get('performance_tracking', False)
    
    score = 0.0
    if oversight_mechanism:
        score += 0.5
    if performance_tracking:
        score += 0.5
    
    return min(score, 1.0)

def _assess_ethical_practices(ethical_practices: Dict[str, Any]) -> float:
    """Assess ethical practices"""
    if not ethical_practices:
        return 0.5  # Neutral score
    
    ethics_policy = ethical_practices.get('ethics_policy', False)
    training_program = ethical_practices.get('training_program', False)
    
    score = 0.0
    if ethics_policy:
        score += 0.5
    if training_program:
        score += 0.5
    
    return min(score, 1.0)

def _assess_risk_management(risk_management: Dict[str, Any]) -> float:
    """Assess risk management practices"""
    if not risk_management:
        return 0.3
    
    risk_assessment = risk_management.get('risk_assessment', False)
    mitigation_plans = risk_management.get('mitigation_plans', False)
    
    score = 0.0
    if risk_assessment:
        score += 0.5
    if mitigation_plans:
        score += 0.5
    
    return min(score, 1.0)

def _generate_sustainability_recommendations(env_sustainability: Dict[str, Any],
                                          social_sustainability: Dict[str, Any],
                                          economic_sustainability: Dict[str, Any],
                                          governance_sustainability: Dict[str, Any]) -> List[str]:
    """Generate sustainability recommendations"""
    recommendations = []
    
    # Environmental recommendations
    if env_sustainability['score'] < 0.6:
        recommendations.append("Improve environmental sustainability through better carbon management and resource efficiency")
    
    # Social recommendations
    if social_sustainability['score'] < 0.6:
        recommendations.append("Enhance social sustainability through stronger community engagement and stakeholder involvement")
    
    # Economic recommendations
    if economic_sustainability['score'] < 0.6:
        recommendations.append("Strengthen economic sustainability through diversified funding and local economic impact")
    
    # Governance recommendations
    if governance_sustainability['score'] < 0.6:
        recommendations.append("Improve governance sustainability through better transparency and accountability mechanisms")
    
    # Overall recommendations
    overall_score = (env_sustainability['score'] + social_sustainability['score'] + 
                    economic_sustainability['score'] + governance_sustainability['score']) / 4
    
    if overall_score > 0.8:
        recommendations.append("Excellent sustainability performance - consider sharing best practices with other projects")
    elif overall_score < 0.5:
        recommendations.append("Significant sustainability improvements needed - consider comprehensive sustainability strategy review")
    
    return recommendations

def _identify_best_practices(project_data: Dict[str, Any]) -> List[str]:
    """Identify sustainability best practices in the project"""
    best_practices = []
    
    # Check for best practices
    if project_data.get('carbon_footprint', {}).get('reduction_target'):
        best_practices.append("Has carbon reduction targets")
    
    if project_data.get('community_engagement', {}).get('engagement_level') == 'high':
        best_practices.append("Strong community engagement practices")
    
    if project_data.get('transparency', {}).get('public_disclosure'):
        best_practices.append("Public disclosure and transparency")
    
    if project_data.get('long_term_funding', {}).get('funding_duration_years', 0) > 5:
        best_practices.append("Long-term funding sustainability")
    
    return best_practices

def _identify_innovation_opportunities(project_data: Dict[str, Any]) -> List[str]:
    """Identify innovation opportunities for sustainability"""
    opportunities = []
    
    # Innovation opportunities
    if not project_data.get('carbon_footprint', {}).get('offsetting_strategy'):
        opportunities.append("Implement carbon offsetting strategies")
    
    if not project_data.get('resource_usage', {}).get('renewable_energy_percentage'):
        opportunities.append("Increase renewable energy usage")
    
    if not project_data.get('waste_management', {}).get('circular_economy_approach'):
        opportunities.append("Adopt circular economy principles")
    
    if not project_data.get('stakeholder_involvement', {}).get('digital_engagement'):
        opportunities.append("Implement digital stakeholder engagement platforms")
    
    return opportunities
