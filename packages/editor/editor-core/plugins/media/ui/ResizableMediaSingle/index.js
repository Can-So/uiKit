import * as tslib_1 from "tslib";
import * as React from 'react';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { akEditorWideLayoutWidth, calcPxFromColumns, calcPctFromPx, calcPxFromPct, akEditorBreakoutPadding, calcColumnsFromPx, breakoutWideScaleRatio, } from '@findable/editor-common';
import { Wrapper } from './styled';
import Resizer from './Resizer';
import { snapTo, handleSides, imageAlignmentMap, alignmentLayouts, } from './utils';
var ResizableMediaSingle = /** @class */ (function (_super) {
    tslib_1.__extends(ResizableMediaSingle, _super);
    function ResizableMediaSingle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            offsetLeft: _this.calcOffsetLeft(),
            // We default to true until we resolve the file type
            isVideoFile: true,
        };
        _this.calcNewSize = function (newWidth, stop) {
            var layout = _this.props.layout;
            var newPct = calcPctFromPx(newWidth, _this.props.lineLength) * 100;
            if (newPct <= 100) {
                var newLayout = void 0;
                if (_this.wrappedLayout && (stop ? newPct !== 100 : true)) {
                    newLayout = layout;
                }
                else {
                    newLayout = 'center';
                }
                return {
                    width: newPct,
                    layout: newLayout,
                };
            }
            else {
                // wide or full-width
                var newLayout = newWidth <= akEditorWideLayoutWidth ? 'wide' : 'full-width';
                return {
                    width: _this.props.pctWidth || null,
                    layout: newLayout,
                };
            }
        };
        _this.calcColumnLeftOffset = function () {
            var offsetLeft = _this.state.offsetLeft;
            return _this.insideInlineLike
                ? calcColumnsFromPx(offsetLeft, _this.props.lineLength, _this.props.gridSize)
                : 0;
        };
        _this.highlights = function (newWidth, snapPoints) {
            var snapWidth = snapTo(newWidth, snapPoints);
            if (snapWidth > akEditorWideLayoutWidth) {
                return ['full-width'];
            }
            var _a = _this.props, layout = _a.layout, lineLength = _a.lineLength, gridSize = _a.gridSize;
            var columns = calcColumnsFromPx(snapWidth, lineLength, gridSize);
            var columnWidth = Math.round(columns);
            var highlight = [];
            if (layout === 'wrap-left' || layout === 'align-start') {
                highlight.push(0, columnWidth);
            }
            else if (layout === 'wrap-right' || layout === 'align-end') {
                highlight.push(gridSize, gridSize - columnWidth);
            }
            else if (_this.insideInlineLike) {
                highlight.push(Math.round(columns + _this.calcColumnLeftOffset()));
            }
            else {
                highlight.push(Math.floor((gridSize - columnWidth) / 2), Math.ceil((gridSize + columnWidth) / 2));
            }
            return highlight;
        };
        return _this;
    }
    ResizableMediaSingle.prototype.componentDidUpdate = function () {
        var offsetLeft = this.calcOffsetLeft();
        if (offsetLeft !== this.state.offsetLeft && offsetLeft >= 0) {
            this.setState({ offsetLeft: offsetLeft });
        }
        return true;
    };
    Object.defineProperty(ResizableMediaSingle.prototype, "wrappedLayout", {
        get: function () {
            var layout = this.props.layout;
            return (layout === 'wrap-left' ||
                layout === 'wrap-right' ||
                layout === 'align-start' ||
                layout === 'align-end');
        },
        enumerable: true,
        configurable: true
    });
    ResizableMediaSingle.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var viewContext;
            return tslib_1.__generator(this, function (_a) {
                viewContext = this.props.viewContext;
                if (viewContext) {
                    this.checkVideoFile(viewContext);
                }
                return [2 /*return*/];
            });
        });
    };
    ResizableMediaSingle.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.viewContext !== nextProps.viewContext) {
            this.checkVideoFile(nextProps.viewContext);
        }
    };
    ResizableMediaSingle.prototype.checkVideoFile = function (viewContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var $pos, getMediaNode, state;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $pos = this.$pos;
                        if (!$pos || !viewContext) {
                            return [2 /*return*/];
                        }
                        getMediaNode = this.props.state.doc.nodeAt($pos.pos + 1);
                        return [4 /*yield*/, viewContext.file.getCurrentState(getMediaNode.attrs.id)];
                    case 1:
                        state = _a.sent();
                        if (state && state.status !== 'error' && state.mediaType === 'image') {
                            this.setState({
                                isVideoFile: false,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ResizableMediaSingle.prototype, "$pos", {
        get: function () {
            var pos = this.props.getPos();
            if (Number.isNaN(pos) || typeof pos !== 'number') {
                return null;
            }
            // need to pass view because we may not get updated props in time
            return this.props.view.state.doc.resolve(pos);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableMediaSingle.prototype, "gridWidth", {
        /**
         * The maxmimum number of grid columns this node can resize to.
         */
        get: function () {
            var gridSize = this.props.gridSize;
            return !(this.wrappedLayout || this.insideInlineLike)
                ? gridSize / 2
                : gridSize;
        },
        enumerable: true,
        configurable: true
    });
    ResizableMediaSingle.prototype.calcOffsetLeft = function () {
        var offsetLeft = 0;
        if (this.wrapper && this.insideInlineLike) {
            var currentNode = this.wrapper;
            var pm = this.props.view.dom;
            while (currentNode &&
                currentNode.parentElement &&
                !currentNode.parentElement.classList.contains('ProseMirror') &&
                currentNode !== document.body) {
                offsetLeft += currentNode.offsetLeft;
                currentNode = currentNode.parentElement;
            }
            offsetLeft -= pm.offsetLeft;
        }
        return offsetLeft;
    };
    ResizableMediaSingle.prototype.calcSnapPoints = function () {
        var offsetLeft = this.state.offsetLeft;
        var _a = this.props, containerWidth = _a.containerWidth, lineLength = _a.lineLength, appearance = _a.appearance;
        var snapTargets = [];
        for (var i = 0; i < this.gridWidth; i++) {
            snapTargets.push(calcPxFromColumns(i, lineLength, this.gridWidth) - offsetLeft);
        }
        // full width
        snapTargets.push(lineLength - offsetLeft);
        var minimumWidth = calcPxFromColumns(this.wrappedLayout || this.insideInlineLike ? 1 : 2, lineLength, this.props.gridSize);
        var snapPoints = snapTargets.filter(function (width) { return width >= minimumWidth; });
        var $pos = this.$pos;
        if (!$pos) {
            return snapPoints;
        }
        var isVideoFile = this.state.isVideoFile;
        snapPoints = isVideoFile
            ? snapPoints.filter(function (width) { return width > 320; })
            : snapPoints;
        var isTopLevel = $pos.parent.type.name === 'doc';
        if (isTopLevel && appearance === 'full-page') {
            snapPoints.push(akEditorWideLayoutWidth);
            var fullWidthPoint = containerWidth - akEditorBreakoutPadding;
            if (fullWidthPoint > akEditorWideLayoutWidth) {
                snapPoints.push(fullWidthPoint);
            }
        }
        return snapPoints;
    };
    Object.defineProperty(ResizableMediaSingle.prototype, "insideInlineLike", {
        get: function () {
            var $pos = this.$pos;
            if (!$pos) {
                return false;
            }
            var _a = this.props.view.state.schema.nodes, table = _a.table, listItem = _a.listItem;
            return !!findParentNodeOfTypeClosestToPos($pos, [table, listItem]);
        },
        enumerable: true,
        configurable: true
    });
    ResizableMediaSingle.prototype.render = function () {
        var _this = this;
        var _a = this.props, origWidth = _a.width, origHeight = _a.height, layout = _a.layout, pctWidth = _a.pctWidth, lineLength = _a.lineLength, containerWidth = _a.containerWidth;
        var pxWidth = origWidth;
        if (layout === 'wide') {
            var wideWidth = lineLength * breakoutWideScaleRatio;
            pxWidth = wideWidth > containerWidth ? lineLength : wideWidth;
        }
        else if (layout === 'full-width') {
            pxWidth = containerWidth - akEditorBreakoutPadding;
        }
        else if (pctWidth && origWidth && origHeight) {
            pxWidth = Math.ceil(calcPxFromPct(pctWidth / 100, lineLength || containerWidth));
        }
        else if (layout === 'center') {
            pxWidth = Math.min(origWidth, lineLength);
        }
        else if (alignmentLayouts.indexOf(layout) !== -1) {
            pxWidth = Math.min(origWidth / 2, lineLength);
        }
        // scale, keeping aspect ratio
        var height = (origHeight / origWidth) * pxWidth;
        var width = pxWidth;
        var enable = {};
        handleSides.forEach(function (side) {
            var oppositeSide = side === 'left' ? 'right' : 'left';
            enable[side] =
                ['full-width', 'wide', 'center']
                    .concat("wrap-" + oppositeSide)
                    .concat("align-" + imageAlignmentMap[oppositeSide])
                    .indexOf(layout) > -1;
            if (side === 'left' && _this.insideInlineLike) {
                enable[side] = false;
            }
        });
        return (React.createElement(Wrapper, { width: width, height: height, layout: layout, containerWidth: containerWidth || origWidth, innerRef: function (elem) { return (_this.wrapper = elem); } },
            React.createElement(Resizer, tslib_1.__assign({}, this.props, { width: width, height: height, selected: this.props.selected, enable: enable, calcNewSize: this.calcNewSize, snapPoints: this.calcSnapPoints(), scaleFactor: !this.wrappedLayout && !this.insideInlineLike ? 2 : 1, highlights: this.highlights }), this.props.children)));
    };
    return ResizableMediaSingle;
}(React.Component));
export default ResizableMediaSingle;
//# sourceMappingURL=index.js.map