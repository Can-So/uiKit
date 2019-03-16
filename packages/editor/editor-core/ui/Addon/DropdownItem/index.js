import * as React from 'react';
import { DropdownItem } from './styles';
var DropdownItemWrapper = function (props) { return (React.createElement(DropdownItem, { onClick: function () {
        return props.onClick &&
            props.onClick({
                actionOnClick: props.actionOnClick,
                renderOnClick: props.renderOnClick,
            });
    } },
    React.createElement("span", null, props.icon),
    props.children)); };
export default DropdownItemWrapper;
//# sourceMappingURL=index.js.map