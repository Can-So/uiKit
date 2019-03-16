import * as React from 'react';
import LayoutTwoEqualIcon from '@atlaskit/icon/glyph/editor/layout-two-equal';
import { layoutSection, layoutColumn } from '@atlaskit/adf-schema';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { default as createLayoutPlugin, pluginKey, } from './pm-plugins/main';
import { buildToolbar } from './toolbar';
import { createDefaultLayoutSection } from './actions';
export { pluginKey };
export default {
    nodes: function () {
        return [
            { name: 'layoutSection', node: layoutSection },
            { name: 'layoutColumn', node: layoutColumn },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'layout',
                plugin: function (_a) {
                    var props = _a.props;
                    return createLayoutPlugin(props.allowLayouts);
                },
            },
        ];
    },
    pluginsOptions: {
        floatingToolbar: function (state, intl) {
            var _a = pluginKey.getState(state), pos = _a.pos, allowBreakout = _a.allowBreakout;
            if (pos !== null) {
                return buildToolbar(state, intl, pos, allowBreakout);
            }
            return undefined;
        },
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(messages.columns),
                    keywords: ['layout', 'section'],
                    priority: 1100,
                    icon: function () { return (React.createElement(LayoutTwoEqualIcon, { label: formatMessage(messages.columns) })); },
                    action: function (insert, state) {
                        return insert(createDefaultLayoutSection(state));
                    },
                },
            ];
        },
    },
};
//# sourceMappingURL=index.js.map