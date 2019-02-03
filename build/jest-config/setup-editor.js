const warnOnce = (() => {
  return () => {
    if (window.hasWarnedAboutJsdomFixtures) {
      return;
    }
    // tslint:disable-next-line:no-console
    console.warn(
      'Warning! Test depends on DOM selection API which is not supported in JSDOM/Node environment.',
    );
    window.hasWarnedAboutJsdomFixtures = true;
  };
})();

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
  getClientRects: () => [],
  getBoundingClientRect: () => clientRectFixture,
};

Object.defineProperty(rangeFixture, 'commonAncestorContainer', {
  enumerable: true,
  get: () => {
    return document.body;
  },
});

if (typeof window !== 'undefined') {
  window.getSelection = () => {
    warnOnce();
    return selectionFixture;
  };
}

if (typeof document !== 'undefined') {
  document.getSelection = () => {
    warnOnce();
    return selectionFixture;
  };

  // Do nothing when attempting to create DOM ranges
  document.createRange = () => {
    warnOnce();
    return rangeFixture;
  };

  if (!('getClientRects' in document.createElement('div'))) {
    Element.prototype.getClientRects = () => [];
    Element.prototype.getBoundingClientRect = () => clientRectFixture;
  }
}

if (typeof window !== 'undefined' && typeof window.InputEvent === 'undefined') {
  class InputEvent {
    constructor(typeArg, inputEventInit) {
      const uiEvent = new UIEvent(typeArg, inputEventInit);

      uiEvent.inputType = (inputEventInit && inputEventInit.inputType) || '';
      uiEvent.isComposing =
        (inputEventInit && inputEventInit.isComposing) || false;
      uiEvent.data = (inputEventInit && inputEventInit.data) || null;
      return uiEvent;
    }
  }

  window.InputEvent = InputEvent;
}
