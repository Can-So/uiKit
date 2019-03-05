import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { colors, themed } from '@atlaskit/theme';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import SuccessIcon from '@atlaskit/icon/glyph/editor/success';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import WarningIcon from '@atlaskit/icon/glyph/editor/warning';
import ErrorIcon from '@atlaskit/icon/glyph/editor/error';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { PanelType } from '@atlaskit/adf-schema';
import styled from 'styled-components';
import { hexToRgba } from '@atlaskit/editor-common';

const lightPanelColor = {
  info: colors.B50,
  note: colors.P50,
  tip: colors.G50,
  success: colors.G50,
  warning: colors.Y50,
  error: colors.R50,
};

const darkPanelOpacity = 0.64;
const darkPanelColor = {
  info: colors.B500,
  note: colors.P500,
  tip: colors.G500,
  success: colors.G500,
  warning: colors.Y500,
  error: colors.R500,
};
const darkPanelBorderColor = {
  info: colors.B400,
  note: colors.P400,
  tip: colors.G400,
  success: colors.G400,
  warning: colors.Y400,
  error: colors.R400,
};

const lightIconColor = {
  info: colors.B400,
  note: colors.P400,
  tip: colors.G400,
  success: colors.G400,
  warning: colors.Y400,
  error: colors.R400,
};

const darkIconColor = {
  info: colors.B100,
  note: colors.P100,
  tip: colors.G200,
  success: colors.G200,
  warning: colors.Y100,
  error: colors.R200,
};
const darkTextColor = {
  info: colors.B75,
  note: colors.P75,
  tip: colors.G75,
  success: colors.G75,
  warning: colors.Y75,
  error: colors.R75,
};

const panelIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  note: NoteIcon,
  tip: TipIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

export type PanelComponentProps = {
  panelType: PanelType;
  forwardRef: (ref: HTMLElement) => void;
};

type PanelWrapperProps = React.HTMLProps<HTMLDivElement> & {
  panelType: PanelType;
};
type IconWrapperProps = React.HTMLProps<HTMLDivElement> & {
  panelType: PanelType;
};

export const PanelWrapper = styled.div`
  ${(props: PanelWrapperProps) => {
    const panelType = props.panelType;
    const light = lightPanelColor[panelType];
    const dark = hexToRgba(darkPanelColor[panelType], darkPanelOpacity);
    const darkText = darkTextColor[panelType];
    const background = themed({ light, dark })(props);
    const darkBorder = '1px solid ' + darkPanelBorderColor[panelType];
    const border = themed({ light: 'none', dark: darkBorder })(props);
    const text = themed({ light: 'inherit', dark: darkText })(props);
    return `
      background: ${background};
      border: ${border}
      color: ${text}
    `;
  }};
` as React.ComponentType<PanelWrapperProps>;

export const IconWrapper = styled.div`
  ${(props: IconWrapperProps) => {
    const panelType = props.panelType;
    const light = lightIconColor[panelType];
    const dark = darkIconColor[panelType];
    const color = themed({ light, dark })(props);
    return `
      color: ${color};
    `;
  }};
` as React.ComponentType<PanelWrapperProps>;

class PanelComponent extends React.Component<PanelComponentProps> {
  shouldComponentUpdate(nextProps) {
    return this.props.panelType !== nextProps.panelType;
  }

  render() {
    const { panelType, forwardRef } = this.props;
    const Icon = panelIcons[panelType];

    return (
      <PanelWrapper panelType={panelType} className="ak-editor-panel">
        <IconWrapper panelType={panelType} className="ak-editor-panel__icon">
          <Icon label={`Panel ${panelType}`} />
        </IconWrapper>
        <div className="ak-editor-panel__content" ref={forwardRef as any} />
      </PanelWrapper>
    );
  }
}

class Panel extends ReactNodeView {
  createDomRef() {
    const domRef = document.createElement('div');
    domRef.setAttribute('data-panel-type', this.node.attrs.panelType);
    return domRef;
  }

  getContentDOM() {
    const dom = document.createElement('div');
    dom.className = 'panel-content-dom';
    return { dom };
  }

  render(props, forwardRef) {
    const { panelType } = this.node.attrs;
    return <PanelComponent panelType={panelType} forwardRef={forwardRef} />;
  }

  update(node, decorations) {
    return super.update(
      node,
      decorations,
      (currentNode, newNode) =>
        currentNode.attrs.panelType === newNode.attrs.panelType,
    );
  }
}

export const panelNodeView = (portalProviderAPI: PortalProviderAPI) => (
  node: any,
  view: any,
  getPos: () => number,
): NodeView => {
  return new Panel(node, view, getPos, portalProviderAPI).init();
};
