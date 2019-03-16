import * as tslib_1 from "tslib";
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import Conversation from '../components/Conversation';
import { withAnalyticsEvents } from '@findable/analytics-next';
import { addComment, updateComment, deleteComment, revertComment, updateUser, createConversation, HIGHLIGHT_COMMENT, saveDraft, } from '../internal/actions';
import { getComments, getConversation, getUser } from '../internal/selectors';
import { uuid } from '../internal/uuid';
var mapStateToProps = function (state, ownProps) {
    var id = ownProps.id, localId = ownProps.localId, objectId = ownProps.objectId, containerId = ownProps.containerId;
    var conversation = getConversation(state, id || localId);
    var comments = getComments(state, id || localId);
    var user = getUser(state);
    return tslib_1.__assign({}, ownProps, { conversation: conversation,
        comments: comments,
        objectId: objectId,
        containerId: containerId,
        user: user });
};
var mapDispatchToProps = function (dispatch, _a) {
    var provider = _a.provider;
    return ({
        onAddComment: function (conversationId, parentId, value, localId, onSuccess) {
            dispatch(addComment(conversationId, parentId, value, localId, provider, onSuccess));
        },
        onUpdateComment: function (conversationId, commentId, value, onSuccess) {
            dispatch(updateComment(conversationId, commentId, value, provider, onSuccess));
        },
        onDeleteComment: function (conversationId, commentId, onSuccess) {
            dispatch(deleteComment(conversationId, commentId, provider, onSuccess));
        },
        onRevertComment: function (conversationId, commentId) {
            dispatch(revertComment(conversationId, commentId, provider));
        },
        onHighlightComment: function (commentId) {
            dispatch({ type: HIGHLIGHT_COMMENT, payload: { commentId: commentId } });
        },
        onUpdateUser: function (user) {
            dispatch(updateUser(user, provider));
        },
        onCreateConversation: function (localId, value, meta, objectId, containerId, onSuccess) {
            dispatch(createConversation(localId, value, meta, provider, objectId, containerId, onSuccess));
        },
        onEditorChange: function (isLocal, value, conversationId, commentId, meta, objectId, containerId) {
            dispatch(saveDraft(isLocal, value, conversationId, commentId, meta, provider, objectId, containerId));
        },
    });
};
var ResourcedConversation = withAnalyticsEvents()(connect(mapStateToProps, mapDispatchToProps)(Conversation));
var ConversationContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ConversationContainer, _super);
    function ConversationContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            localId: props.id || uuid.generate(),
        };
        return _this;
    }
    ConversationContainer.prototype.render = function () {
        var _a = this, props = _a.props, localId = _a.state.localId;
        var store = props.provider.store;
        return (React.createElement(Provider, { store: store },
            React.createElement(ResourcedConversation, tslib_1.__assign({}, props, { localId: localId }))));
    };
    return ConversationContainer;
}(React.Component));
export default ConversationContainer;
//# sourceMappingURL=Conversation.js.map