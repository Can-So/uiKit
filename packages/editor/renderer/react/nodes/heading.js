import * as React from 'react';
import Inline from './inline';
export default function Heading(props) {
    var level = props.level, children = props.children, headingId = props.headingId;
    var HX = "h" + level;
    return (React.createElement(HX, { id: headingId },
        React.createElement(Inline, null, children)));
}
//# sourceMappingURL=heading.js.map