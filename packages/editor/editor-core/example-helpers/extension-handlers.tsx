import * as React from 'react';
import { ExtensionHandlers } from '@atlaskit/editor-common';

const FakeExtension = ({ colour, children }) => {
  return (
    <div
      style={{
        backgroundColor: colour,
        color: 'white',
        padding: 10,
        minWidth: 85,
      }}
    >
      {children}
    </div>
  );
};

const InlineExtension = ({ node }) => {
  return <FakeExtension colour="green">{node.content}</FakeExtension>;
};

const BlockExtension = ({ node }) => {
  return (
    <FakeExtension colour="black">
      <div style={{ minWidth: 200 }}>{node.content}</div>
    </FakeExtension>
  );
};

const BodiedExtension = () => {
  return <FakeExtension colour="blue">Bodied extension demo</FakeExtension>;
};

export const extensionHandlers: ExtensionHandlers = {
  'com.atlassian.confluence.macro.core': (ext, doc) => {
    const { extensionKey } = ext;

    // using any here because most props are going to be injected through the extension handler
    // and typescript won't accept that as valid
    const macroProps: any = {
      node: ext,
    };

    switch (extensionKey) {
      case 'block-eh':
        return <BlockExtension {...macroProps} />;
      case 'block-layout-eh':
        return <BlockExtension {...macroProps} />;
      case 'bodied-eh':
        return <BodiedExtension {...macroProps} />;
      case 'inline-eh':
        return <InlineExtension {...macroProps} />;
    }

    return null;
  },
};
