import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { colorPalette, borderColorPalette } from '@atlaskit/adf-schema';
import { colors } from '@atlaskit/theme';
import { getActiveColor } from '../utils/color';
import { getDisabledState } from '../utils/disabled';
export var DEFAULT_COLOR = {
    color: colors.N800.toLowerCase(),
    label: 'Dark gray',
};
export function createInitialPluginState(editorState, pluginConfig) {
    var defaultColor = (pluginConfig && pluginConfig.defaultColor) || DEFAULT_COLOR;
    var palette = new Map([
        [defaultColor.color, defaultColor.label],
    ]);
    // Typescript can't spread Map as of 11 May, 2017
    colorPalette.forEach(function (label, color) { return palette.set(color, label); });
    return {
        color: getActiveColor(editorState),
        disabled: getDisabledState(editorState),
        palette: palette,
        borderColorPalette: borderColorPalette,
        defaultColor: palette.keys().next().value,
    };
}
export var ACTIONS;
(function (ACTIONS) {
    ACTIONS[ACTIONS["RESET_COLOR"] = 0] = "RESET_COLOR";
    ACTIONS[ACTIONS["SET_COLOR"] = 1] = "SET_COLOR";
    ACTIONS[ACTIONS["DISABLE"] = 2] = "DISABLE";
})(ACTIONS || (ACTIONS = {}));
export var pluginKey = new PluginKey('textColorPlugin');
export function createPlugin(dispatch, pluginConfig) {
    return new Plugin({
        key: pluginKey,
        state: {
            init: function (config, editorState) {
                return createInitialPluginState(editorState, pluginConfig);
            },
            apply: function (tr, pluginState, _, newState) {
                var meta = tr.getMeta(pluginKey) || {};
                var nextState;
                switch (meta.action) {
                    case ACTIONS.RESET_COLOR:
                        nextState = tslib_1.__assign({}, pluginState, { color: pluginState.defaultColor });
                        break;
                    case ACTIONS.SET_COLOR:
                        nextState = tslib_1.__assign({}, pluginState, { color: meta.color, disabled: false });
                        break;
                    case ACTIONS.DISABLE:
                        nextState = tslib_1.__assign({}, pluginState, { disabled: true });
                        break;
                    default:
                        nextState = tslib_1.__assign({}, pluginState, { color: getActiveColor(newState), disabled: getDisabledState(newState) });
                }
                if ((pluginState && pluginState.color !== nextState.color) ||
                    (pluginState && pluginState.disabled !== nextState.disabled)) {
                    dispatch(pluginKey, nextState);
                    return nextState;
                }
                return pluginState;
            },
        },
    });
}
//# sourceMappingURL=main.js.map