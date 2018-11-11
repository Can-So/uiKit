// @flow
import React, { Fragment } from 'react';
import { AkCode } from '../src';

const exampleInlineCode = `const map = new Map({ key: 'value' })`;
const theme = { mode: 'dark' };

export default function Component() {
  return (
    <Fragment>
      <span>
        This is inline javascript code:{' '}
        <AkCode language="javascript" text={exampleInlineCode} />, check it out.
      </span>
      <br />
      <br />
      <span>
        This is inline java code with lines:{' '}
        <AkCode language="java" showLineNumbers text={exampleInlineCode} />,
        check it out.
      </span>
      <br />
      <br />
      <span>
        This is inline python code with lines and custom code style:{' '}
        <AkCode
          language="python"
          showLineNumbers
          codeStyle={{ style: 'bold' }}
          text={exampleInlineCode}
        />
      </span>
      <br />
      <br />
      <span>
        This is inline c++ code with theme:{' '}
        <AkCode
          language="c++"
          showLineNumbers
          text={exampleInlineCode}
          theme={theme}
        />
        , check it out.
      </span>
    </Fragment>
  );
}
