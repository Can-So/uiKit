import { emoji } from '@atlaskit/util-data-test';

const emojiTestData = emoji.testData;
const emojiStoryData = emoji.storyData;

type EmojiAttrs = {
  id: string;
  shortName: string;
  fallback?: string;
  text?: string;
};

const toEmojiAttrs = (emoji: EmojiAttrs): EmojiAttrs => {
  const { shortName, id, fallback } = emoji;
  return {
    shortName,
    id,
    text: fallback || shortName,
  };
};

const toEmojiId = (emoji: EmojiAttrs): EmojiAttrs => {
  const { shortName, id, fallback } = emoji;
  return { shortName, id, fallback };
};

export const grinEmojiAttrs = toEmojiAttrs(emojiTestData.grinEmoji);
export const evilburnsEmojiAttrs = toEmojiAttrs(emojiTestData.evilburnsEmoji);

export const grinEmojiId = toEmojiId(emojiTestData.grinEmoji);
export const evilburnsEmojiId = toEmojiId(emojiTestData.evilburnsEmoji);

export const lorem = emojiStoryData.lorem;

export const document = {
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello, ',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'strong',
            },
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com',
              },
            },
          ],
        },
        {
          type: 'text',
          text: ' and action mark',
          marks: [
            {
              type: 'action',
              attrs: {
                key: 'test-action-key',
                title: 'test action mark',
                target: {
                  receiver: 'some-receiver',
                  key: 'some-key',
                },
                parameters: {
                  test: 20,
                },
              },
            },
          ],
        },
        {
          type: 'text',
          text: ' and invalid action mark',
          marks: [
            {
              type: 'action',
              attrs: {
                key: 'test-action-key',
                title: 'test action mark',
                target: {
                  receiver: 'some-receiver',
                },
                parameters: {
                  test: 30,
                },
              },
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'italic',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: 'link',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'strike-through',
          marks: [
            {
              type: 'strike',
            },
          ],
        },
        {
          type: 'text',
          text: 'strong',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
        {
          type: 'text',
          text: 'sub',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sub',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'sup',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sup',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'underline',
          marks: [
            {
              type: 'underline',
            },
          ],
        },
        {
          type: 'text',
          text: ' red text ',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: '#ff0000',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'strike-through',
          marks: [
            {
              type: 'strike',
            },
            {
              type: 'textColor',
              attrs: {
                color: '#ff0000',
              },
            },
          ],
        },
        {
          type: 'text',
          text: ' ',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: '#ff0000',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'underline',
          marks: [
            {
              type: 'underline',
            },
            {
              type: 'textColor',
              attrs: {
                color: '#ff0000',
              },
            },
          ],
        },
        {
          type: 'text',
          text: ' ',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: '#ff0000',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'mixed',
          marks: [
            {
              type: 'strong',
            },
            {
              type: 'strike',
            },
            {
              type: 'subsup',
              attrs: {
                type: 'sup',
              },
            },
            {
              type: 'underline',
            },
            {
              type: 'textColor',
              attrs: {
                color: '#ff0000',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'some inline code: ',
        },
        {
          type: 'text',
          text: 'const foo = bar();',
          marks: [
            {
              type: 'code',
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Heading 1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          text: 'Heading 2',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'www.atlassian.com',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is a paragraph with a text node',
        },
        {
          type: 'text',
          text: '\n',
        },
        {
          type: 'text',
          text: 'that contains a new line',
        },
      ],
    },
    {
      type: 'codeBlock',
      content: [
        {
          type: 'text',
          text: `// Create a map.
final IntIntOpenHashMap map = new IntIntOpenHashMap();
map.put(1, 2);
map.put(2, 5);
map.put(3, 10);`,
        },
        {
          type: 'text',
          text: `
int count = map.forEach(new IntIntProcedure()
{
   int count;
   public void apply(int key, int value)
   {
       if (value >= 5) count++;
   }
}).count;
System.out.println("There are " + count + " values >= 5");`,
        },
      ],
      attrs: {
        language: 'javascript',
      },
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'First list item',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Second list item',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Third list item',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'codeBlock',
      marks: [{ type: 'breakout', attrs: { mode: 'wide' } }],
      content: [
        {
          type: 'text',
          text: `// Create a map.
final IntIntOpenHashMap map = new IntIntOpenHashMap();
map.put(1, 2);
map.put(2, 5);
map.put(3, 10);`,
        },
      ],
      attrs: {
        language: 'javascript',
      },
    },
    {
      type: 'orderedList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'First list item',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Second list item',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Third list item',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text:
                'All that is gold does not glitter, not all those who wander are lost; The old that is strong does not wither, deep roots are not reached by the frost.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text:
                'From the ashes a fire shall be woken, a light from the shadows shall spring; Renewed shall be blade that was broken, the crownless again shall be king.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'J.R.R. Tolkien, The Fellowship of the Ring.',
              marks: [
                {
                  type: 'em',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'info',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is an info panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'note',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a note panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'tip',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a tip panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'success',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a success panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'warning',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a warning panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'error',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a error panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'rule',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'Do not use this image node; it may be removed at any time without notice.',
        },
        {
          type: 'image',
          attrs: {
            src:
              'https://www.google.com.au/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
            alt: 'Google Logo',
            title: 'Google!',
          },
        },
        {
          type: 'text',
          text:
            'Do not use this image node; it may be removed at any time without notice.',
        },
      ],
    },
    {
      type: 'decisionList',
      attrs: {
        localId: 'empty-list-should-not-render',
      },
      content: [
        {
          type: 'decisionItem',
          attrs: {
            localId: 'to-be-ignored-as-no-content',
            state: 'DECIDED',
          },
        },
      ],
    },
    {
      type: 'taskList',
      attrs: {
        localId: 'empty-list-should-not-render',
      },
      content: [
        {
          type: 'taskItem',
          attrs: {
            localId: 'to-be-ignored-as-no-content',
            state: 'TODO',
          },
        },
      ],
    },
    {
      type: 'decisionList',
      attrs: {
        localId: '',
      },
      content: [
        {
          type: 'decisionItem',
          attrs: {
            localId: '',
            state: 'DECIDED',
          },
          content: [
            {
              type: 'text',
              text: 'Hello world',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'This is a decision ',
            },
            {
              type: 'emoji',
              attrs: {
                shortName: ':wink:',
                id: '1f609',
                text: '😉',
              },
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'mention',
              attrs: {
                id: '0',
                text: '@Carolyn',
                accessLevel: 'CONTAINER',
              },
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              text: 'was',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              text: 'here',
              marks: [
                {
                  type: 'em',
                },
                {
                  type: 'underline',
                },
              ],
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'mention',
              attrs: {
                id: 'error:NotFound',
                text: '@NoLongerWorksHere',
                accessLevel: 'CONTAINER',
              },
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              text: 'is not',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              text: 'here.',
            },
          ],
        },
        {
          type: 'decisionItem',
          attrs: {
            localId: '',
            state: 'DECIDED',
          },
          content: [
            {
              type: 'text',
              text: 'decision 2',
            },
          ],
        },
        {
          type: 'decisionItem',
          attrs: {
            localId: 'to-be-ignored-as-no-content',
            state: 'DECIDED',
          },
        },
      ],
    },
    {
      type: 'taskList',
      attrs: {
        localId: '',
      },
      content: [
        {
          type: 'taskItem',
          attrs: {
            localId: 'task-1',
            state: 'TODO',
          },
          content: [
            {
              type: 'text',
              text: 'Could you please',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'do this ',
            },
            {
              type: 'mention',
              attrs: {
                id: '0',
                text: '@Carolyn',
                accessLevel: 'CONTAINER',
              },
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'emoji',
              attrs: {
                shortName: ':wink:',
                id: '1f609',
                text: '😉',
              },
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            localId: 'task-2',
            state: 'DONE',
          },
          content: [
            {
              type: 'text',
              text: 'This is completed',
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            localId: 'to-be-ignored-as-no-content',
            state: 'TODO',
          },
        },
      ],
    },
    {
      type: 'table',
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {
                colspan: 2,
                colwidth: [233, 100],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'header',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {
                background: '#DEEBFF',
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'header',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                background: null,
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'cell',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'cell',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'cell',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'cell',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'cell',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'cell',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Media single without width defined',
        },
      ],
    },
    {
      type: 'bodiedExtension',
      attrs: {
        extensionType: 'com.atlassian.fabric',
        extensionKey: 'clock',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is the default content of the extension',
            },
          ],
        },
      ],
    },
  ],
};
