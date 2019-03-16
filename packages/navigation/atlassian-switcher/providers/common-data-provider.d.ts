import * as React from 'react';
import { ProviderResult } from './as-data-provider';
import { LicenseInformationResponse, RecentContainersResponse } from '../types';
interface CommonDataProviderProps {
    cloudId: string;
    children: (props: {
        recentContainers: ProviderResult<RecentContainersResponse>;
        licenseInformation: ProviderResult<LicenseInformationResponse>;
        managePermission: ProviderResult<boolean>;
        addProductsPermission: ProviderResult<boolean>;
        isXFlowEnabled: ProviderResult<boolean>;
    }) => React.ReactElement<any>;
}
declare const _default: ({ cloudId, children }: CommonDataProviderProps) => JSX.Element;
export default _default;
