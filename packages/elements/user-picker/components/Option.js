import * as tslib_1 from "tslib";
import { components } from '@atlaskit/select';
import * as React from 'react';
import { EmailOption } from './EmailOption';
import { TeamOption } from './TeamOption';
import { UserOption } from './UserOption';
import { isEmail, isTeam, isUser } from './utils';
var dataOption = function (_a) {
    var data = _a.data.data, isSelected = _a.isSelected, status = _a.status, selectProps = _a.selectProps;
    if (isUser(data)) {
        return React.createElement(UserOption, { user: data, status: status, isSelected: isSelected });
    }
    if (isEmail(data)) {
        return (React.createElement(EmailOption, { email: data, isSelected: isSelected, label: selectProps.emailLabel }));
    }
    if (isTeam(data)) {
        return React.createElement(TeamOption, { team: data, isSelected: isSelected });
    }
    return null;
};
export var Option = function (props) { return (React.createElement(components.Option, tslib_1.__assign({}, props), dataOption(props))); };
//# sourceMappingURL=Option.js.map