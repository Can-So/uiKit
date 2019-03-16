import * as tslib_1 from "tslib";
import memoizeOne from 'memoize-one';
import { ClearIndicator } from './ClearIndicator';
import { MultiValue } from './MultiValue';
import { MultiValueContainer } from './MultiValueContainer';
import { Option } from './Option';
import { SingleValue } from './SingleValue';
import { Input } from './Input';
import { SingleValueContainer } from './SingleValueContainer';
import { PopupInput } from './PopupInput';
import { PopupControl } from './PopupControl';
/**
 * Memoize getComponents to avoid rerenders.
 */
export var getComponents = memoizeOne(function (multi, anchor) {
    if (anchor) {
        return {
            Control: anchor,
            Option: Option,
        };
    }
    else {
        return {
            MultiValue: MultiValue,
            DropdownIndicator: null,
            SingleValue: SingleValue,
            ClearIndicator: multi ? null : ClearIndicator,
            Option: Option,
            ValueContainer: multi ? MultiValueContainer : SingleValueContainer,
            Input: Input,
        };
    }
});
export var getPopupComponents = memoizeOne(function (hasPopupTitle) {
    var baseProps = {
        DropdownIndicator: null,
        SingleValue: SingleValue,
        ClearIndicator: ClearIndicator,
        Option: Option,
        ValueContainer: SingleValueContainer,
        Input: PopupInput,
    };
    if (hasPopupTitle) {
        return tslib_1.__assign({}, baseProps, { Control: PopupControl });
    }
    return baseProps;
});
//# sourceMappingURL=components.js.map