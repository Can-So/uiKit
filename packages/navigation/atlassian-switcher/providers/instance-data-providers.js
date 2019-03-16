import { fetchJson, postJson } from '../utils/fetch';
import asDataProvider from './as-data-provider';
import { Permissions, } from '../types';
import { withCached } from '../utils/with-cached';
// Recent activity api
var fetchRecentContainers = function (_a) {
    var cloudId = _a.cloudId;
    return fetchJson("/gateway/api/activity/api/client/recent/containers?cloudId=" + cloudId);
};
export var RecentContainersProvider = asDataProvider(fetchRecentContainers);
// License information api
var fetchLicenseInformation = withCached(function (_a) {
    var cloudId = _a.cloudId;
    return fetchJson("/gateway/api/xflow/" + cloudId + "/license-information");
});
export var LicenseInformationProvider = asDataProvider(fetchLicenseInformation, fetchLicenseInformation.cached);
var fetchPermission = withCached(function (_a) {
    var cloudId = _a.cloudId, permissionId = _a.permissionId;
    return postJson("/gateway/api/permissions/permitted", {
        permissionId: permissionId,
        resourceId: "ari:cloud:platform::site/" + cloudId,
    }).then(function (permission) { return permission.permitted; });
});
export var UserPermissionProvider = asDataProvider(fetchPermission, fetchPermission.cached);
// Xflow settings api
var fetchXflowSettings = withCached(function (_a) {
    var cloudId = _a.cloudId;
    return fetchJson("/gateway/api/site/" + cloudId + "/setting/xflow").then(function (xFlowSettings) {
        return xFlowSettings['product-suggestions-enabled'] !== undefined
            ? xFlowSettings['product-suggestions-enabled']
            : true;
    });
});
export var XFlowSettingsProvider = asDataProvider(fetchXflowSettings, fetchXflowSettings.cached);
export var prefetchAll = function (_a) {
    var cloudId = _a.cloudId;
    fetchLicenseInformation({ cloudId: cloudId });
    fetchXflowSettings({ cloudId: cloudId });
    fetchPermission({
        cloudId: cloudId,
        permissionId: Permissions.ADD_PRODUCTS,
    });
    fetchPermission({ cloudId: cloudId, permissionId: Permissions.MANAGE });
};
export var resetAll = function () {
    fetchLicenseInformation.reset();
    fetchXflowSettings.reset();
    fetchPermission.reset();
};
//# sourceMappingURL=instance-data-providers.js.map