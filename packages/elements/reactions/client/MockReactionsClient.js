import * as tslib_1 from "tslib";
import { defaultReactionsByShortName } from '../components/Selector';
export var containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';
export var ari = 'ari:cloud:owner:demo-cloud-id:item/1';
export var reaction = function (shortName, count, reacted) { return ({
    ari: ari,
    containerAri: containerAri,
    emojiId: defaultReactionsByShortName.get(shortName).id,
    count: count,
    reacted: reacted,
}); };
export var user = function (id, displayName) { return ({ id: id, displayName: displayName }); };
var objectReactionKey = function (containerAri, ari) {
    return containerAri + "|" + ari;
};
var defaultUsers = [
    user('oscar', 'Oscar Wallhult'),
    user('julien', 'Julien Michel Hoarau'),
    user('craig', 'Craig Petchell'),
    user('jerome', 'Jerome Touffe-Blin'),
    user('esoares', 'Eduardo Soares'),
    user('lpereira', 'Luiz Pereira'),
    user('pcurren', 'Paul Curren'),
    user('ttjandra', 'Tara Tjandra'),
    user('severington', 'Ste Everington'),
    user('sguillope', 'Sylvain Guillope'),
    user('alunnon', 'Alex Lunnon'),
];
var MockReactionsClient = /** @class */ (function () {
    function MockReactionsClient(delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        var _this = this;
        this.mockData = (_a = {},
            _a[objectReactionKey(containerAri, ari)] = [
                reaction(':fire:', 1, true),
                reaction(':thumbsup:', 9, false),
                reaction(':thumbsdown:', 5, false),
                reaction(':heart_eyes:', 100, false),
            ],
            _a);
        this.delayPromise = function () {
            return new Promise(function (resolve) { return window.setTimeout(resolve, _this.delay); });
        };
        this.delay = delay;
    }
    MockReactionsClient.prototype.getReactions = function (containerAri, aris) {
        var _this = this;
        return this.delayPromise().then(function () {
            return aris.reduce(function (results, ari) {
                var reactionKey = objectReactionKey(containerAri, ari);
                results[ari] = _this.mockData[reactionKey] || [];
                return results;
            }, {});
        });
    };
    MockReactionsClient.prototype.getDetailedReaction = function (containerAri, ari, emojiId) {
        var _this = this;
        return this.delayPromise().then(function () {
            var reactionKey = containerAri + "|" + ari;
            var reactionsMockData = _this.mockData[reactionKey];
            if (reactionsMockData) {
                var reaction_1 = reactionsMockData.find(function (reaction) { return reaction.emojiId === emojiId; });
                if (reaction_1) {
                    var users = tslib_1.__spread(defaultUsers).slice(Math.floor(Math.random() * 4), Math.floor(Math.random() * 9) + 4)
                        .slice(0, reaction_1.count);
                    return tslib_1.__assign({}, reaction_1, { users: users });
                }
            }
            return {
                containerAri: containerAri,
                ari: ari,
                emojiId: emojiId,
                count: 1,
                reacted: true,
                users: [],
            };
        });
    };
    MockReactionsClient.prototype.addReaction = function (containerAri, ari, emojiId) {
        var _this = this;
        return this.delayPromise().then(function () {
            var reactionKey = objectReactionKey(containerAri, ari);
            var found = false;
            var reactionsMockData = _this.mockData[reactionKey];
            if (reactionsMockData) {
                _this.mockData[reactionKey] = reactionsMockData.map(function (reaction) {
                    if (reaction.emojiId === emojiId) {
                        found = true;
                        return tslib_1.__assign({}, reaction, { count: reaction.count + 1, reacted: true });
                    }
                    return reaction;
                });
            }
            if (!found) {
                _this.mockData[reactionKey] = tslib_1.__spread((reactionsMockData ? reactionsMockData : []), [
                    {
                        containerAri: containerAri,
                        ari: ari,
                        emojiId: emojiId,
                        count: 1,
                        reacted: true,
                    },
                ]);
            }
            return _this.mockData[reactionKey];
        });
    };
    MockReactionsClient.prototype.deleteReaction = function (containerAri, ari, emojiId) {
        var _this = this;
        return this.delayPromise().then(function () {
            var reactionKey = objectReactionKey(containerAri, ari);
            _this.mockData[reactionKey] = _this.mockData[reactionKey]
                .map(function (reaction) {
                if (reaction.emojiId === emojiId) {
                    if (reaction.count === 1) {
                        return undefined;
                    }
                    return tslib_1.__assign({}, reaction, { count: reaction.count - 1, reacted: false });
                }
                return reaction;
            })
                .filter(function (reaction) { return !!reaction; });
            return _this.mockData[reactionKey];
        });
    };
    return MockReactionsClient;
}());
export { MockReactionsClient };
//# sourceMappingURL=MockReactionsClient.js.map