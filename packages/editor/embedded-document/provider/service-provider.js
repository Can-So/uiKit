import * as tslib_1 from "tslib";
import { utils } from '@findable/util-service-support';
function queryBuilder(data) {
    return Object.keys(data)
        .map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join('=');
    })
        .join('&');
}
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider(config) {
        this.config = config;
    }
    ServiceProvider.prototype.getDocument = function (documentId, language) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var document_1, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, utils.requestService(this.config, {
                                path: "document/" + documentId + "/" + (language || ''),
                            })];
                    case 1:
                        document_1 = _a.sent();
                        return [2 /*return*/, document_1];
                    case 2:
                        err_1 = _a.sent();
                        // tslint:disable-next-line:no-console
                        console.warn("Failed to get document: " + JSON.stringify(err_1));
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceProvider.prototype.getDocumentByObjectId = function (objectId, language) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var queryString, documents, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queryString = queryBuilder(tslib_1.__assign({ objectId: objectId }, (language ? { language: language } : {})));
                        return [4 /*yield*/, utils.requestService(this.config, {
                                path: "document?" + queryString,
                            })];
                    case 1:
                        documents = _a.sent();
                        if (documents && documents.length) {
                            return [2 /*return*/, documents[0].language[language || 'default'].versions[0]];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        err_2 = _a.sent();
                        // tslint:disable-next-line:no-console
                        console.warn("Failed to get document: " + JSON.stringify(err_2));
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceProvider.prototype.updateDocument = function (documentId, body, objectId, title, language) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var document_2, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, utils.requestService(this.config, {
                                path: "document/" + documentId,
                                requestInit: {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: 'PUT',
                                    body: JSON.stringify({
                                        body: body,
                                        objectId: objectId,
                                        title: title,
                                        language: language,
                                    }),
                                },
                            })];
                    case 1:
                        document_2 = _a.sent();
                        return [2 /*return*/, document_2];
                    case 2:
                        err_3 = _a.sent();
                        // tslint:disable-next-line:no-console
                        console.warn("Failed to update document: " + JSON.stringify(err_3));
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceProvider.prototype.createDocument = function (body, objectId, title, language) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var document_3, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, utils.requestService(this.config, {
                                path: "document",
                                requestInit: {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: 'POST',
                                    body: JSON.stringify({
                                        body: body,
                                        objectId: objectId,
                                        title: title,
                                        language: language,
                                    }),
                                },
                            })];
                    case 1:
                        document_3 = _a.sent();
                        return [2 /*return*/, document_3];
                    case 2:
                        err_4 = _a.sent();
                        // tslint:disable-next-line:no-console
                        console.warn("Failed to update document: " + JSON.stringify(err_4));
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceProvider;
}());
export default ServiceProvider;
//# sourceMappingURL=service-provider.js.map