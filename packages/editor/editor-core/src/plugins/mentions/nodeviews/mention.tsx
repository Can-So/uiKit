import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import Mention from '../ui/Mention';
import { EditorAppearance } from '../../../types';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
  editorAppearance: EditorAppearance;
}

export default class MentionNode extends React.PureComponent<Props, {}> {
  render() {
    const { node, providerFactory, editorAppearance } = this.props;
    const { id, text, accessLevel } = node.attrs;

    /**
     * Work around to bypass continuing a composition event.
     * @see ED-5924
     */
    let mentionText = text;
    if (text && editorAppearance === 'mobile') {
      mentionText = `‌‌ ${mentionText}‌‌ `;
    }

    return (
      <Mention
        id={id}
        text={mentionText}
        accessLevel={accessLevel}
        providers={providerFactory}
      />
    );
  }
}
