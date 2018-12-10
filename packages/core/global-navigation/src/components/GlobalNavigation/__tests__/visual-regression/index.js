// @flow
import {
  getExamplesFor,
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

const examples = getExamplesFor('global-navigation');

describe('Snapshot Test', () => {
  examples
    .filter(
      ({ exampleName }) => exampleName !== 'with-notification-integration',
    )
    .forEach(example => {
      it(`${example.exampleName} should match prod`, async () => {
        const url = getExampleUrl(
          example.team,
          example.package,
          example.exampleName,
          global.__BASEURL__,
        );

        const image = await takeScreenShot(global.page, url);
        //$FlowFixMe
        expect(image).toMatchProdImageSnapshot();
      });
    });

  it('with-notification-integration should match prod', async () => {
    const notificationExample = examples.find(
      ({ exampleName }) => exampleName === 'with-notification-integration',
    );
    const url =
      notificationExample &&
      getExampleUrl(
        notificationExample.team,
        notificationExample.package,
        notificationExample.exampleName,
        global.__BASEURL__,
      );

    const { page } = global;
    const notificationIcon = "[aria-label='Notifications']";
    const notificationIframe = 'iframe[title="Notifications"';

    await page.goto(url);

    await page.waitForSelector(notificationIcon);
    await page.click(notificationIcon);
    await page.waitFor(notificationIframe);

    const image = url && (await takeScreenShot(page, url));
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
