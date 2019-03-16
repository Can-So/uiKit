import * as tslib_1 from "tslib";
import * as URI from 'urijs';
import * as uuid from 'uuid';
import { ResultType, AnalyticsType, ContentType, } from '../model/Result';
export var mapJiraItemToResult = function (item, searchSessionId, addSessionIdToJiraResult) {
    return item.attributes && item.attributes['@type']
        ? mapJiraItemToResultV2(item, searchSessionId, addSessionIdToJiraResult)
        : mapJiraItemToResultV1(item);
};
/**
 * add search session id, object id, container id and result type to query params
 */
export var addJiraResultQueryParams = function (url, queryParams) {
    var href = new URI(url);
    Object.keys(queryParams)
        .filter(function (key) { return !!queryParams[key]; })
        .forEach(function (key) {
        href.addQuery(key, queryParams[key]);
    });
    return href.toString();
};
var extractSpecificAttributes = function (attributes) {
    var type = attributes['@type'];
    switch (type) {
        case 'issue':
            return {
                objectKey: attributes.key,
                containerName: attributes.issueTypeName,
            };
        case 'board':
            return {
                containerName: attributes.containerName,
            };
        case 'filter':
            return {
                containerName: attributes.ownerName,
            };
        case 'project':
            return {
                containerName: attributes.projectType,
                projectType: attributes.projectType,
            };
    }
    return null;
};
var extractAvatarUrl = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.url, url = _c === void 0 ? '' : _c, _d = _b.urls, urls = _d === void 0 ? {} : _d;
    if (url) {
        return url;
    }
    return urls['48x48'] || urls[Object.keys(urls)[0]];
};
var JIRA_TYPE_TO_CONTENT_TYPE = {
    issue: ContentType.JiraIssue,
    board: ContentType.JiraBoard,
    filter: ContentType.JiraFilter,
    project: ContentType.JiraProject,
};
var mapJiraItemToResultV2 = function (item, searchSessionId, addSessionIdToJiraResult) {
    var id = item.id, name = item.name, url = item.url, attributes = item.attributes;
    var contentType = JIRA_TYPE_TO_CONTENT_TYPE[attributes['@type']];
    var queryParams = {
        searchSessionId: searchSessionId,
        searchContainerId: attributes.containerId,
        searchObjectId: id,
        searchContentType: attributes['@type'],
    };
    var href = addSessionIdToJiraResult
        ? addJiraResultQueryParams(url, queryParams)
        : url;
    var resultType = contentType === ContentType.JiraProject
        ? ResultType.JiraProjectResult
        : ResultType.JiraObjectResult;
    return tslib_1.__assign({ resultId: id, key: uuid(), name: name, href: href, resultType: resultType, containerId: attributes.containerId, analyticsType: AnalyticsType.ResultJira }, extractSpecificAttributes(attributes), { avatarUrl: attributes.avatar && extractAvatarUrl(attributes.avatar), contentType: contentType });
};
var mapJiraItemToResultV1 = function (item) {
    return {
        resultId: item.key,
        avatarUrl: item.fields.issuetype.iconUrl,
        name: item.fields.summary,
        href: "/browse/" + item.key,
        containerName: item.fields.project.name,
        objectKey: item.key,
        analyticsType: AnalyticsType.ResultJira,
        resultType: ResultType.JiraObjectResult,
        contentType: ContentType.JiraIssue,
    };
};
//# sourceMappingURL=JiraItemMapper.js.map