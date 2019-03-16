export interface Options {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}
declare const _default: (name: string, options?: Options) => any;
/**
 * Build an event object in a cross-browser manner
 *
 * Usage:
 *    const event = createEvent('paste', options);
 */
export default _default;
