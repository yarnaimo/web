module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          useBuiltIns: 'usage',
          corejs: 2,
          // corejs: 3,
          // loose: true,
        },
      },
    ],
    '@emotion/babel-preset-css-prop',
  ],
  plugins: ['@emotion'],
}
