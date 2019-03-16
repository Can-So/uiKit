import { ProviderResult } from './as-data-provider';
import { CustomLinksResponse, LicenseInformationResponse, RecentContainersResponse } from '../types';
export declare function collectFixedProductLinks(): import("../utils/links").SwitcherItemType[];
interface ProviderResults {
    customLinks?: ProviderResult<CustomLinksResponse>;
    recentContainers: ProviderResult<RecentContainersResponse>;
    licenseInformation: ProviderResult<LicenseInformationResponse>;
    managePermission: ProviderResult<boolean>;
    addProductsPermission: ProviderResult<boolean>;
    isXFlowEnabled: ProviderResult<boolean>;
}
interface SwitcherFeatures {
    xflow: boolean;
    enableSplitJira: boolean;
}
export declare function mapResultsToSwitcherProps(cloudId: string, results: ProviderResults, features?: SwitcherFeatures): {
    licensedProductLinks: import("../utils/links").SwitcherItemType[];
    suggestedProductLinks: import("../utils/links").SwitcherItemType[];
    fixedLinks: import("../utils/links").SwitcherItemType[];
    adminLinks: import("../utils/links").SwitcherItemType[];
    recentLinks: import("../utils/links").RecentItemType[];
    customLinks: import("../utils/links").SwitcherItemType[];
    showManageLink: boolean;
    isLoading: boolean;
};
export {};
