"""
Simple Test Tool for IBM WatsonX Orchestrate
"""

from ibm_watsonx_orchestrate.agent_builder.tools import tool

@tool
def simple_test_tool(message: str = "Hello") -> str:
    """
    A simple test tool that returns a message
    """
    return f"Test tool response: {message}"
