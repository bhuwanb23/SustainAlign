# Agent Integration Guide

## Overview
This guide shows you how to integrate IBM WatsonX Orchestrate agents into your applications programmatically, without using the web UI.

## 🚀 Quick Start

### 1. Basic Integration
```python
from scripts.agent_example import AgentClient

# Initialize client
client = AgentClient()

# Chat with an agent
response = client.chat("Basic_Chat_Agent", "Hello, how are you?")
print(response)
```

### 2. Using the Chat Scripts
```bash
# Interactive chat
python scripts/api_agent_chat.py

# Single message
python scripts/api_agent_chat.py chat Basic_Chat_Agent "Hello!"

# List available agents
python scripts/api_agent_chat.py list
```

## 📁 Available Scripts

### 1. `api_agent_chat.py` (Recommended)
- **Purpose**: Full-featured API-based chat client
- **Features**: 
  - Interactive chat mode
  - Single message sending
  - Agent listing with details
  - Error handling
  - Session management

**Usage:**
```bash
# Interactive mode
python scripts/api_agent_chat.py

# Send single message
python scripts/api_agent_chat.py chat Basic_Chat_Agent "Your message here"

# List agents
python scripts/api_agent_chat.py list
```

### 2. `agent_chat.py`
- **Purpose**: Advanced chat client with REST API integration
- **Features**:
  - Direct API calls
  - Custom session management
  - Advanced error handling
  - Agent metadata access

### 3. `simple_agent_chat.py`
- **Purpose**: Simple CLI-based chat client
- **Features**:
  - Uses orchestrate CLI
  - Lightweight implementation
  - Good for quick testing

### 4. `agent_example.py`
- **Purpose**: Comprehensive examples and integration patterns
- **Features**:
  - Multiple usage examples
  - Error handling patterns
  - Best practices demonstration

## 🔧 Integration Patterns

### Pattern 1: Simple Chat Integration
```python
import requests
import os

class SimpleAgentChat:
    def __init__(self):
        self.base_url = "http://localhost:4321"
        self.api_key = os.getenv('WO_API_KEY')
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        })
    
    def chat(self, agent_name, message):
        # Get agent ID
        response = self.session.get(f"{self.base_url}/v1/agents")
        agents = response.json().get('agents', [])
        agent_id = next((a['id'] for a in agents if a['name'] == agent_name), None)
        
        if not agent_id:
            return f"Agent '{agent_name}' not found"
        
        # Send message
        payload = {
            "agent_id": agent_id,
            "message": message,
            "session_id": "my_app"
        }
        
        response = self.session.post(f"{self.base_url}/v1/agents/chat", json=payload)
        return response.json().get('response', 'No response')

# Usage
chat = SimpleAgentChat()
response = chat.chat("Basic_Chat_Agent", "Hello!")
print(response)
```

### Pattern 2: Agent Wrapper Class
```python
class AgentWrapper:
    def __init__(self, agent_name):
        self.agent_name = agent_name
        self.agent_id = self._get_agent_id()
        self.session_id = f"app_{agent_name.lower()}"
    
    def _get_agent_id(self):
        # Implementation to get agent ID
        pass
    
    def ask(self, question):
        # Implementation to send message and get response
        pass
    
    def ask_with_context(self, question, context):
        # Implementation for context-aware conversations
        pass

# Usage
calculator_agent = AgentWrapper("Basic_Chat_Agent")
result = calculator_agent.ask("What is 25 + 37?")
```

### Pattern 3: Multi-Agent Orchestration
```python
class MultiAgentOrchestrator:
    def __init__(self):
        self.agents = {
            'chat': 'Basic_Chat_Agent',
            'tasks': 'Task_Assistant_Agent',
            'calculator': 'Basic_Chat_Agent'  # Has calculator tools
        }
    
    def route_message(self, message, agent_type='chat'):
        agent_name = self.agents.get(agent_type)
        if not agent_name:
            return f"Unknown agent type: {agent_type}"
        
        # Send to appropriate agent
        return self._send_to_agent(agent_name, message)
    
    def _send_to_agent(self, agent_name, message):
        # Implementation to send message to specific agent
        pass

# Usage
orchestrator = MultiAgentOrchestrator()
response = orchestrator.route_message("Calculate 15% of 200", "calculator")
```

## 🎯 Use Cases

### 1. Customer Service Bot
```python
def handle_customer_inquiry(inquiry):
    client = AgentClient()
    
    # Route to appropriate agent based on inquiry type
    if "calculation" in inquiry.lower():
        agent = "Basic_Chat_Agent"  # Has calculator tools
    elif "task" in inquiry.lower() or "plan" in inquiry.lower():
        agent = "Task_Assistant_Agent"
    else:
        agent = "Basic_Chat_Agent"  # General purpose
    
    response = client.chat(agent, inquiry)
    return response
```

### 2. Data Processing Pipeline
```python
def process_data_with_agent(data, operation):
    client = AgentClient()
    
    # Use agent with data processing tools
    message = f"Process this data: {data}. Operation: {operation}"
    response = client.chat("Basic_Chat_Agent", message)
    
    # Parse response and return structured data
    return parse_agent_response(response)
```

