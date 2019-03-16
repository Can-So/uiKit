var _this = this;
import * as tslib_1 from "tslib";
import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import styled from 'styled-components';
import WithDocumentActions from '../consumers/with-document-actions';
var Toolbar = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 20px;\n  height: 80px;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 20px;\n  height: 80px;\n"])));
export default (function (props) {
    var mode = props.mode, editorActions = props.editorActions;
    return (React.createElement(WithDocumentActions, { render: function (actions) {
            switch (mode) {
                case 'edit':
                case 'create':
                    return (React.createElement(ButtonGroup, null,
                        React.createElement(Button, { appearance: "primary", onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var value, err_1;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, editorActions.getValue()];
                                        case 1:
                                            value = _a.sent();
                                            _a.label = 2;
                                        case 2:
                                            _a.trys.push([2, 4, , 5]);
                                            return [4 /*yield*/, (mode === 'create'
                                                    ? actions.createDocument(value)
                                                    : actions.updateDocument(value))];
                                        case 3:
                                            _a.sent();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            err_1 = _a.sent();
                                            return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); } }, "Publish"),
                        React.createElement(Button, { appearance: "subtle", onClick: function () { return actions.cancelEdit(); } }, "Close")));
                default:
                    return (React.createElement(Toolbar, null,
                        React.createElement(ButtonGroup, null,
                            React.createElement(Button, { appearance: "primary", onClick: function () { return actions.editDocument(); } }, "Edit"))));
            }
        } }));
});
var templateObject_1;
//# sourceMappingURL=toolbar.js.map