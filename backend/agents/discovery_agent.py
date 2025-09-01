import requests
import json
from typing import List, Dict, Optional
from datetime import datetime
import logging

class DiscoveryAgent:
    """
    Discovery Agent for fetching NGO/CSR project data from various APIs
    and providing search and filtering capabilities.
    """
    
    def __init__(self):
        self.api_endpoints = {
            'ngo_darpan': 'https://ngodarpan.gov.in/api/v1',
            'un_sdg': 'https://sdgapi.un.org/api/v1',
            'sustainability_platforms': 'https://api.sustainability.com/v1'
        }
        self.logger = logging.getLogger(__name__)
        
    def fetch_ngo_projects(self, filters: Dict = None) -> List[Dict]:
        """
        Fetch NGO projects from NGO Darpan API
        """
        try:
            # Simulated API call to NGO Darpan
            projects = [
                {
                    'id': 'ngo_001',
                    'name': 'Rural Education Initiative',
                    'ngo_name': 'Education for All Foundation',
                    'sector': 'Education',
                    'geography': 'Rural India',
                    'budget_range': '500000-1000000',
                    'sdgs': ['4', '10'],
                    'description': 'Improving literacy rates in rural communities',
                    'status': 'Active',
                    'created_date': '2024-01-15'
                },
                {
                    'id': 'ngo_002',
                    'name': 'Clean Water Project',
                    'ngo_name': 'Water Conservation Society',
                    'sector': 'Environment',
                    'geography': 'Urban India',
                    'budget_range': '1000000-2000000',
                    'sdgs': ['6', '11'],
                    'description': 'Providing clean drinking water to urban slums',
                    'status': 'Active',
                    'created_date': '2024-02-20'
                }
            ]
            
            if filters:
                projects = self._apply_filters(projects, filters)
                
            return projects
            
        except Exception as e:
            self.logger.error(f"Error fetching NGO projects: {str(e)}")
            return []
    
    def fetch_sdg_datasets(self, sdg_goals: List[str] = None) -> List[Dict]:
        """
        Fetch UN SDG datasets
        """
        try:
            # Simulated SDG datasets
            datasets = [
                {
                    'id': 'sdg_001',
                    'goal': '4',
                    'title': 'Quality Education',
                    'description': 'Ensure inclusive and equitable quality education',
                    'indicators': ['4.1.1', '4.2.1', '4.3.1'],
                    'data_source': 'UNESCO',
                    'last_updated': '2024-01-01'
                },
                {
                    'id': 'sdg_002',
                    'goal': '6',
                    'title': 'Clean Water and Sanitation',
                    'description': 'Ensure availability and sustainable management of water',
                    'indicators': ['6.1.1', '6.2.1', '6.3.1'],
                    'data_source': 'WHO',
                    'last_updated': '2024-01-15'
                }
            ]
            
            if sdg_goals:
                datasets = [d for d in datasets if d['goal'] in sdg_goals]
                
            return datasets
            
        except Exception as e:
            self.logger.error(f"Error fetching SDG datasets: {str(e)}")
            return []
    
    def search_projects(self, query: str, filters: Dict = None) -> List[Dict]:
        """
        Search projects with text query and filters
        """
        try:
            all_projects = self.fetch_ngo_projects()
            
            # Simple text search
            if query:
                query_lower = query.lower()
                all_projects = [
                    p for p in all_projects 
                    if query_lower in p['name'].lower() or 
                       query_lower in p['description'].lower() or
                       query_lower in p['ngo_name'].lower()
                ]
            
            # Apply additional filters
            if filters:
                all_projects = self._apply_filters(all_projects, filters)
                
            return all_projects
            
        except Exception as e:
            self.logger.error(f"Error searching projects: {str(e)}")
            return []
    
    def _apply_filters(self, projects: List[Dict], filters: Dict) -> List[Dict]:
        """
        Apply filters to project list
        """
        filtered_projects = projects
        
        if 'sector' in filters:
            filtered_projects = [
                p for p in filtered_projects 
                if p['sector'].lower() == filters['sector'].lower()
            ]
        
        if 'geography' in filters:
            filtered_projects = [
                p for p in filtered_projects 
                if filters['geography'].lower() in p['geography'].lower()
            ]
        
        if 'budget_range' in filters:
            filtered_projects = [
                p for p in filtered_projects 
                if p['budget_range'] == filters['budget_range']
            ]
        
        if 'sdgs' in filters:
            filtered_projects = [
                p for p in filtered_projects 
                if any(sdg in p['sdgs'] for sdg in filters['sdgs'])
            ]
        
        return filtered_projects
    
    def get_project_details(self, project_id: str) -> Optional[Dict]:
        """
        Get detailed information about a specific project
        """
        try:
            projects = self.fetch_ngo_projects()
            for project in projects:
                if project['id'] == project_id:
                    # Add additional details
                    project['detailed_info'] = {
                        'ngo_rating': 4.5,
                        'success_rate': 85,
                        'beneficiaries_reached': 5000,
                        'project_duration': '12 months',
                        'contact_info': {
                            'email': 'contact@ngo.org',
                            'phone': '+91-1234567890'
                        }
                    }
                    return project
            return None
            
        except Exception as e:
            self.logger.error(f"Error getting project details: {str(e)}")
            return None
    
    def get_statistics(self) -> Dict:
        """
        Get discovery statistics
        """
        try:
            projects = self.fetch_ngo_projects()
            
            stats = {
                'total_projects': len(projects),
                'sectors': {},
                'geographies': {},
                'sdg_distribution': {},
                'last_updated': datetime.now().isoformat()
            }
            
            for project in projects:
                # Sector stats
                sector = project['sector']
                stats['sectors'][sector] = stats['sectors'].get(sector, 0) + 1
                
                # Geography stats
                geo = project['geography']
                stats['geographies'][geo] = stats['geographies'].get(geo, 0) + 1
                
                # SDG stats
                for sdg in project['sdgs']:
                    stats['sdg_distribution'][sdg] = stats['sdg_distribution'].get(sdg, 0) + 1
            
            return stats
            
        except Exception as e:
            self.logger.error(f"Error getting statistics: {str(e)}")
            return {}
