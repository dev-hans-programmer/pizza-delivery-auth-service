/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsConfigRootDir: __dirname,
        project: true,
    },
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        'no-console': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
    },
};
