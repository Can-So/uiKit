import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import { mentionListWidth, noDialogContainerBorderColor, noDialogContainerBorderRadius, noDialogContainerBoxShadow, } from '../../shared-styles';
export var MentionPickerStyle = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: ", ";\n"], ["\n  display: ",
    ";\n"])), function (props) {
    return props.visible ? 'block' : 'none';
});
export var MentionPickerInfoStyle = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  background: #fff;\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n  display: block;\n  width: ", ";\n  white-space: nowrap;\n\n  & {\n    p {\n      margin: 0;\n      overflow: hidden;\n      padding: 9px;\n      text-overflow: ellipsis;\n    }\n  }\n"], ["\n  background: #fff;\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n  display: block;\n  width: ", ";\n  white-space: nowrap;\n\n  & {\n    p {\n      margin: 0;\n      overflow: hidden;\n      padding: 9px;\n      text-overflow: ellipsis;\n    }\n  }\n"])), colors.N100, noDialogContainerBorderColor, noDialogContainerBorderRadius, noDialogContainerBoxShadow, mentionListWidth);
var templateObject_1, templateObject_2;
//# sourceMappingURL=styles.js.map