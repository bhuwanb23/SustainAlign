"""
Project Analyzer Tool for IBM WatsonX Orchestrate
Analyzes CSR projects for alignment with company goals
"""

import logging
from typing import Dict, Any, List
import json
from ibm_watsonx_orchestrate.agent_builder.tools import tool

logger = logging.getLogger(__name__)

@tool
def project_analyzer_function(project_data: Dict[str, Any], 
                            company_profile: Dict[str, Any], 
                            analysis_type: str = "alignment") -> Dict[str, Any]:
    """
    Analyze CSR project for alignment with company objectives
    
    Args:
        project_data: Project information including objectives, budget, timeline
        company_profile: Company CSR profile including focus areas, budget, priorities
        analysis_type: Type of analysis (alignment, feasibility, impact)
    
    Returns:
        Analysis results with scores and recommendations
    """
    try:
        logger.info(f"Analyzing project: {project_data.get('name', 'Unknown')}")
        
        if analysis_type == "alignment":
            return _analyze_alignment(project_data, company_profile)
        elif analysis_type == "feasibility":
            return _analyze_feasibility(project_data, company_profile)
        elif analysis_type == "impact":
            return _analyze_impact(project_data, company_profile)
        else:
            return {
                "error": f"Unknown analysis type: {analysis_type}",
                "supported_types": ["alignment", "feasibility", "impact"]
            }
            
    except Exception as e:
        logger.error(f"Error in project analysis: {str(e)}")
        return {
            "error": f"Analysis failed: {str(e)}",
            "success": False
        }

