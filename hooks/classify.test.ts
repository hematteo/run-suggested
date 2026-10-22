import { expect, test } from 'claude-code/testing'

import { classify, splitCommand } from './register'

// Example permission rules, in the shape Claude Code's settings.json holds them
const rules = {
  allow: ['Bash(ls *)', 'Bash(git *)', 'Bash(rm *)', 'Bash(pwd)', 'Bash(npm *)', 'Bash(cat *)'],
  ask: ['Bash(git push *)', 'Bash(rm -r *)', 'Bash(curl *)'],
  deny: ['Bash(sudo *)', 'Bash(git push --force *)', 'Bash(rm -rf /)'],
}

test('deny beats ask beats allow, unlisted needs two presses', () => {
  expect(classify('ls src', rules)).toBe('allow')
  expect(classify('ls', rules)).toBe('allow')
  expect(classify('pwd', rules)).toBe('allow')
  expect(classify('git status --short', rules)).toBe('allow')
  expect(classify('git push origin main', rules)).toBe('ask')
  expect(classify('git push --force origin main', rules)).toBe('deny')
  expect(classify('rm -r build', rules)).toBe('ask')
  expect(classify('rm notes.txt', rules)).toBe('allow')
  expect(classify('sudo reboot', rules)).toBe('deny')
  expect(classify('make check', rules)).toBe('default')
})

test('a compound command is as risky as its riskiest part', () => {
  expect(classify('ls && pwd', rules)).toBe('allow')
  expect(classify('ls && make check', rules)).toBe('default')
  expect(classify('git add . && git push origin main', rules)).toBe('ask')
  expect(classify('cat urls.txt | sudo tee /etc/hosts', rules)).toBe('deny')
})

test('splitting ignores operators inside quotes and escapes', () => {
  expect(splitCommand('echo "a && b" && ls')).toEqual(['echo "a && b"', 'ls'])
  expect(splitCommand("grep 'x|y' log.txt | wc -l")).toEqual(["grep 'x|y' log.txt", 'wc -l'])
  expect(splitCommand('echo a\\;b; pwd')).toEqual(['echo a\\;b', 'pwd'])
  expect(classify('echo "sudo reboot"', rules)).toBe('default')
})
