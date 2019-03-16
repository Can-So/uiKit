import { DecorationSet, Decoration } from 'prosemirror-view';
import { PluginKey, Plugin } from 'prosemirror-state';
import { ZWSP } from '../../../utils';
export var inlineCursorTargetStateKey = new PluginKey('inlineCursorTargetPlugin');
export var SPECIAL_NODES = ['mention', 'emoji'];
export var isSpecial = function (node) {
    return node && SPECIAL_NODES.indexOf(node.type.name) !== -1;
};
export var findSpecialNodeAfter = function ($pos, tr) {
    if (isSpecial($pos.nodeAfter)) {
        return $pos.pos + 1;
    }
    var parentOffset = $pos.parentOffset, parent = $pos.parent;
    var docSize = tr.doc.nodeSize - 2;
    if (parentOffset === parent.content.size && $pos.pos + 1 < docSize - 2) {
        var nodeAfter = tr.doc.resolve($pos.pos + 1).nodeAfter;
        if (nodeAfter && isSpecial(nodeAfter.firstChild)) {
            return $pos.pos + 2;
        }
    }
};
export var findSpecialNodeBefore = function ($pos, tr) {
    if (isSpecial($pos.nodeBefore)) {
        return $pos.pos - 1;
    }
    if ($pos.pos === 0) {
        return;
    }
    var parentOffset = $pos.parentOffset;
    if (parentOffset === 0) {
        var nodeBefore = tr.doc.resolve($pos.pos - 1).nodeBefore;
        if (nodeBefore && isSpecial(nodeBefore.firstChild)) {
            return $pos.pos - 2;
        }
    }
};
export default (function () {
    return new Plugin({
        key: inlineCursorTargetStateKey,
        state: {
            init: function () { return ({ positions: [] }); },
            apply: function (tr) {
                var selection = tr.selection;
                var $from = selection.$from;
                var positions = [];
                var posAfter = findSpecialNodeAfter($from, tr);
                var posBefore = findSpecialNodeBefore($from, tr);
                if (posAfter !== undefined) {
                    positions.push(posAfter);
                }
                if (posBefore !== undefined) {
                    positions.push(posBefore);
                }
                return { positions: positions };
            },
        },
        props: {
            decorations: function (state) {
                var doc = state.doc;
                var positions = inlineCursorTargetStateKey.getState(state).positions;
                if (positions && positions.length) {
                    var decorations = positions.map(function (position) {
                        var node = document.createElement('span');
                        node.appendChild(document.createTextNode(ZWSP));
                        return Decoration.widget(position, node, {
                            raw: true,
                            side: -1,
                        });
                    });
                    return DecorationSet.create(doc, decorations);
                }
                return null;
            },
        },
    });
});
//# sourceMappingURL=inline-cursor-target.js.map