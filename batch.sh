#!/usr/bin/env bash
set -euo pipefail

IDIOMS_FILE="data/idioms.txt"
PROMPT_FILE="prompts/hanja_daily_post.md"

# codex exec는 자동화에 맞게 "최종 메시지"만 stdout으로 내보내고 진행상황은 stderr로 보냄  [oai_citation:2‡OpenAI 개발자 웹사이트](https://developers.openai.com/codex/noninteractive)
# 파일 생성/수정이 필요하니 --full-auto 사용(권한 최소로 workspace-write)  [oai_citation:3‡OpenAI 개발자 웹사이트](https://developers.openai.com/codex/noninteractive)

tmp="$(mktemp)"
changed=0

while IFS= read -r line || [[ -n "$line" ]]; do
  # 그대로 복사(기본)
  out_line="$line"

  # 주석/빈줄
  if [[ -z "${line// }" || "$line" =~ ^# ]]; then
    echo "$out_line" >> "$tmp"
    continue
  fi

  # 완료 항목 스킵
  if [[ "$line" =~ ^-\ \[x\]\  ]]; then
    echo "$out_line" >> "$tmp"
    continue
  fi

  # 미완료 항목만 처리
  if [[ "$line" =~ ^-\ \[\ \]\  ]]; then
    item="${line#- [ ] }"
    item="${item#"${item%%[![:space:]]*}"}" # ltrim

    echo "Processing: $item" >&2

    # Codex에게 "프롬프트 파일을 따르라 + 입력은 이거다"만 전달
    # (프롬프트 본문은 파일로 유지)
    codex exec --full-auto \
      "Read and follow the instructions in ${PROMPT_FILE}. Generate one post for: ${item}. Do not do extra planning; just execute." \
      >/dev/null

    # 성공하면 체크 표시로 바꿈
    out_line="- [x] ${item}"
    changed=1
  fi

  echo "$out_line" >> "$tmp"
done < "$IDIOMS_FILE"

# 체크박스 업데이트 저장
if [[ "$changed" -eq 1 ]]; then
  mv "$tmp" "$IDIOMS_FILE"
else
  rm -f "$tmp"
fi

echo "DONE. Updated: $changed" >&2
