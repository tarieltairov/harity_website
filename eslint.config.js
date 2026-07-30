import path from 'node:path'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import importAlias from '@limegrass/eslint-plugin-import-alias'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@limegrass/import-alias': importAlias,
    },
    rules: {
      // Заменяет относительные импорты «наверх» на алиасы из tsconfig.app.json.
      // Автоисправляется через --fix, т.е. работает в yarn fix.
      '@limegrass/import-alias/import-alias': [
        'error',
        {
          aliasConfigPath: path.resolve(import.meta.dirname, 'tsconfig.app.json'),
          // depth считает только сегменты '..', поэтому './x' и './components/x'
          // остаются относительными, а всё с '../' переписывается на алиас.
          relativeImportOverrides: [{ path: 'src', depth: 0 }],
        },
      ],
    },
  },
  // Отключает ESLint-правила, конфликтующие с Prettier. Должен идти последним.
  prettier,
])
