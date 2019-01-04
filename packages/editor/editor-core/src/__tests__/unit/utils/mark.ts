import { name } from '../../../../package.json';

import { JSONDocNode } from '../../../utils/index';
import { removeQueryMarksFromJSON } from '../../../utils/mark';

describe(name, () => {
  describe('Utils -> Mark', () => {
    describe('removeQueryMarksFromJSON()', () => {
      it('should filter out emojiQuery marks from json document', () => {
        const jsonDoc = {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ':',
                  marks: [
                    {
                      type: 'emojiQuery',
                    },
                  ],
                },
              ],
            },
          ],
        } as JSONDocNode;

        const sanitizedJSON = removeQueryMarksFromJSON(jsonDoc);

        expect(sanitizedJSON).toEqual({
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ':',
                  marks: [],
                },
              ],
            },
          ],
        });
      });

      it('should filter out typeAheadQuery marks from json document', () => {
        const jsonDoc = {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '/',
                  marks: [
                    {
                      type: 'typeAheadQuery',
                    },
                  ],
                },
              ],
            },
          ],
        } as JSONDocNode;

        const sanitizedJSON = removeQueryMarksFromJSON(jsonDoc);

        expect(sanitizedJSON).toEqual({
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '/',
                  marks: [],
                },
              ],
            },
          ],
        });
      });

      it('should preserve other marks', () => {
        const jsonDoc = {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'this',
                  marks: [
                    {
                      type: 'em',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' ',
                },
                {
                  type: 'text',
                  text: 'is',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' a ',
                },
                {
                  type: 'text',
                  text: 'text',
                  marks: [
                    {
                      type: 'strike',
                    },
                  ],
                },
              ],
            },
          ],
        } as JSONDocNode;

        const sanitizedJSON = removeQueryMarksFromJSON(jsonDoc);
        expect(sanitizedJSON).toEqual(jsonDoc);
      });
    });
  });
});
