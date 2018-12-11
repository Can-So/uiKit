import { Plugin, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

type PosAtDOM = (node: Node) => number | null;

export default new Plugin({
  props: {
    handleClick(view: EditorView, clickPos, event) {
      // Don't apply in Edge as per ED-4546
      if (navigator && /Edge\/\d/.test(navigator.userAgent)) {
        return false;
      }

      const { code } = view.state.schema.marks;
      const $click = view.state.doc.resolve(clickPos);

      const clickWasAtEdgeOfATextNode =
        ($click.nodeBefore ? $click.nodeBefore.isInline : $click.nodeAfter) &&
        ($click.nodeAfter ? $click.nodeAfter.isInline : $click.nodeBefore) &&
        $click.textOffset === 0;

      const clickWasNearACodeMark =
        code &&
        (($click.nodeBefore && code.isInSet($click.nodeBefore.marks)) ||
          ($click.nodeAfter && code.isInSet($click.nodeAfter.marks)));

      // Find the starting position of the clicked dom-element
      // TODO: Remove calls to private API
      const clickedDOMElementPosition =
        event.target &&
        event.target instanceof Node &&
        (view as EditorView & { posAtDOM: PosAtDOM }).posAtDOM(event.target);

      if (
        clickWasAtEdgeOfATextNode &&
        clickWasNearACodeMark &&
        clickedDOMElementPosition
      ) {
        const clickWasInsideNodeDOM =
          (event.target as Node).parentNode ===
            view.domAtPos(clickedDOMElementPosition).node &&
          code.isInSet(
            view.state.doc.resolve(clickedDOMElementPosition).nodeAfter!.marks,
          );

        const nodeNextToClick =
          $click.nodeBefore && code.isInSet($click.nodeBefore.marks)
            ? $click.nodeAfter
            : $click.nodeBefore;

        // Need to set the selection here to allow clicking between [code('text'),{<>},emoji()]
        const tr = view.state.tr.setSelection(TextSelection.near($click));
        if (clickWasInsideNodeDOM) {
          tr.setStoredMarks([code.create()]);
        } else {
          tr.setStoredMarks(nodeNextToClick ? nodeNextToClick.marks : []);
        }

        view.dispatch(tr);
        return true;
      }
      return false;
    },
  },
});
