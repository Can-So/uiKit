import * as React from 'react';
export default function Inline(props) {
    var children = props.children;
    var childCount = React.Children.toArray(children).length;
    if (!childCount) {
        return React.createElement(React.Fragment, null, "\u00A0");
    }
    return children;
}
//# sourceMappingURL=inline.js.map