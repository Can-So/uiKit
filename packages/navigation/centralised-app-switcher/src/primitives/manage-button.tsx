import * as React from 'react';
import Button from '@atlaskit/button';

type Props = {
  href: string;
};

export default ({ href }: Props) => <Button href={href}>Manage list</Button>;
