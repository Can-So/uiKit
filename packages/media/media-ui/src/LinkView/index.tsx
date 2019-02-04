import * as React from 'react';
import { Link } from './styled';

export interface CardLinkViewProps {
  /** The text to display */
  url: string;
  /** The optional click handler */
  onClick?: () => void;
}

export class CardLinkView extends React.Component<CardLinkViewProps> {
  handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { onClick } = this.props;
    if (onClick) {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    }
  };

  render() {
    const { url, onClick } = this.props;

    const linkProps = onClick
      ? { onClick: this.handleClick }
      : { href: url, target: '_blank' };

    return <Link {...linkProps}>{url}</Link>;
  }
}
