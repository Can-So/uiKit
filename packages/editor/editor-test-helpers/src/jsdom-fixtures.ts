import { EditorView } from 'prosemirror-view';

export class NullSelectionReader {
  constructor(private warnOnce: () => void) {}

  destroy() {}
  poll() {}
  editableChanged() {}

  // : () → bool
  // Whether the DOM selection has changed from the last known state.
  domChanged() {
    this.warnOnce();
    return true;
  }

  // Store the current state of the DOM selection.
  storeDOMState(selection) {
    this.warnOnce();
  }

  clearDOMState() {
    this.warnOnce();
  }

  // : (?string) → bool
  // When the DOM selection changes in a notable manner, modify the
  // current selection state to match.
  readFromDOM(origin) {
    this.warnOnce();
    return true;
  }
}

const clientRectFixture = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

const selectionFixture = {
  removeAllRanges: () => {},
  addRange: () => {},
};

const rangeFixture = {
  setEnd: () => {},
  setStart: () => {},
  collapse: () => {},
  getClientRects: () => [] as any,
  getBoundingClientRect: () => clientRectFixture as any,
};

export default editorView => {
  const warnOnce = (() => {
    return () => {
      if ((window as any).hasWarnedAboutJsdomFixtures) {
        return;
      }

      // tslint:disable-next-line:no-console
      console.warn(
        'Warning! Test depends on DOM selection API which is not supported in JSDOM/Node environment.',
      );

      (window as any).hasWarnedAboutJsdomFixtures = true;
    };
  })();

  // Ignore all DOM document selection changes and do nothing to update it
  (editorView as any).selectionReader = new NullSelectionReader(warnOnce);

  // Make sure that we don't attempt to scroll down to selection when dispatching a transaction
  (editorView as any).updateState = function(state) {
    warnOnce();
    state.scrollToSelection = 0;
    EditorView.prototype.updateState.apply(this, arguments);
  };

  // Do nothing to update selection
  (editorView as any).setSelection = function(anchor, head, root) {
    warnOnce();
  };

  // Do nothing when attempting to retrieve selection
  window.getSelection = () => {
    warnOnce();
    return selectionFixture as any;
  };

  document.getSelection = () => {
    warnOnce();
    return selectionFixture as any;
  };

  // Do nothing when attempting to create DOM ranges
  document.createRange = () => {
    warnOnce();
    return rangeFixture as any;
  };

  if (!('getClientRects' in document.createElement('div'))) {
    Element.prototype.getClientRects = () => [] as any;
    Element.prototype.getBoundingClientRect = () => clientRectFixture as any;
  }

  (editorView as any).destroy = function() {
    EditorView.prototype.destroy.apply(this, arguments);
    delete (window as any).getSelection;
    delete (document as any).getSelection;
    delete (document as any).createRange;
  };
};
