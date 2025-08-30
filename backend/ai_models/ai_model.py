import requests
import json
import os
from typing import Dict, List, Optional, Any
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIModel:
    def __init__(self):
        self.api_key = os.getenv('OPENROUTER_API_KEY')
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"
        self.model = "qwen/qwen3-coder:free"  # Can be changed to other models
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": os.getenv('SITE_URL', 'https://sustainalign.com'),
            "X-Title": os.getenv('SITE_NAME', 'SustainAlign'),
        }
    
    def _make_request(self, messages: List[Dict], temperature: float = 0.7) -> Optional[Dict]:
        """Make a request to OpenRouter API"""
        try:
            payload = {
                "model": self.model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": 4000
            }
            
            response = requests.post(
                url=self.base_url,
                headers=self.headers,
                data=json.dumps(payload),
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"API request failed: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            logger.error(f"Error making API request: {str(e)}")
            return None
    
    def generate_project_matching_rationale(self, company_data: Dict, projects_data: List[Dict]) -> Optional[Dict]:
        """
        Generate AI-powered project matching rationale
        
        Args:
            company_data: Company details including budget, focus areas, etc.
            projects_data: List of available projects
            
        Returns:
            Dict containing the rationale analysis in structured format
        """
        
        # Prepare the prompt for project matching
        prompt = self._create_project_matching_prompt(company_data, projects_data)
        
        messages = [
            {
                "role": "system",
                "content": """You are an expert ESG consultant and CSR advisor. Your task is to analyze corporate companies and match them with the most suitable sustainability projects based on their profile, budget, focus areas, and strategic objectives.

You must respond ONLY with valid JSON in the following format:
{
  "selectedProjectId": "integer",
  "confidenceScore": "float between 0-1",
  "title": "string",
  "context": {
    "companyProfile": "string",
    "matchingCriteria": "string",
    "strategicAlignment": "string"
  },
  "criteria": {
    "impact": "float between 0-1",
    "cost": "float between 0-1", 
    "risk": "float between 0-1",
    "alignment": "float between 0-1",
    "feasibility": "float between 0-1"
  },
  "options": [
    {
      "key": "project_id",
      "label": "Project Title",
      "data": {
        "projectId": "integer",
        "score": "float",
        "strengths": ["array of strings"],
        "concerns": ["array of strings"]
      }
    }
  ],
  "selectedOption": "project_id",
  "pros": [
    "string describing benefits"
  ],
  "cons": [
    "string describing concerns"
  ],
  "reasoningSteps": [
    "string describing analysis step"
  ],
  "scoreBreakdown": {
    "project_id": {
      "impact": "float",
      "cost": "float",
      "risk": "float",
      "alignment": "float",
      "feasibility": "float",
      "total": "float"
      }
    }
  }

Ensure all scores are between 0 and 1, and provide detailed reasoning for your recommendations."""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
        
        # Make API request
        response = self._make_request(messages, temperature=0.3)
        
        if response and 'choices' in response:
            try:
                content = response['choices'][0]['message']['content']
                # Parse JSON response
                rationale_data = json.loads(content)
                
                # Validate and clean the response
                rationale_data = self._validate_rationale_response(rationale_data)
                
                logger.info(f"Successfully generated rationale for company {company_data.get('company_name', 'Unknown')}")
                return rationale_data
                
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON response: {str(e)}")
                return None
            except Exception as e:
                logger.error(f"Error processing rationale response: {str(e)}")
                return None
        
        return None
    
    def _create_project_matching_prompt(self, company_data: Dict, projects_data: List[Dict]) -> str:
        """Create a detailed prompt for project matching analysis"""
        
        # Extract key company information
        company_name = company_data.get('company_name', 'Unknown Company')
        industry = company_data.get('industry', 'Unknown')
        budget_amount = company_data.get('budget', {}).get('amount', 0)
        budget_currency = company_data.get('budget', {}).get('currency', 'INR')
        priority_sdgs = company_data.get('focus_area', {}).get('priority_sdgs', [])
        esg_goals = company_data.get('focus_area', {}).get('esg_goals', '')
        risk_appetite = company_data.get('ai_config', {}).get('risk_appetite', 'Medium')
        
        # Format projects data
        projects_info = []
        for project in projects_data:
            project_info = f"""
Project ID: {project.get('id')}
Title: {project.get('title')}
NGO: {project.get('ngo_name')}
Location: {project.get('location_city', '')}, {project.get('location_country', '')}
Budget: {project.get('currency', 'INR')} {project.get('funding_required', 0)}
Duration: {project.get('duration_months', 0)} months
SDG Goals: {', '.join(map(str, project.get('sdg_goals', [])))}
Focus Areas: {', '.join(project.get('csr_focus_areas', []))}
Target Beneficiaries: {', '.join(project.get('target_beneficiaries', []))}
Description: {project.get('short_description', '')}
NGO Rating: {project.get('ngo_rating', 'N/A')}/5
Status: {project.get('status', 'unknown')}
"""
            projects_info.append(project_info)
        
        prompt = f"""
Please analyze the following corporate company and match them with the most suitable sustainability project from the available options.

COMPANY PROFILE:
- Company Name: {company_name}
- Industry: {industry}
- Budget: {budget_currency} {budget_amount:,.2f}
- Priority SDGs: {', '.join(priority_sdgs) if priority_sdgs else 'Not specified'}
- ESG Goals: {esg_goals if esg_goals else 'Not specified'}
- Risk Appetite: {risk_appetite}

AVAILABLE PROJECTS:
{chr(10).join(projects_info)}

ANALYSIS REQUIREMENTS:
1. Evaluate each project based on:
   - Budget alignment (project cost vs company budget)
   - SDG alignment (project SDGs vs company priority SDGs)
   - Geographic fit (project location vs company presence)
   - NGO credibility (rating, past performance)
   - Risk level (project complexity vs company risk appetite)
   - Impact potential (expected outcomes and KPIs)

2. Score each project on a scale of 0-1 for:
   - Impact (environmental/social impact potential)
   - Cost (budget efficiency and value for money)
   - Risk (project complexity and execution risk)
   - Alignment (strategic fit with company goals)
   - Feasibility (likelihood of successful execution)

3. Select the best matching project and provide detailed rationale.

4. Consider the company's industry, budget constraints, and strategic objectives in your analysis.

Please provide your analysis in the specified JSON format with detailed reasoning for your recommendations.
"""
        
        return prompt
    
    def _validate_rationale_response(self, rationale_data: Dict) -> Dict:
        """Validate and clean the rationale response"""
        
        # Ensure required fields exist
        required_fields = ['selectedProjectId', 'confidenceScore', 'title', 'context', 'criteria', 'options', 'selectedOption', 'pros', 'cons', 'reasoningSteps', 'scoreBreakdown']
        
        for field in required_fields:
            if field not in rationale_data:
                rationale_data[field] = None if field in ['selectedProjectId', 'selectedOption'] else [] if field in ['options', 'pros', 'cons', 'reasoningSteps'] else {} if field in ['context', 'criteria', 'scoreBreakdown'] else ""
        
        # Ensure scores are within valid range
        if 'confidenceScore' in rationale_data:
            rationale_data['confidenceScore'] = max(0, min(1, float(rationale_data['confidenceScore'])))
        
        if 'criteria' in rationale_data:
            for key in rationale_data['criteria']:
                if isinstance(rationale_data['criteria'][key], (int, float)):
                    rationale_data['criteria'][key] = max(0, min(1, float(rationale_data['criteria'][key])))
        
        # Validate score breakdown
        if 'scoreBreakdown' in rationale_data:
            for project_id, scores in rationale_data['scoreBreakdown'].items():
                for score_key, score_value in scores.items():
                    if isinstance(score_value, (int, float)):
                        scores[score_key] = max(0, min(1, float(score_value)))
        
        return rationale_data
    
    def generate_custom_rationale(self, prompt: str, context: Dict = None) -> Optional[Dict]:
        """Generate custom rationale based on specific prompt"""
        
        messages = [
            {
                "role": "system",
                "content": "You are an expert ESG consultant. Provide detailed analysis and recommendations in JSON format."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
        
        if context:
            messages.insert(1, {
                "role": "system",
                "content": f"Context: {json.dumps(context)}"
            })
        
        response = self._make_request(messages)
        
        if response and 'choices' in response:
            try:
                content = response['choices'][0]['message']['content']
                return json.loads(content)
            except json.JSONDecodeError:
                logger.error("Failed to parse custom rationale response")
                return None
        
        return None

# Global instance
ai_model = AIModel()