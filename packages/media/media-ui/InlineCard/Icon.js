import * as tslib_1 from "tslib";
import styled from 'styled-components';
// TODO: Figure out a more scalable/responsive solution
// for vertical alignment.
// Current rationale: vertically positioned at the top of
// the smart card container (when set to 0). Offset this
// to position it with appropriate whitespace from the top.
export var Icon = styled.img(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  vertical-align: -1.5px;\n  height: 12px;\n  width: 12px;\n  margin-right: 4px;\n  margin-left: 2px;\n  border-radius: 2px;\n"], ["\n  vertical-align: -1.5px;\n  height: 12px;\n  width: 12px;\n  margin-right: 4px;\n  margin-left: 2px;\n  border-radius: 2px;\n"])));
// Used for 'untrue' icons which claim to be 16x16 but
// are less than that in height/width.
// TODO: Replace this override with proper AtlasKit solution.
export var AKIconWrapper = styled.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  margin-right: -2px;\n"], ["\n  margin-right: -2px;\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=Icon.js.map