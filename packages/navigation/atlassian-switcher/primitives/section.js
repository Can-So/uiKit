import * as tslib_1 from "tslib";
import * as React from 'react';
import { gridSize, typography } from '@atlaskit/theme';
import styled from 'styled-components';
import { analyticsAttributes, withAnalyticsContextData, } from '../utils/analytics';
import { FadeIn } from './fade-in';
var SectionContainer = styled.section(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  padding: ", "px 0;\n"], ["\n  padding: ", "px 0;\n"])), gridSize());
var SectionTitle = styled.h1(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", ";\n  text-transform: uppercase;\n  margin-bottom: ", "px;\n  margin-left: ", "px;\n"], ["\n  ", ";\n  text-transform: uppercase;\n  margin-bottom: ", "px;\n  margin-left: ", "px;\n"])), typography.h100, gridSize(), gridSize());
var Section = function (props) {
    var title = props.title, children = props.children;
    return React.Children.count(children) ? (React.createElement(SectionContainer, null,
        React.createElement(FadeIn, null,
            React.createElement(SectionTitle, null, title)),
        children)) : null;
};
export default withAnalyticsContextData(function (props) {
    return analyticsAttributes({
        group: props.sectionId,
        groupItemsCount: React.Children.count(props.children),
    });
})(Section);
var templateObject_1, templateObject_2;
//# sourceMappingURL=section.js.map