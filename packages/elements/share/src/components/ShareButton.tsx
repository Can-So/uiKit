import * as React from 'react';
import ShareIcon from '@atlaskit/icon/glyph/share';
import Button, { ButtonAppearances } from '@atlaskit/button';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next-types';

export type Props = {
  appearance?: ButtonAppearances;
  isSelected?: boolean;
  isDisable?: boolean;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
  text?: React.ReactNode;
};

export const ShareButton: React.StatelessComponent<Props> = props => (
  <Button {...props} iconBefore={<ShareIcon label="share" />}>
    {props.text}
  </Button>
);
