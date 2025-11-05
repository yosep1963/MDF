# mDF Calculator - 빠른 시작 가이드

이 가이드를 따라 5분 안에 mDF Calculator를 배포할 수 있습니다!

## 1단계: 아이콘 생성 (2분)

### 옵션 A: 간단한 방법 (권장)

1. 브라우저에서 `icons/icon-generator.html` 파일 열기
2. "icon-192.png 다운로드" 버튼 클릭
3. "icon-512.png 다운로드" 버튼 클릭
4. 다운로드한 파일을 `icons/` 폴더에 저장

### 옵션 B: 온라인 도구 사용

1. [Favicon.io](https://favicon.io/favicon-generator/) 방문
2. 텍스트로 아이콘 생성:
   - Text: `mDF`
   - Background: `Rounded`
   - Font: `Arial`
   - Font Size: `90`
   - Shape: `Square`
   - Font Color: `#FFFFFF`
   - Background Color: `#3498db`
3. "Download" 클릭
4. `android-chrome-192x192.png`를 `icon-192.png`로 이름 변경
5. `android-chrome-512x512.png`를 `icon-512.png`로 이름 변경
6. `icons/` 폴더에 저장

## 2단계: 로컬 테스트 (1분)

1. **Python으로 로컬 서버 실행**:
   ```bash
   python -m http.server 8000
   ```

2. **브라우저에서 열기**:
   ```
   http://localhost:8000
   ```

3. **테스트**:
   - PT 값 입력 (예: 20)
   - Total Bilirubin 입력 (예: 5)
   - "Calculate mDF" 클릭
   - 결과 확인: mDF = 34.9 (예상값)

## 3단계: Netlify 배포 (2분)

### 방법 1: GitHub + Netlify (자동 배포)

1. **GitHub 저장소 생성**:
   - [GitHub](https://github.com/new)에서 새 저장소 생성

2. **코드 푸시**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: mDF Calculator"
   git remote add origin https://github.com/YOUR_USERNAME/mdf-calculator.git
   git branch -M main
   git push -u origin main
   ```

3. **Netlify 연동**:
   - [Netlify](https://app.netlify.com/) 로그인
   - "Add new site" → "Import an existing project"
   - GitHub 선택 → 저장소 선택
   - "Deploy site" 클릭

4. **완료!** 🎉
   - 자동으로 HTTPS URL 생성됨
   - 예: `https://your-site-name.netlify.app`

### 방법 2: Netlify Drop (가장 빠름!)

1. **[Netlify Drop](https://app.netlify.com/drop) 방문**

2. **프로젝트 폴더 드래그 앤 드롭**:
   - 전체 `mDF` 폴더를 드래그하여 Netlify Drop에 놓기

3. **완료!** 🎉
   - 즉시 배포됨
   - HTTPS URL 자동 생성

## 4단계: 스마트폰에 설치

### Android

1. Chrome에서 배포된 URL 열기
2. 메뉴(⋮) → "홈 화면에 추가"
3. "추가" 또는 "설치" 클릭

### iOS

1. Safari에서 배포된 URL 열기
2. 공유 버튼 (📤) 클릭
3. "홈 화면에 추가" 선택
4. "추가" 클릭

## 완료! ✅

이제 mDF Calculator가 다음과 같이 작동합니다:

- ✅ 온라인에서 접근 가능
- ✅ 오프라인에서도 작동
- ✅ 스마트폰 홈 화면에 설치됨
- ✅ 앱처럼 실행됨
- ✅ 한국어/영어 지원

## 다음 단계 (선택사항)

### 커스텀 도메인 설정

1. Netlify 대시보드에서 사이트 선택
2. "Domain settings" 클릭
3. "Add custom domain" 클릭
4. 도메인 입력 및 DNS 설정 따라하기

### 사이트 이름 변경

1. Netlify 대시보드에서 사이트 선택
2. "Site settings" → "Site details"
3. "Change site name" 클릭
4. 원하는 이름 입력 (예: `mdf-calculator`)
5. URL이 `https://mdf-calculator.netlify.app`로 변경됨

## 문제 해결

### PWA가 설치되지 않음

- HTTPS로 접속했는지 확인
- 아이콘 파일이 `icons/` 폴더에 있는지 확인
- 브라우저 캐시 삭제 후 재시도

### 계산 결과가 이상함

- 공식 확인: mDF = 4.6 × (PT - 13.5) + Total Bilirubin
- 입력값이 올바른지 확인
- 브라우저 콘솔(F12)에서 에러 확인

### 오프라인에서 작동하지 않음

- 첫 방문 시 온라인으로 접속하여 캐시 생성 필요
- Service Worker가 등록되었는지 확인 (개발자 도구 → Application → Service Workers)

## 도움이 필요하신가요?

- 📖 전체 문서: [README.md](README.md)
- 🐛 버그 리포트: GitHub Issues
- 💬 질문: GitHub Discussions

---

**즐거운 코딩 되세요!** 🚀
