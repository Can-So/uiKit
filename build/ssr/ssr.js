const React = require('react');
const ReactDOMServer = require('react-dom/server');

(() => {
  const Example = require(filePath).default;
  return ReactDOMServer.renderToString(React.createElement(Example));
})();
