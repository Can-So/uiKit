import * as React from 'react';
import styled from 'styled-components';
import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { findParentNode } from 'prosemirror-utils';
import { breakout } from '@atlaskit/adf-schema';
import { calcBreakoutWidth } from '@atlaskit/editor-common';
import { EditorPlugin, PMPluginFactoryParams } from '../../types';
import { ReactNodeView } from '../../nodeviews';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey as widthPluginKey, WidthPluginState } from '../width';
import LayoutButton from './ui/LayoutButton';
import { isSupportedNodeForBreakout } from './utils/is-supported-node';
import { BreakoutCssClassName } from './constants';
import { ForwardRef } from '../../nodeviews/ReactNodeView';

export const Wrapper = styled.div`
  .ProseMirror > .breakoutView-content-wrap &[data-layout='full-width'],
  .ProseMirror > .breakoutView-content-wrap &[data-layout='wide'] {
    margin-left: 50%;
    transform: translateX(-50%);
  }
`;

export const pluginKey = new PluginKey('breakoutPlugin');
export const getPluginState = (state: EditorState) => pluginKey.getState(state);

class BreakoutView extends ReactNodeView {
  getContentDOM() {
    const dom = document.createElement('div');
    // MutationObserver bug with nodeviews @see ED-6062
    dom.className = BreakoutCssClassName.BREAKOUT_MARK_DOM;
    return { dom };
  }

  render(_props: any, forwardRef: ForwardRef) {
    const { mode } = this.node.attrs;
    return (
      <WithPluginState
        editorView={this.view}
        plugins={{ widthState: widthPluginKey }}
        render={({
          widthState = { width: 0 },
        }: {
          widthState?: WidthPluginState;
        }) => (
          <Wrapper
            className="fabric-editor-breakout-mark"
            data-layout={mode}
            style={{ width: calcBreakoutWidth(mode, widthState.width) }}
          >
            <div ref={forwardRef} />
          </Wrapper>
        )}
      />
    );
  }
}

function createPlugin({
  portalProviderAPI,
  providerFactory,
  dispatch,
}: PMPluginFactoryParams) {
  return new Plugin({
    state: {
      init() {
        return {
          breakoutNode: null,
        };
      },
      apply(tr, pluginState) {
        const breakoutNode = findParentNode(isSupportedNodeForBreakout)(
          tr.selection,
        );

        if (!breakoutNode || breakoutNode.node !== pluginState.breakoutNode) {
          const nextPluginState = {
            ...pluginState,
            breakoutNode: breakoutNode ? breakoutNode.node : null,
          };
          dispatch(pluginKey, nextPluginState);
          return nextPluginState;
        }

        return pluginState;
      },
    },
    key: pluginKey,
    props: {
      nodeViews: {
        breakout: (node, view, getPos) => {
          return new BreakoutView(node, view, getPos, portalProviderAPI, {
            providerFactory,
          }).init();
        },
      },
    },
  });
}

const breakoutPlugin: EditorPlugin = {
  pmPlugins() {
    return [{ name: 'breakout', plugin: createPlugin }];
  },
  marks() {
    return [{ name: 'breakout', mark: breakout }];
  },

  contentComponent({
    editorView,
    appearance,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
  }) {
    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }) => (
          <>
            {appearance === 'full-page' && (
              <LayoutButton
                editorView={editorView}
                mountPoint={popupsMountPoint}
                boundariesElement={popupsBoundariesElement}
                scrollableElement={popupsScrollableElement}
                node={pluginState.breakoutNode}
              />
            )}
          </>
        )}
      />
    );
  },
};

export default breakoutPlugin;
