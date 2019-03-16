import { NodeSelection } from 'prosemirror-state';
import { pluginKey } from './main';
import { resolveCard, queueCards } from './actions';
import { appearanceForNodeType } from '../utils';
import { processRawValue, getStepRange } from '../../../utils';
import { md } from '../../paste/pm-plugins/main';
import { closeHistory } from 'prosemirror-history';
export var replaceQueuedUrlWithCard = function (url, cardData) { return function (editorState, dispatch) {
    var state = pluginKey.getState(editorState);
    if (!state) {
        return false;
    }
    // find the requests for this URL
    var requests = state.requests.filter(function (req) { return req.url === url; });
    // try to transform response to ADF
    var schema = editorState.schema;
    var inlineCard = schema.nodes.inlineCard;
    var cardAdf = processRawValue(schema, cardData);
    var tr = editorState.tr;
    if (cardAdf) {
        requests.forEach(function (request) {
            // replace all the outstanding links with their cards
            var pos = tr.mapping.map(request.pos);
            var node = tr.doc.nodeAt(pos);
            if (!node || !node.type.isText) {
                return;
            }
            // not a link anymore
            var linkMark = node.marks.find(function (mark) { return mark.type.name === 'link'; });
            if (!linkMark) {
                return;
            }
            var textSlice = node.text;
            if (linkMark.attrs.href !== url || textSlice !== url) {
                return;
            }
            // ED-5638: add an extra space after inline cards to avoid re-rendering them
            var nodes = [cardAdf];
            if (cardAdf.type === inlineCard) {
                nodes.push(schema.text(' '));
            }
            tr = tr.replaceWith(pos, pos + url.length, nodes);
        });
    }
    if (dispatch) {
        dispatch(resolveCard(url)(closeHistory(tr)));
    }
    return true;
}; };
export var queueCardsFromChangedTr = function (state, tr, normalizeLinkText) {
    if (normalizeLinkText === void 0) { normalizeLinkText = true; }
    var schema = state.schema;
    var link = schema.marks.link;
    var stepRange = getStepRange(tr);
    if (!stepRange) {
        // no steps mutate this document, do nothing
        return tr;
    }
    var requests = [];
    tr.doc.nodesBetween(stepRange.from, stepRange.to, function (node, pos) {
        if (!node.isText) {
            return true;
        }
        var linkMark = node.marks.find(function (mark) { return mark.type === link; });
        if (linkMark) {
            // ED-6041: compare normalised link text after linkfy from Markdown transformer
            // instead, since it always decodes URL ('%20' -> ' ') on the link text
            var normalizedLinkText = md.normalizeLinkText(linkMark.attrs.href);
            // don't bother queueing nodes that have user-defined text for a link
            if (node.text !== normalizedLinkText) {
                return false;
            }
            requests.push({
                url: linkMark.attrs.href,
                pos: pos,
                appearance: 'inline',
            });
        }
        return false;
    });
    return queueCards(requests)(tr);
};
export var changeSelectedCardToLink = function (state, dispatch) {
    var selectedNode = state.selection instanceof NodeSelection && state.selection.node;
    if (!selectedNode) {
        return false;
    }
    var link = state.schema.marks.link;
    var tr = state.tr.replaceSelectionWith(state.schema.text(selectedNode.attrs.url, [
        link.create({ href: selectedNode.attrs.url }),
    ]), false);
    if (dispatch) {
        dispatch(tr.scrollIntoView());
    }
    return true;
};
export var setSelectedCardAppearance = function (appearance) { return function (state, dispatch) {
    var selectedNode = state.selection instanceof NodeSelection && state.selection.node;
    if (!selectedNode) {
        return false;
    }
    if (appearanceForNodeType(selectedNode.type) === appearance) {
        return false;
    }
    var _a = state.schema.nodes, inlineCard = _a.inlineCard, blockCard = _a.blockCard;
    var pos = state.selection.from;
    if (appearance === 'block' && state.selection.$from.parent.childCount === 1) {
        var tr_1 = state.tr.replaceRangeWith(pos - 1, pos + selectedNode.nodeSize + 1, blockCard.createChecked(selectedNode.attrs, undefined, selectedNode.marks));
        if (dispatch) {
            dispatch(tr_1.scrollIntoView());
        }
        return true;
    }
    var tr = state.tr.setNodeMarkup(pos, appearance === 'inline' ? inlineCard : blockCard, selectedNode.attrs, selectedNode.marks);
    if (dispatch) {
        dispatch(tr.scrollIntoView());
    }
    return true;
}; };
//# sourceMappingURL=doc.js.map