import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { Mention, } from '@atlaskit/editor-common';
var MentionItem = /** @class */ (function (_super) {
    tslib_1.__extends(MentionItem, _super);
    function MentionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MentionItem.prototype.render = function () {
        var _a = this.props, eventHandlers = _a.eventHandlers, id = _a.id, portal = _a.portal, providers = _a.providers, text = _a.text, accessLevel = _a.accessLevel;
        return (React.createElement(Mention, { id: id, text: text, accessLevel: accessLevel, providers: providers, portal: portal, eventHandlers: eventHandlers && eventHandlers.mention }));
    };
    return MentionItem;
}(PureComponent));
export default MentionItem;
//# sourceMappingURL=mention.js.map