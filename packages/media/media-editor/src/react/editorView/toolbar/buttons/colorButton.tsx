import * as React from 'react';
import { Component } from 'react';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Tooltip from '@atlaskit/tooltip';
import Button from '@atlaskit/button';
import {
  ColorSample,
  DropdownRightIconWrapper,
  DropdownLeftIconWrapper,
} from './styles';
import { messages } from '@atlaskit/media-ui';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Color } from '../../../../common';

export interface ColorButtonProps {
  readonly color: Color;
  readonly isActive: boolean;
  readonly onClick: () => void;
}

export class ColorButton extends Component<
  ColorButtonProps & InjectedIntlProps
> {
  render() {
    const {
      color,
      isActive,
      onClick,
      intl: { formatMessage },
    } = this.props;
    const { red, green, blue } = color;
    const style = { backgroundColor: `rgb(${red}, ${green}, ${blue})` };

    const iconBefore = (
      <DropdownLeftIconWrapper>
        <ColorSample style={style} />
      </DropdownLeftIconWrapper>
    );
    const iconAfter = (
      <DropdownRightIconWrapper>
        <ChevronDownIcon label="chevron-icon" />
      </DropdownRightIconWrapper>
    );
    return (
      <Tooltip content={formatMessage(messages.annotate_tool_color)}>
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

export default injectIntl(ColorButton);
