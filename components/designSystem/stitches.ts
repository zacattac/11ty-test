import { createStyled } from "@stitches/react";

const Color = (
  hue: number,
  sat: number,
  light: number,
  opacity: number,
): string => {
  return `hsla(${hue}, ${sat}%, ${light}%, ${opacity})`;
};

export const theme = {
  colors: {
    $primary: Color(115, 13, 11, 0.8),
    $secondary: Color(115, 13, 30, 1),
    $faded: Color(115, 13, 11, 0.2),
    $bg: "#FDFFFA",
  },
  space: {
    $0: "0",
    $_25: "0.25rem",
    $_5: "0.5rem",
    $1: "1rem",
    $2: "2rem",
    $2_5: "3rem",
    $3: "6rem",
  },
  fontSizes: {
    $1: "1rem",
    $2: "1.2rem",
    $3: "0.75rem",
  },
  fontWeights: {
    $normal: "400",
    $semi: "600",
  },
  fonts: {
    $system: "system-ui",
    $sans:
      "'GT America Extended', ‘Helvetica Neue’, Helvetica, Arial, sans-serif",
    $serif: "'Blanco', Georgia, 'Times New Roman', Times, serif",
    $mono: "'Pitch', Monaco, ‘Courier New’, Courier, monospace",
  },
  letterSpacings: {
    $logo: "-0.5px",
  },
  lineHeights: {
    $default: "1.4",
    $heading: "1.3",
    $crushed: "1.1",
    $relaxed: "1.6",
  },
  sizes: {
    $full: "100%",
    $measure: "30rem",
    $compact: "15rem",
  },
  radii: {
    $image: "2px",
  },
  borderWidths: {
    $1: "1px",
  },
};

const darkTheme = {
  $primary: Color(36, 37, 92, 1),
  $secondary: Color(36, 13, 63, 1),
  faded: Color(36, 13, 63, 0.5),
  $bg: "#192018",
};

export const { styled, css } = createStyled({
  tokens: theme,
  breakpoints: {
    bp0: (rule) => `@media (min-width: 400px) { ${rule} }`,
    bp1: (rule) => `@media (min-width: 600px) { ${rule} }`,
    bp2: (rule) => `@media (min-width: 800px) { ${rule} }`,
    bp3: (rule) => `@media (min-width: 1000px) { ${rule} }`,
    bp4: (rule) => `@media (min-width: 1600px) { ${rule} }`,
  },
});

export const darkThemeClass = css.theme({ colors: darkTheme });