import * as React from 'react';
import {
  Node as PmNode,
  DOMOutputSpec,
  DOMSerializer,
} from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { generateColgroup } from '../utils';
import TableComponent from './TableComponent';

import WithPluginState from '../../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../../width';
import { pluginKey, getPluginState } from '../pm-plugins/main';
import { pluginKey as tableResizingPluginKey } from '../pm-plugins/table-resizing/index';
import { pluginConfig as getPluginConfig } from '../index';

export interface Props {
  node: PmNode;
  view: EditorView;
  allowColumnResizing?: boolean;
  cellMinWidth?: number;
  portalProviderAPI: PortalProviderAPI;
  getPos: () => number;
}

const tableAttributes = (node: PmNode) => {
  return {
    'data-number-column': node.attrs.isNumberColumnEnabled,
    'data-layout': node.attrs.layout,
    'data-autosize': node.attrs.__autoSize,
  };
};

const toDOM = (node: PmNode, props: Props) => {
  let colgroup: DOMOutputSpec = '';

  if (props.allowColumnResizing) {
    // @ts-ignore
    colgroup = ['colgroup', {}].concat(generateColgroup(node));
  }

  return [
    'table',
    tableAttributes(node),
    colgroup,
    ['tbody', 0],
  ] as DOMOutputSpec;
};

export default class TableView extends ReactNodeView {
  private table: HTMLElement | undefined;

  constructor(props: Props) {
    super(props.node, props.view, props.getPos, props.portalProviderAPI, props);
  }

  getContentDOM() {
    const rendered = DOMSerializer.renderSpec(
      document,
      toDOM(this.node, this.reactComponentProps as Props),
    );

    if (rendered.dom) {
      this.table = rendered.dom as HTMLElement;
    }

    return rendered;
  }

  setDomAttrs(node) {
    if (!this.table) {
      return;
    }

    const attrs = tableAttributes(node);
    Object.keys(attrs).forEach(attr => {
      this.table!.setAttribute(attr, attrs[attr]);
    });
  }

  render(props, forwardRef) {
    return (
      <WithPluginState
        plugins={{
          containerWidth: widthPluginKey,
          pluginState: pluginKey,
          tableResizingPluginState: tableResizingPluginKey,
        }}
        editorView={props.view}
        render={pluginStates => (
          <TableComponent
            {...props}
            {...pluginStates}
            node={this.node}
            width={pluginStates.containerWidth.width}
            contentDOM={forwardRef}
          />
        )}
      />
    );
  }

  ignoreMutation(record: MutationRecord) {
    return true;
  }
}

export const createTableView = (portalProviderAPI: PortalProviderAPI) => (
  node,
  view,
  getPos,
): NodeView => {
  const { pluginConfig } = getPluginState(view.state);
  const { allowColumnResizing } = getPluginConfig(pluginConfig);

  return new TableView({
    node,
    view,
    allowColumnResizing,
    portalProviderAPI,
    getPos,
  }).init();
};
