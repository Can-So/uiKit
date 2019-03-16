import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { Context } from './context';
import { getProvider } from '../provider';
export var akEditorFullPageMaxWidth = 680;
var GUTTER_PADDING = 32;
var Content = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  line-height: 24px;\n  height: 100%;\n  width: 100%;\n  max-width: ", "px;\n  padding-top: 50px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding-bottom: 55px;\n\n  & > * {\n    padding: 0 32px;\n  }\n"], ["\n  line-height: 24px;\n  height: 100%;\n  width: 100%;\n  max-width: ", "px;\n  padding-top: 50px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding-bottom: 55px;\n\n  & > * {\n    padding: 0 32px;\n  }\n"])), akEditorFullPageMaxWidth + GUTTER_PADDING * 2);
var EmbeddedDocument = /** @class */ (function (_super) {
    tslib_1.__extends(EmbeddedDocument, _super);
    function EmbeddedDocument(props) {
        var _this = _super.call(this, props) || this;
        _this.getDocumentByObjectId = function (objectId, language) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            isLoading: true,
                        });
                        return [4 /*yield*/, this.provider.getDocumentByObjectId(objectId, language)];
                    case 1:
                        doc = _a.sent();
                        this.setDocumentState(doc);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.getDocument = function (documentId, language) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            isLoading: true,
                        });
                        return [4 /*yield*/, this.provider.getDocument(documentId, language)];
                    case 1:
                        doc = _a.sent();
                        this.setDocumentState(doc);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.setDocumentMode = function (mode) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.setState({
                    mode: mode,
                });
                return [2 /*return*/];
            });
        }); };
        _this.updateDocument = function (body) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, documentId, objectId, language, doc;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.state.doc || this.props, documentId = _a.documentId, objectId = _a.objectId, language = _a.language;
                        if (!documentId) {
                            return [2 /*return*/, this.createDocument(body)];
                        }
                        return [4 /*yield*/, this.provider.updateDocument(documentId, JSON.stringify(body), objectId, '', language)];
                    case 1:
                        doc = _b.sent();
                        if (doc) {
                            this.setState({
                                doc: doc,
                                mode: 'view',
                            });
                            return [2 /*return*/, doc];
                        }
                        else {
                            this.setState({
                                hasError: true,
                                mode: 'view',
                            });
                            throw new Error('Failed to update document');
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.createDocument = function (body) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, objectId, language, doc;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, objectId = _a.objectId, language = _a.language;
                        return [4 /*yield*/, this.provider.createDocument(JSON.stringify(body), objectId, '', language)];
                    case 1:
                        doc = _b.sent();
                        if (doc) {
                            this.setState({
                                doc: doc,
                                mode: 'view',
                            });
                            return [2 /*return*/, doc];
                        }
                        else {
                            this.setState({
                                hasError: true,
                                mode: 'view',
                            });
                            throw new Error('Failed to create document');
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.setDocumentState = function (doc) {
            if (doc) {
                _this.setState({
                    isLoading: false,
                    doc: doc,
                });
            }
            else {
                _this.setState({
                    isLoading: false,
                    mode: 'edit',
                });
            }
        };
        _this.actions = {
            getDocument: _this.getDocument,
            setDocumentMode: _this.setDocumentMode,
            updateDocument: _this.updateDocument,
            createDocument: _this.createDocument,
            getDocumentByObjectId: _this.getDocumentByObjectId,
        };
        _this.provider = getProvider(props);
        _this.state = {
            mode: props.mode || 'view',
            isLoading: true,
        };
        return _this;
    }
    EmbeddedDocument.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, documentId, language, objectId;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, documentId = _a.documentId, language = _a.language, objectId = _a.objectId;
                        if (!documentId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDocument(documentId, language)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getDocumentByObjectId(objectId, language)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Toolbar will only be rendered here if we're in "view"-mode.
     *
     * In all other modes, the toolbar rendering will be triggered
     * by the Document-component.
     */
    EmbeddedDocument.prototype.renderToolbar = function () {
        var mode = this.state.mode;
        var renderToolbar = this.props.renderToolbar;
        if (mode !== 'view' || !renderToolbar) {
            return;
        }
        return renderToolbar(mode);
    };
    /**
     * Title will only be rendered here if we're in "view"-mode.
     *
     * In all other modes, the title rendering will be triggered
     * by the Document-component.
     */
    EmbeddedDocument.prototype.renderTitle = function () {
        var _a = this.state, mode = _a.mode, doc = _a.doc;
        var renderTitle = this.props.renderTitle;
        if (mode !== 'view' || !renderTitle) {
            return;
        }
        return renderTitle(mode, doc);
    };
    EmbeddedDocument.prototype.renderContent = function () {
        var mode = this.state.mode;
        if (mode === 'view') {
            return (React.createElement(React.Fragment, null,
                this.renderToolbar(),
                React.createElement(Content, null,
                    this.renderTitle(),
                    this.props.children)));
        }
        return this.props.children;
    };
    EmbeddedDocument.prototype.render = function () {
        var _a = this.props, renderTitle = _a.renderTitle, renderToolbar = _a.renderToolbar;
        return (React.createElement(Context.Provider, { value: {
                value: this.state,
                actions: this.actions,
                renderProps: {
                    renderTitle: renderTitle,
                    renderToolbar: renderToolbar,
                },
            } }, this.renderContent()));
    };
    return EmbeddedDocument;
}(Component));
export default EmbeddedDocument;
var templateObject_1;
//# sourceMappingURL=embedded-document.js.map