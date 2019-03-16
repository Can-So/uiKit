import * as tslib_1 from "tslib";
import { normalizeUrl } from './utils';
import { stateKey, LinkAction, canLinkBeCreatedInRange, } from './pm-plugins/main';
import { Selection } from 'prosemirror-state';
import { filter } from '../../utils/commands';
import { addAnalytics, } from '../analytics';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';
export function isTextAtPos(pos) {
    return function (state) {
        var node = state.doc.nodeAt(pos);
        return !!node && node.isText;
    };
}
export function isLinkAtPos(pos) {
    return function (state) {
        var node = state.doc.nodeAt(pos);
        return !!node && state.schema.marks.link.isInSet(node.marks);
    };
}
export function setLinkHref(href, pos, to) {
    return filter(isTextAtPos(pos), function (state, dispatch) {
        var $pos = state.doc.resolve(pos);
        var node = state.doc.nodeAt(pos);
        var linkMark = state.schema.marks.link;
        var mark = linkMark.isInSet(node.marks);
        var url = normalizeUrl(href);
        if (mark && mark.attrs.href === url) {
            return false;
        }
        var rightBound = to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
        var tr = state.tr.removeMark(pos, rightBound, linkMark);
        if (href.trim()) {
            tr.addMark(pos, rightBound, linkMark.create(tslib_1.__assign({}, ((mark && mark.attrs) || {}), { href: url })));
            tr.setMeta(stateKey, LinkAction.HIDE_TOOLBAR);
        }
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    });
}
export function setLinkText(text, pos, to) {
    return filter(isLinkAtPos(pos), function (state, dispatch) {
        var $pos = state.doc.resolve(pos);
        var node = state.doc.nodeAt(pos);
        var mark = state.schema.marks.link.isInSet(node.marks);
        if (node && text.length > 0 && text !== node.text) {
            var rightBound = to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
            var tr = state.tr;
            tr.insertText(text, pos, rightBound);
            tr.addMark(pos, pos + text.length, mark);
            tr.setMeta(stateKey, LinkAction.HIDE_TOOLBAR);
            if (dispatch) {
                dispatch(tr);
            }
            return true;
        }
        return false;
    });
}
export function insertLink(from, to, href, text) {
    return filter(canLinkBeCreatedInRange(from, to), function (state, dispatch) {
        var link = state.schema.marks.link;
        if (href.trim()) {
            var tr = state.tr;
            if (from === to) {
                var textContent = text || href;
                tr.insertText(textContent, from, to);
                tr.addMark(from, from + textContent.length, link.create({ href: normalizeUrl(href) }));
            }
            else {
                tr.addMark(from, to, link.create({ href: normalizeUrl(href) }));
                tr.setSelection(Selection.near(tr.doc.resolve(to)));
            }
            queueCardsFromChangedTr(state, tr);
            if (dispatch) {
                tr.setMeta(stateKey, LinkAction.HIDE_TOOLBAR);
                dispatch(tr);
            }
            return true;
        }
        return false;
    });
}
export function removeLink(pos) {
    return setLinkHref('', pos);
}
export function showLinkToolbar(inputMethod) {
    if (inputMethod === void 0) { inputMethod = "toolbar" /* TOOLBAR */; }
    return function (state, dispatch) {
        if (dispatch) {
            var tr = state.tr.setMeta(stateKey, LinkAction.SHOW_INSERT_TOOLBAR);
            tr = addAnalytics(tr, {
                action: "invoked" /* INVOKED */,
                actionSubject: "typeAhead" /* TYPEAHEAD */,
                actionSubjectId: "linkTypeAhead" /* TYPEAHEAD_LINK */,
                attributes: { inputMethod: inputMethod },
                eventType: "ui" /* UI */,
            });
            dispatch(tr);
        }
        return true;
    };
}
export function hideLinkToolbar() {
    return function (state, dispatch) {
        if (dispatch) {
            dispatch(state.tr.setMeta(stateKey, LinkAction.HIDE_TOOLBAR));
        }
        return true;
    };
}
//# sourceMappingURL=commands.js.map