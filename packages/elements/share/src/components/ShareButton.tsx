import * as React from 'react';
import ShareIcon from '@atlaskit/icon/glyph/share';
import Button, { ButtonAppearances } from '@atlaskit/button';

export type Props = {
  appearance?: ButtonAppearances;
  isSelected?: boolean;
  isDisable?: boolean;
  onClick: (
    e: MouseEvent<HTMLButtonElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
  text?: React.ReactNode;
};

export const ShareButton: React.StatelessComponent<Props> = props => (
  <Button {...props} iconBefore={<ShareIcon label="share" />}>
    {props.text}
  </Button>
);
