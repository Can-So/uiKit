import { fetchJson, postJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';
import { WithCloudId, RecentContainer } from '../types';

interface CloudIdDataProvider<T> extends DataProviderProps<T>, WithCloudId {}

interface RecentContainersDataStructure {
  data: Array<RecentContainer>;
}

export const RecentContainersProvider = asDataProvider<
  CloudIdDataProvider<RecentContainersDataStructure>,
  RecentContainersDataStructure
>(({ cloudId }) =>
  fetchJson(
    `/gateway/api/activity/api/client/recent/containers?cloudId=${cloudId}`,
  ),
);

interface LicenseInformationDataStructure {
  products: {
    [key: string]: {
      state: string;
    };
  };
}

export const LicenseInformationProvider = asDataProvider<
  CloudIdDataProvider<LicenseInformationDataStructure>,
  LicenseInformationDataStructure
>(({ cloudId }) =>
  fetchJson(`/gateway/api/xflow/${cloudId}/license-information`),
);

interface UserPermissionDataStructure {
  permitted: boolean;
}

export enum Permissions {
  MANAGE = 'manage',
  CAN_INVITE_USERS = 'invite-users',
  ADD_PRODUCTS = 'add-products',
}

interface PermissionDataProvider
  extends CloudIdDataProvider<UserPermissionDataStructure> {
  permissionId: Permissions;
}

export const UserPermissionProvider = asDataProvider<
  PermissionDataProvider,
  UserPermissionDataStructure
>(({ cloudId, permissionId }) =>
  postJson(`/gateway/api/permissions/permitted`, {
    permissionId,
    resourceId: `ari:cloud:platform::site/${cloudId}`,
  }),
);
