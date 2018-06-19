import { mount } from 'enzyme';
import * as React from 'react';
import { selectTable, getCellsInColumn } from 'prosemirror-utils';
import { Node } from 'prosemirror-model';
import { CellSelection } from 'prosemirror-tables';
import {
  doc,
  p,
  createEditor,
  table,
  tr,
  tdEmpty,
  tdCursor,
  td,
  thEmpty,
} from '@atlaskit/editor-test-helpers';

import {
  TablePluginState,
  stateKey,
} from '../../../../src/plugins/table/pm-plugins/main';
import ColumnControls from '../../../../src/plugins/table/ui/TableFloatingControls/ColumnControls';
import {
  ColumnControlsButtonWrap,
  HeaderButton as ColumnControlsButton,
} from '../../../../src/plugins/table/ui/TableFloatingControls/ColumnControls/styles';
import { tablesPlugin } from '../../../../src/plugins';
import { setTextSelection } from '../../../../src';
import DeleteColumnButton from '../../../../src/plugins/table/ui/TableFloatingControls/ColumnControls/DeleteColumnButton';
import InsertColumnButton from '../../../../src/plugins/table/ui/TableFloatingControls/ColumnControls/InsertColumnButton';

const selectColumns = columnIdxs => tr => {
  const cells: { pos: number; start: number; node: Node }[] = columnIdxs.reduce(
    (acc, colIdx) => {
      const colCells = getCellsInColumn(colIdx)(tr.selection);
      return colCells ? acc.concat(colCells) : acc;
    },
    [],
  );

  if (cells) {
    const $anchor = tr.doc.resolve(cells[0].pos);
    const $head = tr.doc.resolve(cells[cells.length - 1].pos);
    return tr.setSelection(new CellSelection($anchor, $head));
  }
};

