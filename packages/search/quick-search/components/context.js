import * as React from 'react';
var defaultState = {
    sendAnalytics: function () { },
    onMouseEnter: function () { },
    onMouseLeave: function () { },
    registerResult: function () { },
    unregisterResult: function () { },
    getIndex: function (n) { return Number(n); },
};
export var ResultContext = React.createContext(defaultState);
export var SelectedResultIdContext = React.createContext(null);
//# sourceMappingURL=context.js.map