/* eslint perfectionist/sort-objects: "error" */

import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: 'prettier',
  },
  ignores: [
    './miniprogram/assets/uno.css',
  ],
  rules: {
    'no-console': 'warn',
    'prefer-promise-reject-errors': 'off',
    'style/brace-style': ['warn', '1tbs'],
    'ts/ban-ts-comment': 'off',
    'ts/no-unused-expressions': 'off',
    'unused-imports/no-unused-imports': 'warn',
  },
})
