## 1. Start dev server
```
$ cd my-hoodie-blog
$ yarn run start
$ yarn run deploy-gh
```

## 2. Post Frontmatter (thumbnail)
`thumbnail` is optional. Use an absolute path from the site root or a full URL.

Example:
```md
---
title: "Spring Cache 로 캐시 계층 구조 사용하기"
date: 2023-07-16
tags:
  - 스프링
thumbnail: /images/spring-cache-thumb.png
---
```

Notes:
- Place local images under `static/` and reference them with a leading `/`.
- External URLs are supported (e.g. `https://...`).
