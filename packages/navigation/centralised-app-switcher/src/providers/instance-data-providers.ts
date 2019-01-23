import { fetchJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';

interface CloudIdDataProvider extends DataProviderProps {
  cloudId: string;
}

export const RecentContainersProvider = asDataProvider<CloudIdDataProvider>(
  ({ cloudId }) =>
    fetchJson(
      `/gateway/api/activity/api/client/recent/containers?cloudId=${cloudId}`,
    ),
);
