import * as React from 'react';
import { PureComponent } from 'react';
import Lozenge from '@atlaskit/lozenge';
import {
  WithAnalyticsEventProps,
  CreateUIAnalyticsEventSignature,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next-types';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { createStatusAnalyticsAndFire } from './analytics';
import { ANALYTICS_HOVER_DELAY } from './constants';

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
  onClick?: (event: React.SyntheticEvent<any>) => void;
  onHover?: () => void;
}

export type Props = OwnProps & WithAnalyticsEventProps;

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
    const { text, color, onClick } = this.props;
    if (text.trim().length === 0) {
      return null;
    }

    const appearance = colorToLozengeAppearanceMap[color] || DEFAULT_APPEARANCE;
    return (
      <span
        className="status-lozenge-span"
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Lozenge appearance={appearance} maxWidth={MAX_WIDTH}>
          {text}
        </Lozenge>
      </span>
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
