/**
 * @jest-environment node
 */
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
// import { ContextFactory } from '@atlaskit/media-core';
// import {Card, FileIdentifier} from '../../';

test('media-card context server side rendering', async () => {
  // const context = ContextFactory.create({
  //   authProvider: () => Promise.resolve({
  //     clientId: '',
  //     token: '',
  //     baseUrl: '',
  //   })
  // });
  // const identifier: FileIdentifier = {
  //   id: '1',
  //   mediaItemType: 'file'
  // }

  // expect(() => ReactDOMServer.renderToString(<Card context={context} identifier={identifier} />)).not.toThrowError();

  (await getExamplesFor('media-card')).forEach(examples => {
    const Example = require(examples.filePath).default;
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
