import json
from typing import List, Dict
from datetime import datetime
import logging
import random

class MonitoringAgent:
    """
    Monitoring Agent for tracking project performance and detecting issues
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def monitor_project(self, project_id: str, project_data: Dict) -> Dict:
        """Monitor a single project"""
        try:
            # Simulate monitoring data
            progress = random.uniform(0.6, 0.9)
            budget_spent = random.uniform(0.7, 0.95)
            
            # Determine status
            if progress >= 0.8 and budget_spent <= 0.9:
                status = "On Track"
            elif progress >= 0.6 and budget_spent <= 0.95:
                status = "Minor Issues"
            else:
                status = "At Risk"
            
            # Generate alerts
            alerts = []
            if budget_spent > 0.9:
                alerts.append({
                    'type': 'budget_overrun',
                    'message': f"Budget overrun: {budget_spent*100:.1f}% spent"
                })
            
            if progress < 0.7:
                alerts.append({
                    'type': 'schedule_delay',
                    'message': f"Behind schedule: {progress*100:.1f}% complete"
                })
            
            return {
                'project_id': project_id,
                'project_name': project_data.get('name', 'Unknown'),
                'status': status,
                'progress': progress,
                'budget_spent': budget_spent,
                'alerts': alerts,
                'monitoring_date': datetime.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Error monitoring project: {str(e)}")
            return {}
    
    def batch_monitor_projects(self, projects: List[Dict]) -> Dict:
        """Monitor multiple projects"""
        try:
            results = []
            for project in projects:
                result = self.monitor_project(project.get('id'), project)
                if result:
                    results.append(result)
            
            return {
                'monitoring_results': results,
                'summary': {
                    'total_projects': len(results),
                    'on_track': len([r for r in results if r.get('status') == 'On Track']),
                    'at_risk': len([r for r in results if r.get('status') == 'At Risk'])
                },
                'generated_at': datetime.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Error in batch monitoring: {str(e)}")
            return {}
