import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { analyticsService, trackAndInvoke } from '../../../analytics';
import { getLinkMatch } from '../utils';
import { stateKey } from '../pm-plugins/main';
import { showLinkToolbar, hideLinkToolbar } from '../commands';
import { queueCards } from '../../card/pm-plugins/actions';
export function createKeymapPlugin(schema, props) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.addLink.common, trackAndInvoke('atlassian.editor.format.hyperlink.keyboard', showLinkToolbar("shortcut" /* SHORTCUT */)), list);
    keymaps.bindKeymapWithCommand(keymaps.enter.common, mayConvertLastWordToHyperlink, list);
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, mayConvertLastWordToHyperlink, list);
    keymaps.bindKeymapWithCommand(keymaps.escape.common, function (state, dispatch, view) {
        var hyperlinkPlugin = stateKey.getState(state);
        if (hyperlinkPlugin.activeLinkMark) {
            hideLinkToolbar()(state, dispatch);
            if (view) {
                view.focus();
            }
            return false;
        }
        return false;
    }, list);
    return keymap(list);
}
var mayConvertLastWordToHyperlink = function (state, dispatch) {
    var nodeBefore = state.selection.$from.nodeBefore;
    if (!nodeBefore || !nodeBefore.isText) {
        return false;
    }
    var words = nodeBefore.text.split(' ');
    var lastWord = words[words.length - 1];
    var match = getLinkMatch(lastWord);
    if (match) {
        var hyperlinkedText = match.raw;
        var start = state.selection.$from.pos - hyperlinkedText.length;
        var end = state.selection.$from.pos;
        if (state.doc.rangeHasMark(start, end, state.schema.marks.link)) {
            return false;
        }
        var url = match.url;
        var markType = state.schema.mark('link', { href: url });
        var tr = queueCards([
            {
                url: url,
                pos: start,
                appearance: 'inline',
            },
        ])(state.tr.addMark(start, end, markType));
        analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');
        if (dispatch) {
            dispatch(tr);
        }
    }
    return false;
};
export default createKeymapPlugin;
//# sourceMappingURL=keymap.js.map