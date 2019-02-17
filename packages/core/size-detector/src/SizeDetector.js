// @flow

import React, { Component, type Node } from 'react';
import rafSchedule from 'raf-schd';

// Need to make outer div full height in case consumer wants to align
// child content vertically center. These styles can be overridden by the
// product using the optional SizeDetector.containerStyle prop.
const containerDivStyle = {
  height: '100%',
  flex: '1 0 auto',
  position: 'relative',
};

// Not using styled-components here for performance
// and framework-agnostic reasons.
const objectStyle = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  opacity: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: -1,
};

type SizeMetrics = {
  width: ?number,
  height: ?number,
};

type Props = {
  /** Function that accepts an object parameter containing 'height' and 'width' properties */
  children: SizeMetrics => Node,
  /** Optional styles object to be applied to the containing element */
  containerStyle?: Object,
  /** Called when the component is resized. */
  onResize?: SizeMetrics => void,
};

type State = {
  sizeMetrics: SizeMetrics,
};

export default class SizeDetector extends Component<Props, State> {
  resizeObjectDocument: ?window;
  resizeObject: ?HTMLElement;

  containerRef = React.createRef();
  objectElementRef = React.createRef();

  static defaultProps = {
    containerStyle: {},
  };

  state = {
    sizeMetrics: {
      width: null,
      height: null,
    },
  };

  componentDidMount() {
    if (this.resizeObjectDocument) {
      this.resizeObjectDocument.data = 'about:blank';
    }
    this.handleResize();
  }

  componentWillUnmount() {
    this.handleResize.cancel();

    if (this.resizeObjectDocument) {
      this.resizeObjectDocument.removeEventListener(
        'resize',
        this.handleResize,
      );
    }
  }
  // Attach the resize event to object when it loads
  handleObjectLoad = () => {
    if (!this.objectElementRef.current) {
      return;
    }

    this.resizeObjectDocument = this.objectElementRef.current.contentDocument.defaultView;
    this.resizeObjectDocument.addEventListener('resize', this.handleResize);

    // Calculate width first time, after object has loaded.
    // Prevents it from getting in a weird state where width is always 0.
    this.handleResize();
  };

  // limit the resize event occure only once per requestAnimationFrame
  handleResize = rafSchedule(() => {
    const { containerRef } = this;
    if (!containerRef.current) {
      return;
    }

    const sizeMetrics = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };

    this.setState({
      sizeMetrics,
    });

    if (this.props.onResize) {
      this.props.onResize(sizeMetrics);
    }
  });

  renderChildren = () => {
    const { sizeMetrics } = this.state;
    return this.props.children(sizeMetrics);
  };

  render() {
    return (
      <div
        style={{ ...containerDivStyle, ...this.props.containerStyle }}
        ref={this.containerRef}
      >
        {/* eslint-disable jsx-a11y/alt-text */}
        <object
          type="text/html"
          style={objectStyle}
          ref={this.objectElementRef}
          onLoad={this.handleObjectLoad}
          aria-hidden
          tabIndex={-1}
        />
        {this.renderChildren()}
      </div>
    );
  }
}
