import { Fragment, } from 'prosemirror-model';
import { default as encodeCxhtml } from './encode-cxhtml';
import { children } from './utils';
export var docContentWrapper = function (schema, content, convertedNodesReverted) {
    var validContent = function (node) {
        if (node.type.spec.group === 'block') {
            return true;
        }
        return false;
    };
    // For doc we want to convert all UnsupportedInline to UnsupportedBlock
    var blockContent = [];
    content.forEach(function (node) {
        if (node.type === schema.nodes.confluenceUnsupportedInline) {
            var unsupportedBlock = schema.nodes.confluenceUnsupportedBlock.createChecked({
                cxhtml: node.attrs.cxhtml,
            });
            blockContent.push(unsupportedBlock);
            return;
        }
        blockContent.push(node);
    });
    return ensureBlock(schema, Fragment.fromArray(blockContent), convertedNodesReverted, validContent);
};
/**
 * @param content
 * @param convertedNodesReverted
 * Bullet List and Ordered List can only accept listItems
 */
export var listContentWrapper = function (schema, content, convertedNodesReverted) {
    var result = [];
    content.forEach(function (node) {
        if (node.type !== schema.nodes.listItem) {
            var listItemContent = listItemContentWrapper(schema, Fragment.from(node), convertedNodesReverted);
            var listItem = schema.nodes.listItem.createChecked({}, listItemContent);
            result.push(listItem);
        }
        else {
            result.push(node);
        }
    });
    return Fragment.fromArray(result);
};
/**
 * @param node
 * @param convertedNodesReverted
 * A private method that used by listItemContentWrapper and blockquoteContentWrapper
 * to wrap invalid content in a paragraph
 */
var convertInvalidToParagraph = function (schema, node, convertedNodesReverted) {
    var paragraphContent = ensureInline(schema, Fragment.from(node), convertedNodesReverted);
    var paragraph = schema.nodes.paragraph.createChecked({}, paragraphContent);
    return paragraph;
};
/**
 * @param content
 * @param convertedNodesReverted
 * ListItem content schema 'paragraph (paragraph | bulletList | orderedList)*'
 */
export var listItemContentWrapper = function (schema, content, convertedNodesReverted) {
    var validSpec = [
        schema.nodes.paragraph,
        schema.nodes.bulletList,
        schema.nodes.orderedList,
    ];
    var validContent = function (node) {
        if (validSpec.some(function (spec) {
            return spec === node.type;
        })) {
            return true;
        }
        return false;
    };
    var convertInvalid = function (node) {
        return convertInvalidToParagraph(schema, node, convertedNodesReverted);
    };
    return ensureBlock(schema, content, convertedNodesReverted, validContent, convertInvalid);
};
/**
 * @param content
 * @param convertedNodesReverted
 * blockquote schema supports one or more number of paragraph nodes
 */
export var blockquoteContentWrapper = function (schema, content, convertedNodesReverted) {
    var validSpec = [schema.nodes.paragraph];
    var validContent = function (node) {
        if (validSpec.some(function (spec) {
            return spec === node.type;
        })) {
            return true;
        }
        return false;
    };
    var convertInvalid = function (node) {
        return convertInvalidToParagraph(schema, node, convertedNodesReverted);
    };
    return ensureBlock(schema, content, convertedNodesReverted, validContent, convertInvalid);
};
/**
 * @param content
 * @param convertedNodesReverted
 * This function will convert all content to inline nodes
 */
export var ensureInline = function (schema, content, convertedNodesReverted, supportedMarks) {
    var result = [];
    content.forEach(function (node) {
        if (node.isInline) {
            var filteredMarks = node.marks.filter(function (mark) { return !supportedMarks || mark.isInSet(supportedMarks); });
            result.push(node.mark(filteredMarks));
            return;
        }
        // We replace an non-inline node with UnsupportedInline node
        var originalNode = convertedNodesReverted.get(node) || convertedNodesReverted.get(content);
        var unsupportedInline = schema.nodes.confluenceUnsupportedInline.createChecked({
            cxhtml: originalNode ? encodeCxhtml(originalNode) : '',
        });
        result.push(unsupportedInline);
    });
    return Fragment.fromArray(result);
};
/**
 * Ensure that each node in the fragment is valid block, wrapping
 * in a block node if necessary. You pass in a
 * validContent to skip some of the content type
 * Optionaly, you can decide to how to convert invalid node
 */
export function ensureBlock(schema, content, convertedNodesReverted, validContent, convertInvalid) {
    // This algorithm is fairly simple:
    //
    // 1. If validContent(node) => true, keep it as-is.
    // 2. When a sequence of supported (i.e. *not* `unsupportedInline`) inlines is encountered,
    //    wrap it in a paragraph.
    // 3. When an invalid block node is encountered, convert it with convertInvalid()
    //
    // It's seems possible for CXHTML documents to be poorly formed, where inline content exists
    // in positions where block content is expected. For example the top-level content is not wrapped
    // in a paragraph, but is expected to be a top-level block node.
    //
    //     Foo bar baz
    //
    // In this scenario it's effectively wrapped in a paragraph:
    //
    //     <p>Foo bar baz</p>
    //
    // This is more common in places like list items, or block quotes:
    //
    //     <ul>
    //       <li>Foo bar</li>
    //     </ul>
    //     <blockquote>Foo bar</blockquote>
    //
    // Both `<li>` (`listItem`) and `<blockquote>` (`blockQuote`) expect *paragraph* content, and so
    // in both cases `Foo bar` is wrapped in a paragraph.
    var nodes = children(content);
    var blocks = [];
    var defaultConvertInvalid = function (node) {
        var originalNode = convertedNodesReverted.get(node) || convertedNodesReverted.get(content);
        var unsupportedBlock = schema.nodes.confluenceUnsupportedBlock.createChecked({
            cxhtml: originalNode ? encodeCxhtml(originalNode) : '',
        });
        return unsupportedBlock;
    };
    var i;
    for (i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (validContent(node)) {
            blocks.push(node);
        }
        else if (node.isInline) {
            // An inline node is found. Now step through until we find the last inline
            // node, then throw everything in a paragraph.
            var j = i + 1;
            for (j; j < nodes.length; j++) {
                var nextNode = nodes[j];
                if (nextNode.isBlock) {
                    break;
                }
            }
            blocks.push(schema.nodes.paragraph.createChecked({}, nodes.slice(i, j)));
            i = j - 1;
        }
        else {
            // This is an block node but invalid content
            blocks.push(convertInvalid ? convertInvalid(node) : defaultConvertInvalid(node));
        }
    }
    return Fragment.fromArray(blocks);
}
//# sourceMappingURL=content-wrapper.js.map