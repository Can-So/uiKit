import {
  createEditor,
  doc,
  p,
  typeAheadQuery,
} from '@atlaskit/editor-test-helpers';
import { isQueryActive } from '../../../../../plugins/type-ahead/utils/is-query-active';

describe('findQueryMark', () => {
  it('should return true if typeAheadQuery mark is active', () => {
    const { editorView } = createEditor({
      doc: doc(p(typeAheadQuery({ trigger: '/' })('/query'))),
    });

    const queryMark = isQueryActive(
      editorView.state.schema.marks.typeAheadQuery,
      editorView.state.doc,
      0,
      8,
    );

    expect(queryMark).toBe(true);
  });

  it('should return false if query mark is not active', () => {
    const { editorView } = createEditor({
      doc: doc(p('/query')),
    });

    const queryMark = isQueryActive(
      editorView.state.schema.marks.typeAheadQuery,
      editorView.state.doc,
      0,
      8,
    );

    expect(queryMark).toEqual(false);
  });
});
