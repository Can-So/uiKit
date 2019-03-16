export var getConversation = function (state, conversationId) {
    return state.conversations.filter(function (c) { return c.conversationId === conversationId || c.localId === conversationId; })[0];
};
export var getComments = function (state, conversationId, parentId) {
    var conversation = getConversation(state, conversationId);
    if (conversation) {
        if (parentId) {
            return (conversation.comments || []).filter(function (c) { return c.parentId === parentId; });
        }
        return (conversation.comments || [])
            .filter(function (c) {
            return (!c.parentId && c.conversationId === conversation.conversationId) ||
                (c.parentId && c.parentId === conversation.conversationId);
        })
            .sort(function (a, b) {
            if (a.createdAt === b.createdAt) {
                return 0;
            }
            return a.createdAt < b.createdAt ? -1 : 1;
        });
    }
    return [];
};
export var getHighlighted = function (state) {
    return state.highlighted;
};
export var getUser = function (state) { return state.user; };
//# sourceMappingURL=selectors.js.map