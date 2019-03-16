import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { findPositionOfNodeBefore } from 'prosemirror-utils';
import { GapCursorSelection, JSON_ID, Side } from '../selection';
import { fixCursorAlignment, isIgnoredClick } from '../utils';
import { setGapCursorAtPos, deleteNode } from '../actions';
import { Direction } from '../direction';
export var pluginKey = new PluginKey('gapCursorPlugin');
var plugin = new Plugin({
    key: pluginKey,
    // this hack fixes gap cursor alignment on each cursor movement after its been rendered to DOM
    view: function () {
        return {
            update: function (view) {
                if (view.state.selection instanceof GapCursorSelection) {
                    fixCursorAlignment(view);
                }
            },
        };
    },
    props: {
        decorations: function (_a) {
            var doc = _a.doc, selection = _a.selection;
            if (selection instanceof GapCursorSelection) {
                var $from = selection.$from, side = selection.side;
                var node = document.createElement('span');
                node.className = "ProseMirror-gapcursor " + (side === Side.LEFT ? '-left' : '-right');
                node.appendChild(document.createElement('span'));
                // render decoration DOM node always to the left of the target node even if selection points to the right
                // otherwise positioning of the right gap cursor is a nightmare when the target node has a nodeView with vertical margins
                var position = selection.head;
                if (side === Side.RIGHT && $from.nodeBefore) {
                    var nodeBeforeStart = findPositionOfNodeBefore(selection);
                    if (typeof nodeBeforeStart === 'number') {
                        position = nodeBeforeStart;
                    }
                }
                return DecorationSet.create(doc, [
                    Decoration.widget(position, node, { key: "" + JSON_ID, side: -1 }),
                ]);
            }
            return null;
        },
        // render gap cursor only when its valid
        createSelectionBetween: function (view, $anchor, $head) {
            if ($anchor.pos === $head.pos && GapCursorSelection.valid($head)) {
                return new GapCursorSelection($head);
            }
            return;
        },
        // there's no space between top level nodes and the wrapping ProseMirror contenteditable area and handleClick won't capture clicks, there's nothing to click on
        // it handles only attempts to set gap cursor for nested nodes, where we have space between parent and child nodes
        // top level nodes are handled by <ClickAreaBlock>
        handleClick: function (view, position, event) {
            var posAtCoords = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
            });
            // this helps to ignore all of the clicks outside of the parent (e.g. nodeView controls)
            if (posAtCoords &&
                posAtCoords.inside !== position &&
                !isIgnoredClick(event.target)) {
                // max available space between parent and child from the left side in px
                // this ensures the correct side of the gap cursor in case of clicking in between two block nodes
                var leftSideOffsetX = 20;
                var side = event.offsetX > leftSideOffsetX ? Side.RIGHT : Side.LEFT;
                return setGapCursorAtPos(position, side)(view.state, view.dispatch);
            }
            return false;
        },
        handleDOMEvents: {
            /**
             * Android composition events aren't handled well by Prosemirror
             * We've added a couple of beforeinput hooks to help PM out when trying to delete
             * certain nodes. We can remove these when PM has better composition support.
             * @see https://github.com/ProseMirror/prosemirror/issues/543
             */
            beforeinput: function (view, event) {
                if (event.inputType === 'deleteContentBackward' &&
                    view.state.selection instanceof GapCursorSelection) {
                    event.preventDefault();
                    return deleteNode(Direction.BACKWARD)(view.state, view.dispatch);
                }
                return false;
            },
        },
    },
});
export default plugin;
//# sourceMappingURL=main.js.map