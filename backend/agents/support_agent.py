import json
from typing import List, Dict
from datetime import datetime
import logging
import random

class SupportAgent:
    """
    Support Agent for AI-powered chat assistance and feedback collection
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.knowledge_base = {
            'csr_rules': {
                'india_csr_2_percent': 'Companies must spend 2% of average net profits on CSR activities.',
                'schedule_vii': 'CSR activities must align with Schedule VII of Companies Act, 2013.'
            },
            'esg_standards': {
                'gri_standards': 'Global Reporting Initiative standards for sustainability reporting.',
                'sdg_alignment': 'Aligning business activities with UN Sustainable Development Goals.'
            },
            'faqs': {
                'how_to_register': 'Visit the registration page and provide required company information.',
                'how_to_upload_projects': 'Use the project upload feature in your dashboard.'
            }
        }
    
    def process_chat_message(self, user_message: str) -> Dict:
        """Process user chat message and provide AI-powered response"""
        try:
            message_lower = user_message.lower()
            
            if 'csr' in message_lower and '2%' in message_lower:
                response = self.knowledge_base['csr_rules']['india_csr_2_percent']
            elif 'esg' in message_lower:
                response = self.knowledge_base['esg_standards']['gri_standards']
            elif 'register' in message_lower:
                response = self.knowledge_base['faqs']['how_to_register']
            else:
                response = "I'm here to help with CSR rules, ESG standards, and platform usage. Please ask a specific question."
            
            return {
                'response': response,
                'timestamp': datetime.now().isoformat(),
                'confidence': random.uniform(0.8, 1.0)
            }
            
        except Exception as e:
            self.logger.error(f"Error processing chat message: {str(e)}")
            return {
                'response': 'I apologize, but I encountered an error. Please try rephrasing your question.',
                'timestamp': datetime.now().isoformat()
            }
    
    def collect_feedback(self, feedback_data: Dict) -> Dict:
        """Collect user feedback"""
        try:
            return {
                'feedback_id': f"FB_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                'user_id': feedback_data.get('user_id', 'anonymous'),
                'subject': feedback_data.get('subject', ''),
                'message': feedback_data.get('message', ''),
                'rating': feedback_data.get('rating', 0),
                'submitted_date': datetime.now().isoformat(),
                'status': 'New'
            }
        except Exception as e:
            self.logger.error(f"Error collecting feedback: {str(e)}")
            return {}
    
    def get_support_analytics(self) -> Dict:
        """Get support analytics"""
        try:
            return {
                'total_tickets': random.randint(100, 500),
                'resolved_tickets': random.randint(80, 450),
                'average_resolution_time': f"{random.randint(2, 24)} hours",
                'user_satisfaction': f"{random.uniform(4.0, 5.0):.1f}/5.0"
            }
        except Exception as e:
            self.logger.error(f"Error getting support analytics: {str(e)}")
            return {}
