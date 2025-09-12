"""
Configuration for IBM WatsonX Orchestrate Sample Project
"""

import os
from typing import Dict, Any

class SampleWatsonConfig:
    """Configuration class for the sample Watson project"""
    
    def __init__(self):
        # Load environment variables - simplified for API key only
        self.environment_name = os.getenv('WATSON_ENV_NAME', 'sample-watson-dev')
        self.env_type = os.getenv('WATSON_ENV_TYPE', 'mcsp')
        self.service_url = os.getenv('WATSON_SERVICE_URL', '')
        self.api_key = os.getenv('WATSON_API_KEY', '')
        self.project_id = os.getenv('WATSON_PROJECT_ID', '')
        
        # LLM Model configurations
        self.default_llm = os.getenv('WATSON_DEFAULT_LLM', 'watsonx/meta-llama/llama-3-2-90b-vision-instruct')
        self.granite_model = os.getenv('WATSON_GRANITE_MODEL', 'watsonx/ibm/granite-3.0-20b-instruct')
        
        # Agent configurations
        self.agent_style = os.getenv('WATSON_AGENT_STYLE', 'react')
        self.max_collaborators = int(os.getenv('WATSON_MAX_COLLABORATORS', '3'))
        
        # Tool configurations
        self.tool_timeout = int(os.getenv('WATSON_TOOL_TIMEOUT', '300'))
        self.max_retries = int(os.getenv('WATSON_MAX_RETRIES', '3'))
        
        # Logging configurations
        self.log_level = os.getenv('WATSON_LOG_LEVEL', 'INFO')
        self.enable_debug = os.getenv('WATSON_ENABLE_DEBUG', 'false').lower() == 'true'
        
        # Sample project configurations
        self.project_name = os.getenv('SAMPLE_PROJECT_NAME', 'Sample Watson Agent')
        self.project_description = os.getenv('SAMPLE_PROJECT_DESCRIPTION', 'A basic IBM watsonx Orchestrate agent for learning and testing')
        
        # Agent configurations for the sample
        self.agent_configs = {
            "basic_chat_agent": {
                "name": "Basic_Chat_Agent",
                "description": "A simple chat agent for basic conversations",
                "llm": self.default_llm,
                "style": "default"
            },
            "task_assistant_agent": {
                "name": "Task_Assistant_Agent",
                "description": "An agent that helps with task management and planning",
                "llm": self.granite_model,
                "style": "react"
            },
            "data_analyzer_agent": {
                "name": "Data_Analyzer_Agent",
                "description": "An agent that analyzes data and provides insights",
                "llm": self.granite_model,
                "style": "react"
            }
        }
        
        # Tool configurations for the sample
        self.tool_configs = {
            "calculator": {
                "name": "calculator_tool",
                "description": "Performs basic mathematical calculations"
            },
            "text_processor": {
                "name": "text_processor_tool",
                "description": "Processes and analyzes text content"
            },
            "data_processor": {
                "name": "data_processor_tool",
                "description": "Processes and analyzes structured data"
            }
        }
    
    def get_agent_config(self, agent_type: str) -> Dict[str, Any]:
        """Get configuration for a specific agent type"""
        return self.agent_configs.get(agent_type, {})
    
    def get_tool_config(self, tool_type: str) -> Dict[str, Any]:
        """Get configuration for a specific tool type"""
        return self.tool_configs.get(tool_type, {})
    
    def is_configured(self) -> bool:
        """Check if Watson configuration is complete - only API key required"""
        return bool(self.api_key)
    
    def get_environment_vars(self) -> Dict[str, str]:
        """Get environment variables for orchestrate CLI - simplified for API key only"""
        return {
            'WO_DEVELOPER_EDITION_SOURCE': 'mcsp',
            'WO_API_KEY': self.api_key
        }

# Global configuration instance
config = SampleWatsonConfig()
