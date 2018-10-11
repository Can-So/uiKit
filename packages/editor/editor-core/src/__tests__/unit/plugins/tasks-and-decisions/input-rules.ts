import {
  sendKeyToPm,
  insertText,
  compareSelection,
  createEditor,
  doc,
  blockquote,
  p,
  decisionList,
  decisionItem,
  hardBreak,
  taskList,
  taskItem,
  thEmpty,
  table,
  tr,
  td,
  th,
  tdEmpty,
  tdCursor,
  thCursor,
  a as link,
  br,
  bodiedExtension,
  layoutColumn,
  layoutSection,
} from '@atlaskit/editor-test-helpers';
import { taskDecision } from '@atlaskit/util-data-test';
import { uuid } from '@atlaskit/editor-common';

describe('tasks and decisions - input rules', () => {
  beforeEach(() => {
    uuid.setStatic('local-uuid');
  });

  afterEach(() => {
    uuid.setStatic(false);
  });

  const editorFactory = (doc: any) =>
    createEditor({
      editorProps: {
        taskDecisionProvider: Promise.resolve(
          taskDecision.getMockTaskDecisionResource(),
        ),
        allowTables: true,
        allowExtension: true,
        allowLayouts: true,
      },
      doc,
    });

  const scenarios = [
    {
      name: 'action',
      input: '[] ',
      list: taskList,
      item: taskItem,
      listProps: { localId: 'local-uuid' },
      itemProps: { localId: 'local-uuid', state: 'TODO' },
    },
    {
      name: 'decision',
      input: '<> ',
      list: decisionList,
      item: decisionItem,
      listProps: { localId: 'local-uuid' },
      itemProps: { localId: 'local-uuid' },
    },
  ];

  scenarios.forEach(({ name, input, list, item, listProps, itemProps }) => {
    describe(name, () => {
      it(`should replace "${input}" with a ${name}List`, () => {
        const { editorView, sel } = editorFactory(doc(p('{<>}')));
        insertText(editorView, input, sel);

        const expectedDoc = doc(list(listProps)(item(itemProps)('{<>}')));
        expect(editorView.state.doc).toEqualDocument(expectedDoc);
        compareSelection(editorFactory, expectedDoc, editorView);
      });

      it(`should replace "${input}" with a ${name}List inside table header`, () => {
        const { editorView, sel } = editorFactory(
          doc(table()(tr(thCursor), tr(tdEmpty), tr(tdEmpty))),
        );

        insertText(editorView, input, sel);

        const expectedDoc = doc(
          table()(
            tr(th({})(list(listProps)(item(itemProps)('{<>}')))),
            tr(tdEmpty),
            tr(tdEmpty),
          ),
        );
        expect(editorView.state.doc).toEqualDocument(expectedDoc);
        compareSelection(editorFactory, expectedDoc, editorView);
      });

      it(`should replace "${input}" with a ${name}List inside table cell`, () => {
        const { editorView, sel } = editorFactory(
          doc(table()(tr(thEmpty), tr(tdCursor), tr(tdEmpty))),
        );

        insertText(editorView, input, sel);

        const expectedDoc = doc(
          table()(
            tr(thEmpty),
            tr(
              td({})(list(listProps)(item({ localId: 'local-uuid' })('{<>}'))),
            ),
            tr(tdEmpty),
          ),
        );
        expect(editorView.state.doc).toEqualDocument(expectedDoc);
        compareSelection(editorFactory, expectedDoc, editorView);
      });

      it(`should replace "${input}" after shift+enter with a ${name}List inside table cell`, () => {
        const { editorView, sel } = editorFactory(
          doc(
            table()(
              tr(thEmpty),
              tr(td({})(p('Hello', hardBreak(), '{<>}'))),
              tr(tdEmpty),
            ),
          ),
        );

        insertText(editorView, input, sel);

        const expectedDoc = doc(
          table()(
            tr(thEmpty),
            tr(td({})(p('Hello'), list(listProps)(item(itemProps)('{<>}')))),
            tr(tdEmpty),
          ),
        );
        expect(editorView.state.doc).toEqualDocument(expectedDoc);
        compareSelection(editorFactory, expectedDoc, editorView);
      });

      it('should preserve existing content on row when converting', () => {
        const { editorView, sel } = editorFactory(doc(p('{<>}Hello World')));
        insertText(editorView, input, sel);

        const expectedDoc = doc(
          list(listProps)(item(itemProps)('{<>}Hello World')),
        );
        expect(editorView.state.doc).toEqualDocument(expectedDoc);
        compareSelection(editorFactory, expectedDoc, editorView);
      });

      it('should split on hardBreak and preserve content when converting', () => {
        const { editorView, sel } = editorFactory(
          doc(p('Hello', hardBreak(), '{<>}World')),
        );
        insertText(editorView, input, sel);

        const expectedDoc = doc(
          p('Hello'),
          list(listProps)(item(itemProps)('{<>}World')),
        );
        expect(editorView.state.doc).toEqualDocument(expectedDoc);
        compareSelection(editorFactory, expectedDoc, editorView);
      });

      it(`should replace "${input}" with a ${name}List inside bodiedExtension`, () => {
        const { editorView, sel } = editorFactory(
          doc(
            bodiedExtension({
              extensionKey: 'key',
              extensionType: 'type',
            })(p('{<>}')),
          ),
        );

        insertText(editorView, input, sel);

        const expectedDoc = doc(
          bodiedExtension({
            extensionKey: 'key',
            extensionType: 'type',
          })(list(listProps)(item(itemProps)('{<>}'))),
        );
        expect(editorView.state.doc).toEqualDocument(expectedDoc);
        compareSelection(editorFactory, expectedDoc, editorView);
      });

      it(`should replace "${input}" with a ${name}List inside layouts`, () => {
        const { editorView, sel } = editorFactory(
          doc(layoutSection()(layoutColumn(p('{<>}')), layoutColumn(p('')))),
        );

        insertText(editorView, input, sel);

        const expectedDoc = doc(
          layoutSection()(
            layoutColumn(list(listProps)(item(itemProps)('{<>}'))),
            layoutColumn(p('')),
          ),
        );
        expect(editorView.state.doc).toEqualDocument(expectedDoc);
        compareSelection(editorFactory, expectedDoc, editorView);
      });

      it(`should not create ${name}List inside blockquote`, () => {
        const { editorView, sel } = editorFactory(
          doc(blockquote(p('Hello World'), p('{<>}'))),
        );
        insertText(editorView, input, sel);

        expect(editorView.state.doc).toEqualDocument(
          doc(blockquote(p('Hello World'), p(input))),
        );
      });

      it(`should convert long link to hyperlink in ${name}`, () => {
        const { editorView, sel } = editorFactory(doc(p('{<>}')));
        insertText(editorView, input, sel);
        insertText(
          editorView,
          'media-playground.us-west-1.staging.atl-pass.net ',
          sel + 1,
        );

        const a = link({
          href: 'http://media-playground.us-west-1.staging.atl-pass.net',
        })('media-playground.us-west-1.staging.atl-pass.net');
        expect(editorView.state.doc).toEqualDocument(
          doc(list(listProps)(item(itemProps)(a, ' '))),
        );
      });

      it(`should convert markdown link in ${name}`, () => {
        const { editorView, sel } = editorFactory(doc(p('{<>}')));
        insertText(editorView, input, sel);
        insertText(editorView, '[text](http://foo)', sel + 1);

        const a = link({ href: 'http://foo' })('text');
        expect(editorView.state.doc).toEqualDocument(
          doc(list(listProps)(item(itemProps)(a))),
        );
      });

      it(`should add hardbreaks on Shift-Enter`, () => {
        const { editorView, sel } = editorFactory(doc(p('{<>}')));
        insertText(editorView, input, sel);
        sendKeyToPm(editorView, 'Shift-Enter');

        expect(editorView.state.doc).toEqualDocument(
          doc(list(listProps)(item(itemProps)(br()))),
        );
      });
    });
  });
});
