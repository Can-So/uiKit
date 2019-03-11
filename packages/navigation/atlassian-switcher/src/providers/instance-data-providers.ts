import { fetchJson, postJson } from '../utils/fetch';
import asDataProvider from './as-data-provider';
import {
  LicenseInformationResponse,
  Permissions,
  RecentContainersResponse,
  UserPermissionResponse,
  WithCloudId,
  XFlowSettingsResponse,
} from '../types';
import { cached } from '../utils/cached';

// Recent activity api
export const RecentContainersProvider = asDataProvider(
  ({ cloudId }: WithCloudId) =>
    fetchJson<RecentContainersResponse>(
      `/gateway/api/activity/api/client/recent/containers?cloudId=${cloudId}`,
    ).then((recentContainersData: RecentContainersDataStructure) => ({
      data: recentContainersData.data.slice(0, 6),
    })),
);

// License information api
const fetchLicenseInformation = cached(({ cloudId }: WithCloudId) =>
  fetchJson<LicenseInformationResponse>(
    `/gateway/api/xflow/${cloudId}/license-information`,
  ),
);

export const LicenseInformationProvider = asDataProvider(
  ({ cloudId }: WithCloudId) => fetchLicenseInformation({ cloudId }),
);

// Permissions api
type FetchPermissionParamsType = WithCloudId & {
  permissionId: Permissions;
};
const fetchPermission = cached(
  ({ cloudId, permissionId }: FetchPermissionParamsType) =>
    postJson<UserPermissionResponse>(`/gateway/api/permissions/permitted`, {
      permissionId,
      resourceId: `ari:cloud:platform::site/${cloudId}`,
    }).then(permission => permission.permitted),
);

export const UserPermissionProvider = asDataProvider(
  (params: FetchPermissionParamsType) => fetchPermission(params),
);

// Xflow settings api
const fetchXflowSettings = cached(({ cloudId }: WithCloudId) =>
  fetchJson<XFlowSettingsResponse>(
    `/gateway/api/site/${cloudId}/setting/xflow`,
  ).then(xFlowSettings =>
    xFlowSettings['product-suggestions-enabled'] !== undefined
      ? xFlowSettings['product-suggestions-enabled']
      : true,
  ),
);

export const XFlowSettingsProvider = asDataProvider(
  ({ cloudId }: WithCloudId) => fetchXflowSettings({ cloudId }),
);

export const prefetchAll = ({ cloudId }: WithCloudId) => {
  window.requestIdleCallback(() => {
    fetchLicenseInformation.prefetch({ cloudId });
    fetchXflowSettings.prefetch({ cloudId });
    fetchPermission.prefetch({
      cloudId,
      permissionId: Permissions.ADD_PRODUCTS,
    });
    fetchPermission.prefetch({ cloudId, permissionId: Permissions.MANAGE });
  });
};

export const resetAll = () => {
  fetchLicenseInformation.reset();
  fetchXflowSettings.reset();
  fetchPermission.reset();
};
