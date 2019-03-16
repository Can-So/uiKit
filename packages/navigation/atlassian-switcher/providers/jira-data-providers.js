import { fetchJson } from '../utils/fetch';
import asDataProvider from './as-data-provider';
export var MANAGE_HREF = '/plugins/servlet/customize-application-navigator';
var fetchCustomLinks = function () {
    return fetchJson("/rest/menu/latest/appswitcher");
};
export var CustomLinksProvider = asDataProvider(fetchCustomLinks);
//# sourceMappingURL=jira-data-providers.js.map