### 3. Content Generation
```python
def generate_content(topic, style="professional"):
    client = AgentClient()
    
    prompt = f"Generate {style} content about: {topic}"
    response = client.chat("Basic_Chat_Agent", prompt)
    
    return response
```

## 🔒 Security Considerations

### 1. API Key Management
```python
import os
from pathlib import Path

def load_api_key():
    # Try environment variable first
    api_key = os.getenv('WO_API_KEY')
    
    if not api_key:
        # Try .env file
        env_file = Path(__file__).parent / '.env'
        if env_file.exists():
            from dotenv import load_dotenv
            load_dotenv(env_file)
            api_key = os.getenv('WO_API_KEY')
    
    if not api_key:
        raise ValueError("WO_API_KEY not found in environment or .env file")
    
    return api_key
```

### 2. Input Validation
```python
def validate_message(message):
    if not message or not isinstance(message, str):
        raise ValueError("Message must be a non-empty string")
    
    if len(message) > 10000:  # Reasonable limit
        raise ValueError("Message too long")
    
    # Sanitize input if needed
    return message.strip()
```

### 3. Rate Limiting
```python
import time
from functools import wraps

def rate_limit(calls_per_minute=60):
    def decorator(func):
        last_called = [0.0]
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            left_to_wait = 60.0 / calls_per_minute - elapsed
            if left_to_wait > 0:
                time.sleep(left_to_wait)
            ret = func(*args, **kwargs)
            last_called[0] = time.time()
            return ret
        return wrapper
    return decorator

@rate_limit(calls_per_minute=30)
def chat_with_agent(agent_name, message):
    # Your chat implementation
    pass
```

## 🚨 Error Handling

### 1. Connection Errors
```python
import requests
from requests.exceptions import ConnectionError, Timeout

def safe_chat(agent_name, message):
    try:
        response = client.chat(agent_name, message)
        return response
    except ConnectionError:
        return "Error: Cannot connect to agent service"
    except Timeout:
        return "Error: Request timed out"
    except Exception as e:
        return f"Error: {str(e)}"
```

### 2. Agent Not Found
```python
def chat_with_fallback(agent_name, message, fallback_agent="Basic_Chat_Agent"):
    response = client.chat(agent_name, message)
    
    if not response or "not found" in response.lower():
        print(f"Agent {agent_name} not found, using fallback")
        response = client.chat(fallback_agent, message)
    
    return response
```

## 📊 Monitoring and Logging

### 1. Basic Logging
```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def chat_with_logging(agent_name, message):
    logger.info(f"Sending message to {agent_name}: {message[:50]}...")
    
    response = client.chat(agent_name, message)
    
    if response:
        logger.info(f"Received response from {agent_name}")
    else:
        logger.error(f"Failed to get response from {agent_name}")
    
    return response
```

### 2. Performance Monitoring
```python
import time
from functools import wraps

def monitor_performance(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        
        print(f"Function {func.__name__} took {end_time - start_time:.2f} seconds")
        return result
    return wrapper

@monitor_performance
def chat_with_agent(agent_name, message):
    return client.chat(agent_name, message)
```

## 🧪 Testing

### 1. Unit Tests
```python
import unittest
from unittest.mock import patch, MagicMock

class TestAgentIntegration(unittest.TestCase):
    def setUp(self):
        self.client = AgentClient()
    
    @patch('requests.Session.post')
    def test_chat_success(self, mock_post):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {'response': 'Hello!'}
        mock_post.return_value = mock_response
        
        result = self.client.chat("Basic_Chat_Agent", "Hello")
        self.assertEqual(result, "Hello!")
    
    def test_chat_agent_not_found(self):
        result = self.client.chat("NonExistentAgent", "Hello")
        self.assertIsNone(result)

if __name__ == '__main__':
    unittest.main()
```

### 2. Integration Tests
```python
def test_agent_integration():
    """Test actual agent integration"""
    client = AgentClient()
    
    # Test basic chat
    response = client.chat("Basic_Chat_Agent", "Hello")
    assert response is not None
    assert isinstance(response, str)
    
    # Test calculator functionality
    response = client.chat("Basic_Chat_Agent", "What is 2 + 2?")
    assert "4" in response
    
    print("✅ All integration tests passed!")
```

## 📚 Best Practices

### 1. Agent Selection
- Use specific agents for specific tasks
- Consider agent capabilities (tools, LLM model, style)
- Test different agents for your use case

### 2. Message Design
- Be clear and specific in your prompts
- Provide context when needed
- Use structured prompts for consistent results

### 3. Session Management
- Use meaningful session IDs
- Maintain conversation context
- Handle session timeouts gracefully

### 4. Performance Optimization
- Cache agent IDs to avoid repeated lookups
- Implement rate limiting
- Use appropriate timeouts
- Consider async operations for high-volume usage

### 5. Error Recovery
- Implement fallback mechanisms
- Provide meaningful error messages
- Log errors for debugging
- Handle network issues gracefully

This guide provides everything you need to integrate WatsonX Orchestrate agents into your applications effectively and securely.
