import * as React from 'react';
import { defineMessages } from 'react-intl';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import ToolbarButton from '../../../../ui/ToolbarButton';
import Dropdown from '../../../../ui/Dropdown';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import EditorAlignCenterIcon from '@atlaskit/icon/glyph/editor/align-center';
import EditorAlignRightIcon from '@atlaskit/icon/glyph/editor/align-right';

export const iconMap = {
  left: <EditorAlignLeftIcon label="Align left" />,
  right: <EditorAlignRightIcon label="Align right" />,
  center: <EditorAlignCenterIcon label="Align center" />,
};

import {
  TriggerWrapper,
  Separator,
  Wrapper,
  ExpandIconWrapper,
} from './styles';
import Alignment from '../../../../ui/Alignment';
import { AlignmentPluginState, AlignmentState } from '../../pm-plugins/main';

export const messages = defineMessages({
  alignment: {
    id: 'fabric.editor.alignment',
    defaultMessage: 'Alignment',
    description: 'Aligns text',
  },
});

export interface State {
  isOpen: boolean;
}

export interface Props {
  pluginState: AlignmentPluginState;
  changeAlignment: (align: AlignmentState) => void;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  isReducedSpacing?: boolean;
  disabled?: boolean;
}

class AlignmentToolbar extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
  };

  render() {
    const { isOpen } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      pluginState,
      disabled,
    } = this.props;

    return (
      <Wrapper>
        <Dropdown
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          scrollableElement={popupsScrollableElement}
          isOpen={this.state.isOpen}
          onOpenChange={this.handleOpenChange}
          fitWidth={242}
          fitHeight={80}
          trigger={
            <ToolbarButton
              spacing={isReducedSpacing ? 'none' : 'default'}
              disabled={disabled}
              selected={isOpen}
              title="Text alignment"
              ariaLabel="Text alignment"
              className="align-btn"
              onClick={this.toggleOpen}
              iconBefore={
                <TriggerWrapper>
                  {iconMap[pluginState.align]}
                  <ExpandIconWrapper>
                    <ExpandIcon label={'Alignment'} />
                  </ExpandIconWrapper>
                </TriggerWrapper>
              }
            />
          }
        >
          <Alignment
            onClick={align => this.changeAlignment(align)}
            selectedAlignment={pluginState.align}
          />
        </Dropdown>
        <Separator />
      </Wrapper>
    );
  }

  private changeAlignment = align => {
    this.toggleOpen();
    return this.props.changeAlignment(align);
  };

  private toggleOpen = () => {
    this.handleOpenChange({ isOpen: !this.state.isOpen });
  };

  private handleOpenChange = ({ isOpen }) => {
    this.setState({ isOpen });
  };
}

export default AlignmentToolbar;
