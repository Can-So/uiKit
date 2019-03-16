import * as tslib_1 from "tslib";
var supportedContentType = [
    'paragraph',
    'orderedList',
    'bulletList',
    'mediaSingle',
    'codeBlock',
];
/**
 * Return the type of a list from the bullets
 */
export function getType(bullets) {
    return /#$/.test(bullets) ? 'orderedList' : 'bulletList';
}
var ListBuilder = /** @class */ (function () {
    function ListBuilder(schema, bullets) {
        var _this = this;
        /**
         * Build prosemirror bulletList or orderedList node
         * @param {List} list
         * @returns {PMNode}
         */
        this.parseList = function (list) {
            var listNode = _this.schema.nodes[list.type];
            var output = [];
            var listItemsBuffer = [];
            for (var i = 0; i < list.children.length; i++) {
                var parsedContent = _this.parseListItem(list.children[i]);
                for (var j = 0; j < parsedContent.length; j++) {
                    var parsedNode = parsedContent[j];
                    if (parsedNode.type.name === 'listItem') {
                        listItemsBuffer.push(parsedNode);
                        continue;
                    }
                    /**
                     * If the node is not a listItem, then we need to
                     * wrap exisintg list and break out
                     */
                    if (listItemsBuffer.length) {
                        var list_1 = listNode.createChecked({}, listItemsBuffer);
                        output.push(list_1);
                    }
                    output.push(parsedNode); // This is the break out node
                    listItemsBuffer = [];
                }
            }
            if (listItemsBuffer.length) {
                var list_2 = listNode.createChecked({}, listItemsBuffer);
                output.push(list_2);
            }
            return output;
        };
        /**
         * Build prosemirror listItem node
         * This function would possibly return non listItem nodes
         * which we need to break out later
         * @param {ListItem} item
         */
        this.parseListItem = function (item) {
            var _a;
            var output = [];
            if (!item.content) {
                item.content = [];
            }
            // Parse nested list
            var parsedChildren = item.children.reduce(function (result, list) {
                var parsedList = _this.parseList(list);
                result.push.apply(result, tslib_1.__spread(parsedList));
                return result;
            }, []);
            // Append children to the content
            (_a = item.content).push.apply(_a, tslib_1.__spread(parsedChildren));
            var contentBuffer = [];
            for (var i = 0; i < item.content.length; i++) {
                var pmNode = item.content[i];
                /**
                 * Skip empty paragraph
                 */
                if (pmNode.type.name === 'paragraph' && pmNode.childCount === 0) {
                    continue;
                }
                /* Skip Empty spaces after rule */
                if (_this.isParagraphEmptyTextNode(pmNode)) {
                    continue;
                }
                if (supportedContentType.indexOf(pmNode.type.name) === -1) {
                    var listItem = _this.createListItem(contentBuffer, _this.schema);
                    output.push(listItem);
                    output.push(pmNode);
                    contentBuffer = [];
                    continue;
                }
                contentBuffer.push(pmNode);
            }
            if (contentBuffer.length) {
                var listItem = _this.createListItem(contentBuffer, _this.schema);
                output.push(listItem);
            }
            return output;
        };
        this.schema = schema;
        this.root = { children: [], type: getType(bullets) };
        this.lastDepth = 1;
        this.lastList = this.root;
    }
    Object.defineProperty(ListBuilder.prototype, "type", {
        /**
         * Return the type of the base list
         * @returns {ListType}
         */
        get: function () {
            return this.root.type;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a list item to the builder
     * @param {AddArgs[]} items
     */
    ListBuilder.prototype.add = function (items) {
        var e_1, _a;
        try {
            for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                var style = item.style, content = item.content;
                // If there's no style, add to previous list item as multiline
                if (style === null) {
                    this.appendToLastItem(content);
                    continue;
                }
                var depth = style.length;
                var type = getType(style);
                if (depth > this.lastDepth) {
                    // Add children starting from last node
                    this.createNest(depth - this.lastDepth, type);
                    this.lastDepth = depth;
                    this.lastList = this.addListItem(type, content);
                }
                else if (depth === this.lastDepth) {
                    // Add list item to current node
                    this.lastList = this.addListItem(type, content);
                }
                else {
                    // Find node at depth and add list item
                    this.lastList = this.findAncestor(this.lastDepth - depth);
                    this.lastDepth = depth;
                    this.lastList = this.addListItem(type, content);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Compile a prosemirror node from the root list
     * @returns {PMNode[]}
     */
    ListBuilder.prototype.buildPMNode = function () {
        return this.parseList(this.root);
    };
    /* Check if all paragraph's children nodes are text and empty */
    ListBuilder.prototype.isParagraphEmptyTextNode = function (node) {
        if (node.type.name !== 'paragraph' || !node.childCount) {
            return false;
        }
        for (var i = 0; i < node.childCount; i++) {
            var n = node.content.child(i);
            if (n.type.name !== 'text') {
                // Paragraph contains non-text node, so not empty
                return false;
            }
            else if (n.textContent.trim() !== '') {
                return false;
            }
        }
        return true;
    };
    ListBuilder.prototype.createListItem = function (content, schema) {
        if (content.length === 0 ||
            ['paragraph', 'mediaSingle'].indexOf(content[0].type.name) === -1) {
            // If the content is empty or the first element is not paragraph or mediaSingle.
            // this likely to be a nested list where the toplevel list is empty
            // For example: *# item 1
            // In this case we create an empty paragraph for the top level listNode
            content.unshift(this.schema.nodes.paragraph.createChecked());
        }
        return schema.nodes.listItem.createChecked({}, content);
    };
    /**
     * Add an item at the same level as the current list item
     * @param {ListType} type
     * @param {PMNode} content
     * @returns {PMNode}
     */
    ListBuilder.prototype.addListItem = function (type, content) {
        var list = this.lastList;
        // If the list is a different type, create a new list and add it to the parent node
        if (list.type !== type) {
            var parent_1 = list.parent;
            var newList = {
                children: [],
                type: type,
                parent: parent_1,
            };
            parent_1.children.push(newList);
            this.lastList = list = newList;
        }
        var listItem = { content: content, parent: list, children: [] };
        list.children = tslib_1.__spread(list.children, [listItem]);
        return list;
    };
    /**
     * Append the past content to the last accessed list node (multiline entries)
     * @param {PMNode[]} content
     */
    ListBuilder.prototype.appendToLastItem = function (content) {
        var _a;
        var children = this.lastList.children;
        var lastItem = children[children.length - 1];
        (_a = lastItem.content).push.apply(_a, tslib_1.__spread(content));
    };
    /**
     * Created a nested list structure of N depth under the current node
     * @param {number} depth
     * @param {ListType} type
     */
    ListBuilder.prototype.createNest = function (depth, type) {
        while (depth-- > 0) {
            if (this.lastList.children.length === 0) {
                var listItem = { parent: this.lastList, children: [] };
                this.lastList.children = [listItem];
            }
            var nextItem = this.lastList.children[this.lastList.children.length - 1];
            nextItem.children = [
                {
                    children: [],
                    parent: nextItem,
                    type: type,
                },
            ];
            this.lastList = nextItem.children[0];
        }
    };
    /**
     * Find the Nth list ancestor of the current list
     * @param {number} depth
     */
    ListBuilder.prototype.findAncestor = function (depth) {
        var list = this.lastList;
        while (depth-- > 0 && list.parent) {
            var listItem = list.parent;
            if (listItem && listItem.parent) {
                list = listItem.parent;
            }
        }
        return list;
    };
    return ListBuilder;
}());
export { ListBuilder };
//# sourceMappingURL=list-builder.js.map