import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import skipFormatting from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    rules: {
      'sort-imports': 'off',
      'import/order': 'off',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^\\u0000',
              '^vue',
              '^@vue',
              '^@?\\w',
              '^@/',
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
              '^.+\\.s?css$',
            ],
          ],
        },
      ],

      'simple-import-sort/exports': 'error',

      'import/no-duplicates': 'error',
    },
  },

  skipFormatting,
)
