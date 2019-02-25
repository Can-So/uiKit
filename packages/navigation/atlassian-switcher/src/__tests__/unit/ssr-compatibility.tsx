/**
 * @jest-environment node
 */
describe('Atlassian Switcher - SSR', async () => {
  it('should not break when importing AtlassianSwitcher package', () => {
    expect(() => {
      const AtlassianSwitcher = require('../../components/atlassian-switcher')
        .default;
    }).not.toThrowError();
  });
});
