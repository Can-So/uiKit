import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors, borderRadius, themed } from '@findable/theme';
import { blockNodesVerticalMargin } from '@findable/editor-common';
import { Wrapper as WrapperDefault, padding } from '../styles';
export var Wrapper = styled(WrapperDefault)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin: ", " 0;\n\n  /* extension container breakout, only works on top level */\n  .ProseMirror > [extensiontype] &[data-layout='full-width'],\n  .ProseMirror > [extensiontype] &[data-layout='wide'] {\n    margin-left: 50%;\n    transform: translateX(-50%);\n  }\n  .ProseMirror > * [extensiontype] &[data-layout='wide'],\n  .ProseMirror > * [extensiontype] &[data-layout='wide'] {\n    width: 100% !important;\n  }\n"], ["\n  margin: ", " 0;\n\n  /* extension container breakout, only works on top level */\n  .ProseMirror > [extensiontype] &[data-layout='full-width'],\n  .ProseMirror > [extensiontype] &[data-layout='wide'] {\n    margin-left: 50%;\n    transform: translateX(-50%);\n  }\n  .ProseMirror > * [extensiontype] &[data-layout='wide'],\n  .ProseMirror > * [extensiontype] &[data-layout='wide'] {\n    width: 100% !important;\n  }\n"])), blockNodesVerticalMargin);
export var Header = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  cursor: pointer;\n  padding: ", "px ", "px ", "px;\n  vertical-align: middle;\n\n  &.with-children {\n    padding: 0;\n    background: white;\n  }\n"], ["\n  cursor: pointer;\n  padding: ", "px ", "px ", "px;\n  vertical-align: middle;\n\n  &.with-children {\n    padding: 0;\n    background: white;\n  }\n"])), padding / 2, padding / 2, padding / 4);
export var Content = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  padding: ", "px;\n  background: ", ";\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", "px;\n"], ["\n  padding: ", "px;\n  background: ",
    ";\n  color: ",
    ";\n  border: 1px solid ", ";\n  border-radius: ", "px;\n"])), padding, themed({
    light: 'white',
    dark: colors.DN30,
}), themed({
    dark: colors.DN900,
}), colors.N30, borderRadius());
export var ContentWrapper = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  padding: 0 ", "px ", "px;\n"], ["\n  padding: 0 ", "px ", "px;\n"])), padding, padding);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=styles.js.map