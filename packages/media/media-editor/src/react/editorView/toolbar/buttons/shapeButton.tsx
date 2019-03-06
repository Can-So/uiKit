import * as React from 'react';
import { Component } from 'react';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Button from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { toolIcons } from './toolButton';
import { Tool } from '../../../../common';
import { shapeTools } from '../popups/shapePopup';
import { DropdownLeftIconWrapper, DropdownRightIconWrapper } from './styles';
import { messages } from '@atlaskit/media-ui';

export interface ShapeButtonProps {
  readonly activeShape: Tool;
  readonly isActive: boolean;
  readonly onClick: () => void;
}

export class ShapeButton extends Component<
  ShapeButtonProps & InjectedIntlProps
> {
  render() {
    const {
      isActive,
      onClick,
      activeShape,
      intl: { formatMessage },
    } = this.props;
    const isShapeTool = shapeTools.indexOf(activeShape) > -1;
    const Icon = toolIcons[isShapeTool ? activeShape : shapeTools[0]];

    const iconBefore = (
      <DropdownLeftIconWrapper>
        <Icon label={activeShape} size="medium" />
      </DropdownLeftIconWrapper>
    );
    const iconAfter = (
      <DropdownRightIconWrapper>
        <ChevronDownIcon label="chevron-icon" />
      </DropdownRightIconWrapper>
    );

    return (
      <Tooltip content={formatMessage(messages.annotate_tool_shape)}>
        <Button
          iconBefore={iconBefore}
          iconAfter={iconAfter}
          appearance="subtle"
          onClick={onClick}
          isSelected={isActive}
        />
      </Tooltip>
    );
  }
}

export default injectIntl(ShapeButton);
