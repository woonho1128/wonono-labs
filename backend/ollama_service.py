import json
import re
import asyncio
import httpx
from typing import Dict, Optional

import os
# Use ngrok tunnel to local PC's Ollama, fallback to localhost
OLLAMA_BASE_URL = os.environ.get(
    "OLLAMA_URL",
    "https://hyperconscientious-christal-unconvent.ngrok-free.app"
)

# Only 1 Ollama request at a time (CPU-only protection)
_semaphore = asyncio.Semaphore(1)


async def get_available_models() -> list[str]:
    """Fetch list of available models from Ollama."""
    try:
        headers = {"ngrok-skip-browser-warning": "true"}
        async with httpx.AsyncClient(timeout=10.0, headers=headers) as client:
            response = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if response.status_code == 200:
                data = response.json()
                return [m["name"] for m in data.get("models", [])]
    except Exception:
        pass
    return []


async def generate_analysis(prompt: str, model: str = "qwen3:14b") -> Optional[Dict]:
    """Send prompt to Ollama with queue protection (one request at a time)."""
    # Add /nothink to prompt for qwen3 to disable thinking mode
    final_prompt = prompt + "\n\n/nothink"

    async with _semaphore:
        try:
            headers = {"ngrok-skip-browser-warning": "true"}
            async with httpx.AsyncClient(timeout=300.0, headers=headers) as client:
                response = await client.post(
                    f"{OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": model,
                        "prompt": final_prompt,
                        "stream": False,
                        "options": {
                            "temperature": 0.7,
                            "num_predict": 2048,
                        },
                    },
                )

                if response.status_code != 200:
                    print(f"Ollama error: {response.status_code} - {response.text}")
                    return None

                data = response.json()
                raw_text = data.get("response", "")
                print(f"[Ollama raw response length: {len(raw_text)} chars]")

                # Strip <think>...</think> tags if present (qwen3 thinking mode)
                raw_text = strip_thinking_tags(raw_text)

                result = parse_json_response(raw_text)
                if result is None:
                    print(f"[JSON parse failed] Raw text preview: {raw_text[:500]}")
                return result

        except httpx.TimeoutException:
            print("Ollama request timed out (300s)")
            return None
        except Exception as e:
            print(f"Ollama error: {e}")
            return None


def strip_thinking_tags(text: str) -> str:
    """Remove <think>...</think> blocks from qwen3 responses."""
    # Remove <think>...</think> including content
    text = re.sub(r'<think>.*?</think>', '', text, flags=re.DOTALL)
    # Also remove unclosed <think> tags
    text = re.sub(r'<think>.*$', '', text, flags=re.DOTALL)
    return text.strip()


def parse_json_response(text: str) -> Optional[Dict]:
    """Extract and parse JSON from model response text."""
    # Try direct parse
    try:
        return json.loads(text.strip())
    except json.JSONDecodeError:
        pass

    # Try to find JSON in markdown code blocks
    for marker in ["```json", "```"]:
        if marker in text:
            start = text.index(marker) + len(marker)
            end_pos = text.find("```", start)
            if end_pos != -1:
                try:
                    return json.loads(text[start:end_pos].strip())
                except json.JSONDecodeError:
                    pass

    # Try to find JSON object in text
    brace_start = text.find("{")
    brace_end = text.rfind("}")
    if brace_start != -1 and brace_end != -1 and brace_end > brace_start:
        try:
            return json.loads(text[brace_start:brace_end + 1])
        except json.JSONDecodeError:
            pass

    return None
