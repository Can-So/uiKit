import * as tslib_1 from "tslib";
import styled, { css } from 'styled-components';
import { colors, borderRadius } from '@atlaskit/theme';
export var BackgroundWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  height: 2px;\n  background-color: ", ";\n  border: transparent;\n  border-radius: ", "px;\n  ", ";\n"], ["\n  height: 2px;\n  background-color: ", ";\n  border: transparent;\n  border-radius: ", "px;\n  ",
    ";\n"])), colors.N20, borderRadius(), function (_a) {
    var maxWidth = _a.maxWidth;
    return css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      max-width: ", "px;\n    "], ["\n      max-width: ", "px;\n    "])), maxWidth);
});
export var ProgressLoaderWrapper = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  flex-grow: 1;\n"], ["\n  flex-grow: 1;\n"])));
export var Container = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
export var LoaderStyle = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  background-color: ", ";\n  height: 2px;\n  border: transparent;\n  border-radius: ", "px;\n\n  /**\n   * This value was found to be ideal\n   * http://cubic-bezier.com/#.52,.27,0,1.03\n   **/\n  transition: 1s all cubic-bezier(0.52, 0.27, 0, 1.03);\n\n  ", ";\n"], ["\n  background-color: ", ";\n  height: 2px;\n  border: transparent;\n  border-radius: ", "px;\n\n  /**\n   * This value was found to be ideal\n   * http://cubic-bezier.com/#.52,.27,0,1.03\n   **/\n  transition: 1s all cubic-bezier(0.52, 0.27, 0, 1.03);\n\n  ",
    ";\n"])), colors.B400, borderRadius(), function (_a) {
    var progress = _a.progress, maxWidth = _a.maxWidth;
    return css(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n      width: ", "px;\n    "], ["\n      width: ", "px;\n    "])), progress * (maxWidth || 1));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=styles.js.map