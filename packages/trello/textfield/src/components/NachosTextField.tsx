import * as React from 'react';
import Textfield from '@atlaskit/textfield';
import { nachosColors as colors } from '../../src';

export type NTextFieldProps = {
  isFocused: boolean;
  isInvalid: boolean;
  isDisabled: boolean;
  name?: string;
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
      // if this isn't here, default invalid styles will get overwritten by the next statement
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
    const nachosTheme = (defaultTheme: any, props: NTextFieldProps) => ({
      container: {
        ...defaultTheme(props).container,
        ...getTextFieldStyles(props),
        padding: '6px 10px',
        lineHeight: '20px',
        placeholderTextColor: colors.N200,
      },
      input: {
        ...defaultTheme(props).input,
      },
    });

    const { isInvalid, isFocused, isDisabled, ...rest } = this.props;

    return (
      <div>
        <Textfield
          isCompact
          name={this.props.name}
          defaultValue="Tacos are yummy!"
          isInvalid={isInvalid}
          isFocused={isFocused}
          isDisabled={isDisabled}
          theme={(theme, props: NTextFieldProps) => nachosTheme(theme, props)}
        />
      </div>
    );
  }
}
