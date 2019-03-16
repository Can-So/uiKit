/**
 * Provider using globally available, configured Herment instance.
 *
 * @link https://bitbucket.org/atlassian/herment/overview
 */
export function hermentHandler(name, properties) {
    try {
        window.AJS.EventQueue.push({ name: name, properties: properties });
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.warn('Unable to send analytics event via Herment - has it been initialized?', e);
    }
}
export function debugHandler(name, properties) {
    // tslint:disable-next-line:no-console
    console.info('analytics event: ', name, properties ? properties : '[no properties]');
}
/**
 * Attempt to detect analytics provider.
 */
export function detectHandler() {
    // Check Herment is globally available
    if (typeof window !== 'undefined' &&
        window.AJS &&
        window.AJS.EventQueue &&
        typeof window.AJS.EventQueue.push === 'function') {
        return hermentHandler;
    }
    // Unable to detect a suitable handler
    return function () { return null; };
}
//# sourceMappingURL=handler.js.map