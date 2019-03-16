import * as tslib_1 from "tslib";
import { isSchemaWithLists, isSchemaWithMentions, isSchemaWithLinks, isSchemaWithAdvancedTextFormattingMarks, isSchemaWithCodeBlock, isSchemaWithBlockQuotes, isSchemaWithMedia, isSchemaWithSubSupMark, isSchemaWithTextColor, isSchemaWithTables, } from '@findable/adf-schema';
import { normalizeHexColor } from '@findable/editor-common';
import { Fragment, } from 'prosemirror-model';
import { mapImageToEmoji } from './emojiHelper';
/**
 * Ensure that each node in the fragment is a block, wrapping
 * in a block node if necessary.
 */
export function ensureBlocks(fragment, schema, nodeType) {
    // If all the nodes are inline, we want to wrap in a single paragraph.
    if (schema.nodes.paragraph.validContent(fragment)) {
        return Fragment.fromArray([
            schema.nodes.paragraph.createChecked({}, fragment),
        ]);
    }
    // Either all the nodes are blocks, or a mix of inline and blocks.
    // We convert each (if any) inline nodes to blocks.
    var blockNodes = [];
    // Following if condition has been added as fix for #ED-3431.
    // First child of list-item should be paragraph,
    // if that is not the case paragraph requires to be added.
    if (nodeType &&
        nodeType === schema.nodes.listItem &&
        fragment.firstChild &&
        (fragment.firstChild.type === schema.nodes.bulletList ||
            fragment.firstChild.type === schema.nodes.orderedList)) {
        blockNodes.push(schema.nodes.paragraph.createAndFill());
    }
    fragment.forEach(function (child) {
        if (child.isBlock) {
            blockNodes.push(child);
        }
        else {
            blockNodes.push(schema.nodes.paragraph.createChecked({}, child));
        }
    });
    return Fragment.fromArray(blockNodes);
}
/**
 * This function will convert all content to inline nodes
 */
