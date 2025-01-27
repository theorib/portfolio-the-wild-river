import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const nextConfig = compat.config({
  extends: ['next/core-web-vitals', 'next/typescript'],
});

const eslintConfig = tseslint.config(
  eslint.configs.recommended,
  eslintConfigPrettier,
  tseslint.configs.recommendedTypeChecked,
  reactRefresh.configs.recommended,
  ...nextConfig,
  ...pluginQuery.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreIIFE: true,
        },
      ],
    },
  },
);

export default eslintConfig;
