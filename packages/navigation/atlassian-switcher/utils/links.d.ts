import * as React from 'react';
import { FormattedMessage as FormattedMessageNamespace } from 'react-intl';
import { LicenseInformationResponse } from '../types';
import { CustomLink, RecentContainer } from '../types';
import { IconType } from './icon-themes';
export declare enum ProductKey {
    CONFLUENCE = "confluence.ondemand",
    JIRA_CORE = "jira-core.ondemand",
    JIRA_SOFTWARE = "jira-software.ondemand",
    JIRA_SERVICE_DESK = "jira-servicedesk.ondemand",
    JIRA_OPS = "jira-incident-manager.ondemand"
}
declare const SINGLE_JIRA_PRODUCT: 'jira';
interface MessagesDict {
    [index: string]: FormattedMessageNamespace.MessageDescriptor;
}
export declare type SwitcherItemType = {
    key: string;
    label: React.ReactNode;
    Icon: IconType;
    href: string;
};
export declare type RecentItemType = SwitcherItemType & {
    type: string;
    description: React.ReactNode;
};
export declare const OBJECT_TYPE_TO_LABEL_MAP: MessagesDict;
export declare const PRODUCT_DATA_MAP: {
    [productKey in ProductKey | typeof SINGLE_JIRA_PRODUCT]: {
        label: string;
        Icon: React.ComponentType<any>;
        href: string;
    };
};
export declare const getObjectTypeLabel: (type: string) => React.ReactNode;
export declare const getFixedProductLinks: () => SwitcherItemType[];
export declare const getProductLink: (productKey: "jira" | ProductKey) => SwitcherItemType;
export declare const getProductIsActive: ({ products }: LicenseInformationResponse, productKey: string) => boolean;
export declare const getLicensedProductLinks: (licenseInformationData: LicenseInformationResponse, enableSplitJira: boolean) => SwitcherItemType[];
export declare const getAdministrationLinks: (cloudId: string, isAdmin: boolean) => SwitcherItemType[];
export declare const getSuggestedProductLink: (licenseInformationData: LicenseInformationResponse) => SwitcherItemType[];
export declare const getCustomLinkItems: (list: CustomLink[], licenseInformationData: LicenseInformationResponse) => SwitcherItemType[];
export declare const getRecentLinkItems: (list: RecentContainer[]) => RecentItemType[];
export {};
