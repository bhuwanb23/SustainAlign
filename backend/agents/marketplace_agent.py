import json
from typing import List, Dict
from datetime import datetime
import logging
import random

class MarketplaceAgent:
    """
    Marketplace Agent for managing NGO side dashboards, proposal uploads,
    credibility checks, and auto-matching NGO projects with corporate needs.
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.matching_criteria = {
            'sdg_alignment': 0.3,
            'geographic_match': 0.25,
            'budget_fit': 0.25,
            'ngo_credibility': 0.2
        }
    
    def register_ngo(self, ngo_data: Dict) -> Dict:
        """Register a new NGO in the marketplace"""
        try:
            ngo_id = f"NGO_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            
            registration = {
                'ngo_id': ngo_id,
                'ngo_name': ngo_data.get('name', 'Unknown'),
                'registration_date': datetime.now().isoformat(),
                'status': 'Pending Verification',
                'credibility_score': self._calculate_credibility_score(ngo_data),
                'verification_documents': ngo_data.get('documents', []),
                'contact_info': ngo_data.get('contact_info', {}),
                'focus_areas': ngo_data.get('focus_areas', []),
                'geographic_reach': ngo_data.get('geographic_reach', [])
            }
            
            return registration
            
        except Exception as e:
            self.logger.error(f"Error registering NGO: {str(e)}")
            return {}
    
    def upload_project_proposal(self, ngo_id: str, proposal_data: Dict) -> Dict:
        """Upload a project proposal from NGO"""
        try:
            proposal_id = f"PROP_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            
            proposal = {
                'proposal_id': proposal_id,
                'ngo_id': ngo_id,
                'project_name': proposal_data.get('name', 'Unknown'),
                'upload_date': datetime.now().isoformat(),
                'status': 'Under Review',
                'project_details': {
                    'description': proposal_data.get('description', ''),
                    'budget': proposal_data.get('budget', 0),
                    'duration': proposal_data.get('duration', '12 months'),
                    'sdgs': proposal_data.get('sdgs', []),
                    'geography': proposal_data.get('geography', ''),
                    'sector': proposal_data.get('sector', ''),
                    'beneficiaries': proposal_data.get('beneficiaries', 0)
                },
                'attachments': proposal_data.get('attachments', []),
                'review_score': 0
            }
            
            return proposal
            
        except Exception as e:
            self.logger.error(f"Error uploading proposal: {str(e)}")
            return {}
    
    def auto_match_projects(self, corporate_profile: Dict, available_proposals: List[Dict]) -> List[Dict]:
        """Auto-match NGO projects with corporate needs"""
        try:
            matches = []
            
            for proposal in available_proposals:
                match_score = self._calculate_match_score(proposal, corporate_profile)
                
                if match_score >= 70:  # Only high-quality matches
                    match = {
                        'proposal_id': proposal.get('proposal_id'),
                        'ngo_id': proposal.get('ngo_id'),
                        'project_name': proposal.get('project_name'),
                        'match_score': match_score,
                        'match_reasons': self._get_match_reasons(proposal, corporate_profile),
                        'recommended_action': 'Contact NGO for detailed discussion'
                    }
                    matches.append(match)
            
            # Sort by match score
            matches.sort(key=lambda x: x['match_score'], reverse=True)
            
            return matches[:5]  # Return top 5 matches
            
        except Exception as e:
            self.logger.error(f"Error auto-matching projects: {str(e)}")
            return []
    
    def _calculate_match_score(self, proposal: Dict, corporate_profile: Dict) -> float:
        """Calculate match score between proposal and corporate profile"""
        try:
            proposal_details = proposal.get('project_details', {})
            
            # SDG alignment
            proposal_sdgs = set(proposal_details.get('sdgs', []))
            corporate_sdgs = set(corporate_profile.get('priority_sdgs', []))
            sdg_score = len(proposal_sdgs & corporate_sdgs) / len(corporate_sdgs) * 100 if corporate_sdgs else 0
            
            # Geographic match
            proposal_geo = proposal_details.get('geography', '').lower()
            corporate_geos = [geo.lower() for geo in corporate_profile.get('target_geographies', [])]
            geo_score = 100 if any(geo in proposal_geo for geo in corporate_geos) else 0
            
            # Budget fit
            proposal_budget = proposal_details.get('budget', 0)
            corporate_budget = corporate_profile.get('csr_budget', {}).get('max', float('inf'))
            budget_score = 100 if proposal_budget <= corporate_budget else 50
            
            # NGO credibility
            ngo_credibility = proposal.get('ngo_credibility', 50)
            
            # Calculate weighted score
            total_score = (
                sdg_score * self.matching_criteria['sdg_alignment'] +
                geo_score * self.matching_criteria['geographic_match'] +
                budget_score * self.matching_criteria['budget_fit'] +
                ngo_credibility * self.matching_criteria['ngo_credibility']
            )
            
            return round(total_score, 2)
            
        except Exception as e:
            self.logger.error(f"Error calculating match score: {str(e)}")
            return 0.0
    
    def _get_match_reasons(self, proposal: Dict, corporate_profile: Dict) -> List[str]:
        """Get reasons why proposal matches corporate profile"""
        reasons = []
        proposal_details = proposal.get('project_details', {})
        
        # Check SDG alignment
        proposal_sdgs = set(proposal_details.get('sdgs', []))
        corporate_sdgs = set(corporate_profile.get('priority_sdgs', []))
        if proposal_sdgs & corporate_sdgs:
            reasons.append(f"Addresses {len(proposal_sdgs & corporate_sdgs)} priority SDGs")
        
        # Check geographic match
        proposal_geo = proposal_details.get('geography', '')
        corporate_geos = corporate_profile.get('target_geographies', [])
        if any(geo in proposal_geo for geo in corporate_geos):
            reasons.append("Geographic alignment with corporate focus")
        
        # Check budget fit
        proposal_budget = proposal_details.get('budget', 0)
        corporate_budget = corporate_profile.get('csr_budget', {}).get('max', float('inf'))
        if proposal_budget <= corporate_budget:
            reasons.append("Budget within corporate CSR allocation")
        
        return reasons
    
    def _calculate_credibility_score(self, ngo_data: Dict) -> float:
        """Calculate NGO credibility score"""
        try:
            score = 50  # Base score
            
            # Add points for documents
            documents = ngo_data.get('documents', [])
            if 'registration_certificate' in documents:
                score += 20
            if 'tax_exemption' in documents:
                score += 15
            if 'audit_reports' in documents:
                score += 10
            if 'impact_reports' in documents:
                score += 5
            
            # Add points for experience
            years_experience = ngo_data.get('years_experience', 0)
            score += min(years_experience * 2, 20)
            
            return min(score, 100)
            
        except Exception as e:
            self.logger.error(f"Error calculating credibility score: {str(e)}")
            return 50.0
    
    def get_ngo_dashboard(self, ngo_id: str) -> Dict:
        """Get NGO dashboard data"""
        try:
            # Simulate NGO dashboard data
            dashboard = {
                'ngo_id': ngo_id,
                'dashboard_date': datetime.now().isoformat(),
                'profile': {
                    'status': 'Verified',
                    'credibility_score': random.randint(70, 95),
                    'total_proposals': random.randint(5, 20),
                    'approved_proposals': random.randint(2, 8)
                },
                'recent_proposals': [
                    {
                        'proposal_id': f"PROP_{i}",
                        'project_name': f"Project {i}",
                        'status': random.choice(['Under Review', 'Approved', 'Rejected']),
                        'upload_date': datetime.now().isoformat()
                    }
                    for i in range(1, 4)
                ],
                'analytics': {
                    'views_received': random.randint(50, 200),
                    'corporate_contacts': random.randint(10, 30),
                    'match_rate': f"{random.randint(60, 90)}%"
                }
            }
            
            return dashboard
            
        except Exception as e:
            self.logger.error(f"Error getting NGO dashboard: {str(e)}")
            return {}
    
    def process_bid(self, proposal_id: str, bid_data: Dict) -> Dict:
        """Process a bid on a proposal"""
        try:
            bid_id = f"BID_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            
            bid = {
                'bid_id': bid_id,
                'proposal_id': proposal_id,
                'corporate_id': bid_data.get('corporate_id'),
                'bid_amount': bid_data.get('amount', 0),
                'bid_date': datetime.now().isoformat(),
                'status': 'Submitted',
                'terms': bid_data.get('terms', {}),
                'timeline': bid_data.get('timeline', '12 months')
            }
            
            return bid
            
        except Exception as e:
            self.logger.error(f"Error processing bid: {str(e)}")
            return {}
    
    def get_marketplace_stats(self) -> Dict:
        """Get marketplace statistics"""
        try:
            stats = {
                'total_ngos': random.randint(500, 1000),
                'total_proposals': random.randint(2000, 5000),
                'active_corporates': random.randint(100, 300),
                'successful_matches': random.randint(500, 1000),
                'total_funding': random.randint(50000000, 200000000),
                'top_sectors': [
                    'Education',
                    'Healthcare',
                    'Environment',
                    'Poverty Alleviation',
                    'Women Empowerment'
                ],
                'geographic_coverage': random.randint(20, 35)
            }
            
            return stats
            
        except Exception as e:
            self.logger.error(f"Error getting marketplace stats: {str(e)}")
            return {}
