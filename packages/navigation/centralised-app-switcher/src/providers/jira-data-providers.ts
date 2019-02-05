import { fetchJson } from '../utils/fetch';
import asDataProvider, { DataProviderProps } from './as-data-provider';
import { getXSellLink, XSellProductLink } from '../utils/product-links';
import {
  CustomLinksProviderDataStructure,
  LicenseInformationDataStructure,
} from './types';

export const CustomLinksProvider = asDataProvider<
  DataProviderProps<CustomLinksProviderDataStructure>,
  CustomLinksProviderDataStructure
>(() =>
  Promise.all([
    fetchJson(`/rest/menu/latest/appswitcher`),
    '/plugins/servlet/customize-application-navigator',
  ]),
);

interface LicenseInformationDataProvider<T> extends DataProviderProps<T> {
  licenseInformation: LicenseInformationDataStructure;
}

export const XSellProvider = asDataProvider<
  LicenseInformationDataProvider<XSellProductLink>,
  XSellProductLink
>(
  ({
    licenseInformation,
  }: LicenseInformationDataProvider<XSellProductLink>): XSellProductLink =>
    getXSellLink(licenseInformation),
);