describe('ColumnControls', () => {
  const editor = (doc: any) =>
    createEditor<TablePluginState>({
      doc,
      editorPlugins: [tablesPlugin],
      pluginKey: stateKey,
    });

  [1, 2, 3].forEach(column => {
    describe(`when table has ${column} columns`, () => {
      it(`should render ${column} column header buttons`, () => {
        const nodes = [tdCursor];
        for (let i = 1; i < column; i++) {
          nodes.push(tdEmpty);
        }
        const { editorView } = editor(doc(p('text'), table()(tr(...nodes))));
        const floatingControls = mount(
          <ColumnControls
            tableRef={document.querySelector('table')!}
            isTableHovered={false}
            editorView={editorView}
          />,
        );

        expect(floatingControls.find(ColumnControlsButtonWrap)).toHaveLength(
          column,
        );
        floatingControls.unmount();
        editorView.destroy();
      });
    });
  });

  [0, 1, 2].forEach(column => {
    describe(`when HeaderButton in column ${column + 1} is clicked`, () => {
      it('should not move the cursor when hovering controls', () => {
        const { editorView, refs } = editor(
          doc(
            table()(
              tr(thEmpty, td({})(p('{nextPos}')), thEmpty),
              tr(tdCursor, tdEmpty, tdEmpty),
              tr(tdEmpty, tdEmpty, tdEmpty),
            ),
          ),
        );

        const floatingControls = mount(
          <ColumnControls
            tableRef={document.querySelector('table')!}
            isTableHovered={false}
            editorView={editorView}
          />,
        );

        // move to header row
        const { nextPos } = refs;
        setTextSelection(editorView, nextPos);

        // now hover the column
        floatingControls
          .find(ColumnControlsButton)
          .at(column)
          .find('button')
          .first()
          .simulate('mouseover');

        // assert the cursor is still in same position
        expect(editorView.state.selection.$from.pos).toBe(nextPos);
        expect(editorView.state.selection.$to.pos).toBe(nextPos);

        // release the hover
        floatingControls
          .find(ColumnControlsButton)
          .at(column)
          .find('button')
          .first()
          .simulate('mouseout');

        // assert the cursor is still in same position
        expect(editorView.state.selection.$from.pos).toBe(nextPos);
        expect(editorView.state.selection.$to.pos).toBe(nextPos);

        floatingControls.unmount();
      });
    });

    describe('DeleteColumnButton', () => {
      it(`renders a delete button with column ${column} selected`, () => {
        const { editorView } = editor(
          doc(
            table()(
              tr(thEmpty, td({})(p()), thEmpty),
              tr(tdCursor, tdEmpty, tdEmpty),
              tr(tdEmpty, tdEmpty, tdEmpty),
            ),
          ),
        );

        const floatingControls = mount(
          <ColumnControls
            tableRef={document.querySelector('table')!}
            isTableHovered={false}
            editorView={editorView}
          />,
        );

        // now click the column
        floatingControls
          .find(ColumnControlsButton)
          .at(column)
          .simulate('mousedown');

        // reapply state to force re-render
        floatingControls.setState(floatingControls.state());

        // we should now have a delete button
        expect(floatingControls.find(DeleteColumnButton).length).toBe(1);
        floatingControls.unmount();
      });
    });
  });

  describe('DeleteColumnButton', () => {
    it('does not render a delete button with no selection', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(thEmpty, td({})(p()), thEmpty),
            tr(tdCursor, tdEmpty, tdEmpty),
            tr(tdEmpty, tdEmpty, tdEmpty),
          ),
        ),
      );

      const floatingControls = mount(
        <ColumnControls
          tableRef={document.querySelector('table')!}
          isTableHovered={false}
          editorView={editorView}
        />,
      );

      expect(floatingControls.find(DeleteColumnButton).length).toBe(0);
      floatingControls.unmount();
    });
  });

  it('applies the danger class to the column buttons', () => {
    const { editorView } = editor(
      doc(
        table()(
          tr(thEmpty, td({})(p()), thEmpty),
          tr(tdCursor, tdEmpty, tdEmpty),
          tr(tdEmpty, tdEmpty, tdEmpty),
        ),
      ),
    );

    const floatingControls = mount(
      <ColumnControls
        tableRef={document.querySelector('table')!}
        isTableHovered={false}
        editorView={editorView}
      />,
    );

    editorView.dispatch(selectColumns([0, 1])(editorView.state.tr));

    // reapply state to force re-render
    floatingControls.setState(floatingControls.state());

    floatingControls.find(DeleteColumnButton).simulate('mouseenter');

    floatingControls
      .find(ColumnControlsButtonWrap)
      .slice(0, 2)
      .forEach(buttonWrap => {
        expect(buttonWrap.hasClass('danger')).toBe(true);
      });

    floatingControls.unmount();
  });

  it('does not render a delete button with whole table selected', () => {
    const { editorView } = editor(
      doc(
        table()(
          tr(thEmpty, thEmpty, thEmpty),
          tr(tdCursor, tdEmpty, tdEmpty),
          tr(tdEmpty, tdEmpty, tdEmpty),
        ),
      ),
    );

    const floatingControls = mount(
      <ColumnControls
        tableRef={document.querySelector('table')!}
        isTableHovered={false}
        editorView={editorView}
      />,
    );

    // select the whole table
    editorView.dispatch(selectTable(editorView.state.tr));

    // reapply state to force re-render
    floatingControls.setState(floatingControls.state());

    expect(floatingControls.find(DeleteColumnButton).length).toBe(0);
    floatingControls.unmount();
  });

  describe('hides inner add buttons when selection spans multiple columns', () => {
    it('hides one when two columns are selected', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(thEmpty, td({})(p()), thEmpty),
            tr(tdCursor, tdEmpty, tdEmpty),
            tr(tdEmpty, tdEmpty, tdEmpty),
          ),
        ),
      );

      const floatingControls = mount(
        <ColumnControls
          tableRef={document.querySelector('table')!}
          isTableHovered={false}
          editorView={editorView}
        />,
      );

      expect(floatingControls.find(InsertColumnButton).length).toBe(3);

      editorView.dispatch(selectColumns([0, 1])(editorView.state.tr));

      // reapply state to force re-render
      floatingControls.setState(floatingControls.state());

      expect(floatingControls.find(InsertColumnButton).length).toBe(2);

      floatingControls.unmount();
    });

    it('hides two when three columns are selected', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(thEmpty, td({})(p()), thEmpty),
            tr(tdCursor, tdEmpty, tdEmpty),
            tr(tdEmpty, tdEmpty, tdEmpty),
          ),
        ),
      );

      const floatingControls = mount(
        <ColumnControls
          tableRef={document.querySelector('table')!}
          isTableHovered={false}
          editorView={editorView}
        />,
      );

      expect(floatingControls.find(InsertColumnButton).length).toBe(3);

      editorView.dispatch(selectColumns([0, 1, 2])(editorView.state.tr));

      // reapply state to force re-render
      floatingControls.setState(floatingControls.state());

      expect(floatingControls.find(InsertColumnButton).length).toBe(1);

      floatingControls.unmount();
    });

    it('only renders a single delete button over multiple column selections', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(thEmpty, td({})(p()), thEmpty),
            tr(tdCursor, tdEmpty, tdEmpty),
            tr(tdEmpty, tdEmpty, tdEmpty),
          ),
        ),
      );

      const floatingControls = mount(
        <ColumnControls
          tableRef={document.querySelector('table')!}
          isTableHovered={false}
          editorView={editorView}
        />,
      );

      editorView.dispatch(selectColumns([0, 1])(editorView.state.tr));

      // reapply state to force re-render
      floatingControls.setState(floatingControls.state());

      expect(floatingControls.find(DeleteColumnButton).length).toBe(1);

      floatingControls.unmount();
    });
  });
});
