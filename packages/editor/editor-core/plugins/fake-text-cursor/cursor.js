import * as tslib_1 from "tslib";
import { TextSelection, Selection, } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Slice } from 'prosemirror-model';
var FakeTextCursorBookmark = /** @class */ (function () {
    function FakeTextCursorBookmark(pos) {
        this.pos = undefined;
        this.visible = false;
        this.pos = pos;
    }
    FakeTextCursorBookmark.prototype.map = function (mapping) {
        return new FakeTextCursorBookmark(mapping.map(this.pos));
    };
    FakeTextCursorBookmark.prototype.resolve = function (doc) {
        var $pos = doc.resolve(this.pos);
        return Selection.near($pos);
    };
    return FakeTextCursorBookmark;
}());
export { FakeTextCursorBookmark };
var FakeTextCursorSelection = /** @class */ (function (_super) {
    tslib_1.__extends(FakeTextCursorSelection, _super);
    function FakeTextCursorSelection($pos) {
        return _super.call(this, $pos, $pos) || this;
    }
    FakeTextCursorSelection.prototype.map = function (doc, mapping) {
        var $pos = doc.resolve(mapping.map(this.$head.pos));
        return new FakeTextCursorSelection($pos);
    };
    FakeTextCursorSelection.content = function () {
        return Slice.empty;
    };
    FakeTextCursorSelection.prototype.eq = function (other) {
        return other instanceof FakeTextCursorSelection && other.head === this.head;
    };
    FakeTextCursorSelection.prototype.toJSON = function () {
        return { type: 'Cursor', pos: this.head };
    };
    FakeTextCursorSelection.fromJSON = function (doc, json) {
        return new FakeTextCursorSelection(doc.resolve(json.pos));
    };
    FakeTextCursorSelection.prototype.getBookmark = function () {
        return new FakeTextCursorBookmark(this.anchor);
    };
    return FakeTextCursorSelection;
}(Selection));
export { FakeTextCursorSelection };
Selection.jsonID('fake-text-cursor', FakeTextCursorSelection);
export var addFakeTextCursor = function (state, dispatch) {
    var selection = state.selection;
    if (selection.empty) {
        var $from = state.selection.$from;
        dispatch(state.tr.setSelection(new FakeTextCursorSelection($from)));
    }
};
export var removeFakeTextCursor = function (state, dispatch) {
    if (state.selection instanceof FakeTextCursorSelection) {
        var $from = state.selection.$from;
        dispatch(state.tr.setSelection(new TextSelection($from)));
    }
};
export var drawFakeTextCursor = function (state) {
    if (!(state.selection instanceof FakeTextCursorSelection)) {
        return null;
    }
    var node = document.createElement('div');
    node.className = 'ProseMirror-fake-text-cursor';
    return DecorationSet.create(state.doc, [
        Decoration.widget(state.selection.head, node, { key: 'Cursor' }),
    ]);
};
//# sourceMappingURL=cursor.js.map