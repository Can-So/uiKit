import * as React from 'react';
import { Component, SyntheticEvent } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Button from '@atlaskit/button';
import {
  ContentWrapper,
  CloseButtonWrapper,
  hideControlsClassName,
} from './styled';

export interface ContentProps {
  onClose?: () => void;
}

export interface ContentState {
  showControls: boolean;
}

const mouseMovementDelay = 2000;
export const findParent = (
  element: HTMLElement,
  className: string,
  maxParentElement: HTMLElement = document.body,
): HTMLElement | undefined => {
  if (element.classList.contains(className)) {
    return element;
  }

  let currentElement = element;

  while (currentElement.parentElement !== maxParentElement) {
    if (currentElement.parentElement) {
      currentElement = currentElement.parentElement;

      if (currentElement.classList.contains(className)) {
        return currentElement;
      }
    } else {
      return undefined;
    }
  }

  return undefined;
};

export class Content extends Component<ContentProps, ContentState> {
  private checkActivityTimeout: number;
  private contentWrapperElement: HTMLElement;

  state: ContentState = {
    showControls: true,
  };

  private clearTimeout = () => {
    window.clearTimeout(this.checkActivityTimeout);
  };

  private hideControls = (e?: HTMLElement) => () => {
    if (e) {
      const parent = findParent(
        e,
        hideControlsClassName,
        this.contentWrapperElement,
      );
      if (!parent) {
        this.setState({ showControls: false });
      }
    } else {
      this.setState({ showControls: false });
    }
  };

  private checkMouseMovement = (e?: SyntheticEvent<HTMLElement>) => {
    this.clearTimeout();
    this.setState({ showControls: true });
    this.checkActivityTimeout = window.setTimeout(
      this.hideControls(e && (e.target as HTMLElement)),
      mouseMovementDelay,
    );
  };

  componentDidMount() {
    this.checkMouseMovement();
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  // We want to check mouse movement on click too
  // in order to not hide controls when user is interacting with any control
  private onClick = e => {
    this.checkMouseMovement();
    this.onClickContentClose(e);
  };

  private onClickContentClose = e => {
    const { onClose } = this.props;

    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  private saveContentWrapperRef = el => {
    this.contentWrapperElement = el;
  };

  render() {
    const { showControls } = this.state;
    const { onClose, children } = this.props;

    return (
      <ContentWrapper
        innerRef={this.saveContentWrapperRef}
        showControls={showControls}
        onMouseMove={this.checkMouseMovement}
        onClick={this.onClick}
      >
        <CloseButtonWrapper className={hideControlsClassName}>
          <Button onClick={onClose} iconBefore={<CrossIcon label="Close" />} />
        </CloseButtonWrapper>
        {children}
      </ContentWrapper>
    );
  }
}
