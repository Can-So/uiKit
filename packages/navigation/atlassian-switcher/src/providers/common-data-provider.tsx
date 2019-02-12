import * as React from 'react';
import { ChildrenProps } from './as-data-provider';

import { LicenseInformationDataStructure } from './types';

import {
  LicenseInformationProvider,
  Permissions,
  RecentContainersProvider,
  UserPermissionProvider,
  RecentContainersDataStructure,
  XFlowSettingsProvider,
} from './instance-data-providers';

interface CommonDataProviderProps {
  cloudId: string;
  children: (
    props: {
      recentContainers: ChildrenProps<RecentContainersDataStructure>;
      licenseInformation: ChildrenProps<LicenseInformationDataStructure>;
      managePermission: ChildrenProps<boolean>;
      addProductsPermission: ChildrenProps<boolean>;
      isXFlowEnabled: ChildrenProps<boolean>;
    },
  ) => React.ReactElement<any>;
}

export default ({ cloudId, children }: CommonDataProviderProps) => (
  <RecentContainersProvider cloudId={cloudId}>
    {recentContainers => (
      <LicenseInformationProvider cloudId={cloudId}>
        {licenseInformation => (
          <UserPermissionProvider
            cloudId={cloudId}
            permissionId={Permissions.MANAGE}
          >
            {managePermission => (
              <UserPermissionProvider
                cloudId={cloudId}
                permissionId={Permissions.ADD_PRODUCTS}
              >
                {addProductsPermission => (
                  <XFlowSettingsProvider cloudId={cloudId}>
                    {isXFlowEnabled =>
                      children({
                        recentContainers,
                        licenseInformation,
                        managePermission,
                        addProductsPermission,
                        isXFlowEnabled,
                      })
                    }
                  </XFlowSettingsProvider>
                )}
              </UserPermissionProvider>
            )}
          </UserPermissionProvider>
        )}
      </LicenseInformationProvider>
    )}
  </RecentContainersProvider>
);
