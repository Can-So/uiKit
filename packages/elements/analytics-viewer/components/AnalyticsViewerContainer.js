import * as tslib_1 from "tslib";
import { AnalyticsListener } from '@atlaskit/analytics-next';
import * as React from 'react';
import styled from 'styled-components';
import { AnalyticsViewer } from './AnalyticsViewer';
var Container = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n"])));
var ChildrenWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  flex-grow: 1;\n"], ["\n  flex-grow: 1;\n"])));
var StyledAnalyticsViewer = styled(AnalyticsViewer)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  flex-grow: 0;\n  flex-shrink: 1;\n  height: 100px;\n  overflow-y: scroll;\n"], ["\n  flex-grow: 0;\n  flex-shrink: 1;\n  height: 100px;\n  overflow-y: scroll;\n"])));
var AnalyticsViewerContainer = /** @class */ (function (_super) {
    tslib_1.__extends(AnalyticsViewerContainer, _super);
    function AnalyticsViewerContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOnEvent = function (event, channel) {
            _this.setState(function (state) { return ({
                events: tslib_1.__spread([{ event: event, channel: channel }], state.events),
            }); });
        };
        _this.state = {
            events: [],
        };
        return _this;
    }
    AnalyticsViewerContainer.prototype.render = function () {
        return (React.createElement(AnalyticsListener, { onEvent: this.handleOnEvent, channel: this.props.channel },
            React.createElement(Container, null,
                React.createElement(ChildrenWrapper, null, this.props.children),
                React.createElement(StyledAnalyticsViewer, { events: this.state.events }))));
    };
    AnalyticsViewerContainer.defaultProps = {
        channel: '*',
    };
    return AnalyticsViewerContainer;
}(React.Component));
export { AnalyticsViewerContainer };
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=AnalyticsViewerContainer.js.map