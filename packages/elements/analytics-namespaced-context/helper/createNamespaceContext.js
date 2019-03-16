import * as React from 'react';
import { AnalyticsContext } from '@atlaskit/analytics-next';
var createNamespaceContext = function (namespace, displayName) {
    if (displayName === void 0) { displayName = 'NamespacedContext'; }
    var Component = function (props) {
        var _a;
        var newData = (_a = {},
            _a[namespace] = props.data,
            _a);
        return (React.createElement(AnalyticsContext, { data: newData }, React.Children.only(props.children)));
    };
    Component.displayName = displayName;
    return Component;
};
export default createNamespaceContext;
//# sourceMappingURL=createNamespaceContext.js.map