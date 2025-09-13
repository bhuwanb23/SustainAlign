"""
Budget Optimizer Tool for IBM WatsonX Orchestrate
Optimizes budget allocation across multiple projects
"""

import logging
from typing import Dict, Any, List
import json
from ibm_watsonx_orchestrate.agent_builder.tools import tool

logger = logging.getLogger(__name__)

@tool
def budget_optimizer_function(available_budget: float, 
                            project_list: List[Dict[str, Any]], 
                            constraints: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Optimize budget allocation across multiple projects
    
    Args:
        available_budget: Total available budget for allocation
        project_list: List of candidate projects with their details
        constraints: Budget constraints and preferences
    
    Returns:
        Optimized budget allocation with recommendations
    """
    try:
        logger.info(f"Optimizing budget allocation for {len(project_list)} projects")
        
        if not project_list:
            return {
                "error": "No projects provided for optimization",
                "success": False
            }
        
        # Set default constraints if not provided
        if constraints is None:
            constraints = {}
        
        # Analyze projects and calculate optimization scores
        analyzed_projects = _analyze_projects(project_list, constraints)
        
        # Apply optimization algorithm
        optimized_allocation = _optimize_allocation(available_budget, analyzed_projects, constraints)
        
        # Generate recommendations
        recommendations = _generate_budget_recommendations(optimized_allocation, available_budget)
        
        return {
            "available_budget": available_budget,
            "total_projects_analyzed": len(project_list),
            "optimized_allocation": optimized_allocation,
            "budget_utilization": round(sum(p['allocated_budget'] for p in optimized_allocation['selected_projects']), 2),
            "utilization_percentage": round((sum(p['allocated_budget'] for p in optimized_allocation['selected_projects']) / available_budget) * 100, 2),
            "recommendations": recommendations,
            "success": True
        }
        
    except Exception as e:
        logger.error(f"Error in budget optimization: {str(e)}")
        return {
            "error": f"Budget optimization failed: {str(e)}",
            "success": False
        }

def _analyze_projects(project_list: List[Dict[str, Any]], constraints: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Analyze projects and calculate optimization scores"""
    
    analyzed_projects = []
    
    for project in project_list:
        # Calculate various optimization metrics
        roi_score = _calculate_roi_score(project)
        impact_score = _calculate_impact_score(project)
        risk_score = _calculate_risk_score(project)
        alignment_score = _calculate_alignment_score(project, constraints)
        feasibility_score = _calculate_feasibility_score(project)
        
        # Calculate overall optimization score
        overall_score = _calculate_overall_optimization_score(
            roi_score, impact_score, risk_score, alignment_score, feasibility_score
        )
        
        # Calculate cost-effectiveness ratio
        cost_effectiveness = overall_score / max(project.get('budget', 1), 1)
        
        analyzed_project = {
            **project,
            "roi_score": round(roi_score, 2),
            "impact_score": round(impact_score, 2),
            "risk_score": round(risk_score, 2),
            "alignment_score": round(alignment_score, 2),
            "feasibility_score": round(feasibility_score, 2),
            "overall_score": round(overall_score, 2),
            "cost_effectiveness": round(cost_effectiveness, 4),
            "allocated_budget": 0  # Will be set during optimization
        }
        
        analyzed_projects.append(analyzed_project)
    
    return analyzed_projects

def _calculate_roi_score(project: Dict[str, Any]) -> float:
    """Calculate ROI score for a project"""
    
    budget = project.get('budget', 0)
    expected_return = project.get('expected_return', 0)
    timeline = project.get('timeline_months', 12)
    
    if budget <= 0:
        return 0.0
    
    # Calculate annualized ROI
    annualized_roi = (expected_return / budget) * (12 / max(timeline, 1))
    
    # Normalize to 0-1 scale
    if annualized_roi <= 0:
        return 0.0
    elif annualized_roi <= 0.1:  # 10% ROI
        return 0.3
    elif annualized_roi <= 0.2:  # 20% ROI
        return 0.6
    elif annualized_roi <= 0.5:  # 50% ROI
        return 0.8
    else:
        return 1.0

def _calculate_impact_score(project: Dict[str, Any]) -> float:
    """Calculate impact score for a project"""
    
    beneficiaries = project.get('expected_beneficiaries', 0)
    sdg_alignment = project.get('sdg_alignment_score', 0.5)
    sustainability_score = project.get('sustainability_score', 0.5)
    
    # Normalize beneficiary count
    beneficiary_score = min(beneficiaries / 10000, 1.0)  # Normalize to 10k beneficiaries
    
    # Calculate weighted impact score
    impact_score = (
        beneficiary_score * 0.4 +
        sdg_alignment * 0.3 +
        sustainability_score * 0.3
    )
    
    return impact_score

def _calculate_risk_score(project: Dict[str, Any]) -> float:
    """Calculate risk score for a project (lower is better)"""
    
    risk_level = project.get('risk_level', 'medium')
    complexity = project.get('complexity_level', 'medium')
    timeline = project.get('timeline_months', 12)
    
    # Risk level scoring (lower is better)
    risk_scores = {
        'low': 0.2,
        'medium': 0.5,
        'high': 0.8,
        'very_high': 1.0
    }
    risk_score = risk_scores.get(risk_level.lower(), 0.5)
    
    # Complexity scoring (lower is better)
    complexity_scores = {
        'low': 0.2,
        'medium': 0.5,
        'high': 0.8,
        'very_high': 1.0
    }
    complexity_score = complexity_scores.get(complexity.lower(), 0.5)
    
    # Timeline scoring (shorter is better for risk)
    timeline_score = min(timeline / 24, 1.0)  # Normalize to 24 months
    
    # Calculate overall risk score (inverted for optimization)
    overall_risk = (risk_score + complexity_score + timeline_score) / 3
    return 1.0 - overall_risk  # Invert so higher is better

def _calculate_alignment_score(project: Dict[str, Any], constraints: Dict[str, Any]) -> float:
    """Calculate alignment score with company objectives"""
    
    company_sdgs = constraints.get('company_sdg_priorities', [])
    company_geographic_focus = constraints.get('geographic_focus', [])
    company_budget_preferences = constraints.get('budget_preferences', {})
    
    project_sdgs = project.get('sdg_focus', [])
    project_location = project.get('location', '')
    project_budget = project.get('budget', 0)
    
    # SDG alignment
    sdg_alignment = 0.0
    if company_sdgs and project_sdgs:
        intersection = set(company_sdgs) & set(project_sdgs)
        union = set(company_sdgs) | set(project_sdgs)
        if union:
            sdg_alignment = len(intersection) / len(union)
    
    # Geographic alignment
    geographic_alignment = 0.0
    if company_geographic_focus and project_location:
        project_location_lower = project_location.lower()
        for area in company_geographic_focus:
            if area.lower() in project_location_lower:
                geographic_alignment = 1.0
                break
    
    # Budget alignment
    budget_alignment = 0.5  # Default neutral
    if company_budget_preferences:
        min_budget = company_budget_preferences.get('min_budget', 0)
        max_budget = company_budget_preferences.get('max_budget', float('inf'))
        
        if min_budget <= project_budget <= max_budget:
            budget_alignment = 1.0
        elif project_budget < min_budget:
            budget_alignment = 0.3
        else:
            budget_alignment = 0.1
    
    # Calculate overall alignment score
    alignment_score = (
        sdg_alignment * 0.4 +
        geographic_alignment * 0.3 +
        budget_alignment * 0.3
    )
    
    return alignment_score

def _calculate_feasibility_score(project: Dict[str, Any]) -> float:
    """Calculate feasibility score for a project"""
    
    timeline = project.get('timeline_months', 12)
    team_availability = project.get('team_availability', 0.5)
    resource_availability = project.get('resource_availability', 0.5)
    technology_readiness = project.get('technology_readiness', 0.5)
    
    # Timeline feasibility (shorter is better)
    timeline_score = max(0, 1.0 - (timeline / 36))  # Normalize to 36 months
    
    # Calculate overall feasibility score
    feasibility_score = (
        timeline_score * 0.3 +
        team_availability * 0.3 +
        resource_availability * 0.2 +
        technology_readiness * 0.2
    )
    
    return feasibility_score

def _calculate_overall_optimization_score(roi_score: float, impact_score: float, 
                                        risk_score: float, alignment_score: float, 
                                        feasibility_score: float) -> float:
    """Calculate overall optimization score"""
    
    # Weighted combination of all factors
    overall_score = (
        roi_score * 0.25 +
        impact_score * 0.25 +
        risk_score * 0.2 +
        alignment_score * 0.15 +
        feasibility_score * 0.15
    )
    
    return overall_score

def _optimize_allocation(available_budget: float, analyzed_projects: List[Dict[str, Any]], 
                        constraints: Dict[str, Any]) -> Dict[str, Any]:
    """Apply optimization algorithm to allocate budget"""
    
    # Sort projects by cost-effectiveness (descending)
    sorted_projects = sorted(analyzed_projects, key=lambda x: x['cost_effectiveness'], reverse=True)
    
    selected_projects = []
    remaining_budget = available_budget
    total_impact = 0
    total_roi = 0
    
    # Apply constraints
    min_projects = constraints.get('min_projects', 1)
    max_projects = constraints.get('max_projects', len(sorted_projects))
    min_budget_per_project = constraints.get('min_budget_per_project', 0)
    max_budget_per_project = constraints.get('max_budget_per_project', float('inf'))
    
    # Greedy selection algorithm
    for project in sorted_projects:
        project_budget = project.get('budget', 0)
        
        # Check if project meets constraints
        if (project_budget <= remaining_budget and 
            project_budget >= min_budget_per_project and 
            project_budget <= max_budget_per_project and
            len(selected_projects) < max_projects):
            
            # Allocate budget to project
            project['allocated_budget'] = project_budget
            selected_projects.append(project)
            remaining_budget -= project_budget
            total_impact += project['impact_score']
            total_roi += project['roi_score']
    
    # Ensure minimum number of projects if possible
    if len(selected_projects) < min_projects and remaining_budget > 0:
        # Try to add more projects with remaining budget
        for project in sorted_projects:
            if project not in selected_projects:
                project_budget = project.get('budget', 0)
                if project_budget <= remaining_budget:
                    project['allocated_budget'] = project_budget
                    selected_projects.append(project)
                    remaining_budget -= project_budget
                    total_impact += project['impact_score']
                    total_roi += project['roi_score']
                    break
    
    # Calculate portfolio metrics
    portfolio_metrics = {
        "total_projects": len(selected_projects),
        "total_allocated_budget": sum(p['allocated_budget'] for p in selected_projects),
        "remaining_budget": remaining_budget,
        "average_impact_score": total_impact / max(len(selected_projects), 1),
        "average_roi_score": total_roi / max(len(selected_projects), 1),
        "portfolio_diversity": _calculate_portfolio_diversity(selected_projects)
    }
    
    return {
        "selected_projects": selected_projects,
        "portfolio_metrics": portfolio_metrics,
        "optimization_algorithm": "greedy_cost_effectiveness"
    }

def _calculate_portfolio_diversity(selected_projects: List[Dict[str, Any]]) -> float:
    """Calculate portfolio diversity score"""
    
    if len(selected_projects) <= 1:
        return 0.0
    
    # Calculate diversity based on different project attributes
    locations = set(p.get('location', '') for p in selected_projects)
    sdg_focus = set()
    for project in selected_projects:
        sdg_focus.update(project.get('sdg_focus', []))
    
    # Location diversity
    location_diversity = len(locations) / len(selected_projects)
    
    # SDG diversity
    sdg_diversity = len(sdg_focus) / 17  # 17 SDGs total
    
    # Overall diversity score
    diversity_score = (location_diversity + sdg_diversity) / 2
    return round(diversity_score, 2)

def _generate_budget_recommendations(optimized_allocation: Dict[str, Any], 
                                   available_budget: float) -> List[str]:
    """Generate budget optimization recommendations"""
    
    recommendations = []
    selected_projects = optimized_allocation['selected_projects']
    portfolio_metrics = optimized_allocation['portfolio_metrics']
    
    # Budget utilization recommendations
    utilization_percentage = (portfolio_metrics['total_allocated_budget'] / available_budget) * 100
    
    if utilization_percentage < 80:
        recommendations.append(f"Budget utilization is {utilization_percentage:.1f}% - consider adding more projects or increasing project budgets")
    elif utilization_percentage > 95:
        recommendations.append(f"Budget utilization is {utilization_percentage:.1f}% - excellent budget optimization")
    else:
        recommendations.append(f"Budget utilization is {utilization_percentage:.1f}% - good budget allocation")
    
    # Project selection recommendations
    if portfolio_metrics['total_projects'] < 3:
        recommendations.append("Consider diversifying portfolio with more projects to reduce risk")
    
    if portfolio_metrics['portfolio_diversity'] < 0.5:
        recommendations.append("Portfolio diversity could be improved - consider projects in different locations or SDG focus areas")
    
    # Impact and ROI recommendations
    if portfolio_metrics['average_impact_score'] > 0.7:
        recommendations.append("Excellent impact potential across selected projects")
    elif portfolio_metrics['average_impact_score'] < 0.4:
        recommendations.append("Consider projects with higher impact potential")
    
    if portfolio_metrics['average_roi_score'] > 0.7:
        recommendations.append("Strong ROI potential across selected projects")
    elif portfolio_metrics['average_roi_score'] < 0.4:
        recommendations.append("Consider projects with better ROI potential")
    
    # Remaining budget recommendations
    if portfolio_metrics['remaining_budget'] > available_budget * 0.1:
        recommendations.append(f"Significant remaining budget (${portfolio_metrics['remaining_budget']:.2f}) - consider additional projects or budget reallocation")
    
    return recommendations
