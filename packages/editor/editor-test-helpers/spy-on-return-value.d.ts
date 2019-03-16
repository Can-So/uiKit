/// <reference types="jest" />
export declare type spyWithReturnValue = jest.SpyInstance<any> & {
    returnValue?: any;
};
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
export default function spyOnReturnValue(object: any, methodName: string, sandbox?: typeof jest): spyWithReturnValue;
