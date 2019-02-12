import { CustomLink } from '../types';

export type CustomLinksProviderDataStructure = [Array<CustomLink>, string];

export interface LicenseInformationDataStructure {
  hostname: string;
  products: {
    [key: string]: {
      state: string;
    };
  };
}
