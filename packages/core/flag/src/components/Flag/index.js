// @flow
import React, { Component } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Container, {
  Description,
  DismissButton,
  Icon,
  Content,
  Title,
  Header,
} from './styledFlag';
import Expander from '../Expander';
import Actions from '../FlagActions';
import { flagFocusRingColor } from '../../theme';
import type { FlagProps } from '../../types';

export const DEFAULT_APPEARANCE = 'normal';

type State = {
  isExpanded: boolean,
};

export default class Flag extends Component<FlagProps, State> {
  props: FlagProps; // eslint-disable-line react/sort-comp

  static defaultProps = {
    actions: [],
    appearance: DEFAULT_APPEARANCE,
    isDismissAllowed: false,
  };

  state = { isExpanded: false };

  componentWillReceiveProps(nextProps: FlagProps) {
    const { actions, description } = nextProps;
    if (
      this.isBold() &&
      this.state.isExpanded &&
      !description &&
      (!actions || !actions.length)
    ) {
      this.toggleExpand();
    }
  }

  dismissFlag = () => {
    if (this.props.isDismissAllowed && this.props.onDismissed) {
      this.props.onDismissed(this.props.id);
    }
  };

  isBold = () => this.props.appearance !== DEFAULT_APPEARANCE;

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  renderToggleOrDismissButton = () => {
    const {
      appearance,
      description,
      actions,
      isDismissAllowed,
      onDismissed,
    } = this.props;
    const isBold = this.isBold();
    if (
      !isDismissAllowed ||
      (!isBold && !onDismissed) ||
      (isBold && !description && (!actions || !actions.length))
    ) {
      return null;
    }

    const ChevronIcon = this.state.isExpanded ? ChevronUpIcon : ChevronDownIcon;
    const ButtonIcon = isBold ? ChevronIcon : CrossIcon;
    const buttonLabel = isBold ? 'Toggle flag body' : 'Dismiss flag';
    const buttonAction = isBold ? this.toggleExpand : this.dismissFlag;
    const size = ButtonIcon === ChevronIcon ? 'large' : 'small';

    return (
      <DismissButton
        appearance={appearance}
        aria-expanded={this.state.isExpanded}
        // $FlowFixMe TEMPORARY
        focusRingColor={flagFocusRingColor(this.props)}
        onClick={buttonAction}
        type="button"
      >
        <ButtonIcon label={buttonLabel} size={size} />
      </DismissButton>
    );
  };

  renderBody = () => {
    const { actions, appearance, description } = this.props;
    const isExpanded = !this.isBold() || this.state.isExpanded;

    return (
      <Expander isExpanded={isExpanded}>
        {description && (
          <Description appearance={appearance}>{description}</Description>
        )}
        <Actions actions={actions} appearance={appearance} />
      </Expander>
    );
  };

  // We prevent default on mouse down to avoid focus ring when the flag is clicked,
  // while still allowing it to be focused with the keyboard.
  handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
  };

  render() {
    const {
      appearance,
      icon,
      title,
      onMouseOver,
      onFocus,
      onMouseOut,
      onBlur,
    } = this.props;
    const autoDismissProps = { onMouseOver, onFocus, onMouseOut, onBlur };
    const OptionalDismissButton = this.renderToggleOrDismissButton;
    const Body = this.renderBody;

    return (
      <Container
        appearance={appearance}
        role="alert"
        tabIndex="0"
        onMouseDown={this.handleMouseDown}
        {...autoDismissProps}
      >
        <Header>
          <Icon>{icon}</Icon>
          <Title appearance={appearance}>{title}</Title>
          <OptionalDismissButton />
        </Header>
        <Content>
          <Body />
        </Content>
      </Container>
    );
  }
}
