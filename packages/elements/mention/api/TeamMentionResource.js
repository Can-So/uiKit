import * as tslib_1 from "tslib";
import { utils as serviceUtils, } from '@atlaskit/util-service-support';
import { UserType, UserAccessLevel, } from '../types';
import MentionResource from './MentionResource';
import debug from '../util/logger';
var MAX_QUERY_TEAMS = 20;
/**
 * Provides a Javascript API to fetch users and teams
 * In future we will have a new endpoint to return both users and teams, we can
 * remove this class at this point
 */
var TeamMentionResource = /** @class */ (function (_super) {
    tslib_1.__extends(TeamMentionResource, _super);
    function TeamMentionResource(userMentionConfig, teamMentionConfig) {
        var _this = _super.call(this, userMentionConfig) || this;
        _this.verifyMentionConfig(teamMentionConfig);
        _this.teamMentionConfig = teamMentionConfig;
        return _this;
    }
    TeamMentionResource.prototype.remoteSearch = function (query, contextIdentifier) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var p1, p2, _a, userResults, teamResults;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        p1 = this.remoteUserSearch(query, contextIdentifier);
                        p2 = this.remoteTeamSearch(query, contextIdentifier);
                        return [4 /*yield*/, Promise.all([p1, p2])];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), userResults = _a[0], teamResults = _a[1];
                        // combine results of 2 requests
                        return [2 /*return*/, {
                                mentions: tslib_1.__spread(userResults.mentions, teamResults.mentions),
                                query: userResults.query,
                            }];
                }
            });
        });
    };
    /**
     * Returns the initial mention display list before a search is performed for the specified
     * container.
     */
    TeamMentionResource.prototype.remoteInitialState = function (contextIdentifier) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, getUserPromise, queryParams, options, getTeamsPromise, _a, usersResult, teamsResult, teamsMentionResult;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = '';
                        getUserPromise = _super.prototype.remoteInitialState.call(this, contextIdentifier);
                        queryParams = this.getQueryParamsOfTeamMentionConfig(contextIdentifier);
                        options = {
                            path: 'bootstrap',
                            queryParams: queryParams,
                        };
                        getTeamsPromise = serviceUtils.requestService(this.teamMentionConfig, options);
                        return [4 /*yield*/, Promise.all([
                                getUserPromise,
                                getTeamsPromise,
                            ])];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), usersResult = _a[0], teamsResult = _a[1];
                        teamsMentionResult = this.convertTeamResultToMentionResult(teamsResult, query);
                        // combine results of 2 requests
                        return [2 /*return*/, {
                                mentions: tslib_1.__spread(usersResult.mentions, teamsMentionResult.mentions),
                                query: usersResult.query,
                            }];
                }
            });
        });
    };
    TeamMentionResource.prototype.getQueryParamsOfTeamMentionConfig = function (contextIdentifier) {
        var configParams = {};
        if (this.teamMentionConfig.containerId) {
            configParams['containerId'] = this.teamMentionConfig.containerId;
        }
        if (this.teamMentionConfig.productId) {
            configParams['productIdentifier'] = this.teamMentionConfig.productId;
        }
        // if contextParams exist then it will override configParams for containerId
        return tslib_1.__assign({}, configParams, contextIdentifier);
    };
    TeamMentionResource.prototype.remoteUserSearch = function (query, contextIdentifier) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    return [2 /*return*/, _super.prototype.remoteSearch.call(this, query, contextIdentifier)];
                }
                catch (err) {
                    debug('ak-mention-resource.remoteUserSearch', err);
                    return [2 /*return*/, {
                            mentions: [],
                            query: query,
                        }];
                }
                return [2 /*return*/];
            });
        });
    };
    TeamMentionResource.prototype.remoteTeamSearch = function (query, contextIdentifier) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, teamResult, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            path: 'search',
                            queryParams: tslib_1.__assign({ query: query, limit: MAX_QUERY_TEAMS }, this.getQueryParamsOfTeamMentionConfig(contextIdentifier)),
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, serviceUtils.requestService(this.teamMentionConfig, options)];
                    case 2:
                        teamResult = _a.sent();
                        return [2 /*return*/, this.convertTeamResultToMentionResult(teamResult, query)];
                    case 3:
                        err_1 = _a.sent();
                        debug('ak-mention-resource.remoteTeamSearch', err_1);
                        return [2 /*return*/, {
                                mentions: [],
                                query: query,
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeamMentionResource.prototype.convertTeamResultToMentionResult = function (result, query) {
        var _this = this;
        var mentions = result.map(function (team) {
            return {
                id: _this.trimTeamARI(team.id),
                avatarUrl: team.smallAvatarImageUrl,
                name: team.displayName,
                accessLevel: UserAccessLevel[UserAccessLevel.CONTAINER],
                userType: UserType[UserType.TEAM],
                lozenge: UserType[UserType.TEAM],
                highlight: team.highlight,
                context: {
                    members: team.members,
                },
            };
        });
        return { mentions: mentions, query: query };
    };
    TeamMentionResource.prototype.trimTeamARI = function (teamId) {
        if (teamId === void 0) { teamId = ''; }
        var TEAM_ARI_PREFIX = 'ari:cloud:teams::team/';
        return teamId.replace(TEAM_ARI_PREFIX, '');
    };
    TeamMentionResource.prototype.recordSelection = function (mention, contextIdentifier) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // TODO: should we record a team selection
                _super.prototype.recordSelection.call(this, mention, contextIdentifier);
                return [2 /*return*/];
            });
        });
    };
    return TeamMentionResource;
}(MentionResource));
export default TeamMentionResource;
//# sourceMappingURL=TeamMentionResource.js.map