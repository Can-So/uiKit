import * as tslib_1 from "tslib";
import createStore from '../internal/store';
import { FETCH_CONVERSATIONS_REQUEST, FETCH_CONVERSATIONS_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR, UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_ERROR, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR, REVERT_COMMENT, UPDATE_USER_SUCCESS, CREATE_CONVERSATION_REQUEST, CREATE_CONVERSATION_SUCCESS, CREATE_CONVERSATION_ERROR, } from '../internal/actions';
import { uuid } from '../internal/uuid';
import { HttpError } from './HttpError';
var getHighlightedComment = function () {
    if (!location || !location.hash) {
        return undefined;
    }
    var commentPrefix = 'comment-';
    var commentId = location.hash.indexOf(commentPrefix);
    if (commentId !== -1) {
        return location.hash.substr(commentId + commentPrefix.length);
    }
    return undefined;
};
var AbstractConversationResource = /** @class */ (function () {
    function AbstractConversationResource() {
        var _this = this;
        this.dispatch = function (action) {
            _this.store.dispatch(action);
        };
        var initialState = {
            conversations: [],
            highlighted: getHighlightedComment(),
        };
        this._store = createStore(initialState);
    }
    Object.defineProperty(AbstractConversationResource.prototype, "store", {
        get: function () {
            return this._store;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieve the IDs (and meta-data) for all conversations associated with the container ID.
     */
    AbstractConversationResource.prototype.getConversations = function (objectId, containerId) {
        return Promise.reject('Not implemented');
    };
    /**
     * Subscribe to the provider's internal store
     * @param {Handler} handler
     */
    AbstractConversationResource.prototype.subscribe = function (handler) {
        var _this = this;
        return this.store.subscribe(function () {
            var state = _this.store.getState();
            handler(state);
        });
    };
    /**
     * Creates a new Conversation and associates it with the containerId provided.
     */
    AbstractConversationResource.prototype.create = function (localId, value, meta, objectId, containerId) {
        return Promise.reject('Not implemented');
    };
    /**
     * Adds a comment to a parent, or update if existing. ParentId can be either a conversation or another comment.
     */
    AbstractConversationResource.prototype.addComment = function (conversationId, parentId, doc, localId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, Promise.reject('Not implemented')];
            });
        });
    };
    /**
     * Updates a comment based on ID. Returns updated content
     */
    AbstractConversationResource.prototype.updateComment = function (conversationId, commentId, document) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, Promise.reject('Not implemented')];
            });
        });
    };
    /**
     * Deletes a comment based on ID. Returns updated comment.
     */
    AbstractConversationResource.prototype.deleteComment = function (conversationId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, Promise.reject('Not implemented')];
            });
        });
    };
    /**
     * Reverts a comment based on ID.
     */
    AbstractConversationResource.prototype.revertComment = function (conversationId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, Promise.reject('Not implemented')];
            });
        });
    };
    /**
     * Updates a user in the store. Returns updated user
     */
    AbstractConversationResource.prototype.updateUser = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, Promise.reject('Not implemented')];
            });
        });
    };
    AbstractConversationResource.prototype.saveDraft = function (isLocal, value, conversationId, commentId, meta, objectId, containerId) {
        // Nothing to see here..
    };
    return AbstractConversationResource;
}());
export { AbstractConversationResource };
var ConversationResource = /** @class */ (function (_super) {
    tslib_1.__extends(ConversationResource, _super);
    function ConversationResource(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        if (config.user) {
            _this.updateUser(config.user);
        }
        return _this;
    }
    ConversationResource.prototype.makeRequest = function (path, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, fetchOptions, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.config.url;
                        fetchOptions = tslib_1.__assign({ credentials: 'include', headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            } }, options);
                        return [4 /*yield*/, fetch("" + url + path, fetchOptions)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new HttpError(response.status, response.statusText);
                        }
                        // Content deleted
                        if (response.status === 204) {
                            return [2 /*return*/, {}];
                        }
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieve the IDs (and meta-data) for all conversations associated with the container ID.
     */
    ConversationResource.prototype.getConversations = function (objectId, containerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dispatch, containerIdQuery, values;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch = this.dispatch;
                        dispatch({ type: FETCH_CONVERSATIONS_REQUEST });
                        containerIdQuery = containerId ? "&containerId=" + containerId : '';
                        return [4 /*yield*/, this.makeRequest("/conversation?objectId=" + objectId + containerIdQuery + "&expand=comments.document.adf", {
                                method: 'GET',
                            })];
                    case 1:
                        values = (_a.sent()).values;
                        dispatch({ type: FETCH_CONVERSATIONS_SUCCESS, payload: values });
                        return [2 /*return*/, values];
                }
            });
        });
    };
    /**
     * Creates a new Conversation and associates it with the containerId provided.
     */
    ConversationResource.prototype.create = function (localId, value, meta, objectId, containerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dispatch, isMain, tempConversation, result, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch = this.dispatch;
                        isMain = !meta || Object.keys(meta).length === 0;
                        tempConversation = this.createConversation(localId, value, meta, objectId, containerId, isMain);
                        if (tempConversation) {
                            dispatch({
                                type: CREATE_CONVERSATION_REQUEST,
                                payload: tslib_1.__assign({}, tempConversation),
                            });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.makeRequest('/conversation?expand=comments.document.adf', {
                                method: 'POST',
                                body: JSON.stringify({
                                    objectId: objectId,
                                    containerId: containerId,
                                    meta: meta,
                                    comment: {
                                        document: {
                                            adf: value,
                                        },
                                    },
                                    isMain: isMain,
                                }),
                            })];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        result = tslib_1.__assign({}, tempConversation, { error: error_1 });
                        dispatch({ type: CREATE_CONVERSATION_ERROR, payload: result });
                        return [2 /*return*/, result];
                    case 4:
                        dispatch({
                            type: CREATE_CONVERSATION_SUCCESS,
                            payload: tslib_1.__assign({}, result, { localId: localId }),
                        });
                        return [2 /*return*/, tslib_1.__assign({}, result, { localId: localId })];
                }
            });
        });
    };
    /**
     * Adds a comment to a parent, or update if existing. ParentId can be either a conversation or another comment.
     */
    ConversationResource.prototype.addComment = function (conversationId, parentId, doc, localId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dispatch, tempComment, result, error_2, result_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch = this.dispatch;
                        tempComment = localId
                            ? { conversationId: conversationId, localId: localId }
                            : this.createComment(conversationId, parentId, doc);
                        dispatch({ type: ADD_COMMENT_REQUEST, payload: tempComment });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.makeRequest("/conversation/" + conversationId + "/comment?expand=document.adf", {
                                method: 'POST',
                                body: JSON.stringify({
                                    parentId: parentId,
                                    document: {
                                        adf: doc,
                                    },
                                }),
                            })];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        result_1 = { conversationId: conversationId, parentId: parentId, document: doc, error: error_2 };
                        dispatch({ type: ADD_COMMENT_ERROR, payload: result_1 });
                        return [2 /*return*/, result_1];
                    case 4:
                        dispatch({
                            type: ADD_COMMENT_SUCCESS,
                            payload: tslib_1.__assign({}, result, { localId: tempComment.localId }),
                        });
                        return [2 /*return*/, tslib_1.__assign({}, result, { localId: tempComment.localId })];
                }
            });
        });
    };
    /**
     * Updates a comment based on ID. Returns updated content
     */
    ConversationResource.prototype.updateComment = function (conversationId, commentId, document) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dispatch, tempComment, result, error_3, result_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch = this.dispatch;
                        tempComment = this.getComment(conversationId, commentId);
                        if (tempComment) {
                            dispatch({
                                type: UPDATE_COMMENT_REQUEST,
                                payload: tslib_1.__assign({}, tempComment, { document: {
                                        adf: document,
                                    } }),
                            });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.makeRequest("/conversation/" + conversationId + "/comment/" + commentId + "?expand=document.adf", {
                                method: 'PUT',
                                body: JSON.stringify({
                                    id: commentId,
                                    document: {
                                        adf: document,
                                    },
                                }),
                            })];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        result_2 = { conversationId: conversationId, commentId: commentId, document: document, error: error_3 };
                        dispatch({ type: UPDATE_COMMENT_ERROR, payload: result_2 });
                        return [2 /*return*/, result_2];
                    case 4:
                        dispatch({ type: UPDATE_COMMENT_SUCCESS, payload: result });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Deletes a comment based on ID. Returns updated comment.
     */
    ConversationResource.prototype.deleteComment = function (conversationId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dispatch, error_4, result_3, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch = this.dispatch;
                        dispatch({
                            type: DELETE_COMMENT_REQUEST,
                            payload: { commentId: commentId, conversationId: conversationId },
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.makeRequest("/conversation/" + conversationId + "/comment/" + commentId, {
                                method: 'DELETE',
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        result_3 = { conversationId: conversationId, commentId: commentId, error: error_4 };
                        dispatch({ type: DELETE_COMMENT_ERROR, payload: result_3 });
                        return [2 /*return*/, result_3];
                    case 4:
                        result = {
                            conversationId: conversationId,
                            commentId: commentId,
                            deleted: true,
                        };
                        dispatch({ type: DELETE_COMMENT_SUCCESS, payload: result });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Reverts a comment based on ID.
     */
    ConversationResource.prototype.revertComment = function (conversationId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dispatch, comment;
            return tslib_1.__generator(this, function (_a) {
                dispatch = this.dispatch;
                comment = { conversationId: conversationId, commentId: commentId };
                dispatch({ type: REVERT_COMMENT, payload: comment });
                return [2 /*return*/, comment];
            });
        });
    };
    /**
     * Updates a user in the store. Returns updated user
     */
    ConversationResource.prototype.updateUser = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dispatch;
            return tslib_1.__generator(this, function (_a) {
                dispatch = this.dispatch;
                dispatch({ type: UPDATE_USER_SUCCESS, payload: { user: user } });
                return [2 /*return*/, user];
            });
        });
    };
    /**
     * Internal helper methods for optimistic updates
     */
    ConversationResource.prototype.createConversation = function (localId, value, meta, objectId, containerId, isMain) {
        return {
            localId: localId,
            objectId: objectId,
            meta: meta,
            conversationId: localId,
            comments: [this.createComment(localId, localId, value)],
            containerId: containerId,
            isMain: isMain,
        };
    };
    ConversationResource.prototype.createComment = function (conversationId, parentId, doc, localId) {
        if (localId === void 0) { localId = uuid.generate(); }
        var store = this.store;
        var state = store.getState();
        return {
            createdBy: state.user || { id: 'unknown' },
            createdAt: Date.now(),
            commentId: uuid.generate(),
            document: {
                adf: doc,
            },
            conversationId: conversationId,
            parentId: parentId,
            comments: [],
            localId: localId,
        };
    };
    ConversationResource.prototype.getComment = function (conversationId, commentId) {
        var store = this.store;
        var state = store.getState();
        if (!state) {
            return undefined;
        }
        var _a = tslib_1.__read(state.conversations.filter(function (c) { return c.conversationId === conversationId; }), 1), conversation = _a[0];
        if (!conversation) {
            return undefined;
        }
        var _b = tslib_1.__read((conversation.comments || []).filter(function (c) { return c.commentId === commentId; }), 1), comment = _b[0];
        return tslib_1.__assign({}, comment);
    };
    return ConversationResource;
}(AbstractConversationResource));
export { ConversationResource };
//# sourceMappingURL=ConversationResource.js.map