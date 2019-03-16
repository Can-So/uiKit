// @flow

import { BrowserTestCase } from '@findable/webdriver-runner/runner';
import { getExampleUrl } from '@findable/webdriver-runner/utils/example';
import Page from '@findable/webdriver-runner/wd-wrapper';

/* Url to test the example */
const urlDrawer = getExampleUrl('core', 'drawer', 'drawer-with-fixed-contents');

/* Css selectors used for the test */
const dropdownTrigger = '#drawer-contents button';
const dropdownMenu = '#drawer-contents div[aria-label][role="menu"]';

BrowserTestCase(
  'Drawer should render fixed dropdown-menu correctly',
  {},
  async client => {
    const drawerTest = new Page(client);
    await drawerTest.goto(urlDrawer);
    await drawerTest.waitFor(dropdownTrigger, 5000);
    await drawerTest.click(dropdownTrigger);
    await drawerTest.waitFor(dropdownMenu, 1000);
    const dropdownMenuLocation = await drawerTest.getLocation(dropdownMenu);

    expect(dropdownMenuLocation.x).toBeGreaterThanOrEqual(100);
    expect(dropdownMenuLocation.y).toBeGreaterThanOrEqual(200);
    await drawerTest.checkConsoleErrors();
  },
);
