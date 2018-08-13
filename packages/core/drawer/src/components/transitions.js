// @flow

import React, { Component, type ComponentType } from 'react';
import { Transition } from 'react-transition-group';
import { layers } from '@atlaskit/theme';

import { transitionDurationMs, transitionTimingFunction } from '../constants';

// Transitions
// ------------------------------

type Styles = { [string]: string | number };
type TransitionProps = {
  component?: ComponentType<*> | string,
  onExited?: any => void,
  in: boolean,
};
type HandlerProps = {
  defaultStyles: Styles,
  transitionProps: {
    appear: boolean,
    mountOnEnter: boolean,
    unmountOnExit: boolean,
  },
  transitionStyles: {
    entering?: Styles,
    entered?: Styles,
    exiting?: Styles,
    exited?: Styles,
  },
};

class TransitionHandler extends Component<TransitionProps & HandlerProps> {
  static defaultProps = {
    component: 'div',
    transitionProps: {
      appear: true,
      mountOnEnter: true,
      unmountOnExit: true,
    },
  };
  render() {
    const {
      component: Tag = 'div',
      in: inProp,
      defaultStyles,
      transitionStyles,
      transitionProps,
      ...props
    } = this.props;
    const timeout = { enter: 0, exit: transitionDurationMs };

    return (
      <Transition in={inProp} timeout={timeout} {...transitionProps}>
        {state => {
          const style = {
            ...defaultStyles,
            ...transitionStyles[state],
          };

          return <Tag style={style} {...props} />;
        }}
      </Transition>
    );
  }
}

export const Fade = ({ onExited, ...props }: TransitionProps) => (
  <TransitionHandler
    defaultStyles={{
      transition: `opacity ${transitionDurationMs}ms ${transitionTimingFunction}`,
      opacity: 0,
      position: 'fixed',
      zIndex: layers.blanket(),
    }}
    transitionStyles={{
      entering: { opacity: 0 },
      entered: { opacity: 1 },
    }}
    {...props}
  />
);

export const Slide = ({ onExited, ...props }: TransitionProps) => (
  <TransitionHandler
    defaultStyles={{
      transition: `transform ${transitionDurationMs}ms ${transitionTimingFunction}`,
      transform: 'translate3d(-100%,0,0)',
    }}
    transitionStyles={{
      entered: { transform: 'translate3d(0,0,0)' },
      exited: { transform: 'translate3d(-100%,0,0)' },
    }}
    {...props}
  />
);
