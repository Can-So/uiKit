import * as tslib_1 from "tslib";
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { openHelpCommand } from '../../plugins/help-dialog';
import { analyticsService } from '../../analytics';
import { analyticsEventKey, } from '../../plugins/analytics';
import { createDispatch } from '../../event-dispatcher';
var WithHelpTrigger = /** @class */ (function (_super) {
    tslib_1.__extends(WithHelpTrigger, _super);
    function WithHelpTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openHelp = function () {
            var editorActions = _this.context.editorActions;
            var dispatch = createDispatch(editorActions.eventDispatcher);
            dispatch(analyticsEventKey, {
                payload: {
                    action: "clicked" /* CLICKED */,
                    actionSubject: "button" /* BUTTON */,
                    actionSubjectId: "helpButton" /* BUTTON_HELP */,
                    attributes: { inputMethod: "toolbar" /* TOOLBAR */ },
                    eventType: "ui" /* UI */,
                },
            });
            analyticsService.trackEvent('atlassian.editor.help.button');
            var editorView = editorActions._privateGetEditorView();
            if (editorView) {
                openHelpCommand(editorView.state.tr, editorView.dispatch);
            }
        };
        return _this;
    }
    WithHelpTrigger.prototype.render = function () {
        return this.props.render(this.openHelp);
    };
    WithHelpTrigger.contextTypes = {
        editorActions: PropTypes.object.isRequired,
    };
    return WithHelpTrigger;
}(React.Component));
export default WithHelpTrigger;
//# sourceMappingURL=index.js.map