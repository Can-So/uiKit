/* tslint:disable:no-console */
import * as React from 'react';
import { ImageNavigator } from '../src/image-navigator';

let onLoadParams;
let imageElement;

const onLoad = params => {
  onLoadParams = params;
};
const exportImage = () => {
  const imageData = onLoadParams.export();

  imageElement.src = imageData;
};

function handleImgRef(img) {
  imageElement = img;
}

export default () => (
  <div>
    <h1>Uploader</h1>
    <ImageNavigator
      onPositionChanged={(x, y) => {
        console.log('onPositionChanged', x, y);
      }}
      onSizeChanged={size => {
        console.log('onSizeChanged', size);
      }}
      onLoad={onLoad}
      onRemoveImage={() => console.log('onRemoveImage')}
      onImageError={errorMessage => console.log('onImageError', errorMessage)}
      onImageLoaded={(file, crop) => console.log('onImageLoaded', file, crop)}
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
