/**
 * Returns a sequence of tracking analytics event and the provided function.
 *
 * Usage:
 *
 *     let doSomething = function(a, b) { // ... }
 *     doSomething = trackAndInvoke('atlassian.editor.dosomething', doSomething);
 *
 *     doSomething(); // This will send analytics event and call the original function.
 *
 */
export default function trackAndInvoke<A, B, C, D, X>(analyticsEventName: string, fn: (a: A, b: B, c?: C, d?: D) => X): (a: A, b: B, c?: C | undefined, d?: D | undefined) => X;
