import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { fontSize } from '@atlaskit/theme';
import { WidthConsumer, Breakpoints } from '../WidthProvider';
function mapBreakpointToFontSize(breakpoint) {
    switch (breakpoint) {
        case Breakpoints.M:
            return fontSize() + 2;
        case Breakpoints.L:
            return fontSize() + 4;
        default:
            return fontSize();
    }
}
export function mapBreakpointToLayoutMaxWidth(breakpoint) {
    switch (breakpoint) {
        case Breakpoints.M:
            return 760;
        case Breakpoints.L:
            return 850;
        default:
            return 680;
    }
}
export function BaseTheme(_a) {
    var children = _a.children, dynamicTextSizing = _a.dynamicTextSizing;
    return (React.createElement(WidthConsumer, null, function (_a) {
        var breakpoint = _a.breakpoint;
        return (React.createElement(ThemeProvider, { theme: {
                baseFontSize: dynamicTextSizing
                    ? mapBreakpointToFontSize(breakpoint)
                    : mapBreakpointToFontSize(Breakpoints.S),
                layoutMaxWidth: dynamicTextSizing
                    ? mapBreakpointToLayoutMaxWidth(breakpoint)
                    : mapBreakpointToLayoutMaxWidth(Breakpoints.S),
            } },
            React.createElement(React.Fragment, null, children)));
    }));
}
//# sourceMappingURL=index.js.map