import * as React from 'react';
export default function LayoutSection(props) {
    return (React.createElement("div", { "data-layout-column": true, "data-column-width": props.width, style: { flexBasis: props.width + "%" } }, props.children));
}
//# sourceMappingURL=layoutColumn.js.map