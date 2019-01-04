//@flow
import React, { Component } from 'react';
import Button, {
  type ButtonProps,
  type ButtonAppearances,
} from '@atlaskit/button';

type PagePropsType = $Diff<
  ButtonProps,
  {
    appearance?: ButtonAppearances,
    autoFocus: boolean,
    isDisabled: boolean,
    isLoading: boolean,
    spacing: 'compact' | 'default' | 'none',
    shouldFitContainer: boolean,
    type: 'button' | 'submit',
  },
>;

export default class Page extends Component<PagePropsType> {
  render() {
    return <Button {...this.props} appearance="subtle" />;
  }
}
