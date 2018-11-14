import * as React from 'react';
import { ButtonAppearances } from '../types';

const getComponentName = (target: React.ComponentType): string => {
  if (target.displayName && typeof target.displayName === 'string') {
    return target.displayName;
  }

  return target.name || 'Component';
};

const warnIfDeprecatedAppearance = (appearance?: ButtonAppearances) => {
  const deprecatedAppearances = ['help'];
  if (appearance && deprecatedAppearances.indexOf(appearance) !== -1) {
    // eslint-disable-next-line no-console
    console.warn(
      `Atlaskit: The Button appearance "${appearance}" is deprecated. Please use styled-components' ThemeProvider to provide a custom theme for Button instead.`,
    );
  }
};

export default function withDeprecationWarnings<
  Props extends { appearance?: ButtonAppearances }
>(WrappedComponent: React.ComponentClass<Props>): React.ComponentClass<Props> {
  return class WithDeprecationWarnings extends React.Component<
    Readonly<Props>
  > {
    static displayName = `WithDeprecationWarnings(${getComponentName(
      WrappedComponent,
    )})`;

    componentWillMount() {
      warnIfDeprecatedAppearance(this.props.appearance);
    }

    componentWillReceiveProps(newProps: Props) {
      if (newProps.appearance !== this.props.appearance) {
        warnIfDeprecatedAppearance(newProps.appearance);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
