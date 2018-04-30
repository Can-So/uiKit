// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import Tooltip from '@atlaskit/tooltip';
import { validIconSizes, propsOmittedFromClickData } from './constants';
import Presence from './Presence';
import AvatarImage from './AvatarImage';
import Status from './Status';
import Outer, { PresenceWrapper, StatusWrapper } from '../styled/Avatar';
import { omit } from '../utils';
import { getProps, getStyledAvatar } from '../helpers';
import { mapProps, withPseudoState } from '../hoc';
import type { AvatarPropTypes, SupportedSizeWithAnIcon } from '../types';

const warn = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message); // eslint-disable-line no-console
  }
};

class Avatar extends Component<AvatarPropTypes> {
  ref: ?HTMLElement;

  static defaultProps = {
    appearance: 'circle',
    enableTooltip: true,
    size: 'medium',
  };

  // expose blur/focus to consumers via ref
  blur = () => {
    if (this.ref) this.ref.blur();
  };
  focus = () => {
    if (this.ref) this.ref.focus();
  };

  // disallow click on disabled avatars
  // only return avatar data properties
  guardedClick = (event: KeyboardEvent | MouseEvent) => {
    const { isDisabled, onClick } = this.props;

    if (isDisabled || typeof onClick !== 'function') return;

    const item: Object = omit(this.props, ...propsOmittedFromClickData);

    onClick({ item, event });
  };

  // enforce status / presence rules
  /* eslint-disable no-console */
  renderIcon = (): ?Node => {
    const { appearance, borderColor, presence, status } = this.props;
    const showPresence = Boolean(presence);
    const showStatus = Boolean(status);

    // no icon needed
    if (!showStatus && !showPresence) {
      return null;
    }

    // cannot display both
    if (showStatus && showPresence) {
      warn('Avatar supports `presence` OR `status` properties, not both.');
      return null;
    }

    // only support particular sizes
    if (validIconSizes.indexOf(this.props.size) === -1) {
      warn(
        `Avatar size "${String(this.props.size)}" does NOT support ${
          showPresence ? 'presence' : 'status'
        }`,
      );
      return null;
    }

    // we can cast here because we already know that it is a valid icon size
    const size: SupportedSizeWithAnIcon = (this.props.size: any);

    const indicator: ?Node = (() => {
      if (showPresence) {
        const customPresenceNode =
          typeof presence === 'object' ? presence : null;

        return (
          <PresenceWrapper appearance={appearance} size={size}>
            <Presence
              borderColor={borderColor}
              presence={!customPresenceNode && presence}
              size={size}
            >
              {customPresenceNode}
            </Presence>
          </PresenceWrapper>
        );
      }

      // showStatus
      return (
        <StatusWrapper appearance={appearance} size={size}>
          <Status status={status} borderColor={borderColor} size={size} />
        </StatusWrapper>
      );
    })();

    return indicator;
  };

  setRef = (ref: ?HTMLElement) => {
    this.ref = ref;
  };

  render() {
    const {
      appearance,
      enableTooltip,
      name,
      size,
      src,
      stackIndex,
      onClick,
    } = this.props;

    // distill props from context, props, and state
    const enhancedProps: AvatarPropTypes = (getProps(this): any);

    // provide element type based on props
    // TODO: why not enhanced props?
    const Inner: any = getStyledAvatar(this.props);

    const AvatarNode = (
      <Outer size={size} stackIndex={stackIndex}>
        <Inner
          innerRef={this.setRef}
          {...enhancedProps}
          onClick={onClick != null ? this.guardedClick : undefined}
        >
          <AvatarImage
            alt={name}
            appearance={appearance}
            size={size}
            src={src}
          />
        </Inner>

        {this.renderIcon()}
      </Outer>
    );

    return enableTooltip && name ? (
      <Tooltip content={name}>{AvatarNode}</Tooltip>
    ) : (
      AvatarNode
    );
  }
}

/**
 *  1. Higher order components seem to ignore default properties. Mapping
 *     `appearance` explicity here circumvents the issue.
 *  2. The withPseudoState HOC should remain generic so rather than pass on
 *     `enableTooltip` we map it to `isInteractive`.
 *  3. Handle keyboard/mouse events and pass props to the wrapped component:
 *     - isActive
 *     - isFocus
 *     - isHover
 */
export default mapProps({
  appearance: props => props.appearance || Avatar.defaultProps.appearance, // 1
  isInteractive: props =>
    Boolean(
      (typeof props.enableTooltip !== 'undefined'
        ? props.enableTooltip
        : Avatar.defaultProps.enableTooltip) && props.name,
    ), // 2
})(withPseudoState(Avatar)); // 3
