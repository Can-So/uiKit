import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { Emoji } from '@atlaskit/editor-common';
var EmojiItem = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiItem, _super);
    function EmojiItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiItem.prototype.render = function () {
        var _a = this.props, id = _a.id, providers = _a.providers, shortName = _a.shortName, text = _a.text, fitToHeight = _a.fitToHeight;
        return (React.createElement(Emoji, { allowTextFallback: true, id: id, shortName: shortName, fallback: text, providers: providers, fitToHeight: fitToHeight }));
    };
    return EmojiItem;
}(PureComponent));
export default EmojiItem;
//# sourceMappingURL=emoji.js.map