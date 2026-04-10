from typing import Dict, List

# Question ID -> IPC dimension mapping
QUESTION_DIMENSION_MAP: Dict[int, str] = {
    1: "dominance", 2: "dominance", 3: "dominance",
    4: "gregariousness", 5: "gregariousness",
    6: "warmth", 7: "warmth", 8: "warmth",
    9: "submissiveness", 10: "submissiveness",
    11: "introversion", 12: "introversion", 13: "introversion",
    14: "coldness", 15: "coldness",
    16: "assertiveness", 17: "assertiveness",
    18: "agreeableness", 19: "agreeableness", 20: "agreeableness",
}


def calculate_ipc_scores(answers: List[dict]) -> Dict[str, float]:
    """Calculate average scores for each IPC dimension from test answers."""
    dimension_scores: Dict[str, List[float]] = {
        "dominance": [],
        "gregariousness": [],
        "warmth": [],
        "submissiveness": [],
        "introversion": [],
        "coldness": [],
        "assertiveness": [],
        "agreeableness": [],
    }

    for answer in answers:
        qid = answer["question_id"]
        score = answer["score"]
        dimension = QUESTION_DIMENSION_MAP.get(qid)
        if dimension:
            dimension_scores[dimension].append(score)

    result = {}
    for dim, scores in dimension_scores.items():
        result[dim] = sum(scores) / len(scores) if scores else 3.0

    return result
