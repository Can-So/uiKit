import * as React from 'react';
import Textfield from '@atlaskit/textfield';
import { nachosColors as colors } from '../../src';

export type NTextFieldTheme = {
  container?: {};
  input?: {};
};

export type NTextFieldProps = {
  isFocused: boolean;
  isInvalid: boolean;
  isDisabled: boolean;
  name?: string;
  theme?: any;
};

export class NachosTextField extends React.Component<NTextFieldProps> {
  render() {
    // you have to know about every possible state that changes styles or else default styles get overwritten
    const getTextFieldStyles = ({
      isFocused,
      isInvalid,
      isDisabled,
    }: NTextFieldProps) => {
      if (isDisabled) {
        return {
          backgroundColor: colors.N30,
          color: colors.N70,
        };
      }
      if (isFocused) {
        return {
          borderColor: colors['blue-500'],
          backgroundColor: colors.N0,
        };
      }
      // since we need to specify every state, returning an empty object here will just fallback to default ADG styles
      if (isInvalid) {
        return {};
      }
      return {
        backgroundColor: colors.N10,
        borderColor: colors.N40,
        color: colors.N800,
      };
    };

    // everything is styleable!
    // and you can add other properties not originally in the theme
    const nachosTheme = (adgTheme: any, themeProps: NTextFieldProps) => ({
      container: {
        ...adgTheme(themeProps).container,
        ...getTextFieldStyles(themeProps),
        padding: '6px 10px',
        lineHeight: '20px',
        ...(this.props.theme ? this.props.theme(themeProps).container : null),
      },
      input: {
        ...adgTheme(themeProps).input,
        '&::placeholder': colors.N200,

        ...(this.props.theme ? this.props.theme(themeProps).input : null),
      },
    });

    const { isInvalid, isFocused, isDisabled, theme, ...rest } = this.props;

    return (
      <div>
        <Textfield
          name={this.props.name}
          defaultValue="Tacos are yummy!"
          isInvalid={isInvalid}
          isFocused={isFocused}
          isDisabled={isDisabled}
          theme={(adgTheme: NTextFieldTheme, props: NTextFieldProps) =>
            nachosTheme(adgTheme, props)
          }
          {...rest}
        />
      </div>
    );
  }
}
