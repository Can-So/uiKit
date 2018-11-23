import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { setCellAttrs } from '@atlaskit/editor-common';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import ToolbarButton from '../../../ui/ToolbarButton';
import WithPluginState from '../../../ui/WithPluginState';
import messages from '../ui/messages';
import { pluginKey } from '../pm-plugins/main';
import { toggleContextualMenu } from '../actions';
import { TableCssClassName as ClassName, TablePluginState } from '../types';
import { closestElement } from '../../../utils';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../../editor-disabled';

export interface CellViewProps {
  node: PmNode;
  view: EditorView;
  portalProviderAPI: PortalProviderAPI;
  getPos: () => number;
}

export type CellProps = {
  view: EditorView;
  forwardRef: (ref: HTMLElement | null) => void;
  withCursor: boolean;
  isContextualMenuOpen: boolean;
  disabled: boolean;
};

class Cell extends React.Component<CellProps & InjectedIntlProps> {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.withCursor !== nextProps.withCursor ||
      this.props.isContextualMenuOpen !== nextProps.isContextualMenuOpen
    );
  }

  render() {
    const {
      withCursor,
      isContextualMenuOpen,
      forwardRef,
      intl: { formatMessage },
      disabled,
    } = this.props;
    const labelCellOptions = formatMessage(messages.cellOptions);

    return (
      <div className={ClassName.CELL_NODEVIEW_WRAPPER} ref={forwardRef}>
        {withCursor && !disabled && (
          <div className={ClassName.CONTEXTUAL_MENU_BUTTON}>
            <ToolbarButton
              selected={isContextualMenuOpen}
              title={labelCellOptions}
              onClick={this.handleClick}
              iconBefore={<ExpandIcon label={labelCellOptions} />}
            />
          </div>
        )}
      </div>
    );
  }

  private handleClick = () => {
    const { state, dispatch } = this.props.view;
    toggleContextualMenu(state, dispatch);
  };
}

const CellComponent = injectIntl(Cell);

class CellView extends ReactNodeView {
  private cell: HTMLElement | undefined;

  constructor(props: CellViewProps) {
    super(props.node, props.view, props.getPos, props.portalProviderAPI, props);
  }

  createDomRef() {
    const { tableCell } = this.view.state.schema.nodes;
    this.cell = document.createElement(
      `t${this.node.type === tableCell ? 'd' : 'h'}`,
    );
    return this.cell;
  }

  getContentDOM() {
    const dom = document.createElement('div');
    dom.className = ClassName.TABLE_CELL_NODEVIEW_CONTENT_DOM;
    return { dom };
  }

  setDomAttrs(node) {
    const { cell } = this;
    if (cell) {
      const attrs = setCellAttrs(node, cell);
      Object.keys(attrs).forEach(attr => {
        cell.setAttribute(attr, attrs[attr]);
      });
    }
  }

  render(props, forwardRef) {
    // nodeview does not re-render on selection changes
    // so we trigger render manually to hide/show contextual menu button when `targetCellPosition` is updated
    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
          editorDisabledPlugin: editorDisabledPluginKey,
        }}
        editorView={props.view}
        render={({
          pluginState,
          editorDisabledPlugin,
        }: {
          pluginState: TablePluginState;
          editorDisabledPlugin: EditorDisabledPluginState;
        }) => (
          <CellComponent
            forwardRef={forwardRef}
            withCursor={this.getPos() === pluginState.targetCellPosition}
            isContextualMenuOpen={!!pluginState.isContextualMenuOpen}
            view={props.view}
            disabled={(editorDisabledPlugin || {}).editorDisabled}
          />
        )}
      />
    );
  }

  ignoreMutation(record: MutationRecord) {
    // @see https://github.com/ProseMirror/prosemirror/issues/862
    const target = record.target as HTMLElement;
    if (
      record.attributeName === 'class' ||
      (target && closestElement(target, `.${ClassName.CELL_NODEVIEW_WRAPPER}`))
    ) {
      return true;
    }
    return false;
  }
}

export const createCellView = (portalProviderAPI: PortalProviderAPI) => (
  node,
  view,
  getPos,
): NodeView => {
  return new CellView({ node, view, getPos, portalProviderAPI }).init();
};
