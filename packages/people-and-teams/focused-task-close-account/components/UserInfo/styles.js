import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { typography, fontSize, colors } from '@atlaskit/theme';
import gridSizeTimes from '../../util/gridSizeTimes';
var baseHeading = function (size, lineHeight) { return "\n  font-size: " + size / fontSize() + "em;\n  font-style: inherit;\n  line-height: " + lineHeight / size + ";\n"; };
export var UserInfoOuter = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  margin-bottom: ", "px;\n"], ["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  margin-bottom: ", "px;\n"])), gridSizeTimes(2));
export var Avatar = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  margin-left: ", "px;\n  margin-right: ", "px;\n  margin-bottom: ;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin-left: ", "px;\n  margin-right: ", "px;\n  margin-bottom: ;\n"])), gridSizeTimes(2.5), gridSizeTimes(1));
export var UserDetails = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  margin-left: ", "px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin-left: ", "px;\n"])), gridSizeTimes(0.5));
export var UserName = styled.span(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  ", ";\n  margin-top: 0;\n"], ["\n  ", ";\n  margin-top: 0;\n"])), typography.h500);
export var UserEmail = styled.span(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  ", " color: ", ";\n  font-weight: 300;\n  margin-top: ", "px;\n"], ["\n  ", " color: ", ";\n  font-weight: 300;\n  margin-top: ", "px;\n"])), baseHeading(11, 16), colors.subtleHeading, gridSizeTimes(0.5));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=styles.js.map