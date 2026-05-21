# Linting and Formatting Guide

This document describes the code quality tools configured for the Flowee Survey App.

## Tools

### ESLint

ESLint is configured to enforce code quality and catch potential bugs.

**Configuration:** `eslint.config.mjs`

**Key Features:**

- Next.js recommended rules (core-web-vitals + TypeScript)
- TypeScript-specific rules for type safety
- React best practices
- Custom rules for code quality

**Custom Rules:**

- `@typescript-eslint/no-unused-vars`: Warns about unused variables (allows `_` prefix for intentionally unused)
- `@typescript-eslint/no-explicit-any`: Warns when using `any` type
- `no-console`: Warns about console.log (allows console.warn and console.error)
- `prefer-const`: Encourages using const over let when possible
- `no-var`: Disallows var declarations

### Prettier

Prettier is configured for consistent code formatting.

**Configuration:** `.prettierrc`

**Settings:**

- No semicolons
- Single quotes
- 2 spaces for indentation
- ES5 trailing commas
- Tailwind CSS class sorting (via plugin)

### EditorConfig

EditorConfig ensures consistent coding styles across different editors.

**Configuration:** `.editorconfig`

**Settings:**

- UTF-8 charset
- LF line endings
- 2 space indentation for JS/TS/JSON
- Trim trailing whitespace
- Insert final newline

## Usage

### Check for Linting Errors

```bash
npm run lint
```

### Fix Linting Errors Automatically

```bash
npm run lint:fix
```

### Check Formatting

```bash
npm run format -- --check
```

### Format Code

```bash
npm run format
```

### Type Check

```bash
npm run type-check
```

## Pre-commit Workflow (Recommended)

Before committing code, run:

```bash
npm run lint:fix && npm run format && npm run type-check
```

Or create a git pre-commit hook to automate this.

## IDE Integration

### VS Code

Install these extensions:

- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- EditorConfig (editorconfig.editorconfig)

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### WebStorm / IntelliJ IDEA

1. Enable ESLint: Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
2. Enable Prettier: Settings → Languages & Frameworks → JavaScript → Prettier
3. Enable "Run on save" for both tools

## Ignored Files

The following files/directories are ignored by linting and formatting tools:

- `node_modules/`
- `.next/`
- `out/`
- `build/`
- `dist/`
- `*.db` (SQLite databases)
- `drizzle/**/*.sql` (Database migrations)
- `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`

## Troubleshooting

### ESLint errors after updating dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

### Prettier conflicts with ESLint

This setup is configured to avoid conflicts. Prettier handles formatting, ESLint handles code quality.

### Editor not picking up configuration

1. Restart your editor
2. Check that extensions are installed and enabled
3. Verify configuration files are in the project root
