import * as React from 'react';
import { RendererCssClassName } from '../../consts';
export default function Doc(props) {
    return React.createElement("div", { className: RendererCssClassName.DOCUMENT }, props.children);
}
//# sourceMappingURL=doc.js.map