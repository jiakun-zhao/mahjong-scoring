import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    overrides: {
      'no-console': 'warn',
      'style/brace-style': ['warn', '1tbs'],
      'ts/ban-ts-comment': 'off',
      'ts/no-unused-expressions': 'off',
      'unused-imports/no-unused-imports': 'warn',
    },
  },
  formatters: {
    css: 'prettier',
  },
  ignores: [
    './miniprogram/assets/unocss.scss',
  ],
})
