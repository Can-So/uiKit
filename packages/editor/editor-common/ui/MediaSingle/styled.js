import * as tslib_1 from "tslib";
import styled, { css } from 'styled-components';
import { akEditorFullPageMaxWidth } from '../../styles';
import { calcWideWidth, calcBreakoutWidth } from '../../utils';
function float(layout) {
    switch (layout) {
        case 'wrap-right':
            return 'right';
        case 'wrap-left':
            return 'left';
        default:
            return 'none';
    }
}
/**
 * Calculates the image width for non-resized images.
 *
 * If an image has not been resized using the pctWidth attribute,
 * then an image in wide or full-width can not be wider than the image's
 * original width.
 */
export function calcLegacyWidth(layout, width, containerWidth) {
    if (containerWidth === void 0) { containerWidth = 0; }
    switch (layout) {
        case 'align-start':
        case 'align-end':
        case 'wrap-right':
        case 'wrap-left':
            return width > akEditorFullPageMaxWidth / 2
                ? 'calc(50% - 12px)'
                : width + "px";
        case 'wide':
            return calcWideWidth(containerWidth);
        case 'full-width':
            return calcBreakoutWidth(layout, containerWidth);
        default:
            return width > akEditorFullPageMaxWidth ? '100%' : width + "px";
    }
}
/**
 * Calculates the image width for previously resized images.
 *
 * Wide and full-width images are always that size (960px and 100%); there is
 * no distinction between max-width and width.
 */
export function calcResizedWidth(layout, width, containerWidth) {
    if (containerWidth === void 0) { containerWidth = 0; }
    switch (layout) {
        case 'wide':
            return calcWideWidth(containerWidth);
        case 'full-width':
            return calcBreakoutWidth(layout, containerWidth);
        default:
            return width + "px";
    }
}
function calcMaxWidth(layout, width, containerWidth) {
    switch (layout) {
        case 'wide':
            return calcWideWidth(containerWidth);
        case 'full-width':
            return calcBreakoutWidth(layout, containerWidth);
        default:
            return '100%';
    }
}
function calcMargin(layout) {
    switch (layout) {
        case 'wrap-right':
            return '12px auto 12px 24px';
        case 'wrap-left':
            return '12px 24px 12px auto';
        default:
            return '24px auto';
    }
}
function isImageAligned(layout) {
    switch (layout) {
        case 'align-end':
            return 'margin-right: 0';
        case 'align-start':
            return 'margin-left: 0';
        default:
            return '';
    }
}
/**
 * Can't use `.attrs` to handle highly dynamic styles because we are still
 * supporting `styled-components` v1.
 */
export var MediaSingleDimensionHelper = function (_a) {
    var width = _a.width, height = _a.height, layout = _a.layout, _b = _a.containerWidth, containerWidth = _b === void 0 ? 0 : _b, pctWidth = _a.pctWidth;
    return css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  tr & {\n    max-width: 100%;\n  }\n  width: ", ";\n  max-width: ", ";\n  float: ", ";\n  margin: ", ";\n  ", ";\n"], ["\n  tr & {\n    max-width: 100%;\n  }\n  width: ",
        ";\n  max-width: ", ";\n  float: ", ";\n  margin: ", ";\n  ", ";\n"])), pctWidth
        ? calcResizedWidth(layout, width, containerWidth)
        : calcLegacyWidth(layout, width, containerWidth), calcMaxWidth(layout, width, containerWidth), float(layout), calcMargin(layout), isImageAligned(layout));
};
var Wrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", ";\n  position: relative;\n  z-index: 1;\n\n  &::after {\n    content: '';\n    display: block;\n    padding-bottom: ", "%;\n  }\n\n  & > div {\n    position: absolute;\n    height: 100%;\n  }\n"], ["\n  ", ";\n  position: relative;\n  z-index: 1;\n\n  &::after {\n    content: '';\n    display: block;\n    padding-bottom: ", "%;\n  }\n\n  & > div {\n    position: absolute;\n    height: 100%;\n  }\n"])), MediaSingleDimensionHelper, function (p) { return (p.height / p.width) * 100; });
Wrapper.displayName = 'WrapperMediaSingle';
export default Wrapper;
var templateObject_1, templateObject_2;
//# sourceMappingURL=styled.js.map