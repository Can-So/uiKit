import { getAdministrationLinks, getCustomLinkItems, getFixedProductLinks, getLicensedProductLinks, getRecentLinkItems, getSuggestedProductLink, } from '../utils/links';
import { isComplete, isError, isLoading, } from './as-data-provider';
import { createCollector } from '../utils/create-collector';
function collectProductLinks(cloudId, licenseInformation, enableSplitJira) {
    if (isError(licenseInformation)) {
        return [];
    }
    if (isComplete(licenseInformation)) {
        return getLicensedProductLinks(licenseInformation.data, enableSplitJira);
    }
}
function collectSuggestedLinks(licenseInformation, isXFlowEnabled) {
    if (isError(isXFlowEnabled) || isError(licenseInformation)) {
        return [];
    }
    if (isComplete(licenseInformation) && isComplete(isXFlowEnabled)) {
        return isXFlowEnabled.data
            ? getSuggestedProductLink(licenseInformation.data)
            : [];
    }
}
function collectCanManageLinks(managePermission) {
    if (isComplete(managePermission)) {
        return managePermission.data;
    }
}
function collectAdminLinks(cloudId, managePermission, addProductsPermission) {
    if (isError(managePermission) || isError(addProductsPermission)) {
        return [];
    }
    if (isComplete(managePermission) && isComplete(addProductsPermission)) {
        if (managePermission.data || addProductsPermission.data) {
            return getAdministrationLinks(cloudId, managePermission.data);
        }
        return [];
    }
}
export function collectFixedProductLinks() {
    return getFixedProductLinks();
}
function collectRecentLinks(recentContainers) {
    if (isError(recentContainers)) {
        return [];
    }
    if (isComplete(recentContainers)) {
        return getRecentLinkItems(recentContainers.data.data.slice(0, 6));
    }
}
function collectCustomLinks(customLinks, licenseInformation) {
    if (customLinks === undefined || isError(customLinks)) {
        return [];
    }
    if (isComplete(customLinks) && isComplete(licenseInformation)) {
        return getCustomLinkItems(customLinks.data, licenseInformation.data);
    }
}
var DEFAULT_FEATURES = {
    xflow: true,
    enableSplitJira: false,
};
export function mapResultsToSwitcherProps(cloudId, results, features) {
    if (features === void 0) { features = DEFAULT_FEATURES; }
    var collect = createCollector();
    var licenseInformation = results.licenseInformation, isXFlowEnabled = results.isXFlowEnabled, managePermission = results.managePermission, addProductsPermission = results.addProductsPermission, customLinks = results.customLinks, recentContainers = results.recentContainers;
    if (isError(licenseInformation)) {
        throw licenseInformation.error;
    }
    return {
        licensedProductLinks: collect(collectProductLinks(cloudId, licenseInformation, features.enableSplitJira), []),
        suggestedProductLinks: features.xflow
            ? collect(collectSuggestedLinks(licenseInformation, isXFlowEnabled), [])
            : [],
        fixedLinks: collect(collectFixedProductLinks(), []),
        adminLinks: collect(collectAdminLinks(cloudId, managePermission, addProductsPermission), []),
        recentLinks: collect(collectRecentLinks(recentContainers), []),
        customLinks: collect(collectCustomLinks(customLinks, licenseInformation), []),
        showManageLink: collect(collectCanManageLinks(managePermission), false),
        isLoading: isLoading(licenseInformation),
    };
}
//# sourceMappingURL=map-results-to-switcher-props.js.map