import * as tslib_1 from "tslib";
import * as React from 'react';
import { gridSize } from '@atlaskit/theme';
import ColorCard from './ColorCard';
import { COLOR_CARD_SIZE } from '../constants';
import { ColorPaletteContainer, ColorCardWrapper, } from '../styled/ColorPalette';
var EmptyComponent = function () { return null; };
export var MenuList = function (props) {
    var cx = props.cx, cols = props.selectProps.cols, rest = tslib_1.__rest(props, ["cx", "selectProps"]);
    return (React.createElement(ColorPaletteContainer, tslib_1.__assign({ style: {
            maxWidth: cols ? cols * (COLOR_CARD_SIZE + 2) + gridSize() : undefined,
        } }, rest)));
};
export var Option = function (props) {
    var _a = props.data, value = _a.value, label = _a.label, checkMarkColor = props.selectProps.checkMarkColor, isFocused = props.isFocused, isSelected = props.isSelected;
    return (React.createElement(ColorCardWrapper, tslib_1.__assign({}, props.innerProps),
        React.createElement(ColorCard, { label: label, value: value, checkMarkColor: checkMarkColor, isOption: true, focused: isFocused, selected: isSelected })));
};
export var DropdownIndicator = EmptyComponent;
export var Placeholder = EmptyComponent;
//# sourceMappingURL=components.js.map