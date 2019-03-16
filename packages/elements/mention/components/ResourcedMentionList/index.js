import * as tslib_1 from "tslib";
import * as React from 'react';
import uniqueId from '../../util/id';
import debug from '../../util/logger';
import MentionList from '../MentionList';
function applyPresence(mentions, presences) {
    var updatedMentions = [];
    for (var i = 0; i < mentions.length; i++) {
        // Shallow copy
        var mention = tslib_1.__assign({}, mentions[i]);
        var presence = presences[mention.id];
        if (presence) {
            mention.presence = presence;
        }
        updatedMentions.push(mention);
    }
    return updatedMentions;
}
function extractPresences(mentions) {
    var presences = {};
    for (var i = 0; i < mentions.length; i++) {
        var mention = mentions[i];
        if (mention.presence) {
            presences[mention.id] = mention.presence;
        }
    }
    return presences;
}
var ResourcedMentionList = /** @class */ (function (_super) {
    tslib_1.__extends(ResourcedMentionList, _super);
    function ResourcedMentionList(props) {
        var _this = _super.call(this, props) || this;
        // API
        _this.selectNext = function () {
            if (_this.mentionListRef) {
                _this.mentionListRef.selectNext();
            }
        };
        _this.selectPrevious = function () {
            if (_this.mentionListRef) {
                _this.mentionListRef.selectPrevious();
            }
        };
        _this.selectIndex = function (index, callback) {
            if (_this.mentionListRef) {
                _this.mentionListRef.selectIndex(index, callback);
            }
        };
        _this.selectId = function (id, callback) {
            if (_this.mentionListRef) {
                _this.mentionListRef.selectId(id, callback);
            }
        };
        _this.chooseCurrentSelection = function () {
            if (_this.mentionListRef) {
                _this.mentionListRef.chooseCurrentSelection();
            }
        };
        _this.mentionsCount = function () {
            if (_this.mentionListRef) {
                return _this.mentionListRef.mentionsCount();
            }
            return 0;
        };
        // internal, used for callbacks
        _this.filterChange = function (mentions) {
            // Retain known presence
            var currentPresences = extractPresences(_this.state.mentions);
            _this.setState({
                resourceError: undefined,
                mentions: applyPresence(mentions, currentPresences),
            });
            _this.refreshPresences(mentions);
        };
        _this.filterError = function (error) {
            debug('ak-resourced-mentions-list._filterError', error);
            _this.setState({
                resourceError: error,
            });
        };
        _this.presenceUpdate = function (presences) {
            _this.setState({
                mentions: applyPresence(_this.state.mentions, presences),
            });
        };
        _this.notifySelection = function (mention) {
            _this.props.resourceProvider.recordMentionSelection(mention);
            if (_this.props.onSelection) {
                _this.props.onSelection(mention);
            }
        };
        _this.handleMentionListRef = function (ref) {
            _this.mentionListRef = ref;
        };
        _this.subscriberKey = uniqueId('ak-resourced-mention-list');
        _this.state = {
            resourceError: undefined,
            mentions: [],
        };
        _this.applyPropChanges({}, props);
        return _this;
    }
    ResourcedMentionList.prototype.componentDidMount = function () {
        this.subscribeMentionProvider(this.props.resourceProvider);
        this.subscribePresenceProvider(this.props.presenceProvider);
    };
    ResourcedMentionList.prototype.componentWillReceiveProps = function (nextProps) {
        this.applyPropChanges(this.props, nextProps);
    };
    ResourcedMentionList.prototype.componentWillUnmount = function () {
        this.unsubscribeMentionProvider(this.props.resourceProvider);
        this.unsubscribePresenceProvider(this.props.presenceProvider);
    };
    // internal
    ResourcedMentionList.prototype.subscribeMentionProvider = function (mentionProvider) {
        if (mentionProvider) {
            mentionProvider.subscribe(this.subscriberKey, this.filterChange, this.filterError);
        }
    };
    ResourcedMentionList.prototype.subscribePresenceProvider = function (presenceProvider) {
        if (presenceProvider) {
            presenceProvider.subscribe(this.subscriberKey, this.presenceUpdate);
        }
    };
    ResourcedMentionList.prototype.unsubscribeMentionProvider = function (mentionProvider) {
        if (mentionProvider) {
            mentionProvider.unsubscribe(this.subscriberKey);
        }
    };
    ResourcedMentionList.prototype.unsubscribePresenceProvider = function (presenceProvider) {
        if (presenceProvider) {
            presenceProvider.unsubscribe(this.subscriberKey);
        }
    };
    ResourcedMentionList.prototype.applyPropChanges = function (prevProps, nextProps) {
        var oldResourceProvider = prevProps.resourceProvider;
        var oldPresenceProvider = prevProps.presenceProvider;
        var oldQuery = prevProps.query;
        var newResourceProvider = nextProps.resourceProvider;
        var newPresenceProvider = nextProps.presenceProvider;
        var newQuery = nextProps.query;
        var resourceProviderChanged = oldResourceProvider !== newResourceProvider;
        var queryChanged = oldQuery !== newQuery;
        var canFilter = !!(typeof newQuery === 'string' && newResourceProvider);
        var shouldFilter = canFilter && (queryChanged || resourceProviderChanged);
        // resource provider
        if (resourceProviderChanged) {
            this.unsubscribeMentionProvider(oldResourceProvider);
            this.subscribeMentionProvider(newResourceProvider);
        }
        // presence provider
        if (oldPresenceProvider !== newPresenceProvider) {
            this.unsubscribePresenceProvider(oldPresenceProvider);
            this.subscribePresenceProvider(newPresenceProvider);
        }
        if (shouldFilter) {
            newResourceProvider.filter(newQuery);
        }
    };
    ResourcedMentionList.prototype.refreshPresences = function (mentions) {
        if (this.props.presenceProvider) {
            var ids = mentions.map(function (mention) { return mention.id; });
            this.props.presenceProvider.refreshPresence(ids);
        }
    };
    ResourcedMentionList.prototype.render = function () {
        var _a = this.state, mentions = _a.mentions, resourceError = _a.resourceError;
        return (React.createElement(MentionList, { mentions: mentions, resourceError: resourceError, onSelection: this.notifySelection, ref: this.handleMentionListRef }));
    };
    return ResourcedMentionList;
}(React.PureComponent));
export default ResourcedMentionList;
//# sourceMappingURL=index.js.map