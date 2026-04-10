ANALYSIS_PROMPT = """당신은 IPC(대인관계 원형 모델) 기반 심리분석 전문가입니다.

아래 사용자의 IPC 심리 테스트 점수를 분석하여 종합적인 심리 리포트를 작성해주세요.

## 사용자 정보
- 닉네임: {nickname}
- 나이: {age}세

## IPC 8차원 점수 (1~5점 척도)
- 주도성 (Dominance): {dominance:.1f}
- 사교성 (Gregariousness): {gregariousness:.1f}
- 따뜻함 (Warmth): {warmth:.1f}
- 겸손함 (Submissiveness): {submissiveness:.1f}
- 내향성 (Introversion): {introversion:.1f}
- 냉담함 (Coldness): {coldness:.1f}
- 자기주장 (Assertiveness): {assertiveness:.1f}
- 배려심 (Agreeableness): {agreeableness:.1f}

## 분석 요청
위 점수를 기반으로 다음 항목을 분석해주세요:

반드시 아래 JSON 형식으로만 응답해주세요. 다른 텍스트는 포함하지 마세요:

{{
  "personality_type": "유형 이름 (예: 따뜻한 리더, 깊은 사색가 등 창의적인 이름)",
  "type_code": "유형 코드 (3글자 영문 약자)",
  "type_emoji": "유형을 대표하는 이모지 1개",
  "personality_description": "성격 유형에 대한 상세 설명 (3~4문장)",
  "dating_style": "연애 스타일 분석 (3~4문장, 연애에서의 특징, 표현 방식, 관계 패턴 등)",
  "ideal_type": "잘 맞는 이상형 분석 (2~3문장)",
  "strengths": ["강점1", "강점2", "강점3"],
  "weaknesses": ["약점1", "약점2", "약점3"],
  "advice": "맞춤형 조언 (2~3문장)"
}}

중요: 반드시 유효한 JSON 형식으로만 답변하세요. 마크다운이나 코드 블록 없이 순수 JSON만 출력하세요."""
