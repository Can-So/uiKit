// @flow

import React, { Fragment } from 'react';
import Banner from '../src';

export default () => (
  <Fragment>
    <Banner isOpen appearance="announcement">
      Simple announcement banner
    </Banner>
    <div>
      Below we have an announcement banner with long contents, to show how it
      differs
    </div>
    <Banner isOpen appearance="announcement">
      <ul style={{ listStyleType: 'none', textAlign: 'left' }}>
        <li>I am the very model of a modern Major-General,</li>
        <li>I{"'"}ve information vegetable, animal, and mineral,</li>
        <li>I know the kings of England, and I quote the fights historical</li>
        <li>From Marathon to Waterloo, in order categorical;</li>
        <li>I{"'"}m very well acquainted, too, with matters mathematical,</li>
        <li>I understand equations, both the simple and quadratical,</li>
        <li>
          About binomial theorem I{"'"}m teeming with a lot o{"'"} news,
        </li>
        <li> With many cheerful facts about the square of the hypotenuse.</li>
      </ul>
    </Banner>
  </Fragment>
);
