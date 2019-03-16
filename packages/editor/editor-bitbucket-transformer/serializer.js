import * as tslib_1 from "tslib";
import { MarkdownSerializer as PMMarkdownSerializer, MarkdownSerializerState as PMMarkdownSerializerState, } from 'prosemirror-markdown';
import { escapeMarkdown, stringRepeat } from './util';
import tableNodes from './tableSerializer';
/**
 * Look for series of backticks in a string, find length of the longest one, then
 * generate a backtick chain of a length longer by one. This is the only proven way
 * to escape backticks inside code block and inline code (for python-markdown)
 */
var generateOuterBacktickChain = (function () {
    function getMaxLength(text) {
        return (text.match(/`+/g) || []).reduce(function (prev, val) { return (val.length > prev.length ? val : prev); }, '').length;
    }
    return function (text, minLength) {
        if (minLength === void 0) { minLength = 1; }
        var length = Math.max(minLength, getMaxLength(text) + 1);
        return stringRepeat('`', length);
    };
})();
var MarkdownSerializerState = /** @class */ (function (_super) {
    tslib_1.__extends(MarkdownSerializerState, _super);
    function MarkdownSerializerState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.context = { insideTable: false };
        return _this;
    }
    MarkdownSerializerState.prototype.renderContent = function (parent) {
        var _this = this;
        parent.forEach(function (child, offset, index) {
            if (
            // If child is an empty Textblock we need to insert a zwnj-character in order to preserve that line in markdown
            child.isTextblock &&
                !child.textContent &&
                // If child is a Codeblock we need to handle this separately as we want to preserve empty code blocks
                !(child.type.name === 'codeBlock') &&
                !(child.content && child.content.size > 0)) {
                return nodes.empty_line(_this, child);
            }
            return _this.render(child, parent, index);
        });
    };
    /**
     * This method override will properly escape backticks in text nodes with "code" mark enabled.
     * Bitbucket uses python-markdown which does not honor escaped backtick escape sequences \`
     * inside a backtick fence.
     *
     * @see node_modules/prosemirror-markdown/src/to_markdown.js
     * @see MarkdownSerializerState.renderInline()
     */
    MarkdownSerializerState.prototype.renderInline = function (parent) {
        var _this = this;
        var active = [];
        var trailing = '';
        var progress = function (node, _, index) {
            var marks = node
                ? node.marks.filter(function (mark) { return _this.marks[mark.type.name]; })
                : [];
            var leading = trailing;
            trailing = '';
            // If whitespace has to be expelled from the node, adjust
            // leading and trailing accordingly.
            if (node &&
                node.isText &&
                marks.some(function (mark) {
                    var info = _this.marks[mark.type.name];
                    return info && info.expelEnclosingWhitespace;
                })) {
                var _a = tslib_1.__read(/^(\s*)(.*?)(\s*)$/m.exec(node.text), 4), lead = _a[1], inner = _a[2], trail = _a[3];
                leading += lead;
                trailing = trail;
                if (lead || trail) {
                    node = inner ? node.withText(inner) : null;
                    if (!node) {
                        marks = active;
                    }
                }
            }
            var code = marks.length &&
                marks[marks.length - 1].type.name === 'code' &&
                marks[marks.length - 1];
            var len = marks.length - (code ? 1 : 0);
            // Try to reorder 'mixable' marks, such as em and strong, which
            // in Markdown may be opened and closed in different order, so
            // that order of the marks for the token matches the order in
            // active.
            outer: for (var i = 0; i < len; i++) {
                var mark = marks[i];
                if (!_this.marks[mark.type.name].mixable) {
                    break;
                }
                for (var j = 0; j < active.length; j++) {
                    var other = active[j];
                    if (!_this.marks[other.type.name].mixable) {
                        break;
                    }
                    if (mark.eq(other)) {
                        if (i > j) {
                            marks = marks
                                .slice(0, j)
                                .concat(mark)
                                .concat(marks.slice(j, i))
                                .concat(marks.slice(i + 1, len));
                        }
                        else if (j > i) {
                            marks = marks
                                .slice(0, i)
                                .concat(marks.slice(i + 1, j))
                                .concat(mark)
                                .concat(marks.slice(j, len));
                        }
                        continue outer;
                    }
                }
            }
            // Find the prefix of the mark set that didn't change
            var keep = 0;
            while (keep < Math.min(active.length, len) &&
                marks[keep].eq(active[keep])) {
                ++keep;
            }
            // Close the marks that need to be closed
            while (keep < active.length) {
                _this.text(_this.markString(active.pop(), false), false);
            }
            // Output any previously expelled trailing whitespace outside the marks
            if (leading) {
                _this.text(leading);
            }
            // Open the marks that need to be opened
            while (active.length < len) {
                var add = marks[active.length];
                active.push(add);
                _this.text(_this.markString(add, true), false);
            }
            if (node) {
                if (!code || !node.isText) {
                    _this.render(node, parent, index);
                }
                else if (node.text) {
                    // Generate valid monospace, fenced with series of backticks longer that backtick series inside it.
                    var text = node.text;
                    var backticks = generateOuterBacktickChain(node.text, 1);
                    // Make sure there is a space between fences, otherwise python-markdown renderer will get confused
                    if (text.match(/^`/)) {
                        text = ' ' + text;
                    }
                    if (text.match(/`$/)) {
                        text += ' ';
                    }
                    _this.text(backticks + text + backticks, false);
                }
            }
        };
        parent.forEach(function (child, offset, index) {
            progress(child, parent, index);
        });
        progress(null);
    };
    return MarkdownSerializerState;
}(PMMarkdownSerializerState));
export { MarkdownSerializerState };
var MarkdownSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(MarkdownSerializer, _super);
    function MarkdownSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkdownSerializer.prototype.serialize = function (content, options) {
        var state = new MarkdownSerializerState(this.nodes, this.marks, options || {});
        state.renderContent(content);
        return state.out === '\u200c' ? '' : state.out; // Return empty string if editor only contains a zero-non-width character
    };
    return MarkdownSerializer;
}(PMMarkdownSerializer));
export { MarkdownSerializer };
var editorNodes = {
    blockquote: function (state, node, parent, index) {
        state.wrapBlock('> ', undefined, node, function () { return state.renderContent(node); });
    },
    codeBlock: function (state, node, parent, index) {
        var backticks = generateOuterBacktickChain(node.textContent, 3);
        state.write(backticks + (node.attrs.language || '') + '\n');
        state.text(node.textContent ? node.textContent : '\u200c', false);
        state.ensureNewLine();
        state.write(backticks);
        state.closeBlock(node);
    },
    heading: function (state, node, parent, index) {
        state.write(state.repeat('#', node.attrs.level) + ' ');
        state.renderInline(node);
        state.closeBlock(node);
    },
    rule: function (state, node) {
        state.write(node.attrs.markup || '---');
        state.closeBlock(node);
    },
    bulletList: function (state, node, parent, index) {
        for (var i = 0; i < node.childCount; i++) {
            var child = node.child(i);
            state.render(child, node, i);
        }
    },
    orderedList: function (state, node, parent, index) {
        for (var i = 0; i < node.childCount; i++) {
            var child = node.child(i);
            state.render(child, node, i);
        }
    },
    listItem: function (state, node, parent, index) {
        var delimiter = parent.type.name === 'bulletList' ? '* ' : index + 1 + ". ";
        var _loop_1 = function (i) {
            var child = node.child(i);
            if (i > 0) {
                state.write('\n');
            }
            if (i === 0) {
                state.wrapBlock('  ', delimiter, node, function () {
                    return state.render(child, parent, i);
                });
            }
            else {
                state.wrapBlock('    ', undefined, node, function () {
                    return state.render(child, parent, i);
                });
            }
            if (child.type.name === 'paragraph' && i > 0) {
                state.write('\n');
            }
            state.flushClose(1);
        };
        for (var i = 0; i < node.childCount; i++) {
            _loop_1(i);
        }
        if (index === parent.childCount - 1) {
            state.write('\n');
        }
    },
    paragraph: function (state, node, parent, index) {
        state.renderInline(node);
        state.closeBlock(node);
    },
    mediaGroup: function (state, node) {
        for (var i = 0; i < node.childCount; i++) {
            var child = node.child(i);
            state.render(child, node, i);
        }
    },
    mediaSingle: function (state, node, parent) {
        for (var i = 0; i < node.childCount; i++) {
            var child = node.child(i);
            state.render(child, node, i);
            if (!parent.type.name.startsWith('table')) {
                state.write('\n');
            }
        }
    },
    media: function (state, node) {
        state.write('![](' + node.attrs.url + ')');
    },
    image: function (state, node) {
        // Note: the 'title' is not escaped in this flavor of markdown.
        state.write('![' +
            escapeMarkdown(node.attrs.alt) +
            '](' +
            node.attrs.src +
            (node.attrs.title ? " '" + escapeMarkdown(node.attrs.title) + "'" : '') +
            ')');
    },
    hardBreak: function (state) {
        state.write('  \n');
    },
    text: function (state, node, parent, index) {
        var previousNode = index === 0 ? null : parent.child(index - 1);
        var text = node.textContent;
        // BB converts 4 spaces at the beginning of the line to code block
        // that's why we escape 4 spaces with zero-width-non-joiner
        var fourSpaces = '    ';
        if (!previousNode && /^\s{4}/.test(node.textContent)) {
            text = node.textContent.replace(fourSpaces, '\u200c' + fourSpaces);
        }
        var lines = text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var startOfLine = state.atBlank() || !!state.closed;
            state.write();
            state.out += escapeMarkdown(lines[i], startOfLine, state.context.insideTable);
            if (i !== lines.length - 1) {
                if (lines[i] &&
                    lines[i].length &&
                    lines[i + 1] &&
                    lines[i + 1].length) {
                    state.out += '  ';
                }
                state.out += '\n';
            }
        }
    },
    empty_line: function (state, node) {
        state.write('\u200c'); // zero-width-non-joiner
        state.closeBlock(node);
    },
    mention: function (state, node, parent, index) {
        var isLastNode = parent.childCount === index + 1;
        var delimiter = '';
        if (!isLastNode) {
            var nextNode = parent.child(index + 1);
            var nextNodeHasLeadingSpace = nextNode.textContent.indexOf(' ') === 0;
            delimiter = nextNodeHasLeadingSpace ? '' : ' ';
        }
        state.write("@" + node.attrs.id + delimiter);
    },
    emoji: function (state, node, parent, index) {
        state.write(node.attrs.shortName);
    },
};
export var nodes = tslib_1.__assign({}, editorNodes, tableNodes);
export var marks = {
    em: { open: '_', close: '_', mixable: true, expelEnclosingWhitespace: true },
    strong: {
        open: '**',
        close: '**',
        mixable: true,
        expelEnclosingWhitespace: true,
    },
    strike: {
        open: '~~',
        close: '~~',
        mixable: true,
        expelEnclosingWhitespace: true,
    },
    link: {
        open: '[',
        close: function (state, mark) {
            return '](' + mark.attrs['href'] + ')';
        },
    },
    code: { open: '`', close: '`' },
    mentionQuery: { open: '', close: '', mixable: false },
    emojiQuery: { open: '', close: '', mixable: false },
};
//# sourceMappingURL=serializer.js.map