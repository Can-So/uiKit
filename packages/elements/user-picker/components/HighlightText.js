import * as tslib_1 from "tslib";
import * as React from 'react';
var HighlightText = /** @class */ (function (_super) {
    tslib_1.__extends(HighlightText, _super);
    function HighlightText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HighlightText.prototype.render = function () {
        var _a = this.props, children = _a.children, highlights = _a.highlights;
        var parts = [];
        var lastIndex = 0;
        if (highlights) {
            highlights
                .sort(function (a, b) { return a.start - b.start; })
                .reduce(function (highlights, highlight) {
                var lastHighlight = highlights[highlights.length - 1];
                if (!lastHighlight || highlight.start > lastHighlight.end + 1) {
                    return highlights.concat(highlight);
                }
                if (highlight.end > lastHighlight.end) {
                    lastHighlight.end = highlight.end;
                }
                return highlights;
            }, [])
                .forEach(function (highlight) {
                var start = highlight.start, end = highlight.end;
                if (start >= end) {
                    return;
                }
                if (start > lastIndex) {
                    parts.push({
                        value: children.substring(lastIndex, start),
                        matches: false,
                    });
                }
                parts.push({
                    value: children.substring(start, end + 1),
                    matches: true,
                });
                lastIndex = end + 1;
            });
        }
        if (lastIndex < children.length) {
            parts.push({
                value: children.substring(lastIndex, children.length),
                matches: false,
            });
        }
        return parts.map(function (part, index) {
            if (part.matches) {
                return React.createElement("b", { key: index }, part.value);
            }
            return part.value;
        });
    };
    return HighlightText;
}(React.PureComponent));
export { HighlightText };
//# sourceMappingURL=HighlightText.js.map