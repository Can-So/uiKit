var prefix = function prefix(key) {
  return "@atlaskit-private-do-not-use/dropdown-menu:".concat(key);
};

export var focusManagerContext = prefix('focus-manager');
export var selectionCacheContext = prefix('selection-cache');
export var selectionManagerContext = prefix('selection-manager');
export var clickManagerContext = prefix('click-manager');