import * as tslib_1 from "tslib";
import { Plugin } from 'prosemirror-state';
import { findChildrenByMark } from 'prosemirror-utils';
import { normalizeUrl } from '../utils';
var isHrefAndTextEqual = function (node) {
    var mark = node.type.schema.marks.link.isInSet(node.marks);
    return mark ? mark.attrs.href === normalizeUrl(node.text) : false;
};
var isInsideLinkMark = function (node) {
    return !!(node && node.type.schema.marks.link.isInSet(node.marks));
};
// Given the position of a link in an old document, apply the
// transactions to determine the new position of this link.
// If the link was deleted during any transactions, return null
var getLinkPosAfterTransactions = function (pos, txns) {
    var e_1, _a;
    var trPos = pos;
    try {
        for (var txns_1 = tslib_1.__values(txns), txns_1_1 = txns_1.next(); !txns_1_1.done; txns_1_1 = txns_1.next()) {
            var tr = txns_1_1.value;
            trPos = tr.mapping.map(trPos);
            var _b = tr.doc.resolve(trPos), nodeAfter = _b.nodeAfter, textOffset = _b.textOffset;
            trPos = trPos - textOffset;
            if (!isInsideLinkMark(nodeAfter)) {
                return null;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (txns_1_1 && !txns_1_1.done && (_a = txns_1.return)) _a.call(txns_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return trPos;
};
/**
 * Ensures that when a link that **used** to have the same text
 * as it's url gets modified, that the url is also updated.
 */
export default new Plugin({
    appendTransaction: function (txns, oldState, newState) {
        if (txns.some(function (tr) { return tr.docChanged; })) {
            var tr_1 = newState.tr, link_1 = newState.schema.marks.link;
            findChildrenByMark(oldState.doc, link_1).forEach(function (item) {
                if (isHrefAndTextEqual(item.node)) {
                    var pos = getLinkPosAfterTransactions(item.pos, txns);
                    if (typeof pos === 'number') {
                        var trPos = tr_1.mapping.map(pos);
                        var node = tr_1.doc.nodeAt(trPos);
                        if (!isHrefAndTextEqual(node)) {
                            var mark = link_1.isInSet(node.marks);
                            tr_1.removeMark(trPos, trPos + node.nodeSize, mark);
                            tr_1.addMark(trPos, trPos + node.nodeSize, mark.type.create({ href: normalizeUrl(node.text) }));
                        }
                    }
                }
            });
            return tr_1.docChanged ? tr_1 : undefined;
        }
    },
});
//# sourceMappingURL=sync-text-and-url.js.map