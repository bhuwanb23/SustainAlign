import requests
import json
import os
from typing import Dict, List, Optional, Any
from datetime import datetime
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIModel:
    def __init__(self):
        # Load environment variables again to ensure they're available
        load_dotenv()
        
        self.api_key = os.getenv('OPENROUTER_API_KEY')
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"
        self.model = "openai/gpt-oss-20b:free"  # Use the working model from test_model.py
        
        # Debug: Check environment variable
        logger.info(f"OpenRouter API Key loaded: {self.api_key is not None}")
        logger.info(f"API Key value: {self.api_key[:20] if self.api_key else 'NOT_SET'}...")
        
        # Use exact same headers as working test_model.py
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
    
    def _make_request(self, messages: List[Dict], temperature: float = 0.7) -> Optional[requests.Response]:
        """Make a request to OpenRouter API"""
        try:
            payload = {
                "model": self.model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": 4000
            }
            
            # Debug: Print headers being sent
            logger.info(f"Making request to OpenRouter API with headers: {self.headers}")
            logger.info(f"API Key present: {'Authorization' in self.headers}")
            logger.info(f"API Key value: {self.headers.get('Authorization', 'NOT_SET')[:20]}...")
            
            response = requests.post(
                url=self.base_url,
                headers=self.headers,
                data=json.dumps(payload),
                timeout=30
            )
            
            # Always return the response object, regardless of status code
            # This allows the caller to check status_code and access error details
            return response
                
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
        
        # Try to generate with real AI first
        try:
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
            
            if response is None:
                # Network or connection error
                logger.error("Failed to make API request due to network/connection error")
                return self._generate_mock_rationale_with_error(company_data, projects_data, "Network Error", "Unable to connect to AI service. Please check your internet connection and try again.")
            
            if response.status_code == 200:
                # Success - process the AI response
                try:
                    response_data = response.json()
                    if 'choices' in response_data:
                        content = response_data['choices'][0]['message']['content']
                        
                        # Extract JSON from the response content
                        json_start = content.find('```json')
                        if json_start != -1:
                            # Find the JSON block
                            json_content_start = json_start + 7  # Skip ```json
                            json_content_end = content.find('```', json_content_start)
                            if json_content_end != -1:
                                json_content = content[json_content_start:json_content_end].strip()
                                logger.info(f"Extracted JSON content: {json_content[:100]}...")
                            else:
                                # Try to find just the JSON part
                                json_content = content[json_content_start:].strip()
                        else:
                            # Try to find JSON without markdown
                            json_start = content.find('{')
                            if json_start != -1:
                                json_content = content[json_start:].strip()
                            else:
                                json_content = content
                        
                        # Parse JSON response
                        rationale_data = json.loads(json_content)
                        
                        # Validate and clean the response
                        rationale_data = self._validate_rationale_response(rationale_data)
                        
                        logger.info(f"Successfully generated rationale for company {company_data.get('company_name', 'Unknown')}")
                        return rationale_data
                        
                    else:
                        logger.error("API response missing 'choices' field")
                        return self._generate_mock_rationale_with_error(company_data, projects_data, "Invalid AI Response", "The AI service returned an unexpected response format.")
                        
                except json.JSONDecodeError as e:
                    logger.error(f"Failed to parse JSON response: {str(e)}")
                    logger.error(f"Raw API response content: {content}")
                    logger.error(f"Attempted to parse: {json_content}")
                    logger.error(f"Full API response: {response_data}")
                    # Fall back to mock data with error info
                    logger.info("Falling back to mock AI response due to JSON parsing error")
                    return self._generate_mock_rationale_with_error(company_data, projects_data, "AI Response Parsing Failed", "The AI generated a response but it couldn't be parsed properly. This may indicate an issue with the AI model's output format.")
                except Exception as e:
                    logger.error(f"Error processing rationale response: {str(e)}")
                    # Fall back to mock data with error info
                    logger.info("Falling back to mock AI response due to processing error")
                    return self._generate_mock_rationale_with_error(company_data, projects_data, "AI Response Processing Failed", f"Error processing AI response: {str(e)}")
            
            else:
                # API request failed with non-200 status
                logger.warning(f"OpenRouter API request failed with status {response.status_code}")
                logger.error(f"API response content: {response.text}")
                
                # Determine specific error reason based on status code
                error_reason = "Unknown API Error"
                error_details = "The AI service is currently unavailable"
                
                if response.status_code == 401:
                    error_reason = "Authentication Failed"
                    error_details = "API key is invalid, expired, or account has restrictions. Please check your OpenRouter account and API key."
                elif response.status_code == 403:
                    error_reason = "Access Denied"
                    error_details = "Your account doesn't have permission to access this service or model."
                elif response.status_code == 404:
                    error_reason = "Service Not Found"
                    error_details = "The requested AI model or service is not available with your current account plan."
                elif response.status_code == 429:
                    error_reason = "Rate Limit Exceeded"
                    error_details = "Too many requests. Please wait before trying again."
                elif response.status_code == 500:
                    error_reason = "AI Service Error"
                    error_details = "The AI service is experiencing technical difficulties."
                elif response.status_code == 503:
                    error_reason = "Service Unavailable"
                    error_details = "The AI service is temporarily unavailable."
                else:
                    error_reason = f"API Error {response.status_code}"
                    error_details = f"Unexpected error from AI service: {response.text}"
                
                return self._generate_mock_rationale_with_error(company_data, projects_data, error_reason, error_details)
            
        except Exception as e:
            logger.error(f"Error in AI rationale generation: {str(e)}")
            # Fall back to mock data with error info
            logger.info("Falling back to mock AI response due to exception")
            return self._generate_mock_rationale_with_error(company_data, projects_data, "AI Service Exception", f"Unexpected error occurred: {str(e)}")
    
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

    def _generate_mock_rationale(self, company_data: Dict, projects_data: List[Dict]) -> Dict:
        """Generate a realistic mock rationale when AI API is unavailable"""
        logger.info("Generating mock AI rationale...")
        
        # Select the first project as default
        selected_project = projects_data[0] if projects_data else {}
        
        return {
            "selectedProjectId": selected_project.get('id', 1),
            "confidenceScore": 0.85,
            "title": f"AI-Powered Project Matching Analysis for {company_data.get('company_name', 'Company')}",
            "context": {
                "companyProfile": f"Analysis of {company_data.get('company_name', 'Company')} in {company_data.get('industry', 'Technology')} sector",
                "matchingCriteria": "Based on budget alignment, SDG goals, and strategic objectives",
                "strategicAlignment": "High alignment with company's sustainability goals and budget constraints"
            },
            "criteria": {
                "impact": 0.88,
                "cost": 0.92,
                "risk": 0.75,
                "alignment": 0.90,
                "feasibility": 0.85
            },
            "options": [
                {
                    "key": str(project.get('id', i)),
                    "label": project.get('title', f'Project {i}'),
                    "data": {
                        "projectId": project.get('id', i),
                        "score": 0.8 + (i * 0.05),
                        "strengths": ["Strong SDG alignment", "Within budget range", "Good NGO rating"],
                        "concerns": ["Medium complexity", "Requires careful monitoring"]
                    }
                } for i, project in enumerate(projects_data[:3], 1)
            ],
            "selectedOption": str(selected_project.get('id', 1)),
            "pros": [
                "Excellent budget alignment with company CSR budget",
                "Strong SDG goal alignment with company priorities",
                "High NGO credibility and past performance",
                "Geographic fit with company presence",
                "Measurable impact metrics and KPIs"
            ],
            "cons": [
                "Medium project complexity requires careful planning",
                "Timeline may need adjustment for company schedule",
                "Requires dedicated CSR team oversight"
            ],
            "reasoningSteps": [
                "Analyzed company budget constraints and project costs",
                "Evaluated SDG alignment with company sustainability goals",
                "Assessed NGO credibility and past performance",
                "Considered geographic and operational fit",
                "Calculated risk-adjusted return on investment"
            ],
            "scoreBreakdown": {
                str(project.get('id', i)): {
                    "impact": 0.8 + (i * 0.05),
                    "cost": 0.85 + (i * 0.03),
                    "risk": 0.7 + (i * 0.02),
                    "alignment": 0.9 + (i * 0.02),
                    "feasibility": 0.8 + (i * 0.03),
                    "total": 0.8 + (i * 0.03)
                } for i, project in enumerate(projects_data[:3], 1)
            }
        }

    def _generate_mock_rationale_with_error(self, company_data: Dict, projects_data: List[Dict], error_reason: str, error_details: str) -> Dict:
        """Generate a mock rationale with specific error information"""
        logger.info(f"Generating mock AI rationale with error: {error_reason}")
        
        # Select the first project as default
        selected_project = projects_data[0] if projects_data else {}
        
        return {
            "selectedProjectId": selected_project.get('id', 1),
            "confidenceScore": 0.85,
            "title": f"AI-Powered Project Matching Analysis for {company_data.get('company_name', 'Company')}",
            "context": {
                "companyProfile": f"Analysis of {company_data.get('company_name', 'Company')} in {company_data.get('industry', 'Technology')} sector",
                "matchingCriteria": "Based on budget alignment, SDG goals, and strategic objectives",
                "strategicAlignment": "High alignment with company's sustainability goals and budget constraints"
            },
            "criteria": {
                "impact": 0.88,
                "cost": 0.92,
                "risk": 0.75,
                "alignment": 0.90,
                "feasibility": 0.85
            },
            "options": [
                {
                    "key": str(project.get('id', i)),
                    "label": project.get('title', f'Project {i}'),
                    "data": {
                        "projectId": project.get('id', i),
                        "score": 0.8 + (i * 0.05),
                        "strengths": ["Strong SDG alignment", "Within budget range", "Good NGO rating"],
                        "concerns": ["Medium complexity", "Requires careful monitoring"]
                    }
                } for i, project in enumerate(projects_data[:3], 1)
            ],
            "selectedOption": str(selected_project.get('id', 1)),
            "pros": [
                "Excellent budget alignment with company CSR budget",
                "Strong SDG goal alignment with company priorities",
                "High NGO credibility and past performance",
                "Geographic fit with company presence",
                "Measurable impact metrics and KPIs"
            ],
            "cons": [
                "Medium project complexity requires careful planning",
                "Timeline may need adjustment for company schedule",
                "Requires dedicated CSR team oversight"
            ],
            "reasoningSteps": [
                "Analyzed company budget constraints and project costs",
                "Evaluated SDG alignment with company sustainability goals",
                "Assessed NGO credibility and past performance",
                "Considered geographic and operational fit",
                "Calculated risk-adjusted return on investment"
            ],
            "scoreBreakdown": {
                str(project.get('id', i)): {
                    "impact": 0.8 + (i * 0.05),
                    "cost": 0.85 + (i * 0.03),
                    "risk": 0.7 + (i * 0.02),
                    "alignment": 0.9 + (i * 0.02),
                    "feasibility": 0.8 + (i * 0.03),
                    "total": 0.8 + (i * 0.03)
                } for i, project in enumerate(projects_data[:3], 1)
            },
            "error": {
                "reason": error_reason,
                "details": error_details
            }
        }

# Global instance
ai_model = AIModel()