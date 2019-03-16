import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import BoardIcon from '@atlaskit/icon/glyph/board';
import IssueIcon from '@atlaskit/icon/glyph/issue';
import FilterIcon from '@atlaskit/icon/glyph/filter';
import { gridSize } from '@atlaskit/theme';
import { ContentType } from '../model/Result';
var IconWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: ", "px;\n  height: ", "px;\n  align-items: center;\n  display: flex;\n"], ["\n  width: ", "px;\n  height: ", "px;\n  align-items: center;\n  display: flex;\n"])), (7 * gridSize()) / 2, (7 * gridSize()) / 2);
var getIconComponent = function (contentType) {
    switch (contentType) {
        case ContentType.JiraIssue:
            return IssueIcon;
        case ContentType.JiraBoard:
            return BoardIcon;
        case ContentType.JiraFilter:
            return FilterIcon;
        default:
            return null;
    }
};
export var getDefaultAvatar = function (contentType) {
    var IconComponent = getIconComponent(contentType);
    return IconComponent ? (React.createElement(IconWrapper, null,
        React.createElement(IconComponent, { label: contentType || '', size: "medium" }))) : null;
};
var templateObject_1;
//# sourceMappingURL=jira-avatar-util.js.map