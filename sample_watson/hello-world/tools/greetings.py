#greetings.py
from ibm_watsonx_orchestrate.agent_builder.tools import tool


@tool
def greeting() -> str:
    """
    Greeting for everyone   
    """

    greeting = "Hello World"
    return greeting
