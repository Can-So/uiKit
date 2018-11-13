/* tslint:disable:no-console */
import * as React from 'react';
import { remoteImage } from '@atlaskit/media-test-helpers';
import ImageNavigator from '../src/image-navigator';

let onLoadParams: any;
let imageElement: any;

const onLoad = (params: any) => {
  onLoadParams = params;
};
const exportImage = () => {
  const imageData = onLoadParams.export();

  imageElement.src = imageData;
};

function handleImgRef(img: any) {
  imageElement = img;
}

export default () => (
  <div>
    <h1>Remote image</h1>
    <ImageNavigator
      imageSource={remoteImage}
      onImageLoaded={(file, crop) => console.log('onImageLoaded', file, crop)}
      onPositionChanged={(x, y) => console.log('onPositionChanged', x, y)}
      onSizeChanged={size => console.log('onSizeChanged', size)}
      onRemoveImage={() => console.log('onRemoveImage')}
      onImageError={errorMessage => console.log('onImageError', errorMessage)}
      onLoad={onLoad}
      onImageUploaded={file => console.log('onImageLoaded', file)}
    />
    <button onClick={exportImage}>Export</button>
    <img
      style={{ position: 'absolute', top: 0, left: '300px' }}
      src=""
      alt=""
      ref={handleImgRef}
    />
  </div>
);
