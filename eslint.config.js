import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // v7 keeps the legacy eslintrc configs at the top level; flat configs live under `flat`.
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
  },
  {
    // Build tooling runs in Node, not the browser.
    files: ['vite.config.ts', 'eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    /*
     * Third-party React Bits sources, copied in verbatim so they can be
     * re-synced from upstream. Real errors still apply; the two rules below are
     * house style we do not get to impose on someone else's code.
     */
    files: ['src/components/reactbits/**/*.{ts,tsx}'],
    linterOptions: {
      // Upstream carries its own eslint-disable comments for a different config.
      reportUnusedDisableDirectives: false,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
])
