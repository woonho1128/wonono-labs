from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List

from analysis import calculate_ipc_scores
from ollama_service import generate_analysis, get_available_models
from prompts import ANALYSIS_PROMPT

app = FastAPI(title="IPC Psychology Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files directory (frontend build output goes here)
STATIC_DIR = Path(__file__).parent / "static"


class AnswerItem(BaseModel):
    question_id: int
    score: int


class AnalysisRequest(BaseModel):
    nickname: str
    age: int
    answers: List[AnswerItem]
    model: str = "qwen3:14b"


@app.get("/api/models")
async def list_models():
    """Return available Ollama models."""
    models = await get_available_models()
    return {"models": models}


@app.post("/api/analyze")
async def analyze(request: AnalysisRequest):
    """Analyze IPC test results using Ollama AI."""
    answers_dict = [{"question_id": a.question_id, "score": a.score} for a in request.answers]
    scores = calculate_ipc_scores(answers_dict)

    prompt = ANALYSIS_PROMPT.format(
        nickname=request.nickname,
        age=request.age,
        **scores,
    )

    global _active_requests, _waiting_requests
    _waiting_requests += 1
    try:
        result = await generate_analysis(prompt, model=request.model)
    finally:
        _waiting_requests = max(0, _waiting_requests - 1)

    if result is None:
        raise HTTPException(
            status_code=503,
            detail="AI 모델 응답을 받지 못했습니다. Ollama가 실행 중인지 확인해주세요.",
        )

    result["scores"] = scores

    required_fields = [
        "personality_type", "type_code", "type_emoji",
        "personality_description", "dating_style", "ideal_type",
        "strengths", "weaknesses", "advice",
        "compatible_type", "incompatible_type", "quote",
        "stress_behavior", "suitable_jobs", "growth_point",
    ]
    for field in required_fields:
        if field not in result:
            result[field] = get_default_value(field)

    return result


def get_default_value(field: str):
    defaults = {
        "personality_type": "분석 유형",
        "type_code": "UNK",
        "type_emoji": "\U0001f9e0",
        "personality_description": "분석 결과를 생성하지 못했습니다.",
        "dating_style": "분석 결과를 생성하지 못했습니다.",
        "ideal_type": "분석 결과를 생성하지 못했습니다.",
        "strengths": ["분석 중"],
        "weaknesses": ["분석 중"],
        "advice": "다시 시도해주세요.",
        "compatible_type": "분석 결과를 생성하지 못했습니다.",
        "incompatible_type": "분석 결과를 생성하지 못했습니다.",
        "quote": "분석 결과를 생성하지 못했습니다.",
        "stress_behavior": "분석 결과를 생성하지 못했습니다.",
        "suitable_jobs": ["분석 중"],
        "growth_point": "분석 결과를 생성하지 못했습니다.",
    }
    return defaults.get(field, "")


# Track active/waiting requests
_active_requests = 0
_waiting_requests = 0

@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.get("/api/queue")
async def queue_status():
    """Return current queue status."""
    return {
        "active": _active_requests,
        "waiting": _waiting_requests,
    }


# Serve frontend static files (must be AFTER API routes)
if STATIC_DIR.exists():
    app.mount("/assets", StaticFiles(directory=STATIC_DIR / "assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(request: Request, full_path: str):
        """Serve frontend SPA - all non-API routes return index.html."""
        file_path = STATIC_DIR / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(STATIC_DIR / "index.html")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
