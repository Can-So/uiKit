const layoutWithDefaultBreakoutMark = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'layoutSection',
      marks: [
        {
          type: 'breakout',
          attrs: {
            mode: 'default',
          },
        },
      ],
      content: [
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'emoji',
                  attrs: {
                    id: '1f550',
                    text: '🕐',
                    shortName: ':clock1:',
                  },
                },
                {
                  text: ' ',
                  type: 'text',
                },
                {
                  text: 'Context',
                  type: 'text',
                  marks: [
                    {
                      type: 'strong',
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
                  text: 'One of the project findability ',
                  type: 'text',
                },
                {
                  text: 'phase 1 recommendations',
                  type: 'text',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href:
                          'https://hello.atlassian.net/wiki/spaces/MDX/pages/387012390/Phase+1+-+Executive+Summary',
                      },
                    },
                  ],
                },
                {
                  text:
                    ' was to dive deeper to quantify the impact investing more time to improve the navigation system. Phase 2 of the findability project will be looking activities to address this recommendation. ',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'emoji',
                  attrs: {
                    id: '1f3ab',
                    text: '🎫',
                    shortName: ':ticket:',
                  },
                },
                {
                  text: ' ',
                  type: 'text',
                },
                {
                  text: 'Project central',
                  type: 'text',
                  marks: [
                    {
                      type: 'strong',
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
                  text: 'TBA.',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'emoji',
                  attrs: {
                    id: '8077b574-443a-4ffe-90e3-65841c8a2882',
                    text: ':teamboard:',
                    shortName: ':teamboard:',
                  },
                },
                {
                  text: ' ',
                  type: 'text',
                },
                {
                  text: 'Team members',
                  type: 'text',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
              ],
            },
            {
              type: 'rule',
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
                          type: 'mention',
                          attrs: {
                            id: '557058:14f955e1-0b75-4e74-bc5e-2e6463d7fe73',
                            text: '@Bradley Rodgers',
                          },
                        },
                        {
                          text: ' ',
                          type: 'text',
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
                          type: 'mention',
                          attrs: {
                            id: '5bbb246bb74fda7e92c8bb4b',
                            text: '@Laura Parraga Gonzalez',
                          },
                        },
                        {
                          text: ' ',
                          type: 'text',
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
                          type: 'mention',
                          attrs: {
                            id: '5bd260bc3b3eac6a40019ee5',
                            text: '@Nicola Rushton',
                          },
                        },
                        {
                          text: ' ',
                          type: 'text',
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
                          type: 'mention',
                          attrs: {
                            id: '557057:db6c1867-e0a9-445d-affa-ddb44869a3a7',
                            text: '@Craig Adlington',
                          },
                        },
                        {
                          text: ' ',
                          type: 'text',
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
                          type: 'mention',
                          attrs: {
                            id: '557057:76693d7c-2bd2-4204-97d2-89acd3b273ae',
                            text: '@Sherif Mansour',
                          },
                        },
                        {
                          text: ' ',
                          type: 'text',
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
                          text: 'TBA Dev + Prototyper + Analyst',
                          type: 'text',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export { layoutWithDefaultBreakoutMark };
