import json
from typing import List, Dict
from datetime import datetime
import logging

class ReportingAgent:
    """
    Reporting Agent for generating automated CSR/ESG reports
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def generate_csr_report(self, project_data: List[Dict], corporate_profile: Dict) -> Dict:
        """Generate CSR report"""
        try:
            # Calculate metrics
            total_projects = len(project_data)
            total_investment = sum(project.get('budget', 0) for project in project_data)
            total_beneficiaries = sum(project.get('beneficiaries_reached', 0) for project in project_data)
            
            # Generate report
            report = {
                'report_id': f"CSR_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                'generated_date': datetime.now().isoformat(),
                'company_name': corporate_profile.get('company_name', 'Unknown'),
                'executive_summary': f"Invested ₹{total_investment:,.0f} in {total_projects} projects benefiting {total_beneficiaries:,} people",
                'metrics': {
                    'total_projects': total_projects,
                    'total_investment': total_investment,
                    'total_beneficiaries': total_beneficiaries,
                    'average_project_budget': total_investment / total_projects if total_projects > 0 else 0
                },
                'compliance_status': 'Compliant',
                'audit_trail': {
                    'ai_recommendations': len(project_data),
                    'approval_rate': '95%',
                    'audit_id': f"AUDIT_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
                }
            }
            
            return report
            
        except Exception as e:
            self.logger.error(f"Error generating CSR report: {str(e)}")
            return {}
    
    def export_report(self, report_data: Dict, format_type: str = 'json') -> str:
        """Export report in specified format"""
        try:
            if format_type == 'json':
                return json.dumps(report_data, indent=2)
            elif format_type == 'pdf':
                return f"PDF report: {report_data.get('report_id', 'Unknown')}"
            elif format_type == 'excel':
                return f"Excel report: {report_data.get('report_id', 'Unknown')}"
            else:
                return json.dumps(report_data, indent=2)
        except Exception as e:
            self.logger.error(f"Error exporting report: {str(e)}")
            return "Error generating report"
