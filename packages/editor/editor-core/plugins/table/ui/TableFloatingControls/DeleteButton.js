import * as React from 'react';
import { injectIntl } from 'react-intl';
import { TableCssClassName as ClassName } from '../../types';
var DeleteButton = function (_a) {
    var style = _a.style, onClick = _a.onClick, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, removeLabel = _a.removeLabel, formatMessage = _a.intl.formatMessage;
    return (React.createElement("div", { className: ClassName.CONTROLS_DELETE_BUTTON_WRAP, style: style, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
        React.createElement("button", { type: "button", title: formatMessage(removeLabel, { 0: 1 }), className: ClassName.CONTROLS_DELETE_BUTTON, onMouseDown: onClick, onMouseMove: function (e) { return e.preventDefault(); } },
            React.createElement("svg", { className: ClassName.CONTROLS_BUTTON_ICON },
                React.createElement("path", { d: "M12.242 10.828L9.414 8l2.828-2.829a.999.999 0 1 0-1.414-1.414L8 6.587l-2.829-2.83a1 1 0 0 0-1.414 1.414l2.83 2.83-2.83 2.827a1 1 0 0 0 1.414 1.414l2.83-2.828 2.827 2.828a.999.999 0 1 0 1.414-1.414", fill: "currentColor", fillRule: "evenodd" })))));
};
export default injectIntl(DeleteButton);
//# sourceMappingURL=DeleteButton.js.map