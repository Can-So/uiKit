import * as tslib_1 from "tslib";
import { Fragment, Node as PMNode } from 'prosemirror-model';
import parseHtml from './parse-html';
import fixDoc from './fix-doc';
import { bfsOrder, convert, ensureBlocks } from './utils';
import { isSchemaWithLists, isSchemaWithMentions, isSchemaWithEmojis, isSchemaWithCodeBlock, isSchemaWithBlockQuotes, isSchemaWithMedia, isSchemaWithTables, } from '@findable/adf-schema';
var JIRATransformer = /** @class */ (function () {
    function JIRATransformer(schema, customEncoders, mediaContextInfo) {
        this.schema = schema;
        this.customEncoders = customEncoders || {};
        this.mediaContextInfo = mediaContextInfo;
    }
    JIRATransformer.prototype.encode = function (node) {
        this.doc = this.makeDocument();
        this.doc.body.appendChild(this.encodeFragment(node.content));
        var html = this.doc.body.innerHTML;
        // JIRA encodes empty documents as an empty string
        if (html === '<p></p>') {
            return '';
        }
        // Normalise to XHTML style self closing tags.
        return html
            .replace(/<br><\/br>/g, '<br />')
            .replace(/<br>/g, '<br />')
            .replace(/<hr><\/hr>/g, '<hr />')
            .replace(/<hr>/g, '<hr />')
            .replace(/&amp;/g, '&');
    };
    JIRATransformer.prototype.parse = function (html) {
        var convertedNodes = new WeakMap();
        var dom = fixDoc(parseHtml(html)).querySelector('body');
        var nodes = bfsOrder(dom);
        // JIRA encodes empty content as a single nbsp
        if (nodes.length === 1 && nodes[0].textContent === '\xa0') {
            var schemaNodes = this.schema.nodes;
            return schemaNodes.doc.createChecked({}, schemaNodes.paragraph.createChecked());
        }
        // Process through nodes in reverse (so deepest child elements are first).
        for (var i = nodes.length - 1; i >= 0; i--) {
            var node = nodes[i];
            // for tables we take tbody content, because tbody is not in schema so the whole bfs thing wouldn't work
            var targetNode = node.tagName && node.tagName.toUpperCase() === 'TABLE'
                ? node.firstChild
                : node;
            var content_1 = this.getContent(targetNode, convertedNodes);
            var candidate = convert(content_1, node, this.schema);
            if (typeof candidate !== 'undefined') {
                convertedNodes.set(node, candidate);
            }
        }
        var content = this.getContent(dom, convertedNodes);
        // Dangling inline nodes can't be directly inserted into a document, so
        // we attempt to wrap in a paragraph.
        var compatibleContent = this.schema.nodes.doc.validContent(content)
            ? content
            : ensureBlocks(content, this.schema);
        return this.schema.nodes.doc.createChecked({}, compatibleContent);
    };
    /*
     * Contructs a struct string of replacement blocks and marks for a given node
     */
    JIRATransformer.prototype.getContent = function (node, convertedNodes) {
        var fragment = Fragment.fromArray([]);
        var childIndex;
        for (childIndex = 0; childIndex < node.childNodes.length; childIndex++) {
            var child = node.childNodes[childIndex];
            var thing = convertedNodes.get(child);
            if (thing instanceof Fragment || thing instanceof PMNode) {
                fragment = fragment.append(Fragment.from(thing));
            }
        }
        return fragment;
    };
    JIRATransformer.prototype.encodeNode = function (node) {
        var _a = this.schema.nodes, blockquote = _a.blockquote, bulletList = _a.bulletList, codeBlock = _a.codeBlock, hardBreak = _a.hardBreak, heading = _a.heading, listItem = _a.listItem, mention = _a.mention, emoji = _a.emoji, orderedList = _a.orderedList, paragraph = _a.paragraph, rule = _a.rule, mediaGroup = _a.mediaGroup, mediaSingle = _a.mediaSingle, media = _a.media, table = _a.table;
        if (node.isText) {
            return this.encodeText(node);
        }
        else if (node.type === heading) {
            return this.encodeHeading(node);
        }
        else if (node.type === rule) {
            return this.encodeHorizontalRule();
        }
        else if (node.type === paragraph) {
            return this.encodeParagraph(node);
        }
        else if (node.type === hardBreak) {
            return this.encodeHardBreak();
        }
        if (isSchemaWithLists(this.schema)) {
            if (node.type === bulletList) {
                return this.encodeBulletList(node);
            }
            else if (node.type === orderedList) {
                return this.encodeOrderedList(node);
            }
            else if (node.type === listItem) {
                return this.encodeListItem(node);
            }
        }
        if (isSchemaWithMentions(this.schema) && node.type === mention) {
            return this.encodeMention(node, this.customEncoders.mention);
        }
        if (isSchemaWithEmojis(this.schema) && node.type === emoji) {
            return this.encodeEmoji(node);
        }
        if (isSchemaWithCodeBlock(this.schema) && node.type === codeBlock) {
            return this.encodeCodeBlock(node);
        }
        if (isSchemaWithBlockQuotes(this.schema) && node.type === blockquote) {
            return this.encodeBlockQuote(node);
        }
        if (isSchemaWithMedia(this.schema)) {
            if (node.type === mediaGroup) {
                return this.encodeMediaGroup(node);
            }
            else if (node.type === mediaSingle) {
                return this.encodeMediaSingle(node);
            }
            else if (node.type === media) {
                return this.encodeMedia(node);
            }
        }
        if (isSchemaWithTables(this.schema) && node.type === table) {
            return this.encodeTable(node);
        }
        throw new Error("Unexpected node '" + node.type.name + "' for HTML encoding");
    };
    JIRATransformer.prototype.makeDocument = function () {
        var doc = document.implementation.createHTMLDocument('');
        doc.body = doc.createElement('body');
        doc.documentElement.appendChild(doc.body);
        return doc;
    };
    JIRATransformer.prototype.encodeFragment = function (fragment) {
        var _this = this;
        var documentFragment = this.doc.createDocumentFragment();
        fragment.forEach(function (node) {
            return documentFragment.appendChild(_this.encodeNode(node));
        });
        return documentFragment;
    };
    JIRATransformer.prototype.encodeHeading = function (node) {
        function anchorNameEncode(name) {
            var noSpaces = name.replace(/ /g, '');
            var uriEncoded = encodeURIComponent(noSpaces);
            var specialsEncoded = uriEncoded.replace(/[!'()*]/g, function (c) { return '%' + c.charCodeAt(0).toString(16); });
            return specialsEncoded;
        }
        var level = node.attrs.level;
        // @see ED-4708
        var elem = this.doc.createElement("h" + (level === 6 ? 5 : level));
        var anchor = this.doc.createElement('a');
        anchor.setAttribute('name', anchorNameEncode(node.textContent));
        elem.appendChild(anchor);
        elem.appendChild(this.encodeFragment(node.content));
        return elem;
    };
    JIRATransformer.prototype.encodeParagraph = function (node) {
        var elem = this.doc.createElement('p');
        elem.appendChild(this.encodeFragment(node.content));
        return elem;
    };
    JIRATransformer.prototype.encodeText = function (node) {
        var e_1, _a;
        if (node.text) {
            var root = this.doc.createDocumentFragment();
            var elem = root;
            var _b = this.schema.marks, code = _b.code, em = _b.em, link = _b.link, typeAheadQuery = _b.typeAheadQuery, strike = _b.strike, strong = _b.strong, subsup = _b.subsup, underline = _b.underline, textColor = _b.textColor;
            try {
                for (var _c = tslib_1.__values(node.marks), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var mark = _d.value;
                    switch (mark.type) {
                        case strong:
                            elem = elem.appendChild(this.doc.createElement('b'));
                            break;
                        case em:
                            elem = elem.appendChild(this.doc.createElement('em'));
                            break;
                        case code:
                            elem = elem.appendChild(this.doc.createElement('tt'));
                            break;
                        case strike:
                            elem = elem.appendChild(this.doc.createElement('del'));
                            break;
                        case underline:
                            elem = elem.appendChild(this.doc.createElement('ins'));
                            break;
                        case subsup:
                            elem = elem.appendChild(this.doc.createElement(mark.attrs['type']));
                            break;
                        case link:
                            var linkElem = this.doc.createElement('a');
                            var href = mark.attrs['href'];
                            /** JIRA always expects external-link attribute set on links created via editor unless its #fragment */
                            if (!href.match(/^#/)) {
                                linkElem.setAttribute('class', 'external-link');
                                linkElem.setAttribute('rel', 'nofollow');
                            }
                            linkElem.setAttribute('href', href);
                            if (mark.attrs['title']) {
                                linkElem.setAttribute('title', mark.attrs['title']);
                            }
                            elem = elem.appendChild(linkElem);
                            break;
                        case textColor:
                            var fontElem = this.doc.createElement('font');
                            fontElem.setAttribute('color', mark.attrs['color']);
                            elem = elem.appendChild(fontElem);
                            break;
                        case typeAheadQuery:
                            break;
                        default:
                            throw new Error("Unable to encode mark '" + mark.type.name + "'");
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
            return this.doc.createTextNode('');
        }
    };
    JIRATransformer.prototype.encodeHardBreak = function () {
        return this.doc.createElement('br');
    };
    JIRATransformer.prototype.encodeHorizontalRule = function () {
        return this.doc.createElement('hr');
    };
    JIRATransformer.prototype.encodeBulletList = function (node) {
        var elem = this.doc.createElement('ul');
        elem.setAttribute('class', 'alternate');
        elem.setAttribute('type', 'disc');
        elem.appendChild(this.encodeFragment(node.content));
        for (var index = 0; index < elem.childElementCount; index++) {
            elem.children[index].setAttribute('data-parent', 'ul');
        }
        return elem;
    };
    JIRATransformer.prototype.encodeOrderedList = function (node) {
        var elem = this.doc.createElement('ol');
        elem.appendChild(this.encodeFragment(node.content));
        for (var index = 0; index < elem.childElementCount; index++) {
            elem.children[index].setAttribute('data-parent', 'ol');
        }
        return elem;
    };
    JIRATransformer.prototype.encodeListItem = function (node) {
        var _this = this;
        var elem = this.doc.createElement('li');
        if (node.content.childCount) {
            var hasBlocks_1 = false;
            node.content.forEach(function (childNode) {
                if (childNode.type === _this.schema.nodes.bulletList ||
                    childNode.type === _this.schema.nodes.orderedList) {
                    var list = _this.encodeNode(childNode);
                    /**
                     * Changing type for nested list:
                     *
                     * Second level -> circle
                     * Third and deeper -> square
                     */
                    if (list instanceof HTMLElement && list.tagName === 'UL') {
                        list.setAttribute('type', 'circle');
                        [].forEach.call(list.querySelectorAll('ul'), function (ul) {
                            ul.setAttribute('type', 'square');
                        });
                    }
                    elem.appendChild(list);
                }
                else if (childNode.type.name === 'paragraph' && !hasBlocks_1) {
                    // Strip the paragraph node from the list item.
                    elem.appendChild(_this.encodeFragment(childNode.content));
                }
                else {
                    if (childNode.isBlock) {
                        hasBlocks_1 = true;
                    }
                    elem.appendChild(_this.encodeNode(childNode));
                }
            });
        }
        return elem;
    };
    JIRATransformer.prototype.encodeMention = function (node, encoder) {
        var elem = this.doc.createElement('a');
        elem.setAttribute('class', 'user-hover');
        elem.setAttribute('href', encoder ? encoder(node.attrs.id) : node.attrs.id);
        elem.setAttribute('rel', node.attrs.id);
        elem.appendChild(this.doc.createTextNode(node.attrs.text));
        return elem;
    };
    JIRATransformer.prototype.encodeEmoji = function (node) {
        return this.doc.createTextNode(node.attrs && node.attrs.text);
    };
    JIRATransformer.prototype.encodeCodeBlock = function (node) {
        var elem = this.doc.createElement('div');
        elem.setAttribute('class', 'code panel');
        var content = this.doc.createElement('div');
        content.setAttribute('class', 'codeContent panelContent');
        var pre = this.doc.createElement('pre');
        // java is default language for JIRA
        pre.setAttribute('class', "code-" + (node.attrs.language || 'plain').toLocaleLowerCase());
        pre.appendChild(this.encodeFragment(node.content));
        content.appendChild(pre);
        elem.appendChild(content);
        return elem;
    };
    JIRATransformer.prototype.encodeBlockQuote = function (node) {
        var elem = this.doc.createElement('blockquote');
        elem.appendChild(this.encodeFragment(node.content));
        return elem;
    };
    JIRATransformer.prototype.encodeMediaGroup = function (node) {
        var elem = this.doc.createElement('p');
        elem.setAttribute('class', 'mediaGroup');
        elem.appendChild(this.encodeFragment(node.content));
        return elem;
    };
    JIRATransformer.prototype.encodeMediaSingle = function (node) {
        var elem = this.doc.createElement('p');
        elem.setAttribute('class', 'mediaSingle');
        elem.appendChild(this.encodeFragment(node.content));
        return elem;
    };
    JIRATransformer.prototype.addDataToNode = function (domNode, mediaNode, defaultDisplayType) {
        if (defaultDisplayType === void 0) { defaultDisplayType = 'thumbnail'; }
        var _a = mediaNode.attrs, id = _a.id, type = _a.type, collection = _a.collection, __fileName = _a.__fileName, __displayType = _a.__displayType, width = _a.width, height = _a.height;
        // Order of dataset matters in IE Edge, please keep the current order
        domNode.setAttribute('data-attachment-type', __displayType || defaultDisplayType);
        if (__fileName) {
            domNode.setAttribute('data-attachment-name', __fileName);
        }
        if (width) {
            domNode.setAttribute('data-width', width);
        }
        if (height) {
            domNode.setAttribute('data-height', height);
        }
        domNode.setAttribute('data-media-services-type', type);
        domNode.setAttribute('data-media-services-id', id);
        if (collection) {
            domNode.setAttribute('data-media-services-collection', collection);
        }
    };
    JIRATransformer.prototype.buildURLWithContextInfo = function (fileId, contextInfo) {
        var clientId = contextInfo.clientId, baseUrl = contextInfo.baseUrl, token = contextInfo.token, collection = contextInfo.collection;
        return baseUrl + "/file/" + fileId + "/image?token=" + token + "&client=" + clientId + "&collection=" + collection + "&width=200&height=200&mode=fit";
    };
    JIRATransformer.prototype.isImageMimeType = function (mimeType) {
        return mimeType && mimeType.indexOf('image/') > -1;
    };
    JIRATransformer.prototype.encodeMedia = function (node) {
        // span.image-wrap > a > jira-attachment-thumbnail > img[data-media-*] > content
        // span.no-br > a[data-media] > content
        var elem = this.doc.createElement('span');
        var a = this.doc.createElement('a');
        if (node.attrs.__displayType === 'file' ||
            !(node.attrs.__displayType ||
                this.isImageMimeType(node.attrs.__fileMimeType))) {
            elem.setAttribute('class', 'nobr');
            this.addDataToNode(a, node, 'file');
            a.textContent = node.attrs.__fileName || '';
        }
        else {
            elem.setAttribute('class', 'image-wrap');
            var img = this.doc.createElement('img');
            img.setAttribute('alt', node.attrs.__fileName);
            // Newly uploaded items have collection
            if (node.attrs.collection &&
                this.mediaContextInfo &&
                this.mediaContextInfo.uploadContext) {
                img.setAttribute('src', this.buildURLWithContextInfo(node.attrs.id, this.mediaContextInfo.uploadContext));
            }
            else if (this.mediaContextInfo && this.mediaContextInfo.viewContext) {
                img.setAttribute('src', this.buildURLWithContextInfo(node.attrs.id, this.mediaContextInfo.viewContext));
            }
            this.addDataToNode(img, node);
            var jiraThumb = this.doc.createElement('jira-attachment-thumbnail');
            jiraThumb.appendChild(img);
            a.appendChild(jiraThumb);
        }
        elem.appendChild(a);
        return elem;
    };
    JIRATransformer.prototype.encodeTable = function (node) {
        var _this = this;
        var elem = this.doc.createElement('table');
        var tbody = this.doc.createElement('tbody');
        node.descendants(function (rowNode) {
            var rowElement = _this.doc.createElement('tr');
            rowNode.descendants(function (colNode) {
                var cellType = colNode.type === _this.schema.nodes.tableCell ? 'd' : 'h';
                var cellElement = _this.doc.createElement("t" + cellType);
                cellElement.setAttribute('class', "confluenceT" + cellType);
                cellElement.appendChild(_this.encodeFragment(colNode.content));
                rowElement.appendChild(cellElement);
                return false;
            });
            tbody.appendChild(rowElement);
            return false;
        });
        elem.appendChild(tbody);
        elem.setAttribute('class', 'confluenceTable');
        return elem;
    };
    return JIRATransformer;
}());
export { JIRATransformer };
//# sourceMappingURL=index.js.map