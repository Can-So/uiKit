import { isDifferentIdentifier } from '../../identifier';
import {
  FileIdentifier,
  UrlPreviewIdentifier,
  ExternalImageIdentifier,
} from '../../../root';

describe('isDifferentIdentifier()', () => {
  describe('file identifier', () => {
    it('should work with string id', () => {
      const a: FileIdentifier = {
        id: '1',
        mediaItemType: 'file',
      };
      const b: FileIdentifier = {
        id: '2',
        mediaItemType: 'file',
      };

      expect(isDifferentIdentifier(a, b)).toBeTruthy();
    });

    it('should work with promise id', () => {
      const id = Promise.resolve('same');
      const a: FileIdentifier = {
        id: Promise.resolve('1'),
        mediaItemType: 'file',
      };
      const b: FileIdentifier = {
        id: Promise.resolve('2'),
        mediaItemType: 'file',
      };
      const c: FileIdentifier = {
        id: Promise.resolve('1'),
        mediaItemType: 'file',
      };
      const e: FileIdentifier = {
        id,
        mediaItemType: 'file',
      };
      const f: FileIdentifier = {
        id,
        mediaItemType: 'file',
      };

      expect(isDifferentIdentifier(a, b)).toBeTruthy();
      expect(isDifferentIdentifier(a, c)).toBeTruthy();
      expect(isDifferentIdentifier(e, f)).toBeFalsy();
    });
  });

  describe('non file identifier', () => {
    it('should work with url previews', () => {
      const a: UrlPreviewIdentifier = {
        url: '123',
        mediaItemType: 'link',
      };
      const b: UrlPreviewIdentifier = {
        url: '456',
        mediaItemType: 'link',
      };

      expect(isDifferentIdentifier(a, b)).toBeTruthy();
    });

    it('should work with external images', () => {
      const a: ExternalImageIdentifier = {
        dataURI: 'some-preview-1',
        mediaItemType: 'external-image',
      };
      const b: ExternalImageIdentifier = {
        dataURI: 'some-preview-2',
        mediaItemType: 'external-image',
      };

      expect(isDifferentIdentifier(a, b)).toBeTruthy();
    });
  });
});
