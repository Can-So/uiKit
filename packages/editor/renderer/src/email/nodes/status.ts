import { createTag, serializeStyle } from '../util';
import { NodeSerializerOpts } from '../interfaces';
import {
  B50,
  B500,
  R50,
  R500,
  Y75,
  N800,
  G50,
  G500,
  P50,
  P500,
  N40,
  N500,
} from '@atlaskit/adf-schema';

type Color = 'neutral' | 'purple' | 'blue' | 'red' | 'yellow' | 'green';

type ColorMapping = {
  [K in Color]: { 'background-color': string; color: string }
};

const colorMapping: ColorMapping = {
  blue: {
    'background-color': B50,
    color: B500,
  },
  red: {
    'background-color': R50,
    color: R500,
  },
  yellow: {
    'background-color': Y75,
    color: N800,
  },
  green: {
    'background-color': G50,
    color: G500,
  },
  purple: {
    'background-color': P50,
    color: P500,
  },
  neutral: {
    'background-color': N40,
    color: N500,
  },
};
export default function status({ attrs, text }: NodeSerializerOpts) {
  const color: Color = attrs.color;
  const colorAttributes = colorMapping[color]
    ? colorMapping[color]
    : colorMapping.neutral;

  const css = serializeStyle({
    'border-radius': '3px',
    '-webkit-border-radius': '3px',
    '-moz-border-radius': '3px',
    'box-sizing': 'border-box',
    display: 'inline-block',
    'font-size': '11px',
    'font-weight': '700',
    'line-height': '1',
    'max-width': '100%',
    'text-transform': 'uppercase',
    'vertical-align': 'baseline',
    padding: '2px 4px 3px 4px',
    ...colorAttributes,
  });
  return createTag('span', { style: css }, text);
}
