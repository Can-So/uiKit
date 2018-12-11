import * as React from 'react';
import { Link } from './styled';

export interface CardLinkViewProps {
  /** The text to display */
  text: string;
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
    const { text } = this.props;
    return <Link onClick={this.handleClick}>{text}</Link>;
  }
}
