import * as React from 'react';
import { colors } from '@atlaskit/theme';
import {
  getFixedProductLinks,
  getLogoIcon,
  getProductLink,
  getProductLinks,
  PRODUCT_DATA_MAP,
  productIsActive,
  getAdministrationLinks,
  getSuggestedProductLink,
} from '../../product-links';
import { mount } from 'enzyme';

const HOSTNAME = 'my-hostname.com';
const CLOUD_ID = 'some-cloud-id';
const ACTIVE_PRODUCT_STATE = {
  state: 'ACTIVE',
};
const FIXED_PRODUCTS_KEYS = ['people', 'home'];

const generateLicenseInformation = (activeProducts: string[]) => {
  const products = activeProducts.reduce(
    (ans: { [productKey: string]: any }, next: string) => {
      ans[next] = ACTIVE_PRODUCT_STATE;
      return ans;
    },
    {},
  );
  return {
    hostname: HOSTNAME,
    products,
  };
};

describe('utils product-links', () => {
  it('getLogoIcon should return a component type with preset props', () => {
    const MockIconComponent = jest.fn().mockImplementation(() => null);
    const ResultingComponentType = getLogoIcon(MockIconComponent);
    const passedProps = {
      expectedProp: 'expectedPropValue',
    };
    const expectedProps = {
      iconColor: colors.N0,
      size: 'small',
      ...passedProps,
    };

    mount(<ResultingComponentType {...passedProps} />);
    expect(MockIconComponent.mock.calls[0][0]).toMatchObject(expectedProps);
  });

  it('getFixedProductLinks should append hostname to link', () => {
    const expectedLinks = ['/people', '/home'];
    const fixedLinks = getFixedProductLinks();
    expect(fixedLinks.map(({ link }) => link)).toMatchObject(expectedLinks);
  });

  it('getProductLink should append hostname to link', () => {
    const productKey = 'confluence.ondemand';
    const productLink = getProductLink(productKey);
    const expectedLink = {
      key: 'confluence.ondemand',
      link: '/wiki',
      ...PRODUCT_DATA_MAP['confluence.ondemand'],
    };
    expect(productLink).toMatchObject(expectedLink);
  });

  describe('productIsActive', () => {
    const productKey = 'some.awesome.new.atlassian.product';
    const licenseInformation = generateLicenseInformation([productKey]);
    it('should return true if a product is active', () => {
      const result = productIsActive(licenseInformation, productKey);
      expect(result).toBe(true);
    });
    it('should return false if a product is not active', () => {
      const productKey = 'some.eol.product';
      const result = productIsActive(licenseInformation, productKey);
      expect(result).toBe(false);
    });
  });

  describe('getProductLinks', () => {
    it('should only add active products', () => {
      const licenseInformation = generateLicenseInformation([
        'confluence.ondemand',
      ]);
      const result = getProductLinks(licenseInformation);
      expect(result.map(({ key }) => key)).toMatchObject([
        'confluence.ondemand',
        ...FIXED_PRODUCTS_KEYS,
      ]);
    });
    it('should add Jira Core for Jira Software', () => {
      const licenseInformation = generateLicenseInformation([
        'jira-software.ondemand',
      ]);
      const result = getProductLinks(licenseInformation);
      expect(result.map(({ key }) => key)).toMatchObject([
        'jira-core.ondemand',
        'jira-software.ondemand',
        ...FIXED_PRODUCTS_KEYS,
      ]);
    });
    it('should add Jira Core for Jira Service Desk', () => {
      const licenseInformation = generateLicenseInformation([
        'jira-servicedesk.ondemand',
      ]);
      const result = getProductLinks(licenseInformation);
      expect(result.map(({ key }) => key)).toMatchObject([
        'jira-core.ondemand',
        'jira-servicedesk.ondemand',
        ...FIXED_PRODUCTS_KEYS,
      ]);
    });
    it('should add Jira Core for Jira Ops', () => {
      const licenseInformation = generateLicenseInformation([
        'jira-incident-manager.ondemand',
      ]);
      const result = getProductLinks(licenseInformation);
      expect(result.map(({ key }) => key)).toMatchObject([
        'jira-core.ondemand',
        'jira-incident-manager.ondemand',
        ...FIXED_PRODUCTS_KEYS,
      ]);
    });
  });

  describe('getAdministrationLinks', () => {
    it('should assemble admin links for site admins', () => {
      const isAdmin = true;
      const result = getAdministrationLinks(CLOUD_ID, isAdmin);
      const expectedResult = [
        `/admin/s/some-cloud-id`,
        `/admin/s/some-cloud-id/billing/addapplication`,
      ];
      expect(result.map(({ link }) => link)).toMatchObject(expectedResult);
    });
    it('should assemble admin links for site trusted users', () => {
      const isAdmin = false;
      const result = getAdministrationLinks(CLOUD_ID, isAdmin);
      const expectedResult = [
        `/trusted-admin`,
        `/trusted-admin/billing/addapplication`,
      ];
      expect(result.map(({ link }) => link)).toMatchObject(expectedResult);
    });
  });

  describe('getXSellLink', () => {
    it("should offer Confluence if it hasn't being activated", () => {
      const licenseInformation = generateLicenseInformation([
        'jira-software.ondemand',
      ]);
      const result = getSuggestedProductLink(licenseInformation);
      expect(result).not.toBe(null);
      expect(result && result.key).toBe('confluence.ondemand');
    });
    it('should offer Jira Service Desk if Confluence is active', () => {
      const licenseInformation = generateLicenseInformation([
        'jira-software.ondemand',
        'confluence.ondemand',
      ]);
      const result = getSuggestedProductLink(licenseInformation);
      expect(result).not.toBe(null);
      expect(result && result.key).toBe('jira-servicedesk.ondemand');
    });
    it('should return null if Confluence and JSD are active', () => {
      const licenseInformation = generateLicenseInformation([
        'jira-servicedesk.ondemand',
        'confluence.ondemand',
      ]);
      const result = getSuggestedProductLink(licenseInformation);
      expect(result && result.key).toBe(null);
    });
  });
});
