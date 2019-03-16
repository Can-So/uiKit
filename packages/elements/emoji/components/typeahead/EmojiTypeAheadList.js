import * as tslib_1 from "tslib";
import Spinner from '@atlaskit/spinner';
import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { emojiTypeAheadMaxHeight } from '../../shared-styles';
import { toEmojiId } from '../../type-helpers';
import debug from '../../util/logger';
import { actualMouseMove, mouseLocation } from '../../util/mouse';
import Scrollable from '../common/Scrollable';
import EmojiItem from './EmojiTypeAheadItem';
import * as styles from './styles';
function wrapIndex(emojis, index) {
    var len = emojis.length;
    var newIndex = index;
    while (newIndex < 0 && len > 0) {
        newIndex += len;
    }
    return newIndex % len;
}
function getKey(emoji) {
    return emoji.id || emoji.shortName + "-" + emoji.type;
}
function getKeyByIndex(emojis, index) {
    var emoji = emojis && emojis[index];
    if (emoji) {
        return getKey(emoji);
    }
    return undefined;
}
var EmojiTypeAheadList = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiTypeAheadList, _super);
    function EmojiTypeAheadList(props) {
        var _this = _super.call(this, props) || this;
        // API
        _this.selectNext = function () {
            var newIndex = wrapIndex(_this.props.emojis, _this.state.selectedIndex + 1);
            _this.selectIndex(newIndex);
        };
        _this.selectPrevious = function () {
            var newIndex = wrapIndex(_this.props.emojis, _this.state.selectedIndex - 1);
            _this.selectIndex(newIndex);
        };
        _this.chooseCurrentSelection = function () {
            var _a = _this.props, emojis = _a.emojis, onEmojiSelected = _a.onEmojiSelected;
            var selectedIndex = _this.state.selectedIndex;
            var selectedEmoji = emojis[selectedIndex];
            debug('ak-typeahead-list.chooseCurrentSelection', selectedEmoji);
            if (onEmojiSelected) {
                onEmojiSelected(toEmojiId(selectedEmoji), selectedEmoji);
            }
        };
        _this.selectIndexOnHover = function (emojiId, _emoji, event) {
            // TODO: fix this
            if (!event) {
                return;
            }
            var mousePosition = mouseLocation(event);
            if (actualMouseMove(_this.lastMousePosition, mousePosition)) {
                _this.selectByEmojiId(emojiId);
            }
            _this.lastMousePosition = mousePosition;
        };
        _this.itemSelected = function (emojiId) {
            _this.selectByEmojiId(emojiId, function () {
                _this.chooseCurrentSelection();
            });
        };
        _this.handleScrollableRef = function (ref) {
            _this.scrollable = ref;
        };
        _this.state = {
            selectedKey: getKeyByIndex(props.emojis, 0),
            selectedIndex: 0,
        };
        return _this;
    }
    EmojiTypeAheadList.prototype.componentWillReceiveProps = function (nextProps) {
        // adjust selection
        var emojis = nextProps.emojis;
        var selectedKey = this.state.selectedKey;
        if (!selectedKey) {
            // go with default of selecting first item
            return;
        }
        for (var i = 0; i < emojis.length; i++) {
            if (selectedKey === emojis[i].id) {
                this.setState({
                    selectedIndex: i,
                });
                return;
            }
        }
        // existing selection not in results, pick first
        this.selectIndexNewEmoji(0, emojis);
    };
    EmojiTypeAheadList.prototype.componentDidUpdate = function () {
        var emojis = this.props.emojis;
        var selectedIndex = this.state.selectedIndex;
        if (emojis && emojis[selectedIndex]) {
            var selectedEmoji = emojis[selectedIndex];
            this.revealItem(selectedEmoji.id || selectedEmoji.shortName);
        }
    };
    // Internal
    EmojiTypeAheadList.prototype.revealItem = function (key) {
        var item = this.items[key];
        if (item && this.scrollable) {
            this.scrollable.reveal(item);
        }
    };
    EmojiTypeAheadList.prototype.selectIndexNewEmoji = function (index, emojis) {
        this.setState({
            selectedIndex: index,
            selectedKey: getKeyByIndex(emojis, index),
        });
    };
    EmojiTypeAheadList.prototype.selectIndex = function (index, callback) {
        var emojis = this.props.emojis;
        this.setState({
            selectedIndex: index,
            selectedKey: getKeyByIndex(emojis, index),
        }, callback);
    };
    EmojiTypeAheadList.prototype.selectByEmojiId = function (emojiId, callback) {
        var emojis = this.props.emojis;
        for (var i = 0; i < emojis.length; i++) {
            var emoji = emojis[i];
            if (emoji.id === emojiId.id) {
                this.selectIndex(i, callback);
                return;
            }
        }
        for (var i = 0; i < emojis.length; i++) {
            var emoji = emojis[i];
            if (emoji.shortName === emojiId.shortName) {
                this.selectIndex(i, callback);
                return;
            }
        }
    };
    EmojiTypeAheadList.prototype.renderItems = function (emojis) {
        var _this = this;
        if (emojis && emojis.length) {
            this.items = {};
            return (React.createElement("div", null, emojis.map(function (emoji, idx) {
                var key = getKey(emoji);
                var item = (React.createElement(EmojiItem, { emoji: emoji, key: key, selected: _this.isSelectedEmoji(emoji, idx), onMouseMove: _this.selectIndexOnHover, onSelection: _this.itemSelected, 
                    // tslint:disable-next-line:jsx-no-lambda
                    ref: function (ref) {
                        if (ref) {
                            _this.items[key] = ref;
                        }
                        else {
                            delete _this.items[key];
                        }
                    } }));
                return item;
            })));
        }
        return null;
    };
    EmojiTypeAheadList.prototype.isSelectedEmoji = function (emoji, index) {
        var selectedKey = this.state.selectedKey;
        return selectedKey ? selectedKey === emoji.id : index === 0;
    };
    EmojiTypeAheadList.prototype.render = function () {
        var _a;
        var _b = this.props, emojis = _b.emojis, loading = _b.loading;
        var hasEmoji = emojis && emojis.length;
        var classes = classNames((_a = {
                'ak-emoji-typeahead-list': true
            },
            _a[styles.typeAheadList] = true,
            _a[styles.typeAheadEmpty] = !hasEmoji && !loading,
            _a));
        var listBody;
        if (loading) {
            listBody = (React.createElement("div", { className: styles.emojiTypeAheadSpinnerContainer },
                React.createElement("div", { className: styles.emojiTypeAheadSpinner },
                    React.createElement(Spinner, { size: "medium" }))));
        }
        else {
            listBody = this.renderItems(emojis);
        }
        return (React.createElement("div", { className: styles.typeAheadListContainer },
            React.createElement("div", { className: classes },
                React.createElement(Scrollable, { ref: this.handleScrollableRef, maxHeight: emojiTypeAheadMaxHeight + "px" }, listBody))));
    };
    EmojiTypeAheadList.defaultProps = {
        onEmojiSelected: function () { },
    };
    return EmojiTypeAheadList;
}(PureComponent));
export default EmojiTypeAheadList;
//# sourceMappingURL=EmojiTypeAheadList.js.map