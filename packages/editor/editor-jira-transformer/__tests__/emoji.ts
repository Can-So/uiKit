import { mapImageToEmoji } from '../src/emojiHelper';
import { doc, p } from '@atlaskit/editor-test-helpers';
import { checkParse } from './_test-helpers';
import { createJIRASchema } from '@atlaskit/editor-common';

describe('emojiHelper', () => {
  it(`maps correctly formed image tags`, () => {
    const imageElement = new Image();
    imageElement.src = '/images/icons/emoticons/smile.png';
    const result = mapImageToEmoji(imageElement);
    expect(result).toEqual('🙂');
  });

  it(`maps image tags with unqualified image url`, () => {
    const imageElement = new Image();
    imageElement.src = 'smile.png';
    const result = mapImageToEmoji(imageElement);
    expect(result).toEqual('🙂');
  });

  it(`maps image tags with preceding slash`, () => {
    const imageElement = new Image();
    imageElement.src = '/smile.png';
    const result = mapImageToEmoji(imageElement);
    expect(result).toEqual('🙂');
  });

  it(`does not map image tags without src`, () => {
    const imageElement = new Image();
    const result = mapImageToEmoji(imageElement);
    expect(result).toBeNull();
  });

  it(`does not map image tags with no filename`, () => {
    const imageElement = new Image();
    imageElement.src = '/images/icons/emoticons/';
    const result = mapImageToEmoji(imageElement);
    expect(result).toBeNull();
  });

  it(`does not map image tags with file name that does not correspond to an emoji`, () => {
    const imageElement = new Image();
    imageElement.src = '/images/icons/emoticons/invalidemoji.png';
    const result = mapImageToEmoji(imageElement);
    expect(result).toBeNull();
  });

  it(`does not map image tags with empty src`, () => {
    const imageElement = new Image();
    imageElement.src = '';
    const result = mapImageToEmoji(imageElement);
    expect(result).toBeNull();
  });
});

const schema = createJIRASchema({ allowTextColor: true });

describe('JIRATransformer', () => {
  describe('emoticons', () => {
    checkParse(
      'image tag is converted',
      schema,
      [
        `<img class="emoticon" src="/images/icons/emoticons/smile.png" height="16" width="16" align="absmiddle" alt="" border="0">`,
      ],
      doc(p('🙂')),
    );

    checkParse(
      'empty image tag is converted to empty text',
      schema,
      [
        `<img class="emoticon" src="" height="16" width="16" align="absmiddle" alt="" border="0">`,
      ],
      doc(p('')),
    );

    checkParse(
      'image tag without emoticon class is not converted to emoticon',
      schema,
      [`<img src="/images/icons/emoticons/smile.png">`],
      doc(p('')),
    );
  });
});
