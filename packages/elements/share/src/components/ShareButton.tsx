import Button, { ButtonAppearances } from '@atlaskit/button';
import ShareIcon from '@atlaskit/icon/glyph/share';
import * as React from 'react';

export type Props = {
  appearance?: ButtonAppearances;
  isLoading?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text?: React.ReactNode;
};

export const ShareButton: React.StatelessComponent<Props> = props => (
  <Button {...props} iconBefore={<ShareIcon label="share" />}>
    {props.text}
  </Button>
);
