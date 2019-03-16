import { Plugin, TextSelection } from 'prosemirror-state';
export default new Plugin({
    props: {
        handleClick: function (view, clickPos, event) {
            // Don't apply in Edge as per ED-4546
            if (navigator && /Edge\/\d/.test(navigator.userAgent)) {
                return false;
            }
            // @see ED-6231
            if (clickPos > view.state.doc.content.size) {
                return false;
            }
            var code = view.state.schema.marks.code;
            var $click = view.state.doc.resolve(clickPos);
            var clickWasAtEdgeOfATextNode = ($click.nodeBefore ? $click.nodeBefore.isInline : $click.nodeAfter) &&
                ($click.nodeAfter ? $click.nodeAfter.isInline : $click.nodeBefore) &&
                $click.textOffset === 0;
            var clickWasNearACodeMark = code &&
                (($click.nodeBefore && code.isInSet($click.nodeBefore.marks)) ||
                    ($click.nodeAfter && code.isInSet($click.nodeAfter.marks)));
            // Find the starting position of the clicked dom-element
            // TODO: Remove calls to private API
            var clickedDOMElementPosition = event.target &&
                event.target instanceof Node &&
                view.posAtDOM(event.target);
            if (clickWasAtEdgeOfATextNode &&
                clickWasNearACodeMark &&
                clickedDOMElementPosition) {
                var clickWasInsideNodeDOM = event.target.parentNode ===
                    view.domAtPos(clickedDOMElementPosition).node &&
                    code.isInSet(view.state.doc.resolve(clickedDOMElementPosition).nodeAfter.marks);
                var nodeNextToClick = $click.nodeBefore && code.isInSet($click.nodeBefore.marks)
                    ? $click.nodeAfter
                    : $click.nodeBefore;
                // Need to set the selection here to allow clicking between [code('text'),{<>},emoji()]
                var tr = view.state.tr.setSelection(TextSelection.near($click));
                if (clickWasInsideNodeDOM) {
                    tr.setStoredMarks([code.create()]);
                }
                else {
                    tr.setStoredMarks(nodeNextToClick ? nodeNextToClick.marks : []);
                }
                view.dispatch(tr);
                return true;
            }
            return false;
        },
    },
});
//# sourceMappingURL=cursor.js.map