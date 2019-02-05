import { colors, gridSize, borderRadius } from '@atlaskit/theme';

import { NodeSerializerOpts } from '../interfaces';
import { createTag, serializeStyle } from '../util';

type PanelType = 'info' | 'note' | 'tip' | 'success' | 'warning' | 'error';

type PanelConfig = {
  [K in PanelType]: { background: string; iconColor: string }
};

const config: PanelConfig = {
  info: {
    background: colors.B50,
    iconColor: colors.B400,
  },
  note: {
    background: colors.P50,
    iconColor: colors.P400,
  },
  tip: {
    background: colors.G50,
    iconColor: colors.G400,
  },
  success: {
    background: colors.G50,
    iconColor: colors.G400,
  },
  warning: {
    background: colors.Y50,
    iconColor: colors.Y400,
  },
  error: {
    background: colors.R50,
    iconColor: colors.R400,
  },
};

export default function panel({ attrs, text }: NodeSerializerOpts) {
  const type: PanelType = attrs.panelType;
  const css = serializeStyle({
    'border-radius': `${borderRadius()}px`,
    margin: `${gridSize() / 2}px 0`,
    padding: `${gridSize()}px`,
    background: config[type] && config[type].background,
  });

  return createTag('div', { style: css }, text);
}