export var ensureInline = function (schema, content, supportedMarks) {
    var result = [];
    content.forEach(function (node) {
        if (node.isInline) {
            var filteredMarks = node.marks.filter(function (mark) {
                return mark.isInSet(supportedMarks);
            });
            result.push(node.mark(filteredMarks));
            return;
        }
        // We replace an non-inline node with UnsupportedInline node
        result.push(schema.text(node.textContent));
    });
    return Fragment.fromArray(result);
};
export function convert(content, node, schema) {
    // text
    if (node.nodeType === Node.TEXT_NODE) {
        var text = node.textContent;
        return text ? schema.text(text) : null;
    }
    // marks and nodes
    if (node instanceof HTMLElement) {
        var tag = node.tagName.toUpperCase();
        switch (tag) {
            // Marks
            case 'DEL':
                if (!isSchemaWithAdvancedTextFormattingMarks(schema)) {
                    return null;
                }
                return addMarks(content, [schema.marks.strike.create()]);
            case 'B':
                return addMarks(content, [schema.marks.strong.create()]);
            case 'EM':
                return addMarks(content, [schema.marks.em.create()]);
            case 'TT':
                if (!isSchemaWithAdvancedTextFormattingMarks(schema)) {
                    return null;
                }
                return addMarks(content, [schema.marks.code.create()]);
            case 'SUB':
            case 'SUP':
                if (!isSchemaWithSubSupMark(schema)) {
                    return null;
                }
                var type = tag === 'SUB' ? 'sub' : 'sup';
                return addMarks(content, [schema.marks.subsup.create({ type: type })]);
            case 'INS':
                return addMarks(content, [schema.marks.underline.create()]);
            case 'FONT':
                if (!isSchemaWithTextColor(schema)) {
                    return null;
                }
                var color = normalizeHexColor(node.getAttribute('color'), '#333333');
                return color
                    ? addMarks(content, [schema.marks.textColor.create({ color: color })])
                    : content;
            // Nodes
            case 'A':
                if (node.className === 'user-hover' && isSchemaWithMentions(schema)) {
                    return schema.nodes.mention.createChecked({
                        id: node.getAttribute('rel'),
                        text: node.textContent,
                    });
                }
                if (node.className.match('jira-issue-macro-key') ||
                    !content ||
                    !isSchemaWithLinks(schema)) {
                    return null;
                }
                var href = node.getAttribute('href');
                var title = node.getAttribute('title');
                return href
                    ? addMarks(content, [schema.marks.link.create({ href: href, title: title })])
                    : content;
            case 'SPAN':
                /**
                 * JIRA ISSUE MACROS
                 * `````````````````
                 * <span class="jira-issue-macro" data-jira-key="ED-1">
                 *     <a href="https://product-fabric.atlassian.net/browse/ED-1" class="jira-issue-macro-key issue-link">
                 *         <img class="icon" src="./epic.svg" />
                 *         ED-1
                 *     </a>
                 *     <span class="aui-lozenge aui-lozenge-subtle aui-lozenge-current jira-macro-single-issue-export-pdf">
                 *         In Progress
                 *     </span>
                 * </span>
                 */
                if (node.className.split(' ').indexOf('jira-issue-macro') > -1) {
                    var jiraKey = node.getAttribute('data-jira-key');
                    var link = node.getElementsByTagName('a')[0];
                    if (jiraKey && link) {
                        return addMarks(Fragment.from(schema.text(jiraKey)), [
                            schema.marks.link.create({
                                href: link.getAttribute('href'),
                                title: link.getAttribute('title'),
                            }),
                        ]);
                    }
                    return null;
                }
                else if (node.className.match('jira-macro-single-issue-export-pdf')) {
                    return null;
                }
                else if (node.className.match('code-')) {
                    // Removing spans with syntax highlighting from JIRA
                    return null;
                }
                else if (isMedia(node) && isSchemaWithMedia(schema)) {
                    var dataNode = node.querySelector('[data-media-services-id]');
                    if (dataNode && dataNode instanceof HTMLElement) {
                        var id = dataNode.getAttribute('data-media-services-id');
                        var type_1 = dataNode.getAttribute('data-media-services-type');
                        var collection = dataNode.getAttribute('data-media-services-collection') || '';
                        var attachmentName = dataNode.getAttribute('data-attachment-name');
                        var attachmentType = dataNode.getAttribute('data-attachment-type');
                        var fileName = dataNode.getAttribute('data-file-name');
                        var displayType = dataNode.getAttribute('data-display-type');
                        var width = parseInt(dataNode.getAttribute('data-width') || '', 10);
                        var height = parseInt(dataNode.getAttribute('data-height') || '', 10);
                        return schema.nodes.media.createChecked({
                            id: id,
                            type: type_1,
                            collection: collection,
                            width: width || null,
                            height: height || null,
                            __fileName: attachmentName || fileName,
                            __displayType: attachmentType || displayType || 'thumbnail',
                        });
                    }
                }
                break;
            case 'IMG':
                if (node.parentElement &&
                    node.parentElement.className.match('jira-issue-macro-key')) {
                    return null;
                }
                else if (node.className === 'emoticon') {
                    var emojiResult = mapImageToEmoji(node);
                    if (emojiResult) {
                        return schema.text(emojiResult);
                    }
                }
                break;
            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':
                var level = Number(tag.charAt(1));
                var supportedMarks = [schema.marks.link].filter(function (mark) { return !!mark; });
                return schema.nodes.heading.createChecked(
                // @see ED-4708
                { level: level === 6 ? 5 : level }, schema.nodes.heading.validContent(content)
                    ? content
                    : ensureInline(schema, content, supportedMarks));
            case 'BR':
                return schema.nodes.hardBreak.createChecked();
            case 'HR':
                return schema.nodes.rule.createChecked();
            case 'P':
                if (node.firstChild && isMedia(node.firstChild)) {
                    // Filter out whitespace text nodes
                    var mediaContent_1 = [];
                    var hasNonMediaChildren_1 = false;
                    content.forEach(function (child) {
                        if (child.type === schema.nodes.media) {
                            mediaContent_1.push(child);
                        }
                        else if (!(child.isText && /^\s*$/.test(child.text || ''))) {
                            hasNonMediaChildren_1 = true;
                        }
                    });
                    if (hasNonMediaChildren_1) {
                        return schema.nodes.paragraph.createChecked({}, content);
                    }
                    if (isSchemaWithMedia(schema)) {
                        var nodeType = isMediaSingle(node.firstChild)
                            ? schema.nodes.mediaSingle
                            : schema.nodes.mediaGroup;
                        return nodeType.createChecked({}, Fragment.fromArray(mediaContent_1));
                    }
                    return null;
                }
                return schema.nodes.paragraph.createChecked({}, content);
        }
        // lists
        if (isSchemaWithLists(schema)) {
            switch (tag) {
                case 'UL':
                    return schema.nodes.bulletList.createChecked({}, content);
                case 'OL':
                    return schema.nodes.orderedList.createChecked({}, content);
                case 'LI':
                    var compatibleContent = schema.nodes.listItem.validContent(content)
                        ? content
                        : ensureBlocks(content, schema, schema.nodes.listItem);
                    return schema.nodes.listItem.createChecked({}, compatibleContent);
            }
        }
        // code block
        if (isSchemaWithCodeBlock(schema)) {
            switch (tag) {
                case 'DIV':
                    if (node.className === 'codeContent panelContent' ||
                        node.className.match('preformattedContent')) {
                        return null;
                    }
                    else if (node.className === 'code panel' ||
                        node.className === 'preformatted panel') {
                        var pre = node.querySelector('pre');
                        if (!pre) {
                            return null;
                        }
                        var language = node.className === 'preformatted panel'
                            ? 'plain'
                            : pre.className.split('-')[1];
                        var textContent = (pre.textContent || '').replace(/\r\n/g, '\n');
                        return schema.nodes.codeBlock.createChecked({ language: language }, textContent ? schema.text(textContent) : undefined);
                    }
                    break;
                case 'PRE':
                    return null;
            }
        }
        if (isSchemaWithBlockQuotes(schema) && tag === 'BLOCKQUOTE') {
            var blockquoteContent = content && content.content.length
                ? content
                : schema.nodes.paragraph.createChecked();
            return schema.nodes.blockquote.createChecked({}, blockquoteContent);
        }
        // table
        if (isSchemaWithTables(schema)) {
            switch (tag) {
                case 'TABLE':
                    return schema.nodes.table.createChecked({}, content);
                case 'TR':
                    return schema.nodes.tableRow.createChecked({}, content);
                case 'TD':
                    var tdContent = schema.nodes.tableCell.validContent(content)
                        ? content
                        : ensureBlocks(content, schema);
                    return schema.nodes.tableCell.createChecked({}, tdContent);
                case 'TH':
                    var thContent = schema.nodes.tableHeader.validContent(content)
                        ? content
                        : ensureBlocks(content, schema);
                    return schema.nodes.tableHeader.createChecked({}, thContent);
            }
        }
    }
}
/*
 * Flattens DOM tree into single array
 */
