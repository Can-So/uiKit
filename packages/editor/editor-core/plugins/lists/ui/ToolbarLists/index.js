import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import BulletListIcon from '@findable/icon/glyph/editor/bullet-list';
import NumberListIcon from '@findable/icon/glyph/editor/number-list';
import ExpandIcon from '@findable/icon/glyph/chevron-down';
import { withAnalytics } from '../../../../analytics';
import { toggleBulletList as toggleBulletListKeymap, toggleOrderedList as toggleOrderedListKeymap, tooltip, } from '../../../../keymaps';
import ToolbarButton from '../../../../ui/ToolbarButton';
import DropdownMenu from '../../../../ui/DropdownMenu';
import { ButtonGroup, Separator, Wrapper, ExpandIconWrapper, Shortcut, } from '../../../../ui/styles';
import { toggleBulletList, toggleOrderedList } from '../../commands';
import { messages } from '../../messages';
var ToolbarLists = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarLists, _super);
    function ToolbarLists() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isDropdownOpen: false,
        };
        _this.onOpenChange = function (attrs) {
            _this.setState({
                isDropdownOpen: attrs.isDropdownOpen,
            });
        };
        _this.handleTriggerClick = function () {
            _this.onOpenChange({ isDropdownOpen: !_this.state.isDropdownOpen });
        };
        _this.createItems = function () {
            var _a = _this.props, bulletListDisabled = _a.bulletListDisabled, orderedListDisabled = _a.orderedListDisabled, bulletListActive = _a.bulletListActive, orderedListActive = _a.orderedListActive, formatMessage = _a.intl.formatMessage;
            var labelUnorderedList = formatMessage(messages.unorderedList);
            var labelOrderedList = formatMessage(messages.orderedList);
            var items = [
                {
                    key: 'unorderedList',
                    content: labelUnorderedList,
                    value: { name: 'bullet_list' },
                    isDisabled: bulletListDisabled,
                    isActive: Boolean(bulletListActive),
                    elemAfter: React.createElement(Shortcut, null, tooltip(toggleBulletListKeymap)),
                },
                {
                    key: 'orderedList',
                    content: labelOrderedList,
                    value: { name: 'ordered_list' },
                    isDisabled: orderedListDisabled,
                    isActive: Boolean(orderedListActive),
                    elemAfter: React.createElement(Shortcut, null, tooltip(toggleOrderedListKeymap)),
                },
            ];
            return [{ items: items }];
        };
        _this.handleBulletListClick = withAnalytics('atlassian.editor.format.list.bullet.button', function () {
            if (!_this.props.bulletListDisabled) {
                if (toggleBulletList(_this.props.editorView)) {
                    if (_this.props.dispatchAnalyticsEvent) {
                        _this.props.dispatchAnalyticsEvent({
                            action: "formatted" /* FORMATTED */,
                            actionSubject: "text" /* TEXT */,
                            actionSubjectId: "bulletedList" /* FORMAT_LIST_BULLET */,
                            eventType: "track" /* TRACK */,
                            attributes: {
                                inputMethod: "toolbar" /* TOOLBAR */,
                            },
                        });
                    }
                    return true;
                }
            }
            return false;
        });
        _this.handleOrderedListClick = withAnalytics('atlassian.editor.format.list.numbered.button', function () {
            if (!_this.props.orderedListDisabled) {
                if (toggleOrderedList(_this.props.editorView)) {
                    if (_this.props.dispatchAnalyticsEvent) {
                        _this.props.dispatchAnalyticsEvent({
                            action: "formatted" /* FORMATTED */,
                            actionSubject: "text" /* TEXT */,
                            actionSubjectId: "numberedList" /* FORMAT_LIST_NUMBER */,
                            eventType: "track" /* TRACK */,
                            attributes: {
                                inputMethod: "toolbar" /* TOOLBAR */,
                            },
                        });
                    }
                    return true;
                }
            }
            return false;
        });
        _this.onItemActivated = function (_a) {
            var item = _a.item;
            _this.setState({ isDropdownOpen: false });
            switch (item.value.name) {
                case 'bullet_list':
                    _this.handleBulletListClick();
                    break;
                case 'ordered_list':
                    _this.handleOrderedListClick();
                    break;
            }
        };
        return _this;
    }
    ToolbarLists.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, isSmall = _a.isSmall, isReducedSpacing = _a.isReducedSpacing, isSeparator = _a.isSeparator, bulletListActive = _a.bulletListActive, bulletListDisabled = _a.bulletListDisabled, orderedListActive = _a.orderedListActive, orderedListDisabled = _a.orderedListDisabled, formatMessage = _a.intl.formatMessage;
        var isDropdownOpen = this.state.isDropdownOpen;
        if (!isSmall) {
            var labelUnorderedList = formatMessage(messages.unorderedList);
            var labelOrderedList = formatMessage(messages.orderedList);
            return (React.createElement(ButtonGroup, { width: isReducedSpacing ? 'small' : 'large' },
                React.createElement(ToolbarButton, { spacing: isReducedSpacing ? 'none' : 'default', onClick: this.handleBulletListClick, selected: bulletListActive, disabled: bulletListDisabled || disabled, title: tooltip(toggleBulletListKeymap, labelUnorderedList), iconBefore: React.createElement(BulletListIcon, { label: labelUnorderedList }) }),
                React.createElement(ToolbarButton, { spacing: isReducedSpacing ? 'none' : 'default', onClick: this.handleOrderedListClick, selected: orderedListActive, disabled: orderedListDisabled || disabled, title: tooltip(toggleOrderedListKeymap, labelOrderedList), iconBefore: React.createElement(NumberListIcon, { label: labelOrderedList }) }),
                isSeparator && React.createElement(Separator, null)));
        }
        else {
            var items = this.createItems();
            var _b = this.props, popupsMountPoint = _b.popupsMountPoint, popupsBoundariesElement = _b.popupsBoundariesElement, popupsScrollableElement = _b.popupsScrollableElement;
            var labelLists = formatMessage(messages.lists);
            return (React.createElement(Wrapper, null,
                React.createElement(DropdownMenu, { items: items, onItemActivated: this.onItemActivated, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, isOpen: isDropdownOpen, onOpenChange: this.onOpenChange, fitHeight: 188, fitWidth: 175 },
                    React.createElement(ToolbarButton, { spacing: isReducedSpacing ? 'none' : 'default', selected: bulletListActive || orderedListActive, disabled: disabled, onClick: this.handleTriggerClick, title: labelLists, iconBefore: React.createElement(Wrapper, null,
                            React.createElement(BulletListIcon, { label: labelLists }),
                            React.createElement(ExpandIconWrapper, null,
                                React.createElement(ExpandIcon, { label: labelLists }))) })),
                isSeparator && React.createElement(Separator, null)));
        }
    };
    return ToolbarLists;
}(PureComponent));
export default injectIntl(ToolbarLists);
//# sourceMappingURL=index.js.map