def _analyze_alignment(project_data: Dict[str, Any], 
                      company_profile: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze project alignment with company objectives"""
    
    # Extract key information
    project_sdgs = project_data.get('sdg_focus', [])
    company_sdgs = company_profile.get('sdg_priorities', [])
    
    project_location = project_data.get('location', '')
    company_focus_areas = company_profile.get('geographic_focus', [])
    
    project_budget = project_data.get('budget', 0)
    company_budget = company_profile.get('available_budget', 0)
    
    # Calculate alignment scores
    sdg_alignment = _calculate_sdg_alignment(project_sdgs, company_sdgs)
    geographic_alignment = _calculate_geographic_alignment(project_location, company_focus_areas)
    budget_alignment = _calculate_budget_alignment(project_budget, company_budget)
    
    # Overall alignment score
    overall_score = (sdg_alignment * 0.4 + geographic_alignment * 0.3 + budget_alignment * 0.3)
    
    return {
        "analysis_type": "alignment",
        "overall_score": round(overall_score, 2),
        "detailed_scores": {
            "sdg_alignment": round(sdg_alignment, 2),
            "geographic_alignment": round(geographic_alignment, 2),
            "budget_alignment": round(budget_alignment, 2)
        },
        "recommendations": _generate_alignment_recommendations(
            sdg_alignment, geographic_alignment, budget_alignment
        ),
        "success": True
    }

def _analyze_feasibility(project_data: Dict[str, Any], 
                        company_profile: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze project feasibility"""
    
    timeline = project_data.get('timeline_months', 12)
    complexity = project_data.get('complexity_level', 'medium')
    resources_required = project_data.get('resources_required', {})
    
    # Feasibility factors
    timeline_score = min(1.0, 24 / max(timeline, 1))  # Shorter timelines are better
    complexity_score = {"low": 1.0, "medium": 0.7, "high": 0.4}.get(complexity, 0.5)
    resource_score = _assess_resource_availability(resources_required, company_profile)
    
    overall_feasibility = (timeline_score * 0.3 + complexity_score * 0.4 + resource_score * 0.3)
    
    return {
        "analysis_type": "feasibility",
        "overall_score": round(overall_feasibility, 2),
        "detailed_scores": {
            "timeline_feasibility": round(timeline_score, 2),
            "complexity_feasibility": round(complexity_score, 2),
            "resource_feasibility": round(resource_score, 2)
        },
        "recommendations": _generate_feasibility_recommendations(
            timeline_score, complexity_score, resource_score
        ),
        "success": True
    }

def _analyze_impact(project_data: Dict[str, Any], 
                   company_profile: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze project impact potential"""
    
    expected_beneficiaries = project_data.get('expected_beneficiaries', 0)
    impact_metrics = project_data.get('impact_metrics', {})
    sustainability_score = project_data.get('sustainability_score', 0.5)
    
    # Impact factors
    scale_score = min(1.0, expected_beneficiaries / 10000)  # Normalize to 10k beneficiaries
    metrics_score = _assess_impact_metrics(impact_metrics)
    sustainability_score = sustainability_score
    
    overall_impact = (scale_score * 0.4 + metrics_score * 0.4 + sustainability_score * 0.2)
    
    return {
        "analysis_type": "impact",
        "overall_score": round(overall_impact, 2),
        "detailed_scores": {
            "scale_impact": round(scale_score, 2),
            "metrics_impact": round(metrics_score, 2),
            "sustainability_impact": round(sustainability_score, 2)
        },
        "recommendations": _generate_impact_recommendations(
            scale_score, metrics_score, sustainability_score
        ),
        "success": True
    }

def _calculate_sdg_alignment(project_sdgs: List[int], company_sdgs: List[int]) -> float:
    """Calculate SDG alignment score"""
    if not project_sdgs or not company_sdgs:
        return 0.0
    
    intersection = set(project_sdgs) & set(company_sdgs)
    union = set(project_sdgs) | set(company_sdgs)
    
    if not union:
        return 0.0
    
    return len(intersection) / len(union)

def _calculate_geographic_alignment(project_location: str, company_focus_areas: List[str]) -> float:
    """Calculate geographic alignment score"""
    if not project_location or not company_focus_areas:
        return 0.5  # Neutral score if no data
    
    project_location_lower = project_location.lower()
    for area in company_focus_areas:
        if area.lower() in project_location_lower or project_location_lower in area.lower():
            return 1.0
    
    return 0.0

def _calculate_budget_alignment(project_budget: float, company_budget: float) -> float:
    """Calculate budget alignment score"""
    if company_budget <= 0:
        return 0.5  # Neutral if no budget info
    
    ratio = project_budget / company_budget
    if ratio <= 0.1:
        return 1.0  # Very small project
    elif ratio <= 0.3:
        return 0.8  # Small project
    elif ratio <= 0.7:
        return 0.6  # Medium project
    elif ratio <= 1.0:
        return 0.4  # Large project
    else:
        return 0.0  # Too expensive

def _assess_resource_availability(resources_required: Dict[str, Any], 
                                company_profile: Dict[str, Any]) -> float:
    """Assess availability of required resources"""
    # Simplified resource assessment
    company_capabilities = company_profile.get('capabilities', [])
    required_skills = resources_required.get('skills', [])
    
    if not required_skills:
        return 1.0
    
    available_skills = sum(1 for skill in required_skills if skill in company_capabilities)
    return available_skills / len(required_skills)

def _assess_impact_metrics(impact_metrics: Dict[str, Any]) -> float:
    """Assess quality of impact metrics"""
    if not impact_metrics:
        return 0.3
    
    # Count measurable metrics
    measurable_metrics = 0
    total_metrics = len(impact_metrics)
    
    for metric, value in impact_metrics.items():
        if isinstance(value, (int, float)) and value > 0:
            measurable_metrics += 1
    
    return measurable_metrics / max(total_metrics, 1)

def _generate_alignment_recommendations(sdg_score: float, geo_score: float, budget_score: float) -> List[str]:
    """Generate alignment recommendations"""
    recommendations = []
    
    if sdg_score < 0.5:
        recommendations.append("Consider projects with better SDG alignment to company priorities")
    
    if geo_score < 0.5:
        recommendations.append("Look for projects in company's geographic focus areas")
    
    if budget_score < 0.5:
        recommendations.append("Consider budget optimization or project scaling")
    
    if all(score >= 0.7 for score in [sdg_score, geo_score, budget_score]):
        recommendations.append("Excellent alignment - this project is highly recommended")
    
    return recommendations

def _generate_feasibility_recommendations(timeline_score: float, complexity_score: float, resource_score: float) -> List[str]:
    """Generate feasibility recommendations"""
    recommendations = []
    
    if timeline_score < 0.5:
        recommendations.append("Consider extending project timeline or breaking into phases")
    
    if complexity_score < 0.5:
        recommendations.append("Project complexity is high - ensure adequate planning and resources")
    
    if resource_score < 0.5:
        recommendations.append("Additional resources or partnerships may be needed")
    
    if all(score >= 0.7 for score in [timeline_score, complexity_score, resource_score]):
        recommendations.append("Project is highly feasible with current resources")
    
    return recommendations

def _generate_impact_recommendations(scale_score: float, metrics_score: float, sustainability_score: float) -> List[str]:
    """Generate impact recommendations"""
    recommendations = []
    
    if scale_score < 0.5:
        recommendations.append("Consider scaling up the project for greater impact")
    
    if metrics_score < 0.5:
        recommendations.append("Improve impact measurement and tracking systems")
    
    if sustainability_score < 0.5:
        recommendations.append("Focus on long-term sustainability and capacity building")
    
    if all(score >= 0.7 for score in [scale_score, metrics_score, sustainability_score]):
        recommendations.append("Project has excellent impact potential")
    
    return recommendations
