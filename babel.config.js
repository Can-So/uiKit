//@flow

module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/syntax-dynamic-import',
    ['styled-components', { minify: false }],
  ],
  presets: ['@babel/react', '@babel/flow'],
  env: {
    'production:cjs': {
      plugins: ['@babel/transform-runtime'],
      presets: [['@babel/env', { modules: 'commonjs' }]],
      ignore: [
        '**/__mocks__',
        '**/__tests__',
        '**/__fixtures__',
        'node_modules',
      ],
    },
    'production:esm': {
      plugins: ['@babel/transform-runtime'],
      presets: [['@babel/env', { modules: false }]],
      ignore: [
        '**/__mocks__',
        '**/__tests__',
        '**/__fixtures__',
        'node_modules',
      ],
    },
    test: {
      presets: ['@babel/env'],
    },
  },
};
