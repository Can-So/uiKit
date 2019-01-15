import { fetchJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';

interface JiraCloudIdProvider extends DataProviderProps {
  cloudId: string;
}

export const RecentContainersProvider = asDataProvider<JiraCloudIdProvider>(
  ({ cloudId }) =>
    fetchJson(
      `/gateway/api/activity/api/client/recent/containers?cloudId=${cloudId}`,
    ),
);

export const CustomLinksProvider = asDataProvider<DataProviderProps>(() =>
  fetchJson(`/rest/menu/latest/appswitcher`),
);
