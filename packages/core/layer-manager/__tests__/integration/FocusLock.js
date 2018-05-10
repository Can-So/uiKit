// @flow
// eslint-disable-next-line
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
// eslint-disable-next-line
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const urlFocusLock = getExampleUrl('core', 'layer-manager', 'focus-lock');
const FocusLockButton = '#examples p:nth-child(1) > button';
const LastButton = '#examples p:nth-child(2) > button:nth-child(3)';
const FirstButton = '#examples p:nth-child(2) > button:nth-child(1)';

BrowserTestCase(
  'AK-4416 - focus should loop to first element when inside a focus boundary',
  { skip: ['safari'] }, // browserstack has an issue with safari
  async client => {
    const LayerManagerTest = await new Page(client);
    await LayerManagerTest.goto(urlFocusLock);
    await LayerManagerTest.click(FocusLockButton);
    await LayerManagerTest.click(LastButton);
    // simulate tab button
    await LayerManagerTest.type(LastButton, ['Tab']);
    // get focus status of first button
    const firstButtonFocused = await LayerManagerTest.hasFocus(FirstButton);
    expect(firstButtonFocused).toBe(true);
  },
);
