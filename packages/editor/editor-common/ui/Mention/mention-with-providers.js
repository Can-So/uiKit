import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { ResourcedMention } from '@atlaskit/mention';
import ResourcedMentionWithProfilecard from './mention-with-profilecard';
var GENERIC_USER_IDS = ['HipChat', 'all', 'here'];
var noop = function () { };
var MentionWithProviders = /** @class */ (function (_super) {
    tslib_1.__extends(MentionWithProviders, _super);
    function MentionWithProviders() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { profilecardProvider: null };
        return _this;
    }
    MentionWithProviders.prototype.componentWillMount = function () {
        this.updateProfilecardProvider(this.props);
    };
    MentionWithProviders.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.profilecardProvider !== this.props.profilecardProvider) {
            this.updateProfilecardProvider(nextProps);
        }
    };
    MentionWithProviders.prototype.updateProfilecardProvider = function (props) {
        var _this = this;
        // We are not using async/await here to avoid having an intermediate Promise
        // introduced by the transpiler.
        // This will allow consumer to use a SynchronousPromise.resolve and avoid useless
        // rerendering
        if (props.profilecardProvider) {
            props.profilecardProvider
                .then(function (profilecardProvider) {
                _this.setState({ profilecardProvider: profilecardProvider });
            })
                .catch(function (err) {
                _this.setState({ profilecardProvider: null });
            });
        }
        else {
            this.setState({ profilecardProvider: null });
        }
    };
    MentionWithProviders.prototype.render = function () {
        var _a = this.props, accessLevel = _a.accessLevel, userType = _a.userType, eventHandlers = _a.eventHandlers, id = _a.id, mentionProvider = _a.mentionProvider, portal = _a.portal, text = _a.text;
        var profilecardProvider = this.state.profilecardProvider;
        var actionHandlers = {};
        ['onClick', 'onMouseEnter', 'onMouseLeave'].forEach(function (handler) {
            actionHandlers[handler] =
                (eventHandlers && eventHandlers[handler]) || noop;
        });
        // tslint:disable-next-line:variable-name
        var MentionComponent = profilecardProvider && GENERIC_USER_IDS.indexOf(id) === -1
            ? ResourcedMentionWithProfilecard
            : ResourcedMention;
        return (React.createElement(MentionComponent, tslib_1.__assign({ id: id, text: text, accessLevel: accessLevel, userType: userType, mentionProvider: mentionProvider, profilecardProvider: profilecardProvider, portal: portal }, actionHandlers)));
    };
    return MentionWithProviders;
}(PureComponent));
export default MentionWithProviders;
//# sourceMappingURL=mention-with-providers.js.map