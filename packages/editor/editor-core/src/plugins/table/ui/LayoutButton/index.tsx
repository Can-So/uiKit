import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as classnames from 'classnames';
import { EditorView } from 'prosemirror-view';
import { findTable } from 'prosemirror-utils';
import { TableLayout } from '@atlaskit/adf-schema';
import { Popup, tableMarginTop } from '@atlaskit/editor-common';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse';

import commonMessages from '../../../../messages';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { TableCssClassName as ClassName } from '../../types';
import { toggleTableLayout } from '../../actions';
import { layoutButtonSize } from '../styles';

export interface Props {
  editorView: EditorView;
  targetRef?: HTMLElement;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  isResizing?: boolean;
}

const POPUP_OFFSET = [
  -layoutButtonSize - 5,
  -layoutButtonSize - tableMarginTop + 2,
];

const getTitle = (layout: TableLayout) => {
  switch (layout) {
    case 'default':
      return commonMessages.layoutWide;
    case 'wide':
      return commonMessages.layoutFullWidth;
    default:
      return commonMessages.layoutFixedWidth;
  }
};

class LayoutButton extends React.Component<Props & InjectedIntlProps, any> {
  render() {
    const {
      intl: { formatMessage },
      mountPoint,
      boundariesElement,
      scrollableElement,
      targetRef,
      editorView,
      isResizing,
    } = this.props;
    if (!targetRef) {
      return null;
    }
    const table = findTable(editorView.state.selection);
    if (!table) {
      return false;
    }
    const { layout } = table.node.attrs;
    const title = formatMessage(getTitle(layout));

    return (
      <Popup
        ariaLabel={title}
        offset={POPUP_OFFSET}
        target={targetRef}
        alignY="top"
        alignX="right"
        stick={true}
        mountTo={mountPoint}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        forcePlacement={true}
      >
        <div
          className={classnames(ClassName.LAYOUT_BUTTON, {
            [ClassName.IS_RESIZING]: isResizing,
          })}
        >
          <ToolbarButton
            title={title}
            onClick={this.handleClick}
            iconBefore={
              layout === 'full-width' ? (
                <CollapseIcon label={title} />
              ) : (
                <ExpandIcon label={title} />
              )
            }
          />
        </div>
      </Popup>
    );
  }

  private handleClick = () => {
    const { state, dispatch } = this.props.editorView;
    toggleTableLayout(state, dispatch);
  };
}

export default injectIntl(LayoutButton);
