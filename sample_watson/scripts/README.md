# Scripts Directory

This directory contains essential scripts for working with IBM WatsonX Orchestrate agents.

## 🚀 Quick Start

### 1. Demo Chat (Recommended for Testing)
```bash
python scripts/demo_chat.py
```
- Opens the web interface automatically
- Provides instructions for asking questions like "What is AI?" or "What is the meaning of life?"
- Best for testing agent responses

### 2. Agent Chat (Interactive)
```bash
python scripts/agent_chat.py interactive
```
- Interactive mode for chatting with agents
- Lists available agents
- Provides detailed instructions for each question

### 3. Direct Tool Usage
```bash
python scripts/direct_tool_usage.py
```
- Demonstrates how to use agent tools directly in your code
- Shows calculator, text processing, and data processing capabilities
- Best for programmatic integration

## 📁 Script Files

### Core Scripts

1. **`demo_chat.py`** ⭐ **Recommended**
   - Opens web interface automatically
   - Provides demo instructions
   - Best for testing agent responses

2. **`agent_chat.py`** ⭐ **Main Chat Script**
   - Interactive chat mode
   - Single question mode
   - Test mode with common questions
   - Lists available agents

3. **`direct_tool_usage.py`** ⭐ **Tool Integration**
   - Demonstrates direct tool usage
   - Shows how to integrate tools in your code
   - Examples of calculator, text, and data processing

### Utility Scripts

4. **`agent_wrapper.py`**
   - Simple wrapper for agent information
   - Lists agents with details
   - Provides chat instructions

5. **`setup_environment.py`**
   - Sets up environment variables
   - Creates .env file
   - Validates configuration

6. **`import_all_tools.py`**
   - Imports all tools and agents
   - Sets up the complete environment
   - Run this after setup_environment.py

7. **`chat.py`**
   - Simple chat launcher
   - Basic chat functionality

## 🎯 Usage Examples

### Ask General Questions
```bash
# Open demo interface
python scripts/demo_chat.py

# Or use interactive mode
python scripts/agent_chat.py interactive

# Or ask a single question
python scripts/agent_chat.py chat Basic_Chat_Agent "What is AI?"
```

### Test Common Questions
```bash
python scripts/agent_chat.py test
```

### Use Tools Directly
```bash
python scripts/direct_tool_usage.py
```

### List Available Agents
```bash
python scripts/agent_chat.py list
```

## 🤖 Available Agents

- **Basic_Chat_Agent**: General conversations + calculator + text processing tools
- **Task_Assistant_Agent**: Task management + all tools
- **simple_agent**: Basic tasks + greeting tool
- **greeter**: Simple greeting agent
- **Nexa_6561Ga**: Advanced AI agent
- **AskOrchestrate**: Default assistant

## 🔧 Agent Capabilities

### Tools Available
- **Calculator Tool**: Mathematical operations, percentages, averages
- **Text Processor Tool**: Word count, sentiment analysis, text transformation
- **Data Processor Tool**: Statistics, analysis, sorting

### LLM Models
- **watsonx/meta-llama/llama-3-2-90b-vision-instruct**: Fast, general-purpose
- **watsonx/ibm/granite-3.0-20b-instruct**: IBM's enterprise-optimized model

## 🌐 Web Interface

The main chat interface is available at: **http://localhost:3000/chat-lite**

### How to Use
1. Select an agent from the dropdown
2. Type your question
3. Press Enter to send
4. Wait for the AI response
5. Continue the conversation

### Example Questions
- "What is AI?"
- "What is the meaning of life?"
- "Explain quantum computing"
- "How can I be more productive?"
- "What are the benefits of meditation?"

## 🚀 Getting Started

1. **Start the server**:
   ```bash
   orchestrate server start
   ```

2. **Run the demo**:
   ```bash
   python scripts/demo_chat.py
   ```

3. **Ask your questions** in the web interface!

## 💡 Tips

- The web interface provides the most reliable agent interaction
- Tools can be used directly for programmatic access
- Different agents have different specializations
- You can have multi-turn conversations
- Responses are generated in real-time using advanced LLMs
