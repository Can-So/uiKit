import * as tslib_1 from "tslib";
import { getEmojiAcName, hexToRgb, tableBackgroundColorPalette, calcTableColumnWidths, } from '@atlaskit/adf-schema';
import { timestampToIsoFormat } from '@atlaskit/editor-common';
import parseCxhtml from './parse-cxhtml';
import { AC_XMLNS, FAB_XMLNS, default as encodeCxhtml } from './encode-cxhtml';
import { mapCodeLanguage } from './languageMap';
import { getNodeMarkOfType, encodeMacroParams, mapPanelTypeToCxhtml, } from './utils';
export default function encode(node, schema) {
    var docType = document.implementation.createDocumentType('html', '-//W3C//DTD XHTML 1.0 Strict//EN', 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd');
    var doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', docType);
    return encodeCxhtml(encodeFragment(node.content));
    function encodeNode(node) {
        if (node.isText) {
            return encodeText(node);
        }
        else if (node.type === schema.nodes.blockquote) {
            return encodeBlockquote(node);
        }
        else if (node.type === schema.nodes.bulletList) {
            return encodeBulletList(node);
        }
        else if (node.type === schema.nodes.heading) {
            return encodeHeading(node);
        }
        else if (node.type === schema.nodes.confluenceJiraIssue) {
            return encodeJiraIssue(node);
        }
        else if (node.type === schema.nodes.rule) {
            return encodeHorizontalRule();
        }
        else if (node.type === schema.nodes.listItem) {
            return encodeListItem(node);
        }
        else if (node.type === schema.nodes.orderedList) {
            return encodeOrderedList(node);
        }
        else if (node.type === schema.nodes.paragraph) {
            return encodeParagraph(node);
        }
        else if (node.type === schema.nodes.hardBreak) {
            return encodeHardBreak();
        }
        else if (node.type === schema.nodes.codeBlock) {
            return encodeCodeBlock(node);
        }
        else if (node.type === schema.nodes.panel) {
            return encodePanel(node);
        }
        else if (node.type === schema.nodes.mention) {
            return encodeMention(node);
        }
        else if (node.type === schema.nodes.confluenceUnsupportedBlock ||
            node.type === schema.nodes.confluenceUnsupportedInline) {
            return encodeUnsupported(node);
        }
        else if (node.type === schema.nodes.mediaGroup) {
            return encodeMediaGroup(node);
        }
        else if (node.type === schema.nodes.mediaSingle) {
            return encodeMediaSingle(node);
        }
        else if (node.type === schema.nodes.media) {
            return encodeMedia(node);
        }
        else if (node.type === schema.nodes.table) {
            return encodeTable(node);
        }
        else if (node.type === schema.nodes.emoji) {
            return encodeEmoji(node);
        }
        else if (node.type === schema.nodes.taskList) {
            return encodeTaskList(node);
        }
        else if (node.type === schema.nodes.date) {
            return encodeDate(node);
        }
        else if (node.type === schema.nodes.placeholder) {
            return encodePlaceholder(node);
        }
        return encodeAsADF(node);
    }
    function encodeBlockquote(node) {
        var elem = doc.createElement('blockquote');
        elem.appendChild(encodeFragment(node.content));
        return elem;
    }
    function encodeFragment(fragment) {
        var documentFragment = doc.createDocumentFragment();
        fragment.forEach(function (node) {
            var domNode = encodeNode(node);
            if (domNode) {
                documentFragment.appendChild(domNode);
            }
        });
        return documentFragment;
    }
    function encodeEmoji(node) {
        var elem = doc.createElementNS(AC_XMLNS, 'ac:emoticon');
        var _a = node.attrs, id = _a.id, shortName = _a.shortName, text = _a.text;
        elem.setAttributeNS(AC_XMLNS, 'ac:name', getEmojiAcName({ id: id, shortName: shortName }));
        elem.setAttributeNS(AC_XMLNS, 'ac:emoji-id', id);
        elem.setAttributeNS(AC_XMLNS, 'ac:emoji-shortname', shortName);
        if (text) {
            elem.setAttributeNS(AC_XMLNS, 'ac:emoji-fallback', text);
        }
        return elem;
    }
    function encodeHeading(node) {
        var elem = doc.createElement("h" + node.attrs.level);
        elem.appendChild(encodeFragment(node.content));
        return elem;
    }
    function encodeParagraph(node) {
        var elem = doc.createElement('p');
        elem.appendChild(encodeFragment(node.content));
        return elem;
    }
    function encodeMediaGroup(node) {
        var elem = doc.createElementNS(FAB_XMLNS, 'fab:media-group');
        elem.appendChild(encodeFragment(node.content));
        return elem;
    }
    function encodeMediaSingle(node) {
        var elem = doc.createElementNS(FAB_XMLNS, 'fab:media-single');
        var attrs = node.attrs;
        elem.setAttribute('layout', attrs.layout);
        elem.appendChild(encodeFragment(node.content));
        return elem;
    }
    function encodeMedia(node) {
        var elem = doc.createElementNS(FAB_XMLNS, 'fab:media');
        var attrs = node.attrs;
        elem.setAttribute('media-id', attrs.id);
        elem.setAttribute('media-type', attrs.type);
        elem.setAttribute('media-collection', attrs.collection);
        if (attrs.width) {
            elem.setAttribute('width', "" + attrs.width);
        }
        if (attrs.height) {
            elem.setAttribute('height', "" + attrs.height);
        }
        if (attrs.__fileName) {
            elem.setAttribute('file-name', attrs.__fileName);
        }
        if (attrs.__fileSize) {
            elem.setAttribute('file-size', "" + attrs.__fileSize);
        }
        if (attrs.__fileMimeType) {
            elem.setAttribute('file-mime-type', attrs.__fileMimeType);
        }
        return elem;
    }
    function encodeTable(node) {
        var elem = doc.createElement('table');
        var colgroup = doc.createElement('colgroup');
        var tbody = doc.createElement('tbody');
        var isNumberColumnEnabled = node.attrs.isNumberColumnEnabled;
        var tableColumnWidths = calcTableColumnWidths(node);
        node.content.forEach(function (rowNode, _, i) {
            var rowElement = doc.createElement('tr');
            rowNode.content.forEach(function (colNode, _, j) {
                var _a = colNode.attrs, background = _a.background, rowspan = _a.rowspan, colspan = _a.colspan;
                var cellElement = colNode.type === schema.nodes.tableCell
                    ? doc.createElement('td')
                    : doc.createElement('th');
                if (isNumberColumnEnabled && j === 0) {
                    cellElement.className = 'numberingColumn';
                }
                if (background) {
                    cellElement.setAttribute('data-highlight-colour', (tableBackgroundColorPalette.get(background.toLowerCase()) ||
                        background).toLowerCase());
                }
                if (colspan && colspan !== 1) {
                    cellElement.setAttribute('colspan', colspan);
                }
                if (rowspan && rowspan !== 1) {
                    cellElement.setAttribute('rowspan', rowspan);
                }
                cellElement.appendChild(encodeFragment(colNode.content));
                rowElement.appendChild(cellElement);
            });
            tbody.appendChild(rowElement);
        });
        // now we have all the column widths, assign them to each <col> in the <colgroup>
        tableColumnWidths.forEach(function (colwidth, i) {
            var colInfoElement = document.createElement('col');
            if (colwidth) {
                colInfoElement.style.width = colwidth + 'px';
            }
            colgroup.appendChild(colInfoElement);
        });
        elem.appendChild(colgroup);
        elem.appendChild(tbody);
        var tableClasses = ['wrapped'];
        if (tableColumnWidths.length &&
            tableColumnWidths.every(function (width) { return width > 0; })) {
            tableClasses.push('fixed-table');
        }
        elem.setAttribute('class', tableClasses.join(' '));
        return elem;
    }
    function encodeText(node) {
        var e_1, _a, e_2, _b;
        if (node.text) {
            var root = doc.createDocumentFragment();
            var elem = root;
            // Group marks by type name so we can have better processing of duplicate types
            var groupedMarks_1 = {};
            node.marks.forEach(function (mark) {
                if (!groupedMarks_1[mark.type.name]) {
                    groupedMarks_1[mark.type.name] = [];
                }
                groupedMarks_1[mark.type.name].push(mark);
            }, {});
            try {
                for (var _c = tslib_1.__values(Object.keys(groupedMarks_1)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var type = _d.value;
                    var marks = groupedMarks_1[type];
                    switch (type) {
                        case 'strong':
                            elem = elem.appendChild(doc.createElement('strong'));
                            break;
                        case 'em':
                            elem = elem.appendChild(doc.createElement('em'));
                            break;
                        case 'strike':
                            elem = elem.appendChild(doc.createElement('s'));
                            break;
                        case 'underline':
                            elem = elem.appendChild(doc.createElement('u'));
                            break;
                        case 'subsup':
                            elem = elem.appendChild(doc.createElement(marks[0].attrs['type']));
                            break;
                        case 'code':
                            elem = elem.appendChild(doc.createElement('code'));
                            break;
                        case 'mentionQuery':
                            break;
                        case 'link':
                            var mark = getNodeMarkOfType(node, schema.marks.link);
                            if (mark && mark.attrs.__confluenceMetadata !== null) {
                                // need to use fab:adf to maintain confluenceMetadata
                                return encodeAsADF(node);
                            }
                            else {
                                elem = elem.appendChild(encodeLink(node));
                            }
                            break;
                        case 'confluenceInlineComment':
                            try {
                                // Because this function encodes marks into dom nodes inwards, multiple inline comment
                                // marks on the same PM node will be applied in reverse order. The code below compensates
                                // for that while retaining current behaviour.
                                for (var _e = tslib_1.__values(tslib_1.__spread(marks).reverse()), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var mark_1 = _f.value;
                                    elem = elem.appendChild(encodeConfluenceInlineComment(node, mark_1, schema));
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            break;
                        case 'textColor':
                            elem = elem.appendChild(encodeTextColor(node, schema));
                            break;
                        case 'emojiQuery':
                            elem.textContent = node.text;
                            break;
                        default:
                            throw new Error("Unable to encode mark '" + type + "'");
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            elem.textContent = node.text;
            return root;
        }
        else {
            return doc.createTextNode('');
        }
    }
    function encodeHardBreak() {
        return doc.createElement('br');
    }
    function encodeHorizontalRule() {
        return doc.createElement('hr');
    }
    function encodeBulletList(node) {
        var elem = doc.createElement('ul');
        elem.appendChild(encodeFragment(node.content));
        return elem;
    }
    function encodeOrderedList(node) {
        var elem = doc.createElement('ol');
        elem.appendChild(encodeFragment(node.content));
        return elem;
    }
    function encodeListItem(node) {
        var elem = doc.createElement('li');
        elem.appendChild(encodeFragment(node.content));
        return elem;
    }
    function encodeLink(node) {
        var link = doc.createElement('a');
        var mark = getNodeMarkOfType(node, schema.marks.link);
        link.href = mark ? mark.attrs.href : '';
        return link;
    }
    function encodeTextColor(node, schema) {
        var elem = doc.createElement('span');
        var mark = getNodeMarkOfType(node, schema.marks.textColor);
        var hexColor = mark ? mark.attrs.color : '';
        elem.style.color = hexToRgb(hexColor);
        return elem;
    }
    function encodeCodeBlock(node) {
        var elem = createMacroElement('code', '1');
        if (node.attrs.language) {
            elem.appendChild(encodeMacroParams(doc, {
                language: { value: mapCodeLanguage(node.attrs.language) },
            }));
        }
        var plainTextBody = doc.createElementNS(AC_XMLNS, 'ac:plain-text-body');
        var fragment = doc.createDocumentFragment();
        (node.textContent || '')
            .split(/]]>/g)
            .map(function (value, index, array) {
            var isFirst = index === 0;
            var isLast = index === array.length - 1;
            var prefix = isFirst ? '' : '>';
            var suffix = isLast ? '' : ']]';
            return doc.createCDATASection(prefix + value + suffix);
        })
            .forEach(function (cdata) { return fragment.appendChild(cdata); });
        plainTextBody.appendChild(fragment);
        elem.appendChild(plainTextBody);
        return elem;
    }
    function encodePanel(node) {
        var panelType = mapPanelTypeToCxhtml(node.attrs.panelType);
        var elem = createMacroElement(panelType, '1');
        var body = doc.createElementNS(AC_XMLNS, 'ac:rich-text-body');
        var fragment = doc.createDocumentFragment();
        node.descendants(function (node, pos) {
            // there is at least one top-level paragraph node in the panel body
            // all text nodes will be handled by "encodeNode"
            if (node.isBlock) {
                // panel title
                if (node.type.name === 'heading' && pos === 0) {
                    elem.appendChild(encodeMacroParams(doc, {
                        title: { value: node.firstChild.textContent },
                    }));
                }
                else {
                    // panel content
                    var domNode = encodeNode(node);
                    if (domNode) {
                        fragment.appendChild(domNode);
                    }
                }
            }
            return false;
        });
        // special treatment for <ac:structured-macro ac:name="panel" />
        // it should be converted to "purple" Confluence panel
        if (panelType === 'panel') {
            elem.appendChild(encodeMacroParams(doc, {
                borderColor: { value: '#998DD9' },
                bgColor: { value: '#EAE6FF' },
            }));
        }
        body.appendChild(fragment);
        elem.appendChild(body);
        return elem;
    }
    function encodeMention(node) {
        var link = doc.createElementNS(FAB_XMLNS, 'fab:link');
        var mention = doc.createElementNS(FAB_XMLNS, 'fab:mention');
        mention.setAttribute('atlassian-id', node.attrs['id']);
        // ED-3634: we're removing cdata completely
        link.appendChild(mention);
        return link;
    }
    function encodeUnsupported(node) {
        var domNode = parseCxhtml(node.attrs.cxhtml || '').querySelector('body')
            .firstChild;
        if (domNode) {
            return doc.importNode(domNode, true);
        }
    }
    function encodeJiraIssue(node) {
        var elem = createMacroElement('jira', node.attrs.schemaVersion);
        elem.setAttributeNS(AC_XMLNS, 'ac:macro-id', node.attrs.macroId);
        elem.appendChild(encodeMacroParams(doc, {
            key: { value: node.attrs.issueKey },
            server: { value: node.attrs.server },
            serverId: { value: node.attrs.serverId },
        }));
        return elem;
    }
    function createMacroElement(name, version) {
        var elem = doc.createElementNS(AC_XMLNS, 'ac:structured-macro');
        elem.setAttributeNS(AC_XMLNS, 'ac:name', name);
        elem.setAttributeNS(AC_XMLNS, 'ac:schema-version', version);
        return elem;
    }
    function encodeConfluenceInlineComment(node, mark, schema) {
        var marker = doc.createElementNS(AC_XMLNS, 'ac:inline-comment-marker');
        var reference = mark ? mark.attrs.reference : '';
        marker.setAttributeNS(AC_XMLNS, 'ac:ref', reference);
        return marker;
    }
    function encodeTaskList(node) {
        var elem = doc.createElementNS(AC_XMLNS, 'ac:task-list');
        node.descendants(function (item) {
            if (item.type === schema.nodes.taskItem) {
                var taskItem = doc.createElementNS(AC_XMLNS, 'ac:task');
                var id = doc.createElementNS(AC_XMLNS, 'ac:task-id');
                var status_1 = doc.createElementNS(AC_XMLNS, 'ac:task-status');
                id.textContent = item.attrs.localId;
                status_1.textContent =
                    item.attrs.state === 'DONE' ? 'complete' : 'incomplete';
                taskItem.appendChild(id);
                taskItem.appendChild(status_1);
                if (item.content.size) {
                    var body = doc.createElementNS(AC_XMLNS, 'ac:task-body');
                    var span = doc.createElement('span');
                    span.setAttribute('class', 'placeholder-inline-tasks');
                    span.appendChild(encodeFragment(item.content));
                    body.appendChild(span);
                    taskItem.appendChild(body);
                }
                elem.appendChild(taskItem);
            }
            return false;
        });
        return elem;
    }
    function encodeDate(node) {
        var elem = doc.createElement('time');
        var timestamp = node.attrs.timestamp;
        if (timestamp) {
            elem.setAttribute('datetime', timestampToIsoFormat(timestamp));
        }
        return elem;
    }
    function encodePlaceholder(node) {
        var elem = doc.createElementNS(AC_XMLNS, 'ac:placeholder');
        var text = node.attrs.text;
        elem.textContent = text;
        return elem;
    }
    function encodeAsADF(node) {
        var nsNode = doc.createElementNS(FAB_XMLNS, 'fab:adf');
        nsNode.appendChild(doc.createCDATASection(JSON.stringify(node.toJSON())));
        return nsNode;
    }
}
//# sourceMappingURL=encode.js.map