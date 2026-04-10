import json
import asyncio
import httpx
from typing import Dict, Optional

OLLAMA_BASE_URL = "http://localhost:11434"

# Queue to prevent concurrent Ollama requests (CPU-only = one at a time)
_request_queue: asyncio.Queue = asyncio.Queue()
_queue_lock = asyncio.Lock()
_semaphore = asyncio.Semaphore(1)  # Only 1 Ollama request at a time


async def get_available_models() -> list[str]:
    """Fetch list of available models from Ollama."""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if response.status_code == 200:
                data = response.json()
                return [m["name"] for m in data.get("models", [])]
    except Exception:
        pass
    return []


async def generate_analysis(prompt: str, model: str = "qwen3:8b") -> Optional[Dict]:
    """Send prompt to Ollama with queue protection (one request at a time)."""
    async with _semaphore:
        try:
            async with httpx.AsyncClient(timeout=300.0) as client:
                response = await client.post(
                    f"{OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": model,
                        "prompt": prompt,
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

                return parse_json_response(raw_text)

        except httpx.TimeoutException:
            print("Ollama request timed out (300s)")
            return None
        except Exception as e:
            print(f"Ollama error: {e}")
            return None


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
            end = text.index("```", start) if "```" in text[start:] else len(text)
            try:
                return json.loads(text[start:end].strip())
            except json.JSONDecodeError:
                pass

    # Try to find JSON object in text
    brace_start = text.find("{")
    brace_end = text.rfind("}")
    if brace_start != -1 and brace_end != -1:
        try:
            return json.loads(text[brace_start:brace_end + 1])
        except json.JSONDecodeError:
            pass

    return None
