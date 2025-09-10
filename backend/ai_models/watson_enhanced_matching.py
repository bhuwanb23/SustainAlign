"""
Enhanced AI Matching Service with IBM WatsonX Orchestrate Integration
Combines traditional AI matching with Watson agents for superior results
"""

from typing import Dict, List, Optional, Tuple, Any
import logging
from datetime import datetime

from .ai_matching_service import AIMatchingService
from ibm_watson.watson_service import watson_service
# Note: No direct model classes are required here; DB writes use existing models
from models.rationale import DecisionRationale
from models.base import db

logger = logging.getLogger(__name__)

class WatsonEnhancedMatchingService:
    """Enhanced AI matching service using IBM Watson agents"""
    
    def __init__(self):
        self.base_service = AIMatchingService()
        self.watson_service = watson_service
    
    def generate_enhanced_project_matching(self, company_id: int, 
                                         project_filters: Dict = None,
                                         use_watson: bool = True) -> Optional[Dict]:
        """
        Generate enhanced project matching using both traditional AI and Watson agents
        
        Args:
            company_id: Company ID for matching
            project_filters: Filters for project selection
            use_watson: Whether to use Watson agents (fallback to traditional AI if False)
        
        Returns:
            Enhanced matching results with Watson insights
        """
        try:
            logger.info(f"Generating enhanced project matching for company {company_id}")
            
            # Get company data
            company_data = self.base_service.get_company_data(company_id)
            if not company_data:
                logger.error(f"Company data not found for ID: {company_id}")
                return None
            
            # Get available projects
            projects_data = self.base_service.get_available_projects(project_filters)
            if not projects_data:
                logger.warning("No projects available for matching")
                return None
            
            # Generate base matching using traditional AI
            base_rationale = self.base_service.generate_project_matching_rationale(
                company_id, project_filters
            )
            
            if not base_rationale:
                logger.error("Failed to generate base matching rationale")
                return None
            
            # Enhance with Watson agents if available
            watson_insights = {}
            if use_watson and self.watson_service.initialized:
                watson_insights = self._generate_watson_insights(
                    company_data, projects_data, base_rationale
                )
            
            # Combine results
            enhanced_result = {
                "matching_type": "enhanced_ai_matching",
                "timestamp": datetime.now().isoformat(),
                "company_id": company_id,
                "base_rationale": base_rationale,
                "watson_insights": watson_insights,
                "enhanced_recommendations": self._generate_enhanced_recommendations(
                    base_rationale, watson_insights
                ),
                "confidence_score": self._calculate_confidence_score(
                    base_rationale, watson_insights
                ),
                "success": True
            }
            
            # Save enhanced rationale
            enhanced_rationale_id = self._save_enhanced_rationale(
                company_id, enhanced_result
            )
            
            if enhanced_rationale_id:
                enhanced_result['enhanced_rationale_id'] = enhanced_rationale_id
            
            logger.info(f"Successfully generated enhanced matching for company {company_id}")
            return enhanced_result
            
        except Exception as e:
            logger.error(f"Error in enhanced project matching: {str(e)}")
            return None
    
    def _generate_watson_insights(self, company_data: Dict, projects_data: List[Dict], 
                                base_rationale: Dict) -> Dict[str, Any]:
        """Generate insights using Watson agents"""
        try:
            watson_insights = {
                "project_analyses": [],
                "portfolio_optimization": None,
                "risk_assessments": [],
                "impact_predictions": []
            }
            
            # Analyze top projects with Watson agents
            top_projects = base_rationale.get('options', [])[:5]  # Top 5 projects
            
            for project_option in top_projects:
                project_id = project_option.get('id')
                if not project_id:
                    continue
                
                # Find project data
                project_data = next((p for p in projects_data if p['id'] == project_id), None)
                if not project_data:
                    continue
                
                # Get comprehensive analysis from Watson
                comprehensive_analysis = self._get_watson_comprehensive_analysis(
                    project_data, company_data
                )
                
                if comprehensive_analysis:
                    watson_insights["project_analyses"].append({
                        "project_id": project_id,
                        "analysis": comprehensive_analysis
                    })
            
            # Portfolio optimization if multiple projects
            if len(top_projects) > 1:
                portfolio_optimization = self._get_portfolio_optimization(
                    company_data, top_projects
                )
                if portfolio_optimization:
                    watson_insights["portfolio_optimization"] = portfolio_optimization
            
            return watson_insights
            
        except Exception as e:
            logger.error(f"Error generating Watson insights: {str(e)}")
            return {}
    
    def _get_watson_comprehensive_analysis(self, project_data: Dict, 
                                         company_data: Dict) -> Optional[Dict]:
        """Get comprehensive analysis from Watson agents"""
        try:
            # Prepare project data for Watson analysis
            watson_project_data = self._prepare_project_data_for_watson(project_data)
            watson_company_data = self._prepare_company_data_for_watson(company_data)
            
            # Get comprehensive analysis
            analysis = self.watson_service.get_comprehensive_analysis(
                watson_project_data, watson_company_data
            )
            
            return analysis
            
        except Exception as e:
            logger.error(f"Error getting Watson comprehensive analysis: {str(e)}")
            return None
    
    def _get_portfolio_optimization(self, company_data: Dict, 
                                  project_options: List[Dict]) -> Optional[Dict]:
        """Get portfolio optimization from Watson Decision Support Agent"""
        try:
            # Prepare project list for optimization
            project_list = []
            for option in project_options:
                project_data = {
                    'id': option.get('id'),
                    'name': option.get('title', 'Unknown Project'),
                    'budget': option.get('funding_required', 0),
                    'timeline_months': option.get('duration_months', 12),
                    'location': option.get('location_country', ''),
                    'sdg_focus': option.get('sdg_goals', []),
                    'expected_beneficiaries': option.get('target_beneficiaries', 0),
                    'complexity_level': 'medium',  # Default
                    'risk_level': 'medium',  # Default
                    'expected_return': option.get('expected_return', 0),
                    'sustainability_score': 0.5  # Default
                }
                project_list.append(project_data)
            
            # Get available budget from company
            available_budget = company_data.get('budget', 1000000)  # Default 1M
            
            # Get optimization
            optimization = self.watson_service.optimize_budget_allocation(
                available_budget, project_list
            )
            
            return optimization
            
        except Exception as e:
            logger.error(f"Error getting portfolio optimization: {str(e)}")
            return None
    
    def _prepare_project_data_for_watson(self, project_data: Dict) -> Dict:
        """Prepare project data for Watson analysis"""
        return {
            'id': project_data.get('id'),
            'name': project_data.get('title', ''),
            'description': project_data.get('short_description', ''),
            'budget': project_data.get('funding_required', 0),
            'timeline_months': project_data.get('duration_months', 12),
            'location': project_data.get('location_country', ''),
            'sdg_focus': project_data.get('sdg_goals', []),
            'impact_metrics': {
                'beneficiaries': project_data.get('target_beneficiaries', 0),
                'education_metrics': {},
                'health_metrics': {},
                'community_metrics': {}
            },
            'baseline_data': {},
            'complexity_level': 'medium',
            'risk_level': 'medium',
            'expected_beneficiaries': project_data.get('target_beneficiaries', 0),
            'sustainability_score': 0.5,
            'expected_return': 0,
            'team_size': 5,
            'technology_requirements': [],
            'resource_requirements': {}
        }
    
    def _prepare_company_data_for_watson(self, company_data: Dict) -> Dict:
        """Prepare company data for Watson analysis"""
        return {
            'id': company_data.get('id'),
            'company_name': company_data.get('company_name', ''),
            'sdg_priorities': company_data.get('sdg_goals', []),
            'geographic_focus': [company_data.get('location_country', '')],
            'available_budget': company_data.get('budget', 1000000),
            'csr_focus_areas': company_data.get('focus_area', []),
            'capabilities': [],
            'available_resources': {}
        }
    
    def _generate_enhanced_recommendations(self, base_rationale: Dict, 
                                         watson_insights: Dict) -> List[str]:
        """Generate enhanced recommendations combining base and Watson insights"""
        recommendations = []
        
        # Base recommendations
        base_recommendations = base_rationale.get('recommendations', [])
        recommendations.extend(base_recommendations)
        
        # Watson insights recommendations
        if watson_insights:
            # Portfolio optimization recommendations
            portfolio_opt = watson_insights.get('portfolio_optimization')
            if portfolio_opt and portfolio_opt.get('success'):
                portfolio_recs = portfolio_opt.get('recommendations', [])
                recommendations.extend(portfolio_recs)
            
            # Project-specific recommendations
            for project_analysis in watson_insights.get('project_analyses', []):
                analysis = project_analysis.get('analysis', {})
                if analysis.get('success'):
                    comprehensive_recs = analysis.get('comprehensive_recommendations', [])
                    recommendations.extend(comprehensive_recs)
        
        # Remove duplicates and return
        return list(set(recommendations))
    
    def _calculate_confidence_score(self, base_rationale: Dict, 
                                  watson_insights: Dict) -> float:
        """Calculate confidence score based on base rationale and Watson insights"""
        try:
            base_score = 0.5  # Default base score
            
            # Extract score from base rationale if available
            if 'score' in base_rationale:
                base_score = base_rationale['score']
            elif 'confidence' in base_rationale:
                base_score = base_rationale['confidence']
            
            # Enhance with Watson insights
            watson_enhancement = 0.0
            if watson_insights:
                # Check if Watson analysis was successful
                successful_analyses = 0
                total_analyses = 0
                
                for project_analysis in watson_insights.get('project_analyses', []):
                    total_analyses += 1
                    if project_analysis.get('analysis', {}).get('success', False):
                        successful_analyses += 1
                
                if total_analyses > 0:
                    watson_success_rate = successful_analyses / total_analyses
                    watson_enhancement = watson_success_rate * 0.2  # Up to 20% enhancement
                
                # Additional enhancement for portfolio optimization
                if watson_insights.get('portfolio_optimization', {}).get('success', False):
                    watson_enhancement += 0.1
            
            # Calculate final confidence score
            final_score = min(base_score + watson_enhancement, 1.0)
            return round(final_score, 2)
            
        except Exception as e:
            logger.error(f"Error calculating confidence score: {str(e)}")
            return 0.5
    
    def _save_enhanced_rationale(self, company_id: int, enhanced_result: Dict) -> Optional[int]:
        """Save enhanced rationale to database"""
        try:
            # Create enhanced rationale record
            rationale = DecisionRationale(
                company_id=company_id,
                title="Enhanced AI + Watson Project Matching Analysis",
                context={
                    "matching_type": "enhanced_ai_matching",
                    "base_rationale_id": enhanced_result.get('base_rationale', {}).get('rationale_id'),
                    "watson_insights_available": bool(enhanced_result.get('watson_insights')),
                    "confidence_score": enhanced_result.get('confidence_score', 0.5)
                },
                criteria=enhanced_result.get('base_rationale', {}).get('criteria', {}),
                options=enhanced_result.get('base_rationale', {}).get('options', []),
                selected_option=enhanced_result.get('base_rationale', {}).get('selectedOption'),
                pros=enhanced_result.get('base_rationale', {}).get('pros', []),
                cons=enhanced_result.get('base_rationale', {}).get('cons', []),
                reasoning_steps=enhanced_result.get('base_rationale', {}).get('reasoningSteps', []),
                score_breakdown={
                    "base_score": enhanced_result.get('base_rationale', {}).get('score', 0.5),
                    "watson_enhancement": enhanced_result.get('confidence_score', 0.5) - enhanced_result.get('base_rationale', {}).get('score', 0.5),
                    "final_confidence": enhanced_result.get('confidence_score', 0.5)
                },
                created_by=1  # Default user ID, should be set from authentication context
            )
            
            db.session.add(rationale)
            db.session.commit()
            
            logger.info(f"Saved enhanced rationale to database with ID: {rationale.id}")
            return rationale.id
            
        except Exception as e:
            logger.error(f"Error saving enhanced rationale to database: {str(e)}")
            db.session.rollback()
            return None
    
    def get_enhanced_matching_summary(self, company_id: int) -> Optional[Dict]:
        """Get summary of enhanced matching results for a company"""
        try:
            # Get recent enhanced rationales
            rationales = DecisionRationale.query.filter(
                DecisionRationale.company_id == company_id,
                DecisionRationale.title.contains("Enhanced AI + Watson")
            ).order_by(DecisionRationale.created_at.desc()).limit(5).all()
            
            if not rationales:
                return None
            
            # Calculate summary statistics
            total_analyses = len(rationales)
            avg_confidence = sum(r.context.get('confidence_score', 0.5) for r in rationales) / total_analyses
            watson_usage_rate = sum(1 for r in rationales if r.context.get('watson_insights_available')) / total_analyses
            
            return {
                "total_enhanced_analyses": total_analyses,
                "average_confidence_score": round(avg_confidence, 2),
                "watson_usage_rate": round(watson_usage_rate, 2),
                "latest_analysis": rationales[0].to_dict() if rationales else None,
                "analysis_trend": self._calculate_analysis_trend(rationales)
            }
            
        except Exception as e:
            logger.error(f"Error getting enhanced matching summary: {str(e)}")
            return None
    
    def _calculate_analysis_trend(self, rationales: List[DecisionRationale]) -> str:
        """Calculate trend in analysis quality over time"""
        try:
            if len(rationales) < 2:
                return "insufficient_data"
            
            # Get confidence scores
            scores = [r.context.get('confidence_score', 0.5) for r in rationales]
            
            # Calculate trend
            recent_avg = sum(scores[:2]) / 2
            older_avg = sum(scores[2:]) / len(scores[2:]) if len(scores) > 2 else scores[-1]
            
            if recent_avg > older_avg + 0.1:
                return "improving"
            elif recent_avg < older_avg - 0.1:
                return "declining"
            else:
                return "stable"
                
        except Exception as e:
            logger.error(f"Error calculating analysis trend: {str(e)}")
            return "unknown"

# Global enhanced matching service instance
watson_enhanced_matching = WatsonEnhancedMatchingService()
