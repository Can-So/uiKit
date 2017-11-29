import { UrlPreview, LinkDetails, FileDetails } from '@atlaskit/media-core';
import { isLinkDetails } from '../../src/utils/isLinkDetails';

describe('isLinkDetails()', () => {
  it('should return false for undefined', () => {
    expect(isLinkDetails(undefined)).toBe(false);
  });

  it('should return false for something random', () => {
    expect(isLinkDetails('test' as FileDetails)).toBe(false);
    expect(isLinkDetails(2.2 as FileDetails)).toBe(false);
  });

  it('should return true for a UrlPreview', () => {
    const link: UrlPreview = {
      type: 'foobar',
      url: 'https://example.com',
      title: 'Example link preview',
    };
    expect(isLinkDetails(link)).toBe(true);
  });

  it('should return true for a LinkDetails', () => {
    const link: LinkDetails = {
      id: 'foo',
      type: 'foobar',
      url: 'https://example.com',
      title: 'Example link item',
    };
    expect(isLinkDetails(link)).toBe(true);
  });

  it('should return true for a FileDetails', () => {
    const file: FileDetails = {
      name: 'foobar.jpg',
      size: 14000,
    };
    expect(isLinkDetails(file)).toBe(false);
  });
});
