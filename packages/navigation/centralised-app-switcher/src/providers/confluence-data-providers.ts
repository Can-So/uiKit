import { fetchJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';

export const CustomLinksProvider = asDataProvider<DataProviderProps>(() =>
  Promise.all([
    fetchJson(`/wiki/rest/menu/latest/appswitcher`),
    '/wiki/plugins/servlet/customize-application-navigator',
  ]),
);
