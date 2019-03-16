import { createPlugin } from './pm-plugins/main';
import inputRulePlugin from './pm-plugins/input-rule';
var imageUpload = {
    pmPlugins: function () {
        return [
            {
                name: 'imageUpload',
                plugin: createPlugin,
            },
            {
                name: 'imageUploadInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return inputRulePlugin(schema);
                },
            },
        ];
    },
};
export default imageUpload;
//# sourceMappingURL=index.js.map