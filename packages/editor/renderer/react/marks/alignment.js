import * as tslib_1 from "tslib";
import * as React from 'react';
import styled, { css } from 'styled-components';
import { alignmentPositionMap, } from '@atlaskit/adf-schema';
var MarkWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ",
    ";\n"])), function (props) {
    return props['data-align'] && css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      text-align: ", ";\n    "], ["\n      text-align: ", ";\n    "])), alignmentPositionMap[props['data-align']]);
});
export default function Alignment(props) {
    return (React.createElement(MarkWrapper, { className: "fabric-editor-block-mark", "data-align": props.align }, props.children));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=alignment.js.map