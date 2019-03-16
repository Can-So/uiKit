import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { contentPreviewMessages } from '../../messages';
import UserInfo from '../UserInfo';
import * as Styled from './styled';
import MessagesIntlProvider from '../MessagesIntlProvider';
var DeleteUserContentPreviewScreen = /** @class */ (function (_super) {
    tslib_1.__extends(DeleteUserContentPreviewScreen, _super);
    function DeleteUserContentPreviewScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteUserContentPreviewScreen.prototype.render = function () {
        var user = this.props.user;
        return (React.createElement(MessagesIntlProvider, null,
            React.createElement(Styled.Screen, null,
                React.createElement(Styled.Title, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, contentPreviewMessages.heading))),
                React.createElement(UserInfo, { user: user }),
                "Content preview")));
    };
    return DeleteUserContentPreviewScreen;
}(React.Component));
export { DeleteUserContentPreviewScreen };
export default DeleteUserContentPreviewScreen;
//# sourceMappingURL=DeleteUserContentPreviewScreen.js.map