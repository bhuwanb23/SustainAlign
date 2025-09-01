import json
from typing import List, Dict
from datetime import datetime
import logging

class DecisionSupportAgent:
    """
    Decision Support Agent for board-ready summaries with Explainable AI
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def generate_decision_summary(self, evaluations: List[Dict], corporate_profile: Dict) -> Dict:
        """Generate board-ready decision summary"""
        try:
            sorted_evaluations = sorted(evaluations, key=lambda x: x['overall_score'], reverse=True)
            top_recommendations = sorted_evaluations[:3]
            
            return {
                'executive_summary': self._create_executive_summary(sorted_evaluations),
                'top_recommendations': top_recommendations,
                'xai_explanations': [self._generate_xai_explanation(eval, i+1) for i, eval in enumerate(top_recommendations)],
                'approval_recommendations': self._generate_approval_recommendations(top_recommendations),
                'generated_at': datetime.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Error generating decision summary: {str(e)}")
            return {}
    
    def _create_executive_summary(self, evaluations: List[Dict]) -> Dict:
        """Create executive summary"""
        total_projects = len(evaluations)
        avg_score = sum(e['overall_score'] for e in evaluations) / total_projects if total_projects > 0 else 0
        
        return {
            'total_projects_evaluated': total_projects,
            'average_score': round(avg_score, 1),
            'excellent_projects': len([e for e in evaluations if e['overall_score'] >= 80]),
            'good_projects': len([e for e in evaluations if 60 <= e['overall_score'] < 80])
        }
    
    def _generate_xai_explanation(self, evaluation: Dict, rank: int) -> Dict:
        """Generate XAI explanation"""
        return {
            'project_name': evaluation['project_name'],
            'rank': rank,
            'score': evaluation['overall_score'],
            'explanation': f"Project ranks #{rank} with score {evaluation['overall_score']}/100. " +
                          f"Key strengths: {self._get_strengths(evaluation)}"
        }
    
    def _get_strengths(self, evaluation: Dict) -> str:
        """Get project strengths"""
        scores = evaluation['criteria_scores']
        strengths = [k for k, v in scores.items() if v >= 70]
        return ', '.join(strengths) if strengths else 'Moderate performance'
    
    def _generate_approval_recommendations(self, top_recommendations: List[Dict]) -> List[Dict]:
        """Generate approval recommendations"""
        recommendations = []
        for i, evaluation in enumerate(top_recommendations):
            status = "Strongly Recommend" if evaluation['overall_score'] >= 80 else "Recommend"
            recommendations.append({
                'project_name': evaluation['project_name'],
                'rank': i + 1,
                'approval_status': status,
                'reasoning': f"Score: {evaluation['overall_score']}/100"
            })
        return recommendations
