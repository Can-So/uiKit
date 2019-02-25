import * as React from 'react';
import {
  Matrix,
  createStorybookContext,
  videoFileId,
  audioFileId,
  imageFileId,
  docFileId,
  unknownFileId,
} from '@atlaskit/media-test-helpers';

import { Card } from '../src';

const context = createStorybookContext();
// file cards
const videoFileCard = <Card context={context} identifier={videoFileId} />;
const imageFileCard = <Card context={context} identifier={imageFileId} />;
const audioFileCard = <Card context={context} identifier={audioFileId} />;
const docFileCard = <Card context={context} identifier={docFileId} />;
const unknownFileCard = <Card context={context} identifier={unknownFileId} />;

export default () => (
  <div style={{ margin: '40px' }}>
    <h1>Media type matrix</h1>
    <Matrix>
      <thead>
        <tr>
          <td />
          <td>File Cards</td>
          <td>Link Cards</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>video</td>
          <td>
            <div>{videoFileCard}</div>
          </td>
        </tr>
        <tr>
          <td>image</td>
          <td>
            <div>{imageFileCard}</div>
          </td>
        </tr>
        <tr>
          <td>audio</td>
          <td>
            <div>{audioFileCard}</div>
          </td>
        </tr>
        <tr>
          <td>doc</td>
          <td>
            <div>{docFileCard}</div>
          </td>
        </tr>
        <tr>
          <td>unknown</td>
          <td>
            <div>{unknownFileCard}</div>
          </td>
        </tr>
      </tbody>
    </Matrix>
  </div>
);
