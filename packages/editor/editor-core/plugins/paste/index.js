import { createPlugin } from './pm-plugins/main';
var paste = {
    pmPlugins: function () {
        return [
            {
                name: 'paste',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props;
                    return createPlugin(schema, props.appearance);
                },
            },
        ];
    },
};
export default paste;
//# sourceMappingURL=index.js.map