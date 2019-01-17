import { fetchJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';

export const CustomLinksProvider = asDataProvider<DataProviderProps>(() =>
  Promise.all([
    fetchJson(`/rest/menu/latest/appswitcher`),
    '/plugins/servlet/customize-application-navigator',
  ]),
);
