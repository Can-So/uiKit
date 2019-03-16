import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import Spinner from '@atlaskit/spinner';
import styled from 'styled-components';
import RecentItem from './RecentItem';
// tslint:disable-next-line:variable-name
var Container = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  padding-top: 10px;\n"], ["\n  padding-top: 10px;\n"])));
var ListContainer = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  padding-top: 0;\n"], ["\n  padding-top: 0;\n"])));
// tslint:disable-next-line:variable-name
var SpinnerContainer = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  text-align: center;\n  min-height: 80px;\n  margin-top: 30px;\n"], ["\n  text-align: center;\n  min-height: 80px;\n  margin-top: 30px;\n"])));
// tslint:disable:next-line variable-name
var List = styled.ul(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  padding: 0;\n  list-style: none;\n"], ["\n  padding: 0;\n  list-style: none;\n"])));
var RecentList = /** @class */ (function (_super) {
    tslib_1.__extends(RecentList, _super);
    function RecentList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecentList.prototype.render = function () {
        var _a = this.props, onSelect = _a.onSelect, onMouseMove = _a.onMouseMove, items = _a.items, selectedIndex = _a.selectedIndex, isLoading = _a.isLoading;
        if (isLoading) {
            return (React.createElement(Container, null,
                React.createElement(SpinnerContainer, null,
                    React.createElement(Spinner, { invertColor: true, size: "medium" }))));
        }
        if (!items || items.length === 0) {
            return null;
        }
        return (React.createElement(ListContainer, null,
            React.createElement(List, null, items.map(function (item, index) { return (React.createElement(RecentItem, { item: item, selected: selectedIndex === index, onMouseMove: onMouseMove, onSelect: onSelect, key: item.objectId })); }))));
    };
    return RecentList;
}(PureComponent));
export default RecentList;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=RecentList.js.map