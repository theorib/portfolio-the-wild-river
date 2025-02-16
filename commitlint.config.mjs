const config = {
  extends: ['@commitlint/config-conventional', 'gitmoji'],
  parserPreset: 'conventional-changelog-atom',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'i18n',
      ],
    ],
  },
}
export default config
