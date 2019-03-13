import * as React from 'react';
import styled from 'styled-components';
import Editor from './../src/editor/mobile-editor-element';
import {
  cardProvider,
  storyMediaProviderFactory,
} from '@atlaskit/editor-test-helpers';
import MediaServicesScaleLargeIcon from '@atlaskit/icon/glyph/media-services/scale-large';
import CopyIcon from '@atlaskit/icon/glyph/copy';

export const Wrapper: any = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

export const Toolbar: any = styled.div`
  padding: 10px 0;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.08);
`;

Wrapper.displayName = 'Wrapper';

// @ts-ignore
window.logBridge = window.logBridge || [];

function insertMedia() {
  window.bridge.onMediaPicked(
    'upload-preview-update',
    `{"file":{"id":"0c20ce69-bf0e-43d9-913f-46432e977b36","name":"Screen Shot 2019-03-12 at 11.13.06 am.png","type":"image/png","dimensions":{"width":2206,"height":770}}}`,
  );
  window.setTimeout(() => {
    window.bridge.onMediaPicked(
      'upload-end',
      `{"file":{"id":"0c20ce69-bf0e-43d9-913f-46432e977b36","name":"Screen Shot 2019-03-12 at 11.13.06 am.png","type":"image/png","publicId":"0c20ce69-bf0e-43d9-913f-46432e977b36","collectionName":"MediaServicesSample"}}`,
    );
  }, 2000);
}

export const mediaProvider = storyMediaProviderFactory({
  includeUserAuthProvider: true,
});

export default class Example extends React.Component {
  private el: HTMLTextAreaElement | null;
  copyAs = () => {
    if (!this.el) {
      return;
    }
    this.el.select();
    document.execCommand('copy');
  };

  render() {
    return (
      <Wrapper>
        <Toolbar>
          <MediaServicesScaleLargeIcon
            label="insert media"
            onClick={insertMedia}
          />
          <textarea id="input" ref={el => (this.el = el)} />
          <CopyIcon label="copy" onClick={this.copyAs} />
        </Toolbar>
        <Editor
          cardProvider={Promise.resolve(cardProvider)}
          mediaProvider={mediaProvider}
        />
      </Wrapper>
    );
  }
}
