import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import Participants from './Participants';
import { AttributionWrapper, CardHeadingWrapper, ContentWrapper, ParticipantWrapper, Wrapper, } from '../styled/Item';
import { Placeholder } from '../styled/Placeholder';
var Item = /** @class */ (function (_super) {
    tslib_1.__extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.prototype.renderPlaceholder = function () {
        var _a = this.props, children = _a.children, placeholder = _a.placeholder, showPlaceholder = _a.showPlaceholder;
        if (!showPlaceholder || !placeholder || children) {
            return null;
        }
        return React.createElement(Placeholder, { contentEditable: false }, placeholder);
    };
    Item.prototype.renderParticipants = function () {
        var _a = this.props, appearance = _a.appearance, _b = _a.participants, participants = _b === void 0 ? [] : _b;
        if (appearance === 'inline' || !participants.length) {
            return null;
        }
        return (React.createElement(ParticipantWrapper, null,
            React.createElement(Participants, { participants: participants })));
    };
    Item.prototype.renderAttribution = function () {
        var attribution = this.props.attribution;
        if (!attribution) {
            return null;
        }
        return React.createElement(AttributionWrapper, null, attribution);
    };
    Item.prototype.renderCardAppearance = function () {
        var _a = this.props, appearance = _a.appearance, contentRef = _a.contentRef, children = _a.children, icon = _a.icon;
        return (React.createElement(Wrapper, { appearance: appearance },
            React.createElement(CardHeadingWrapper, null,
                icon,
                this.renderParticipants(),
                this.renderPlaceholder()),
            React.createElement(ContentWrapper, { innerRef: contentRef }, children),
            this.renderAttribution()));
    };
    Item.prototype.renderMessageAppearance = function () {
        var _a = this.props, appearance = _a.appearance, contentRef = _a.contentRef, children = _a.children, icon = _a.icon;
        return (React.createElement(Wrapper, { appearance: appearance },
            icon,
            this.renderPlaceholder(),
            React.createElement(ContentWrapper, { innerRef: contentRef }, children)));
    };
    Item.prototype.render = function () {
        var appearance = this.props.appearance;
        if (appearance === 'card') {
            return this.renderCardAppearance();
        }
        return this.renderMessageAppearance();
    };
    Item.defaultProps = {
        appearance: 'inline',
    };
    return Item;
}(PureComponent));
export default Item;
//# sourceMappingURL=Item.js.map