import { expect } from 'chai';
import * as sinon from 'sinon';
import { Fragment } from 'prosemirror-model';
import {
  mergeTextNodes,
  isEmojiDoc,
  isText,
  isTextWrapper,
} from '../../../../react/nodes';
import { emoji as emojiData } from '@atlaskit/util-data-test';

const { testData } = emojiData;

const toEmojiAttrs = emoji => {
  const { shortName, id, fallback } = emoji;
  return {
    shortName,
    id,
    text: fallback || shortName,
  };
};

const toEmojiId = emoji => {
  const { shortName, id, fallback } = emoji;
  return { shortName, id, fallback };
};

export const grinEmojiAttrs = toEmojiAttrs(testData.grinEmoji);
export const grinEmojiId = toEmojiId(testData.grinEmoji);

const createMockFragment = fragment => {
  const mock = sinon.createStubInstance(Fragment);
  if (fragment.content) {
    mock.content = createMockFragment(fragment.content);
    mock.forEach = fn => mock.content.forEach(fn);
  }
  Object.keys(fragment).forEach(key => (mock[key] = fragment[key]));
  return mock;
};

describe('Renderer - React/Nodes', () => {
  describe('mergeTextNodes', () => {
    it('should wrap adjacent text nodes in a textWrapper', () => {
      const input = [
        {
          type: {
            name: 'text',
          },
          text: 'hello ',
        },
        {
          type: {
            name: 'text',
          },
          text: 'world! ',
        },
        {
          type: {
            name: 'mention',
          },
          attrs: {
            id: 'abcd-abcd-abcd',
            text: '@Oscar Wallhult',
          },
        },
        {
          type: {
            name: 'text',
          },
          text: ' is my name!',
        },
      ];

      expect(mergeTextNodes(input)).to.deep.equal([
        {
          type: {
            name: 'textWrapper',
          },
          content: [
            {
              type: {
                name: 'text',
              },
              text: 'hello ',
            },
            {
              type: {
                name: 'text',
              },
              text: 'world! ',
            },
          ],
        },
        {
          type: {
            name: 'mention',
          },
          attrs: {
            id: 'abcd-abcd-abcd',
            text: '@Oscar Wallhult',
          },
        },
        {
          type: {
            name: 'textWrapper',
          },
          content: [
            {
              type: {
                name: 'text',
              },
              text: ' is my name!',
            },
          ],
        },
      ]);
    });
  });

  describe('isEmojiDoc', () => {
    const grinEmoji = {
      type: {
        name: 'emoji',
      },
      attrs: {
        ...grinEmojiAttrs,
      },
    };

    it('should return true for a single emoji', () => {
      const content = createMockFragment({
        type: {
          name: 'doc',
        },
        version: 1,
        content: [
          {
            type: {
              name: 'paragraph',
            },
            content: [grinEmoji],
          },
        ],
      });

      expect(isEmojiDoc(content)).to.equal(true);
    });

    it('should return true for up to three emojis', () => {
      const content = createMockFragment({
        type: {
          name: 'doc',
        },
        version: 1,
        content: [
          {
            type: {
              name: 'paragraph',
            },
            content: [grinEmoji, grinEmoji, grinEmoji],
          },
        ],
      });

      expect(isEmojiDoc(content)).to.equal(true);
    });

    it('should return false for more than three emojis', () => {
      const content = createMockFragment({
        type: {
          name: 'doc',
        },
        version: 1,
        content: [
          {
            type: {
              name: 'paragraph',
            },
            content: [grinEmoji, grinEmoji, grinEmoji, grinEmoji],
          },
        ],
      });

      expect(isEmojiDoc(content)).to.equal(false);
    });

    it('should return false if no emojis', () => {
      const content = createMockFragment({
        type: {
          name: 'doc',
        },
        version: 1,
        content: [
          {
            type: {
              name: 'paragraph',
            },
            content: [
              {
                type: {
                  name: 'text',
                },
                text: ' ',
              },
            ],
          },
        ],
      });

      expect(isEmojiDoc(content)).to.equal(false);
    });

    it('should ignore surrounding whitespace when determining whether the paragraph is any emoji block', () => {
      const content = createMockFragment({
        type: {
          name: 'doc',
        },
        version: 1,
        content: [
          {
            type: {
              name: 'paragraph',
            },
            content: [
              {
                type: {
                  name: 'text',
                },
                text: '	         ',
              },
              grinEmoji,
              {
                type: {
                  name: 'text',
                },
                text: '	                         ',
              },
              grinEmoji,
              {
                type: {
                  name: 'text',
                },
                text: '		',
              },
              grinEmoji,
              {
                type: {
                  name: 'text',
                },
                text: '	',
              },
            ],
          },
        ],
      });

      expect(isEmojiDoc(content)).to.equal(true);
    });

    it('should return false if the block contains non-whitespace text', () => {
      const content = createMockFragment({
        type: {
          name: 'doc',
        },
        version: 1,
        content: [
          {
            type: {
              name: 'paragraph',
            },
            content: [
              {
                type: {
                  name: 'text',
                },
                text: 'This is text',
              },
              grinEmoji,
            ],
          },
        ],
      });

      expect(isEmojiDoc(content)).to.equal(false);
    });

    it('should return false if there is a non-text or non-emoji node', () => {
      const content = createMockFragment({
        type: {
          name: 'doc',
        },
        version: 1,
        content: [
          {
            type: {
              name: 'paragraph',
            },
            content: [
              grinEmoji,
              {
                type: {
                  name: 'mention',
                },
                attrs: {
                  id: 'here',
                  accessLevel: 'CONTAINER',
                },
                text: '@here',
              },
            ],
          },
        ],
      });

      expect(isEmojiDoc(content)).to.equal(false);
    });

    it('should return false if there are multiple paragraphs in the doc', () => {
      const content = createMockFragment({
        type: {
          name: 'doc',
        },
        version: 1,
        content: [
          {
            type: {
              name: 'paragraph',
            },
            content: [grinEmoji],
          },
          {
            type: {
              name: 'paragraph',
            },
            content: [grinEmoji],
          },
        ],
      });

      expect(isEmojiDoc(content)).to.equal(false);
    });

    it('should return false if parent block is not of type paragraph', () => {
      const content = createMockFragment({
        type: {
          name: 'doc',
        },
        version: 1,
        content: [
          {
            type: 'decisionItem',
            attrs: {
              localId: '',
              state: 'DECIDED',
            },
            content: [grinEmoji],
          },
        ],
      });

      expect(isEmojiDoc(content)).to.equal(false);
    });

    it('should return true at nested level if fitToHeight prop is set to 40', () => {
      const content = createMockFragment({ content: [grinEmoji] });

      expect(isEmojiDoc(content, { fitToHeight: 40 })).to.equal(true);
    });

    it('should return false at nested level if no fitToHeight prop', () => {
      const content = createMockFragment({
        type: {
          name: 'paragraph',
        },
        content: [grinEmoji],
      });

      expect(isEmojiDoc(content, {})).to.equal(false);
    });
  });

  describe('isTextWrapper', () => {
    it('should return true if type equals "textWrapper"', () => {
      expect(isTextWrapper('textWrapper')).to.equal(true);
    });

    it('should return false if type does not equal "textWrapper"', () => {
      expect(isTextWrapper('mention')).to.equal(false);
    });
  });

  describe('isText', () => {
    it('should return true if type equals "text"', () => {
      expect(isText('text')).to.equal(true);
    });

    it('should return false if type does not equal "text"', () => {
      expect(isText('mention')).to.equal(false);
    });
  });
});
