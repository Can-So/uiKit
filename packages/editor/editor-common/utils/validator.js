import * as tslib_1 from "tslib";
import { generateUuid as uuid, defaultSchema, isSafeUrl, inlineNodes, } from '@findable/adf-schema';
/*
 * It's important that this order follows the marks rank defined here:
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Rank
 */
export var markOrder = [
    'link',
    'em',
    'strong',
    'textColor',
    'strike',
    'subsup',
    'underline',
    'code',
    'confluenceInlineComment',
    'annotation',
];
export var isSubSupType = function (type) {
    return type === 'sub' || type === 'sup';
};
/*
 * Sorts mark by the predefined order above
 */
export var getMarksByOrder = function (marks) {
    return tslib_1.__spread(marks).sort(function (a, b) { return markOrder.indexOf(a.type.name) - markOrder.indexOf(b.type.name); });
};
/*
 * Check if two marks are the same by comparing type and attrs
 */
export var isSameMark = function (mark, otherMark) {
    if (!mark || !otherMark) {
        return false;
    }
    return mark.eq(otherMark);
};
export var getValidDocument = function (doc, schema, adfStage) {
    if (schema === void 0) { schema = defaultSchema; }
    if (adfStage === void 0) { adfStage = 'final'; }
    var node = getValidNode(doc, schema, adfStage);
    if (node.type === 'doc') {
        node.content = wrapInlineNodes(node.content);
        return node;
    }
    return null;
};
var wrapInlineNodes = function (nodes) {
    if (nodes === void 0) { nodes = []; }
    return nodes.map(function (node) {
        return inlineNodes.has(node.type) ? { type: 'paragraph', content: [node] } : node;
    });
};
export var getValidContent = function (content, schema, adfStage) {
    if (schema === void 0) { schema = defaultSchema; }
    if (adfStage === void 0) { adfStage = 'final'; }
    return content.map(function (node) { return getValidNode(node, schema, adfStage); });
};
var TEXT_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
var RELATIVE_LINK = /^\//;
var flattenUnknownBlockTree = function (node, schema, adfStage) {
    if (schema === void 0) { schema = defaultSchema; }
    if (adfStage === void 0) { adfStage = 'final'; }
    var output = [];
    var isPrevLeafNode = false;
    for (var i = 0; i < node.content.length; i++) {
        var childNode = node.content[i];
        var isLeafNode = !(childNode.content && childNode.content.length);
        if (i > 0) {
            if (isPrevLeafNode) {
                output.push({ type: 'text', text: ' ' });
            }
            else {
                output.push({ type: 'hardBreak' });
            }
        }
        if (isLeafNode) {
            output.push(getValidNode(childNode, schema, adfStage));
        }
        else {
            output.push.apply(output, tslib_1.__spread(flattenUnknownBlockTree(childNode, schema, adfStage)));
        }
        isPrevLeafNode = isLeafNode;
    }
    return output;
};
// null is Object, also maybe check obj.constructor == Object if we want to skip Class
var isValidObject = function (obj) { return obj !== null && typeof obj === 'object'; };
var isValidString = function (str) { return typeof str === 'string'; };
var keysLen = function (obj) { return Object.keys(obj).length; };
var isValidIcon = function (icon) {
    return isValidObject(icon) &&
        keysLen(icon) === 2 &&
        isValidString(icon.url) &&
        isValidString(icon.label);
};
var isValidUser = function (user) {
    var len = keysLen(user);
    return (isValidObject(user) &&
        len <= 2 &&
        isValidIcon(user.icon) &&
        (len === 1 || isValidString(user.id)));
};
/**
 * Sanitize unknown node tree
 *
 * @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-ImplementationdetailsforHCNGwebrenderer
 */
