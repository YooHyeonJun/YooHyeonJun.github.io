# 유현준 포트폴리오

PPT 포트폴리오(v7)를 웹으로 옮긴 정적 사이트입니다. 빌드 과정 없이 GitHub Pages에 그대로 올리면 됩니다.

## 배포

1. GitHub에서 `YooHyeonJun.github.io` 저장소를 만듭니다 (Public).
2. 이 폴더의 파일 전체(`.nojekyll` 포함)를 저장소 최상위에 올립니다.
3. Settings → Pages → Branch를 `main` / `/(root)`로 저장합니다.
4. 1~2분 뒤 `https://yoohyeonjun.github.io` 에서 열립니다.

## 구성

- `index.html` 본문 전체 (텍스트 수정은 여기서)
- `assets/style.css` 디자인
- `assets/main.js` 상단 메뉴 표시, 핵심 프로젝트 전환, 이미지 확대
- `assets/img/` PPT에서 추출한 이미지와 슬라이드 렌더링 크롭
- `assets/fonts/` 나눔스퀘어 (SIL Open Font License)

## 자주 고칠 부분

- 수상 내역: `index.html`에서 `Award &amp; Scholarship` 목록
- 핵심 프로젝트의 노션 링크: `assets/main.js`의 `PROJECTS` 안 `href`
  (노션 페이지마다 "웹에 게시"를 켜야 다른 사람이 열 수 있습니다)
