import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { defineMessages, injectIntl } from 'react-intl';
import { analyticsService } from '../../../../analytics';
import PanelTextInput from '../../../../ui/PanelTextInput';
import RecentList from './RecentList';
var Container = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  width: 420px;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n\n  ", ";\n  line-height: 2;\n\n  input {\n    padding: 8px;\n  }\n"], ["\n  width: 420px;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n\n  ",
    ";\n  line-height: 2;\n\n  input {\n    padding: 8px;\n  }\n"])), function (_a) {
    var provider = _a.provider;
    return css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      width: ", "px;\n    "], ["\n      width: ", "px;\n    "])), provider ? '420x' : '360');
});
export var messages = defineMessages({
    placeholder: {
        id: 'fabric.editor.hyperlinkToolbarPlaceholder',
        defaultMessage: 'Paste link or search recently viewed',
        description: 'Paste link or search recently viewed',
    },
    linkPlaceholder: {
        id: 'fabric.editor.linkPlaceholder',
        defaultMessage: 'Paste link',
        description: 'Create a new link by pasting a URL.',
    },
});
var RecentSearch = /** @class */ (function (_super) {
    tslib_1.__extends(RecentSearch, _super);
    function RecentSearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedIndex: -1,
            isLoading: false,
            text: '',
            items: [],
        };
        _this.updateInput = function (input) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.setState({ text: input });
                        if (!this.state.provider) return [3 /*break*/, 4];
                        if (!(input.length === 0)) return [3 /*break*/, 2];
                        _a = this.setState;
                        _b = {};
                        _c = limit;
                        return [4 /*yield*/, this.state.provider.getRecentItems()];
                    case 1:
                        _a.apply(this, [(_b.items = _c.apply(void 0, [_g.sent()]),
                                _b.selectedIndex = -1,
                                _b)]);
                        return [3 /*break*/, 4];
                    case 2:
                        _d = this.setState;
                        _e = {};
                        _f = limit;
                        return [4 /*yield*/, this.state.provider.searchRecent(input)];
                    case 3:
                        _d.apply(this, [(_e.items = _f.apply(void 0, [_g.sent()]),
                                _e.selectedIndex = 0,
                                _e)]);
                        _g.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.handleSelected = function (href, text) {
            if (_this.props.onSubmit) {
                _this.props.onSubmit(href, text);
                _this.trackAutoCompleteAnalyticsEvent('atlassian.editor.format.hyperlink.autocomplete.click');
            }
        };
        _this.handleMouseMove = function (objectId) {
            var items = _this.state.items;
            if (items) {
                var index = findIndex(items, function (item) { return item.objectId === objectId; });
                _this.setState({
                    selectedIndex: index,
                });
            }
        };
        _this.handleSubmit = function () {
            var _a = _this.state, items = _a.items, text = _a.text, selectedIndex = _a.selectedIndex;
            // add the link selected in the dropdown if there is one, otherwise submit the value of the input field
            if (items && items.length > 0 && selectedIndex > -1) {
                var item = items[selectedIndex];
                if (_this.props.onSubmit) {
                    _this.props.onSubmit(item.url, item.name);
                    _this.trackAutoCompleteAnalyticsEvent('atlassian.editor.format.hyperlink.autocomplete.keyboard');
                }
            }
            else if (text && text.length > 0) {
                if (_this.props.onSubmit) {
                    _this.props.onSubmit(text);
                    _this.trackAutoCompleteAnalyticsEvent('atlassian.editor.format.hyperlink.autocomplete.notselected');
                }
            }
        };
        _this.handleKeyDown = function (e) {
            var _a = _this.state, items = _a.items, selectedIndex = _a.selectedIndex;
            if (!items || !items.length) {
                return;
            }
            if (e.keyCode === 40) {
                // down
                e.preventDefault();
                _this.setState({
                    selectedIndex: (selectedIndex + 1) % items.length,
                });
            }
            else if (e.keyCode === 38) {
                // up
                e.preventDefault();
                _this.setState({
                    selectedIndex: selectedIndex > 0 ? selectedIndex - 1 : items.length - 1,
                });
            }
        };
        _this.handleBlur = function () {
            if (_this.props.onBlur) {
                _this.props.onBlur(_this.state.text);
            }
        };
        return _this;
    }
    RecentSearch.prototype.resolveProvider = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.provider];
                    case 1:
                        provider = _a.sent();
                        this.setState({ provider: provider });
                        return [2 /*return*/, provider];
                }
            });
        });
    };
    RecentSearch.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var activityProvider;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.provider) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.resolveProvider()];
                    case 1:
                        activityProvider = _a.sent();
                        this.loadRecentItems(activityProvider);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    RecentSearch.prototype.loadRecentItems = function (activityProvider) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, , 2, 3]);
                        this.setState({ isLoading: true });
                        _a = this.setState;
                        _b = {};
                        _c = limit;
                        return [4 /*yield*/, activityProvider.getRecentItems()];
                    case 1:
                        _a.apply(this, [(_b.items = _c.apply(void 0, [_d.sent()]), _b)]);
                        return [3 /*break*/, 3];
                    case 2:
                        this.setState({ isLoading: false });
                        return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecentSearch.prototype.render = function () {
        var _a = this.state, items = _a.items, isLoading = _a.isLoading, selectedIndex = _a.selectedIndex;
        var _b = this.props, formatMessage = _b.intl.formatMessage, provider = _b.provider;
        var placeholder = formatMessage(provider ? messages.placeholder : messages.linkPlaceholder);
        return (React.createElement(Container, { provider: !!provider },
            React.createElement(PanelTextInput, { placeholder: placeholder, autoFocus: true, onSubmit: this.handleSubmit, onChange: this.updateInput, onBlur: this.handleBlur, onCancel: this.handleBlur, onKeyDown: this.handleKeyDown }),
            React.createElement(RecentList, { items: items, isLoading: isLoading, selectedIndex: selectedIndex, onSelect: this.handleSelected, onMouseMove: this.handleMouseMove })));
    };
    RecentSearch.prototype.trackAutoCompleteAnalyticsEvent = function (name) {
        var numChars = this.state.text ? this.state.text.length : 0;
        analyticsService.trackEvent(name, { numChars: numChars });
    };
    return RecentSearch;
}(PureComponent));
var findIndex = function (array, predicate) {
    var index = -1;
    array.some(function (item, i) {
        if (predicate(item)) {
            index = i;
            return true;
        }
        return false;
    });
    return index;
};
var limit = function (items) {
    return items.slice(0, 5);
};
export default injectIntl(RecentSearch);
var templateObject_1, templateObject_2;
//# sourceMappingURL=LinkAddToolbar.js.map