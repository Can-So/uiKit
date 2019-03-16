import * as React from 'react';
import { renderNodes } from '../..';
import { renderExtension } from './extension';
var BodiedExtension = function (_a) {
    var serializer = _a.serializer, extensionHandlers = _a.extensionHandlers, rendererContext = _a.rendererContext, extensionType = _a.extensionType, extensionKey = _a.extensionKey, content = _a.content, parameters = _a.parameters, children = _a.children, _b = _a.layout, layout = _b === void 0 ? 'default' : _b;
    try {
        if (extensionHandlers && extensionHandlers[extensionType]) {
            var extensionContent = extensionHandlers[extensionType]({
                type: 'bodiedExtension',
                extensionKey: extensionKey,
                extensionType: extensionType,
                parameters: parameters,
                content: content,
            }, rendererContext.adDoc);
            switch (true) {
                case extensionContent && React.isValidElement(extensionContent):
                    // Return the extensionContent directly if it's a valid JSX.Element
                    return renderExtension(extensionContent, layout);
                case !!extensionContent:
                    // We expect it to be Atlassian Document here
                    var nodes = Array.isArray(extensionContent)
                        ? extensionContent
                        : [extensionContent];
                    return renderNodes(nodes, serializer, rendererContext.schema, 'div');
            }
        }
    }
    catch (e) {
        /** We don't want this error to block renderer */
        /** We keep rendering the default content */
    }
    // Always return default content if anything goes wrong
    return renderExtension(children, layout);
};
export default BodiedExtension;
//# sourceMappingURL=bodiedExtension.js.map