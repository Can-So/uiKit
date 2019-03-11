import { createTag, serializeStyle } from '../util';
import { NodeSerializerOpts } from '../interfaces';
import { colors } from '@atlaskit/theme';

type Color = 'neutral' | 'purple' | 'blue' | 'red' | 'yellow' | 'green';

type ColorMapping = {
  [K in Color]: { 'background-color': string; color: string }
};

const colorMapping: ColorMapping = {
  blue: {
    'background-color': colors.B50,
    color: colors.B500,
  },
  red: {
    'background-color': colors.R50,
    color: colors.R500,
  },
  yellow: {
    'background-color': colors.Y75,
    color: colors.N800,
  },
  green: {
    'background-color': colors.G50,
    color: colors.G500,
  },
  purple: {
    'background-color': colors.P50,
    color: colors.P500,
  },
  neutral: {
    'background-color': colors.N40,
    color: colors.N500,
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
