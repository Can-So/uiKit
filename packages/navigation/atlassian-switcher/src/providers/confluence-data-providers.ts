import { fetchJson } from '../utils/fetch';
import asDataProvider from './as-data-provider';
import { CustomLinksResponse } from '../types';

export const MANAGE_HREF =
  '/wiki/plugins/servlet/customize-application-navigator';

const fetchCustomLinks = () =>
  fetchJson<CustomLinksResponse>(`/wiki/rest/menu/latest/appswitcher`);

export const CustomLinksProvider = asDataProvider(fetchCustomLinks);
