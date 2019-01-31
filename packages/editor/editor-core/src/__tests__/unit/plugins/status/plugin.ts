import {
  EditorState,
  Plugin,
  Selection,
  TextSelection,
  NodeSelection,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  createEditorFactory,
  doc,
  p,
  StatusLocalIdRegex,
} from '@atlaskit/editor-test-helpers';
import { updateStatus } from '../../../../plugins/status/actions';
import createPlugin, {
  pluginKey,
  SelectionChange,
} from '../../../../plugins/status/plugin';

describe('status plugin: plugin', () => {
  const createEditor = createEditorFactory();

  const createSelection = (from: number, to?: number): Selection => {
    const actualTo = to === undefined ? from : to;
    return {
      from,
      to: actualTo,
      eq: selection => selection.from === from && selection.to === actualTo,
    } as any;
  };

  const sel1 = createSelection(1);
  const sel2 = createSelection(2);

  const editorFactory = (doc: any) =>
    createEditor({
      editorProps: {
        allowStatus: true,
      },
      doc,
    });

  describe('SelectionChangeHandler', () => {
    let change: SelectionChange;
    beforeEach(() => {
      change = new SelectionChange();
    });

    it('notify should return when no subscribed', () => {
      change.notifyNewSelection(createSelection(1), createSelection(2));
    });

    it('notify should notify single subscriber', () => {
      const sub1 = jest.fn();
      change.subscribe(sub1);
      change.notifyNewSelection(sel1, sel2);
      expect(sub1).toBeCalledWith(sel1, sel2);
    });

    it('notify should notify two subscribers', () => {
      const sub1 = jest.fn();
      const sub2 = jest.fn();
      change.subscribe(sub1);
      change.subscribe(sub2);
      change.notifyNewSelection(sel1, sel2);
      expect(sub1).toBeCalledWith(sel1, sel2);
      expect(sub2).toBeCalledWith(sel1, sel2);
    });

    it('notify should not notify unsubscribers', () => {
      const sub1 = jest.fn();
      const sub2 = jest.fn();
      change.subscribe(sub1);
      change.subscribe(sub2);
      change.unsubscribe(sub1);
      change.notifyNewSelection(sel1, sel2);
      expect(sub1).toHaveBeenCalledTimes(0);
      expect(sub2).toBeCalledWith(sel1, sel2);
    });
  });

  describe('Editor updates', () => {
    let update: (view: EditorView, prevState: EditorState) => void;
    let editorView: EditorView;
    let previousEditorState: EditorState;
    let notifyNewSelectionSpy: jest.SpyInstance<any>;
    let pluginKeyGetStateSpy: jest.SpyInstance<any>;

    beforeEach(() => {
      const selectionChanges = new SelectionChange();
      notifyNewSelectionSpy = jest.spyOn(
        selectionChanges,
        'notifyNewSelection',
      );
      pluginKeyGetStateSpy = jest.spyOn(pluginKey, 'getState');
      pluginKeyGetStateSpy.mockImplementation(() => ({
        selectionChanges,
      }));
      const plugin = createPlugin({} as any) as Plugin;
      const spec = plugin.spec;
      update = spec.view().update;

      // Just enough for tests
      editorView = {
        state: {
          selection: sel1,
        },
      } as EditorView;
      previousEditorState = {
        selection: sel2,
      } as EditorState;
    });

    afterEach(() => {
      pluginKeyGetStateSpy.mockRestore();
    });

    it('editor update selection changed', () => {
      update(editorView, previousEditorState);
      expect(notifyNewSelectionSpy).toBeCalledWith(sel1, sel2);
    });

    it('editor update selection changed', () => {
      previousEditorState = {
        selection: sel1,
      } as EditorState;
      update(editorView, previousEditorState);
      expect(notifyNewSelectionSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('Edge cases', () => {
    it('StatusPicker should be dismissed if cursor is outside the Status node selection', () => {
      const { editorView } = editorFactory(doc(p('Status: {<>}')));
      // insert new Status at {<>}
      updateStatus({ text: 'Yay', color: 'blue' })(editorView);

      let statusState = pluginKey.getState(editorView.state);

      expect(editorView.state.tr.selection).toBeInstanceOf(NodeSelection);
      expect(editorView.state.tr.selection.to).toBe(
        editorView.state.tr.selection.from + 1,
      );
      expect(statusState).toMatchObject({
        isNew: true,
        showStatusPickerAt: editorView.state.tr.selection.from, // status node start position
        selectedStatus: expect.objectContaining({
          text: 'Yay',
          color: 'blue',
          localId: expect.stringMatching(StatusLocalIdRegex),
        }),
      });

      const statusFromPosition = editorView.state.tr.selection.from;

      // simulate the scenario where user uses left arrow to move cursor outside the status node
      editorView.dispatch(
        editorView.state.tr.setSelection(
          TextSelection.create(editorView.state.doc, statusFromPosition),
        ),
      );

      statusState = pluginKey.getState(editorView.state);

      // expects the showStatusPickerAt to be reset to null
      expect(editorView.state.tr.selection).toBeInstanceOf(TextSelection);
      expect(editorView.state.tr.selection.to).toBe(
        editorView.state.tr.selection.from,
      );
      expect(statusState).toMatchObject({
        showStatusPickerAt: null,
        selectedStatus: null,
      });
    });
  });
});
