import * as React from 'react';
import { textColor } from '@atlaskit/adf-schema';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey as textColorPluginKey, createPlugin, } from './pm-plugins/main';
import ToolbarTextColor from './ui/ToolbarTextColor';
var pluginConfig = function (textColorConfig) {
    if (!textColorConfig || typeof textColorConfig === 'boolean') {
        return undefined;
    }
    return textColorConfig;
};
var textColorPlugin = {
    name: 'textColor',
    marks: function () {
        return [{ name: 'textColor', mark: textColor }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'textColor',
                plugin: function (_a) {
                    var props = _a.props, dispatch = _a.dispatch;
                    return createPlugin(dispatch, pluginConfig(props.allowTextColor));
                },
            },
        ];
    },
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, disabled = _a.disabled, isToolbarReducedSpacing = _a.isToolbarReducedSpacing;
        return (React.createElement(WithPluginState, { plugins: {
                textColor: textColorPluginKey,
            }, render: function (_a) {
                var textColor = _a.textColor;
                return (React.createElement(ToolbarTextColor, { pluginState: textColor, isReducedSpacing: isToolbarReducedSpacing, editorView: editorView, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement }));
            } }));
    },
};
export { textColorPluginKey };
export default textColorPlugin;
//# sourceMappingURL=index.js.map