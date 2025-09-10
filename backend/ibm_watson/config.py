"""
Configuration for IBM WatsonX Orchestrate ADK
"""

import os
from typing import Dict, Any

class WatsonConfig:
    """Configuration class for IBM WatsonX Orchestrate ADK"""
    
    def __init__(self):
        self.environment_name = os.getenv('WATSON_ENV_NAME', 'sustainalign-dev')
        self.service_url = os.getenv('WATSON_SERVICE_URL', '')
        self.api_key = os.getenv('WATSON_API_KEY', '')
        self.project_id = os.getenv('WATSON_PROJECT_ID', '')
        
        # LLM Model configurations
        self.default_llm = "watsonx/meta-llama/llama-3-2-90b-vision-instruct"
        self.granite_models = {
            "granite-3.0-8b-instruct": "watsonx/ibm/granite-3.0-8b-instruct",
            "granite-3.0-20b-instruct": "watsonx/ibm/granite-3.0-20b-instruct",
            "granite-3.0-70b-instruct": "watsonx/ibm/granite-3.0-70b-instruct"
        }
        
        # Agent configurations
        self.agent_configs = {
            "csr_matching_agent": {
                "name": "CSR_Matching_Agent",
                "description": "Agent for matching CSR projects with company objectives",
                "llm": self.granite_models["granite-3.0-20b-instruct"],
                "style": "react"
            },
            "project_evaluation_agent": {
                "name": "Project_Evaluation_Agent", 
                "description": "Agent for evaluating project impact and feasibility",
                "llm": self.granite_models["granite-3.0-20b-instruct"],
                "style": "react"
            },
            "decision_support_agent": {
                "name": "Decision_Support_Agent",
                "description": "Agent for providing decision support and recommendations",
                "llm": self.granite_models["granite-3.0-70b-instruct"],
                "style": "react"
            },
            "impact_assessment_agent": {
                "name": "Impact_Assessment_Agent",
                "description": "Agent for assessing social and environmental impact",
                "llm": self.granite_models["granite-3.0-20b-instruct"],
                "style": "react"
            }
        }
        
        # Tool configurations
        self.tool_configs = {
            "project_analyzer": {
                "name": "project_analyzer_tool",
                "description": "Analyzes CSR projects for alignment with company goals"
            },
            "impact_calculator": {
                "name": "impact_calculator_tool", 
                "description": "Calculates social and environmental impact metrics"
            },
            "risk_assessor": {
                "name": "risk_assessor_tool",
                "description": "Assesses project risks and mitigation strategies"
            },
            "budget_optimizer": {
                "name": "budget_optimizer_tool",
                "description": "Optimizes budget allocation across multiple projects"
            }
        }
    
    def get_agent_config(self, agent_type: str) -> Dict[str, Any]:
        """Get configuration for a specific agent type"""
        return self.agent_configs.get(agent_type, {})
    
    def get_tool_config(self, tool_type: str) -> Dict[str, Any]:
        """Get configuration for a specific tool type"""
        return self.tool_configs.get(tool_type, {})
    
    def is_configured(self) -> bool:
        """Check if Watson configuration is complete"""
        return all([
            self.service_url,
            self.api_key,
            self.project_id
        ])

# Global configuration instance
watson_config = WatsonConfig()
