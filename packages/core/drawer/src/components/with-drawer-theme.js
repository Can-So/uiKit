// @flow
import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultDrawerTheme from '../theme/default-drawer-theme';

export default (WrappedComponent, theme) => {
  return class extends React.Component {
    render() {
      return (
        <ThemeProvider theme={theme || defaultDrawerTheme}>
          <WrappedComponent {...this.props} />
        </ThemeProvider>
      );
    }
  };
};
