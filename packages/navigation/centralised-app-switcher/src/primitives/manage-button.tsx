import React from 'react';
import Button from '@atlaskit/button';

type Props = {
  href: string;
};

const getHrefCallback = href => () => (window.location.href = href);

export default ({ href }: Props) => (
  <Button onClick={getHrefCallback(href)}>Manage list</Button>
);
