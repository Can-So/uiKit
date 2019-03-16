import * as tslib_1 from "tslib";
import * as React from 'react';
import { AnalyticsDecorator } from '@atlaskit/analytics';
import isReactElement from './isReactElement';
import { QS_ANALYTICS_EV_SUBMIT } from './constants';
export default function decorateWithAnalyticsData(WrappedQuickSearch) {
    var _a;
    return _a = /** @class */ (function (_super) {
            tslib_1.__extends(DecorateWithAnalyticsData, _super);
            function DecorateWithAnalyticsData() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.countChildren = function () {
                    return React.Children.toArray(_this.props.children).reduce(function (total, group) {
                        return isReactElement(group)
                            ? total +
                                React.Children.count(group.props.children)
                            : total;
                    }, 0);
                };
                return _this;
            }
            DecorateWithAnalyticsData.prototype.render = function () {
                return (React.createElement(AnalyticsDecorator, { matchPrivate: true, match: QS_ANALYTICS_EV_SUBMIT, data: {
                        resultCount: this.countChildren(),
                        queryLength: this.props.value.length,
                    } },
                    React.createElement(WrappedQuickSearch, tslib_1.__assign({}, this.props))));
            };
            return DecorateWithAnalyticsData;
        }(React.Component)),
        _a.defaultProps = {
            children: [],
            value: '',
        },
        _a;
}
//# sourceMappingURL=decorateWithAnalyticsData.js.map