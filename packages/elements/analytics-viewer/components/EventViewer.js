import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { PropertyViewer } from './PropertyViewer';
var EventViewerWrapper = styled.li(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  font-size: 12px;\n  padding: 3px;\n\n  & span:first-child {\n    marginleft: 0;\n  }\n  & span:last-child {\n    marginleft: 5;\n  }\n"], ["\n  font-size: 12px;\n  padding: 3px;\n\n  & span:first-child {\n    marginleft: 0;\n  }\n  & span:last-child {\n    marginleft: 5;\n  }\n"])));
var EventViewer = /** @class */ (function (_super) {
    tslib_1.__extends(EventViewer, _super);
    function EventViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMoreClick = function () {
            _this.setState(function (state) { return ({
                showMore: !state.showMore,
            }); });
        };
        _this.state = {
            showMore: false,
        };
        return _this;
    }
    EventViewer.prototype.render = function () {
        var event = this.props.event;
        return (React.createElement(EventViewerWrapper, null,
            React.createElement(PropertyViewer, { object: this.props, property: "channel" }),
            React.createElement(PropertyViewer, { object: event.payload, property: "action" }),
            React.createElement(PropertyViewer, { object: event.payload, property: "actionSubject" }),
            React.createElement(PropertyViewer, { object: event.payload, property: "actionSubjectId" }),
            React.createElement(PropertyViewer, { object: event.payload, property: "type" }),
            this.state.showMore &&
                Object.keys(event.payload.attributes).map(function (attribute) { return (React.createElement(PropertyViewer, { key: attribute, object: event.payload.attributes, property: attribute })); }),
            React.createElement("span", null,
                React.createElement("a", { onClick: this.handleMoreClick },
                    this.state.showMore ? 'less' : 'more',
                    "..."))));
    };
    return EventViewer;
}(React.PureComponent));
export { EventViewer };
var templateObject_1;
//# sourceMappingURL=EventViewer.js.map