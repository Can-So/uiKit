import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import AlignmentButton from './AlignmentButton';
import { AlignmentWrapper } from './styles';
import { iconMap } from '../../plugins/alignment/ui/ToolbarAlignment';
var alignmentOptions = [
    { title: 'Align left', value: 'start' },
    { title: 'Align center', value: 'center' },
    { title: 'Align right', value: 'end' },
];
var Alignment = /** @class */ (function (_super) {
    tslib_1.__extends(Alignment, _super);
    function Alignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Alignment.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, selectedAlignment = _a.selectedAlignment, className = _a.className;
        return (React.createElement(AlignmentWrapper, { className: className, style: { maxWidth: 3 * 32 } }, alignmentOptions.map(function (alignment) {
            var value = alignment.value, title = alignment.title;
            return (React.createElement(AlignmentButton, { content: iconMap[value], key: value, value: value, label: title, onClick: onClick, isSelected: value === selectedAlignment }));
        })));
    };
    return Alignment;
}(PureComponent));
export default Alignment;
//# sourceMappingURL=index.js.map