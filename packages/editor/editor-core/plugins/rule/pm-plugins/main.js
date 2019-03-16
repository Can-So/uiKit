import keymapPlugin from './keymap';
import inputRulePlugin from './input-rule';
var plugins = function (schema) {
    return [inputRulePlugin(schema), keymapPlugin(schema)].filter(function (plugin) { return !!plugin; });
};
export default plugins;
//# sourceMappingURL=main.js.map