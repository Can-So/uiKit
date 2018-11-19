// @flow

import React, { Component } from 'react';
import { Theme } from '@atlaskit/theme';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';

import DefaultInput from './Input';
import defaultTheme from '../theme';
import { Wrapper } from '../styled';
import type { TextFieldProps } from '../types';

type State = {
  value: string,
  isFocused: boolean,
};

class TextField extends Component<TextFieldProps, State> {
  static defaultProps = {
    appearance: 'standard',
    input: DefaultInput,
    onChange: () => {},
    theme: defaultTheme,
  };

  state = {
    value: this.props.defaultValue || '',
    isFocused: false,
  };

  input: ?HTMLInputElement;

  getValue = () => {
    return this.props.value || this.state.value;
  };

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

  handleOnChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  setInputRef = (input: ?HTMLInputElement) => {
    this.input = input;
    // $FlowFixMe - Cannot call `this.props.innerRef` because undefined [1] is not a function
    this.props.innerRef(input);
  };

  render() {
    const { isFocused } = this.state;
    const {
      size,
      forwardedRef,
      input: Input,
      // These props come from 'form field' bc backwards compat.
      //  We don't need them tho.
      isInvalid,
      createAnalyticsEvent,
      theme,
      ...rest
    } = this.props;

    return (
      <Theme theme={theme}>
        {t => (
          <Wrapper size={size}>
            <Input
              {...rest}
              theme={t}
              isFocused={isFocused}
              forwardedRef={forwardedRef}
              onFocus={this.handleOnFocus}
              onBlur={this.handleOnBlur}
              onChange={this.handleOnChange}
              value={this.getValue()}
            />
          </Wrapper>
        )}
      </Theme>
    );
  }
}

// $FlowFixMe - flow 0.67 doesn't know about forwardRef
const ForwardRefTextField = React.forwardRef((props, ref) => (
  <TextField {...props} forwardedRef={ref} />
));

export { ForwardRefTextField as TextFieldWithoutAnalytics };
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
  })(ForwardRefTextField),
);
