import * as tslib_1 from "tslib";
import * as React from 'react';
import { colors } from '@findable/theme';
import styled from 'styled-components';
import { getEventHandler } from '../../utils';
// tslint:disable-next-line:variable-name
var StyledAnchor = styled.a(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n\n  &:hover {\n    color: ", ";\n    text-decoration: underline;\n  }\n"], ["\n  color: ", ";\n\n  &:hover {\n    color: ", ";\n    text-decoration: underline;\n  }\n"])), colors.B400, colors.B300);
export default function Link(props) {
    var href = props.href, target = props.target, eventHandlers = props.eventHandlers;
    var anchorProps = {
        href: href,
        target: target,
        title: href,
    };
    if (target === '_blank') {
        anchorProps.rel = 'noreferrer noopener';
    }
    var handler = getEventHandler(eventHandlers, 'link');
    return (React.createElement(StyledAnchor, tslib_1.__assign({ onClick: function (e) {
            if (handler) {
                handler(e, href);
            }
        } }, anchorProps), props.children));
}
var templateObject_1;
//# sourceMappingURL=link.js.map