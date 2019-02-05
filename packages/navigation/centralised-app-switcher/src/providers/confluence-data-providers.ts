import { fetchJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';
import { CustomLinksProviderDataStructure } from './types';
import { XSellProductLink } from '../utils/product-links';

export const CustomLinksProvider = asDataProvider<
  DataProviderProps<CustomLinksProviderDataStructure>,
  CustomLinksProviderDataStructure
>(() =>
  Promise.all([
    fetchJson(`/wiki/rest/menu/latest/appswitcher`),
    '/wiki/plugins/servlet/customize-application-navigator',
  ]),
);

export const XSellProvider = asDataProvider<
  DataProviderProps<XSellProductLink>,
  XSellProductLink
>(() => null);
