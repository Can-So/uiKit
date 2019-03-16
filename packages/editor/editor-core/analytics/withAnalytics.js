import * as tslib_1 from "tslib";
import analyticsService from './service';
export function withAnalytics(analyticsEventName, trackedFn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = trackedFn.apply(void 0, tslib_1.__spread(args));
        if (result) {
            try {
                analyticsService.trackEvent(analyticsEventName);
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.error('An exception has been thrown when trying to track analytics event:', e);
            }
        }
        return result;
    };
}
//# sourceMappingURL=withAnalytics.js.map