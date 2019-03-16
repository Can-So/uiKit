/**
 * Returns a jest function spy, which also captures the last return value of the target
 * method. This replaces Sinon's syntax: sinon.stub(obj, 'method').returns(val);
 *
 * Example Usage:
 *
 *    const spy = spyOnReturnValue(someObject, 'runMe');
 *    expect(spy).toHaveBeenCalled();
 *    expect(spy.returnValue).toBe(true);
 *
 * @param string object The object instance to use.
 * @param string methodName The method name on the object to spy on.
 * @param {jest-sandbox} sandbox (optional) Jest sandbox instance to use
 */
export default function spyOnReturnValue(object, methodName, sandbox) {
    var originalFn = object[methodName];
    var spy;
    if (sandbox) {
        sandbox = jest;
        spy = sandbox.spyOn(object, methodName);
    }
    else {
        spy = jest.spyOn(object, methodName);
        afterEach(function () {
            spy.mockRestore();
        });
    }
    spy.mockImplementation(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (spy.returnValue = originalFn.apply(object, args));
    });
    return spy;
}
//# sourceMappingURL=spy-on-return-value.js.map