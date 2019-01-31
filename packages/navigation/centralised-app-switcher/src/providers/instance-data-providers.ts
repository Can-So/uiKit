import { fetchJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';
import { WithCloudId, RecentContainer } from '../types';

interface CloudIdDataProvider<T> extends DataProviderProps<T>, WithCloudId {}

interface LicenseInformationDataStructure {
  products: {
    [key: string]: {
      state: string;
    };
  };
}

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

export const LicenseInformationProvider = asDataProvider<
  CloudIdDataProvider<LicenseInformationDataStructure>,
  LicenseInformationDataStructure
>(({ cloudId }) =>
  fetchJson(`/gateway/api/xflow/${cloudId}/license-information`),
);
