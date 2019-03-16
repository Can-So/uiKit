import * as tslib_1 from "tslib";
import RecentSearchClientImpl from './RecentSearchClient';
import CrossProductSearchClientImpl from './CrossProductSearchClient';
import PeopleSearchClientImpl from './PeopleSearchClient';
import ConfluenceClientImpl from './ConfluenceClient';
import JiraClientImpl from './JiraClient';
var defaultConfig = {
    activityServiceUrl: '/gateway/api/activity',
    searchAggregatorServiceUrl: '/gateway/api/xpsearch-aggregator',
    directoryServiceUrl: '/gateway/api/directory',
    confluenceUrl: '/wiki',
    jiraUrl: '',
    addSessionIdToJiraResult: false,
};
export default function configureSearchClients(cloudId, partialConfig) {
    var config = tslib_1.__assign({}, defaultConfig, partialConfig);
    return {
        recentSearchClient: new RecentSearchClientImpl(config.activityServiceUrl, cloudId),
        crossProductSearchClient: new CrossProductSearchClientImpl(config.searchAggregatorServiceUrl, cloudId, config.addSessionIdToJiraResult),
        peopleSearchClient: new PeopleSearchClientImpl(config.directoryServiceUrl, cloudId),
        confluenceClient: new ConfluenceClientImpl(config.confluenceUrl, cloudId),
        jiraClient: new JiraClientImpl(config.jiraUrl, cloudId, config.addSessionIdToJiraResult),
    };
}
//# sourceMappingURL=configureSearchClients.js.map