import * as tslib_1 from "tslib";
import { Fragment, Node as PMNode, } from 'prosemirror-model';
import { normalizeHexColor } from '@findable/editor-common';
import { AC_XMLNS } from './encode-cxhtml';
/**
 * Deduce a set of marks from a style declaration.
 */
export function marksFromStyle(schema, style) {
    var marks = [];
    styles: for (var i = 0; i < style.length; i++) {
        var name_1 = style.item(i);
        var value = style.getPropertyValue(name_1);
        switch (name_1) {
            case 'text-decoration-color':
            case 'text-decoration-style':
                continue styles;
            case 'text-decoration-line':
            case 'text-decoration':
                switch (value) {
                    case 'line-through':
                        marks = schema.marks.strike.create().addToSet(marks);
                        continue styles;
                }
                break;
            case 'color':
                marks = schema.marks.textColor
                    .create({ color: normalizeHexColor(value) })
                    .addToSet(marks);
                continue styles;
            case 'font-family':
                if (value === 'monospace') {
                    marks = schema.marks.code.create().addToSet(marks);
                    continue styles;
                }
        }
        throw new Error("Unable to derive a mark for CSS " + name_1 + ": " + value);
    }
    return marks;
}
/**
 * Create a fragment by adding a set of marks to each node.
 */
