import * as React from 'react';
import * as classNames from 'classnames';
import Tooltip from '@atlaskit/tooltip';
import { placeholder, placeholderContainer } from './styles';
import { defaultEmojiHeight } from '../../constants';
import { isImageRepresentation, isMediaRepresentation, } from '../../type-helpers';
// tslint:disable-next-line:variable-name
var EmojiPlaceholder = function (props) {
    var _a;
    var shortName = props.shortName, _b = props.size, size = _b === void 0 ? defaultEmojiHeight : _b, showTooltip = props.showTooltip, representation = props.representation;
    var scaledWidth;
    var scaledHeight;
    if (representation &&
        size &&
        (isImageRepresentation(representation) ||
            isMediaRepresentation(representation))) {
        var width_1 = representation.width;
        var height_1 = representation.height;
        if (width_1 && height_1) {
            scaledWidth = (size / height_1) * width_1;
            scaledHeight = size;
        }
    }
    var width = scaledWidth || size;
    var height = scaledHeight || size;
    var style = {
        fill: 'f7f7f7',
        width: width + "px",
        height: height + "px",
    };
    var classes = (_a = {},
        _a[placeholder] = true,
        _a[placeholderContainer] = true,
        _a);
    var placeholderNode = (React.createElement("span", { "aria-label": shortName, className: classNames(classes), style: style }));
    return showTooltip ? (React.createElement(Tooltip, { tag: "span", content: shortName }, placeholderNode)) : (placeholderNode);
};
export default EmojiPlaceholder;
//# sourceMappingURL=EmojiPlaceholder.js.map