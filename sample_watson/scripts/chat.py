#!/usr/bin/env python3
"""
Simple chat launcher for IBM watsonx Orchestrate Developer Edition
Uses your API key to start the server (if needed), import agents, and open chat.
"""

import os
import sys
import subprocess
import logging
from pathlib import Path
from typing import Optional

current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

try:
    from dotenv import load_dotenv  # type: ignore
    load_dotenv(current_dir / ".env")
except Exception:
    pass

logger = logging.getLogger(__name__)

def get_api_key() -> Optional[str]:
    """Get API key from environment variables only"""
    return os.getenv("WATSON_API_KEY") or os.getenv("WO_API_KEY")


def ensure_env_file(api_key: str) -> Path:
    env_file = current_dir / ".env"
    # Get instance from environment variables
    instance = os.getenv("WO_INSTANCE") or os.getenv("WATSON_SERVICE_URL")
    if not instance:
        print("❌ WO_INSTANCE or WATSON_SERVICE_URL not found in environment variables")
        print("   Please set one of these environment variables:")
        print("   export WO_INSTANCE=https://api.ap-south-1.dl.watson-orchestrate.ibm.com")
        print("   # OR")
        print("   export WATSON_SERVICE_URL=https://api.ap-south-1.dl.watson-orchestrate.ibm.com")
        sys.exit(1)
    
    with open(env_file, "w") as f:
        # Developer Edition expects one of ['internal','myibm','orchestrate']
        f.write("WO_DEVELOPER_EDITION_SOURCE=orchestrate\n")
        f.write(f"WO_API_KEY={api_key}\n")
        f.write(f"WO_INSTANCE={instance}\n")
    return env_file


def run(cmd: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=True)


def start_server(env_file: Path) -> bool:
    print("🚀 Starting Orchestrate Developer Edition (if not already running)...")
    res = run(["orchestrate", "server", "start", "-e", str(env_file)])
    if res.returncode == 0:
        print("✅ Server is up. UI: http://localhost:4321")
        return True
    if "already running" in (res.stdout + res.stderr).lower():
        print("ℹ️ Server already running.")
        return True
    print(f"❌ Failed to start server:\n{res.stderr or res.stdout}")
    return False


def import_agent(agent_yaml: Path) -> None:
    if not agent_yaml.exists():
        print(f"⚠️ Agent file not found: {agent_yaml}")
        return
    print(f"🤖 Importing agent: {agent_yaml.name}...")
    res = run(["orchestrate", "agents", "import", "-f", str(agent_yaml)])
    if res.returncode == 0:
        print("   ✅ Agent imported")
    else:
        # Often safe to ignore if it already exists
        print(f"   ⚠️ Import reported: {res.stderr or res.stdout}")


def open_chat() -> None:
    print("💬 Opening chat (press Ctrl+C to exit)...")
    # This opens an interactive chat in terminal
    subprocess.call(["orchestrate", "chat", "start"])  # no capture, allow interactive


def main() -> None:
    print("🚀 Chat Launcher")
    print("=" * 30)

    api_key = get_api_key()
    if not api_key:
        print("❌ No API key found. Set WATSON_API_KEY or WO_API_KEY, or add .env with WO_API_KEY=")
        sys.exit(1)

    env_file = ensure_env_file(api_key)

    # Start server
    if not start_server(env_file):
        sys.exit(1)

    # Import sample agents (optional)
    agents_dir = current_dir / "agents"
    for name in ["basic_chat_agent.yaml", "task_assistant_agent.yaml"]:
        import_agent(agents_dir / name)

    # Open chat
    open_chat()


if __name__ == "__main__":
    main()


