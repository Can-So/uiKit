import * as URI from 'urijs';
import { ResultType, AnalyticsType, ContentType, } from '../model/Result';
import { Scope } from './types';
export function removeHighlightTags(text) {
    return text.replace(/@@@hl@@@|@@@endhl@@@/g, '');
}
function mapConfluenceItemToResultObject(item, searchSessionId, experimentId) {
    var href = new URI("" + item.baseUrl + item.url);
    href.addQuery('search_id', searchSessionId);
    return {
        resultId: item.content.id,
        name: removeHighlightTags(item.title),
        href: href.pathname() + "?" + href.query(),
        containerName: item.container.title,
        analyticsType: AnalyticsType.ResultConfluence,
        contentType: "confluence-" + item.content.type,
        resultType: ResultType.ConfluenceObjectResult,
        containerId: 'UNAVAILABLE',
        iconClass: item.iconCssClass,
        experimentId: experimentId,
    };
}
function mapConfluenceItemToResultSpace(spaceItem, searchSessionId, experimentId) {
    // add searchSessionId
    var href = new URI("" + (spaceItem.baseUrl || '') + spaceItem.container.displayUrl);
    href.addQuery('search_id', searchSessionId);
    return {
        resultId: "space-" + spaceItem.space.key,
        avatarUrl: "" + spaceItem.baseUrl + spaceItem.space.icon.path,
        name: spaceItem.container.title,
        href: href.pathname() + "?" + href.query(),
        analyticsType: AnalyticsType.ResultConfluence,
        resultType: ResultType.GenericContainerResult,
        contentType: ContentType.ConfluenceSpace,
        experimentId: experimentId,
    };
}
export function mapConfluenceItemToResult(scope, item, searchSessionId, experimentId) {
    var mapper = scope === Scope.ConfluenceSpace
        ? mapConfluenceItemToResultSpace
        : mapConfluenceItemToResultObject;
    return mapper(item, searchSessionId, experimentId);
}
//# sourceMappingURL=ConfluenceItemMapper.js.map