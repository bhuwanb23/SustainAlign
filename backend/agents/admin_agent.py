import json
from typing import List, Dict
from datetime import datetime
import logging
import random

class AdminAgent:
    """
    Admin Agent for user/role management and system administration
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.user_roles = {
            'corporate_admin': ['manage_users', 'view_reports'],
            'ngo_admin': ['upload_proposals', 'view_dashboard'],
            'regulator': ['view_compliance', 'audit_reports'],
            'system_admin': ['manage_system', 'configure_agents']
        }
    
    def create_user(self, user_data: Dict) -> Dict:
        """Create a new user account"""
        try:
            user_id = f"USER_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            
            return {
                'user_id': user_id,
                'username': user_data.get('username', ''),
                'email': user_data.get('email', ''),
                'role': user_data.get('role', 'corporate_user'),
                'permissions': self.user_roles.get(user_data.get('role', 'corporate_user'), []),
                'status': 'Active',
                'created_date': datetime.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Error creating user: {str(e)}")
            return {}
    
    def manage_agent_settings(self, agent_name: str, settings: Dict) -> Dict:
        """Manage agent settings"""
        try:
            return {
                'agent_name': agent_name,
                'status': settings.get('status', 'enabled'),
                'auto_run': settings.get('auto_run', True),
                'notifications': settings.get('notifications', True),
                'updated_date': datetime.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Error managing agent settings: {str(e)}")
            return {}
    
    def get_system_status(self) -> Dict:
        """Get system status"""
        try:
            return {
                'system_health': 'Healthy',
                'active_agents': 9,
                'total_users': random.randint(1000, 5000),
                'system_uptime': f"{random.randint(95, 99)}%",
                'last_backup': datetime.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Error getting system status: {str(e)}")
            return {}
    
    def manage_integrations(self, integration_data: Dict) -> Dict:
        """Manage integrations"""
        try:
            return {
                'integration_id': f"INT_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                'name': integration_data.get('name', ''),
                'type': integration_data.get('type', ''),
                'status': integration_data.get('status', 'pending'),
                'created_date': datetime.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Error managing integration: {str(e)}")
            return {}
