import * as React from 'react';
import { waitUntil } from '@atlaskit/util-common-test';

import * as ImageUtil from '../../../../util/image';

import * as helper from '../picker/_emoji-picker-test-helpers';

import {
  getEmojiResourcePromise,
  createPngFile,
  pngDataURL,
  pngFileUploadData, // pngFileUploadData,
} from '../../_test-data';

import FileChooser from '../../../../components/common/FileChooser';
import AkFieldBase from '@atlaskit/field-base';

import Emoji from '../../../../components/common/Emoji';
import { EmojiUpload } from '../../../../types';
import EmojiUploadComponent from '../../../../components/uploader/EmojiUploadComponent';
import EmojiUploader, {
  Props,
} from '../../../../components/uploader/EmojiUploader';
import { mount, ReactWrapper } from 'enzyme';
import EmojiErrorMessage from '../../../../components/common/EmojiErrorMessage';

export function setupUploader(
  props?: Props,
  config?,
): Promise<ReactWrapper<any, any>> {
  const uploaderProps: Props = {
    ...props,
  } as Props;

  if (!props || !props.emojiProvider) {
    uploaderProps.emojiProvider = getEmojiResourcePromise(config);
  }

  const uploader = mount(<EmojiUploader {...uploaderProps} />);

  return waitUntil(() => {
    uploader.update();
    return uploader.find(EmojiUploadComponent).length > 0;
  }).then(() => uploader);
}

describe('<EmojiUploader />', () => {
  const uploadPreviewShown = component => {
    const uploadPreview = helper.findUploadPreview(component);
    expect(uploadPreview).toHaveLength(1);
    const uploadPreviewEmoji = uploadPreview.find(Emoji);
    expect(uploadPreviewEmoji).toHaveLength(2);
    let emoji = uploadPreviewEmoji.at(0).prop('emoji');
    expect(emoji.shortName).toEqual(':sample:');
    expect(emoji.representation.imagePath).toEqual(pngDataURL);
  };

  const typeEmojiName = async component => {
    await waitUntil(
      () => component.update() && component.find(AkFieldBase).length > 0,
    );
    const nameInput = component.find(AkFieldBase).find('input');
    nameInput.simulate('focus');
    nameInput.simulate('change', {
      target: {
        value: ':sample:',
      },
    });
    component.update();
  };

  const chooseFile = (component, file) => {
    const fileChooser = component.update().find(FileChooser);
    expect(fileChooser).toHaveLength(1);

    const fileOnChange = fileChooser.prop('onChange');
    expect(fileOnChange).toBeDefined();

    fileOnChange!({
      target: {
        files: [file],
      },
    } as React.ChangeEvent<any>);
    return fileChooser;
  };

  describe('display', () => {
    it('should display disabled emoji file chooser initially', async () => {
      const uploader = await setupUploader();
      const fileChooser = uploader.update().find(FileChooser);
      expect(fileChooser).toHaveLength(1);
      expect(fileChooser.get(0).props.isDisabled).toBe(true);
    });

    it('should show text input', async () => {
      const uploader = await setupUploader();
      const input = uploader.update().find(AkFieldBase);
      expect(input).toHaveLength(1);
    });

    it('should have emoji upload component', async () => {
      const uploader = await setupUploader();
      const component = uploader.update().find(EmojiUploadComponent);
      expect(component).toHaveLength(1);
    });
  });

  describe('upload', () => {
    beforeEach(() => {
      jest
        .spyOn(ImageUtil, 'parseImage')
        .mockImplementation(() => Promise.resolve(new Image()));

      jest
        .spyOn(ImageUtil, 'hasFileExceededSize')
        .mockImplementation(() => false);

      jest.spyOn(ImageUtil, 'getNaturalImageSize').mockImplementation(() =>
        Promise.resolve({
          width: 32,
          height: 32,
        }),
      );
    });

    it('Main upload flow', async () => {
      const emojiProvider = getEmojiResourcePromise({
        uploadSupported: true,
      });
      const component = await setupUploader({
        emojiProvider,
      });
      const provider = await emojiProvider;

      await typeEmojiName(component);

      chooseFile(component, createPngFile());
      await waitUntil(() => helper.addEmojiButtonVisible(component));

      uploadPreviewShown(component);

      const addEmojiButton = helper.findAddEmojiButton(component);
      addEmojiButton.simulate('click');

      await waitUntil(() => provider.getUploads().length > 0);
      // Check uploaded emoji
      const uploads = provider.getUploads();
      expect(uploads).toHaveLength(1);
      const upload = uploads[0];
      expect(upload.upload).toEqual({
        name: 'Sample',
        shortName: ':sample:',
        ...pngFileUploadData,
        width: 32,
        height: 32,
      });
      // Check display reset correctly
      await waitUntil(() => component.update().find(FileChooser).length > 0);
    });

    it('Upload failure with invalid file', async () => {
      jest
        .spyOn(ImageUtil, 'parseImage')
        .mockImplementation(() => Promise.reject(new Error('file error')));

      const emojiProvider = getEmojiResourcePromise({ uploadSupported: true });
      const component = await setupUploader({
        emojiProvider,
      });

      await emojiProvider;
      typeEmojiName(component);

      chooseFile(component, createPngFile());
      expect(component.find('FileChooser')).toHaveLength(1);

      await waitUntil(() => helper.errorMessageVisible(component));

      expect(component.find(EmojiErrorMessage).prop('message')).toEqual(
        'Selected image is invalid',
      );
    });

    it('should show error if file too big', async () => {
      jest
        .spyOn(ImageUtil, 'hasFileExceededSize')
        .mockImplementation(() => true);

      const emojiProvider = getEmojiResourcePromise({ uploadSupported: true });
      const component = await setupUploader({
        emojiProvider,
      });

      await emojiProvider;
      typeEmojiName(component);

      chooseFile(component, createPngFile());
      expect(component.find('FileChooser')).toHaveLength(1);

      await waitUntil(() => helper.errorMessageVisible(component));

      expect(component.find(EmojiErrorMessage).prop('message')).toEqual(
        'Selected image is more than 1 MB',
      );
    });

    it('should go back when cancel clicked', async () => {
      const emojiProvider = getEmojiResourcePromise({ uploadSupported: true });
      const component = await setupUploader({
        emojiProvider,
      });

      typeEmojiName(component);

      chooseFile(component, createPngFile());
      await waitUntil(() => helper.addEmojiButtonVisible(component));

      uploadPreviewShown(component);

      const cancelLink = helper.findCancelLink(component);
      cancelLink.simulate('click');
      // Should be back to initial screen
      await waitUntil(() => component.update().find(FileChooser).length > 0);
      expect(component.update().find(FileChooser)).toHaveLength(1);
    });
  });
});
