import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { EventViewer } from './EventViewer';
var AnalyticsViewerWrapper = styled.ul(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  list-style: none;\n  padding: 0;\n  & li:nth-child(even) {\n    background-color: #fff;\n  }\n  & li:nth-child(odd) {\n    background-color: #eee;\n  }\n"], ["\n  list-style: none;\n  padding: 0;\n  & li:nth-child(even) {\n    background-color: #fff;\n  }\n  & li:nth-child(odd) {\n    background-color: #eee;\n  }\n"])));
var renderEventViewer = function (event, index, events) { return React.createElement(EventViewer, tslib_1.__assign({ key: events.length - index }, event)); };
export var AnalyticsViewer = function (_a) {
    var events = _a.events, className = _a.className;
    return (React.createElement(AnalyticsViewerWrapper, { className: className }, events.map(renderEventViewer)));
};
var templateObject_1;
//# sourceMappingURL=AnalyticsViewer.js.map