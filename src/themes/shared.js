const shared = {
  space: ['0rem', '0.5rem', '1rem', '2rem', '4rem', '8rem'],
  fontSizes: ['0.5rem', '0.75rem', '1rem', '2rem'],
  fontFamilies: {
    sans:
      "'Space Grotesk', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;",
    mono: '"Space Mono", Courier, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;',
  },
  grid: {
    columns: {
      three: ['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
      two: ['1fr', 'repeat(2,1fr)'],
      single: ['1fr', '1fr', 'repeat(2, 1fr)'],
    },
  },
}

export default shared
