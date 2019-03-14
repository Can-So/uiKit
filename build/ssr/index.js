import path from 'path';

// This function fakes a renderToString in a "server" environment.
// First resetModules so that we can require a "fresh" copy of the example.
// This is important so memory is not shared between renderToString and hydrate.
// Before requiring anything we remove document and window globals.
// This tricks modules into thinking they are running in a server environment.
// After that we call renderToString and resolve with the html or reject with the error.
// We make sure that window and document are restored before returning.
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
      // $StringLitteral
      const Example = require(example).default;
      html = ReactDOMServer.renderToString(React.createElement(Example));
    } catch (e) {
      error = e;
    } finally {
      global.document = document;
      global.window = window;
    }
    if (error) {
      reject(error);
    } else {
      resolve(html);
    }
  });
