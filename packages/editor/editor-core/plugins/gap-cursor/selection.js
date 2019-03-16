import * as tslib_1 from "tslib";
import { Selection } from 'prosemirror-state';
import { Slice } from 'prosemirror-model';
import { isValidTargetNode } from './utils';
export var Side;
(function (Side) {
    Side["LEFT"] = "left";
    Side["RIGHT"] = "right";
})(Side || (Side = {}));
export var JSON_ID = 'gapcursor';
var GapCursorSelection = /** @class */ (function (_super) {
    tslib_1.__extends(GapCursorSelection, _super);
    /**
     * Construct a GapCursorSelection
     * @param {ResolvedPos} $pos resolved position
     * @param {Side} side side where the gap cursor is drawn
     */
    function GapCursorSelection($pos, side) {
        if (side === void 0) { side = Side.LEFT; }
        var _this = _super.call(this, $pos, $pos) || this;
        _this.side = side;
        _this.visible = false;
        return _this;
    }
    GapCursorSelection.valid = function ($pos) {
        var parent = $pos.parent, nodeBefore = $pos.nodeBefore, nodeAfter = $pos.nodeAfter;
        var targetNode = isValidTargetNode(nodeBefore)
            ? nodeBefore
            : isValidTargetNode(nodeAfter)
                ? nodeAfter
                : null;
        if (!targetNode || parent.isTextblock) {
            return false;
        }
        var deflt = parent.contentMatchAt($pos.index()).defaultType;
        return deflt && deflt.isTextblock;
    };
    GapCursorSelection.findFrom = function ($pos, dir, mustMove) {
        if (mustMove === void 0) { mustMove = false; }
        var side = dir === 1 ? Side.RIGHT : Side.LEFT;
        if (!mustMove && GapCursorSelection.valid($pos)) {
            return new GapCursorSelection($pos, side);
        }
        var pos = $pos.pos;
        // TODO: Fix any, potential issue. ED-5048
        var next = null;
        // Scan up from this position
        for (var d = $pos.depth;; d--) {
            var parent_1 = $pos.node(d);
            if (side === Side.RIGHT
                ? $pos.indexAfter(d) < parent_1.childCount
                : $pos.index(d) > 0) {
                next = parent_1.maybeChild(side === Side.RIGHT ? $pos.indexAfter(d) : $pos.index(d) - 1);
                break;
            }
            else if (d === 0) {
                return null;
            }
            pos += dir;
            var $cur = $pos.doc.resolve(pos);
            if (GapCursorSelection.valid($cur)) {
                return new GapCursorSelection($cur, side);
            }
        }
        // And then down into the next node
        for (;;) {
            next = side === Side.RIGHT ? next.firstChild : next.lastChild;
            if (next === null) {
                break;
            }
            pos += dir;
            var $cur = $pos.doc.resolve(pos);
            if (GapCursorSelection.valid($cur)) {
                return new GapCursorSelection($cur, side);
            }
        }
        return null;
    };
    GapCursorSelection.fromJSON = function (doc, json) {
        return new GapCursorSelection(doc.resolve(json.pos));
    };
    GapCursorSelection.prototype.map = function (doc, mapping) {
        var $pos = doc.resolve(mapping.map(this.head));
        return GapCursorSelection.valid($pos)
            ? new GapCursorSelection($pos, this.side)
            : Selection.near($pos);
    };
    GapCursorSelection.prototype.eq = function (other) {
        return other instanceof GapCursorSelection && other.head === this.head;
    };
    GapCursorSelection.prototype.content = function () {
        return Slice.empty;
    };
    GapCursorSelection.prototype.getBookmark = function () {
        return new GapBookmark(this.anchor);
    };
    GapCursorSelection.prototype.toJSON = function () {
        return { pos: this.head, type: JSON_ID };
    };
    return GapCursorSelection;
}(Selection));
export { GapCursorSelection };
Selection.jsonID(JSON_ID, GapCursorSelection);
var GapBookmark = /** @class */ (function () {
    function GapBookmark(pos) {
        this.pos = pos;
    }
    GapBookmark.prototype.map = function (mapping) {
        return new GapBookmark(mapping.map(this.pos));
    };
    GapBookmark.prototype.resolve = function (doc) {
        var $pos = doc.resolve(this.pos);
        return GapCursorSelection.valid($pos)
            ? new GapCursorSelection($pos)
            : Selection.near($pos);
    };
    return GapBookmark;
}());
export { GapBookmark };
//# sourceMappingURL=selection.js.map