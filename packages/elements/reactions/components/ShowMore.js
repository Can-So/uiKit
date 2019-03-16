import * as tslib_1 from "tslib";
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';
import { borderRadius, colors } from '@atlaskit/theme';
import Tooltip from '@atlaskit/tooltip';
import * as cx from 'classnames';
import * as React from 'react';
import { style } from 'typestyle';
import { messages } from './i18n';
import { FormattedMessage } from 'react-intl';
var moreEmojiContainerStyle = style({ display: 'flex' });
var moreButtonStyle = style({
    opacity: 0,
    outline: 'none',
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: borderRadius() + "px",
    cursor: 'pointer',
    margin: '4px 4px 4px 0',
    padding: '4px',
    width: '38px',
    verticalAlign: 'top',
    $nest: {
        '&:hover': {
            backgroundColor: colors.N30A,
        },
    },
});
var separatorStyle = style({
    backgroundColor: colors.N30A,
    margin: '8px 8px 8px 4px',
    width: '1px',
    height: '60%',
    display: 'inline-block',
});
var ShowMore = /** @class */ (function (_super) {
    tslib_1.__extends(ShowMore, _super);
    function ShowMore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowMore.prototype.render = function () {
        var _a = this.props, style = _a.style, onClick = _a.onClick, classNameProp = _a.className;
        return (React.createElement("div", { className: cx(moreEmojiContainerStyle, classNameProp.container), style: style.container },
            React.createElement("div", { className: separatorStyle }),
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.moreEmoji), function (text) { return (React.createElement(Tooltip, { content: text },
                React.createElement("button", { className: cx(moreButtonStyle, classNameProp.button), style: style.button, onMouseDown: onClick },
                    React.createElement(EditorMoreIcon, { label: "More" })))); })));
    };
    ShowMore.defaultProps = {
        className: {},
        style: {},
    };
    return ShowMore;
}(React.PureComponent));
export { ShowMore };
//# sourceMappingURL=ShowMore.js.map