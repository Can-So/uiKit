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
export default (function () {
    var fixture;
    beforeEach(function () {
        fixture = document.createElement('div');
        document.body.appendChild(fixture);
    });
    afterEach(function () {
        if (fixture && fixture.parentNode === document.body) {
            document.body.removeChild(fixture);
        }
    });
    return function () { return fixture; };
});
//# sourceMappingURL=fixtures.js.map