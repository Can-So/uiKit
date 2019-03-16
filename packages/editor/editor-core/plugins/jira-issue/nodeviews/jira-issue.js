import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { JiraIcon } from '@atlaskit/logo';
import { borderRadius, colors } from '@atlaskit/theme';
// tslint:disable-next-line:variable-name
var WrapperNode = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  align-items: center;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: inline-flex;\n  font-size: 13px;\n  margin: 0 2px;\n  min-height: 24px;\n  padding: 0 4px;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  .ProseMirror-selectednode & {\n    background: ", ";\n    outline: none;\n  }\n"], ["\n  align-items: center;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: inline-flex;\n  font-size: 13px;\n  margin: 0 2px;\n  min-height: 24px;\n  padding: 0 4px;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  .ProseMirror-selectednode & {\n    background: ", ";\n    outline: none;\n  }\n"])), colors.N30, colors.N50, borderRadius(), colors.N50);
// tslint:disable-next-line:variable-name
var JiraChildNode = styled.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  color: #707070;\n  line-height: 24px;\n  vertical-align: top;\n\n  &::before {\n    color: black;\n    content: 'JIRA | ';\n  }\n"], ["\n  display: inline-block;\n  color: #707070;\n  line-height: 24px;\n  vertical-align: top;\n\n  &::before {\n    color: black;\n    content: 'JIRA | ';\n  }\n"])));
// tslint:disable-next-line:variable-name
var SvgChildNode = styled.span(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  height: 24px;\n  vertical-align: top;\n  width: 24px;\n\n  & > div {\n    height: 24px;\n    width: 24px;\n  }\n"], ["\n  display: inline-block;\n  height: 24px;\n  vertical-align: top;\n  width: 24px;\n\n  & > div {\n    height: 24px;\n    width: 24px;\n  }\n"])));
export default function JIRAIssueNode(props) {
    var issueKey = props.node.attrs.issueKey;
    return (React.createElement(WrapperNode, null,
        React.createElement(SvgChildNode, null,
            React.createElement(JiraIcon, { size: "small" })),
        React.createElement(JiraChildNode, null, issueKey)));
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=jira-issue.js.map