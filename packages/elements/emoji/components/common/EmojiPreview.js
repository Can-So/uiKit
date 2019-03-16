import * as tslib_1 from "tslib";
import AkButton from '@findable/button';
import AddIcon from '@findable/icon/glyph/add';
import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import CachingEmoji from '../../components/common/CachingEmoji';
import EmojiButton from '../../components/common/EmojiButton';
import { messages } from '../i18n';
import * as styles from './styles';
import ToneSelector from './ToneSelector';
var EmojiPreview = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiPreview, _super);
    function EmojiPreview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectingTone: false,
        };
        _this.onToneButtonClick = function () {
            _this.setState({
                selectingTone: true,
            });
        };
        _this.onToneSelected = function (toneValue) {
            _this.setState({
                selectingTone: false,
            });
            if (_this.props.onToneSelected) {
                _this.props.onToneSelected(toneValue);
            }
        };
        _this.onMouseLeave = function () {
            _this.setState({
                selectingTone: false,
            });
        };
        return _this;
    }
    EmojiPreview.prototype.renderTones = function () {
        var _this = this;
        var _a = this.props, toneEmoji = _a.toneEmoji, selectedTone = _a.selectedTone;
        if (!toneEmoji) {
            return null;
        }
        if (this.state.selectingTone) {
            return (React.createElement("div", { className: styles.toneSelectorContainer },
                React.createElement(ToneSelector, { emoji: toneEmoji, onToneSelected: this.onToneSelected })));
        }
        var previewEmoji = toneEmoji;
        if (selectedTone && previewEmoji.skinVariations) {
            previewEmoji = previewEmoji.skinVariations[(selectedTone || 1) - 1];
        }
        return (React.createElement("div", { className: styles.buttons },
            React.createElement(EmojiButton, { emoji: previewEmoji, 
                // tslint:disable-next-line:jsx-no-lambda
                onSelected: function () { return _this.onToneButtonClick(); }, selectOnHover: true })));
    };
    EmojiPreview.prototype.renderEmojiPreview = function () {
        var _a, _b;
        var selectingTone = this.state.selectingTone;
        var _c = this.props, emoji = _c.emoji, uploadEnabled = _c.uploadEnabled;
        if (!emoji || selectingTone || uploadEnabled) {
            return null;
        }
        var previewClasses = classNames((_a = {},
            _a[styles.preview] = true,
            _a[styles.withToneSelector] = !!this.props.toneEmoji,
            _a));
        var previewTextClasses = classNames((_b = {},
            _b[styles.previewText] = true,
            _b[styles.previewSingleLine] = !emoji.name,
            _b));
        return (React.createElement("div", { className: previewClasses },
            React.createElement("span", { className: styles.previewImg },
                React.createElement(CachingEmoji, { emoji: emoji })),
            React.createElement("div", { className: previewTextClasses },
                React.createElement("span", { className: styles.name }, emoji.name),
                React.createElement("span", { className: styles.shortName }, emoji.shortName))));
    };
    // note: emoji-picker-add-emoji className is used by pollinator synthetic checks
    EmojiPreview.prototype.renderAddOwnEmoji = function () {
        var _a = this.props, onOpenUpload = _a.onOpenUpload, uploadEnabled = _a.uploadEnabled;
        var selectingTone = this.state.selectingTone;
        if (!uploadEnabled || selectingTone) {
            return null;
        }
        return (React.createElement("div", { className: styles.AddCustomEmoji },
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.addCustomEmojiLabel), function (label) { return (React.createElement(AkButton, { onClick: onOpenUpload, iconBefore: React.createElement(AddIcon, { label: label, size: "small" }), appearance: "subtle", className: styles.addCustomEmojiButton + ' emoji-picker-add-emoji' }, label)); })));
    };
    EmojiPreview.prototype.render = function () {
        var sectionClasses = classNames([
            styles.emojiPreview,
            styles.emojiPreviewSection,
        ]);
        return (React.createElement("div", { className: sectionClasses, onMouseLeave: this.onMouseLeave },
            this.renderAddOwnEmoji(),
            this.renderEmojiPreview(),
            this.renderTones()));
    };
    return EmojiPreview;
}(PureComponent));
export default EmojiPreview;
//# sourceMappingURL=EmojiPreview.js.map