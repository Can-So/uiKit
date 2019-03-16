import { Plugin, PluginKey } from 'prosemirror-state';
import { confluenceJiraIssue } from '@atlaskit/adf-schema';
import { ReactNodeView } from '../../nodeviews';
import ReactJIRAIssueNode from './nodeviews/jira-issue';
export var pluginKey = new PluginKey('jiraIssuePlugin');
var createPlugin = function (_a) {
    var portalProviderAPI = _a.portalProviderAPI;
    return new Plugin({
        key: pluginKey,
        props: {
            nodeViews: {
                confluenceJiraIssue: ReactNodeView.fromComponent(ReactJIRAIssueNode, portalProviderAPI),
            },
        },
    });
};
var jiraIssuePlugin = {
    nodes: function () {
        return [{ name: 'confluenceJiraIssue', node: confluenceJiraIssue }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'jiraIssue',
                plugin: createPlugin,
            },
        ];
    },
};
export default jiraIssuePlugin;
//# sourceMappingURL=index.js.map