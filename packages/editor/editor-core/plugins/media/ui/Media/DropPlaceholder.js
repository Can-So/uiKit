import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { colors, borderRadius } from '@atlaskit/theme';
import DocumentFilledIcon from '@atlaskit/icon/glyph/document-filled';
import { hexToRgba } from '@atlaskit/editor-common';
import { MEDIA_HEIGHT, FILE_WIDTH } from '../../nodeviews/media';
var IconWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  background: ", ";\n  border-radius: ", "px;\n  margin: 5px 3px 25px;\n  width: ", "px;\n  min-height: ", "px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  color: ", ";\n  background: ", ";\n  border-radius: ", "px;\n  margin: 5px 3px 25px;\n  width: ", "px;\n  min-height: ", "px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])), hexToRgba(colors.B400, 0.4) || colors.B400, hexToRgba(colors.B300, 0.6) || colors.B300, borderRadius(), FILE_WIDTH, MEDIA_HEIGHT);
var DropLine = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  background: ", ";\n  border-radius: ", "px;\n  margin: 2px 0;\n  width: 100%;\n  height: 2px;\n"], ["\n  background: ", ";\n  border-radius: ", "px;\n  margin: 2px 0;\n  width: 100%;\n  height: 2px;\n"])), colors.B200, borderRadius());
export default (function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'group' : _b;
    return type === 'single' ? (React.createElement(DropLine, null)) : (React.createElement(IconWrapper, null,
        React.createElement(DocumentFilledIcon, { label: "Document", size: "medium" })));
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=DropPlaceholder.js.map