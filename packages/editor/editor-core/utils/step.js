import * as tslib_1 from "tslib";
import { Fragment, Slice } from 'prosemirror-model';
import { Step, StepResult } from 'prosemirror-transform';
/**
 * For more context on what this is about:
 * @see https://discuss.prosemirror.net/t/preventing-image-placeholder-replacement-from-being-undone/1394
 */
var SetAttrsStep = /** @class */ (function (_super) {
    tslib_1.__extends(SetAttrsStep, _super);
    function SetAttrsStep(pos, attrs) {
        var _this = _super.call(this) || this;
        _this.pos = pos;
        _this.attrs = attrs;
        return _this;
    }
    SetAttrsStep.prototype.apply = function (doc) {
        var target = doc.nodeAt(this.pos);
        if (!target) {
            return StepResult.fail('No node at given position');
        }
        var attrs = tslib_1.__assign({}, (target.attrs || {}), (this.attrs || {}));
        var newNode = target.type.create(attrs, Fragment.empty, target.marks);
        var slice = new Slice(Fragment.from(newNode), 0, target.isLeaf ? 0 : 1);
        return StepResult.fromReplace(doc, this.pos, this.pos + 1, slice);
    };
    SetAttrsStep.prototype.invert = function (doc) {
        var target = doc.nodeAt(this.pos);
        return new SetAttrsStep(this.pos, target ? target.attrs : {});
    };
    SetAttrsStep.prototype.map = function (mapping) {
        var result = mapping.mapResult(this.pos, 1);
        return result.deleted ? null : new SetAttrsStep(result.pos, this.attrs);
    };
    SetAttrsStep.prototype.toJSON = function () {
        return { stepType: 'setAttrs', pos: this.pos, attrs: this.attrs };
    };
    SetAttrsStep.fromJSON = function (_schema, json) {
        if (typeof json.pos !== 'number' ||
            (json.attrs !== null && typeof json.attrs !== 'object')) {
            throw new RangeError('Invalid input for SetAttrsStep.fromJSON');
        }
        return new SetAttrsStep(json.pos, json.attrs);
    };
    return SetAttrsStep;
}(Step));
export { SetAttrsStep };
Step.jsonID('setAttrs', SetAttrsStep);
//# sourceMappingURL=step.js.map