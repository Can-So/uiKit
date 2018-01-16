import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import RevealInner from '../styled/RevealInner';

export default class Reveal extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    openHeight: PropTypes.number.isRequired,
    shouldAnimate: PropTypes.bool.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    const { isOpen, shouldAnimate } = props;

    this.state = {
      shouldRenderChildren: isOpen,
      isAnimatingInOnMount: isOpen && shouldAnimate,
    };
  }

  componentDidMount() {
    if (!this.state.isAnimatingInOnMount) {
      return;
    }
    // Forcing async to obtain clean render.
    // Needed to use a setTimeout to force this,
    // could not just rely on the requestAnimationFrame.
    setTimeout(() => {
      // optimised render
      requestAnimationFrame(() => {
        this.setState({
          isAnimatingInOnMount: false,
        });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const isClosed = !this.props.isOpen;
    const willClose = !nextProps.isOpen;
    const willOpen = nextProps.isOpen;
    const shouldAnimate = nextProps.shouldAnimate;

    // ensure children are rendered before open animation occurs
    if (isClosed && willOpen) {
      this.setState({
        shouldRenderChildren: true,
      });
    }

    // if closing with no animation: hide the children immediately
    if (willClose && !shouldAnimate) {
      this.setState({
        shouldRenderChildren: false,
      });
    }
  }

  onTransitionEnd = () => {
    if (this.props.isOpen) {
      return;
    }

    // hide children after animation to close them
    this.setState({
      shouldRenderChildren: false,
    });
  }

  render() {
    const { children, isOpen, openHeight, shouldAnimate } = this.props;
    const { isAnimatingInOnMount, shouldRenderChildren } = this.state;

    return (
      <RevealInner
        isOpen={isAnimatingInOnMount ? false : isOpen}
        openHeight={openHeight}
        shouldAnimate={shouldAnimate}
        onTransitionEnd={this.onTransitionEnd}
      >
        {shouldRenderChildren ? children : null}
      </RevealInner>
    );
  }
}
