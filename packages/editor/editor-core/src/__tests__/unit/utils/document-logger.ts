import {
  doc,
  p,
  date,
  panel,
  status,
  emoji,
  table,
  tr,
  th,
  td,
  underline,
  strong,
} from '@atlaskit/editor-test-helpers';
import { getDocStructure } from '../../../utils/document-logger';
import schema from '../../../../../editor-test-helpers/src/schema';

const checkDocument = (doc, expected) => {
  const document = doc(schema);
  expect(getDocStructure(document)).toEqual(expected);
};

describe('document logger', () => {
  it('gets document structure for one block node', () => {
    checkDocument(doc(p()), {
      type: 'doc',
      start: 0,
      end: 3,
      content: [{ type: 'paragraph', start: 1, end: 2 }],
    });
  });

  it('gets document structure for multiple block nodes', () => {
    checkDocument(doc(p(), p()), {
      type: 'doc',
      start: 0,
      end: 5,
      content: [
        { type: 'paragraph', start: 1, end: 2 },
        { type: 'paragraph', start: 3, end: 4 },
      ],
    });
  });

  it('gets document structure for nested block nodes', () => {
    checkDocument(doc(panel({ panelType: 'info' })(p())), {
      type: 'doc',
      start: 0,
      end: 5,
      content: [
        {
          type: 'panel',
          start: 1,
          end: 4,
          content: [{ type: 'paragraph', start: 2, end: 3 }],
        },
      ],
    });
  });

  it('gets document structure for inline nodes', () => {
    checkDocument(
      doc(
        p(
          'hello',
          status({ text: 'success', color: 'green', localId: 'abc' }),
          date({ timestamp: Date.now() }),
        ),
      ),
      {
        type: 'doc',
        start: 0,
        end: 10,
        content: [
          {
            type: 'paragraph',
            start: 1,
            end: 9,
            content: [
              { type: 'text', start: 1, end: 6 },
              { type: 'status', start: 6, end: 7 },
              { type: 'date', start: 7, end: 8 },
            ],
          },
        ],
      },
    );
  });

  it('gets document structure for marks', () => {
    checkDocument(
      doc(
        p(
          underline('underlined'),
          strong('bold'),
          underline(strong('bold and underline')),
        ),
      ),
      {
        type: 'doc',
        start: 0,
        end: 35,
        content: [
          {
            type: 'paragraph',
            start: 1,
            end: 34,
            content: [
              { type: 'text', marks: ['underline'], start: 1, end: 11 },
              { type: 'text', marks: ['strong'], start: 11, end: 15 },
              {
                type: 'text',
                marks: ['strong', 'underline'],
                start: 15,
                end: 33,
              },
            ],
          },
        ],
      },
    );
  });

  it('gets document structure for multiple block nodes and inline nodes', () => {
    checkDocument(
      doc(
        p(
          'hello',
          status({ text: 'success', color: 'green', localId: 'abc' }),
          date({ timestamp: Date.now() }),
        ),
        p('hi', emoji({ shortName: ':grinning:', text: '😀' })()),
      ),
      {
        type: 'doc',
        start: 0,
        end: 15,
        content: [
          {
            type: 'paragraph',
            start: 1,
            end: 9,
            content: [
              { type: 'text', start: 1, end: 6 },
              { type: 'status', start: 6, end: 7 },
              { type: 'date', start: 7, end: 8 },
            ],
          },
          {
            type: 'paragraph',
            start: 10,
            end: 14,
            content: [
              { type: 'text', start: 10, end: 12 },
              { type: 'emoji', start: 12, end: 13 },
            ],
          },
        ],
      },
    );
  });

  it('gets document structure for table', () => {
    checkDocument(
      doc(
        table()(
          tr(th({})(p('Animal'))),
          tr(td({})(p('bilby'))),
          tr(td({})(p('quokka'))),
        ),
      ),
      {
        type: 'doc',
        start: 0,
        end: 38,
        content: [
          {
            type: 'table',
            start: 1,
            end: 37,
            content: [
              {
                type: 'tableRow',
                start: 2,
                end: 13,
                content: [
                  {
                    type: 'tableHeader',
                    start: 3,
                    end: 12,
                    content: [
                      {
                        type: 'paragraph',
                        start: 4,
                        end: 11,
                        content: [{ type: 'text', start: 4, end: 10 }],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tableRow',
                start: 14,
                end: 24,
                content: [
                  {
                    type: 'tableCell',
                    start: 15,
                    end: 23,
                    content: [
                      {
                        type: 'paragraph',
                        start: 16,
                        end: 22,
                        content: [{ type: 'text', start: 16, end: 21 }],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tableRow',
                start: 25,
                end: 36,
                content: [
                  {
                    type: 'tableCell',
                    start: 26,
                    end: 35,
                    content: [
                      {
                        type: 'paragraph',
                        start: 27,
                        end: 34,
                        content: [{ type: 'text', start: 27, end: 33 }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    );
  });
});
