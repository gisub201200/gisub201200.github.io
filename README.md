## 1. Start dev server
```
$ cd my-hoodie-blog
$ yarn run start
$ yarn run deploy-gh
```

## 2. Post Frontmatter (thumbnail)
`thumbnail` and `thumbnailHanja` are optional. Use an absolute path from the site root or a full URL for `thumbnail`.

Example:
```md
---
title: "Spring Cache 로 캐시 계층 구조 사용하기"
date: 2023-07-16
tags:
  - 스프링
thumbnail: /images/spring-cache-thumb.png
thumbnailHanja: "言語道斷"
---
```

Notes:
- Place local images under `static/` and reference them with a leading `/`.
- External URLs are supported (e.g. `https://...`).


### 단건 명령
```
prompts/hanja_daily_post.md 기준으로 {사용자입력}="새옹지마" 글을 생성해줘.
```
### 배치 명령
```
다음 작업을 수행해줘.

입력:
- data/idioms.txt (체크박스 형식의 목록 파일)

data/idioms.txt 형식 규칙:
- 각 줄은 아래 중 하나다.
  1) 미완료: - [ ] 한자성어
  2) 완료:   - [x] 한자성어
  3) 빈 줄 또는 주석(#로 시작) 은 무시
- "한자성어"는 다음 중 어떤 형태든 가능:
  - 새옹지마
  - 새옹지마(塞翁之馬)
  - 塞翁之馬

목표:
- 체크되지 않은(- [ ]) 항목만 처리하여 포스트 파일을 생성하고,
- 성공적으로 생성된 항목은 data/idioms.txt에서 해당 줄을 - [x] 로 변경해 저장한다.
- 이미 완료(- [x])된 항목은 절대 재처리하지 않는다.
- 실행이 여러 번 반복되어도 중복 작업이 발생하지 않게 한다(멱등성).

생성 규칙:
- prompts/hanja_daily_post.md 지침을 기준으로 각 항목마다 글 1개씩 생성한다.
- 중복 방지:

체크박스 업데이트 규칙(중요):
- 파일 생성이 성공한 경우에만 해당 줄을 - [x] 로 변경한다.
- 파일 생성이 실패했거나 스킵된 경우(- slug 중복, 파싱 실패 등)에는 체크하지 않는다.
- data/idioms.txt의 원래 순서/줄바꿈을 유지하고, 해당 체크 상태만 변경한다.

출력(중요):
- 설명은 최소화하고 아래 3가지만 출력한다.
  1) 생성된 파일 목록(경로 포함)
  2) 스킵된 항목 목록(사유 포함: 이미 완료/slug 중복/파싱 실패/기타 오류)
  3) data/idioms.txt에서 체크 상태가 변경된 항목 목록

실행:
- 위 규칙대로 data/idioms.txt를 읽고 작업을 수행하라.
- 작업 후 data/idioms.txt를 실제로 수정 저장하라.
```

### 검증명령
```
./contents/posts/daily 폴더의 md 파일들을 검사해줘.

검사 항목:
1) Front Matter YAML이 파싱 가능한지
2) 아래 헤더가 모두 존재하는지:
   # 제목
   ## 한자 풀이
   ## 뜻
   ## 예문
   ## 어원/해설
   ## 비슷한 표현
   ## 주의/활용 팁
   ## 한 줄 요약
3) keywords가 8~12개인지

결과:
- 문제 있는 파일만 목록과 함께 어떤 항목이 누락됐는지 리포트로 출력해줘.
```
