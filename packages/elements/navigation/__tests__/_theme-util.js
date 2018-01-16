import { PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { itemThemeNamespace } from '@atlaskit/item';
import { prefix } from '../../src/theme/util';
import * as presets from '../../src/theme/presets';
import type { RootTheme, Provided } from '../../src/theme/types';
import createItemTheme from '../../src/theme/map-navigation-theme-to-item-theme';

export const getRootTheme = (
  provided: Provided,
  isCollapsed?: boolean = false,
) => ({
  [prefix('root')]: {
    provided,
    isCollapsed,
  },
  [itemThemeNamespace]: createItemTheme(provided, isCollapsed),
});

const defaultTheme = getRootTheme(presets.container);

export const shallowWithTheme = (children, theme?: RootTheme = defaultTheme) =>
  shallow(children, {
    context: theme,
  });

// Taken from https://github.com/styled-components/styled-components/issues/624#issuecomment-289944633
// Ideally this would not be needed and we would use WithTheme,
// but some tests rely on wrapper.setProps and this can only be done on the root.
export const mountWithRootTheme = (
  children,
  theme?: RootTheme = defaultTheme,
  options = {},
) => {
  const createBroadcast = initialValue => {
    let listeners = [];
    let currentValue = initialValue;

    return {
      publish(value: mixed) {
        currentValue = value;
        listeners.forEach(listener => listener(currentValue));
      },
      subscribe(listener) {
        listeners.push(listener);
        listener(currentValue);

        return () => {
          listeners = listeners.filter(item => item !== listener);
        };
      },
    };
  };
  const CHANNEL = '__styled-components__';
  const broadcast = createBroadcast(theme);

  const themeContextTypes = Object.keys(theme).reduce((prev, current) => {
    prev[current] = PropTypes.any;
    return prev;
  }, {});

  return mount(children, {
    ...options,
    context: {
      [CHANNEL]: broadcast.subscribe,
      ...theme,
      ...options.context,
    },
    childContextTypes: {
      [CHANNEL]: broadcast.publish,
      ...themeContextTypes,
      ...options.childContextTypes,
    },
  });
};
