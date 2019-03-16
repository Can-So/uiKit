import * as tslib_1 from "tslib";
var _a;
import { FETCH_CONVERSATIONS_REQUEST, FETCH_CONVERSATIONS_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR, UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_ERROR, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR, REVERT_COMMENT, UPDATE_USER_SUCCESS, CREATE_CONVERSATION_REQUEST, CREATE_CONVERSATION_SUCCESS, CREATE_CONVERSATION_ERROR, HIGHLIGHT_COMMENT, } from './actions';
import { createReducer } from './create-reducer';
export var getNestedDepth = function (conversation, parentId, level) {
    if (level === void 0) { level = 0; }
    if (!conversation ||
        !conversation.comments ||
        !parentId ||
        conversation.conversationId === parentId) {
        return level;
    }
    var parent = conversation.comments.find(function (comment) { return comment.commentId === parentId; });
    if (!parent) {
        return level;
    }
    if (typeof parent.nestedDepth === 'number') {
        return parent.nestedDepth + 1;
    }
    return getNestedDepth(conversation, parent.parentId, level + 1);
};
var updateComment = function (comments, newComment) {
    return (comments || []).map(function (comment) {
        if ((newComment.localId && comment.localId === newComment.localId) ||
            comment.commentId === newComment.commentId) {
            return tslib_1.__assign({}, comment, { oldDocument: comment.oldDocument || comment.document }, newComment);
        }
        return comment;
    });
};
var removeComment = function (comments, commentToRemove) {
    return (comments || []).filter(function (comment) {
        return ((commentToRemove.localId &&
            comment.localId !== commentToRemove.localId) ||
            comment.commentId !== commentToRemove.commentId);
    });
};
var updateConversation = function (conversations, newConversation) {
    return conversations.map(function (conversation) {
        if (conversation.localId === newConversation.localId) {
            return newConversation;
        }
        return conversation;
    });
};
var updateCommentInConversation = function (conversations, newComment) {
    return conversations.map(function (conversation) {
        if (conversation.conversationId === newComment.conversationId) {
            var comments = updateComment(conversation.comments, newComment);
            return tslib_1.__assign({}, conversation, { comments: comments });
        }
        return conversation;
    });
};
var addOrUpdateCommentInConversation = function (conversations, newComment) {
    return conversations.map(function (conversation) {
        if (conversation.conversationId === newComment.conversationId) {
            var _a = conversation.comments, comments = _a === void 0 ? [] : _a;
            // If the comment already exists, update the existing one
            if (newComment.localId &&
                comments.some(function (comment) { return newComment.localId === comment.localId; })) {
                return tslib_1.__assign({}, conversation, { comments: updateComment(comments, newComment) });
            }
            newComment.nestedDepth = getNestedDepth(conversation, newComment.parentId);
            // Otherwise, add it
            return tslib_1.__assign({}, conversation, { comments: tslib_1.__spread(comments, [newComment]) });
        }
        return conversation;
    });
};
var removeCommentFromConversation = function (conversations, commentToRemove) {
    return conversations.reduce(function (current, conversation) {
        if (conversation.conversationId === commentToRemove.conversationId) {
            var comments = removeComment(conversation.comments, commentToRemove);
            // If there's no comments, don't add the conversation
            if (comments.length === 0) {
                return current;
            }
            return tslib_1.__spread(current, [
                tslib_1.__assign({}, conversation, { comments: comments }),
            ]);
        }
        return tslib_1.__spread(current, [conversation]);
    }, []);
};
var getCommentFromConversation = function (conversations, commentToFind) {
    var commentId = commentToFind.commentId, conversationId = commentToFind.conversationId;
    if (!conversationId || !commentId) {
        return null;
    }
    var _a = tslib_1.__read(conversations.reduce(function (acc, conversation) {
        if (conversation.conversationId !== conversationId ||
            !conversation.comments) {
            return acc;
        }
        return conversation.comments.reduce(function (commentsAcc, comment) {
            if (comment.commentId !== commentId) {
                return commentsAcc;
            }
            return tslib_1.__spread(commentsAcc, [comment]);
        }, acc);
    }, []), 1), _b = _a[0], comment = _b === void 0 ? null : _b;
    return comment;
};
export var initialState = {
    conversations: [],
};
export var reducers = createReducer(initialState, (_a = {},
    _a[FETCH_CONVERSATIONS_REQUEST] = function (state, action) {
        return tslib_1.__assign({}, state);
    },
    _a[FETCH_CONVERSATIONS_SUCCESS] = function (state, action) {
        var leveledConversations = action.payload.map(function (conversation) {
            if (!conversation.comments) {
                return tslib_1.__assign({}, conversation);
            }
            conversation.comments = conversation.comments.map(function (comment) { return (tslib_1.__assign({}, comment, { nestedDepth: getNestedDepth(conversation, comment.parentId) })); });
            return conversation;
        });
        var conversations = tslib_1.__spread(leveledConversations);
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[ADD_COMMENT_REQUEST] = function (state, action) {
        var payload = action.payload;
        var conversations = addOrUpdateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { isPlaceholder: true, state: 'SAVING' }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[ADD_COMMENT_SUCCESS] = function (state, action) {
        var payload = action.payload;
        var conversations;
        conversations = addOrUpdateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { state: undefined, oldDocument: undefined, isPlaceholder: false }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[ADD_COMMENT_ERROR] = function (state, action) {
        var payload = action.payload;
        var conversations = updateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { state: 'ERROR' }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[UPDATE_COMMENT_REQUEST] = function (state, action) {
        var payload = action.payload;
        var conversations = updateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { state: 'SAVING' }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[UPDATE_COMMENT_SUCCESS] = function (state, action) {
        var payload = action.payload;
        var conversations = updateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { state: undefined, oldDocument: undefined }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[UPDATE_COMMENT_ERROR] = function (state, action) {
        var payload = action.payload;
        var conversations = updateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { state: 'ERROR' }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[DELETE_COMMENT_REQUEST] = function (state, action) {
        var payload = action.payload;
        var conversations = updateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { state: 'SAVING' }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[DELETE_COMMENT_SUCCESS] = function (state, action) {
        var payload = action.payload;
        var conversations = updateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { state: undefined, deleted: true, oldDocument: undefined }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[DELETE_COMMENT_ERROR] = function (state, action) {
        var payload = action.payload;
        var conversations = updateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { state: 'ERROR' }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[REVERT_COMMENT] = function (state, action) {
        var payload = action.payload;
        var comment = getCommentFromConversation(state.conversations, payload);
        var conversations;
        if (!comment) {
            return state;
        }
        if (comment.isPlaceholder) {
            conversations = removeCommentFromConversation(state.conversations, tslib_1.__assign({}, payload));
        }
        else {
            conversations = updateCommentInConversation(state.conversations, tslib_1.__assign({}, payload, { state: undefined, document: comment.oldDocument, deleted: false, oldDocument: undefined }));
        }
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[HIGHLIGHT_COMMENT] = function (state, action) {
        var payload = action.payload;
        var highlighted = payload.commentId.toString();
        return tslib_1.__assign({}, state, { highlighted: highlighted });
    },
    _a[UPDATE_USER_SUCCESS] = function (state, action) {
        return tslib_1.__assign({}, state, { user: action.payload.user });
    },
    _a[CREATE_CONVERSATION_REQUEST] = function (state, action) {
        var payload = action.payload;
        var _a = tslib_1.__read(payload.comments, 1), comment = _a[0];
        var conversations = tslib_1.__spread(state.conversations, [
            tslib_1.__assign({}, payload, { comments: [
                    tslib_1.__assign({}, comment, { state: 'SAVING', isPlaceholder: true }),
                ] }),
        ]);
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[CREATE_CONVERSATION_SUCCESS] = function (state, action) {
        var payload = action.payload;
        var conversations = updateConversation(state.conversations, payload);
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a[CREATE_CONVERSATION_ERROR] = function (state, action) {
        var _a = action.payload, _b = tslib_1.__read(_a.comments, 1), comment = _b[0], error = _a.error;
        var conversations = updateCommentInConversation(state.conversations, tslib_1.__assign({}, comment, { state: 'ERROR', error: error }));
        return tslib_1.__assign({}, state, { conversations: conversations });
    },
    _a));
//# sourceMappingURL=reducers.js.map