# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Project Layout

This repo has two layers:

- **`/` (root)** — The Sublime Text plugin (Python). Entry point is `plugin.py`, which subclasses `NpmClientHandler` from `lsp_utils`.
- **`/language-server/`** — Pre-built JavaScript language server. Contains **no TypeScript source**; the `.js` files in `out/` are compiled from the upstream [rech-editor-batch](https://github.com/RechInformatica/rech-editor-batch) repo via `compile-language-server.sh`.

## Commands

```bash
make install-dev      # Install dev dependencies (uv sync --dev)
make ci-check         # Lint + format check (ruff)
make ci-fix           # Auto-fix lint + format issues
make ci-fix-unsafe    # Auto-fix including unsafe fixes
```

No test suite exists for the Python plugin.

## Code Style

- Formatter/linter: **ruff** (line length 120, Python 3.8 target)
- All Python files require `from __future__ import annotations` at the top (enforced by isort config)
- Mypy is run in CI only (requires external stubs — see CI workflow for setup)

## Language Server

- `language-server/out/` contains pre-built JS. Do not edit these files directly.
- To rebuild from upstream: run `./language-server/compile-language-server.sh` (interactive — prompts for a git ref).
- `node_modules` is **not** checked in and is installed at runtime by Sublime Text's `lsp_utils`, not during development.
- The `package.json` scripts (`npm test`, `npm run compile`, `npm run lint`) in `language-server/` are copied from upstream and are **not** usable in this repo.

## What to Avoid

- Do not run `npm` commands inside `language-server/` unless rebuilding via the shell script.
- Do not add `node_modules` or modify `language-server/out/` manually.

## Approach

- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read unless the file may have changed.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.
