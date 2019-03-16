import { EditorView } from 'prosemirror-view';
var NullSelectionReader = /** @class */ (function () {
    function NullSelectionReader(warnOnce) {
        this.warnOnce = warnOnce;
    }
    NullSelectionReader.prototype.destroy = function () { };
    NullSelectionReader.prototype.poll = function () { };
    NullSelectionReader.prototype.editableChanged = function () { };
    // : () → bool
    // Whether the DOM selection has changed from the last known state.
    NullSelectionReader.prototype.domChanged = function () {
        this.warnOnce();
        return true;
    };
    // Store the current state of the DOM selection.
    NullSelectionReader.prototype.storeDOMState = function (selection) {
        this.warnOnce();
    };
    NullSelectionReader.prototype.clearDOMState = function () {
        this.warnOnce();
    };
    // : (?string) → bool
    // When the DOM selection changes in a notable manner, modify the
    // current selection state to match.
    NullSelectionReader.prototype.readFromDOM = function (origin) {
        this.warnOnce();
        return true;
    };
    return NullSelectionReader;
}());
export { NullSelectionReader };
export default (function (editorView) {
    var warnOnce = (function () {
        return function () {
            if (window.hasWarnedAboutJsdomFixtures) {
                return;
            }
            // tslint:disable-next-line:no-console
            console.warn('Warning! Test depends on DOM selection API which is not supported in JSDOM/Node environment.');
            window.hasWarnedAboutJsdomFixtures = true;
        };
    })();
    // Ignore all DOM document selection changes and do nothing to update it
    editorView.selectionReader = new NullSelectionReader(warnOnce);
    // Make sure that we don't attempt to scroll down to selection when dispatching a transaction
    editorView.updateState = function (state) {
        warnOnce();
        state.scrollToSelection = 0;
        EditorView.prototype.updateState.apply(this, arguments);
    };
    // Do nothing to update selection
    editorView.setSelection = function (anchor, head, root) {
        warnOnce();
    };
    editorView.destroy = function () {
        EditorView.prototype.destroy.apply(this, arguments);
    };
});
//# sourceMappingURL=jsdom-fixtures.js.map