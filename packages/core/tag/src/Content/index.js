// @flow
import React, { PureComponent, type Node } from 'react';
import { Link, Text } from './styled';
import type { TagColor } from '../types';

type Props = {
  children: Node,
  href?: string,
  isFocused?: boolean,
  isRemovable?: boolean,
  markedForRemoval?: boolean,
  color: TagColor,
};

export default class Content extends PureComponent<Props> {
  render() {
    const {
      children,
      href,
      isFocused,
      isRemovable,
      markedForRemoval,
      color,
    } = this.props;
    const styledProps = { isFocused, isRemovable, markedForRemoval, color };

    return href ? (
      <Link {...styledProps} href={href} tabIndex="-1">
        {children}
      </Link>
    ) : (
      <Text {...styledProps}>{children}</Text>
    );
  }
}
