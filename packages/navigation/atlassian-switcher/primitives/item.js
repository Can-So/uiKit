import * as tslib_1 from "tslib";
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import Item, { itemThemeNamespace } from '@findable/item';
import { gridSize } from '@findable/theme';
import { createAndFireNavigationEvent, withAnalyticsEvents, UI_EVENT_TYPE, SWITCHER_ITEM_SUBJECT, } from '../utils/analytics';
import { FadeIn } from './fade-in';
var itemTheme = {
    padding: {
        default: {
            bottom: gridSize(),
            left: gridSize(),
            top: gridSize(),
            right: gridSize(),
        },
    },
};
var SwitcherItem = /** @class */ (function (_super) {
    tslib_1.__extends(SwitcherItem, _super);
    function SwitcherItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitcherItem.prototype.render = function () {
        var _a;
        var _b = this.props, icon = _b.icon, description = _b.description, rest = tslib_1.__rest(_b, ["icon", "description"]);
        return (React.createElement(FadeIn, null,
            React.createElement(ThemeProvider, { theme: (_a = {}, _a[itemThemeNamespace] = itemTheme, _a) },
                React.createElement(Item, tslib_1.__assign({ elemBefore: icon, description: description }, rest)))));
    };
    return SwitcherItem;
}(React.Component));
var SwitcherItemWithEvents = withAnalyticsEvents({
    onClick: createAndFireNavigationEvent({
        eventType: UI_EVENT_TYPE,
        action: 'clicked',
        actionSubject: SWITCHER_ITEM_SUBJECT,
    }),
})(SwitcherItem);
export default SwitcherItemWithEvents;
//# sourceMappingURL=item.js.map