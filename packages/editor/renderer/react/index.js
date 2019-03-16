import * as tslib_1 from "tslib";
import * as React from 'react';
import { MarkType } from 'prosemirror-model';
import { getText } from '../utils';
import { Doc, mergeTextNodes, isTextWrapper, toReact, } from './nodes';
import { toReact as markToReact } from './marks';
import { calcTableColumnWidths } from '@findable/adf-schema';
import { getMarksByOrder, isSameMark, } from '@findable/editor-common';
function mergeMarks(marksAndNodes) {
    return marksAndNodes.reduce(function (acc, markOrNode) {
        var prev = (acc.length && acc[acc.length - 1]) || null;
        if (markOrNode.type instanceof MarkType &&
            prev &&
            prev.type instanceof MarkType &&
            Array.isArray(prev.content) &&
            isSameMark(prev, markOrNode)) {
            prev.content = mergeMarks(prev.content.concat(markOrNode.content));
        }
        else {
            acc.push(markOrNode);
        }
        return acc;
    }, []);
}
var ReactSerializer = /** @class */ (function () {
    function ReactSerializer(_a) {
        var providers = _a.providers, eventHandlers = _a.eventHandlers, extensionHandlers = _a.extensionHandlers, portal = _a.portal, objectContext = _a.objectContext, appearance = _a.appearance, disableHeadingIDs = _a.disableHeadingIDs, allowDynamicTextSizing = _a.allowDynamicTextSizing;
        this.headingIds = [];
        this.providers = providers;
        this.eventHandlers = eventHandlers;
        this.extensionHandlers = extensionHandlers;
        this.portal = portal;
        this.rendererContext = objectContext;
        this.appearance = appearance;
        this.disableHeadingIDs = disableHeadingIDs;
        this.allowDynamicTextSizing = allowDynamicTextSizing;
    }
    ReactSerializer.prototype.resetState = function () {
        this.headingIds = [];
    };
    ReactSerializer.prototype.serializeFragment = function (fragment, props, target, key, parentInfo) {
        var _this = this;
        if (props === void 0) { props = {}; }
        if (target === void 0) { target = Doc; }
        if (key === void 0) { key = 'root-0'; }
        // This makes sure that we reset internal state on re-render.
        if (key === 'root-0') {
            this.resetState();
        }
        var content = ReactSerializer.getChildNodes(fragment).map(function (node, index) {
            if (isTextWrapper(node)) {
                return _this.serializeTextWrapper(node.content);
            }
            var props;
            if (node.type.name === 'table') {
                props = _this.getTableProps(node);
            }
            else if (node.type.name === 'date') {
                props = _this.getDateProps(node, parentInfo);
            }
            else if (node.type.name === 'heading') {
                props = _this.getHeadingProps(node);
            }
            else {
                props = _this.getProps(node);
            }
            var pInfo = parentInfo;
            if (node.type.name === 'taskItem' && node.attrs.state !== 'DONE') {
                pInfo = { parentIsIncompleteTask: true };
            }
            var serializedContent = _this.serializeFragment(node.content, props, toReact(node), node.type.name + "-" + index, pInfo);
            if (node.marks && node.marks.length) {
                return []
                    .concat(node.marks)
                    .reverse()
                    .reduce(function (acc, mark) {
                    return _this.renderMark(markToReact(mark), _this.getMarkProps(mark), mark.type.name + "-" + index, acc);
                }, serializedContent);
            }
            return serializedContent;
        });
        return this.renderNode(target, props, key, content);
    };
    ReactSerializer.prototype.serializeTextWrapper = function (content) {
        var _this = this;
        return ReactSerializer.buildMarkStructure(content).map(function (mark, index) {
            return _this.serializeMark(mark, index);
        });
    };
    ReactSerializer.prototype.serializeMark = function (mark, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        if (mark.type.name === 'text') {
            return mark.text;
        }
        var content = (mark.content || []).map(function (child, index) { return _this.serializeMark(child, index); });
        return this.renderMark(markToReact(mark), this.getMarkProps(mark), mark.type.name + "-" + index, content);
    };
    ReactSerializer.prototype.renderNode = function (NodeComponent, props, key, content) {
        return (React.createElement(NodeComponent, tslib_1.__assign({ key: key }, props), content));
    };
    ReactSerializer.prototype.renderMark = function (MarkComponent, props, key, content) {
        return (React.createElement(MarkComponent, tslib_1.__assign({ key: key }, props), content));
    };
    ReactSerializer.prototype.getTableProps = function (node) {
        return tslib_1.__assign({}, this.getProps(node), { columnWidths: calcTableColumnWidths(node) });
    };
    ReactSerializer.prototype.getDateProps = function (node, parentInfo) {
        return {
            timestamp: node.attrs && node.attrs.timestamp,
            parentIsIncompleteTask: parentInfo && parentInfo.parentIsIncompleteTask,
        };
    };
    ReactSerializer.prototype.getProps = function (node) {
        return tslib_1.__assign({ text: node.text, providers: this.providers, eventHandlers: this.eventHandlers, extensionHandlers: this.extensionHandlers, portal: this.portal, rendererContext: this.rendererContext, serializer: this, content: node.content ? node.content.toJSON() : undefined, allowDynamicTextSizing: this.allowDynamicTextSizing, rendererAppearance: this.appearance }, node.attrs);
    };
    ReactSerializer.prototype.getHeadingProps = function (node) {
        return tslib_1.__assign({}, node.attrs, { content: node.content ? node.content.toJSON() : undefined, headingId: this.getHeadingId(node) });
    };
    ReactSerializer.prototype.getHeadingId = function (node) {
        if (this.disableHeadingIDs || !node.content.size) {
            return;
        }
        var headingId = node.content
            .toJSON()
            .reduce(function (acc, node) { return acc.concat(getText(node) || ''); }, '')
            .replace(/ /g, '-');
        return this.getUniqueHeadingId(headingId);
    };
    ReactSerializer.prototype.getUniqueHeadingId = function (baseId, counter) {
        if (counter === void 0) { counter = 0; }
        if (counter === 0 && this.headingIds.indexOf(baseId) === -1) {
            this.headingIds.push(baseId);
            return baseId;
        }
        else if (counter !== 0) {
            var headingId = baseId + "." + counter;
            if (this.headingIds.indexOf(headingId) === -1) {
                this.headingIds.push(headingId);
                return headingId;
            }
        }
        return this.getUniqueHeadingId(baseId, ++counter);
    };
    ReactSerializer.prototype.getMarkProps = function (mark) {
        var _a = mark.attrs, key = _a.key, otherAttrs = tslib_1.__rest(_a, ["key"]);
        return tslib_1.__assign({ eventHandlers: this.eventHandlers, markKey: key }, otherAttrs);
    };
    ReactSerializer.getChildNodes = function (fragment) {
        var children = [];
        fragment.forEach(function (node) {
            children.push(node);
        });
        return mergeTextNodes(children);
    };
    ReactSerializer.getMarks = function (node) {
        if (!node.marks || node.marks.length === 0) {
            return [];
        }
        return getMarksByOrder(node.marks);
    };
    ReactSerializer.buildMarkStructure = function (content) {
        var _this = this;
        return mergeMarks(content.map(function (node) {
            var nodeMarks = _this.getMarks(node);
            if (nodeMarks.length === 0) {
                return node;
            }
            return nodeMarks.reverse().reduce(function (acc, mark) {
                var eq = mark.eq;
                return tslib_1.__assign({}, mark, { eq: eq, content: [acc] });
            }, node);
        }));
    };
    ReactSerializer.fromSchema = function (schema, _a) {
        var providers = _a.providers, eventHandlers = _a.eventHandlers, extensionHandlers = _a.extensionHandlers, appearance = _a.appearance, disableHeadingIDs = _a.disableHeadingIDs, allowDynamicTextSizing = _a.allowDynamicTextSizing;
        // TODO: Do we actually need the schema here?
        return new ReactSerializer({
            providers: providers,
            eventHandlers: eventHandlers,
            extensionHandlers: extensionHandlers,
            appearance: appearance,
            disableHeadingIDs: disableHeadingIDs,
            allowDynamicTextSizing: allowDynamicTextSizing,
        });
    };
    return ReactSerializer;
}());
export default ReactSerializer;
//# sourceMappingURL=index.js.map