export var getValidUnknownNode = function (node) {
    var _a = node.attrs, attrs = _a === void 0 ? {} : _a, content = node.content, text = node.text, type = node.type;
    if (!content || !content.length) {
        var unknownInlineNode = {
            type: 'text',
            text: text || attrs.text || "[" + type + "]",
        };
        var textUrl = attrs.textUrl;
        if (textUrl && isSafeUrl(textUrl)) {
            unknownInlineNode.marks = [
                {
                    type: 'link',
                    attrs: {
                        href: textUrl,
                    },
                },
            ];
        }
        return unknownInlineNode;
    }
    /*
     * Find leaf nodes and join them. If leaf nodes' parent node is the same node
     * join with a blank space, otherwise they are children of different branches, i.e.
     * we need to join them with a hardBreak node
     */
    return {
        type: 'unknownBlock',
        content: flattenUnknownBlockTree(node),
    };
};
/*
 * This method will validate a Node according to the spec defined here
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Nodes
 *
 * This is also the place to handle backwards compatibility.
 *
 * If a node is not recognized or is missing required attributes, we should return 'unknown'
 *
 */
export var getValidNode = function (originalNode, schema, adfStage) {
    if (schema === void 0) { schema = defaultSchema; }
    if (adfStage === void 0) { adfStage = 'final'; }
    var attrs = originalNode.attrs, marks = originalNode.marks, text = originalNode.text, type = originalNode.type;
    var content = originalNode.content;
    var node = {
        attrs: attrs,
        marks: marks,
        text: text,
        type: type,
    };
    if (content) {
        node.content = content = getValidContent(content, schema, adfStage);
    }
    // If node type doesn't exist in schema, make it an unknown node
    if (!schema.nodes[type]) {
        return getValidUnknownNode(node);
    }
    if (type) {
        switch (type) {
            case 'applicationCard': {
                if (!attrs) {
                    break;
                }
                var text_1 = attrs.text, link = attrs.link, background = attrs.background, preview = attrs.preview, title = attrs.title, description = attrs.description, details = attrs.details, actions = attrs.actions, context = attrs.context;
                if (!isValidString(text_1) || !isValidObject(title) || !title.text) {
                    break;
                }
                // title can contain at most two keys (text, user)
                var titleKeys = Object.keys(title);
                if (titleKeys.length > 2) {
                    break;
                }
                if (titleKeys.length === 2 && !title.user) {
                    break;
                }
                if (title.user && !isValidUser(title.user)) {
                    break;
                }
                if ((link && !link.url) ||
                    (background && !background.url) ||
                    (preview && !preview.url) ||
                    (description && !description.text)) {
                    break;
                }
                if (context && !isValidString(context.text)) {
                    break;
                }
                if (context && (context.icon && !isValidIcon(context.icon))) {
                    break;
                }
                if (actions && !Array.isArray(actions)) {
                    break;
                }
                if (actions && !actions.length) {
                    break;
                }
                if (actions &&
                    actions.some(function (meta) {
                        var key = meta.key, title = meta.title, target = meta.target, parameters = meta.parameters;
                        if (key && !isValidString(key)) {
                            return true;
                        }
                        if (!isValidString(title)) {
                            return true;
                        }
                        if (!target) {
                            return true;
                        }
                        if (!isValidString(target.key)) {
                            return true;
                        }
                        if (target.receiver && !isValidString(target.receiver)) {
                            return true;
                        }
                        if (parameters && !isValidObject(parameters)) {
                            return true;
                        }
                    })) {
                    break;
                }
                if (details && !Array.isArray(details)) {
                    break;
                }
                if (details &&
                    details.some(function (meta) {
                        var badge = meta.badge, lozenge = meta.lozenge, users = meta.users;
                        if (badge && typeof badge.value !== 'number') {
                            return true;
                        }
                        if (lozenge && !lozenge.text) {
                            return true;
                        }
                        if (users && !Array.isArray(users)) {
                            return true;
                        }
                        if (users && !users.every(isValidUser)) {
                            return true;
                        }
                    })) {
                    break;
                }
                return {
                    type: type,
                    text: text_1,
                    attrs: attrs,
                };
            }
            case 'doc': {
                var version = originalNode.version;
                if (version && content && content.length) {
                    return {
                        type: type,
                        content: content,
                    };
                }
                break;
            }
            case 'codeBlock': {
                if (content) {
                    content = content.reduce(function (acc, val) {
                        if (val.type === 'text') {
                            acc.push({ type: val.type, text: val.text });
                        }
                        return acc;
                    }, []);
                }
                if (attrs && attrs.language) {
                    return {
                        type: type,
                        attrs: attrs,
                        content: content,
                        marks: marks,
                    };
                }
                return {
                    type: type,
                    content: content,
                    marks: marks,
                };
            }
            case 'date': {
                if (attrs && attrs.timestamp) {
                    return {
                        type: type,
                        attrs: attrs,
                    };
                }
                break;
            }
            case 'status': {
                if (attrs && attrs.text && attrs.color) {
                    return {
                        type: type,
                        attrs: attrs,
                    };
                }
                break;
            }
            case 'emoji': {
                if (attrs && attrs.shortName) {
                    return {
                        type: type,
                        attrs: attrs,
                    };
                }
                break;
            }
            case 'inlineExtension':
            case 'extension': {
                if (attrs && attrs.extensionType && attrs.extensionKey) {
                    return {
                        type: type,
                        attrs: attrs,
                    };
                }
                break;
            }
            case 'inlineCard':
            case 'blockCard': {
                if (attrs && (attrs.url || attrs.data)) {
                    return {
                        type: type,
                        attrs: attrs,
                    };
                }
                break;
            }
            case 'bodiedExtension': {
                if (attrs && attrs.extensionType && attrs.extensionKey && content) {
                    return {
                        type: type,
                        attrs: attrs,
                        content: content,
                    };
                }
                break;
            }
            case 'hardBreak': {
                return {
                    type: type,
                };
            }
            case 'media': {
                var mediaId = '';
                var mediaType = '';
                var mediaCollection = [];
                var mediaUrl = '';
                if (attrs) {
                    var id = attrs.id, collection = attrs.collection, type_1 = attrs.type, url = attrs.url;
                    mediaId = id;
                    mediaType = type_1;
                    mediaCollection = collection;
                    mediaUrl = url;
                }
                if (mediaType === 'external' && !!mediaUrl) {
                    return {
                        type: type,
                        attrs: {
                            type: mediaType,
                            url: mediaUrl,
                            width: attrs.width,
                            height: attrs.height,
                        },
                    };
                }
                else if (mediaId && mediaType) {
                    var mediaAttrs = {
                        type: mediaType,
                        id: mediaId,
                        collection: mediaCollection,
                    };
                    if (attrs.width) {
                        mediaAttrs.width = attrs.width;
                    }
                    if (attrs.height) {
                        mediaAttrs.height = attrs.height;
                    }
                    return {
                        type: type,
                        attrs: mediaAttrs,
                    };
                }
                break;
            }
            case 'mediaGroup': {
                if (Array.isArray(content) && !content.some(function (e) { return e.type !== 'media'; })) {
                    return {
                        type: type,
                        content: content,
                    };
                }
                break;
            }
            case 'mediaSingle': {
                if (Array.isArray(content) &&
                    content.length === 1 &&
                    content[0].type === 'media') {
                    return {
                        type: type,
                        attrs: attrs,
                        content: content,
                        marks: marks,
                    };
                }
                break;
            }
            case 'mention': {
                var mentionText = '';
                var mentionId = void 0;
                var mentionAccess = void 0;
                if (attrs) {
                    var text_2 = attrs.text, displayName = attrs.displayName, id = attrs.id, accessLevel = attrs.accessLevel;
                    mentionText = text_2 || displayName;
                    mentionId = id;
                    mentionAccess = accessLevel;
                }
                if (!mentionText) {
                    mentionText = text || '@unknown';
                }
                if (mentionText && mentionId) {
                    var mentionNode = {
                        type: type,
                        attrs: {
                            id: mentionId,
                            text: mentionText,
                            accessLevel: '',
                        },
                    };
                    if (mentionAccess) {
                        mentionNode.attrs.accessLevel = mentionAccess;
                    }
                    return mentionNode;
                }
                break;
            }
            case 'paragraph': {
                return marks
                    ? {
                        type: type,
                        content: content || [],
                        marks: marks,
                    }
                    : { type: type, content: content || [] };
            }
            case 'rule': {
                return {
                    type: type,
                };
            }
            case 'text': {
                var marks_1 = node.marks;
                if (text) {
                    if (marks_1) {
                        marks_1 = marks_1.reduce(function (acc, mark) {
                            var validMark = getValidMark(mark, adfStage);
                            if (validMark) {
                                acc.push(validMark);
                            }
                            return acc;
                        }, []);
                    }
                    return marks_1 ? { type: type, text: text, marks: marks_1 } : { type: type, text: text };
                }
                break;
            }
            case 'heading': {
                if (attrs) {
                    var level = attrs.level;
                    var between = function (x, a, b) { return x >= a && x <= b; };
                    if (level && between(level, 1, 6)) {
                        return marks
                            ? {
                                type: type,
                                content: content,
                                marks: marks,
                                attrs: {
                                    level: level,
                                },
                            }
                            : {
                                type: type,
                                content: content,
                                attrs: {
                                    level: level,
                                },
                            };
                    }
                }
                break;
            }
            case 'bulletList': {
                if (content) {
                    return {
                        type: type,
                        content: content,
                    };
                }
                break;
            }
            case 'orderedList': {
                if (content) {
                    return {
                        type: type,
                        content: content,
                        attrs: {
                            order: attrs && attrs.order,
                        },
                    };
                }
                break;
            }
            case 'listItem': {
                if (content) {
                    return {
                        type: type,
                        content: wrapInlineNodes(content),
                    };
                }
                break;
            }
            case 'blockquote': {
                if (content) {
                    return {
                        type: type,
                        content: content,
                    };
                }
                break;
            }
            case 'panel': {
                var types = ['info', 'note', 'tip', 'success', 'warning', 'error'];
                if (attrs && content) {
                    var panelType = attrs.panelType;
                    if (types.indexOf(panelType) > -1) {
                        return {
                            type: type,
                            attrs: { panelType: panelType },
                            content: content,
                        };
                    }
                }
                break;
            }
            case 'layoutSection': {
                if (content) {
                    return {
                        type: type,
                        marks: marks,
                        content: content,
                    };
                }
                break;
            }
            case 'layoutColumn': {
                if (attrs && content) {
                    if (attrs.width > 0 && attrs.width <= 100) {
                        return {
                            type: type,
                            content: content,
                            attrs: attrs,
                        };
                    }
                }
                break;
            }
            case 'decisionList': {
                return {
                    type: type,
                    content: content,
                    attrs: {
                        localId: (attrs && attrs.localId) || uuid(),
                    },
                };
            }
            case 'decisionItem': {
                return {
                    type: type,
                    content: content,
                    attrs: {
                        localId: (attrs && attrs.localId) || uuid(),
                        state: (attrs && attrs.state) || 'DECIDED',
                    },
                };
            }
            case 'taskList': {
                return {
                    type: type,
                    content: content,
                    attrs: {
                        localId: (attrs && attrs.localId) || uuid(),
                    },
                };
            }
            case 'taskItem': {
                return {
                    type: type,
                    content: content,
                    attrs: {
                        localId: (attrs && attrs.localId) || uuid(),
                        state: (attrs && attrs.state) || 'TODO',
                    },
                };
            }
            case 'table': {
                if (Array.isArray(content) &&
                    content.length > 0 &&
                    !content.some(function (e) { return e.type !== 'tableRow'; })) {
                    return {
                        type: type,
                        content: content,
                        attrs: attrs,
                    };
                }
                break;
            }
            case 'tableRow': {
                if (Array.isArray(content) &&
                    content.length > 0 &&
                    !content.some(function (e) { return e.type !== 'tableCell' && e.type !== 'tableHeader'; })) {
                    return {
                        type: type,
                        content: content,
                    };
                }
                break;
            }
            case 'tableCell':
            case 'tableHeader': {
                if (content) {
                    var cellAttrs = {};
                    if (attrs) {
                        if (attrs.colspan && attrs.colspan > 1) {
                            cellAttrs.colspan = attrs.colspan;
                        }
                        if (attrs.rowspan && attrs.rowspan > 1) {
                            cellAttrs.rowspan = attrs.rowspan;
                        }
                        if (attrs.background) {
                            cellAttrs.background = attrs.background;
                        }
                        if (attrs.colwidth && Array.isArray(attrs.colwidth)) {
                            cellAttrs.colwidth = attrs.colwidth;
                        }
                    }
                    return {
                        type: type,
                        content: wrapInlineNodes(content),
                        attrs: attrs ? cellAttrs : undefined,
                    };
                }
                break;
            }
            case 'image': {
                if (attrs && attrs.src) {
                    return {
                        type: type,
                        attrs: attrs,
                    };
                }
                break;
            }
            case 'placeholder': {
                if (attrs && typeof attrs.text !== 'undefined') {
                    return { type: type, attrs: attrs };
                }
                break;
            }
        }
    }
    return getValidUnknownNode(node);
};
/*
 * This method will validate a Mark according to the spec defined here
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Marks
 *
 * This is also the place to handle backwards compatibility.
 *
 * If a node is not recognized or is missing required attributes, we should return null
 *
 */
