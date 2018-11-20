// @flow
import React, { Component, type ComponentType } from 'react';
import { ThemeProvider } from 'styled-components';
import defaultDrawerTheme from '../theme/default-drawer-theme';

export default (WrappedComponent: ComponentType<*>, theme: ?Object) => {
  return class extends Component<*> {
    render() {
      return (
        <ThemeProvider theme={theme || defaultDrawerTheme}>
          <WrappedComponent {...this.props} />
        </ThemeProvider>
      );
    }
  };
};
