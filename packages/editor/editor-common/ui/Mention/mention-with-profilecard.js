import * as tslib_1 from "tslib";
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { PureComponent } from 'react';
import { ResourcedMention } from '@atlaskit/mention';
import ProfileCard from '@atlaskit/profilecard';
import Popup from '../Popup';
import withOuterListeners from '../with-outer-listeners';
// tslint:disable-next-line:variable-name
var ProfilecardResourcedWithListeners = withOuterListeners(ProfileCard);
var MentionWithProfileCard = /** @class */ (function (_super) {
    tslib_1.__extends(MentionWithProfileCard, _super);
    function MentionWithProfileCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            target: null,
            visible: false,
            popupAlignX: 'left',
            popupAlignY: 'top',
        };
        _this.handleRef = function (target) {
            _this.setState({ target: target });
        };
        _this.handleMentionNodeRef = function (component) {
            if (!component) {
                _this.domNode = null;
            }
            else {
                _this.domNode = findDOMNode(component);
            }
        };
        _this.showProfilecard = function () {
            if (!_this.domNode) {
                return;
            }
            var _a = tslib_1.__read(_this.calculateLayerPosition(), 2), popupAlignX = _a[0], popupAlignY = _a[1];
            _this.setState({
                popupAlignX: popupAlignX,
                popupAlignY: popupAlignY,
                visible: true,
            });
        };
        _this.hideProfilecard = function () {
            _this.setState({ visible: false });
        };
        return _this;
    }
    MentionWithProfileCard.prototype.calculateLayerPosition = function () {
        var domNodeCentreCoords = this.getDomNodeCenterCoords();
        var visibleAreaCentreCoords = this.getVisibleAreaCentreCoords();
        var popupAlignY = domNodeCentreCoords.y > visibleAreaCentreCoords.y ? 'top' : 'bottom';
        var popupAlignX = domNodeCentreCoords.x > visibleAreaCentreCoords.x ? 'right' : 'left';
        return [popupAlignX, popupAlignY];
    };
    MentionWithProfileCard.prototype.getDomNodeCenterCoords = function () {
        var rect = this.domNode.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
    };
    MentionWithProfileCard.prototype.getVisibleAreaCentreCoords = function () {
        return {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };
    };
    MentionWithProfileCard.prototype.getActions = function (id, text, accessLevel) {
        var _this = this;
        var profilecardProvider = this.props.profilecardProvider;
        var actions = profilecardProvider.getActions(id, text, accessLevel);
        return actions.map(function (action) {
            return tslib_1.__assign({}, action, { callback: function () {
                    _this.setState({ visible: false });
                    action.callback();
                } });
        });
    };
    MentionWithProfileCard.prototype.render = function () {
        var _a = this.props, accessLevel = _a.accessLevel, id = _a.id, mentionProvider = _a.mentionProvider, profilecardProvider = _a.profilecardProvider, text = _a.text, onClick = _a.onClick, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, portal = _a.portal;
        var _b = this.state, popupAlignX = _b.popupAlignX, popupAlignY = _b.popupAlignY, target = _b.target, visible = _b.visible;
        var cloudId = profilecardProvider.cloudId, resourceClient = profilecardProvider.resourceClient;
        return (React.createElement("span", { ref: this.handleRef, onClick: this.showProfilecard },
            React.createElement(ResourcedMention, { ref: this.handleMentionNodeRef, id: id, text: text, accessLevel: accessLevel, mentionProvider: mentionProvider, onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave }),
            target && portal && visible && (React.createElement(Popup, { offset: [0, 8], target: target, mountTo: portal, alignX: popupAlignX, alignY: popupAlignY },
                React.createElement(ProfilecardResourcedWithListeners, { handleClickOutside: this.hideProfilecard, handleEscapeKeydown: this.hideProfilecard, cloudId: cloudId, userId: id, resourceClient: resourceClient, actions: this.getActions(id, text, accessLevel) })))));
    };
    return MentionWithProfileCard;
}(PureComponent));
export default MentionWithProfileCard;
//# sourceMappingURL=mention-with-profilecard.js.map