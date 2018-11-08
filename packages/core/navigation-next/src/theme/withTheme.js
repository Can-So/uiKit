// @flow

import React, {
  Component,
  type ComponentType,
  type ElementConfig,
} from 'react';
import { channel } from 'emotion-theming';
import PropTypes from 'prop-types';

import { light } from './modes';
import type { GlobalTheme, ProductTheme, Theme } from './types';

type State = { theme: Theme };

export type ThemeWrappedComp<C> = ComponentType<
  $Diff<ElementConfig<$Supertype<C>>, { theme: any }>,
>;

const withTheme = <P: {}, C: ComponentType<P>>(
  defaultTheme: Theme,
): (C => ThemeWrappedComp<C>) => {
  return WrappedComponent => {
    return class WithTheme extends Component<*, State> {
      static contextTypes = {
        [channel]: PropTypes.object,
      };

      static displayName = `WithTheme(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component'})`;

      state = {
        theme: undefined,
      };

      unsubscribeId: number;

      subscribeToContext() {
        if (this.unsubscribeId && this.unsubscribeId !== -1) {
          return;
        }

        const themeContext = this.context[channel];

        if (themeContext !== undefined) {
          this.unsubscribeId = themeContext.subscribe(theme => {
            this.setState({ theme });
          });
        }
      }

      componentWillMount() {
        this.subscribeToContext();
      }

      componentDidUpdate() {
        this.subscribeToContext();
      }

      componentWillUnmount() {
        if (this.unsubscribeId && this.unsubscribeId !== -1) {
          this.context[channel].unsubscribe(this.unsubscribeId);
        }
      }

      render() {
        const theme = this.state.theme || defaultTheme;
        return <WrappedComponent theme={theme} {...this.props} />;
      }
    };
  };
};

const defaultContentTheme: ProductTheme = { mode: light, context: 'container' };
const defaultGlobalTheme: GlobalTheme = { mode: light };

export const withContentTheme = <P: {}, C: ComponentType<P>>(
  WrappedComponent: C,
): ThemeWrappedComp<C> => withTheme(defaultContentTheme)(WrappedComponent);

export const withGlobalTheme = <P: {}, C: ComponentType<P>>(
  WrappedComponent: C,
): ThemeWrappedComp<C> => withTheme(defaultGlobalTheme)(WrappedComponent);

export default withTheme;
