import { Mark, MarkType } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { DEFAULT_COLOR } from '../pm-plugins/main';

export const getActiveColor = (state): string | undefined => {
  const { $from, $to, $cursor } = state.selection as TextSelection;
  const { textColor } = state.schema.marks as { textColor: MarkType };

  // Filter out other marks
  let marks: Array<Mark | undefined> = [];
  if ($cursor) {
    marks.push(
      textColor.isInSet(state.storedMarks || $cursor.marks()) || undefined,
    );
  } else {
    state.doc.nodesBetween($from.pos, $to.pos, currentNode => {
      const mark = textColor.isInSet(currentNode.marks) || undefined;
      marks.push(mark);
      return !mark;
    });
  }

  // Merge consecutive same color marks
  let prevMark: Mark | undefined;
  marks = marks.filter(mark => {
    if (mark && prevMark && mark.attrs.color === prevMark.attrs.color) {
      return false;
    }
    prevMark = mark;
    return true;
  });

  const marksWithColor = marks.filter(mark => !!mark) as Array<Mark>;
  // When mutiple color is selected revert back to default color
  if (
    marksWithColor.length > 1 ||
    (marksWithColor.length === 1 && marks.length > 2)
  ) {
    return;
  }
  return marksWithColor.length
    ? marksWithColor[0].attrs.color
    : DEFAULT_COLOR.color;
};
