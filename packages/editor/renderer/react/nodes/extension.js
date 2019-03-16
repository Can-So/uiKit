import * as React from 'react';
import { renderNodes } from '../..';
import { WidthConsumer, } from '@atlaskit/editor-common';
import { calcBreakoutWidth } from '@atlaskit/editor-common';
import { RendererCssClassName } from '../../consts';
export var renderExtension = function (content, layout) { return (React.createElement(WidthConsumer, null, function (_a) {
    var width = _a.width;
    return (React.createElement("div", { className: RendererCssClassName.EXTENSION, style: {
            width: calcBreakoutWidth(layout, width),
        }, "data-layout": layout }, content));
})); };
var Extension = function (_a) {
    var serializer = _a.serializer, extensionHandlers = _a.extensionHandlers, rendererContext = _a.rendererContext, extensionType = _a.extensionType, extensionKey = _a.extensionKey, text = _a.text, parameters = _a.parameters, _b = _a.layout, layout = _b === void 0 ? 'default' : _b;
    try {
        if (extensionHandlers && extensionHandlers[extensionType]) {
            var content = extensionHandlers[extensionType]({
                type: 'extension',
                extensionKey: extensionKey,
                extensionType: extensionType,
                parameters: parameters,
                content: text,
            }, rendererContext.adDoc);
            switch (true) {
                case content && React.isValidElement(content):
                    // Return the content directly if it's a valid JSX.Element
                    return renderExtension(content, layout);
                case !!content:
                    // We expect it to be Atlassian Document here
                    var nodes = Array.isArray(content) ? content : [content];
                    return renderNodes(nodes, serializer, rendererContext.schema, 'div');
            }
        }
    }
    catch (e) {
        /** We don't want this error to block renderer */
        /** We keep rendering the default content */
    }
    // Always return default content if anything goes wrong
    return renderExtension(text || 'extension', layout);
};
export default Extension;
//# sourceMappingURL=extension.js.map