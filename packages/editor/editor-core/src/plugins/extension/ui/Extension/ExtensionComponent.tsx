import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import {
  selectParentNodeOfType,
  findSelectedNodeOfType,
} from 'prosemirror-utils';
import { MacroProvider } from '../../../macro';
import InlineExtension from './InlineExtension';
import Extension from './Extension';
import { ExtensionHandlers } from '@atlaskit/editor-common';
import { setNodeSelection } from '../../../../utils';

export interface Props {
  editorView: EditorView;
  macroProvider?: Promise<MacroProvider>;
  node: PMNode;
  handleContentDOMRef: (node: HTMLElement | null) => void;
  extensionHandlers: ExtensionHandlers;
}

export interface State {
  macroProvider?: MacroProvider;
}

export default class ExtensionComponent extends Component<Props, State> {
  state: State = {};
  mounted = false;

  componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    const { macroProvider } = this.props;
    if (macroProvider) {
      macroProvider.then(this.handleMacroProvider);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    const { macroProvider } = nextProps;

    if (this.props.macroProvider !== macroProvider) {
      if (macroProvider) {
        macroProvider.then(this.handleMacroProvider);
      } else {
        this.setState({ macroProvider });
      }
    }
  }

  render() {
    const { macroProvider } = this.state;
    const { node, handleContentDOMRef, editorView } = this.props;
    const extensionHandlerResult = this.tryExtensionHandler();

    switch (node.type.name) {
      case 'extension':
      case 'bodiedExtension':
        return (
          <Extension
            node={node}
            macroProvider={macroProvider}
            handleContentDOMRef={handleContentDOMRef}
            onSelectExtension={this.handleSelectExtension}
            view={editorView}
          >
            {extensionHandlerResult}
          </Extension>
        );
      case 'inlineExtension':
        return (
          <InlineExtension node={node} macroProvider={macroProvider}>
            {extensionHandlerResult}
          </InlineExtension>
        );
      default:
        return null;
    }
  }

  private handleMacroProvider = (macroProvider: MacroProvider) => {
    if (this.mounted) {
      this.setState({ macroProvider });
    }
  };

  private handleSelectExtension = hasBody => {
    const {
      state,
      state: { selection, schema },
      dispatch,
    } = this.props.editorView;
    let { tr } = state;

    if (hasBody) {
      tr = selectParentNodeOfType([schema.nodes.bodiedExtension])(state.tr);
      dispatch(tr);
    } else if (
      !findSelectedNodeOfType([
        schema.nodes.inlineExtension,
        schema.nodes.extension,
        schema.nodes.bodiedExtension,
      ])(selection)
    ) {
      setNodeSelection(this.props.editorView, selection.$from.pos - 1);
    }
  };

  private tryExtensionHandler() {
    const { node } = this.props;
    try {
      const extensionContent = this.handleExtension(node);
      if (extensionContent && React.isValidElement(extensionContent)) {
        return extensionContent;
      }
    } catch (e) {
      /* tslint:disable-next-line:no-console */
      console.error('Provided extension handler has thrown an error\n', e);
      /** We don't want this error to block renderer */
      /** We keep rendering the default content */
    }
    return null;
  }

  private handleExtension = (node: PMNode) => {
    const { extensionHandlers, editorView } = this.props;
    const { extensionType, extensionKey, parameters } = node.attrs;
    const isBodiedExtension = node.type.name === 'bodiedExtension';

    if (
      !extensionHandlers ||
      !extensionHandlers[extensionType] ||
      isBodiedExtension
    ) {
      return;
    }

    return extensionHandlers[extensionType](
      {
        type: node.type.name as
          | 'extension'
          | 'inlineExtension'
          | 'bodiedExtension',
        extensionType,
        extensionKey,
        parameters,
        content: node.content,
      },
      editorView.state.doc,
    );
  };
}
