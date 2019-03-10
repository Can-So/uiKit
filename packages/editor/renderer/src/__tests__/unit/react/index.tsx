import { mount, shallow } from 'enzyme';
import { ReactSerializer } from '../../../index';
import { defaultSchema as schema } from '@atlaskit/adf-schema';
import { Action } from '../../../react/marks';
import { Heading } from '../../../react/nodes';
import { Emoji } from '../../../react/nodes';

import * as doc from '../../__fixtures__/hello-world.adf.json';
import * as headingDoc from '../../__fixtures__/heading-doc.adf.json';

const docFromSchema = schema.nodeFromJSON(doc);
const headingDocFromSchema = schema.nodeFromJSON(headingDoc);

describe('Renderer - ReactSerializer', () => {
  beforeAll(async () => {
    /*
      Async nodes used need to be preloaded before testing, otherwise the first mount
      will have the loading component and not the actual node.
    */
    await Promise.all([Emoji.preload()]);
  });
  describe('serializeFragment', () => {
    it('should render document', () => {
      const reactSerializer = ReactSerializer.fromSchema(schema, {});
      const reactDoc = mount(reactSerializer.serializeFragment(
        docFromSchema.content,
      ) as any);

      const root = reactDoc.find('div');
      const paragraph = root.find('p');
      const link = paragraph.find('a');
      const strong = link.find('strong');

      expect(root.length).toEqual(1);
      expect(paragraph.length).toEqual(1);
      expect(link.length).toEqual(1);
      expect(strong.length).toEqual(1);

      expect(link.text()).toEqual('Hello, World!');
      expect(link.props()).toHaveProperty('href', 'https://www.atlassian.com');
      expect(strong.text()).toEqual('World!');
      reactDoc.unmount();
    });
  });

  describe('buildMarkStructure', () => {
    const { em, strong, link, textColor, subsup } = schema.marks;

    it('should wrap text nodes with marks', () => {
      const textNodes = [
        schema.text('Hello '),
        schema.text('World!', [strong.create()]),
      ];

      const output = ReactSerializer.buildMarkStructure(textNodes);
      expect(output[0].type.name).toEqual('text');
      expect((output[0] as any).text).toEqual('Hello ');
      expect(output[1].type.name).toEqual('strong');
      expect((output[1] as any).content[0].type.name).toEqual('text');
      expect((output[1] as any).content[0].text).toEqual('World!');
    });

    it('should not merge marks when parent mark is different', () => {
      const textNodes = [
        schema.text('Hello ', [em.create(), subsup.create({ type: 'sup' })]),
        schema.text('World!', [subsup.create({ type: 'sup ' })]),
      ];

      const output = ReactSerializer.buildMarkStructure(textNodes);
      expect(output[0].type.name).toEqual('em');
      expect(output[1].type.name).toEqual('subsup');
    });

    it('should merge same marks when possible', () => {
      const textNodes = [
        schema.text('Hello ', [
          link.create({ href: 'https://www.atlassian.com' }),
          em.create(),
          strong.create(),
        ]),
        schema.text('World ', [
          link.create({ href: 'https://www.atlassian.com' }),
          em.create(),
        ]),
      ];

      const output = ReactSerializer.buildMarkStructure(textNodes);
      expect(output.length).toEqual(1);
      expect(output[0].type.name).toEqual('link');

      const { content } = output[0] as any;
      expect(content.length).toEqual(1);
      expect(content[0].type.name).toEqual('em');
      expect(content[0].content.length).toEqual(2);
      expect(content[0].content[0].type.name).toEqual('strong');
      expect(content[0].content[1].type.name).toEqual('text');
    });

    it('should merge mark nodes with text color', () => {
      const textNodes = [
        schema.text('2Pac '),
        schema.text('Ice Blue!', [
          strong.create(),
          textColor.create({ color: '#aaeebb' }),
        ]),
        schema.text('KL Jay', [strong.create()]),
        schema.text('Rihana', [strong.create()]),
      ];

      const output = ReactSerializer.buildMarkStructure(textNodes);
      expect(output.length).toEqual(2);
      expect(output[0].type.name).toEqual('text');
      expect(output[1].type.name).toEqual('strong');
      expect((output[1] as any).content[0].attrs).toEqual({
        color: '#aaeebb',
      });
    });

    it('should merge mark nodes with link', () => {
      const textNodes = [
        schema.text('2Pac '),
        schema.text('This is', [link.create({ href: 'gnu.org' })]),
        schema.text('the link. ', [
          em.create(),
          link.create({ href: 'gnu.org' }),
        ]),
        schema.text('not here', [strong.create()]),
      ];

      const output = ReactSerializer.buildMarkStructure(textNodes);
      expect(output.length).toEqual(3);
      expect(output[0].type.name).toEqual('text');
      expect(output[1].type.name).toEqual('link');
      expect(output[2].type.name).toEqual('strong');

      expect((output[1] as any).content.length).toEqual(2);
    });
  });

  describe('getMarks', () => {
    const { strong, strike, underline } = schema.marks;
    const node = schema.text('Hello World', [
      strike.create(),
      underline.create(),
      strong.create(),
    ]);

    it('should sort marks', () => {
      const sortedMarks = ReactSerializer.getMarks(node);
      expect(sortedMarks[0].type.name).toEqual('strong');
      expect(sortedMarks[1].type.name).toEqual('strike');
      expect(sortedMarks[2].type.name).toEqual('underline');
    });
  });

  describe('getMarkProps', () => {
    it('should pass eventHandlers to mark component', () => {
      const eventHandlers = {};
      const reactSerializer = ReactSerializer.fromSchema(schema, {
        eventHandlers,
      });
      const reactDoc = mount(reactSerializer.serializeFragment(
        docFromSchema.content,
      ) as any);
      expect(reactDoc.find(Action).prop('eventHandlers')).toEqual(
        eventHandlers,
      );
      reactDoc.unmount();
    });

    it('should pass key from attrs as markKey', () => {
      const eventHandlers = {};
      const reactSerializer = ReactSerializer.fromSchema(schema, {
        eventHandlers,
      });
      const reactDoc = mount(reactSerializer.serializeFragment(
        docFromSchema.content,
      ) as any);
      expect(reactDoc.find(Action).prop('markKey')).toEqual('test-action-key');
      expect(reactDoc.find(Action).key()).not.toEqual('test-action-key');
      reactDoc.unmount();
    });
  });

  describe('Heading IDs', () => {
    it('should render headings with unique ids based on node content', () => {
      const reactSerializer = ReactSerializer.fromSchema(schema, {});
      const reactDoc = shallow(reactSerializer.serializeFragment(
        headingDocFromSchema.content,
      ) as any);

      const headings = reactDoc.find(Heading);
      expect(headings.at(0).prop('headingId')).toEqual('Heading-1');
      expect(headings.at(1).prop('headingId')).toEqual('Heading-2');
      expect(headings.at(2).prop('headingId')).toEqual('Heading-1.1');
      expect(headings.at(3).prop('headingId')).toEqual('Heading-2.1');
    });

    it('should not render heading ids if "disableHeadingIDs" is true', () => {
      const reactSerializer = ReactSerializer.fromSchema(schema, {
        disableHeadingIDs: true,
      });
      const reactDoc = shallow(reactSerializer.serializeFragment(
        headingDocFromSchema.content,
      ) as any);

      const headings = reactDoc.find(Heading);
      expect(headings.at(0).prop('headingId')).toEqual(undefined);
      expect(headings.at(1).prop('headingId')).toEqual(undefined);
      expect(headings.at(2).prop('headingId')).toEqual(undefined);
      expect(headings.at(3).prop('headingId')).toEqual(undefined);
    });
  });

  describe('Table: Numbered Columns', () => {
    const tableDoc = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'table',
          attrs: {
            isNumberColumnEnabled: true,
          },
          content: [
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Header content 1',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableHeader',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Header content 2',
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
                          text: 'Body content 1',
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
                          text: 'Body content 2',
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

    it('should add an extra column for numbered rows', () => {
      const reactSerializer = ReactSerializer.fromSchema(schema, {});
      const tableFromSchema = schema.nodeFromJSON(tableDoc);
      const reactDoc = mount(reactSerializer.serializeFragment(
        tableFromSchema.content,
      ) as any);

      expect(reactDoc.find('table').prop('data-number-column')).toEqual(true);
      expect(reactDoc.find('table[data-number-column]').length).toEqual(1);
    });
  });
});
