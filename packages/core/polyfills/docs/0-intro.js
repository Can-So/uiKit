// @flow
import React from 'react';
import { md } from '@findable/docs';

export default md`
  This package provides the following polyfills

  ${(
    <div style={{ padding: '20px' }}>
      <h3>Object.assign</h3>
      <pre>{"import '@findable/polyfills/object-assign';"}</pre>
      <h3>Array.prototype.includes</h3>
      <pre>{"import '@findable/polyfills/array-prototype-includes';"}</pre>
      <h3>Array.prototype.find</h3>
      <pre>{"import '@findable/polyfills/array-prototype-find';"}</pre>
      <h3>String.prototype.includes</h3>
      <pre>{"import '@findable/polyfills/string-prototype-includes';"}</pre>
    </div>
  )}

  You can also pull them all in at once (not reccomended) using:

  ${(
    <div style={{ padding: '20px' }}>
      <pre>{"import '@findable/polyfills';"}</pre>
    </div>
  )}
`;
