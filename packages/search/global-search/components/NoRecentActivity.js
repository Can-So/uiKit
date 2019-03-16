import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { gridSize, typography } from '@findable/theme';
import { messages } from '../messages';
import MaginfyingGlassImage from '../assets/MagnifyingGlassImage';
var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin: ", "px 0;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin: ", "px 0;\n"])), gridSize() * 4);
var ImageWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  width: 20%;\n  height: 20%;\n  margin-top: ", "px;\n"], ["\n  width: 20%;\n  height: 20%;\n  margin-top: ", "px;\n"])), gridSize() * 11);
var TextWrapper = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: ", "px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: ", "px;\n"])), gridSize() * 3);
var Title = styled.h4(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  ", ";\n  margin-bottom: ", "px;\n  margin-top: 0;\n"], ["\n  ", ";\n  margin-bottom: ", "px;\n  margin-top: 0;\n"])), typography.h600(), gridSize() * 2);
var Text = function (_a) {
    var children = _a.children;
    return (React.createElement(TextWrapper, null,
        React.createElement(Title, null,
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.no_recent_activity_title))),
        children));
};
var NoRecentActivity = /** @class */ (function (_super) {
    tslib_1.__extends(NoRecentActivity, _super);
    function NoRecentActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoRecentActivity.prototype.render = function () {
        return (React.createElement(Wrapper, null,
            React.createElement(ImageWrapper, null,
                React.createElement(MaginfyingGlassImage, null)),
            React.createElement(Text, { children: this.props.children })));
    };
    return NoRecentActivity;
}(React.Component));
export default NoRecentActivity;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=NoRecentActivity.js.map