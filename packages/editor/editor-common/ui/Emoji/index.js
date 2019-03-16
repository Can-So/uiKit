import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { ResourcedEmoji } from '@atlaskit/emoji';
import ProviderFactory, { WithProviders } from '../../providerFactory';
var EmojiNode = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiNode, _super);
    function EmojiNode(props) {
        var _this = _super.call(this, props) || this;
        _this.renderWithProvider = function (providers) {
            var _a = _this.props, allowTextFallback = _a.allowTextFallback, shortName = _a.shortName, id = _a.id, fallback = _a.fallback, fitToHeight = _a.fitToHeight;
            if (allowTextFallback && !providers.emojiProvider) {
                return React.createElement("span", null, fallback || shortName);
            }
            return (React.createElement(ResourcedEmoji, { emojiId: { id: id, fallback: fallback, shortName: shortName }, emojiProvider: providers.emojiProvider, showTooltip: true, fitToHeight: fitToHeight }));
        };
        _this.providerFactory = props.providers || new ProviderFactory();
        return _this;
    }
    EmojiNode.prototype.componentWillUnmount = function () {
        if (!this.props.providers) {
            // new ProviderFactory is created if no `providers` has been set
            // in this case when component is unmounted it's safe to destroy this providerFactory
            this.providerFactory.destroy();
        }
    };
    EmojiNode.prototype.render = function () {
        return (React.createElement(WithProviders, { providers: ['emojiProvider'], providerFactory: this.providerFactory, renderNode: this.renderWithProvider }));
    };
    return EmojiNode;
}(PureComponent));
export default EmojiNode;
//# sourceMappingURL=index.js.map