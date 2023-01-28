'use strict';

module.exports = {
  plugins: [
    'stylelint-scss',
  ],
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'string-quotes': 'single',
    'max-empty-lines': 2,
    'max-line-length': 130,
    'selector-list-comma-newline-after': null,
    'number-leading-zero': 'never',
    'selector-class-pattern': null,
    'selector-pseudo-element-colon-notation': 'single',
    'selector-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'declaration-colon-newline-after': 'always-multi-line',
    'no-descending-specificity': null,
    'value-keyword-case': ['lower', {
      camelCaseSvgKeywords: true,
      ignoreProperties: [''],
    }],
    'scss/dollar-variable-empty-line-before': null,
    'scss/dollar-variable-colon-space-after': 'at-least-one-space',
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/no-global-function-names': null,
  },
};
