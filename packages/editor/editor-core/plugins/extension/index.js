import { inlineExtension, extension, bodiedExtension, } from '@atlaskit/adf-schema';
import createPlugin from './plugin';
import { getToolbarConfig } from './toolbar';
var extensionPlugin = {
    nodes: function () {
        return [
            { name: 'extension', node: extension },
            { name: 'bodiedExtension', node: bodiedExtension },
            { name: 'inlineExtension', node: inlineExtension },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'extension',
                plugin: function (_a) {
                    var props = _a.props, dispatch = _a.dispatch, providerFactory = _a.providerFactory, portalProviderAPI = _a.portalProviderAPI;
                    return createPlugin(dispatch, providerFactory, props.extensionHandlers || {}, portalProviderAPI, props.allowExtension);
                },
            },
        ];
    },
    pluginsOptions: {
        floatingToolbar: getToolbarConfig,
    },
};
export default extensionPlugin;
//# sourceMappingURL=index.js.map