declare var global: any;
declare var require: any;

describe('checkWebpSupport util', () => {
  let imageObjects: any[];

  beforeEach(() => {
    imageObjects = [];
    global.Image = function Image() {
      const stubImage = {};
      imageObjects.push(stubImage);
      return stubImage;
    };
    jest.resetModules();
  });

  afterAll(() => {
    delete global.Image;
  });

  describe('without caching', () => {
    it('should return true if height is 2', () => {
      const { checkWebpSupport } = require('../../src/utils');
      const result = checkWebpSupport();
      expect(imageObjects).toHaveLength(1);
      imageObjects[0].height = 2;
      imageObjects[0].onload();
      return expect(result).resolves.toBe(true);
    });

    it('should return false if height is not 2', () => {
      const { checkWebpSupport } = require('../../src/utils');
      const result = checkWebpSupport();
      expect(imageObjects).toHaveLength(1);
      imageObjects[0].height = 1;
      imageObjects[0].onload();
      return expect(result).resolves.toBe(false);
    });
  });

  describe('with caching', () => {
    it('should use cache when called second time', () => {
      let { checkWebpSupport } = require('../../src/utils');
      checkWebpSupport();
      expect(imageObjects).toHaveLength(1);
      imageObjects[0].height = 2;
      imageObjects[0].onload();

      checkWebpSupport = require('../../src/utils').checkWebpSupport;
      const result = checkWebpSupport();
      expect(imageObjects).toHaveLength(1);
      return expect(result).resolves.toBe(true);
    });
  });

  it('should return even if onerror is called', () => {
    const { checkWebpSupport } = require('../../src/utils');
    const result = checkWebpSupport();
    expect(imageObjects).toHaveLength(1);
    imageObjects[0].height = 1;
    imageObjects[0].onerror();
    return expect(result).resolves.toBe(false);
  });
});
