import * as tslib_1 from "tslib";
var _a;
import { colors, themed } from '@atlaskit/theme';
import styled from 'styled-components';
import { MentionType } from '../../types';
var mentionStyle = (_a = {},
    _a[MentionType.SELF] = {
        background: themed({ light: colors.B400, dark: colors.B200 }),
        border: 'transparent',
        text: themed({ light: colors.N20, dark: colors.DN30 }),
    },
    _a[MentionType.RESTRICTED] = {
        background: 'transparent',
        border: themed({ light: colors.N500, dark: colors.DN80 }),
        text: themed({ light: colors.N500, dark: colors.DN100 }),
    },
    _a[MentionType.DEFAULT] = {
        background: themed({ light: colors.N30A, dark: colors.DN80 }),
        border: 'transparent',
        text: themed({ light: colors.N500, dark: colors.DN800 }),
    },
    _a);
var getStyle = function (props, property) {
    var obj = mentionStyle[props.mentionType][property];
    // themed() returns a function
    return typeof obj === 'string' ? obj : obj(props);
};
export var MentionStyle = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ",
    ";\n"])), function (props) { return "\n  display: inline;\n  background: " + getStyle(props, 'background') + ";\n  border: 1px solid " + getStyle(props, 'border') + ";\n  border-radius: 20px;\n  color: " + getStyle(props, 'text') + ";\n  cursor: pointer;\n  padding: 0 0.3em 2px 0.23em;\n  line-height: 1.714;\n  font-size: 1em;\n  font-weight: normal;\n  word-break: break-word;\n"; });
var templateObject_1;
//# sourceMappingURL=styles.js.map