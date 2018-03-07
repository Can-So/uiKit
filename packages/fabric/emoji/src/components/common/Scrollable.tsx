// FIXME - FAB-1732 looking at making a shared component for this

import * as React from 'react';
import { MouseEventHandler, PureComponent, ReactNode, UIEvent } from 'react';
import * as classNames from 'classnames';
import { findDOMNode } from 'react-dom';

import * as styles from './styles';

export interface OnScroll {
  (element: HTMLElement, event: UIEvent<any>): void;
}

export interface Props {
  className?: string;
  maxHeight?: string;
  children?: ReactNode;
  onScroll?: OnScroll;
  onMouseLeave?: MouseEventHandler<any>;
}

export default class Scrollable extends PureComponent<Props, {}> {
  private scrollableDiv: HTMLElement;

  // API
  reveal = (child: HTMLElement, forceToTop?: boolean): void => {
    if (child && this.scrollableDiv) {
      const childNode = findDOMNode(child);
      // Not using Element.scrollIntoView as it scrolls even to top/bottom of view even if
      // already visible
      const scrollableRect = this.scrollableDiv.getBoundingClientRect();
      const elementRect = childNode.getBoundingClientRect();
      if (forceToTop || elementRect.top < scrollableRect.top) {
        this.scrollableDiv.scrollTop += elementRect.top - scrollableRect.top;
      } else if (elementRect.bottom > scrollableRect.bottom) {
        this.scrollableDiv.scrollTop +=
          elementRect.bottom - scrollableRect.bottom;
      }
    }
  };

  scrollToBottom = (): void => {
    const { scrollableDiv } = this;
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  };

  private handleScroll = event => {
    const sampleOffset = 10;
    let firstElement;
    if (this.scrollableDiv) {
      const scrollableRect = this.scrollableDiv.getBoundingClientRect();
      firstElement = document.elementFromPoint(
        scrollableRect.left + sampleOffset,
        scrollableRect.top + sampleOffset,
      );
    }
    if (this.props.onScroll) {
      this.props.onScroll(firstElement, event);
    }
  };

  private handleRef = ref => {
    this.scrollableDiv = ref;
  };

  render() {
    const { children, className, maxHeight, onMouseLeave } = this.props;

    const scrollableClasses = ['emoji-scrollable', styles.emojiScrollable];

    if (className) {
      scrollableClasses.push(className);
    }

    const style = maxHeight ? { maxHeight } : {};

    return (
      <div
        className={classNames(scrollableClasses)}
        onMouseLeave={onMouseLeave}
        onScroll={this.handleScroll}
        ref={this.handleRef}
        style={style}
      >
        {children}
      </div>
    );
  }
}
