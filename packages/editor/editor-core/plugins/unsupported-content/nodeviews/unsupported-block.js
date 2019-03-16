import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { borderRadius, colors } from '@atlaskit/theme';
import { fontSize } from '@atlaskit/theme';
var BlockNode = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  align-items: center;\n  background: ", ";\n  border: 1px dashed ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: block;\n  font-size: ", "px;\n  margin: 10px 0;\n  min-height: 24px;\n  padding: 10px;\n  text-align: center;\n  user-select: all;\n  min-width: 120px;\n\n  &.ProseMirror-selectednode {\n    background: ", ";\n    outline: none;\n  }\n"], ["\n  align-items: center;\n  background: ", ";\n  border: 1px dashed ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: block;\n  font-size: ", "px;\n  margin: 10px 0;\n  min-height: 24px;\n  padding: 10px;\n  text-align: center;\n  user-select: all;\n  min-width: 120px;\n\n  &.ProseMirror-selectednode {\n    background: ", ";\n    outline: none;\n  }\n"])), colors.N30, colors.N50, borderRadius(), fontSize(), colors.N50);
export default function UnsupportedBlockNode() {
    return React.createElement(BlockNode, null, "Unsupported content");
}
var templateObject_1;
//# sourceMappingURL=unsupported-block.js.map