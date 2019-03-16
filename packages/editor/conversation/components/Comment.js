import * as tslib_1 from "tslib";
import AkAvatar from '@atlaskit/avatar';
import AkComment, { CommentAction, CommentAuthor, CommentTime, } from '@atlaskit/comment';
import { WithProviders } from '@atlaskit/editor-common';
import { ConnectedReactionsView } from '@atlaskit/reactions';
import { ReactRenderer } from '@atlaskit/renderer';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import * as React from 'react';
import styled from 'styled-components';
import CommentContainer from '../containers/Comment';
import { actionSubjectIds, eventTypes, fireEvent, trackEventActions, } from '../internal/analytics';
import Editor from './Editor';
export var DeletedMessage = function () { return React.createElement("em", null, "Comment deleted by the author"); };
var commentChanged = function (oldComment, newComment) {
    if (oldComment.state !== newComment.state) {
        return true;
    }
    if (oldComment.deleted !== newComment.deleted) {
        return true;
    }
    return false;
};
var userChanged = function (oldUser, newUser) {
    if (oldUser === void 0) { oldUser = { id: '' }; }
    if (newUser === void 0) { newUser = { id: '' }; }
    return oldUser.id !== newUser.id;
};
var Reactions = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  height: 20px;\n  & > div {\n    height: 20px;\n  }\n"], ["\n  height: 20px;\n  & > div {\n    height: 20px;\n  }\n"])));
var Comment = /** @class */ (function (_super) {
    tslib_1.__extends(Comment, _super);
    function Comment(props) {
        var _this = _super.call(this, props) || this;
        _this.dispatch = function (dispatch) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var handler = _this.props[dispatch];
            if (handler) {
                handler.apply(handler, args);
                _this.setState({
                    lastDispatch: { handler: dispatch, args: args },
                });
            }
        };
        _this.onReply = function (value, analyticsEvent) {
            var _a = _this.props, objectId = _a.objectId, containerId = _a.containerId;
            fireEvent(analyticsEvent, {
                actionSubjectId: actionSubjectIds.replyButton,
                objectId: objectId,
                containerId: containerId,
            });
            _this.setState({
                isReplying: true,
            });
        };
        _this.onSaveReply = function (value) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, conversationId, parentComment, sendAnalyticsEvent;
            return tslib_1.__generator(this, function (_b) {
                _a = this.props, conversationId = _a.conversationId, parentComment = _a.comment, sendAnalyticsEvent = _a.sendAnalyticsEvent;
                sendAnalyticsEvent({
                    actionSubjectId: actionSubjectIds.saveButton,
                });
                this.dispatch('onAddComment', conversationId, parentComment.commentId, value, undefined, function (id) {
                    sendAnalyticsEvent({
                        actionSubjectId: id,
                        action: trackEventActions.created,
                        eventType: eventTypes.TRACK,
                        actionSubject: 'comment',
                        attributes: {
                            nestedDepth: (parentComment.nestedDepth || 0) + 1,
                        },
                    });
                });
                this.setState({
                    isReplying: false,
                });
                return [2 /*return*/];
            });
        }); };
        _this.onCancelReply = function () {
            _this.props.sendAnalyticsEvent({
                actionSubjectId: actionSubjectIds.cancelButton,
            });
            _this.setState({
                isReplying: false,
            });
        };
        _this.onDelete = function (value, analyticsEvent) {
            var _a = _this.props, _b = _a.comment, nestedDepth = _b.nestedDepth, commentId = _b.commentId, objectId = _a.objectId, containerId = _a.containerId, conversationId = _a.conversationId, sendAnalyticsEvent = _a.sendAnalyticsEvent;
            fireEvent(analyticsEvent, {
                actionSubjectId: actionSubjectIds.deleteButton,
                objectId: objectId,
                containerId: containerId,
            });
            _this.dispatch('onDeleteComment', conversationId, commentId, function (id) {
                sendAnalyticsEvent({
                    actionSubjectId: id,
                    action: trackEventActions.deleted,
                    eventType: eventTypes.TRACK,
                    actionSubject: 'comment',
                    attributes: {
                        nestedDepth: nestedDepth || 0,
                    },
                });
            });
        };
        _this.onEdit = function (value, analyticsEvent) {
            var _a = _this.props, objectId = _a.objectId, containerId = _a.containerId;
            fireEvent(analyticsEvent, {
                actionSubjectId: actionSubjectIds.editButton,
                objectId: objectId,
                containerId: containerId,
            });
            _this.setState({
                isEditing: true,
            });
        };
        _this.handleCommentEditorChange = function (value) {
            var comment = _this.props.comment;
            _this.dispatch('onEditorChange', value, comment.commentId);
        };
        _this.onSaveEdit = function (value) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, conversationId, comment, sendAnalyticsEvent;
            return tslib_1.__generator(this, function (_b) {
                _a = this.props, conversationId = _a.conversationId, comment = _a.comment, sendAnalyticsEvent = _a.sendAnalyticsEvent;
                sendAnalyticsEvent({
                    actionSubjectId: actionSubjectIds.saveButton,
                });
                this.dispatch('onUpdateComment', conversationId, comment.commentId, value, function (id) {
                    sendAnalyticsEvent({
                        actionSubjectId: id,
                        action: trackEventActions.updated,
                        eventType: eventTypes.TRACK,
                        actionSubject: 'comment',
                        attributes: {
                            nestedDepth: comment.nestedDepth || 0,
                        },
                    });
                });
                this.setState({
                    isEditing: false,
                });
                return [2 /*return*/];
            });
        }); };
        _this.onCancelEdit = function () {
            _this.props.sendAnalyticsEvent({
                actionSubjectId: actionSubjectIds.cancelButton,
            });
            _this.setState({
                isEditing: false,
            });
        };
        _this.onRequestCancel = function (value, analyticsEvent) {
            var _a = _this.props, comment = _a.comment, onCancel = _a.onCancel, objectId = _a.objectId, containerId = _a.containerId;
            // Invoke optional onCancel hook
            if (onCancel) {
                onCancel();
            }
            fireEvent(analyticsEvent, {
                actionSubjectId: actionSubjectIds.cancelFailedRequestButton,
                objectId: objectId,
                containerId: containerId,
            });
            _this.dispatch('onRevertComment', comment.conversationId, comment.commentId);
        };
        _this.onRequestRetry = function (value, analyticsEvent) {
            var lastDispatch = _this.state.lastDispatch;
            var _a = _this.props, objectId = _a.objectId, containerId = _a.containerId, onRetry = _a.onRetry, _b = _a.comment, localId = _b.localId, isPlaceholder = _b.isPlaceholder;
            if (onRetry && isPlaceholder) {
                return onRetry(localId);
            }
            fireEvent(analyticsEvent, {
                actionSubjectId: actionSubjectIds.retryFailedRequestButton,
                objectId: objectId,
                containerId: containerId,
            });
            if (!lastDispatch) {
                return;
            }
            _this.dispatch.apply(_this, tslib_1.__spread([lastDispatch.handler], lastDispatch.args));
        };
        /**
         * Username click handler - pass a User object, returns a handler which will invoke onUserClick with it
         * @param {User} user
         */
        _this.handleUserClick = function (user) { return function () {
            var onUserClick = _this.props.onUserClick;
            if (onUserClick && typeof onUserClick === 'function') {
                onUserClick(user);
            }
        }; };
        _this.handleTimeClick = function () {
            var _a = _this.props, comment = _a.comment, onHighlightComment = _a.onHighlightComment, disableScrollTo = _a.disableScrollTo;
            if (!disableScrollTo && comment && onHighlightComment) {
                onHighlightComment(comment.commentId);
            }
        };
        _this.state = {
            isEditing: false,
        };
        return _this;
    }
    Comment.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var _a = this.state, isEditing = _a.isEditing, isReplying = _a.isReplying;
        var _b = this.props, isHighlighted = _b.isHighlighted, portal = _b.portal;
        if (nextState.isEditing !== isEditing ||
            nextState.isReplying !== isReplying ||
            nextProps.isHighlighted !== isHighlighted ||
            nextProps.portal !== portal) {
            return true;
        }
        if (commentChanged(this.props.comment, nextProps.comment)) {
            return true;
        }
        if (userChanged(this.props.user, nextProps.user)) {
            return true;
        }
        var _c = this.props.comments, oldComments = _c === void 0 ? [] : _c;
        var _d = nextProps.comments, newComments = _d === void 0 ? [] : _d;
        if (oldComments.length !== newComments.length) {
            return true;
        }
        if (newComments.some(function (newComment) {
            var _a = tslib_1.__read(oldComments.filter(function (oldComment) {
                return oldComment.commentId === newComment.commentId ||
                    oldComment.localId === newComment.localId;
            }), 1), oldComment = _a[0];
            return commentChanged(oldComment, newComment);
        })) {
            return true;
        }
        return false;
    };
    Comment.prototype.getContent = function () {
        var _a = this.props, comment = _a.comment, dataProviders = _a.dataProviders, user = _a.user, renderEditor = _a.renderEditor, disableScrollTo = _a.disableScrollTo, allowFeedbackAndHelpButtons = _a.allowFeedbackAndHelpButtons, onEditorClose = _a.onEditorClose, onEditorOpen = _a.onEditorOpen, portal = _a.portal;
        var isEditing = this.state.isEditing;
        if (comment.deleted) {
            return React.createElement(DeletedMessage, null);
        }
        if (isEditing) {
            return (React.createElement(Editor, { defaultValue: comment.document.adf, isExpanded: true, isEditing: isEditing, onSave: this.onSaveEdit, onCancel: this.onCancelEdit, onClose: onEditorClose, onOpen: onEditorOpen, onChange: this.handleCommentEditorChange, dataProviders: dataProviders, user: user, renderEditor: renderEditor, disableScrollTo: disableScrollTo, allowFeedbackAndHelpButtons: allowFeedbackAndHelpButtons }));
        }
        return (React.createElement(ReactRenderer, { document: comment.document.adf, dataProviders: dataProviders, disableHeadingIDs: true, portal: portal }));
    };
    Comment.prototype.renderComments = function () {
        var _a = this.props, comments = _a.comments, conversationId = _a.conversationId, user = _a.user, onUserClick = _a.onUserClick, dataProviders = _a.dataProviders, onAddComment = _a.onAddComment, onUpdateComment = _a.onUpdateComment, onDeleteComment = _a.onDeleteComment, onRevertComment = _a.onRevertComment, onHighlightComment = _a.onHighlightComment, onRetry = _a.onRetry, onCancel = _a.onCancel, renderEditor = _a.renderEditor, objectId = _a.objectId, containerId = _a.containerId, disableScrollTo = _a.disableScrollTo, onEditorClose = _a.onEditorClose, onEditorOpen = _a.onEditorOpen, onEditorChange = _a.onEditorChange, sendAnalyticsEvent = _a.sendAnalyticsEvent, portal = _a.portal;
        if (!comments || comments.length === 0) {
            return null;
        }
        return comments.map(function (child) { return (React.createElement(CommentContainer, { key: child.localId, comment: child, user: user, conversationId: conversationId, onAddComment: onAddComment, onUpdateComment: onUpdateComment, onDeleteComment: onDeleteComment, onEditorClose: onEditorClose, onEditorOpen: onEditorOpen, onEditorChange: onEditorChange, onRevertComment: onRevertComment, onHighlightComment: onHighlightComment, onRetry: onRetry, onCancel: onCancel, onUserClick: onUserClick, dataProviders: dataProviders, renderComment: function (props) { return React.createElement(Comment, tslib_1.__assign({}, props)); }, renderEditor: renderEditor, objectId: objectId, containerId: containerId, disableScrollTo: disableScrollTo, sendAnalyticsEvent: sendAnalyticsEvent, portal: portal })); });
    };
    Comment.prototype.renderEditor = function () {
        var isReplying = this.state.isReplying;
        if (!isReplying) {
            return null;
        }
        var _a = this.props, dataProviders = _a.dataProviders, user = _a.user, renderEditor = _a.renderEditor, disableScrollTo = _a.disableScrollTo, allowFeedbackAndHelpButtons = _a.allowFeedbackAndHelpButtons, onEditorClose = _a.onEditorClose, onEditorOpen = _a.onEditorOpen;
        return (React.createElement(Editor, { isExpanded: true, onCancel: this.onCancelReply, onSave: this.onSaveReply, dataProviders: dataProviders, onOpen: onEditorOpen, onClose: onEditorClose, onChange: this.handleCommentEditorChange, user: user, renderEditor: renderEditor, disableScrollTo: disableScrollTo, allowFeedbackAndHelpButtons: allowFeedbackAndHelpButtons }));
    };
    Comment.prototype.getActions = function () {
        var _a = this.props, comment = _a.comment, user = _a.user, dataProviders = _a.dataProviders, objectId = _a.objectId;
        var isEditing = this.state.isEditing;
        var canReply = !!user && !isEditing && !comment.deleted;
        if (!canReply) {
            return undefined;
        }
        var createdBy = comment.createdBy, commentAri = comment.commentAri;
        var actions = [
            React.createElement(CommentAction, { key: "reply", onClick: this.onReply }, "Reply"),
        ];
        if (createdBy && user && user.id === createdBy.id) {
            actions = tslib_1.__spread(actions, [
                React.createElement(CommentAction, { key: "edit", onClick: this.onEdit }, "Edit"),
                React.createElement(CommentAction, { key: "delete", onClick: this.onDelete }, "Delete"),
            ]);
        }
        if (objectId &&
            commentAri &&
            dataProviders &&
            dataProviders.hasProvider('reactionsStore') &&
            dataProviders.hasProvider('emojiProvider')) {
            actions = tslib_1.__spread(actions, [
                React.createElement(WithProviders, { key: "reactions", providers: ['emojiProvider', 'reactionsStore'], providerFactory: dataProviders, renderNode: function (_a) {
                        var emojiProvider = _a.emojiProvider, reactionsStore = _a.reactionsStore;
                        return (React.createElement(Reactions, null,
                            React.createElement(ConnectedReactionsView, { store: reactionsStore, containerAri: objectId, ari: commentAri, emojiProvider: emojiProvider })));
                    } }),
            ]);
        }
        return actions;
    };
    Comment.prototype.render = function () {
        var _a = this.props, comment = _a.comment, onUserClick = _a.onUserClick, isHighlighted = _a.isHighlighted, disableScrollTo = _a.disableScrollTo;
        var createdBy = comment.createdBy, commentState = comment.state, error = comment.error;
        var errorProps = {};
        if (error) {
            errorProps.actions = [];
            if (error.canRetry) {
                errorProps.actions = [
                    React.createElement(CommentAction, { key: "retry", onClick: this.onRequestRetry }, "Retry"),
                ];
            }
            errorProps.actions = tslib_1.__spread(errorProps.actions, [
                React.createElement(CommentAction, { key: "cancel", onClick: this.onRequestCancel }, "Cancel"),
            ]);
            errorProps.message = error.message;
        }
        var comments = this.renderComments();
        var editor = this.renderEditor();
        var commentId = disableScrollTo
            ? undefined
            : "comment-" + comment.commentId;
        return (React.createElement(AkComment, { id: commentId, author: 
            // Render with onClick/href if they're supplied
            onUserClick || createdBy.profileUrl ? (React.createElement(CommentAuthor, { onClick: this.handleUserClick(createdBy), href: createdBy.profileUrl || '#' }, createdBy && createdBy.name)) : (
            // Otherwise just render text
            React.createElement(CommentAuthor, null, createdBy && createdBy.name)), avatar: React.createElement(AkAvatar, { src: createdBy && createdBy.avatarUrl, href: createdBy && createdBy.profileUrl, name: createdBy && createdBy.name, enableTooltip: true }), time: React.createElement(CommentTime, { onClick: this.handleTimeClick, href: disableScrollTo ? undefined : "#" + commentId }, distanceInWordsToNow(new Date(comment.createdAt), {
                addSuffix: true,
            })), actions: this.getActions(), content: this.getContent(), isSaving: commentState === 'SAVING', isError: commentState === 'ERROR', errorActions: errorProps.actions, errorIconLabel: errorProps.message, highlighted: isHighlighted }, editor || comments ? (React.createElement("div", null,
            comments,
            editor)) : null));
    };
    return Comment;
}(React.Component));
export default Comment;
var templateObject_1;
//# sourceMappingURL=Comment.js.map