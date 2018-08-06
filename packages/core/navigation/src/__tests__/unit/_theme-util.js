// @flow
import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';
import { itemThemeNamespace } from '@atlaskit/item';
import { prefix } from '../../theme/util';
import * as presets from '../../theme/presets';
import type { RootTheme, Provided } from '../../theme/types';
import createItemTheme from '../../theme/map-navigation-theme-to-item-theme';

configure({ adapter: new Adapter() });

export const withRootTheme = (
  provided: Provided,
  isCollapsed?: boolean = false,
): Object => {
  const rootTheme: RootTheme = {
    provided,
    isCollapsed,
  };
  return {
    [prefix('root')]: rootTheme,
    [itemThemeNamespace]: createItemTheme(provided),
  };
};

const defaultTheme: Object = withRootTheme(presets.container);

export const shallowWithTheme = (
  children: Node,
  theme?: Object = defaultTheme,
) =>
  shallow(children, {
    context: theme,
  });

export const mountWithRootTheme = (
  children: Node,
  theme?: {} = defaultTheme,
  options: Object = {},
) => {
  // Context type vars
  const CHANNEL = '__styled-components__';
  const CHANNEL_NEXT = `${CHANNEL}next__`;
  const CONTEXT_CHANNEL_SHAPE = PropTypes.shape({
    getTheme: PropTypes.func,
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
  });

  // This handy way of getting context was taken from https://github.com/styled-components/jest-styled-components#theming
  // but we need to set child context types as well which has been taken from https://github.com/styled-components/styled-components/blob/v3.1.6/../models/ThemeProvider.js
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext();

  const mounted = mount(children, {
    ...options,
    context: {
      ...options.context,
      ...context,
    },
    childContextTypes: {
      ...options.childContextTypes,
      [CHANNEL]: PropTypes.func, // legacy
      [CHANNEL_NEXT]: CONTEXT_CHANNEL_SHAPE,
    },
  });

  return mounted;
};
