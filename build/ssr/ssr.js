const path = require('path');

require('@babel/register')({
  plugins: [path.join(__dirname, 'require-transform.js')],
  presets: ['@babel/preset-typescript'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
require('@babel/polyfill');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

(() => {
  const Example = require(filePath).default;
  return ReactDOMServer.renderToString(React.createElement(Example));
})();
