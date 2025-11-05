# Netlify 배포 가이드

mDF Calculator를 Netlify에 배포하는 세 가지 방법을 안내합니다.

## 📋 배포 전 체크리스트

✅ 모든 파일이 준비되었습니다:
- `index.html` - 메인 페이지
- `manifest.json` - PWA 설정
- `sw.js` - Service Worker
- `netlify.toml` - Netlify 설정
- `css/styles.css` - 스타일시트
- `js/app.js`, `js/i18n.js` - JavaScript
- `icons/icon-192.png`, `icons/icon-512.png` - 아이콘

## 🚀 방법 1: Netlify Drop (가장 빠름 - 1분)

### 단계:

1. **Netlify 로그인**
   - https://app.netlify.com 방문
   - GitHub, GitLab, 또는 이메일로 가입/로그인

2. **프로젝트 업로드**
   - 로그인 후 대시보드에서 "Add new site" 클릭
   - "Deploy manually" 선택
   - 또는 직접 https://app.netlify.com/drop 방문

3. **폴더 드래그 앤 드롭**
   - `D:\Claude_workplace\mDF` 폴더 전체를 드래그
   - 브라우저 창에 드롭

4. **배포 완료! 🎉**
   - 즉시 배포되며 URL이 생성됩니다
   - 예: `https://random-name-12345.netlify.app`

### 장점:
- ✅ 가장 빠름 (1분 이내)
- ✅ Git 불필요
- ✅ 명령줄 불필요

### 단점:
- ❌ 코드 변경 시 수동 재업로드 필요
- ❌ 자동 배포 없음

---

## 🔄 방법 2: GitHub + Netlify (권장 - 자동 배포)

### 단계:

1. **GitHub 저장소 생성**
   - https://github.com/new 방문
   - Repository name: `mdf-calculator` (또는 원하는 이름)
   - Public 또는 Private 선택
   - "Create repository" 클릭

2. **Git 초기화 및 코드 푸시**
   ```bash
   # 프로젝트 폴더에서 실행
   cd D:\Claude_workplace\mDF

   # Git 초기화
   git init

   # 모든 파일 추가
   git add .

   # 커밋
   git commit -m "Initial commit: mDF Calculator PWA"

   # GitHub 저장소 연결 (YOUR_USERNAME을 본인 GitHub 계정으로 변경)
   git remote add origin https://github.com/YOUR_USERNAME/mdf-calculator.git

   # 브랜치 이름을 main으로 설정
   git branch -M main

   # 푸시
   git push -u origin main
   ```

3. **Netlify에서 GitHub 연동**
   - https://app.netlify.com 로그인
   - "Add new site" 클릭
   - "Import an existing project" 선택
   - "Deploy with GitHub" 클릭
   - GitHub 계정 연결 승인
   - 저장소 선택 (`mdf-calculator`)

4. **배포 설정**
   - Site name: 원하는 이름 입력 (예: `mdf-calculator`)
   - Branch to deploy: `main`
   - Build command: (비워두기)
   - Publish directory: `.`
   - "Deploy site" 클릭

5. **배포 완료! 🎉**
   - URL: `https://mdf-calculator.netlify.app`
   - GitHub에 푸시할 때마다 자동 배포!

### 장점:
- ✅ 자동 배포 (GitHub 푸시 시)
- ✅ 버전 관리
- ✅ 롤백 가능
- ✅ 팀 협업 용이

### 단점:
- ❌ Git 및 GitHub 필요
- ❌ 초기 설정 시간 필요

---

## 💻 방법 3: Netlify CLI (개발자용)

### 단계:

1. **Netlify CLI 설치**
   ```bash
   npm install -g netlify-cli
   ```

2. **Netlify 로그인**
   ```bash
   netlify login
   ```
   - 브라우저가 열리면 승인

3. **프로젝트 초기화**
   ```bash
   cd D:\Claude_workplace\mDF
   netlify init
   ```

   - "Create & configure a new site" 선택
   - Team 선택
   - Site name 입력 (예: `mdf-calculator`)
   - Build command: (Enter - 비워두기)
   - Directory to deploy: `.` (Enter)

4. **배포**
   ```bash
   # 프로덕션 배포
   netlify deploy --prod
   ```

5. **배포 완료! 🎉**
   - CLI가 배포 URL 표시

