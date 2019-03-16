import { inputRules } from 'prosemirror-inputrules';
import { analyticsService } from '../../../analytics';
import { createInputRule } from '../../../utils/input-rules';
import { createExternalMediaNode } from '../utils';
export function inputRulePlugin(schema) {
    if (!schema.nodes.media || !schema.nodes.mediaSingle) {
        return;
    }
    // ![something](link) should convert to an image
    var imageRule = createInputRule(/!\[(.*)\]\((\S+)\)$/, function (state, match, start, end) {
        var schema = state.schema;
        var attrs = {
            src: match[2],
            alt: match[1],
        };
        var node = createExternalMediaNode(attrs.src, schema);
        if (node) {
            analyticsService.trackEvent('atlassian.editor.image.autoformatting');
            return state.tr.replaceWith(start, end, node);
        }
        return null;
    });
    return inputRules({
        rules: [imageRule],
    });
}
export default inputRulePlugin;
//# sourceMappingURL=input-rule.js.map