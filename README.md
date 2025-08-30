<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Character Emoji Generator

Gemini 2.5 Flash Image Preview 모델을 사용하여 캐릭터 이미지로부터 이모티콘을 자동 생성하는 SaaS 애플리케이션입니다.

## 🚀 시작하기

### 1. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Gemini API 키를 설정하세요:

```bash
# .env 파일 생성
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**중요**: API 키는 반드시 `VITE_` 접두사로 시작해야 합니다.

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 🔧 문제 해결

### 400 "INVALID_ARGUMENT" 에러

이 에러는 주로 다음과 같은 원인으로 발생합니다:

1. **API 키 설정 문제**

   - `.env` 파일이 프로젝트 루트에 있는지 확인
   - API 키가 `VITE_GEMINI_API_KEY`로 시작하는지 확인
   - 서버 재시작 후 다시 시도

2. **이미지 형식 문제**

   - PNG, JPEG, WebP 형식만 지원
   - 파일 크기는 4MB 이하여야 함
   - 투명 배경이 있는 PNG 권장

3. **Base64 데이터 문제**
   - 이미지 업로드 후 콘솔에서 로그 확인
   - Base64 데이터 길이가 적절한지 확인

### 디버깅

브라우저 개발자 도구 콘솔에서 다음 정보를 확인할 수 있습니다:

- 이미지 처리 로그
- API 응답 상세 정보
- 에러 메시지

## 📁 프로젝트 구조

```
character-emoji-generator/
├── components/          # React 컴포넌트
├── services/           # Gemini API 서비스
├── constants.ts        # 이모티콘 프롬프트 상수
├── vite.config.ts      # Vite 설정
└── .env               # 환경변수 (직접 생성 필요)
```

## 🎯 주요 기능

- 캐릭터 이미지 업로드 (드래그 앤 드롭 지원)
- 8가지 감정/동작 기반 이모티콘 자동 생성
- 투명 배경 이모티콘 출력
- 실시간 생성 진행률 표시
- 반응형 UI 디자인

## 🛠️ 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI API

## 📝 라이선스

MIT License
