// @flow

import React from 'react';
import EditorFeedbackIcon from '@atlaskit/icon/glyph/editor/feedback';
import Panel from '../src';

const Header = (
  <h1>
    Component based header <EditorFeedbackIcon size="large" />
  </h1>
);

export default () => (
  <div style={{ margin: '8px 24px' }}>
    <Panel header={Header} isDefaultExpanded>
      <p>
        Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco
        deserunt aute id consequat veniam incididunt duis in sint irure nisi.
        Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor
        esse quis.
      </p>
      <p>
        Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit
        magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit
        dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia
        eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
        nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
        et. Culpa deserunt nostrud ad veniam.{' '}
        <a href="https://atlassian.design/">Test link for tabbing</a>
      </p>
    </Panel>
  </div>
);
