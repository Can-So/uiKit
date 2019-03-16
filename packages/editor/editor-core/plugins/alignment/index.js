import * as React from 'react';
import { alignment } from '@atlaskit/adf-schema';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey, createPlugin, } from './pm-plugins/main';
import { changeAlignment } from './commands';
import ToolbarAlignment from './ui/ToolbarAlignment';
export var defaultConfig = {
    align: 'start',
};
var alignmentPlugin = {
    name: 'alignmentPlugin',
    marks: function () {
        return [{ name: 'alignment', mark: alignment }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'alignmentPlugin',
                plugin: function (_a) {
                    var props = _a.props, dispatch = _a.dispatch;
                    return createPlugin(dispatch, defaultConfig);
                },
            },
        ];
    },
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, disabled = _a.disabled, isToolbarReducedSpacing = _a.isToolbarReducedSpacing;
        return (React.createElement(WithPluginState, { plugins: {
                align: pluginKey,
            }, render: function (_a) {
                var align = _a.align;
                return (React.createElement(ToolbarAlignment, { pluginState: align, isReducedSpacing: isToolbarReducedSpacing, changeAlignment: function (align) {
                        return changeAlignment(align)(editorView.state, editorView.dispatch);
                    }, disabled: disabled || !align.isEnabled, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement }));
            } }));
    },
};
export default alignmentPlugin;
//# sourceMappingURL=index.js.map