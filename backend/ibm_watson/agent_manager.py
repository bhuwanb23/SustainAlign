"""
IBM WatsonX Orchestrate Agent Manager
Handles creation, deployment, and management of AI agents
"""

import os
import yaml
import subprocess
import logging
from typing import Dict, List, Any, Optional
from pathlib import Path

from .config import watson_config

logger = logging.getLogger(__name__)

class WatsonAgentManager:
    """Manages IBM WatsonX Orchestrate agents"""
    
    def __init__(self):
        self.config = watson_config
        base_dir = Path(__file__).parent
        self.agents_dir = base_dir / "agents"
        self.tools_dir = base_dir / "tools"
        self.agents_dir.mkdir(parents=True, exist_ok=True)
        self.tools_dir.mkdir(parents=True, exist_ok=True)
    
    def create_agent_yaml(self, agent_type: str, custom_config: Optional[Dict] = None) -> str:
        """Create YAML configuration file for an agent"""
        base_config = self.config.get_agent_config(agent_type)
        if not base_config:
            raise ValueError(f"Unknown agent type: {agent_type}")
        
        # Merge with custom configuration
        if custom_config:
            base_config.update(custom_config)
        
        agent_spec = {
            "spec_version": "v1",
            "kind": "native",
            "name": base_config["name"],
            "description": base_config["description"],
            "instructions": self._get_agent_instructions(agent_type),
            "llm": base_config["llm"],
            "style": base_config["style"],
            "collaborators": [],
            "tools": self._get_agent_tools(agent_type)
        }
        
        # Write YAML file
        yaml_file = self.agents_dir / f"{agent_type}_agent.yaml"
        with open(yaml_file, 'w') as f:
            yaml.dump(agent_spec, f, default_flow_style=False)
        
        logger.info(f"Created agent YAML: {yaml_file}")
        return str(yaml_file)
    
    def _get_agent_instructions(self, agent_type: str) -> str:
        """Get specific instructions for each agent type"""
        instructions = {
            "csr_matching_agent": """
You are a CSR Matching Agent for the SustainAlign platform. Your role is to:

1. Analyze company CSR objectives and priorities
2. Match them with available NGO projects and initiatives
3. Evaluate alignment based on:
   - SDG (Sustainable Development Goals) focus areas
   - Geographic alignment
   - Budget compatibility
   - Impact potential
   - Risk assessment

4. Provide detailed matching scores and recommendations
5. Explain the rationale behind each match
6. Suggest optimization strategies for better alignment

Always consider both quantitative metrics and qualitative factors in your analysis.
""",
            "project_evaluation_agent": """
You are a Project Evaluation Agent for the SustainAlign platform. Your role is to:

1. Evaluate CSR project proposals and existing projects
2. Assess project feasibility, impact potential, and sustainability
3. Analyze:
   - Project objectives and alignment with SDGs
   - Implementation timeline and milestones
   - Resource requirements and budget
   - Risk factors and mitigation strategies
   - Expected outcomes and success metrics

4. Provide comprehensive evaluation reports
5. Recommend project improvements and optimizations
6. Assess project scalability and long-term viability

Focus on evidence-based evaluation and provide actionable insights.
""",
            "decision_support_agent": """
You are a Decision Support Agent for the SustainAlign platform. Your role is to:

1. Provide strategic decision support for CSR investments
2. Analyze multiple project options and scenarios
3. Consider:
   - ROI and impact metrics
   - Risk-return profiles
   - Portfolio optimization
   - Stakeholder interests
   - Long-term strategic alignment

4. Generate decision matrices and recommendations
5. Provide scenario analysis and what-if modeling
6. Support executive decision-making with data-driven insights

Always present multiple options with clear pros and cons for informed decision-making.
""",
            "impact_assessment_agent": """
You are an Impact Assessment Agent for the SustainAlign platform. Your role is to:

1. Assess social and environmental impact of CSR projects
2. Measure and predict impact across multiple dimensions:
   - Social impact (community development, education, health)
   - Environmental impact (carbon footprint, resource conservation)
   - Economic impact (job creation, local development)
   - Long-term sustainability

3. Develop impact measurement frameworks
4. Create impact dashboards and reports
5. Track progress against SDG targets
6. Provide recommendations for impact optimization

Focus on measurable, verifiable impact metrics and long-term sustainability.
"""
        }
        return instructions.get(agent_type, "You are an AI agent for the SustainAlign platform.")
    
    def _get_agent_tools(self, agent_type: str) -> List[str]:
        """Get list of tools for each agent type"""
        tool_mapping = {
            "csr_matching_agent": ["project_analyzer_tool", "impact_calculator_tool"],
            "project_evaluation_agent": ["project_analyzer_tool", "risk_assessor_tool"],
            "decision_support_agent": ["budget_optimizer_tool", "risk_assessor_tool"],
            "impact_assessment_agent": ["impact_calculator_tool", "project_analyzer_tool"]
        }
        return tool_mapping.get(agent_type, [])
    
    def create_tool_yaml(self, tool_type: str, custom_config: Optional[Dict] = None) -> str:
        """Create YAML configuration file for a tool"""
        base_config = self.config.get_tool_config(tool_type)
        if not base_config:
            raise ValueError(f"Unknown tool type: {tool_type}")
        
        # Merge with custom configuration
        if custom_config:
            base_config.update(custom_config)
        
        tool_spec = {
            "spec_version": "v1",
            "kind": "tool",
            "name": base_config["name"],
            "description": base_config["description"],
            "implementation": {
                "type": "python",
                "entry_point": f"{tool_type}_function"
            },
            "parameters": self._get_tool_parameters(tool_type)
        }
        
        # Write YAML file
        yaml_file = self.tools_dir / f"{tool_type}_tool.yaml"
        with open(yaml_file, 'w') as f:
            yaml.dump(tool_spec, f, default_flow_style=False)
        
        logger.info(f"Created tool YAML: {yaml_file}")
        return str(yaml_file)
    
    def _get_tool_parameters(self, tool_type: str) -> Dict[str, Any]:
        """Get parameter schema for each tool type"""
        parameters = {
            "project_analyzer": {
                "type": "object",
                "properties": {
                    "project_data": {"type": "object", "description": "Project information"},
                    "company_profile": {"type": "object", "description": "Company CSR profile"},
                    "analysis_type": {"type": "string", "enum": ["alignment", "feasibility", "impact"]}
                },
                "required": ["project_data", "company_profile"]
            },
            "impact_calculator": {
                "type": "object", 
                "properties": {
                    "project_metrics": {"type": "object", "description": "Project impact metrics"},
                    "baseline_data": {"type": "object", "description": "Baseline impact data"},
                    "timeframe": {"type": "string", "description": "Assessment timeframe"}
                },
                "required": ["project_metrics"]
            },
            "risk_assessor": {
                "type": "object",
                "properties": {
                    "project_data": {"type": "object", "description": "Project information"},
                    "risk_factors": {"type": "array", "description": "Known risk factors"},
                    "mitigation_strategies": {"type": "array", "description": "Existing mitigation strategies"}
                },
                "required": ["project_data"]
            },
            "budget_optimizer": {
                "type": "object",
                "properties": {
                    "available_budget": {"type": "number", "description": "Total available budget"},
                    "project_list": {"type": "array", "description": "List of candidate projects"},
                    "constraints": {"type": "object", "description": "Budget constraints and preferences"}
                },
                "required": ["available_budget", "project_list"]
            }
        }
        return parameters.get(tool_type, {})
    
    def deploy_agent(self, agent_type: str) -> bool:
        """Deploy an agent to WatsonX Orchestrate"""
        try:
            # Create agent YAML
            yaml_file = self.create_agent_yaml(agent_type)
            
            # Import agent using orchestrate CLI
            cmd = ["orchestrate", "agents", "import", "-f", yaml_file]
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                logger.info(f"Successfully deployed agent: {agent_type}")
                return True
            else:
                logger.error(f"Failed to deploy agent {agent_type}: {result.stderr}")
                return False
                
        except Exception as e:
            logger.error(f"Error deploying agent {agent_type}: {str(e)}")
            return False
    
    def deploy_tool(self, tool_type: str) -> bool:
        """Deploy a tool to WatsonX Orchestrate"""
        try:
            # Create tool YAML
            yaml_file = self.create_tool_yaml(tool_type)
            
            # Import tool using orchestrate CLI
            cmd = ["orchestrate", "tools", "import", "-f", yaml_file]
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                logger.info(f"Successfully deployed tool: {tool_type}")
                return True
            else:
                logger.error(f"Failed to deploy tool {tool_type}: {result.stderr}")
                return False
                
        except Exception as e:
            logger.error(f"Error deploying tool {tool_type}: {str(e)}")
            return False
    
    def list_agents(self) -> List[Dict[str, Any]]:
        """List all deployed agents"""
        try:
            cmd = ["orchestrate", "agents", "list"]
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                # Parse the output to extract agent information
                agents = []
                lines = result.stdout.strip().split('\n')
                for line in lines[1:]:  # Skip header
                    if line.strip():
                        parts = line.split()
                        if len(parts) >= 2:
                            agents.append({
                                "name": parts[0],
                                "status": parts[1] if len(parts) > 1 else "unknown"
                            })
                return agents
            else:
                logger.error(f"Failed to list agents: {result.stderr}")
                return []
                
        except Exception as e:
            logger.error(f"Error listing agents: {str(e)}")
            return []
    
    def setup_environment(self) -> bool:
        """Set up WatsonX Orchestrate environment"""
        try:
            if not self.config.is_configured():
                logger.error("Watson configuration is incomplete")
                return False
            
            # Add environment
            cmd = [
                "orchestrate", "env", "add",
                "-n", self.config.environment_name,
                "-u", self.config.service_url,
                "--type", self.config.env_type,
                "--activate"
            ]
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                logger.info("Successfully set up Watson environment")
                return True
            else:
                logger.error(f"Failed to setup environment: {result.stderr}")
                return False
                
        except Exception as e:
            logger.error(f"Error setting up environment: {str(e)}")
            return False

# Global agent manager instance
agent_manager = WatsonAgentManager()
