import { fetchJson } from '../utils/fetch';
import asDataProvider from './as-data-provider';
import { CustomLink } from '../types';

export const MANAGE_HREF = '/plugins/servlet/customize-application-navigator';

export const CustomLinksProvider = asDataProvider(() =>
  Promise.all([
    fetchJson<Array<CustomLink>>(`/rest/menu/latest/appswitcher`),
    MANAGE_HREF,
  ]),
);
