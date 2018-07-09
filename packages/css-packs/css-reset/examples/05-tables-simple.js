// @flow
import React from 'react';
// $FlowFixMe - https://github.com/facebook/flow/issues/4494
import '../src/index.less';

export default () => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Apple</td>
          <td>3</td>
          <td>$5.42</td>
        </tr>
        <tr>
          <td>Orange</td>
          <td>6</td>
          <td>$4.60</td>
        </tr>
        <tr>
          <td>Banana</td>
          <td>12</td>
          <td>$3.79</td>
        </tr>
      </tbody>
    </table>
  </div>
);
