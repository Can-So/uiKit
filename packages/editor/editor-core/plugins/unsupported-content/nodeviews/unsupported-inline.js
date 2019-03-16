import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { borderRadius, colors } from '@atlaskit/theme';
import { fontSize } from '@atlaskit/theme';
var InlineNode = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  align-items: center;\n  background: ", ";\n  border: 1px dashed ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: inline-flex;\n  font-size: ", "px;\n  margin: 0 2px;\n  min-height: 24px;\n  padding: 0 10px;\n  user-select: all;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  &.ProseMirror-selectednode {\n    background: ", ";\n    outline: none;\n  }\n"], ["\n  align-items: center;\n  background: ", ";\n  border: 1px dashed ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: inline-flex;\n  font-size: ", "px;\n  margin: 0 2px;\n  min-height: 24px;\n  padding: 0 10px;\n  user-select: all;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  &.ProseMirror-selectednode {\n    background: ", ";\n    outline: none;\n  }\n"])), colors.N30, colors.N50, borderRadius(), fontSize(), colors.N50);
export default function UnsupportedInlineNode() {
    return React.createElement(InlineNode, null, "Unsupported content");
}
var templateObject_1;
//# sourceMappingURL=unsupported-inline.js.map