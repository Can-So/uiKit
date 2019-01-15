import { fetchJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';

export const CustomLinksProvider = asDataProvider<DataProviderProps>(() =>
  fetchJson(`/wiki/rest/menu/latest/appswitcher`),
);
