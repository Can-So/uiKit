// @flow

import GlobalTheme from '@atlaskit/theme';
import React, { Component } from 'react';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';

import Input from './Input';
import { Wrapper } from '../styled';
import { Theme } from '../theme';
import type { TextFieldProps } from '../types';

type State = {
  isFocused: boolean,
};

class Textfield extends Component<TextFieldProps, State> {
  static defaultProps = {
    appearance: 'standard',
  };

  state = {
    isFocused: false,
  };

  input: ?HTMLInputElement;

  handleOnFocus = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  handleOnBlur = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  setInputRef = (input: ?HTMLInputElement) => {
    this.input = input;
    if (this.props.forwardedRef) {
      this.props.forwardedRef(input);
    }
  };

  render() {
    const { isFocused } = this.state;
    const {
      appearance,
      width,
      forwardedRef,
      theme,
      // createAnalytics passed through from analytics-next
      // we don't want to spread this onto our input
      createAnalyticsEvent, // eslint-disable-line react/prop-types
      ...rest
    } = this.props;

    return (
      <Theme.Provider value={theme}>
        <GlobalTheme.Consumer>
          {({ mode }) => (
            <Theme.Consumer appearance={appearance} mode={mode}>
              {tokens => (
                <Wrapper width={width}>
                  <Input
                    {...rest}
                    theme={tokens}
                    isFocused={isFocused}
                    forwardedRef={forwardedRef}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                  />
                </Wrapper>
              )}
            </Theme.Consumer>
          )}
        </GlobalTheme.Consumer>
      </Theme.Provider>
    );
  }
}

// $ExpectError - flow 0.67 doesn't know about forwardRef
const ForwardRefTextfield = React.forwardRef((props, ref) => (
  <Textfield {...props} forwardedRef={ref} />
));

export { ForwardRefTextfield as TextFieldWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'textField',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'textField',

      attributes: {
        componentName: 'textField',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
      action: 'focused',
      actionSubject: 'textField',

      attributes: {
        componentName: 'textField',
        packageName,
        packageVersion,
      },
    }),
  })(ForwardRefTextfield),
);
