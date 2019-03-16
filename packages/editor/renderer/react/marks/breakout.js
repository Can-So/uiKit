import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { blockNodesVerticalMargin, calcBreakoutWidth, WidthConsumer, } from '@findable/editor-common';
export var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin: ", " 0;\n  margin-left: 50%;\n  transform: translateX(-50%);\n"], ["\n  margin: ", " 0;\n  margin-left: 50%;\n  transform: translateX(-50%);\n"])), blockNodesVerticalMargin);
export default function Breakout(props) {
    return (React.createElement(WidthConsumer, null, function (_a) {
        var width = _a.width, breakpoint = _a.breakpoint;
        return (React.createElement(Wrapper, { "data-mode": props.mode, style: { width: calcBreakoutWidth(props.mode, width) }, className: "fabric-editor-breakout-mark" }, props.children));
    }));
}
var templateObject_1;
//# sourceMappingURL=breakout.js.map