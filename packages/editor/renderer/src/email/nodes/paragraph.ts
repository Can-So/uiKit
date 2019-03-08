import { createTag, serializeStyle, applyMarks } from '../util';
import { NodeSerializerOpts } from '../interfaces';

const css = serializeStyle({
  'white-space': 'pre-wrap',
  'word-wrap': 'break-word',
});

export default function paragraph({ text, marks }: NodeSerializerOpts) {
  const paragraph = createTag('p', { style: css }, text);
  return applyMarks(marks, paragraph);
}
