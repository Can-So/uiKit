//@flow
import React, { Component, type Node } from 'react';
import { StyledButton } from './styled';

export type NavigatorPropsType = {
  /** This will be passed in as ariaLabel to button. This is what screen reader will read */
  ariaLabel?: string,
  /** React node to render in the button, pass the text you want use to view on pagination button */
  children?: Node,
  /** Is the navigator disabled */
  isDisabled?: boolean,
  /** This function is called with the when user clicks on navigator */
  onClick?: Function,
  /** Add the padding styles to the navigator
   * This can we used to add padding when displaying a icon
   */
  styles?: Object,
};

export default class Navigator extends Component<NavigatorPropsType> {
  render() {
    return <StyledButton {...this.props} appearance="subtle" spacing="none" />;
  }
}
