/**
 * Creates a function that "collects" and returns values !== undefined,
 * falls back to default value for subsequent calls after first value === undefined
 */
export function createCollector() {
    var keepCollecting = true;
    return function (nextResult, defaultValue) {
        if (keepCollecting && nextResult !== undefined) {
            return nextResult;
        }
        keepCollecting = false;
        return defaultValue;
    };
}
//# sourceMappingURL=create-collector.js.map