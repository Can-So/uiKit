import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { ResourcedMention } from '@atlaskit/mention';
import { ProviderFactory, WithProviders, } from '@atlaskit/editor-common';
var Mention = /** @class */ (function (_super) {
    tslib_1.__extends(Mention, _super);
    function Mention(props) {
        var _this = _super.call(this, props) || this;
        _this.renderWithProvider = function (providers) {
            var _a = _this.props, accessLevel = _a.accessLevel, eventHandlers = _a.eventHandlers, id = _a.id, text = _a.text;
            var mentionProvider = providers.mentionProvider;
            var actionHandlers = {};
            ['onClick', 'onMouseEnter', 'onMouseLeave'].forEach(function (handler) {
                actionHandlers[handler] =
                    (eventHandlers && eventHandlers[handler]) || (function () { });
            });
            return (React.createElement(ResourcedMention, tslib_1.__assign({ id: id, text: text, accessLevel: accessLevel, mentionProvider: mentionProvider }, actionHandlers)));
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