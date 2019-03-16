import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
var PropertyViewerContainer = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  margin: 2px;\n  padding: 0 4px;\n  border-radius: 5px;\n  box-shadow: 1px 1px 2px #888;\n  border: 1px solid #888;\n"], ["\n  display: inline-block;\n  margin: 2px;\n  padding: 0 4px;\n  border-radius: 5px;\n  box-shadow: 1px 1px 2px #888;\n  border: 1px solid #888;\n"])));
export var PropertyViewer = function (_a) {
    var object = _a.object, property = _a.property;
    if (object[property] !== undefined) {
        return (React.createElement(PropertyViewerContainer, null,
            property,
            ": ",
            JSON.stringify(object[property])));
    }
    return null;
};
var templateObject_1;
//# sourceMappingURL=PropertyViewer.js.map