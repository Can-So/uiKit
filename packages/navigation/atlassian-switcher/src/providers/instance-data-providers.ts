import { fetchJson, postJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';
import { WithCloudId, RecentContainer } from '../types';
import { LicenseInformationDataStructure } from './types';

export interface CloudIdDataProvider<T>
  extends DataProviderProps<T>,
    WithCloudId {}

export interface RecentContainersDataStructure {
  data: Array<RecentContainer>;
}

export const RecentContainersProvider = asDataProvider(
  ({ cloudId }: WithCloudId) =>
    fetchJson<RecentContainersDataStructure>(
      `/gateway/api/activity/api/client/recent/containers?cloudId=${cloudId}`,
    ).then((recentContainersData: RecentContainersDataStructure) => ({
      data: recentContainersData.data.slice(0, 6),
    })),
);

export const LicenseInformationProvider = asDataProvider(
  ({ cloudId }: WithCloudId) =>
    fetchJson<LicenseInformationDataStructure>(
      `/gateway/api/xflow/${cloudId}/license-information`,
    ),
);

export interface UserPermissionDataStructure {
  permitted: boolean;
}

export enum Permissions {
  MANAGE = 'manage',
  CAN_INVITE_USERS = 'invite-users',
  ADD_PRODUCTS = 'add-products',
}

export const UserPermissionProvider = asDataProvider(
  ({
    cloudId,
    permissionId,
  }: WithCloudId & {
    permissionId: Permissions;
  }) =>
    postJson<UserPermissionDataStructure>(
      `/gateway/api/permissions/permitted`,
      {
        permissionId,
        resourceId: `ari:cloud:platform::site/${cloudId}`,
      },
    ).then((permission): boolean => permission.permitted),
);

export interface XFlowSettings {
  [s: string]: any;
}

export const XFlowSettingsProvider = asDataProvider(
  ({ cloudId }: WithCloudId) =>
    fetchJson<XFlowSettings>(`/gateway/api/site/${cloudId}/setting/xflow`).then(
      (xFlowSettings): boolean =>
        xFlowSettings.hasOwnProperty('product-suggestions-enabled')
          ? xFlowSettings['product-suggestions-enabled']
          : true,
    ),
);
