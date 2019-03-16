import { DOMSerializer } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
var PlaceholderTextNode = /** @class */ (function () {
    function PlaceholderTextNode(node, view, getPos) {
        var _this = this;
        this.update = function (node) {
            if (node.type !== node.type.schema.nodes.placeholder) {
                return false;
            }
            _this.dom = DOMSerializer.renderSpec(document, node.type.spec.toDOM(node))
                .dom;
            _this.dom.onclick = _this.handleClick;
            return true;
        };
        this.destroy = function () {
            _this.dom = undefined;
        };
        this.handleClick = function (event) {
            var state = _this.view.state;
            var pos = _this.getPos();
            var selectionAtClick = TextSelection.create(state.tr.doc, pos);
            // In Firefox, clicking on the right-hand side of the span will place
            // the selection on the right-hand side of the node. We need to move
            // the selection to the left of this node in this case
            var nodeBefore = selectionAtClick.$anchor.nodeBefore;
            if (nodeBefore &&
                nodeBefore.type === _this.view.state.schema.nodes.placeholder &&
                _this.view.domAtPos(pos).node === event.target) {
                document.getSelection().removeAllRanges();
                // Find the nearest selection to the left to move the cursor to
                // TODO: [ts30] handle void and null properly
                var selectionToLeftOfClick = TextSelection.findFrom(selectionAtClick.$head, -1, true);
                _this.view.dispatch(state.tr.setSelection(selectionToLeftOfClick));
            }
            else {
                document.getSelection().removeAllRanges();
                _this.view.dispatch(state.tr.setSelection(selectionAtClick));
            }
            return true;
        };
        this.view = view;
        this.getPos = getPos;
        this.dom = DOMSerializer.renderSpec(document, node.type.spec.toDOM(node))
            .dom;
        // Using `onclick` rather than `addEventListener` due to ED-3728
        this.dom.onclick = this.handleClick;
    }
    return PlaceholderTextNode;
}());
export default PlaceholderTextNode;
//# sourceMappingURL=placeholder-text.js.map