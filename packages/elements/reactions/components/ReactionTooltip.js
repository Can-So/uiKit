import Tooltip from '@atlaskit/tooltip';
import * as React from 'react';
import { style } from 'typestyle';
var tooltipStyle = style({
    maxWidth: '150px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    $nest: {
        ul: {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            textAlign: 'left',
        },
        li: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: 0,
        },
    },
});
var emojiNameStyle = style({
    textTransform: 'capitalize',
    marginBottom: 5,
});
var footerStyle = style({
    marginTop: 5,
});
var TOOLTIP_USERS_LIMIT = 5;
export var ReactionTooltip = function (_a) {
    var emojiName = _a.emojiName, children = _a.children, users = _a.reaction.users;
    var content = users && users.length > 0 ? (React.createElement("div", { className: tooltipStyle },
        emojiName ? React.createElement("span", { className: emojiNameStyle }, emojiName) : null,
        React.createElement("ul", null, users.slice(0, TOOLTIP_USERS_LIMIT).map(function (user, index) {
            return React.createElement("li", { key: index }, user.displayName);
        })),
        users.length > TOOLTIP_USERS_LIMIT ? (React.createElement("span", { className: footerStyle },
            "+",
            users.length - TOOLTIP_USERS_LIMIT,
            "...")) : null)) : (undefined);
    return (React.createElement(Tooltip, { content: content, position: "bottom" }, React.Children.only(children)));
};
//# sourceMappingURL=ReactionTooltip.js.map