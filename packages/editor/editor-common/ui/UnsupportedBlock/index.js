import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { borderRadius, colors } from '@atlaskit/theme';
// tslint:disable-next-line:variable-name
var BlockNode = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  align-items: center;\n  background: ", ";\n  border: 1px dashed ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: block;\n  font-size: 13px;\n  margin: 10px 0;\n  min-height: 24px;\n  padding: 10px;\n  text-align: center;\n  user-select: all;\n  vertical-align: text-bottom;\n  white-space: nowrap;\n\n  '&.ProseMirror-selectednode' {\n    background: ", ";\n    outline: none;\n  }\n"], ["\n  align-items: center;\n  background: ", ";\n  border: 1px dashed ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: block;\n  font-size: 13px;\n  margin: 10px 0;\n  min-height: 24px;\n  padding: 10px;\n  text-align: center;\n  user-select: all;\n  vertical-align: text-bottom;\n  white-space: nowrap;\n\n  '&.ProseMirror-selectednode' {\n    background: ", ";\n    outline: none;\n  }\n"])), colors.N30, colors.N50, borderRadius(), colors.N50);
var UnsupportedBlockNode = /** @class */ (function (_super) {
    tslib_1.__extends(UnsupportedBlockNode, _super);
    function UnsupportedBlockNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnsupportedBlockNode.prototype.render = function () {
        return React.createElement(BlockNode, null, "Unsupported content");
    };
    return UnsupportedBlockNode;
}(Component));
export default UnsupportedBlockNode;
var templateObject_1;
//# sourceMappingURL=index.js.map