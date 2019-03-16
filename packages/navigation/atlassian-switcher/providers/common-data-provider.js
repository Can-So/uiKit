import * as React from 'react';
import { LicenseInformationProvider, RecentContainersProvider, UserPermissionProvider, XFlowSettingsProvider, } from './instance-data-providers';
import { Permissions } from '../types';
export default (function (_a) {
    var cloudId = _a.cloudId, children = _a.children;
    return (React.createElement(RecentContainersProvider, { cloudId: cloudId }, function (recentContainers) { return (React.createElement(LicenseInformationProvider, { cloudId: cloudId }, function (licenseInformation) { return (React.createElement(UserPermissionProvider, { cloudId: cloudId, permissionId: Permissions.MANAGE }, function (managePermission) { return (React.createElement(UserPermissionProvider, { cloudId: cloudId, permissionId: Permissions.ADD_PRODUCTS }, function (addProductsPermission) { return (React.createElement(XFlowSettingsProvider, { cloudId: cloudId }, function (isXFlowEnabled) {
        return children({
            recentContainers: recentContainers,
            licenseInformation: licenseInformation,
            managePermission: managePermission,
            addProductsPermission: addProductsPermission,
            isXFlowEnabled: isXFlowEnabled,
        });
    })); })); })); })); }));
});
//# sourceMappingURL=common-data-provider.js.map