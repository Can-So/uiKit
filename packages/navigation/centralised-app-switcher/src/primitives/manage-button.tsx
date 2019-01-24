import React from 'react';
import Button from '@atlaskit/button';

type Props = {
  onClick: () => void;
};
export default ({ onClick }: Props) => (
  <Button onClick={onClick}>Manage list</Button>
);
