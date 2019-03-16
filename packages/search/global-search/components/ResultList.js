import * as tslib_1 from "tslib";
import * as React from 'react';
import { ObjectResult as ObjectResultComponent, PersonResult as PersonResultComponent, ContainerResult as ContainerResultComponent, } from '@atlaskit/quick-search';
import { FormattedMessage } from 'react-intl';
import { messages } from '../messages';
import { ResultType, JiraProjectType, ContentType, } from '../model/Result';
import { SelectedIcon } from './styled';
import { getAvatarForConfluenceObjectResult } from '../util/confluence-avatar-util';
import { getDefaultAvatar } from '../util/jira-avatar-util';
import DarkReturn from '../assets/DarkReturn';
var extractAvatarData = function (jiraResult) {
    return jiraResult.avatarUrl
        ? { avatarUrl: jiraResult.avatarUrl }
        : {
            avatar: getDefaultAvatar(jiraResult.contentType),
        };
};
var selectedIcon = (React.createElement(SelectedIcon, null,
    React.createElement(DarkReturn, null)));
var getI18nJiraContainerName = function (projectType) {
    switch (projectType) {
        case JiraProjectType.Business: {
            return (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.jira_project_type_business_project)));
        }
        case JiraProjectType.Software: {
            return (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.jira_project_type_software_project)));
        }
        case JiraProjectType.ServiceDesk: {
            return (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.jira_project_type_service_desk_project)));
        }
        case JiraProjectType.Ops: {
            return React.createElement(FormattedMessage, tslib_1.__assign({}, messages.jira_project_type_ops_project));
        }
    }
};
var getI18nJiraContentType = function (contentType) {
    switch (contentType) {
        case ContentType.JiraBoard: {
            return React.createElement(FormattedMessage, tslib_1.__assign({}, messages.jira_result_type_board));
        }
        case ContentType.JiraFilter: {
            return React.createElement(FormattedMessage, tslib_1.__assign({}, messages.jira_result_type_filter));
        }
    }
    return undefined;
};
export var getUniqueResultId = function (result) {
    return result.key ? result.key : result.contentType + "-" + result.resultId;
};
var ResultList = /** @class */ (function (_super) {
    tslib_1.__extends(ResultList, _super);
    function ResultList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultList.prototype.render = function () {
        var _this = this;
        var _a = this.props, results = _a.results, sectionIndex = _a.sectionIndex;
        return results.map(function (result, index) {
            var resultType = result.resultType;
            var analyticsData = tslib_1.__assign({ sectionIndex: sectionIndex, indexWithinSection: index, containerId: result.containerId, experimentId: result.experimentId }, _this.props.analyticsData, { contentType: result.contentType, resultId: result.resultId });
            // Make sure that key and resultId are unique across all search results
            var uniqueResultId = getUniqueResultId(result);
            var uniqueKey = uniqueResultId + "_" + Date.now(); // same result might appear on two successive search
            switch (resultType) {
                case ResultType.ConfluenceObjectResult: {
                    var confluenceResult = result;
                    return (React.createElement(ObjectResultComponent, { key: uniqueKey, resultId: uniqueResultId, name: confluenceResult.name, href: confluenceResult.href, type: confluenceResult.analyticsType, containerName: confluenceResult.containerName, avatar: getAvatarForConfluenceObjectResult(confluenceResult), analyticsData: analyticsData, selectedIcon: selectedIcon }));
                }
                case ResultType.JiraProjectResult: {
                    var jiraResult = result;
                    var avatarData = extractAvatarData(jiraResult);
                    var containerNameElement = jiraResult.projectType
                        ? getI18nJiraContainerName(jiraResult.projectType)
                        : null;
                    return (React.createElement(ContainerResultComponent, tslib_1.__assign({ key: uniqueKey, resultId: uniqueResultId, name: jiraResult.name, href: jiraResult.href, type: jiraResult.analyticsType, subText: containerNameElement }, avatarData, { analyticsData: analyticsData, selectedIcon: selectedIcon })));
                }
                case ResultType.JiraObjectResult: {
                    var jiraResult = result;
                    var avatarData = extractAvatarData(jiraResult);
                    var objectKey = jiraResult.contentType === 'jira-board' ||
                        jiraResult.contentType === 'jira-filter'
                        ? getI18nJiraContentType(jiraResult.contentType)
                        : jiraResult.objectKey;
                    return (React.createElement(ObjectResultComponent, tslib_1.__assign({ key: uniqueKey, resultId: uniqueResultId, name: jiraResult.name, href: jiraResult.href, type: jiraResult.analyticsType, objectKey: objectKey, containerName: jiraResult.containerName }, avatarData, { analyticsData: analyticsData, selectedIcon: selectedIcon })));
                }
                case ResultType.GenericContainerResult: {
                    var containerResult = result;
                    return (React.createElement(ContainerResultComponent, { key: uniqueKey, resultId: uniqueResultId, name: containerResult.name, href: containerResult.href, type: containerResult.analyticsType, avatarUrl: containerResult.avatarUrl, analyticsData: analyticsData, selectedIcon: selectedIcon }));
                }
                case ResultType.PersonResult: {
                    var personResult = result;
                    return (React.createElement(PersonResultComponent, { key: uniqueKey, resultId: uniqueResultId, name: personResult.name, href: personResult.href, type: personResult.analyticsType, avatarUrl: personResult.avatarUrl, mentionName: personResult.mentionName, presenceMessage: personResult.presenceMessage, analyticsData: analyticsData, selectedIcon: selectedIcon, target: "_blank" }));
                }
                default: {
                    // Make the TS compiler verify that all enums have been matched
                    var _nonExhaustiveMatch = resultType;
                    throw new Error("Non-exhaustive match for result type: " + _nonExhaustiveMatch);
                }
            }
        });
    };
    return ResultList;
}(React.Component));
export default ResultList;
//# sourceMappingURL=ResultList.js.map