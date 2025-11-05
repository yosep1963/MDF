# mDF Calculator PWA

알코올성 간염 평가를 위한 수정된 판별함수(modified Discriminant Function, mDF) 점수 계산기입니다. PWA(Progressive Web App)로 제작되어 오프라인에서도 사용 가능하며, 스마트폰 홈 화면에 설치하여 앱처럼 사용할 수 있습니다.

## 특징

- **정확한 계산**: mDF = 4.6 × (PT - Control PT) + Total Bilirubin
- **다국어 지원**: 한국어/영어 전환 가능
- **PWA 기능**: 오프라인 사용 가능, 홈 화면에 추가 가능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **사용자 친화적**: 깔끔한 의료용 UI
- **자동 저장**: 입력값 자동 저장 및 복원
- **임상적 해석**: 결과에 대한 임상적 의미 제공
- **계산 과정 표시**: 상세한 계산 과정 확인 가능

## 계산 공식

```
mDF = 4.6 × (PT - Control PT) + Total Bilirubin
```

- **PT**: 환자의 PT 값 (초)
- **Control PT**: 대조군 PT 상한값 (기본값: 13.5초)
- **Total Bilirubin**: 총 빌리루빈 (mg/dL)

### 임상적 해석

- **mDF < 32**: 경증-중등도 알코올성 간염
- **mDF ≥ 32**: 중증 알코올성 간염 (코르티코스테로이드 치료 고려)

## 프로젝트 구조

```
mDF/
├── index.html           # 메인 HTML 파일
├── css/
│   └── styles.css       # 스타일시트
├── js/
│   ├── app.js           # 계산 로직
│   └── i18n.js          # 다국어 지원
├── sw.js                # Service Worker
├── manifest.json        # PWA 매니페스트
├── icons/               # 앱 아이콘
│   ├── icon-192.png
│   └── icon-512.png
├── netlify.toml         # Netlify 설정
└── README.md            # 문서
```

## 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PWA**: Service Worker, Web App Manifest
- **배포**: Netlify
- **특징**: 순수 JavaScript (프레임워크 없음)

## 로컬 실행 방법

### 1. 프로젝트 클론/다운로드

```bash
# Git 클론 (저장소가 있는 경우)
git clone <repository-url>
cd mDF

# 또는 ZIP 파일 다운로드 후 압축 해제
```

### 2. 로컬 서버 실행

PWA는 HTTPS 또는 localhost에서만 작동하므로 로컬 서버가 필요합니다.

**방법 1: Python 사용 (권장)**

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**방법 2: Node.js http-server 사용**

```bash
# http-server 설치
npm install -g http-server

# 서버 실행
http-server -p 8000
```

**방법 3: VS Code Live Server 확장 사용**

1. VS Code에서 프로젝트 폴더 열기
2. Live Server 확장 설치
3. index.html 우클릭 → "Open with Live Server"

### 3. 브라우저에서 열기

```
http://localhost:8000
```

## 아이콘 생성 가이드

PWA 아이콘이 필요합니다. 다음 방법 중 하나를 선택하세요:

### 방법 1: 온라인 아이콘 생성기 사용 (권장)

1. [Favicon.io](https://favicon.io/favicon-generator/) 또는 [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) 방문
2. 텍스트 또는 이미지로 아이콘 생성
3. 다운로드한 `icon-192.png`와 `icon-512.png`를 `icons/` 폴더에 저장

### 방법 2: 기존 이미지 사용

1. 512x512 이미지 준비 (PNG 형식)
2. 온라인 이미지 리사이저로 192x192 버전 생성
3. `icons/` 폴더에 저장

### 방법 3: 간단한 플레이스홀더 생성

임시로 단색 아이콘을 사용하려면:

1. [Placeholder.com](https://placeholder.com/) 방문
2. `https://via.placeholder.com/192/2c3e50/ffffff?text=mDF` (192x192)
3. `https://via.placeholder.com/512/2c3e50/ffffff?text=mDF` (512x512)
4. 다운로드하여 `icons/` 폴더에 저장

## Netlify 배포 가이드

### 방법 1: GitHub 연동 (권장)

1. **GitHub에 코드 푸시**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: mDF Calculator PWA"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Netlify에 로그인**
   - [Netlify](https://www.netlify.com/) 방문
   - GitHub 계정으로 로그인

3. **새 사이트 추가**
   - "Add new site" → "Import an existing project" 클릭
   - GitHub 선택
   - 저장소 선택

4. **배포 설정**
   - Build command: (비워두기)
   - Publish directory: `.`
   - "Deploy site" 클릭

5. **자동 배포 완료!**
   - GitHub에 푸시할 때마다 자동으로 배포됩니다

### 방법 2: Netlify CLI 사용

1. **Netlify CLI 설치**

   ```bash
   npm install -g netlify-cli
   ```

2. **Netlify 로그인**

   ```bash
   netlify login
   ```

3. **초기화 및 배포**

   ```bash
   # 프로젝트 디렉토리에서
   netlify init

   # 배포
   netlify deploy --prod
   ```

### 방법 3: 드래그 앤 드롭

1. **Netlify Drop** 사용
   - [Netlify Drop](https://app.netlify.com/drop) 방문
   - 프로젝트 폴더 전체를 드래그 앤 드롭

2. **즉시 배포 완료!**

## 배포 후 PWA 설치

### 모바일 (Android/iOS)

1. 배포된 사이트를 모바일 브라우저에서 열기
2. **Android Chrome**: 메뉴 → "홈 화면에 추가"
3. **iOS Safari**: 공유 버튼 → "홈 화면에 추가"

### 데스크톱 (Chrome/Edge)

1. 배포된 사이트를 브라우저에서 열기
2. 주소창 오른쪽의 설치 아이콘 클릭
3. "설치" 클릭

## 사용 방법

1. **Patient PT** 입력 (환자의 PT 값, 초 단위)
2. **Total Bilirubin** 입력 (총 빌리루빈, mg/dL 단위)
3. (선택) **고급 옵션**에서 Control PT 값 조정 (기본값: 13.5초)
4. **Calculate mDF** 버튼 클릭
5. 결과 및 임상적 해석 확인

### 언어 전환

- 우측 상단의 언어 버튼 클릭 (한국어 ↔ English)
- 선택한 언어는 자동 저장됩니다

## 브라우저 호환성

- Chrome/Edge: ✅ 완벽 지원
- Safari (iOS/macOS): ✅ 완벽 지원
- Firefox: ✅ 완벽 지원
- Samsung Internet: ✅ 완벽 지원

## 보안 및 개인정보

- 모든 계산은 클라이언트 측에서 수행됩니다
- 데이터는 서버로 전송되지 않습니다
- 입력값은 브라우저 로컬 저장소에만 저장됩니다
- 개인정보를 수집하지 않습니다

## 의료 면책 조항

이 계산기는 **교육 목적**으로만 제공됩니다. 의료 결정을 내릴 때는 반드시 자격을 갖춘 의료 전문가와 상담하시기 바랍니다. 이 도구는 의학적 조언, 진단 또는 치료를 대체하지 않습니다.

## 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 기여

버그 리포트나 기능 제안은 환영합니다!

## 문의

질문이나 피드백이 있으시면 이슈를 등록해주세요.

---

**Version**: 1.0.0
**Last Updated**: 2025
**Made with**: HTML, CSS, JavaScript
