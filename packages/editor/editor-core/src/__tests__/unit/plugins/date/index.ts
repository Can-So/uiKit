import { NodeSelection } from 'prosemirror-state';
import {
  createEditor,
  doc,
  p as paragraph,
  date,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';

import {
  setDatePickerAt,
  insertDate,
  openDatePicker,
  closeDatePicker,
} from '../../../../plugins/date/actions';
import { pluginKey } from '../../../../plugins/date/plugin';
import datePlugin from '../../../../plugins/date';

describe('date plugin', () => {
  const editor = (doc: any) => {
    return createEditor({
      doc,
      editorPlugins: [datePlugin],
    });
  };

  const attrs = { timestamp: '1515639075805' };

  describe('actions', () => {
    describe('setDatePickerAt', () => {
      it('should set "showDatePickerAt" prop in plugin state to a DOM node', () => {
        const { editorView: view } = editor(
          doc(paragraph('hello', date(attrs))),
        );

        const showDatePickerAt = view.state.selection.$from.pos;
        const result = setDatePickerAt(showDatePickerAt)(
          view.state,
          view.dispatch,
        );

        const pluginState = pluginKey.getState(view.state);
        expect(pluginState.showDatePickerAt).toEqual(showDatePickerAt);
        expect(result).toBe(true);
      });
    });

    describe('insertDate', () => {
      it('should insert date node to the document', () => {
        const { editorView: view } = editor(doc(paragraph('hello{<>}')));
        insertDate()(view.state, view.dispatch);
        expect(
          view.state.doc.nodeAt(view.state.selection.$from.pos)!.type.name,
        ).toEqual(view.state.schema.nodes.date.name);
        const pluginState = pluginKey.getState(view.state);
        expect(pluginState.showDatePickerAt).toEqual(null);
      });

      it('should insert UTC timestamp', () => {
        const { editorView: view } = editor(doc(paragraph('hello{<>}')));
        insertDate({ year: 2018, month: 5, day: 1 })(view.state, view.dispatch);
        const node = view.state.doc.nodeAt(view.state.selection.$from.pos);
        expect(node!.type.name).toEqual(view.state.schema.nodes.date.name);
        expect(node!.attrs.timestamp).toEqual(Date.UTC(2018, 4, 1).toString());
      });

      it('should keep the same "showDatePickerAt" in collab mode', () => {
        const { editorView: view } = editor(doc(paragraph('world{<>}')));
        insertDate()(view.state, view.dispatch);
        openDatePicker()(view.state, view.dispatch);

        const documentChangeTr = view.state.tr.insertText('hello ', 1);
        // Don't use dispatch to mimic collab provider
        view.updateState(view.state.apply(documentChangeTr));

        const pluginState = pluginKey.getState(view.state);
        expect(pluginState.showDatePickerAt).toEqual(12);
      });
    });

    describe('openDatePicker', () => {
      it('should set "showDatePickerAt" prop in plugin state to a DOM node and select the node', () => {
        const { editorView: view } = editor(
          doc(paragraph('hello{<>}', date(attrs))),
        );
        openDatePicker()(view.state, view.dispatch);
        const pluginState = pluginKey.getState(view.state);
        expect(pluginState.showDatePickerAt).toBeTruthy();
        expect(view.state.selection instanceof NodeSelection).toEqual(true);
      });

      it('should open date picker on enter when date node is selected', () => {
        const { editorView: view, sel } = editor(
          doc(paragraph('hello{<>}', date(attrs))),
        );
        const tr = view.state.tr;
        tr.setSelection(NodeSelection.create(tr.doc, sel));
        view.dispatch(tr);
        sendKeyToPm(view, 'Enter');
        const pluginState = pluginKey.getState(view.state);
        expect(pluginState.showDatePickerAt).toBeTruthy();
        expect(view.state.selection instanceof NodeSelection).toEqual(true);
      });
    });

    describe('closeDatePicker', () => {
      it('should set "showDatePickerAt" prop to falsy and move selection to after the node', () => {
        const { editorView: view } = editor(
          doc(paragraph('hello{<>}', date(attrs))),
        );
        openDatePicker()(view.state, view.dispatch);
        closeDatePicker()(view.state, view.dispatch);
        const newPluginState = pluginKey.getState(view.state);
        expect(newPluginState.showDatePickerAt).toBeFalsy();
        expect(view.state.selection instanceof NodeSelection).toEqual(false);
        expect(view.state.selection.from).toEqual(7);
      });
    });
  });
});
