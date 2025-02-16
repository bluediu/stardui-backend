import globals from 'globals';
import pluginJs from '@eslint/js';
import jsdocPlugin from 'eslint-plugin-jsdoc';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: {
      jsdoc: jsdocPlugin,
    },
    languageOptions: { globals: globals.node },
    rules: {
      'no-undef': 'error',
      'jsdoc/no-undefined-types': 'error',
      'jsdoc/check-param-names': 'error',
      'arrow-body-style': 'off',
      'class-methods-use-this': 'off',
      'comma-dangle': 'off',
      'eol-last': 'off',
      'func-names': 'off',
      'global-require': 'off',
      'linebreak-style': 'off',
      'no-console': 'off',
      'no-multiple-empty-lines': 'warn',
      'no-trailing-spaces': 'warn',
      'no-underscore-dangle': 'off',
      'no-unused-vars': 'warn',
      'object-curly-newline': 'off',
      'operator-linebreak': 'off',
      'prefer-promise-reject-errors': 'off',
    },
  },
  pluginJs.configs.recommended,
];
