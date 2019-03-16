import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { fireAnalyticsEvent } from './utils';
export var analyticsPluginKey = new PluginKey('analyticsPlugin');
function createPlugin(createAnalyticsEvent) {
    if (!createAnalyticsEvent) {
        return;
    }
    return new Plugin({
        key: analyticsPluginKey,
        state: {
            init: function () { return null; },
            apply: function (tr) {
                var e_1, _a;
                var meta = tr.getMeta(analyticsPluginKey);
                if (meta) {
                    try {
                        for (var meta_1 = tslib_1.__values(meta), meta_1_1 = meta_1.next(); !meta_1_1.done; meta_1_1 = meta_1.next()) {
                            var analytics = meta_1_1.value;
                            var payload = analytics.payload, channel = analytics.channel;
                            fireAnalyticsEvent(createAnalyticsEvent)({ payload: payload, channel: channel });
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (meta_1_1 && !meta_1_1.done && (_a = meta_1.return)) _a.call(meta_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            },
        },
    });
}
var analyticsPlugin = function (createAnalyticsEvent) { return ({
    pmPlugins: function () {
        return [
            {
                name: 'analyticsPlugin',
                plugin: function () { return createPlugin(createAnalyticsEvent); },
            },
        ];
    },
}); };
export default analyticsPlugin;
//# sourceMappingURL=plugin.js.map