export function bfsOrder(root) {
    var inqueue = [root];
    var outqueue = [];
    var elem;
    while ((elem = inqueue.shift())) {
        outqueue.push(elem);
        var childIndex = void 0;
        for (childIndex = 0; childIndex < elem.childNodes.length; childIndex++) {
            var child = elem.childNodes[childIndex];
            switch (child.nodeType) {
                case Node.ELEMENT_NODE:
                case Node.TEXT_NODE:
                    inqueue.push(child);
                    break;
                default:
                    // tslint:disable-next-line:no-console
                    console.error("Not pushing: " + child.nodeType + " " + child.nodeName);
            }
        }
    }
    outqueue.shift();
    return outqueue;
}
/**
 * Create a fragment by adding a set of marks to each node.
 */
function addMarks(fragment, marks) {
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
function getNodeName(node) {
    return node.nodeName.toUpperCase();
}
function isMedia(node) {
    if (node && node instanceof HTMLElement) {
        if (node.parentNode && getNodeName(node.parentNode) === 'P') {
            if (getNodeName(node) === 'SPAN') {
                return !!node.querySelector('a > jira-attachment-thumbnail > img[data-attachment-type="thumbnail"], ' +
                    'a[data-attachment-type="file"]');
            }
        }
    }
    return false;
}
function isMediaSingle(node) {
    if (isMedia(node)) {
        var dataNode = node.querySelector('[data-media-services-id]');
        if (dataNode instanceof HTMLElement) {
            var width = parseInt(dataNode.getAttribute('data-width') || '', 10);
            var height = parseInt(dataNode.getAttribute('data-height') || '', 10);
            if (node.parentNode.classList.contains('mediaSingle') &&
                width &&
                height) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=utils.js.map