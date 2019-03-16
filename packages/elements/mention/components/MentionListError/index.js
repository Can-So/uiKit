import * as tslib_1 from "tslib";
import * as React from 'react';
import { DefaultAdvisedAction, DefaultHeadline, DifferentText, LoginAgain, } from '../../util/i18n';
import { GenericErrorIllustration } from './GenericErrorIllustration';
import { MentionListAdviceStyle, MentionListErrorHeadlineStyle, MentionListErrorStyle, } from './styles';
var advisedActionMessages = {
    '401': LoginAgain,
    '403': DifferentText,
    default: DefaultAdvisedAction,
};
var MentionListError = /** @class */ (function (_super) {
    tslib_1.__extends(MentionListError, _super);
    function MentionListError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Translate the supplied Error into a message suitable for display in the MentionList.
     *
     * @param error the error to be displayed
     */
    MentionListError.getAdvisedActionMessage = function (error) {
        if (error && error.hasOwnProperty('statusCode')) {
            var httpError = error;
            return (advisedActionMessages[httpError.statusCode.toString()] ||
                advisedActionMessages.default);
        }
        return advisedActionMessages.default;
    };
    MentionListError.prototype.render = function () {
        var error = this.props.error;
        var ErrorMessage = MentionListError.getAdvisedActionMessage(error);
        return (React.createElement(MentionListErrorStyle, null,
            React.createElement(GenericErrorIllustration, null),
            React.createElement(MentionListErrorHeadlineStyle, null,
                React.createElement(DefaultHeadline, null)),
            React.createElement(MentionListAdviceStyle, null,
                React.createElement(ErrorMessage, null))));
    };
    return MentionListError;
}(React.PureComponent));
export default MentionListError;
//# sourceMappingURL=index.js.map