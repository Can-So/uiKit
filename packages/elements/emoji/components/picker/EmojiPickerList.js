import * as tslib_1 from "tslib";
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { PureComponent } from 'react';
import { List as VirtualList } from 'react-virtualized/dist/commonjs/List';
import { customCategory, userCustomTitle } from '../../constants';
import { CategoryDescriptionMap, } from './categories';
import CategoryTracker from './CategoryTracker';
import { sizes } from './EmojiPickerSizes';
import { CategoryHeadingItem, EmojisRowItem, LoadingItem, SearchItem, virtualItemRenderer, } from './EmojiPickerVirtualItems';
import * as styles from './styles';
var categoryClassname = 'emoji-category';
var byOrder = function (orderableA, orderableB) {
    return (orderableA.order || 0) - (orderableB.order || 0);
};
var EmojiPickerVirtualList = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiPickerVirtualList, _super);
    function EmojiPickerVirtualList(props) {
        var _this = _super.call(this, props) || this;
        _this.virtualItems = [];
        _this.categoryTracker = new CategoryTracker();
        _this.onEmojiMouseEnter = function (emojiId, emoji) {
            if (_this.props.onEmojiActive) {
                _this.props.onEmojiActive(emojiId, emoji);
            }
        };
        _this.onSearch = function (e) {
            if (_this.props.onSearch) {
                _this.props.onSearch(e.target.value);
            }
        };
        _this.buildVirtualItemFromGroup = function (group) {
            var _a = _this.props, onEmojiSelected = _a.onEmojiSelected, onEmojiDelete = _a.onEmojiDelete;
            var items = [];
            items.push(new CategoryHeadingItem({
                id: group.category,
                title: group.title,
                className: categoryClassname,
            }));
            var remainingEmojis = group.emojis;
            while (remainingEmojis.length > 0) {
                var rowEmojis = remainingEmojis.slice(0, sizes.emojiPerRow);
                remainingEmojis = remainingEmojis.slice(sizes.emojiPerRow);
                items.push(new EmojisRowItem({
                    emojis: rowEmojis,
                    title: group.title,
                    showDelete: group.title === userCustomTitle,
                    onSelected: onEmojiSelected,
                    onDelete: onEmojiDelete,
                    onMouseMove: _this.onEmojiMouseEnter,
                }));
            }
            return items;
        };
        _this.buildVirtualItems = function (props, _state) {
            var emojis = props.emojis, loading = props.loading, query = props.query;
            var items = [];
            _this.categoryTracker.reset();
            items.push(new SearchItem({
                onChange: _this.onSearch,
                query: query,
            }));
            if (loading) {
                items.push(new LoadingItem());
            }
            else {
                if (query) {
                    var search = CategoryDescriptionMap.SEARCH;
                    // Only a single "result" category
                    items = tslib_1.__spread(items, _this.buildVirtualItemFromGroup({
                        category: 'SEARCH',
                        title: search.name,
                        emojis: emojis,
                        order: search.order,
                    }));
                }
                else {
                    // Group by category
                    // Not searching show in categories.
                    _this.allEmojiGroups.forEach(function (group) {
                        // Optimisation - avoid re-rendering unaffected groups for the current selectedShortcut
                        // by not passing it to irrelevant groups
                        _this.categoryTracker.add(group.emojis[0].category, items.length);
                        items = tslib_1.__spread(items, _this.buildVirtualItemFromGroup(group));
                    });
                }
            }
            var rowCountChanged = _this.virtualItems.length !== items.length;
            _this.virtualItems = items;
            var list = _this.refs.list;
            if (!rowCountChanged && list) {
                // Row count has not changed, so need to tell list to rerender.
                list.forceUpdateGrid();
            }
            if (!query && list) {
                // VirtualList can apply stale heights since it performs a shallow
                // compare to check if the list has changed. Should manually recompute
                // row heights for the case when frequent category come in later
                list.recomputeRowHeights();
            }
        };
        _this.addToCategoryMap = function (categoryToGroupMap, emoji, category) {
            if (!categoryToGroupMap[category]) {
                var categoryDefinition = CategoryDescriptionMap[category];
                categoryToGroupMap[category] = {
                    emojis: [],
                    title: categoryDefinition.name,
                    category: category,
                    order: categoryDefinition.order,
                };
            }
            categoryToGroupMap[category].emojis.push(emoji);
            return categoryToGroupMap;
        };
        _this.groupByCategory = function (currentUser) { return function (categoryToGroupMap, emoji) {
            _this.addToCategoryMap(categoryToGroupMap, emoji, emoji.category);
            // separate user emojis
            if (emoji.category === customCategory &&
                currentUser &&
                emoji.creatorUserId === currentUser.id) {
                _this.addToCategoryMap(categoryToGroupMap, emoji, 'USER_CUSTOM');
            }
            return categoryToGroupMap;
        }; };
        _this.buildEmojiGroupedByCategory = function (emojis, currentUser) {
            var categoryToGroupMap = emojis.reduce(_this.groupByCategory(currentUser), {});
            _this.allEmojiGroups = Object.keys(categoryToGroupMap)
                .map(function (key) { return categoryToGroupMap[key]; })
                .map(function (group) {
                if (group.category !== 'FREQUENT') {
                    group.emojis.sort(byOrder);
                }
                return group;
            })
                .sort(byOrder);
        };
        _this.repaintList = function () {
            if (_this.refs.root) {
                var root = _this.refs.root;
                var display = root.style.display;
                root.style.display = 'none';
                // tslint:disable-next-line:no-unused-expression no-unused-variable we need to access offset to force repaint
                root.offsetHeight;
                root.style.display = display;
            }
        };
        /**
         * Checks if list is showing a new CategoryId
         * to inform selector to change active category
         */
        _this.checkCategoryIdChange = function (indexes) {
            var startIndex = indexes.startIndex;
            // FS-1844 Fix a rendering problem when scrolling to the top
            if (startIndex === 0) {
                _this.repaintList();
            }
            if (!_this.props.query) {
                // Calculate category in view - only relevant if categories shown, i.e. no query
                var list = _this.refs.list;
                var currentCategory = _this.categoryTracker.findNearestCategoryAbove(startIndex, list);
                if (currentCategory && _this.activeCategoryId !== currentCategory) {
                    _this.activeCategoryId = currentCategory;
                    if (_this.props.onCategoryActivated) {
                        _this.props.onCategoryActivated(currentCategory);
                    }
                }
            }
        };
        _this.rowSize = function (_a) {
            var index = _a.index;
            return _this.virtualItems[index].height;
        };
        _this.renderRow = function (context) {
            return virtualItemRenderer(_this.virtualItems, context);
        };
        _this.buildEmojiGroupedByCategory(props.emojis, props.currentUser);
        _this.buildVirtualItems(props, _this.state);
        return _this;
    }
    EmojiPickerVirtualList.prototype.getChildContext = function () {
        var emoji = this.context.emoji;
        return {
            emoji: tslib_1.__assign({}, emoji),
        };
    };
    EmojiPickerVirtualList.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (this.props.emojis !== nextProps.emojis ||
            this.props.selectedTone !== nextProps.selectedTone ||
            this.props.loading !== nextProps.loading ||
            this.props.query !== nextProps.query) {
            if (!nextProps.query) {
                // Only refresh if no query
                this.buildEmojiGroupedByCategory(nextProps.emojis, nextProps.currentUser);
            }
            this.buildVirtualItems(nextProps, nextState);
        }
    };
    /**
     * Scrolls to a category in the list view
     */
    EmojiPickerVirtualList.prototype.reveal = function (category) {
        var row = this.categoryTracker.getRow(category);
        var list = this.refs.list;
        list.scrollToRow(row);
    };
    EmojiPickerVirtualList.prototype.scrollToBottom = function () {
        var list = this.refs.list;
        list.scrollToRow(this.virtualItems.length);
    };
    EmojiPickerVirtualList.prototype.render = function () {
        var _a = this.props, onMouseLeave = _a.onMouseLeave, onMouseEnter = _a.onMouseEnter;
        var classes = [styles.emojiPickerList];
        return (React.createElement("div", { ref: "root", className: classNames(classes), onMouseLeave: onMouseLeave, onMouseEnter: onMouseEnter },
            React.createElement(VirtualList, { ref: "list", height: sizes.listHeight, overscanRowCount: 5, rowCount: this.virtualItems.length, rowHeight: this.rowSize, rowRenderer: this.renderRow, scrollToAlignment: "start", width: sizes.listWidth, className: styles.virtualList, onRowsRendered: this.checkCategoryIdChange })));
    };
    EmojiPickerVirtualList.contextTypes = {
        emoji: PropTypes.object,
    };
    EmojiPickerVirtualList.childContextTypes = {
        emoji: PropTypes.object,
    };
    EmojiPickerVirtualList.defaultProps = {
        onEmojiSelected: function () { },
        onEmojiActive: function () { },
        onEmojiDelete: function () { },
        onCategoryActivated: function () { },
        onSearch: function () { },
    };
    return EmojiPickerVirtualList;
}(PureComponent));
export default EmojiPickerVirtualList;
//# sourceMappingURL=EmojiPickerList.js.map