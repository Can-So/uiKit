import * as React from 'react';
import {
  className,
  LinkWrapper,
  Wrapper,
  Header,
  IconWrapper,
  TextWrapper,
  Content,
} from './styled';

export interface CardFrameProps {
  isPlaceholder?: boolean;
  href?: string;
  icon?: React.ReactElement<any>;
  text?: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default class CardFrame extends React.Component<CardFrameProps> {
  get isInteractive() {
    const { isPlaceholder, href, onClick } = this.props;
    return !isPlaceholder && (Boolean(href) || Boolean(onClick));
  }

  handleClick = event => {
    const { onClick } = this.props;
    if (onClick) {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    }
  };

  renderHeader() {
    const { isPlaceholder = false, icon, text } = this.props;
    return (
      <Header>
        <IconWrapper isPlaceholder={isPlaceholder}>
          {!isPlaceholder && icon}
        </IconWrapper>
        <TextWrapper isPlaceholder={isPlaceholder}>
          {!isPlaceholder && text}
        </TextWrapper>
      </Header>
    );
  }

  renderContent() {
    const { isInteractive } = this;
    const { children } = this.props;
    return <Content isInteractive={isInteractive}>{children}</Content>;
  }

  render() {
    const { isInteractive } = this;
    const { isPlaceholder, href, minWidth, maxWidth } = this.props;
    if (!isPlaceholder && href) {
      return (
        <LinkWrapper
          target="_blank"
          rel="noopener"
          className={className}
          isInteractive={isInteractive}
          href={href}
          minWidth={minWidth}
          maxWidth={maxWidth}
          onClick={this.handleClick}
        >
          {this.renderHeader()}
          {this.renderContent()}
        </LinkWrapper>
      );
    } else {
      return (
        <Wrapper
          className={className}
          isInteractive={isInteractive}
          minWidth={minWidth}
          maxWidth={maxWidth}
          onClick={this.handleClick}
        >
          {this.renderHeader()}
          {this.renderContent()}
        </Wrapper>
      );
    }
  }
}
