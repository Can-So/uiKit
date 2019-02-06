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
                  text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi nisl, venenatis eget auctor vitae, venenatis quis lorem. Suspendisse maximus tortor vel dui tincidunt cursus. Vestibulum magna nibh, auctor non auctor id, finibus vitae orci. Nulla viverra ipsum et nunc fringilla ultricies. Pellentesque vitae felis molestie justo finibus accumsan. Suspendisse potenti. Nulla facilisi. Integer dignissim quis velit quis elementum. Sed sit amet varius ante. Duis vestibulum porta augue eu laoreet. Morbi id risus et augue sollicitudin aliquam. In et ligula dolor. Nam ac aliquet diam.',
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
                            text: '@Rradley Bodgers',
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
                            text: '@Gaura Lonzalez',
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
                            text: '@Ricola Nushton',
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
                            text: '@Araig Cdlington',
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
                            text: '@Mherif Sansour',
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
              ],
            },
          ],
        },
      ],
    },
  ],
};

export { layoutWithDefaultBreakoutMark };
