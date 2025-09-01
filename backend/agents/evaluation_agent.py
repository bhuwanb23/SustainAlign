import json
from typing import List, Dict, Optional
from datetime import datetime
import logging
import numpy as np

class EvaluationAgent:
    """
    Evaluation Agent for performing side-by-side comparisons of projects
    based on cost, impact, risk, and NGO credibility.
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.criteria_weights = {
            'cost_efficiency': 0.25,
            'impact_potential': 0.30,
            'risk_level': 0.20,
            'ngo_credibility': 0.15,
            'sustainability': 0.10
        }
    
    def evaluate_project(self, project: Dict) -> Dict:
        """Evaluate a single project across all criteria"""
        try:
            scores = {
                'cost_efficiency': self._evaluate_cost(project),
                'impact_potential': self._evaluate_impact(project),
                'risk_level': self._evaluate_risk(project),
                'ngo_credibility': self._evaluate_ngo(project),
                'sustainability': self._evaluate_sustainability(project)
            }
            
            # Calculate weighted score
            total_score = sum(scores[criterion] * self.criteria_weights[criterion] 
                            for criterion in scores)
            
            return {
                'project_id': project.get('id'),
                'project_name': project.get('name'),
                'overall_score': round(total_score, 2),
                'criteria_scores': scores,
                'evaluation_date': datetime.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Error evaluating project: {str(e)}")
            return {}
    
    def _evaluate_cost(self, project: Dict) -> float:
        """Evaluate cost efficiency"""
        try:
            budget = project.get('budget_range', '0-0')
            beneficiaries = project.get('beneficiaries_reached', 1000)
            
            # Parse budget
            budget_parts = budget.split('-')
            avg_budget = (float(budget_parts[0]) + float(budget_parts[1])) / 2 if len(budget_parts) == 2 else float(budget_parts[0])
            
            cost_per_beneficiary = avg_budget / beneficiaries if beneficiaries > 0 else 0
            
            if cost_per_beneficiary <= 100: return 100
            elif cost_per_beneficiary <= 500: return 80
            elif cost_per_beneficiary <= 1000: return 60
            else: return 40
        except:
            return 50
    
    def _evaluate_impact(self, project: Dict) -> float:
        """Evaluate impact potential"""
        sdgs = project.get('sdgs', [])
        beneficiaries = project.get('beneficiaries_reached', 1000)
        
        sdg_score = min(len(sdgs) * 15, 60)
        reach_score = min(beneficiaries / 100, 40)
        
        return sdg_score + reach_score
    
    def _evaluate_risk(self, project: Dict) -> float:
        """Evaluate risk level (lower is better, so invert)"""
        ngo_rating = project.get('ngo_rating', 3.0)
        
        if ngo_rating >= 4.5: risk = 10
        elif ngo_rating >= 4.0: risk = 20
        elif ngo_rating >= 3.5: risk = 30
        else: risk = 50
        
        return 100 - risk  # Invert for scoring
    
    def _evaluate_ngo(self, project: Dict) -> float:
        """Evaluate NGO credibility"""
        ngo_rating = project.get('ngo_rating', 3.0)
        success_rate = project.get('success_rate', 70)
        
        rating_score = ngo_rating * 20
        success_score = min(success_rate, 100)
        
        return (rating_score * 0.6) + (success_score * 0.4)
    
    def _evaluate_sustainability(self, project: Dict) -> float:
        """Evaluate sustainability"""
        sdgs = project.get('sdgs', [])
        environmental_sdgs = ['6', '7', '13', '14', '15']
        
        env_score = len(set(sdgs) & set(environmental_sdgs)) * 20
        return min(env_score, 100)
    
    def compare_projects(self, projects: List[Dict]) -> Dict:
        """Compare multiple projects"""
        try:
            evaluations = []
            for project in projects:
                evaluation = self.evaluate_project(project)
                if evaluation:
                    evaluations.append(evaluation)
            
            evaluations.sort(key=lambda x: x['overall_score'], reverse=True)
            
            return {
                'project_evaluations': evaluations,
                'top_performers': evaluations[:3],
                'summary': {
                    'total_projects': len(evaluations),
                    'average_score': round(np.mean([e['overall_score'] for e in evaluations]), 2),
                    'highest_score': max([e['overall_score'] for e in evaluations]),
                    'lowest_score': min([e['overall_score'] for e in evaluations])
                },
                'generated_at': datetime.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Error comparing projects: {str(e)}")
            return {}
