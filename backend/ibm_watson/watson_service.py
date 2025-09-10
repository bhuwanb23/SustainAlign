"""
IBM WatsonX Orchestrate Service Integration
Main service for integrating Watson agents with SustainAlign backend
"""

import logging
from typing import Dict, Any, List, Optional
import json
from datetime import datetime

from .config import watson_config
from .agent_manager import agent_manager
from .tools import (
    project_analyzer_function,
    impact_calculator_function,
    risk_assessor_function,
    budget_optimizer_function
)

logger = logging.getLogger(__name__)

class WatsonService:
    """Main service for IBM WatsonX Orchestrate integration"""
    
    def __init__(self):
        self.config = watson_config
        self.agent_manager = agent_manager
        self.tools = {
            'project_analyzer': project_analyzer_function,
            'impact_calculator': impact_calculator_function,
            'risk_assessor': risk_assessor_function,
            'budget_optimizer': budget_optimizer_function
        }
        self.initialized = False
    
    def initialize(self) -> bool:
        """Initialize the Watson service"""
        try:
            if not self.config.is_configured():
                logger.warning("Watson configuration is incomplete - using mock mode")
                return False
            
            # Set up environment
            if not self.agent_manager.setup_environment():
                logger.error("Failed to setup Watson environment")
                return False
            
            # Deploy tools
            for tool_type in self.tools.keys():
                if not self.agent_manager.deploy_tool(tool_type):
                    logger.warning(f"Failed to deploy tool: {tool_type}")
            
            # Deploy agents
            agent_types = ['csr_matching_agent', 'project_evaluation_agent', 
                          'decision_support_agent', 'impact_assessment_agent']
            
            for agent_type in agent_types:
                if not self.agent_manager.deploy_agent(agent_type):
                    logger.warning(f"Failed to deploy agent: {agent_type}")
            
            self.initialized = True
            logger.info("Watson service initialized successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error initializing Watson service: {str(e)}")
            return False
    
    def analyze_project_alignment(self, project_data: Dict[str, Any], 
                                company_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze project alignment with company objectives using CSR Matching Agent"""
        try:
            logger.info("Analyzing project alignment with Watson CSR Matching Agent")
            
            # Use project analyzer tool
            analysis_result = self.tools['project_analyzer'](
                project_data=project_data,
                company_profile=company_profile,
                analysis_type="alignment"
            )
            
            # Enhance with agent insights
            agent_insights = self._generate_agent_insights(
                "csr_matching_agent", 
                "alignment_analysis",
                analysis_result
            )
            
            return {
                "analysis_type": "project_alignment",
                "timestamp": datetime.now().isoformat(),
                "tool_analysis": analysis_result,
                "agent_insights": agent_insights,
                "recommendations": self._generate_alignment_recommendations(analysis_result),
                "success": True
            }
            
        except Exception as e:
            logger.error(f"Error in project alignment analysis: {str(e)}")
            return {
                "error": f"Project alignment analysis failed: {str(e)}",
                "success": False
            }
    
    def evaluate_project_feasibility(self, project_data: Dict[str, Any], 
                                   company_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Evaluate project feasibility using Project Evaluation Agent"""
        try:
            logger.info("Evaluating project feasibility with Watson Project Evaluation Agent")
            
            # Use project analyzer tool for feasibility
            feasibility_analysis = self.tools['project_analyzer'](
                project_data=project_data,
                company_profile=company_profile,
                analysis_type="feasibility"
            )
            
            # Use risk assessor tool
            risk_analysis = self.tools['risk_assessor'](
                project_data=project_data
            )
            
            # Enhance with agent insights
            agent_insights = self._generate_agent_insights(
                "project_evaluation_agent",
                "feasibility_evaluation",
                {"feasibility": feasibility_analysis, "risk": risk_analysis}
            )
            
            return {
                "analysis_type": "project_feasibility",
                "timestamp": datetime.now().isoformat(),
                "feasibility_analysis": feasibility_analysis,
                "risk_analysis": risk_analysis,
                "agent_insights": agent_insights,
                "recommendations": self._generate_feasibility_recommendations(feasibility_analysis, risk_analysis),
                "success": True
            }
            
        except Exception as e:
            logger.error(f"Error in project feasibility evaluation: {str(e)}")
            return {
                "error": f"Project feasibility evaluation failed: {str(e)}",
                "success": False
            }
    
    def assess_project_impact(self, project_data: Dict[str, Any]) -> Dict[str, Any]:
        """Assess project impact using Impact Assessment Agent"""
        try:
            logger.info("Assessing project impact with Watson Impact Assessment Agent")
            
            # Use impact calculator tool
            impact_analysis = self.tools['impact_calculator'](
                project_metrics=project_data.get('impact_metrics', {}),
                baseline_data=project_data.get('baseline_data', {}),
                timeframe=project_data.get('timeframe', '12_months')
            )
            
            # Enhance with agent insights
            agent_insights = self._generate_agent_insights(
                "impact_assessment_agent",
                "impact_assessment",
                impact_analysis
            )
            
            return {
                "analysis_type": "project_impact",
                "timestamp": datetime.now().isoformat(),
                "impact_analysis": impact_analysis,
                "agent_insights": agent_insights,
                "recommendations": self._generate_impact_recommendations(impact_analysis),
                "success": True
            }
            
        except Exception as e:
            logger.error(f"Error in project impact assessment: {str(e)}")
            return {
                "error": f"Project impact assessment failed: {str(e)}",
                "success": False
            }
    
    def optimize_budget_allocation(self, available_budget: float, 
                                 project_list: List[Dict[str, Any]], 
                                 constraints: Dict[str, Any] = None) -> Dict[str, Any]:
        """Optimize budget allocation using Decision Support Agent"""
        try:
            logger.info("Optimizing budget allocation with Watson Decision Support Agent")
            
            # Use budget optimizer tool
            optimization_result = self.tools['budget_optimizer'](
                available_budget=available_budget,
                project_list=project_list,
                constraints=constraints
            )
            
            # Enhance with agent insights
            agent_insights = self._generate_agent_insights(
                "decision_support_agent",
                "budget_optimization",
                optimization_result
            )
            
            return {
                "analysis_type": "budget_optimization",
                "timestamp": datetime.now().isoformat(),
                "optimization_result": optimization_result,
                "agent_insights": agent_insights,
                "recommendations": self._generate_optimization_recommendations(optimization_result),
                "success": True
            }
            
        except Exception as e:
            logger.error(f"Error in budget optimization: {str(e)}")
            return {
                "error": f"Budget optimization failed: {str(e)}",
                "success": False
            }
    
    def get_comprehensive_analysis(self, project_data: Dict[str, Any], 
                                 company_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Get comprehensive analysis using multiple agents"""
        try:
            logger.info("Performing comprehensive project analysis with multiple Watson agents")
            
            # Run all analyses
            alignment_analysis = self.analyze_project_alignment(project_data, company_profile)
            feasibility_analysis = self.evaluate_project_feasibility(project_data, company_profile)
            impact_analysis = self.assess_project_impact(project_data)
            
            # Calculate overall score
            overall_score = self._calculate_overall_score(
                alignment_analysis, feasibility_analysis, impact_analysis
            )
            
            # Generate comprehensive recommendations
            comprehensive_recommendations = self._generate_comprehensive_recommendations(
                alignment_analysis, feasibility_analysis, impact_analysis
            )
            
            return {
                "analysis_type": "comprehensive_analysis",
                "timestamp": datetime.now().isoformat(),
                "overall_score": overall_score,
                "alignment_analysis": alignment_analysis,
                "feasibility_analysis": feasibility_analysis,
                "impact_analysis": impact_analysis,
                "comprehensive_recommendations": comprehensive_recommendations,
                "success": True
            }
            
        except Exception as e:
            logger.error(f"Error in comprehensive analysis: {str(e)}")
            return {
                "error": f"Comprehensive analysis failed: {str(e)}",
                "success": False
            }
    
    def _generate_agent_insights(self, agent_type: str, analysis_type: str, 
                               analysis_data: Dict[str, Any]) -> List[str]:
        """Generate agent-specific insights"""
        insights = []
        
        if agent_type == "csr_matching_agent":
            if analysis_type == "alignment_analysis":
                if analysis_data.get('overall_score', 0) > 0.8:
                    insights.append("Excellent alignment with company objectives - highly recommended for CSR investment")
                elif analysis_data.get('overall_score', 0) > 0.6:
                    insights.append("Good alignment with company objectives - suitable for CSR investment with minor adjustments")
                else:
                    insights.append("Limited alignment with company objectives - consider alternative projects or strategic adjustments")
        
        elif agent_type == "project_evaluation_agent":
            if analysis_type == "feasibility_evaluation":
                feasibility_score = analysis_data.get('feasibility', {}).get('overall_score', 0)
                risk_score = analysis_data.get('risk', {}).get('overall_risk_score', 1)
                
                if feasibility_score > 0.7 and risk_score < 0.4:
                    insights.append("Project is highly feasible with low risk - excellent candidate for implementation")
                elif feasibility_score > 0.5 and risk_score < 0.6:
                    insights.append("Project is moderately feasible with manageable risk - suitable for implementation with proper planning")
                else:
                    insights.append("Project feasibility is limited or risk is high - requires careful evaluation and risk mitigation")
        
        elif agent_type == "impact_assessment_agent":
            if analysis_type == "impact_assessment":
                impact_score = analysis_data.get('overall_impact_score', 0)
                
                if impact_score > 0.8:
                    insights.append("Exceptional impact potential across social, environmental, and economic dimensions")
                elif impact_score > 0.6:
                    insights.append("Strong impact potential with significant benefits for stakeholders")
                else:
                    insights.append("Impact potential could be enhanced - consider project modifications or alternative approaches")
        
        elif agent_type == "decision_support_agent":
            if analysis_type == "budget_optimization":
                utilization = analysis_data.get('budget_utilization', 0)
                
                if utilization > 0.9:
                    insights.append("Optimal budget allocation achieved with excellent resource utilization")
                elif utilization > 0.7:
                    insights.append("Good budget allocation with effective resource utilization")
                else:
                    insights.append("Budget allocation could be optimized for better resource utilization")
        
        return insights
    
    def _generate_alignment_recommendations(self, analysis_result: Dict[str, Any]) -> List[str]:
        """Generate alignment-specific recommendations"""
        recommendations = []
        
        if analysis_result.get('success', False):
            overall_score = analysis_result.get('overall_score', 0)
            detailed_scores = analysis_result.get('detailed_scores', {})
            
            if overall_score > 0.8:
                recommendations.append("Project shows excellent alignment - proceed with confidence")
            elif overall_score > 0.6:
                recommendations.append("Project shows good alignment - consider minor adjustments for optimization")
            else:
                recommendations.append("Project alignment needs improvement - consider strategic modifications")
            
            # Specific recommendations based on detailed scores
            if detailed_scores.get('sdg_alignment', 0) < 0.5:
                recommendations.append("Improve SDG alignment by focusing on company priority areas")
            
            if detailed_scores.get('geographic_alignment', 0) < 0.5:
                recommendations.append("Consider projects in company's geographic focus areas")
            
            if detailed_scores.get('budget_alignment', 0) < 0.5:
                recommendations.append("Optimize budget allocation or consider project scaling")
        
        return recommendations
    
    def _generate_feasibility_recommendations(self, feasibility_analysis: Dict[str, Any], 
                                           risk_analysis: Dict[str, Any]) -> List[str]:
        """Generate feasibility-specific recommendations"""
        recommendations = []
        
        if feasibility_analysis.get('success', False):
            feasibility_score = feasibility_analysis.get('overall_score', 0)
            
            if feasibility_score > 0.7:
                recommendations.append("Project is highly feasible - proceed with implementation")
            elif feasibility_score > 0.5:
                recommendations.append("Project is moderately feasible - address identified challenges")
            else:
                recommendations.append("Project feasibility is limited - consider redesign or alternative approaches")
        
        if risk_analysis.get('success', False):
            risk_level = risk_analysis.get('risk_level', 'Medium')
            
            if risk_level in ['High', 'Very High']:
                recommendations.append("High risk identified - implement comprehensive risk mitigation strategies")
            elif risk_level == 'Medium':
                recommendations.append("Moderate risk level - implement standard risk management practices")
            else:
                recommendations.append("Low risk level - proceed with standard monitoring")
        
        return recommendations
    
    def _generate_impact_recommendations(self, impact_analysis: Dict[str, Any]) -> List[str]:
        """Generate impact-specific recommendations"""
        recommendations = []
        
        if impact_analysis.get('success', False):
            overall_impact = impact_analysis.get('overall_impact_score', 0)
            
            if overall_impact > 0.8:
                recommendations.append("Exceptional impact potential - excellent choice for CSR investment")
            elif overall_impact > 0.6:
                recommendations.append("Strong impact potential - good choice for CSR investment")
            else:
                recommendations.append("Impact potential could be enhanced - consider project modifications")
            
            # Add specific recommendations from the analysis
            analysis_recommendations = impact_analysis.get('recommendations', [])
            recommendations.extend(analysis_recommendations)
        
        return recommendations
    
    def _generate_optimization_recommendations(self, optimization_result: Dict[str, Any]) -> List[str]:
        """Generate optimization-specific recommendations"""
        recommendations = []
        
        if optimization_result.get('success', False):
            # Add recommendations from the optimization result
            optimization_recommendations = optimization_result.get('recommendations', [])
            recommendations.extend(optimization_recommendations)
            
            # Add portfolio-level recommendations
            portfolio_metrics = optimization_result.get('optimized_allocation', {}).get('portfolio_metrics', {})
            
            if portfolio_metrics.get('portfolio_diversity', 0) < 0.5:
                recommendations.append("Consider increasing portfolio diversity for better risk distribution")
            
            if portfolio_metrics.get('average_impact_score', 0) > 0.7:
                recommendations.append("Excellent impact potential across selected projects")
            
            if portfolio_metrics.get('average_roi_score', 0) > 0.7:
                recommendations.append("Strong ROI potential across selected projects")
        
        return recommendations
    
    def _calculate_overall_score(self, alignment_analysis: Dict[str, Any], 
                               feasibility_analysis: Dict[str, Any], 
                               impact_analysis: Dict[str, Any]) -> float:
        """Calculate overall project score"""
        
        alignment_score = 0.0
        feasibility_score = 0.0
        impact_score = 0.0
        
        if alignment_analysis.get('success', False):
            alignment_score = alignment_analysis.get('tool_analysis', {}).get('overall_score', 0)
        
        if feasibility_analysis.get('success', False):
            feasibility_score = feasibility_analysis.get('feasibility_analysis', {}).get('overall_score', 0)
        
        if impact_analysis.get('success', False):
            impact_score = impact_analysis.get('impact_analysis', {}).get('overall_impact_score', 0)
        
        # Weighted combination
        overall_score = (
            alignment_score * 0.3 +
            feasibility_score * 0.3 +
            impact_score * 0.4
        )
        
        return round(overall_score, 2)
    
    def _generate_comprehensive_recommendations(self, alignment_analysis: Dict[str, Any], 
                                              feasibility_analysis: Dict[str, Any], 
                                              impact_analysis: Dict[str, Any]) -> List[str]:
        """Generate comprehensive recommendations"""
        recommendations = []
        
        # Combine recommendations from all analyses
        alignment_recs = alignment_analysis.get('recommendations', [])
        feasibility_recs = feasibility_analysis.get('recommendations', [])
        impact_recs = impact_analysis.get('recommendations', [])
        
        recommendations.extend(alignment_recs)
        recommendations.extend(feasibility_recs)
        recommendations.extend(impact_recs)
        
        # Add overall recommendations
        overall_score = self._calculate_overall_score(alignment_analysis, feasibility_analysis, impact_analysis)
        
        if overall_score > 0.8:
            recommendations.append("Project shows excellent overall potential - highly recommended for CSR investment")
        elif overall_score > 0.6:
            recommendations.append("Project shows good overall potential - suitable for CSR investment with proper planning")
        else:
            recommendations.append("Project requires significant improvements before proceeding with CSR investment")
        
        # Remove duplicates and return
        return list(set(recommendations))

# Global Watson service instance
watson_service = WatsonService()
