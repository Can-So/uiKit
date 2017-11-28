// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AKTooltip from '@atlaskit/tooltip';
import ItemWrapper from '../styled/BreadcrumbsItem';
import Button from '../styled/Button';
import Separator from '../styled/Separator';
import type { ElementType } from '../types';

type Props = {|
  /** Whether this item will be followed by a separator. */
  hasSeparator?: boolean,
  /** The url or path which the breadcrumb should act as a link to. */
  href?: string,
  /** An icon to display before the breadcrumb. */
  iconBefore?: ElementType,
  /** An icon to display after the breadcrumb. */
  iconAfter?: ElementType,
  /** Handler to be called on click. **/
  onClick?: Event => mixed,
  /** The text to appear within the breadcrumb as a link. */
  text: string,
  /** The maximum width in pixels that an item can have before it is truncated.
  If this is not set, truncation will only occur when it cannot fit alone on a
  line. If there is no truncationWidth, tooltips are not provided on truncation. */
  truncationWidth?: number,
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
  /** Provide a custom component to use instead of the default button.
   *  The custom component should accept a className prop so it can be styled
   *  and possibly all action handlers */
  component?: string | (() => ElementType),
|};

type State = {|
  hasOverflow: boolean,
|};

export default class BreadcrumbsItem extends Component<Props, State> {
  props: Props; // eslint-disable-line react/sort-comp
  button: ?ElementType;

  static defaultProps = {
    component: '',
    hasSeparator: false,
    href: '#',
    iconAfter: null,
    iconBefore: null,
    truncationWidth: 0,
    onClick: () => {},
    target: '',
  };

  state = { hasOverflow: false };

  componentDidMount() {
    this.updateOverflow();
  }

  componentWillReceiveProps() {
    // Reset the state
    this.setState({ hasOverflow: false });
  }

  componentDidUpdate() {
    this.updateOverflow();
  }

  updateOverflow() {
    const { truncationWidth } = this.props;
    const button = this.button;
    if (truncationWidth && button) {
      // We need to find the DOM node for the button component in order to measure its size.
      const el = ReactDOM.findDOMNode(button); // eslint-disable-line react/no-find-dom-node
      if (!el || !(el instanceof HTMLElement)) {
        // eslint-disable-next-line no-console
        console.warn(
          'Could not find button included in breadcrumb when calculating overflow',
        );
        return false;
      }
      const overflow = el.clientWidth >= truncationWidth;
      if (overflow !== this.state.hasOverflow) {
        this.setState({ hasOverflow: overflow });
      }
      return overflow;
    }
    return false;
  }

  renderButton = () => {
    const {
      href,
      iconAfter,
      iconBefore,
      onClick,
      target,
      text,
      truncationWidth,
      component,
    } = this.props;
    const { hasOverflow } = this.state;

    return (
      <Button
        truncationWidth={truncationWidth}
        appearance="subtle-link"
        iconAfter={truncationWidth && hasOverflow ? null : iconAfter}
        iconBefore={truncationWidth && hasOverflow ? null : iconBefore}
        onClick={onClick}
        spacing="none"
        href={href}
        target={target}
        ref={(el: ElementType) => {
          this.button = el;
        }}
        component={component}
      >
        {text}
      </Button>
    );
  };

  renderButtonWithTooltip = () => (
    <AKTooltip content={this.props.text} position="bottom">
      {this.renderButton()}
    </AKTooltip>
  );

  render() {
    const { hasSeparator, truncationWidth } = this.props;
    const { hasOverflow } = this.state;

    return (
      <ItemWrapper>
        {hasOverflow && truncationWidth
          ? this.renderButtonWithTooltip()
          : this.renderButton()}
        {hasSeparator ? <Separator>/</Separator> : null}
      </ItemWrapper>
    );
  }
}
