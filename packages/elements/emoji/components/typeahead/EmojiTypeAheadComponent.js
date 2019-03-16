import * as tslib_1 from "tslib";
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { PureComponent } from 'react';
import { defaultListLimit } from '../../constants';
import { toEmojiId } from '../../type-helpers';
import { SearchSort, } from '../../types';
import debug from '../../util/logger';
import { createRecordSelectionDefault } from '../common/RecordSelectionDefault';
import EmojiList from './EmojiTypeAheadList';
import * as styles from './styles';
var isFullShortName = function (query) {
    return query &&
        query.length > 1 &&
        query.charAt(0) === ':' &&
        query.charAt(query.length - 1) === ':';
};
var uniqueExactShortNameMatchIndex = function (searchResult, query) {
    var e_1, _a;
    if (!query) {
        return undefined;
    }
    query = query.toLowerCase();
    var matchIndex;
    var index = 0;
    try {
        for (var _b = tslib_1.__values(searchResult.emojis), _c = _b.next(); !_c.done; _c = _b.next()) {
            var emoji = _c.value;
            if (query && emoji.shortName.toLowerCase() === query) {
                if (matchIndex === undefined) {
                    matchIndex = index;
                }
                else {
                    return;
                }
            }
            index++;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return matchIndex;
};
var EmojiTypeAheadComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiTypeAheadComponent, _super);
    function EmojiTypeAheadComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.emojiListRef = null;
        _this.selectNext = function () {
            if (_this.emojiListRef) {
                _this.emojiListRef.selectNext();
            }
        };
        _this.selectPrevious = function () {
            if (_this.emojiListRef) {
                _this.emojiListRef.selectPrevious();
            }
        };
        _this.chooseCurrentSelection = function () {
            if (_this.emojiListRef) {
                _this.emojiListRef.chooseCurrentSelection();
            }
        };
        _this.count = function () {
            var emojis = _this.state.emojis;
            return (emojis && emojis.length) || 0;
        };
        _this.onSearchResult = function (result) {
            var emojis = result.emojis, query = result.query;
            var wasVisible = _this.state.visible;
            var visible = emojis.length > 0;
            debug('emoji-typeahead.applyPropChanges', emojis.length, wasVisible, visible);
            _this.setState({
                emojis: emojis,
                visible: visible,
                loading: false,
            });
            if (isFullShortName(query)) {
                var matchIndex = uniqueExactShortNameMatchIndex(result, query);
                if (matchIndex !== undefined) {
                    var onSelect = createRecordSelectionDefault(_this.props.emojiProvider, _this.props.onSelection);
                    onSelect(toEmojiId(result.emojis[matchIndex]), result.emojis[matchIndex]);
                }
            }
            if (wasVisible !== visible) {
                if (visible) {
                    if (_this.props.onOpen) {
                        _this.props.onOpen();
                    }
                }
                else {
                    if (_this.props.onClose) {
                        _this.props.onClose();
                    }
                }
            }
        };
        _this.onProviderChange = {
            result: _this.onSearchResult,
        };
        _this.onEmojiListRef = function (ref) {
            _this.emojiListRef = ref;
        };
        _this.state = {
            visible: true,
            emojis: [],
            loading: true,
            selectedTone: props.emojiProvider.getSelectedTone(),
        };
        if (_this.props.onOpen) {
            _this.props.onOpen();
        }
        return _this;
    }
    EmojiTypeAheadComponent.prototype.getChildContext = function () {
        return {
            emoji: {
                emojiProvider: this.props.emojiProvider,
            },
        };
    };
    EmojiTypeAheadComponent.prototype.componentDidMount = function () {
        var emojiProvider = this.props.emojiProvider;
        emojiProvider.subscribe(this.onProviderChange);
        this.onSearch(this.props.query);
    };
    EmojiTypeAheadComponent.prototype.componentWillUnmount = function () {
        var emojiProvider = this.props.emojiProvider;
        emojiProvider.unsubscribe(this.onProviderChange);
    };
    EmojiTypeAheadComponent.prototype.componentWillReceiveProps = function (nextProps) {
        var prevEmojiProvider = this.props.emojiProvider;
        var nextEmojiProvider = nextProps.emojiProvider;
        if (prevEmojiProvider !== nextEmojiProvider) {
            prevEmojiProvider.unsubscribe(this.onProviderChange);
            nextEmojiProvider.subscribe(this.onProviderChange);
            this.onSearch(nextProps.query);
        }
        else if (this.props.query !== nextProps.query) {
            this.onSearch(nextProps.query);
        }
    };
    EmojiTypeAheadComponent.prototype.onSearch = function (query) {
        var _a = this.props, emojiProvider = _a.emojiProvider, listLimit = _a.listLimit;
        var options = {
            limit: listLimit || defaultListLimit,
            skinTone: this.state.selectedTone,
        };
        if (query && query.replace(':', '').length > 0) {
            options.sort = SearchSort.Default;
        }
        else {
            // if empty query (i.e. typeahead triggered only) then only sort by usage
            options.sort = SearchSort.UsageFrequency;
        }
        emojiProvider.filter(query, options);
    };
    EmojiTypeAheadComponent.prototype.render = function () {
        var _a = this.props, emojiProvider = _a.emojiProvider, onSelection = _a.onSelection;
        var recordUsageOnSelection = createRecordSelectionDefault(emojiProvider, onSelection);
        var _b = this.state, visible = _b.visible, emojis = _b.emojis, loading = _b.loading;
        var style = {
            display: visible ? 'block' : 'none',
        };
        var classes = classNames(['ak-emoji-typeahead', styles.emojiTypeAhead]);
        return (React.createElement("div", { style: style, className: classes },
            React.createElement(EmojiList, { emojis: emojis, onEmojiSelected: recordUsageOnSelection, ref: this.onEmojiListRef, loading: loading })));
    };
    EmojiTypeAheadComponent.childContextTypes = {
        emoji: PropTypes.object,
    };
    EmojiTypeAheadComponent.defaultProps = {
        onSelection: function () { },
        onOpen: function () { },
        onClose: function () { },
        listLimit: defaultListLimit,
    };
    return EmojiTypeAheadComponent;
}(PureComponent));
export default EmojiTypeAheadComponent;
//# sourceMappingURL=EmojiTypeAheadComponent.js.map