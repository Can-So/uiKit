import * as tslib_1 from "tslib";
import { Skeleton } from '@findable/icon';
import InviteTeamIcon from '@findable/icon/glyph/invite-team';
import * as React from 'react';
import styled from 'styled-components';
var AddOptionAvatarWrapper = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  color: black;\n  padding: 2px;\n"], ["\n  color: black;\n  padding: 2px;\n"])));
export var AddOptionAvatar = function (_a) {
    var size = _a.size, label = _a.label;
    return (React.createElement(AddOptionAvatarWrapper, null,
        React.createElement(Skeleton, { size: size },
            React.createElement(InviteTeamIcon, { label: label, size: size, primaryColor: "white" }))));
};
AddOptionAvatar.defaultProps = {
    size: 'large',
};
var templateObject_1;
//# sourceMappingURL=AddOptionAvatar.js.map