// @flow

import React, { PureComponent, type Node } from 'react';
import { Transition } from 'react-transition-group';

const DURATION = 300;

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getTransition(keys) {
  return {
    transition: keys
      .map(k => `${camelToKebab(k)} ${DURATION}ms cubic-bezier(0.2, 0, 0, 1)`)
      .join(','),
  };
}
function getStyle({ keys, values }) {
  const style = {};
  keys.forEach((k, i) => {
    style[k] = values[i];
  });
  return style;
}
function getChanges(keys) {
  const props = keys.map(k => camelToKebab(k));
  return { willChange: props.join(',') };
}
export function isTransitioning(state: TransitionState) {
  return ['entering', 'exiting'].includes(state);
}

type TransitionState = 'entered' | 'entering' | 'exited' | 'exiting';
type Props = {
  children: ({
    transitionStyle: Object,
    transitionState: TransitionState,
  }) => Node,
  innerRef?: HTMLElement => any,
  in: boolean,
  userIsDragging: boolean,
  properties: Array<string>,
  from: Array<number | string>,
  to: Array<number | string>,
};

export default class ResizeTransition extends PureComponent<Props> {
  target: HTMLElement;
  getTarget = (ref: HTMLElement) => {
    this.target = ref;

    const { innerRef } = this.props;
    if (innerRef) innerRef(ref);
  };

  render() {
    const { userIsDragging, properties, from, to } = this.props;

    return (
      <Transition in={this.props.in} timeout={DURATION}>
        {transitionState => {
          // transitions interupt manual resize behaviour
          const cssTransition = !userIsDragging
            ? getTransition(properties)
            : {};

          // `from` and `to` styles tweened by the transition
          const dynamicProperties = {
            exiting: getStyle({ keys: properties, values: from }),
            exited: getStyle({ keys: properties, values: from }),
            entering: getStyle({ keys: properties, values: to }),
            entered: getStyle({ keys: properties, values: to }),
          };

          // due to the use of 3d transform for GPU acceleration, which
          // changes the stacking context, we only apply the transform during
          // the animation period.
          const gpuAcceleration = isTransitioning(transitionState)
            ? { transform: 'translate3d(0, 0, 0)' }
            : {};

          // let the browser know what we're up to
          const willChange = getChanges(properties);

          // put it all together
          const transitionStyle = {
            ...willChange,
            ...cssTransition,
            ...gpuAcceleration,
            ...dynamicProperties[transitionState],
          };

          return this.props.children({
            transitionStyle, // consumers must apply `transitionStyle`
            transitionState, // lets consumers react to the current state
          });
        }}
      </Transition>
    );
  }
}
