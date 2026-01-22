const INK = "#1a1a17"
const INK_SOFT = "#2a2623"
const INK_MUTED = "#4b4641"
const INK_FAINT = "#6c655f"
const PAPER = "#f6f1e6"
const PAPER_SOFT = "#fbf7ee"
const PAPER_WARM = "#f2ecdf"
const PAPER_BORDER = "#d7cfc1"
const PAPER_DIVIDER = "#e3dbcf"
const SEAL = "#a3322b"
const SEAL_SOFT = "#c76d5f"

const DARK_INK = "#0f0f0e"
const DARK_PAPER = "#141311"
const DARK_SURFACE = "#1c1a16"
const DARK_SURFACE_SOFT = "#221f1a"
const DARK_BORDER = "#3c362e"
const DARK_DIVIDER = "#2c2822"
const DARK_TEXT = "#e9e2d6"
const DARK_TEXT_SOFT = "#cfc5b7"
const DARK_TEXT_MUTED = "#b0a698"
const DARK_TEXT_FAINT = "#8b8377"
const SEAL_DARK = "#d06455"

export const light = {
  name: "light",
  fonts: {
    body: '"Noto Serif KR", "Nanum Myeongjo", "Apple SD Gothic Neo", serif',
    heading: '"Song Myung", "Noto Serif KR", serif',
    ui: '"Noto Sans KR", "Apple SD Gothic Neo", sans-serif',
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "17px",
    lg: "19px",
    xl: "24px",
    xxl: "32px",
  },
  lineHeights: {
    tight: 1.35,
    normal: 1.6,
    relaxed: 1.8,
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",
  },
  radii: {
    sm: "4px",
    md: "8px",
    pill: "999px",
  },
  shadows: {
    soft: "0 6px 18px rgba(32, 24, 16, 0.08)",
    subtle: "0 2px 8px rgba(32, 24, 16, 0.06)",
  },
  colors: {
    bodyBackground: PAPER,
    boldText: INK,
    text: INK_SOFT,
    secondaryText: INK_MUTED,
    tertiaryText: INK_FAINT,
    mutedText: "#8a827a",
    hoveredLinkText: PAPER,
    border: PAPER_BORDER,
    heroBorder: PAPER_BORDER,
    activatedBorder: "#b8b0a3",
    background: PAPER_WARM,
    surface: PAPER_SOFT,
    icon: INK_FAINT,
    divider: PAPER_DIVIDER,
    headerBackground: "rgba(246, 241, 230, 0.88)",
    headerShadow: "rgba(63, 52, 40, 0.08)",
    inlineCodeBackground: "#ede6d8",
    inlineCodeBackgroundDarker: "#e0d7c7",
    tagBackground: "#f0e8da",
    selectedTagBackground: "#2d2722",
    hoveredTagBackground: "#e7ddcd",
    hoveredSelectedTagBackground: "#3a332d",
    nextPostButtonBackground: "#f7f1e4",
    hoveredNextPostButtonBackground: "#efe6d6",
    seriesBackground: "#f1ebde",
    tagText: "#4a443d",
    selectedTagText: "#f9f4ea",
    spinner: INK_SOFT,
    scrollTrack: "#efe6d6",
    scrollHandle: "#d6ccbb",
    blockQuoteBorder: "#d0c4b4",
    blockQuoteBackground: "#f4eee2",
    textFieldBorder: "#d1c6b6",
    textFieldActivatedBorder: SEAL,
    tableBackground: "#f1eadc",
    hrefLink: SEAL,
    accent: SEAL,
    accentMuted: SEAL_SOFT,
  },
}

export const dark = {
  name: "dark",
  fonts: {
    body: '"Noto Serif KR", "Nanum Myeongjo", "Apple SD Gothic Neo", serif',
    heading: '"Song Myung", "Noto Serif KR", serif',
    ui: '"Noto Sans KR", "Apple SD Gothic Neo", sans-serif',
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "17px",
    lg: "19px",
    xl: "24px",
    xxl: "32px",
  },
  lineHeights: {
    tight: 1.35,
    normal: 1.6,
    relaxed: 1.8,
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",
  },
  radii: {
    sm: "4px",
    md: "8px",
    pill: "999px",
  },
  shadows: {
    soft: "0 6px 18px rgba(0, 0, 0, 0.3)",
    subtle: "0 2px 8px rgba(0, 0, 0, 0.25)",
  },
  colors: {
    bodyBackground: DARK_PAPER,
    boldText: DARK_TEXT,
    text: DARK_TEXT_SOFT,
    secondaryText: DARK_TEXT_MUTED,
    tertiaryText: DARK_TEXT_FAINT,
    mutedText: "#6f685d",
    hoveredLinkText: DARK_INK,
    border: DARK_BORDER,
    heroBorder: DARK_BORDER,
    activatedBorder: "#544c41",
    background: DARK_SURFACE,
    surface: DARK_SURFACE_SOFT,
    icon: DARK_TEXT_FAINT,
    divider: DARK_DIVIDER,
    headerBackground: "rgba(20, 19, 17, 0.86)",
    headerShadow: "rgba(0, 0, 0, 0.35)",
    inlineCodeBackground: "#23201b",
    inlineCodeBackgroundDarker: "#2a261f",
    tagBackground: "#23201b",
    selectedTagBackground: DARK_TEXT,
    hoveredTagBackground: "#2b261f",
    hoveredSelectedTagBackground: "#f2e9d9",
    nextPostButtonBackground: "rgba(255, 255, 255, 0.05)",
    hoveredNextPostButtonBackground: "rgba(255, 255, 255, 0.08)",
    seriesBackground: DARK_SURFACE,
    tagText: DARK_TEXT_SOFT,
    selectedTagText: DARK_INK,
    spinner: DARK_TEXT,
    scrollTrack: DARK_DIVIDER,
    scrollHandle: DARK_BORDER,
    blockQuoteBorder: "#3f372f",
    blockQuoteBackground: DARK_SURFACE,
    textFieldBorder: "#3a332b",
    textFieldActivatedBorder: SEAL_DARK,
    tableBackground: "#221f1a",
    hrefLink: SEAL_DARK,
    accent: SEAL_DARK,
    accentMuted: "#e08a7d",
  },
}
