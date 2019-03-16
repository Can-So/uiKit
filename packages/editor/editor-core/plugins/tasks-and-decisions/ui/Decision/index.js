import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { DecisionItem } from '@atlaskit/task-decision';
var messages = defineMessages({
    placeholder: {
        id: 'fabric.editor.decisionPlaceholder',
        defaultMessage: 'Add a decision…',
        description: 'Placeholder description for an empty decision in the editor',
    },
});
var Decision = /** @class */ (function (_super) {
    tslib_1.__extends(Decision, _super);
    function Decision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Decision.prototype.render = function () {
        var _a = this.props, contentRef = _a.contentRef, showPlaceholder = _a.showPlaceholder, formatMessage = _a.intl.formatMessage;
        var placeholder = formatMessage(messages.placeholder);
        return (React.createElement(DecisionItem, { contentRef: contentRef, placeholder: placeholder, showPlaceholder: showPlaceholder }));
    };
    return Decision;
}(React.Component));
export { Decision };
export default injectIntl(Decision);
//# sourceMappingURL=index.js.map