import '../src/index.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewHead: (head) => `
    ${head}
    <style>
      html, body {
        background: chocolate !important;
      }
    </style>
  `,
}