### 장점:
- ✅ 명령줄에서 빠른 배포
- ✅ 로컬에서 직접 제어
- ✅ 배포 미리보기 가능

### 단점:
- ❌ Node.js/npm 필요
- ❌ CLI 사용법 학습 필요

---

## 🎨 배포 후 설정

### 1. 사이트 이름 변경 (선택)

1. Netlify 대시보드에서 사이트 선택
2. "Site settings" 클릭
3. "Site details" → "Change site name"
4. 원하는 이름 입력 (예: `mdf-calculator`)
5. "Save" 클릭
6. URL: `https://mdf-calculator.netlify.app`

### 2. 커스텀 도메인 연결 (선택)

1. Netlify 대시보드에서 사이트 선택
2. "Domain management" 클릭
3. "Add custom domain" 클릭
4. 도메인 입력 (예: `mdf.yourdomain.com`)
5. DNS 설정 안내 따라하기

### 3. HTTPS 확인

- Netlify는 자동으로 HTTPS를 제공합니다
- Let's Encrypt 인증서 자동 설치
- 확인: 주소창에 🔒 표시

---

## 📱 PWA 설치 확인

배포 후 PWA가 정상 작동하는지 확인:

### 모바일 테스트

1. **Android (Chrome)**
   - 배포된 URL 방문
   - 메뉴(⋮) → "홈 화면에 추가"
   - "설치" 또는 "추가" 클릭

2. **iOS (Safari)**
   - 배포된 URL 방문
   - 공유 버튼(📤) → "홈 화면에 추가"
   - "추가" 클릭

### 데스크톱 테스트

1. **Chrome/Edge**
   - 배포된 URL 방문
   - 주소창 우측 설치 아이콘(⊕) 클릭
   - "설치" 클릭

### PWA 기능 확인

- ✅ 오프라인에서 작동하는지 확인
  - 개발자 도구 (F12) → Network → Offline 체크
  - 페이지 새로고침
- ✅ Service Worker 등록 확인
  - 개발자 도구 → Application → Service Workers
- ✅ 앱처럼 실행되는지 확인
  - 홈 화면 아이콘 클릭 → 전체 화면 실행

---

## 🔧 배포 문제 해결

### 문제 1: 아이콘이 표시되지 않음

**해결책:**
```bash
# 아이콘 파일 확인
ls icons/
# icon-192.png, icon-512.png 있어야 함

# 없다면 다시 생성
python -m http.server 8000
# 브라우저에서 icon-generator.html 열어 다운로드
```

### 문제 2: Service Worker 등록 실패

**해결책:**
- HTTPS로 접속했는지 확인 (Netlify는 자동 HTTPS)
- 브라우저 캐시 삭제 (Ctrl + Shift + Delete)
- 시크릿 모드에서 테스트

### 문제 3: 계산 결과가 이상함

**해결책:**
- 브라우저 콘솔(F12) 확인
- JavaScript 에러 확인
- 공식 확인: mDF = 4.6 × (PT - 13.5) + Total Bilirubin

### 문제 4: 배포 실패

**해결책:**
- netlify.toml 파일 확인
- 모든 필수 파일 존재 확인
- Netlify 빌드 로그 확인

---

## 📊 배포 후 모니터링

### Netlify Analytics (선택)

1. Netlify 대시보드에서 사이트 선택
2. "Analytics" 탭 확인
3. 방문자 수, 페이지 뷰 등 확인

### Google Analytics 추가 (선택)

`index.html`의 `</head>` 전에 추가:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎯 권장 배포 방법

### 개인 프로젝트:
- **빠른 테스트**: 방법 1 (Netlify Drop)
- **장기 프로젝트**: 방법 2 (GitHub + Netlify)

### 팀 프로젝트:
- **추천**: 방법 2 (GitHub + Netlify)
- **자동 배포, 버전 관리, 협업 용이**

### 개발자/고급 사용자:
- **추천**: 방법 3 (Netlify CLI)
- **빠른 반복 배포, 로컬 제어**

---

## 📞 도움이 필요하신가요?

- 📖 **전체 문서**: README.md
- 🚀 **빠른 시작**: QUICKSTART.md
- 🐛 **버그 리포트**: GitHub Issues
- 💬 **질문**: GitHub Discussions

---

**배포 성공을 기원합니다!** 🎉
