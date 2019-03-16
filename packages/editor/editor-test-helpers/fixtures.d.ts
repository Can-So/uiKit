declare const _default: () => () => HTMLElement;
/**
 * A helper for creating fixtures in tests.
 *
 * A function is returned that when called in the context of a test, will return
 * a reference to an element in the DOM.
 * If called outside the context of a test, it will return undefined.
 * Clean-up of the element is handled automatically.
 *
 * @example @js const fixture = fixtures();
 * it('should have a fixture', () => {
 *   expect(fixture().tagName).to.equal('DIV');
 * });
 * @returns {() => HTMLElement}
 */
export default _default;
