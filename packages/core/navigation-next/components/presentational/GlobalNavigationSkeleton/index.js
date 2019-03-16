import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import { withGlobalTheme, light, ThemeProvider } from '../../../theme';
import BaseGlobalNavigationSkeleton from './GlobalNavigationSkeleton';
var GlobalNavigationSkeletonWithGlobalTheme = withGlobalTheme(BaseGlobalNavigationSkeleton);

var GlobalNavigationSkeleton = function GlobalNavigationSkeleton(props) {
  return React.createElement(ThemeProvider, {
    theme: function theme(ancestorTheme) {
      return _objectSpread({
        mode: light
      }, ancestorTheme, {
        context: 'product'
      });
    }
  }, React.createElement(GlobalNavigationSkeletonWithGlobalTheme, props));
};

export default GlobalNavigationSkeleton;