import * as React from 'react';
import { isTableSelected } from 'prosemirror-utils';
import {
  doc,
  createEditor,
  table,
  tr,
  tdEmpty,
  thEmpty,
  mountWithIntl,
} from '@atlaskit/editor-test-helpers';

import {
  pluginKey,
  getPluginState,
} from '../../../../../plugins/table/pm-plugins/main';
import {
  TablePluginState,
  TableCssClassName as ClassName,
} from '../../../../../plugins/table/types';
import CornerControls from '../../../../../plugins/table/ui/TableFloatingControls/CornerControls';
import { tablesPlugin } from '../../../../../plugins';

const InsertColumnButton = `.${ClassName.CONTROLS_INSERT_COLUMN}`;
const InsertRowButton = `.${ClassName.CONTROLS_INSERT_ROW}`;
const CornerButton = `.${ClassName.CONTROLS_CORNER_BUTTON}`;

describe('CornerControls', () => {
  const editor = (doc: any) =>
    createEditor<TablePluginState>({
      doc,
      editorPlugins: [tablesPlugin()],
      pluginKey,
    });

  describe('when table has number column enabled', () => {
    it('should render insert column and insert row buttons', () => {
      const { editorView } = editor(
        doc(
          table()(tr(tdEmpty, tdEmpty, tdEmpty), tr(tdEmpty, tdEmpty, tdEmpty)),
        ),
      );

      const controls = mountWithIntl(
        <CornerControls
          tableRef={document.querySelector('table')!}
          editorView={editorView}
          isNumberColumnEnabled={true}
        />,
      );

      expect(controls.find(InsertColumnButton)).toHaveLength(1);
      expect(controls.find(InsertRowButton)).toHaveLength(1);
      controls.unmount();
      editorView.destroy();
    });
  });

  describe('when table has header column enabled', () => {
    it('should not render insert column button', () => {
      const { editorView } = editor(
        doc(
          table()(tr(thEmpty, tdEmpty, tdEmpty), tr(thEmpty, tdEmpty, tdEmpty)),
        ),
      );

      const controls = mountWithIntl(
        <CornerControls
          tableRef={document.querySelector('table')!}
          editorView={editorView}
          isHeaderColumnEnabled={true}
        />,
      );

      expect(controls.find(InsertColumnButton)).toHaveLength(0);
      expect(controls.find(InsertRowButton)).toHaveLength(1);
      controls.unmount();
      editorView.destroy();
    });
  });

  describe('when table has header row enabled', () => {
    it('should not render insert row button', () => {
      const { editorView } = editor(
        doc(
          table()(tr(thEmpty, thEmpty, thEmpty), tr(tdEmpty, tdEmpty, tdEmpty)),
        ),
      );

      const controls = mountWithIntl(
        <CornerControls
          tableRef={document.querySelector('table')!}
          editorView={editorView}
          isHeaderRowEnabled={true}
        />,
      );

      expect(controls.find(InsertColumnButton)).toHaveLength(1);
      expect(controls.find(InsertRowButton)).toHaveLength(0);
      controls.unmount();
      editorView.destroy();
    });
  });

  describe('when button is clicked', () => {
    it('should select the table', () => {
      const { editorView } = editor(
        doc(table()(tr(thEmpty, thEmpty, thEmpty))),
      );

      const controls = mountWithIntl(
        <CornerControls
          tableRef={document.querySelector('table')!}
          editorView={editorView}
        />,
      );

      controls.find(CornerButton).simulate('click');

      expect(isTableSelected(editorView.state.selection)).toBe(true);
      controls.unmount();
      editorView.destroy();
    });
  });

  describe('when button is hovered', () => {
    it('should highlight the table with hover decoration', () => {
      const { editorView } = editor(
        doc(
          table()(tr(thEmpty, thEmpty, thEmpty), tr(thEmpty, thEmpty, thEmpty)),
        ),
      );

      const controls = mountWithIntl(
        <CornerControls
          tableRef={document.querySelector('table')!}
          editorView={editorView}
        />,
      );

      controls.find(CornerButton).simulate('mouseover');

      const { hoveredColumns, hoveredRows } = getPluginState(editorView.state);
      expect(hoveredColumns).toEqual([0, 1, 2]);
      expect(hoveredRows).toEqual([0, 1]);
      controls.unmount();
      editorView.destroy();
    });
  });
});
