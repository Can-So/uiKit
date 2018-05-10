import * as React from 'react';
import styled from 'styled-components';
import AkAvatar from '@atlaskit/avatar';
import { ProviderFactory } from '@atlaskit/editor-common';

import {
  Editor as AkEditor,
  EditorActions,
  EditorContext,
  EditorProps,
  WithEditorActions,
  CollapsedEditor,
} from '@atlaskit/editor-core';

import { User } from '../model';

export interface Props {
  defaultValue?: any;
  isExpanded?: boolean;
  onCancel?: () => void;
  onSave?: (value: any) => void;
  isEditing?: boolean;

  // Provider
  dataProviders?: ProviderFactory;
  user?: User;

  // Editor
  renderEditor?: (Editor: typeof AkEditor, props: EditorProps) => JSX.Element;
  placeholder?: string;
  disableScrollTo?: boolean;
}

export interface State {
  isExpanded?: boolean;
  isEditing?: boolean;
}

const Container: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  /* -ms- properties are necessary until MS supports the latest version of the grid spec */
  /* stylelint-disable value-no-vendor-prefix, declaration-block-no-duplicate-properties */
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: auto 1fr;
  /* stylelint-enable */
  grid-template:
    'avatar-area editor-area'
    / auto 1fr;
  padding-top: 16px;
  position: relative;

  &:first-child,
  &:first-of-type {
    padding-top: 0;
  }
`;

const AvatarSection: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  /* stylelint-disable value-no-vendor-prefix */
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  /* stylelint-enable */
  grid-area: avatar-area;
  margin-right: 8px;
`;

const EditorSection: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  /* stylelint-disable value-no-vendor-prefix */
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  /* stylelint-enable */
  grid-area: editor-area;
`;

export default class Editor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isExpanded: props.isExpanded,
      isEditing: props.isEditing,
    };
  }

  private onFocus = () =>
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));

  private onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    } else {
      this.setState({
        isExpanded: false,
        isEditing: false,
      });
    }
  };

  private onSave = async (actions: any) => {
    if (this.props.onSave) {
      const value = await actions.getValue();

      if (value && value.content.some(n => n.content && n.content.length)) {
        this.props.onSave(value);
        actions.clear();
      } else {
        this.onCancel();
        return;
      }
    }

    this.setState({
      isExpanded: false,
      isEditing: false,
    });
  };

  private handleRef = (node: HTMLDivElement) => {
    if (!this.props.disableScrollTo && this.props.isExpanded && node) {
      if ((node as any).scrollIntoViewIfNeeded) {
        (node as any).scrollIntoViewIfNeeded({ behavior: 'smooth' });
      } else if (node.scrollIntoView) {
        node.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  private renderEditor = (actions: EditorActions) => {
    const {
      dataProviders,
      renderEditor,
      defaultValue,
      placeholder,
    } = this.props;
    let providers = {};

    // @TODO Remove and just pass the factory through once AkEditor is updated
    if (dataProviders) {
      (dataProviders as any).providers.forEach((provider, key) => {
        providers[key] = provider;
      });
    }

    const defaultProps: EditorProps = {
      appearance: 'comment',
      shouldFocus: true,
      allowCodeBlocks: true,
      allowLists: true,
      onSave: () => this.onSave(actions),
      onCancel: this.onCancel,
      defaultValue,
      ...providers,
    };

    return (
      <div ref={this.handleRef}>
        <CollapsedEditor
          placeholder={placeholder}
          isExpanded={this.state.isExpanded}
          onFocus={this.onFocus}
        >
          {renderEditor ? (
            renderEditor(AkEditor, defaultProps)
          ) : (
            <AkEditor {...defaultProps} />
          )}
        </CollapsedEditor>
      </div>
    );
  };

  renderAvatar() {
    const { isEditing } = this.state;
    const { user } = this.props;

    if (isEditing) {
      return null;
    }

    return (
      <AvatarSection>
        <AkAvatar src={user && user.avatarUrl} />
      </AvatarSection>
    );
  }

  render() {
    return (
      <EditorContext>
        <Container>
          {this.renderAvatar()}
          <EditorSection>
            <WithEditorActions render={actions => this.renderEditor(actions)} />
          </EditorSection>
        </Container>
      </EditorContext>
    );
  }
}
