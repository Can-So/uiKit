import { fetchJson } from '../utils/fetch';
import asDataProvider from './as-data-provider';
export var MANAGE_HREF = '/wiki/plugins/servlet/customize-application-navigator';
var fetchCustomLinks = function () {
    return fetchJson("/wiki/rest/menu/latest/appswitcher");
};
export var CustomLinksProvider = asDataProvider(fetchCustomLinks);
//# sourceMappingURL=confluence-data-providers.js.map