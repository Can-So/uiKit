import * as React from 'react';
import { Component } from 'react';
import Button from '@atlaskit/button';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Tooltip from '@atlaskit/tooltip';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DropdownRightIconWrapper, DropdownLeftIconWrapper } from './styles';
import { LineWidthIcon } from './lineWidthIcon';
import { messages } from '@atlaskit/media-ui';

export interface LineWidthButtonProps {
  readonly lineWidth: number;
  readonly isActive: boolean;
  readonly onClick: () => void;
}

export class LineWidthButton extends Component<
  LineWidthButtonProps & InjectedIntlProps
> {
  render() {
    const {
      isActive,
      lineWidth,
      onClick,
      intl: { formatMessage },
    } = this.props;

    const iconBefore = (
      <DropdownLeftIconWrapper>
        <LineWidthIcon
          isActive={isActive}
          lineWidth={lineWidth}
          onLineWidthClick={() => {}}
        />
      </DropdownLeftIconWrapper>
    );
    const iconAfter = (
      <DropdownRightIconWrapper>
        <ChevronDownIcon label="chevron-icon" />
      </DropdownRightIconWrapper>
    );
    return (
      <Tooltip content={formatMessage(messages.annotate_tool_line_thickness)}>
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

export default injectIntl(LineWidthButton);
