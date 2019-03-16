import * as tslib_1 from "tslib";
import { collab } from 'prosemirror-collab';
import { createPlugin, pluginKey } from './plugin';
export { CollabProvider } from './provider';
export { pluginKey };
var collabEditPlugin = function (options) { return ({
    pmPlugins: function () {
        var _a = options || {}, _b = _a.useNativePlugin, useNativePlugin = _b === void 0 ? false : _b, _c = _a.userId, userId = _c === void 0 ? null : _c;
        return tslib_1.__spread((useNativePlugin
            ? [
                {
                    name: 'pmCollab',
                    plugin: function () { return collab({ clientID: userId }); },
                },
            ]
            : []), [
            {
                name: 'collab',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, providerFactory = _a.providerFactory;
                    return createPlugin(dispatch, providerFactory, options);
                },
            },
        ]);
    },
}); };
export default collabEditPlugin;
//# sourceMappingURL=index.js.map