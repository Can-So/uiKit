import { NodeSerializerOpts } from '../interfaces';
import { createTag, serializeStyle } from '../util';
import { codeFontFamily } from '@atlaskit/theme';

const codeTagCss = serializeStyle({
  color: 'rgb(23, 43, 77)',
  display: 'block',
  'font-size': '12px',
  'line-height': '20px',
  'white-space': 'pre',
  'font-family': codeFontFamily(),
});

const preTagCss = serializeStyle({
  background: 'rgb(244, 245, 247)',
  'border-radius': '3px',
  padding: '8px 16px',
  margin: '0px',
});

export default function codeBlock({ attrs, text }: NodeSerializerOpts) {
  const codeTag = createTag('code', { style: codeTagCss }, text);
  return createTag('pre', { style: preTagCss }, codeTag);
}
