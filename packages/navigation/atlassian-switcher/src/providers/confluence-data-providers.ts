import { fetchJson } from '../utils/fetch';
import asDataProvider from './as-data-provider';
import { CustomLink } from '../types';

export const CustomLinksProvider = asDataProvider(() =>
  Promise.all([
    fetchJson<Array<CustomLink>>(`/wiki/rest/menu/latest/appswitcher`),
    '/wiki/plugins/servlet/customize-application-navigator',
  ]),
);
