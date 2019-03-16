var _this = this;
import * as tslib_1 from "tslib";
export var FETCH_CONVERSATIONS_REQUEST = 'fetchConversationsRequest';
export var FETCH_CONVERSATIONS_SUCCESS = 'fetchConversationsSuccess';
export var ADD_COMMENT_REQUEST = 'addCommentRequest';
export var ADD_COMMENT_SUCCESS = 'addCommentSuccess';
export var ADD_COMMENT_ERROR = 'addCommentError';
export var DELETE_COMMENT_REQUEST = 'deleteCommentRequest';
export var DELETE_COMMENT_SUCCESS = 'deleteCommentSuccess';
export var DELETE_COMMENT_ERROR = 'deleteCommentError';
export var UPDATE_COMMENT_REQUEST = 'updateCommentRequest';
export var UPDATE_COMMENT_SUCCESS = 'updateCommentSuccess';
export var UPDATE_COMMENT_ERROR = 'updateCommentError';
export var HIGHLIGHT_COMMENT = 'highlightComment';
export var REVERT_COMMENT = 'revertComment';
export var UPDATE_USER_SUCCESS = 'updateUserSuccess';
export var CREATE_CONVERSATION_REQUEST = 'createConversationRequest';
export var CREATE_CONVERSATION_SUCCESS = 'createConversationSuccess';
export var CREATE_CONVERSATION_ERROR = 'createConversationError';
export var addComment = function (conversationId, parentId, value, localId, provider, onSuccess) {
    if (localId === void 0) { localId = undefined; }
    return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var commentId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider.addComment(conversationId, parentId, value, localId)];
                case 1:
                    commentId = (_a.sent()).commentId;
                    if (typeof onSuccess === 'function') {
                        onSuccess(commentId);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
};
export var updateComment = function (conversationId, commentId, value, provider, onSuccess) { return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, provider.updateComment(conversationId, commentId, value)];
            case 1:
                _a.sent();
                if (typeof onSuccess === 'function') {
                    onSuccess(commentId);
                }
                return [2 /*return*/];
        }
    });
}); }; };
export var deleteComment = function (conversationId, commentId, provider, onSuccess) { return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, provider.deleteComment(conversationId, commentId)];
            case 1:
                _a.sent();
                if (typeof onSuccess === 'function') {
                    onSuccess(commentId);
                }
                return [2 /*return*/];
        }
    });
}); }; };
export var revertComment = function (conversationId, commentId, provider) { return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        provider.revertComment(conversationId, commentId);
        return [2 /*return*/];
    });
}); }; };
export var updateUser = function (user, provider) { return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        provider.updateUser(user);
        return [2 /*return*/];
    });
}); }; };
export var createConversation = function (localId, value, meta, provider, objectId, containerId, onSuccess) { return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var conversationId;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, provider.create(localId, value, meta, objectId, containerId)];
            case 1:
                conversationId = (_a.sent()).conversationId;
                if (typeof onSuccess === 'function') {
                    onSuccess(conversationId);
                }
                return [2 /*return*/];
        }
    });
}); }; };
export var saveDraft = function (isLocal, value, conversationId, commentId, meta, provider, objectId, containerId) { return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        provider.saveDraft(isLocal, value, conversationId, commentId, meta, objectId, containerId);
        return [2 /*return*/];
    });
}); }; };
//# sourceMappingURL=actions.js.map