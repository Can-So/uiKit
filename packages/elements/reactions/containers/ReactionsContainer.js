import * as tslib_1 from "tslib";
import { FabricElementsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import * as React from 'react';
import { Reactions } from '../components/Reactions';
import { ReactionConsumer, } from '../reaction-store/ReactionConsumer';
import { ReactionStatus } from '../types/ReactionStatus';
var ReactionsContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ReactionsContainer, _super);
    function ReactionsContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderChild = function (props) {
            var _a = _this.props, containerAri = _a.containerAri, ari = _a.ari;
            return (React.createElement(FabricElementsAnalyticsContext, { data: { containerAri: containerAri, ari: ari } },
                React.createElement(Reactions, tslib_1.__assign({ key: _this.props.containerAri + "|" + _this.props.ari }, _this.props, props))));
        };
        _this.stateMapper = function (state) {
            var _a = _this.props, containerAri = _a.containerAri, ari = _a.ari;
            var reactionsState = state.reactions[containerAri + "|" + ari];
            if (!reactionsState) {
                return { status: ReactionStatus.notLoaded };
            }
            switch (reactionsState.status) {
                case ReactionStatus.ready:
                    return {
                        reactions: reactionsState.reactions,
                        status: reactionsState.status,
                        flash: state.flash[containerAri + "|" + ari],
                    };
                default:
                    return { status: ReactionStatus.loading };
            }
        };
        _this.actionsMapper = function (actions) { return ({
            loadReaction: function () {
                actions.getReactions(_this.props.containerAri, _this.props.ari);
            },
            onReactionClick: function (emojiId) {
                actions.toggleReaction(_this.props.containerAri, _this.props.ari, emojiId);
            },
            onReactionHover: function (emojiId) {
                actions.getDetailedReaction(_this.props.containerAri, _this.props.ari, emojiId);
            },
            onSelection: function (emojiId) {
                actions.addReaction(_this.props.containerAri, _this.props.ari, emojiId);
            },
        }); };
        return _this;
    }
    ReactionsContainer.prototype.render = function () {
        return (React.createElement(ReactionConsumer, { store: this.props.store, actionsMapper: this.actionsMapper, stateMapper: this.stateMapper }, this.renderChild));
    };
    return ReactionsContainer;
}(React.PureComponent));
export default ReactionsContainer;
//# sourceMappingURL=ReactionsContainer.js.map