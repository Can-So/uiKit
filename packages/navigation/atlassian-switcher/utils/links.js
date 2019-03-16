import * as tslib_1 from "tslib";
var _a;
import * as React from 'react';
import DiscoverFilledGlyph from '@atlaskit/icon/glyph/discover-filled';
import SettingsGlyph from '@atlaskit/icon/glyph/settings';
import { ConfluenceIcon, JiraIcon, JiraSoftwareIcon, JiraServiceDeskIcon, JiraCoreIcon, } from '@atlaskit/logo';
import FormattedMessage from '../primitives/formatted-message';
import messages from './messages';
import JiraOpsLogo from './assets/jira-ops-logo';
import PeopleLogo from './assets/people';
import WorldIcon from '@atlaskit/icon/glyph/world';
import { createIcon, createImageIcon } from './icon-themes';
var ProductActivationStatus;
(function (ProductActivationStatus) {
    ProductActivationStatus["ACTIVE"] = "ACTIVE";
    ProductActivationStatus["DEACTIVATED"] = "DEACTIVATED";
})(ProductActivationStatus || (ProductActivationStatus = {}));
export var ProductKey;
(function (ProductKey) {
    ProductKey["CONFLUENCE"] = "confluence.ondemand";
    ProductKey["JIRA_CORE"] = "jira-core.ondemand";
    ProductKey["JIRA_SOFTWARE"] = "jira-software.ondemand";
    ProductKey["JIRA_SERVICE_DESK"] = "jira-servicedesk.ondemand";
    ProductKey["JIRA_OPS"] = "jira-incident-manager.ondemand";
})(ProductKey || (ProductKey = {}));
var SINGLE_JIRA_PRODUCT = 'jira';
export var OBJECT_TYPE_TO_LABEL_MAP = {
    'jira-project': messages.jiraProject,
    'confluence-space': messages.confluenceSpace,
};
export var PRODUCT_DATA_MAP = (_a = {},
    _a[ProductKey.CONFLUENCE] = {
        label: 'Confluence',
        Icon: createIcon(ConfluenceIcon, { size: 'small' }),
        href: '/wiki',
    },
    _a[ProductKey.JIRA_CORE] = {
        label: 'Jira Core',
        Icon: createIcon(JiraCoreIcon, { size: 'small' }),
        href: '/secure/BrowseProjects.jspa?selectedProjectType=business',
    },
    _a[ProductKey.JIRA_SOFTWARE] = {
        label: 'Jira Software',
        Icon: createIcon(JiraSoftwareIcon, { size: 'small' }),
        href: '/secure/BrowseProjects.jspa?selectedProjectType=software',
    },
    _a[ProductKey.JIRA_SERVICE_DESK] = {
        label: 'Jira Service Desk',
        Icon: createIcon(JiraServiceDeskIcon, { size: 'small' }),
        href: '/secure/BrowseProjects.jspa?selectedProjectType=service_desk',
    },
    _a[ProductKey.JIRA_OPS] = {
        label: 'Jira Ops',
        Icon: createIcon(JiraOpsLogo, { size: 'small' }),
        href: '/secure/BrowseProjects.jspa?selectedProjectType=ops',
    },
    _a[SINGLE_JIRA_PRODUCT] = {
        label: 'Jira',
        Icon: createIcon(JiraIcon, { size: 'small' }),
        href: '/secure/MyJiraHome.jspa',
    },
    _a);
export var getObjectTypeLabel = function (type) {
    return React.createElement(FormattedMessage, tslib_1.__assign({}, OBJECT_TYPE_TO_LABEL_MAP[type])) || type;
};
export var getFixedProductLinks = function () { return [
    {
        key: 'people',
        label: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.people)),
        Icon: createIcon(PeopleLogo, { size: 'small' }),
        href: "/people",
    },
]; };
export var getProductLink = function (productKey) { return (tslib_1.__assign({ key: productKey }, PRODUCT_DATA_MAP[productKey])); };
export var getProductIsActive = function (_a, productKey) {
    var products = _a.products;
    return products.hasOwnProperty(productKey) &&
        products[productKey].state === ProductActivationStatus.ACTIVE;
};
// This function will determine which product links to render based
// on license information and if we're separating the jira products or not
export var getLicensedProductLinks = function (licenseInformationData, enableSplitJira) {
    var majorJiraProducts = [
        ProductKey.JIRA_SOFTWARE,
        ProductKey.JIRA_SERVICE_DESK,
        ProductKey.JIRA_OPS,
    ].filter(function (productKey) {
        return getProductIsActive(licenseInformationData, productKey);
    });
    var minorJiraProducts = [ProductKey.JIRA_CORE].filter(function (productKey) {
        return getProductIsActive(licenseInformationData, productKey);
    });
    var jiraProducts;
    if (enableSplitJira) {
        // If we enable split jira products we'll render whatever comes from license-information
        jiraProducts = tslib_1.__spread(majorJiraProducts, minorJiraProducts);
    }
    else if (majorJiraProducts.length > 1) {
        // If we have more than one major jira product, we'll render only the Jira family logo
        jiraProducts = [SINGLE_JIRA_PRODUCT];
    }
    else if (majorJiraProducts.length === 1) {
        // If we have a single jira product we will only show that single product (regardless if the instance has Jira Core or not)
        jiraProducts = majorJiraProducts;
    }
    else {
        // If no major Jira products are present we render Jira Core if it's present in the license-information
        jiraProducts = minorJiraProducts;
    }
    var otherProducts = [ProductKey.CONFLUENCE].filter(function (productKey) {
        return getProductIsActive(licenseInformationData, productKey);
    });
    return tslib_1.__spread(jiraProducts, otherProducts).map(function (productKey) {
        return getProductLink(productKey);
    });
};
export var getAdministrationLinks = function (cloudId, isAdmin) {
    var adminBaseUrl = isAdmin ? "/admin/s/" + cloudId : '/trusted-admin';
    return [
        {
            key: 'discover-applications',
            label: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.discoverMore)),
            Icon: createIcon(DiscoverFilledGlyph, { size: 'medium' }),
            href: adminBaseUrl + "/billing/addapplication",
        },
        {
            key: 'administration',
            label: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.administration)),
            Icon: createIcon(SettingsGlyph, { size: 'medium' }),
            href: adminBaseUrl,
        },
    ];
};
export var getSuggestedProductLink = function (licenseInformationData) {
    if (!getProductIsActive(licenseInformationData, ProductKey.CONFLUENCE)) {
        return [getProductLink(ProductKey.CONFLUENCE)];
    }
    if (!getProductIsActive(licenseInformationData, ProductKey.JIRA_SERVICE_DESK)) {
        return [getProductLink(ProductKey.JIRA_SERVICE_DESK)];
    }
    return [];
};
export var getCustomLinkItems = function (list, licenseInformationData) {
    var defaultProductCustomLinks = [
        licenseInformationData.hostname + "/secure/MyJiraHome.jspa",
        licenseInformationData.hostname + "/wiki/",
    ];
    return list
        .filter(function (customLink) { return defaultProductCustomLinks.indexOf(customLink.link) === -1; })
        .map(function (customLink) { return ({
        key: customLink.key,
        label: customLink.label,
        Icon: createIcon(WorldIcon),
        href: customLink.link,
    }); });
};
export var getRecentLinkItems = function (list) {
    return list.map(function (customLink) { return ({
        key: customLink.objectId,
        label: customLink.name,
        Icon: createImageIcon(customLink.iconUrl),
        href: customLink.url,
        type: customLink.type,
        description: getObjectTypeLabel(customLink.type),
    }); });
};
//# sourceMappingURL=links.js.map