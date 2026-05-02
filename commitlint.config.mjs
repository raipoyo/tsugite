export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type の許可リスト (conventional commits 標準 + custom)
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'ci'],
    ],
    // subject は小文字スタート必須
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    // subject の最大文字数
    'subject-max-length': [2, 'always', 100],
    // body は空行1行あける
    'body-leading-blank': [2, 'always'],
  },
}
