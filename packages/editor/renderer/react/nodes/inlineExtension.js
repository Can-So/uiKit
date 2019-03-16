import * as React from 'react';
import { renderNodes } from '../..';
var InlineExtension = function (_a) {
    var serializer = _a.serializer, extensionHandlers = _a.extensionHandlers, rendererContext = _a.rendererContext, extensionType = _a.extensionType, extensionKey = _a.extensionKey, parameters = _a.parameters, text = _a.text, children = _a.children;
    try {
        if (extensionHandlers && extensionHandlers[extensionType]) {
            var content = extensionHandlers[extensionType]({
                type: 'inlineExtension',
                extensionKey: extensionKey,
                extensionType: extensionType,
                parameters: parameters,
                content: text,
            }, rendererContext.adDoc);
            switch (true) {
                case content && React.isValidElement(content):
                    // Return the content directly if it's a valid JSX.Element
                    return React.createElement("span", null, content);
                case !!content:
                    // We expect it to be Atlassian Document here
                    var nodes = Array.isArray(content) ? content : [content];
                    return renderNodes(nodes, serializer, rendererContext.schema, 'span');
            }
        }
    }
    catch (e) {
        /** We don't want this error to block renderer */
        /** We keep rendering the default content */
    }
    // Always return default content if anything goes wrong
    return React.createElement("span", null, text || 'inlineExtension');
};
export default InlineExtension;
//# sourceMappingURL=inlineExtension.js.map