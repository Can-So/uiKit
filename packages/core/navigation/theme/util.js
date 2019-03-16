import { css } from 'styled-components';
import hasOwnProperty from '../utils/has-own-property';
import { container, global, dark } from './presets';
export var prefix = function prefix(key) {
  return "@atlaskit-private-theme-do-not-use/navigation:".concat(key);
};
export var rootKey = prefix('root');
export var groupKey = prefix('group');
export var isDropdownOverflowKey = prefix('isDropdownOverflow');
export var isElectronMacKey = prefix('isElectronMac');
export var electronMacTopPadding = 14;
export var isElectronMac = function isElectronMac(map) {
  return map !== undefined && hasOwnProperty(map, isElectronMacKey) && map[isElectronMacKey];
};
export var getProvided = function getProvided(map) {
  if (map !== undefined && hasOwnProperty(map, rootKey) && map[rootKey]) {
    return map[rootKey].provided;
  }

  return container;
};
export var isCollapsed = function isCollapsed(map) {
  return map[rootKey] && map[rootKey].isCollapsed;
};
export var isInOverflowDropdown = function isInOverflowDropdown(map) {
  return hasOwnProperty(map, isDropdownOverflowKey);
};
export var isInCompactGroup = function isInCompactGroup(map) {
  if (!hasOwnProperty(map, groupKey)) {
    return false;
  }

  return map[groupKey].isCompact;
};
export var whenCollapsed = function whenCollapsed() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return css(["\n  ", ";\n"], function (_ref) {
    var theme = _ref.theme;
    return isCollapsed(theme) ? css.apply(void 0, args) : '';
  });
};
export var whenNotCollapsed = function whenNotCollapsed() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return css(["\n  ", ";\n"], function (_ref2) {
    var theme = _ref2.theme;
    return !isCollapsed(theme) ? css.apply(void 0, args) : '';
  });
};
export var whenNotInOverflowDropdown = function whenNotInOverflowDropdown() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return css(["\n  ", ";\n"], function (_ref3) {
    var theme = _ref3.theme;
    return !isInOverflowDropdown(theme) ? css.apply(void 0, args) : '';
  });
};
export var whenCollapsedAndNotInOverflowDropdown = function whenCollapsedAndNotInOverflowDropdown() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return css(["\n  ", ";\n"], function (_ref4) {
    var theme = _ref4.theme;
    return isCollapsed(theme) && !isInOverflowDropdown(theme) ? css.apply(void 0, args) : '';
  });
};
export var getProvidedScrollbar = function getProvidedScrollbar(map) {
  if (map !== undefined && hasOwnProperty(map, rootKey) && map[rootKey] && map[rootKey].provided.scrollBar) {
    return map[rootKey].provided.scrollBar;
  }

  return container.scrollBar;
}; // NOTE: Dark mode is a user preference that takes precedence over provided themes

export var defaultContainerTheme = function defaultContainerTheme(containerTheme, mode) {
  if (containerTheme && containerTheme.hasDarkmode) {
    return containerTheme;
  }

  if (mode === 'dark') {
    return dark;
  }

  return containerTheme || container;
};
export var defaultGlobalTheme = function defaultGlobalTheme(globalTheme, mode) {
  if (globalTheme && globalTheme.hasDarkmode) return globalTheme;

  if (mode === 'dark') {
    return dark;
  }

  return globalTheme || global;
};
export { default as WithRootTheme } from './with-root-theme';