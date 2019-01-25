import { Mark, MarkSpec } from 'prosemirror-model';
import { COLOR } from '../groups';
import {
  rgbToHex,
  N90,
  Y500,
  T500,
  R500,
  P500,
  G500,
  N80,
  Y400,
  T300,
  R300,
  P300,
  G300,
} from '../../utils/colors';

export interface TextColorAttributes {
  /**
   * @pattern "^#[0-9a-f]{6}$"
   */
  color: string;
}

/**
 * @name textColor_mark
 */
export interface TextColorDefinition {
  type: 'textColor';
  attrs: TextColorAttributes;
}

export interface TextColorMark extends Mark {
  attrs: TextColorAttributes;
}

/** New borders for colors in the color picker */
export const borderColorPalette = {
  orange: Y500,
  teal: T500,
  red: R500,
  'light-gray': N90,
  purple: P500,
  green: G500,
};

// @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/55979455/Colour+picker+decisions#Colourpickerdecisions-Visualdesigndecisions
export const colorPalette = new Map<string, string>();
[
  // [N800, default],
  [N80, 'Light gray'],
  [P300, 'Purple'],
  [T300, 'Teal'],
  [G300, 'Green'],
  [R300, 'Red'],
  [Y400, 'Orange'],
].forEach(([color, label]) => colorPalette.set(color.toLowerCase(), label));

export const textColor: MarkSpec = {
  attrs: { color: {} },
  inclusive: true,
  group: COLOR,
  parseDOM: [
    {
      style: 'color',
      getAttrs: maybeValue => {
        const value = maybeValue as string;
        let hexColor;
        if (value.match(/^rgb/i)) {
          hexColor = rgbToHex(value);
        } else if (value[0] === '#') {
          hexColor = value.toLowerCase();
        }
        // else handle other colour formats
        return hexColor && colorPalette.has(hexColor)
          ? { color: hexColor }
          : false;
      },
    },
  ],
  toDOM(mark) {
    return [
      'span',
      {
        style: `color: ${mark.attrs.color}`,
      },
    ];
  },
};
