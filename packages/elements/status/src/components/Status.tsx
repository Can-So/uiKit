import * as React from 'react';
import { PureComponent } from 'react';
import Lozenge from '@atlaskit/lozenge';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import {
  WithAnalyticsEventProps,
  CreateUIAnalyticsEventSignature,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next-types';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { createStatusAnalyticsAndFire } from './analytics';
import { ANALYTICS_HOVER_DELAY } from './constants';

const { B100 } = colors;

export type Color = 'neutral' | 'purple' | 'blue' | 'red' | 'yellow' | 'green';

const colorToLozengeAppearanceMap: { [K in Color]: string } = {
  neutral: 'default',
  purple: 'new',
  blue: 'inprogress',
  red: 'removed',
  yellow: 'moved',
  green: 'success',
};

const DEFAULT_APPEARANCE = 'default';
const MAX_WIDTH = 200;

export interface OwnProps {
  text: string;
  color: Color;
  localId?: string;
  selected?: boolean;
  onClick?: (event: React.SyntheticEvent<any>) => void;
  onHover?: () => void;
}

export type Props = OwnProps & WithAnalyticsEventProps;

export interface StatusContainerProps {
  selected: boolean;
  placeholderStyle: boolean;
}

export const StatusContainer = styled.span`
  cursor: pointer;

  display: inline-block;
  border-radius: 5px;
  max-width: 100%;

  /* Prevent responsive layouts increasing height of container by changing
     font size and therefore line-height. */
  line-height: 0;
  
  opacity: ${(props: StatusContainerProps) =>
    props.placeholderStyle ? 0.5 : 1};

  border: 2px solid ${(props: StatusContainerProps) =>
    props.selected ? B100 : 'transparent'};
  }

  * ::selection {
    background-color: transparent;
  }
`;

class StatusInternal extends PureComponent<Props, any> {
  private hoverStartTime: number = 0;

  private handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    this.hoverStartTime = Date.now();
  };

  private handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { onHover } = this.props;
    const delay = Date.now() - this.hoverStartTime;

    if (delay >= ANALYTICS_HOVER_DELAY && onHover) {
      onHover();
    }
    this.hoverStartTime = 0;
  };

  componentWillUnmount() {
    this.hoverStartTime = 0;
  }

  render() {
    const { text, color, selected, onClick } = this.props;
    if (text.trim().length === 0) {
      return null;
    }

    const appearance = colorToLozengeAppearanceMap[color] || DEFAULT_APPEARANCE;
    return (
      <StatusContainer
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        selected={selected || false}
        placeholderStyle={!text}
      >
        <Lozenge appearance={appearance} maxWidth={MAX_WIDTH}>
          {text}
        </Lozenge>
      </StatusContainer>
    );
  }
}

// tslint:disable-next-line:variable-name
export const Status: React.ComponentClass<OwnProps> = withAnalyticsEvents({
  onClick: (
    createEvent: CreateUIAnalyticsEventSignature,
    props: Props,
  ): UIAnalyticsEventInterface => {
    const { localId } = props;
    return createStatusAnalyticsAndFire(createEvent)({
      action: 'clicked',
      actionSubject: 'statusLozenge',
      attributes: {
        localId,
      },
    });
  },
  onHover: (
    createEvent: CreateUIAnalyticsEventSignature,
    props: Props,
  ): UIAnalyticsEventInterface => {
    const { localId } = props;
    return createStatusAnalyticsAndFire(createEvent)({
      action: 'hovered',
      actionSubject: 'statusLozenge',
      attributes: {
        localId,
      },
    });
  },
})(StatusInternal) as React.ComponentClass<OwnProps>;
