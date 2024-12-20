/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  semi: false,
  useTabs: false,
  singleQuote: true,
  arrowParens: 'avoid',
  tabWidth: 2,
  trailingComma: 'none',
  printWidth: 120,
  overrides: [
    {
      files: '*.yaml',
      options: {
        singleQuote: false
      }
    }
  ]
}
