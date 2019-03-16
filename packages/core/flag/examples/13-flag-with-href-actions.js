// @flow

import React, { type Node, Fragment } from 'react';
import Error from '@findable/icon/glyph/error';
import Info from '@findable/icon/glyph/info';
import Tick from '@findable/icon/glyph/check-circle';
import Warning from '@findable/icon/glyph/warning';
import { colors } from '@findable/theme';
import Flag, { type AppearanceTypes } from '../src';

type FlagType = {
  appearance: AppearanceTypes,
  description: string,
  title: string,
  icon: Node,
};

const FlagActions = [
  {
    content: 'with onClick',
    onClick: () => {
      console.log('flag action clicked');
    },
  },
  {
    content: 'with href',
    href: 'https://atlaskit.atlassian.com/',
    target: '_blank',
  },
];

const flagTypes: Array<FlagType> = [
  {
    appearance: 'error',
    description: 'You need to take action, something has gone terribly wrong!',
    title: 'error flag',
    icon: <Error label="Error icon" secondaryColor={colors.R300} />,
  },
  {
    appearance: 'info',
    description:
      "This alert needs your attention, but it's not super important.",
    title: 'info flag',
    icon: <Info label="Info icon" secondaryColor={colors.N500} />,
  },
  {
    appearance: 'success',
    description: 'Nothing to worry about, everything is going great!',
    title: 'success flag',
    icon: <Tick label="Success" secondaryColor={colors.G400} />,
  },
  {
    appearance: 'warning',
    description: 'Pay attention to me, things are not going according to plan.',
    title: 'warning flag',
    icon: <Warning label="Warning icon" secondaryColor={colors.Y300} />,
  },
  {
    appearance: 'normal',
    description: 'There is new update available',
    title: 'normal flag',
    icon: <Tick label="Success" secondaryColor={colors.N0} />,
  },
];

export default () => (
  <Fragment>
    {flagTypes.map((flag: FlagType) => (
      <div key={flag.appearance} style={{ marginBottom: '10px' }}>
        <Flag
          appearance={flag.appearance}
          actions={FlagActions}
          description={flag.description}
          icon={flag.icon}
          id="1"
          isDismissAllowed
          key="1"
          title={flag.title}
        />
      </div>
    ))}
  </Fragment>
);
