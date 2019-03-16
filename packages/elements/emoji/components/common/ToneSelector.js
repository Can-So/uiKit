import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import EmojiButton from './EmojiButton';
import { withAnalytics } from '@atlaskit/analytics';
import { analyticsEmojiPrefix } from '../../constants';
var extractAllTones = function (emoji) {
    if (emoji.skinVariations) {
        return tslib_1.__spread([emoji], emoji.skinVariations);
    }
    return [emoji];
};
var ToneSelectorInternal = /** @class */ (function (_super) {
    tslib_1.__extends(ToneSelectorInternal, _super);
    function ToneSelectorInternal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onToneSelectedHandler = function (skinTone) {
            var _a = _this.props, onToneSelected = _a.onToneSelected, firePrivateAnalyticsEvent = _a.firePrivateAnalyticsEvent;
            onToneSelected(skinTone);
            if (firePrivateAnalyticsEvent) {
                firePrivateAnalyticsEvent(analyticsEmojiPrefix + ".skintone.select", {
                    skinTone: skinTone,
                });
            }
        };
        return _this;
    }
    ToneSelectorInternal.prototype.render = function () {
        var _this = this;
        var emoji = this.props.emoji;
        var toneEmojis = extractAllTones(emoji);
        return (React.createElement("div", null, toneEmojis.map(function (tone, i) { return (React.createElement(EmojiButton, { key: "" + tone.id, 
            // tslint:disable-next-line:jsx-no-lambda
            onSelected: function () { return _this.onToneSelectedHandler(i); }, emoji: tone, selectOnHover: true })); })));
    };
    return ToneSelectorInternal;
}(PureComponent));
export { ToneSelectorInternal };
// tslint:disable-next-line:variable-name
var ToneSelector = withAnalytics(ToneSelectorInternal, {}, {});
export default ToneSelector;
//# sourceMappingURL=ToneSelector.js.map