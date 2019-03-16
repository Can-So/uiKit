import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import MentionWithProviders from './mention-with-providers';
import { default as ProviderFactory, WithProviders, } from '../../providerFactory';
var Mention = /** @class */ (function (_super) {
    tslib_1.__extends(Mention, _super);
    function Mention(props) {
        var _this = _super.call(this, props) || this;
        _this.renderWithProvider = function (providers) {
            var _a = _this.props, accessLevel = _a.accessLevel, eventHandlers = _a.eventHandlers, id = _a.id, portal = _a.portal, text = _a.text;
            var mentionProvider = providers.mentionProvider, profilecardProvider = providers.profilecardProvider;
            return (React.createElement(MentionWithProviders, { id: id, text: text, accessLevel: accessLevel, eventHandlers: eventHandlers, mentionProvider: mentionProvider, profilecardProvider: profilecardProvider, portal: portal }));
        };
        _this.providerFactory = props.providers || new ProviderFactory();
        return _this;
    }
    Mention.prototype.componentWillUnmount = function () {
        if (!this.props.providers) {
            // new ProviderFactory is created if no `providers` has been set
            // in this case when component is unmounted it's safe to destroy this providerFactory
            this.providerFactory.destroy();
        }
    };
    Mention.prototype.render = function () {
        return (React.createElement(WithProviders, { providers: ['mentionProvider', 'profilecardProvider'], providerFactory: this.providerFactory, renderNode: this.renderWithProvider }));
    };
    return Mention;
}(PureComponent));
export default Mention;
//# sourceMappingURL=index.js.map