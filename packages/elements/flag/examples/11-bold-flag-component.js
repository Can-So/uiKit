// @flow

import React from 'react';
import Error from '@atlaskit/icon/glyph/error';
import Info from '@atlaskit/icon/glyph/info';
import Tick from '@atlaskit/icon/glyph/check-circle';
import Warning from '@atlaskit/icon/glyph/warning';
import { colors, gridSize } from '@atlaskit/theme';
import Flag from '../src';

const actions = [
  { content: 'Understood', onClick: () => {} },
  { content: 'No Way!', onClick: () => {} },
];
const appearances = {
  error: {
    description: 'You need to take action, something has gone terribly wrong!',
    title: 'Uh oh!',
  },
  info: {
    description:
      "This alert needs your attention, but it's not super important.",
    title: 'Hey, did you know...',
  },
  success: {
    description: 'Nothing to worry about, everything is going great!',
    title: 'Good news, everyone',
  },
  warning: {
    description: 'Pay attention to me, things are not going according to plan.',
    title: 'Heads up!',
  },
};

const iconMap = key => {
  const icons = {
    info: <Info label="Info icon" secondaryColor={colors.N500} />,
    success: <Tick label="Success" secondaryColor={colors.G400} />,
    warning: <Warning label="Warning icon" secondaryColor={colors.Y300} />,
    error: <Error label="Error icon" secondaryColor={colors.R300} />,
  };

  return key ? icons[key] : icons;
};

const getIcon = (key: string) => {
  return iconMap(key);
};

export default () => (
  <div>
    {Object.keys(appearances).map((type, idx) => (
      <div key={type} style={idx ? { marginTop: gridSize() } : null}>
        <Flag
          actions={actions}
          appearance={type}
          description={appearances[type].description}
          icon={getIcon(type)}
          id={type}
          isDismissAllowed
          key={type}
          title={appearances[type].title}
        />
      </div>
    ))}
  </div>
);
