import * as React from 'react';
import { ChildrenProps } from './as-data-provider';

import { LicenseInformationDataStructure } from './types';

import {
  LicenseInformationProvider,
  Permissions,
  RecentContainersProvider,
  UserPermissionProvider,
  RecentContainersDataStructure,
  UserPermissionDataStructure,
} from './instance-data-providers';

interface CommonDataProviderProps {
  cloudId: string;
  children: (
    props: {
      recentContainers: ChildrenProps<RecentContainersDataStructure>;
      licenseInformation: ChildrenProps<LicenseInformationDataStructure>;
      managePermission: ChildrenProps<UserPermissionDataStructure>;
      addProductsPermission: ChildrenProps<UserPermissionDataStructure>;
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
                {addProductsPermission =>
                  children({
                    recentContainers,
                    licenseInformation,
                    managePermission,
                    addProductsPermission,
                  })
                }
              </UserPermissionProvider>
            )}
          </UserPermissionProvider>
        )}
      </LicenseInformationProvider>
    )}
  </RecentContainersProvider>
);
