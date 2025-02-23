import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['gitmoji'],

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
