import json
from typing import List, Dict, Optional, Tuple
from datetime import datetime
import logging
import numpy as np

class AlignmentAgent:
    """
    Alignment Agent for mapping corporate ESG/CSR goals with potential projects
    and generating alignment scores (0-100) for each project.
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.alignment_weights = {
            'sdg_alignment': 0.3,
            'geographic_fit': 0.2,
            'budget_alignment': 0.2,
            'sector_relevance': 0.15,
            'ngo_credibility': 0.15
        }
        
    def calculate_alignment_score(self, project: Dict, corporate_profile: Dict) -> Dict:
        """
        Calculate alignment score between a project and corporate profile
        """
        try:
            scores = {}
            
            # SDG Alignment Score
            scores['sdg_alignment'] = self._calculate_sdg_alignment(
                project.get('sdgs', []), 
                corporate_profile.get('priority_sdgs', [])
            )
            
            # Geographic Fit Score
            scores['geographic_fit'] = self._calculate_geographic_fit(
                project.get('geography', ''), 
                corporate_profile.get('target_geographies', [])
            )
            
            # Budget Alignment Score
            scores['budget_alignment'] = self._calculate_budget_alignment(
                project.get('budget_range', ''), 
                corporate_profile.get('csr_budget', {})
            )
            
            # Sector Relevance Score
            scores['sector_relevance'] = self._calculate_sector_relevance(
                project.get('sector', ''), 
                corporate_profile.get('focus_sectors', [])
            )
            
            # NGO Credibility Score
            scores['ngo_credibility'] = self._calculate_ngo_credibility(
                project.get('ngo_rating', 0)
            )
            
            # Calculate weighted total score
            total_score = sum(
                scores[metric] * self.alignment_weights[metric] 
                for metric in scores
            )
            
            return {
                'project_id': project.get('id'),
                'project_name': project.get('name'),
                'total_alignment_score': round(total_score, 2),
                'detailed_scores': scores,
                'alignment_level': self._get_alignment_level(total_score),
                'recommendation': self._generate_recommendation(total_score),
                'calculated_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            self.logger.error(f"Error calculating alignment score: {str(e)}")
            return {}
    
    def _calculate_sdg_alignment(self, project_sdgs: List[str], corporate_sdgs: List[str]) -> float:
        """
        Calculate SDG alignment score (0-100)
        """
        if not project_sdgs or not corporate_sdgs:
            return 0.0
        
        # Count matching SDGs
        matching_sdgs = set(project_sdgs) & set(corporate_sdgs)
        total_corporate_sdgs = len(corporate_sdgs)
        
        if total_corporate_sdgs == 0:
            return 0.0
        
        # Calculate percentage of corporate SDGs covered
        alignment_percentage = (len(matching_sdgs) / total_corporate_sdgs) * 100
        
        # Bonus for additional SDGs covered
        additional_sdgs = len(project_sdgs) - len(matching_sdgs)
        bonus = min(additional_sdgs * 5, 20)  # Max 20% bonus
        
        return min(alignment_percentage + bonus, 100.0)
    
    def _calculate_geographic_fit(self, project_geo: str, corporate_geos: List[str]) -> float:
        """
        Calculate geographic fit score (0-100)
        """
        if not project_geo or not corporate_geos:
            return 0.0
        
        project_geo_lower = project_geo.lower()
        
        # Check for exact matches
        for geo in corporate_geos:
            if geo.lower() in project_geo_lower or project_geo_lower in geo.lower():
                return 100.0
        
        # Check for partial matches (e.g., "Rural India" matches "India")
        for geo in corporate_geos:
            if any(word in project_geo_lower for word in geo.lower().split()):
                return 70.0
        
        return 0.0
    
    def _calculate_budget_alignment(self, project_budget: str, corporate_budget: Dict) -> float:
        """
        Calculate budget alignment score (0-100)
        """
        if not project_budget or not corporate_budget:
            return 50.0  # Neutral score if no budget info
        
        try:
            # Parse project budget range
            budget_range = project_budget.split('-')
            if len(budget_range) == 2:
                min_budget = float(budget_range[0])
                max_budget = float(budget_range[1])
                avg_budget = (min_budget + max_budget) / 2
            else:
                avg_budget = float(budget_range[0])
            
            corporate_min = corporate_budget.get('min', 0)
            corporate_max = corporate_budget.get('max', float('inf'))
            
            # Check if budget falls within corporate range
            if corporate_min <= avg_budget <= corporate_max:
                return 100.0
            elif avg_budget < corporate_min:
                # Project is too small
                return 30.0
            else:
                # Project is too large
                return 20.0
                
        except (ValueError, TypeError):
            return 50.0
    
    def _calculate_sector_relevance(self, project_sector: str, corporate_sectors: List[str]) -> float:
        """
        Calculate sector relevance score (0-100)
        """
        if not project_sector or not corporate_sectors:
            return 50.0
        
        project_sector_lower = project_sector.lower()
        
        # Check for exact matches
        for sector in corporate_sectors:
            if sector.lower() == project_sector_lower:
                return 100.0
        
        # Check for partial matches
        for sector in corporate_sectors:
            if sector.lower() in project_sector_lower or project_sector_lower in sector.lower():
                return 80.0
        
        return 30.0
    
    def _calculate_ngo_credibility(self, ngo_rating: float) -> float:
        """
        Calculate NGO credibility score based on rating (0-100)
        """
        if not ngo_rating:
            return 50.0
        
        # Convert 5-star rating to percentage
        return min(ngo_rating * 20, 100.0)
    
    def _get_alignment_level(self, score: float) -> str:
        """
        Get alignment level based on score
        """
        if score >= 80:
            return "Excellent"
        elif score >= 60:
            return "Good"
        elif score >= 40:
            return "Fair"
        else:
            return "Poor"
    
    def _generate_recommendation(self, score: float) -> str:
        """
        Generate recommendation based on alignment score
        """
        if score >= 80:
            return "Strongly recommended - High alignment with corporate goals"
        elif score >= 60:
            return "Recommended - Good alignment with some considerations"
        elif score >= 40:
            return "Consider with modifications - Moderate alignment"
        else:
            return "Not recommended - Low alignment with corporate goals"
    
    def batch_align_projects(self, projects: List[Dict], corporate_profile: Dict) -> List[Dict]:
        """
        Calculate alignment scores for multiple projects
        """
        try:
            alignment_results = []
            
            for project in projects:
                alignment_result = self.calculate_alignment_score(project, corporate_profile)
                if alignment_result:
                    alignment_results.append(alignment_result)
            
            # Sort by alignment score (highest first)
            alignment_results.sort(key=lambda x: x['total_alignment_score'], reverse=True)
            
            return alignment_results
            
        except Exception as e:
            self.logger.error(f"Error in batch alignment: {str(e)}")
            return []
    
    def get_top_recommendations(self, projects: List[Dict], corporate_profile: Dict, top_n: int = 5) -> List[Dict]:
        """
        Get top N project recommendations based on alignment scores
        """
        try:
            alignment_results = self.batch_align_projects(projects, corporate_profile)
            return alignment_results[:top_n]
            
        except Exception as e:
            self.logger.error(f"Error getting top recommendations: {str(e)}")
            return []
    
    def generate_alignment_report(self, alignment_results: List[Dict]) -> Dict:
        """
        Generate comprehensive alignment report
        """
        try:
            if not alignment_results:
                return {}
            
            scores = [result['total_alignment_score'] for result in alignment_results]
            
            report = {
                'summary': {
                    'total_projects_evaluated': len(alignment_results),
                    'average_alignment_score': round(np.mean(scores), 2),
                    'highest_score': max(scores),
                    'lowest_score': min(scores),
                    'excellent_alignment_count': len([s for s in scores if s >= 80]),
                    'good_alignment_count': len([s for s in scores if 60 <= s < 80]),
                    'fair_alignment_count': len([s for s in scores if 40 <= s < 60]),
                    'poor_alignment_count': len([s for s in scores if s < 40])
                },
                'top_recommendations': alignment_results[:3],
                'alignment_distribution': {
                    'excellent': len([s for s in scores if s >= 80]),
                    'good': len([s for s in scores if 60 <= s < 80]),
                    'fair': len([s for s in scores if 40 <= s < 60]),
                    'poor': len([s for s in scores if s < 40])
                },
                'generated_at': datetime.now().isoformat()
            }
            
            return report
            
        except Exception as e:
            self.logger.error(f"Error generating alignment report: {str(e)}")
            return {}
