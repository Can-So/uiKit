// @flow

import React from 'react';
import { colors } from '@atlaskit/theme';
import ChevD from '@atlaskit/icon/glyph/chevron-down';
import {
  ContainerHeader,
  Item,
  ItemAvatar,
  SectionHeading,
  Switcher,
} from '../../../src';

import { CONTENT_NAV_WIDTH } from '../../../src/common/constants';

const Wrapper = (props: *) => (
  <div
    css={{
      backgroundColor: colors.N20,
      boxSizing: 'border-box',
      padding: '16px',
      width: `${CONTENT_NAV_WIDTH}px`,
    }}
    {...props}
  />
);
const projects = [
  {
    label: 'Recent Projects',
    options: [
      {
        avatar: 'endeavour',
        id: 'endeavour',
        pathname: '/projects/endeavour',
        text: 'Endeavour',
        subText: 'Software project',
      },
      {
        avatar: 'design-system-support',
        id: 'design-system-support',
        pathname: '/projects/design-system-support',
        text: 'Design System Support',
        subText: 'Service desk project',
      },
    ],
  },
  {
    label: 'Other Projects',
    options: [
      {
        avatar: 'design-platform',
        id: 'design-platform',
        pathname: '/projects/design-platform',
        text: 'Design Platform',
        subText: 'Software project',
      },
      {
        avatar: 'donut-world',
        id: 'donut-world',
        pathname: '/projects/donut-world',
        text: 'Donut World',
        subText: 'Software project',
      },
      {
        avatar: 'kitkat',
        id: 'kitkat',
        pathname: '/projects/kitkat',
        text: 'KitKat',
        subText: 'Software project',
      },
      {
        avatar: 'tangerine',
        id: 'tangerine',
        pathname: '/projects/tangerine',
        text: 'Tangerine',
        subText: 'Software project',
      },
    ],
  },
];
const items = new Array(8).fill(1).map((x, i) => ({ text: `Item ${i + 1}` }));

type State = {
  selected: *,
};

export default class extends React.Component<*, State> {
  state = { selected: projects[0].options[0] };
  create = () => ({
    onClick: () => {
      // eslint-disable-next-line
      const boardName = window.prompt(
        'What would you like to call your new board?',
      );
      if (boardName && boardName.length) {
        // eslint-disable-next-line
        console.log(`You created the board "${boardName}"`);
      }
    },
    text: 'Create board',
  });
  target = (selected: *) => {
    const avatar = s => (
      <ItemAvatar
        appearance="square"
        href={null}
        isInteractive={false}
        itemState={s}
        onClick={null}
      />
    );

    return <ContainerHeader before={avatar} after={ChevD} {...selected} />;
  };
  onChange = (selected: *) => {
    this.setState({ selected });
  };
  render() {
    const { selected } = this.state;
    return (
      <Wrapper>
        <Switcher
          create={this.create()}
          onChange={this.onChange}
          options={projects}
          target={this.target(selected)}
          value={selected}
        />
        <SectionHeading>Section heading</SectionHeading>
        {items.map(p => <Item key={p.text} {...p} />)}
      </Wrapper>
    );
  }
}
