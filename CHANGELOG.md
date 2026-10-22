# Changelog

Notable changes to run-suggested. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-10-22

First release.

### Added

- Numbered shortcuts above the prompt for the shell commands in Claude's last reply, up to nine, taken only from fenced `sh`, `bash`, `zsh`, `shell` and `console` blocks.
- Pressing a number runs that command in your login shell, in the session's working directory, with its output streaming into the row; pressing it again while it runs stops it.
- `0` runs all of them in order, stopping at the first failure.
- Your Bash permission rules decide what each press does: an allowed command runs on one press, an `ask` or unlisted one needs two, and a denied one can't be run from the row. A compound command is as risky as its riskiest part.
- Everything that ran, with its output and exit status, is attached to your next prompt.
- "Ask Claude about this failure" for the most recent failed command, by click or `ctrl+x tab` then `a`.
- A system prompt section asking Claude to put commands meant for you in `sh` blocks.
- Options: `icon`, `indent`, `frameColor`, `detailColor`.
- The plugin icon, and a "How it works" section in the README naming the hooks and calls the module uses.

[Unreleased]: https://github.com/hematteo/run-suggested/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/hematteo/run-suggested/releases/tag/v0.1.0
