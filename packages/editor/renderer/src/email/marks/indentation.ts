import { MarkSerializerOpts } from '../interfaces';
import { createTag, serializeStyle } from '../util';
import { commonStyle } from '..';

export default function code({ mark, text }: MarkSerializerOpts) {
  // level 1 = 30px, level 2 = 60px, ...
  const indent = mark.attrs.level * 30;

  // Tables override font size, weight and other stuff, thus we reset it here with commonStyle
  const nullifyCss = serializeStyle({
    ...commonStyle,
    margin: '0px',
    padding: '0px',
    'border-spacing': '0px',
  });

  // Outlook accepts padding on <td> element
  const css = serializeStyle({
    'padding-left': `${indent}px`,
  });

  const td = createTag('td', { style: css }, text);
  const table = createTag('table', { style: nullifyCss }, td);
  return table;
}
