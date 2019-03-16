import { analyticsService } from '../../analytics';
export var traverseNode = function (node, schema) {
    var cxhtml = '';
    var _a = schema.nodes, unsupportedInline = _a.unsupportedInline, unsupportedBlock = _a.unsupportedBlock;
    if (node.attrs && node.attrs.cxhtml) {
        cxhtml = node.attrs.cxhtml;
    }
    var data = {
        type: node.type.name,
        cxhtml: cxhtml,
        text: node.text || '',
    };
    if (node.type === unsupportedInline) {
        analyticsService.trackEvent('atlassian.editor.confluenceUnsupported.inline', data);
    }
    else if (node.type === unsupportedBlock) {
        analyticsService.trackEvent('atlassian.editor.confluenceUnsupported.block', data);
    }
    else {
        node.content.forEach(function (node) { return traverseNode(node, schema); });
    }
};
//# sourceMappingURL=utils.js.map