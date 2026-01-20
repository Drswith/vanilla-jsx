import antfu from '@antfu/eslint-config'

export default antfu(
  {
    markdown: false,
    rules: {
      'no-console': 'off',
      'no-alert': 'off',
    },
  },
)
