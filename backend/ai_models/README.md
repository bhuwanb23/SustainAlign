# AI-Powered Project Matching System

This module provides AI-powered project matching and rationale generation for the SustainAlign platform using OpenRouter API.

## 🚀 Features

- **Intelligent Project Matching**: AI analyzes company profiles and matches them with the most suitable sustainability projects
- **Comprehensive Analysis**: Evaluates projects based on budget, SDG alignment, geographic fit, NGO credibility, and risk factors
- **Structured Output**: Returns detailed rationale in JSON format for easy integration
- **Fallback Support**: Graceful degradation to mock data when AI service is unavailable

## 📁 Structure

```
ai_models/
├── ai_model.py              # Core AI model class with OpenRouter integration
├── ai_matching_service.py   # Service layer for business logic
└── README.md               # This file
```

## 🔧 Setup

### 1. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```bash
# OpenRouter AI Configuration
OPENROUTER_API_KEY=your-openrouter-api-key-here
SITE_URL=https://sustainalign.com
SITE_NAME=SustainAlign
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Get OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Generate an API key
4. Add the key to your `.env` file

## 🎯 Usage

### Backend API Endpoints

#### Generate AI Rationale
```bash
POST /api/ai-matching/generate-rationale
Content-Type: application/json

{
  "company_id": 1,
  "filters": {
    "sdg_goals": "7,13",
    "max_budget": 1000000,
    "location_country": "India"
  }
}
```

#### Get Company Rationales
```bash
GET /api/ai-matching/rationales/{company_id}
```

#### Get Rationale Detail
```bash
GET /api/ai-matching/rationales/detail/{rationale_id}
```

### Frontend Integration

```javascript
import { generateRationale, getCompanyRationales } from '../lib/aiMatchingApi'

// Generate AI rationale
const rationale = await generateRationale(companyId, filters)

// Get company rationales
const rationales = await getCompanyRationales(companyId)
```

## 🤖 AI Model Configuration

### Available Models

The system uses OpenRouter API which provides access to multiple AI models:

- `qwen/qwen3-coder:free` (default) - Free, good for structured analysis
- `anthropic/claude-3.5-sonnet` - High quality, paid
- `openai/gpt-4` - Premium model, paid
- `meta-llama/llama-3.1-8b-instruct` - Free alternative

### Changing Models

Edit `ai_model.py` and change the model variable:

```python
self.model = "anthropic/claude-3.5-sonnet"  # Change to your preferred model
```

## 📊 Analysis Criteria

The AI evaluates projects based on these criteria (0-1 scale):

1. **Impact** (0.9) - Environmental/social impact potential
2. **Cost** (0.8) - Budget efficiency and value for money
3. **Risk** (0.7) - Project complexity and execution risk
4. **Alignment** (0.95) - Strategic fit with company goals
5. **Feasibility** (0.85) - Likelihood of successful execution

## 🔄 Response Format

The AI returns structured JSON with:

```json
{
  "selectedProjectId": 1,
  "confidenceScore": 0.85,
  "title": "AI-Generated Project Matching Analysis",
  "context": {
    "companyProfile": "Company description...",
    "matchingCriteria": "Evaluation criteria...",
    "strategicAlignment": "Alignment analysis..."
  },
  "criteria": {
    "impact": 0.9,
    "cost": 0.8,
    "risk": 0.7,
    "alignment": 0.95,
    "feasibility": 0.85
  },
  "options": [
    {
      "key": "1",
      "label": "Project Title",
      "data": {
        "projectId": 1,
        "score": 0.85,
        "strengths": ["Strength 1", "Strength 2"],
        "concerns": ["Concern 1", "Concern 2"]
      }
    }
  ],
  "selectedOption": "1",
  "pros": ["Benefit 1", "Benefit 2"],
  "cons": ["Concern 1", "Concern 2"],
  "reasoningSteps": ["Step 1", "Step 2"],
  "scoreBreakdown": {
    "1": {
      "impact": 0.9,
      "cost": 0.8,
      "risk": 0.7,
      "alignment": 0.95,
      "feasibility": 0.85,
      "total": 0.84
    }
  }
}
```

## 🛠️ Development

### Testing the AI Model

```python
from ai_models.ai_model import ai_model

# Test with sample data
company_data = {
    "company_name": "TechCorp",
    "industry": "Technology",
    "budget": {"amount": 1000000, "currency": "INR"},
    "focus_area": {"priority_sdgs": ["7", "13"], "esg_goals": "Sustainability"}
}

projects_data = [
    {
        "id": 1,
        "title": "Renewable Energy Project",
        "ngo_name": "Green NGO",
        "funding_required": 500000,
        "sdg_goals": ["7", "13"]
    }
]

rationale = ai_model.generate_project_matching_rationale(company_data, projects_data)
print(rationale)
```

### Error Handling

The system includes comprehensive error handling:

- API failures fall back to mock data
- Invalid responses are logged and handled gracefully
- Network timeouts are managed with retry logic

### Logging

Enable detailed logging by setting the log level:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 🔒 Security

- API keys are stored in environment variables
- All API requests include proper headers
- Input validation prevents injection attacks
- Rate limiting can be implemented for production

## 🚀 Production Deployment

1. **Environment Variables**: Ensure all required env vars are set
2. **API Key Management**: Use secure key management in production
3. **Rate Limiting**: Implement rate limiting for API calls
4. **Monitoring**: Add monitoring for AI service health
5. **Caching**: Consider caching AI responses for performance

## 📈 Performance

- AI requests are limited to 50 projects to prevent overwhelming the model
- Response caching can be implemented for repeated queries
- Async processing can be added for better performance

## 🤝 Contributing

1. Follow the existing code structure
2. Add comprehensive error handling
3. Include logging for debugging
4. Test with various company profiles
5. Update documentation for new features

## 📞 Support

For issues or questions:
1. Check the logs for error details
2. Verify API key configuration
3. Test with mock data first
4. Review the OpenRouter documentation
