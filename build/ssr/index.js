import path from 'path';

export const ssr = async example =>
  new Promise((resolve, reject) => {
    jest.resetModules();
    let document, window, html, error;
    try {
      document = global.document;
      window = global.window;
      delete global['document'];
      delete global['window'];
      const React = require('react');
      const ReactDOMServer = require('react-dom/server');
      const Example = require(example).default;
      html = ReactDOMServer.renderToString(React.createElement(Example));
    } catch (e) {
      error = error;
    } finally {
      global.document = document;
      global.window = window;
    }
    if (error) {
      reject(e);
    } else {
      resolve(html);
    }
  });