export function addMarks(fragment, marks) {
    var e_1, _a;
    var result = fragment;
    for (var i = 0; i < fragment.childCount; i++) {
        var child = result.child(i);
        var newChild = child;
        try {
            for (var marks_1 = tslib_1.__values(marks), marks_1_1 = marks_1.next(); !marks_1_1.done; marks_1_1 = marks_1.next()) {
                var mark = marks_1_1.value;
                newChild = newChild.mark(mark.addToSet(newChild.marks));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (marks_1_1 && !marks_1_1.done && (_a = marks_1.return)) _a.call(marks_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        result = result.replaceChild(i, newChild);
    }
    return result;
}
export function getNodeMarkOfType(node, markType) {
    if (!node.marks) {
        return null;
    }
    var foundMarks = node.marks.filter(function (mark) { return mark.type.name === markType.name; });
    return foundMarks.length ? foundMarks[foundMarks.length - 1] : null;
}
/**
 *
 * Traverse the DOM node and build an array of the breadth-first-search traversal
 * through the tree.
 *
 * Detection of supported vs unsupported content happens at this stage. Unsupported
 * nodes do not have their children traversed. Doing this avoids attempting to
 * decode unsupported content descendents into ProseMirror nodes.
 */
export function findTraversalPath(roots) {
    var inqueue = tslib_1.__spread(roots);
    var outqueue = [];
    var elem;
    while ((elem = inqueue.shift())) {
        outqueue.push(elem);
        var children_1 = void 0;
        if (isNodeSupportedContent(elem) && (children_1 = childrenOfNode(elem))) {
            var childIndex = void 0;
            for (childIndex = 0; childIndex < children_1.length; childIndex++) {
                var child = children_1[childIndex];
                inqueue.push(child);
            }
        }
    }
    return outqueue;
}
function childrenOfNode(node) {
    var tag = getNodeName(node);
    if (tag === 'AC:STRUCTURED-MACRO') {
        return getAcTagChildNodes(node, 'AC:RICH-TEXT-BODY');
    }
    return node.childNodes;
}
/**
 * Return an array containing the child nodes in a fragment.
 *
 * @param fragment
 */
export function children(fragment) {
    var nodes = [];
    for (var i = 0; i < fragment.childCount; i++) {
        nodes.push(fragment.child(i));
    }
    return nodes;
}
/**
 * Quickly determine if a DOM node is supported (i.e. can be represented in the ProseMirror
 * schema).
 *
 * When a node is not supported, its children are not traversed — instead the entire node content
 * is stored inside an `unsupportedInline`.
 *
 * @param node
 */
function isNodeSupportedContent(node) {
    if (node.nodeType === Node.TEXT_NODE ||
        node.nodeType === Node.CDATA_SECTION_NODE) {
        return true;
    }
    if (node instanceof HTMLElement || node.nodeType === Node.ELEMENT_NODE) {
        var tag = getNodeName(node);
        switch (tag) {
            case 'DEL':
            case 'S':
            case 'B':
            case 'STRONG':
            case 'I':
            case 'EM':
            case 'CODE':
            case 'SUB':
            case 'SUP':
            case 'U':
            case 'BLOCKQUOTE':
            case 'SPAN':
            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':
            case 'BR':
            case 'HR':
            case 'UL':
            case 'OL':
            case 'LI':
            case 'P':
            case 'A':
            case 'FAB:MENTION':
            case 'FAB:MEDIA-GROUP':
            case 'FAB:MEDIA-SINGLE':
            case 'FAB:MEDIA':
            case 'AC:INLINE-COMMENT-MARKER':
            case 'AC:STRUCTURED-MACRO':
                return true;
        }
    }
    return false;
}
export function getAcName(node) {
    return node.getAttribute('ac:name') || '';
}
export function getNodeName(node) {
    return node.nodeName.toUpperCase();
}
export function getAcTagContent(node, tagName) {
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
        var child = node.childNodes[i];
        if (getNodeName(child) === tagName) {
            return child.textContent;
        }
    }
    return null;
}
export function getAcTagChildNodes(node, tagName) {
    var child = getAcTagNode(node, tagName);
    if (child) {
        // return html collection only if childNodes are found
        return child.childNodes.length ? child.childNodes : null;
    }
    return null;
}
export function getAcTagNode(node, tagName) {
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
        var child = node.childNodes[i];
        if (getNodeName(child).toLowerCase() === tagName) {
            return child;
        }
    }
    return null;
}
export function getMacroAttribute(node, attribute) {
    return node.getAttribute('data-macro-' + attribute) || '';
}
export function getMacroParameters(node) {
    var params = {};
    getMacroAttribute(node, 'parameters')
        .split('|')
        .forEach(function (paramStr) {
        var param = paramStr.split('=');
        if (param.length) {
            params[param[0]] = param[1];
        }
    });
    return params;
}
export function createCodeFragment(schema, codeContent, language, title) {
    var content = [];
    // @ts-ignore: Unused variable, delete me???
    var nodeSize = 0;
    if (!!title) {
        var titleNode = schema.nodes.heading.createChecked({ level: 5 }, schema.text(title));
        content.push(titleNode);
        nodeSize += titleNode.nodeSize;
    }
    var codeBlockNode = schema.nodes.codeBlock.createChecked({ language: language }, schema.text(codeContent));
    content.push(codeBlockNode);
    nodeSize += codeBlockNode.nodeSize;
    return Fragment.from(content);
}
export function hasClass(node, className) {
    if (node && node.className) {
        return node.className.indexOf(className) > -1;
    }
    return false;
}
/**
 * Calculates the size of an element in a given dimension, using its CSS property value,
 * which may be based to the parent element's dimensions.
 *
 * @param value Value for a CSS property. Supported units are px and %.
 * @param parentPixels The dimension of the container element, in pixels.
 */
export function calcPixelsFromCSSValue(value, parentPixels) {
    if (value.substr(-2) === 'px') {
        return parseInt(value.slice(0, -2), 10);
    }
    else if (value.substr(-1) === '%') {
        return Math.round((parseInt(value.slice(0, -1), 10) / 100.0) * parentPixels);
    }
    return 0;
}
/*
 * Constructs a struct string of replacement blocks and marks for a given node
 */
export function getContent(node, convertedNodes) {
    var fragment = Fragment.fromArray([]);
    for (var childIndex = 0; childIndex < node.childNodes.length; childIndex++) {
        var child = node.childNodes[childIndex];
        var thing = convertedNodes.get(child);
        if (thing instanceof Fragment || thing instanceof PMNode) {
            fragment = fragment.append(Fragment.from(thing));
        }
    }
    return fragment;
}
export function parseMacro(node) {
    var macroName = getAcName(node) || 'Unnamed Macro';
    var macroId = node.getAttributeNS(AC_XMLNS, 'macro-id');
    var properties = {};
    var params = {};
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
        var child = node.childNodes[i];
        var nodeName = getNodeName(child).toLowerCase();
        if (child.nodeType === 3) {
            continue;
        }
        var value = child.textContent;
        // example: <ac:parameter ac:name=\"colour\">Red</ac:parameter>
        if (nodeName === 'ac:parameter') {
            var key = getAcName(child);
            if (key) {
                params[key] = value;
            }
        }
        else {
            // example: <fab:placeholder-url>, <fab:display-type>, <ac:rich-text-body>
            properties[nodeName] = value;
        }
    }
    return { macroId: macroId, macroName: macroName, properties: properties, params: params };
}
export var getExtensionMacroParams = function (params) {
    var macroParams = {};
    Object.keys(params).forEach(function (key) {
        /** Safe check for empty keys */
        if (key) {
            macroParams[key] = { value: params[key] };
        }
    });
    return macroParams;
};
export var mapPanelTypeToPm = function (panelType) {
    switch (panelType) {
        case 'warning':
            return 'error';
        case 'note':
            return 'warning';
        case 'tip':
            return 'success';
    }
    return panelType;
};
export var mapPanelTypeToCxhtml = function (panelType) {
    switch (panelType) {
        case 'error':
            return 'warning';
        case 'warning':
            return 'note';
        case 'success':
            return 'tip';
        case 'note':
            return 'panel';
    }
    return panelType;
};
export var encodeMacroParams = function (doc, params) {
    var elem = doc.createDocumentFragment();
    Object.keys(params).forEach(function (name) {
        var el = doc.createElementNS(AC_XMLNS, 'ac:parameter');
        el.setAttributeNS(AC_XMLNS, 'ac:name', name);
        el.textContent = params[name].value;
        elem.appendChild(el);
    });
    return elem;
};
//# sourceMappingURL=utils.js.map