export var getValidMark = function (mark, adfStage) {
    if (adfStage === void 0) { adfStage = 'final'; }
    var attrs = mark.attrs, type = mark.type;
    if (type) {
        switch (type) {
            case 'action': {
                if (attrs && attrs.target && attrs.target.key) {
                    return {
                        type: type,
                        attrs: attrs,
                    };
                }
                break;
            }
            case 'code': {
                return {
                    type: type,
                };
            }
            case 'em': {
                return {
                    type: type,
                };
            }
            case 'link': {
                if (attrs) {
                    var href = attrs.href, url = attrs.url, __confluenceMetadata = attrs.__confluenceMetadata;
                    var linkHref = href || url;
                    if (linkHref &&
                        linkHref.indexOf(':') === -1 &&
                        !RELATIVE_LINK.test(linkHref)) {
                        linkHref = "http://" + linkHref;
                    }
                    var linkAttrs = {
                        href: linkHref,
                    };
                    if (__confluenceMetadata) {
                        linkAttrs.__confluenceMetadata = __confluenceMetadata;
                    }
                    if (linkHref && isSafeUrl(linkHref)) {
                        return {
                            type: type,
                            attrs: linkAttrs,
                        };
                    }
                }
                break;
            }
            case 'strike': {
                return {
                    type: type,
                };
            }
            case 'strong': {
                return {
                    type: type,
                };
            }
            case 'subsup': {
                if (attrs && attrs['type']) {
                    var subSupType = attrs['type'];
                    if (isSubSupType(subSupType)) {
                        return {
                            type: type,
                            attrs: {
                                type: subSupType,
                            },
                        };
                    }
                }
                break;
            }
            case 'textColor': {
                if (attrs && TEXT_COLOR_PATTERN.test(attrs.color)) {
                    return {
                        type: type,
                        attrs: attrs,
                    };
                }
                break;
            }
            case 'underline': {
                return {
                    type: type,
                };
            }
        }
    }
    if (adfStage === 'stage0') {
        switch (type) {
            case 'confluenceInlineComment': {
                return {
                    type: type,
                    attrs: attrs,
                };
            }
            case 'annotation': {
                return {
                    type: type,
                    attrs: attrs,
                };
            }
        }
    }
    return null;
};
//# sourceMappingURL=validator.js.map