import { expect, test } from 'claude-code/testing'

import { extract } from './register'

test('only shell fences become commands', () => {
  const answer = [
    'Check the build, then send a test request:',
    '```sh',
    'make check',
    '# a comment',
    '$ curl -s localhost:8000/health -H "Accept: application/json"',
    '```',
    'Output looks like:',
    '```',
    '{"status": "ok"}',
    '```',
    '```text',
    '! bang-in-text-fence',
    '```',
    'Prose like `!cmd1 && cmd2` is not a command.',
    '```zsh',
    '! git status',
    '…',
    '<your command here>',
    '```',
    '```bash',
    'uv run python train.py \\',
    '  --seed 0',
    '```',
  ].join('\n')
  expect(extract(answer)).toEqual([
    'make check',
    'curl -s localhost:8000/health -H "Accept: application/json"',
    'git status',
    'uv run python train.py --seed 0',
  ])
})

test('caps at nine and dedupes', () => {
  const answer = '```sh\n' + Array.from({ length: 12 }, (_, i) => `echo ${i % 10}`).join('\n') + '\n```'
  expect(extract(answer)).toHaveLength(9)
})
