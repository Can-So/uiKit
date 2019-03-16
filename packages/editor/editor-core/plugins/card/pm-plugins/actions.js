import { pluginKey } from './main';
export var cardAction = function (tr, action) {
    return tr.setMeta(pluginKey, action);
};
export var resolveCard = function (url) { return function (tr) {
    return cardAction(tr, {
        type: 'RESOLVE',
        url: url,
    });
}; };
export var queueCards = function (requests) { return function (tr) {
    return cardAction(tr, {
        type: 'QUEUE',
        requests: requests,
    });
}; };
export var setProvider = function (cardProvider) { return function (tr) {
    return cardAction(tr, {
        type: 'SET_PROVIDER',
        provider: cardProvider,
    });
}; };
//# sourceMappingURL=actions.js.map