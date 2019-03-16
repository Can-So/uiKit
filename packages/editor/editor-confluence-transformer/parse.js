import { acNameToEmoji, acShortcutToEmoji, tableBackgroundColorNames, } from '@atlaskit/adf-schema';
import { akEditorFullPageMaxWidth, akEditorTableNumberColumnWidth, } from '@atlaskit/editor-common';
import { Fragment } from 'prosemirror-model';
import parseCxhtml from './parse-cxhtml';
import { AC_XMLNS, default as encodeCxhtml } from './encode-cxhtml';
import { findTraversalPath, getNodeName, addMarks, parseMacro, createCodeFragment, getAcTagNode, getMacroAttribute, getMacroParameters, hasClass, marksFromStyle, getContent, getExtensionMacroParams, mapPanelTypeToPm, calcPixelsFromCSSValue, } from './utils';
import { blockquoteContentWrapper, listContentWrapper, listItemContentWrapper, ensureInline, docContentWrapper, } from './content-wrapper';
var supportedSingleMediaLayouts = [
    'center',
    'wrap-left',
    'wrap-right',
    'wide',
    'full-width',
];
var convertedNodes = new WeakMap();
// This reverted mapping is used to map Unsupported Node back to it's original cxhtml
var convertedNodesReverted = new WeakMap();
export default function (cxhtml, schema) {
    var dom = parseCxhtml(cxhtml).querySelector('body');
    return schema.nodes.doc.createChecked({}, parseDomNode(schema, dom));
}
function parseDomNode(schema, dom) {
    var nodes = findTraversalPath(Array.prototype.slice.call(dom.childNodes, 0));
    // Process through nodes in reverse (so deepest child elements are first).
    for (var i = nodes.length - 1; i >= 0; i--) {
        var node = nodes[i];
        var content_1 = getContent(node, convertedNodes);
        var candidate = converter(schema, content_1, node);
        if (typeof candidate !== 'undefined' && candidate !== null) {
            convertedNodes.set(node, candidate);
            convertedNodesReverted.set(candidate, node);
        }
    }
    var content = getContent(dom, convertedNodes);
    var compatibleContent = content.childCount > 0
        ? // Dangling inline nodes can't be directly inserted into a document, so
            // we attempt to wrap in a paragraph.
            schema.nodes.doc.validContent(content)
                ? content
                : docContentWrapper(schema, content, convertedNodesReverted)
        : // The document must have at least one block element.
            schema.nodes.paragraph.createChecked({});
    return compatibleContent;
}
function converter(schema, content, node) {
    // text
    if (node.nodeType === Node.TEXT_NODE ||
        node.nodeType === Node.CDATA_SECTION_NODE) {
        var text = node.textContent;
        return text ? schema.text(text) : null;
    }
    // All unsupported content is wrapped in an `unsupportedInline` node. Wrapping
    // `unsupportedInline` inside `paragraph` where appropriate is handled when
    // the content is inserted into a parent.
    var unsupportedInline = schema.nodes.confluenceUnsupportedInline.createChecked({
        cxhtml: encodeCxhtml(node),
    });
    // marks and nodes
    if (node instanceof Element) {
        var tag = getNodeName(node);
        switch (tag) {
            // Marks
            case 'DEL':
            case 'S':
                return content
                    ? addMarks(content, [schema.marks.strike.create()])
                    : null;
            case 'B':
            case 'STRONG':
                return content
                    ? addMarks(content, [schema.marks.strong.create()])
                    : null;
            case 'I':
            case 'EM':
                return content ? addMarks(content, [schema.marks.em.create()]) : null;
            case 'CODE':
                return content ? addMarks(content, [schema.marks.code.create()]) : null;
            case 'SUB':
            case 'SUP':
                var type = tag === 'SUB' ? 'sub' : 'sup';
                return content
                    ? addMarks(content, [schema.marks.subsup.create({ type: type })])
                    : null;
            case 'U':
                return content
                    ? addMarks(content, [schema.marks.underline.create()])
                    : null;
            case 'A':
                var href = node.getAttribute('href');
                if (content) {
                    return href
                        ? addMarks(content, [schema.marks.link.create({ href: href })])
                        : content;
                }
                return null;
            // Nodes
            case 'BLOCKQUOTE':
                return schema.nodes.blockquote.createChecked({}, schema.nodes.blockquote.validContent(content)
                    ? content
                    : blockquoteContentWrapper(schema, content, convertedNodesReverted));
            case 'SPAN':
                return addMarks(content, marksFromStyle(schema, node.style));
            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':
                var level = Number(tag.charAt(1));
                var supportedMarks = [schema.marks.link].filter(function (mark) { return !!mark; });
                return schema.nodes.heading.createChecked({ level: level }, schema.nodes.heading.validContent(content)
                    ? content
                    : ensureInline(schema, content, convertedNodesReverted, 
                    // TODO: Fix any, potential issue. ED-5048
                    supportedMarks));
            case 'BR':
                return schema.nodes.hardBreak.createChecked();
            case 'HR':
                return schema.nodes.rule.createChecked();
            case 'UL':
                return schema.nodes.bulletList.createChecked({}, schema.nodes.bulletList.validContent(content)
                    ? content
                    : listContentWrapper(schema, content, convertedNodesReverted));
            case 'OL':
                return schema.nodes.orderedList.createChecked({}, schema.nodes.orderedList.validContent(content)
                    ? content
                    : listContentWrapper(schema, content, convertedNodesReverted));
            case 'LI':
                return schema.nodes.listItem.createChecked({}, schema.nodes.listItem.validContent(content)
                    ? content
                    : listItemContentWrapper(schema, content, convertedNodesReverted));
            case 'P':
                var textNodes_1 = [];
                if (!node.childNodes.length) {
                    return schema.nodes.paragraph.createChecked({}, content);
                }
                content.forEach(function (childNode) {
                    textNodes_1.push(childNode);
                });
                // combine remaining text nodes
                if (textNodes_1.length) {
                    return schema.nodes.paragraph.createChecked({}, ensureInline(schema, Fragment.fromArray(textNodes_1), convertedNodesReverted));
                }
                return null;
            case 'AC:HIPCHAT-EMOTICON':
            case 'AC:EMOTICON':
                var emoji = {
                    id: node.getAttribute('ac:emoji-id') || '',
                    shortName: node.getAttribute('ac:emoji-shortname') || '',
                    text: node.getAttribute('ac:emoji-fallback') || '',
                };
                if (!emoji.id) {
                    var acName = node.getAttribute('ac:name');
                    var acShortcut = node.getAttribute('ac:shortcut');
                    if (acName) {
                        emoji = acNameToEmoji(acName);
                    }
                    if (acShortcut) {
                        emoji = acShortcutToEmoji(acShortcut);
                    }
                }
                return schema.nodes.emoji.createChecked(emoji);
            case 'AC:STRUCTURED-MACRO':
                return convertConfluenceMacro(schema, node) || unsupportedInline;
            case 'FAB:LINK':
                if (node.firstChild &&
                    node.firstChild instanceof Element &&
                    getNodeName(node.firstChild) === 'FAB:MENTION') {
                    var cdata_1 = node.firstChild.firstChild;
                    return schema.nodes.mention.createChecked({
                        id: node.firstChild.getAttribute('atlassian-id'),
                        text: cdata_1.nodeValue,
                    });
                }
                break;
            case 'FAB:MENTION':
                var cdata = node.firstChild;
                return schema.nodes.mention.createChecked({
                    id: node.getAttribute('atlassian-id'),
                    text: cdata.nodeValue,
                });
            case 'FAB:MEDIA-GROUP':
                var mediaNodes_1 = [];
                if (!node.childNodes.length) {
                    throw new Error('<fab:media-group> must have at least one <fab:media> as child');
                }
                content.forEach(function (childNode) {
                    if (childNode.type === schema.nodes.media) {
                        mediaNodes_1.push(childNode);
                    }
                    else {
                        throw new Error('<fab:media-group> can only have <fab:media> as child');
                    }
                });
                if (mediaNodes_1.length) {
                    return schema.nodes.mediaGroup.createChecked({}, mediaNodes_1);
                }
                return null;
            case 'FAB:MEDIA-SINGLE':
                if (node.childNodes.length !== 1) {
                    throw new Error('<fab:media-single> must have only one <fab:media> as child');
                }
                var mediaNode = content.firstChild;
                if (!mediaNode || mediaNode.type !== schema.nodes.media) {
                    throw new Error('<fab:media-single> can only have <fab:media> as child');
                }
                var layout = node.getAttribute('layout') || '';
                var mediaSingleAttrs = {
                    layout: (supportedSingleMediaLayouts.indexOf(layout) > -1
                        ? layout
                        : 'center'),
                };
                return schema.nodes.mediaSingle.createChecked(mediaSingleAttrs, mediaNode);
            case 'FAB:MEDIA':
                var mediaAttrs = {
                    id: node.getAttribute('media-id') || '',
                    type: (node.getAttribute('media-type') || 'file'),
                    collection: node.getAttribute('media-collection') || '',
                };
                if (node.hasAttribute('width')) {
                    mediaAttrs.width = parseInt(node.getAttribute('width'), 10);
                }
                if (node.hasAttribute('height')) {
                    mediaAttrs.height = parseInt(node.getAttribute('height'), 10);
                }
                if (node.hasAttribute('file-name')) {
                    mediaAttrs.__fileName = node.getAttribute('file-name');
                }
                if (node.hasAttribute('file-size')) {
                    mediaAttrs.__fileSize = parseInt(node.getAttribute('file-size'), 10);
                }
                if (node.hasAttribute('file-mime-type')) {
                    mediaAttrs.__fileMimeType = node.getAttribute('file-mime-type');
                }
                return schema.nodes.media.createChecked(mediaAttrs);
            case 'AC:INLINE-COMMENT-MARKER':
                if (!content) {
                    return null;
                }
                var attrs = { reference: node.getAttribute('ac:ref') };
                return addMarks(content, [
                    schema.marks.confluenceInlineComment.create(attrs),
                ]);
            case 'AC:TASK-LIST':
                return convertTaskList(schema, node) || unsupportedInline;
            case 'AC:PLACEHOLDER':
                var text = node.textContent;
                if (text) {
                    return schema.nodes.placeholder.createChecked({ text: text });
                }
                return null;
            case 'FAB:ADF':
                return convertADF(schema, node) || unsupportedInline;
            case 'PRE':
                return schema.nodes.codeBlock.createChecked({ language: null }, schema.text(node.textContent || ''));
            case 'TABLE':
                if (hasClass(node, 'wysiwyg-macro')) {
                    return convertWYSIWYGMacro(schema, node) || unsupportedInline;
                }
                else {
                    return convertTable(schema, node);
                }
            case 'TIME':
                var dateStr = node.getAttribute('datetime');
                if (dateStr) {
                    var timestamp = Date.parse(dateStr);
                    return schema.nodes.date.createChecked({ timestamp: timestamp });
                }
                return unsupportedInline;
            case 'DIV':
                if (hasClass(node, 'codeHeader')) {
                    var codeHeader = schema.text(node.textContent || '', [
                        schema.marks.strong.create(),
                    ]);
                    var supportedMarks_1 = [schema.marks.link].filter(function (mark) { return !!mark; });
                    return schema.nodes.heading.createChecked({ level: 5 }, ensureInline(schema, Fragment.from(codeHeader), convertedNodesReverted, 
                    // TODO: Fix any, potential issue. ED-5048
                    supportedMarks_1));
                }
                else if (node.querySelector('.syntaxhighlighter')) {
                    var codeblockNode = node.querySelector('.syntaxhighlighter');
                    return (convertCodeFromView(schema, codeblockNode) ||
                        unsupportedInline);
                }
                else if (hasClass(node, 'preformatted')) {
                    return convertNoFormatFromView(schema, node) || unsupportedInline;
                }
                else if (hasClass(node, 'content-wrapper')) {
                    var content_2 = parseDomNode(schema, node).content;
                    return Fragment.from(content_2);
                }
                return unsupportedInline;
        }
    }
    return unsupportedInline;
}
function convertConfluenceMacro(schema, node) {
    var _a = parseMacro(node), macroName = _a.macroName, macroId = _a.macroId, params = _a.params, properties = _a.properties;
    var richBodyNode = getAcTagNode(node, 'ac:rich-text-body');
    var richTextBody = richBodyNode
        ? parseDomNode(schema, richBodyNode).content
        : null;
    var plainTextBody = properties['ac:plain-text-body'] || '';
    var schemaVersion = node.getAttributeNS(AC_XMLNS, 'schema-version');
    switch (macroName.toUpperCase()) {
        case 'CODE':
            var language = params.language, title = params.title;
            return createCodeFragment(schema, plainTextBody, language, title);
        case 'WARNING':
        case 'INFO':
        case 'NOTE':
        case 'TIP':
            var panelTitle = params.title;
            var panelBody = [];
            if (panelTitle) {
                panelBody.push(schema.nodes.heading.createChecked({ level: 3 }, schema.text(panelTitle)));
            }
            if (richTextBody) {
                panelBody = panelBody.concat(richTextBody);
            }
            else {
                panelBody.push(schema.nodes.paragraph.createChecked({}));
            }
            return schema.nodes.panel.createChecked({ panelType: mapPanelTypeToPm(macroName) }, 
            // TODO: Fix any, potential issue. ED-5048
            panelBody);
        case 'PANEL':
            return schema.nodes.panel.createChecked({ panelType: 'note' }, richTextBody || [schema.nodes.paragraph.createChecked()]);
        case 'JIRA':
            var server = params.server, serverId = params.serverId, issueKey = params.key;
            // if this is an issue list, render it as unsupported node
            // @see https://product-fabric.atlassian.net/browse/ED-1193?focusedCommentId=26672&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-26672
            if (!issueKey) {
                return schema.nodes.confluenceUnsupportedInline.createChecked({
                    cxhtml: encodeCxhtml(node),
                });
            }
            return schema.nodes.confluenceJiraIssue.createChecked({
                issueKey: issueKey,
                macroId: macroId,
                schemaVersion: schemaVersion,
                server: server,
                serverId: serverId,
            });
    }
    if (plainTextBody) {
        return schema.nodes.codeBlock.createChecked({ language: null }, schema.text(plainTextBody));
    }
    switch (properties['fab:display-type']) {
        case 'INLINE':
            return schema.nodes.inlineExtension.createChecked({
                extensionType: 'com.atlassian.confluence.macro.core',
                extensionKey: macroName,
                parameters: {
                    macroParams: getExtensionMacroParams(params),
                    macroMetadata: {
                        macroId: { value: macroId },
                        schemaVersion: { value: schemaVersion },
                        placeholder: [
                            {
                                data: { url: properties['fab:placeholder-url'] },
                                type: 'image',
                            },
                        ],
                    },
                },
            });
        case 'BLOCK':
            var attrs = {
                extensionType: 'com.atlassian.confluence.macro.core',
                extensionKey: macroName,
                parameters: {
                    macroParams: getExtensionMacroParams(params),
                    macroMetadata: {
                        macroId: { value: macroId },
                        schemaVersion: { value: schemaVersion },
                        placeholder: [
                            {
                                data: { url: properties['fab:placeholder-url'] },
                                type: 'image',
                            },
                        ],
                    },
                },
            };
            return richTextBody
                ? schema.nodes.bodiedExtension.createChecked(attrs, Fragment.from(richTextBody))
                : schema.nodes.extension.createChecked(attrs);
    }
    return null;
}
function convertWYSIWYGMacro(schema, node) {
    var name = getMacroAttribute(node, 'name').toUpperCase();
    switch (name) {
        case 'CODE':
        case 'NOFORMAT':
            var codeContent = node.querySelector('pre').textContent || ' ';
            var _a = getMacroParameters(node), language = _a.language, title = _a.title;
            return createCodeFragment(schema, codeContent, language, title);
    }
    return null;
}
function convertCodeFromView(schema, node) {
    var container = node.querySelector('.container');
    var content = '';
    if (container) {
        var childNodes = container.childNodes;
        for (var i = 0, len = childNodes.length; i < len; i++) {
            content += childNodes[i].textContent + (i === len - 1 ? '' : '\n');
        }
    }
    var language;
    if (node.className) {
        language = (node.className.match(/\w+$/) || [''])[0];
    }
    return createCodeFragment(schema, content, language);
}
function convertNoFormatFromView(schema, node) {
    var codeContent = node.querySelector('pre').textContent || ' ';
    return createCodeFragment(schema, codeContent);
}
var RELATIVE_TABLE_WIDTH = akEditorFullPageMaxWidth;
var NUMBER_COL_WIDTH = akEditorTableNumberColumnWidth;
function convertTable(schema, node) {
    var _a = schema.nodes, table = _a.table, tableRow = _a.tableRow, tableCell = _a.tableCell, tableHeader = _a.tableHeader;
    var rowNodes = [];
    var rows = node.querySelectorAll('tr');
    var colgroup = node.querySelector('colgroup');
    var columnInfos = colgroup ? colgroup.querySelectorAll('col') : [];
    var tableBaseWidth = calcPixelsFromCSSValue(node.style.width || '100%', RELATIVE_TABLE_WIDTH);
    var columnSizes = [];
    for (var i = 0, len = columnInfos.length; i < len; i++) {
        var columnInfo = columnInfos[i];
        if (columnInfo.style.width) {
            columnSizes.push(calcPixelsFromCSSValue(columnInfo.style.width, tableBaseWidth));
        }
        else {
            columnSizes.push(0);
        }
    }
    var isNumberColumnEnabled;
    for (var i = 0, rowsCount = rows.length; i < rowsCount; i++) {
        // skip nested tables from query selector
        if (rows[i].parentNode !== null) {
            var parent_1 = void 0;
            if (rows[i].parentNode.nodeName === 'tbody') {
                parent_1 = rows[i].parentNode.parentNode;
            }
            else {
                parent_1 = rows[i].parentNode;
            }
            if (parent_1 !== node) {
                continue;
            }
        }
        var cellNodes = [];
        var cols = rows[i].querySelectorAll('td,th');
        if (typeof isNumberColumnEnabled === 'undefined') {
            isNumberColumnEnabled = cols[0].classList.contains('numberingColumn');
        }
        if (isNumberColumnEnabled && columnSizes.length) {
            columnSizes[0] = NUMBER_COL_WIDTH;
        }
        var colwidthIdx = 0;
        for (var j = 0, colsCount = cols.length; j < colsCount; j++) {
            // skip nested tables from query selector
            if (cols[j].parentElement && cols[j].parentElement !== rows[i]) {
                continue;
            }
            var cell = cols[j].nodeName === 'td' ? tableCell : tableHeader;
            var pmNode = parseDomNode(schema, cols[j]);
            var colspan = parseInt(cols[j].getAttribute('colspan') || '1', 10);
            var background = cols[j].getAttribute('data-highlight-colour') || null;
            if (background) {
                // convert confluence color name to editor color
                background =
                    tableBackgroundColorNames.get(background.toLowerCase()) || background;
            }
            var colwidth = columnSizes.length
                ? columnSizes.slice(colwidthIdx, colwidthIdx + colspan)
                : null;
            var attrs = {
                colspan: colspan,
                colwidth: colwidth && colwidth.length && colwidth.every(function (width) { return width > 0; })
                    ? colwidth
                    : null,
                background: background,
                rowspan: parseInt(cols[j].getAttribute('rowspan') || '1', 10),
            };
            colwidthIdx += colspan;
            cellNodes.push(cell.createChecked(attrs, pmNode));
        }
        rowNodes.push(tableRow.createChecked(undefined, Fragment.from(cellNodes)));
    }
    return table.createChecked({
        isNumberColumnEnabled: isNumberColumnEnabled,
        __autoSize: columnSizes.length === 0 || columnSizes.every(function (width) { return width === 0; }),
    }, Fragment.from(rowNodes));
}
function convertTaskList(schema, node) {
    var nodes = [];
    for (var i = 0, count = node.childNodes.length; i < count; i++) {
        var child = node.childNodes[i];
        if (child.nodeName.toLowerCase() === 'ac:task') {
            nodes.push(convertTaskItem(schema, child));
        }
    }
    return nodes.length ? schema.nodes.taskList.createChecked({}, nodes) : null;
}
function convertTaskItem(schema, node) {
    var id = getAcTagNode(node, 'ac:task-id');
    var status = getAcTagNode(node, 'ac:task-status');
    var body = getAcTagNode(node, 'ac:task-body');
    var nodes = [];
    if (body) {
        var content = parseDomNode(schema, body).content;
        content.forEach(function (child) {
            child.descendants(function (node) {
                // only nested inline nodes are supported (for now)
                if (node.isInline) {
                    nodes.push(node);
                }
            });
        });
    }
    var attrs = {};
    if (id) {
        attrs['localId'] = id.textContent;
    }
    if (status) {
        attrs['state'] = status.textContent === 'complete' ? 'DONE' : 'TODO';
    }
    return schema.nodes.taskItem.createChecked(attrs, nodes);
}
function convertADF(schema, node) {
    var str = node.textContent || '';
    var json = JSON.parse(str);
    return schema.nodeFromJSON(json);
}
//# sourceMappingURL=parse.js.map