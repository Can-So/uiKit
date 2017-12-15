// @flow

import { shallow } from 'enzyme';
import React from 'react';

import { colors } from '@atlaskit/theme';
import { GridColumn } from '@atlaskit/page';
import ProgressTrackerStage from '../index';
import ProgressTrackerLink from '../../ProgressTrackerLink';
import {
  ProgressTrackerStageContainer,
  ProgressTrackerStageMarker,
  ProgressTrackerStageBar,
  ProgressTrackerStageTitle,
} from '../styled';
import type { LinkComponentProps } from '../../types';

describe('ak-progress-tracker/progress-tracker-stage', () => {
  it('should render the component', () => {
    const item = {
      id: 'visited-1',
      label: 'Visited Step',
      percentageComplete: 100,
      status: 'visited',
      href: '#',
    };
    const render = {
      link: (props: LinkComponentProps) => <ProgressTrackerLink {...props} />,
    };

    const wrapper = shallow(
      <ProgressTrackerStage item={item} render={render} />,
    );
    expect(wrapper.length).toBeGreaterThan(0);
    const gridColumn = wrapper.find(GridColumn);
    expect(gridColumn).toHaveLength(1);
    expect(gridColumn.props().medium).toBe(2);
    expect(wrapper.find(ProgressTrackerStageContainer)).toHaveLength(1);
    expect(wrapper.find(ProgressTrackerStageMarker)).toHaveLength(1);
    expect(wrapper.find(ProgressTrackerStageBar)).toHaveLength(1);
    expect(wrapper.find(ProgressTrackerStageTitle)).toHaveLength(1);
    expect(wrapper.find(ProgressTrackerLink)).toHaveLength(1);
  });

  //Appearance
  it('should render unvisited stage with correct props', () => {
    const percentageComplete = 0;
    const regular = '400';
    const item = {
      id: 'unvisited-1',
      label: 'Unvisited Step',
      percentageComplete,
      status: 'unvisited',
      href: '#',
    };
    const render = {
      link: (props: LinkComponentProps) => <ProgressTrackerLink {...props} />,
    };

    const wrapper = shallow(
      <ProgressTrackerStage item={item} render={render} />,
    );
    expect(wrapper.find(ProgressTrackerStageMarker).props()).toMatchObject({
      color: colors.N70,
    });
    expect(wrapper.find(ProgressTrackerStageBar).props()).toMatchObject({
      percentageComplete,
    });
    expect(wrapper.find(ProgressTrackerStageTitle).props()).toMatchObject({
      color: colors.N300,
      fontweight: regular,
    });
  });

  it('should render current stage with correct props', () => {
    const percentageComplete = 0;
    const semibold = '600';
    const item = {
      id: 'current-1',
      label: 'Current Step',
      percentageComplete,
      status: 'current',
      href: '#',
    };
    const render = {
      link: (props: LinkComponentProps) => <ProgressTrackerLink {...props} />,
    };

    const wrapper = shallow(
      <ProgressTrackerStage item={item} render={render} />,
    );
    expect(wrapper.find(ProgressTrackerStageMarker).props()).toMatchObject({
      color: colors.B300,
    });
    expect(wrapper.find(ProgressTrackerStageBar).props()).toMatchObject({
      percentageComplete,
    });
    expect(wrapper.find(ProgressTrackerStageTitle).props()).toMatchObject({
      color: colors.B300,
      fontweight: semibold,
    });
  });

  it('should render disabled stage with correct props', () => {
    const percentageComplete = 0;
    const semibold = '600';
    const item = {
      id: 'disabled-1',
      label: 'Disabled Step',
      percentageComplete,
      status: 'disabled',
      href: '#',
    };
    const render = {
      link: (props: LinkComponentProps) => <ProgressTrackerLink {...props} />,
    };

    const wrapper = shallow(
      <ProgressTrackerStage item={item} render={render} />,
    );
    expect(wrapper.find(ProgressTrackerStageMarker).props()).toMatchObject({
      color: colors.B300,
    });
    expect(wrapper.find(ProgressTrackerStageBar).props()).toMatchObject({
      percentageComplete,
    });
    expect(wrapper.find(ProgressTrackerStageTitle).props()).toMatchObject({
      color: colors.N70,
      fontweight: semibold,
    });
  });

  it('should render visited stage with default link and correct props', () => {
    const percentageComplete = 100;
    const semibold = '600';
    const item = {
      id: 'visited-1',
      label: 'Visited Step',
      percentageComplete,
      status: 'visited',
      href: '#',
    };
    const render = {
      link: (props: LinkComponentProps) => <ProgressTrackerLink {...props} />,
    };

    const wrapper = shallow(
      <ProgressTrackerStage item={item} render={render} />,
    );
    expect(wrapper.find(ProgressTrackerStageMarker).props()).toMatchObject({
      color: colors.B300,
    });
    expect(wrapper.find(ProgressTrackerStageBar).props()).toMatchObject({
      percentageComplete,
    });
    expect(wrapper.find(ProgressTrackerStageTitle).props()).toMatchObject({
      color: colors.N800,
      fontweight: semibold,
    });
  });

  it('should render visited stage without link if noLink is true', () => {
    const percentageComplete = 100;
    const item = {
      id: 'visited-1',
      label: 'Visited Step',
      percentageComplete,
      status: 'visited',
      noLink: true,
    };
    const render = {
      link: (props: LinkComponentProps) => <ProgressTrackerLink {...props} />,
    };

    const wrapper = shallow(
      <ProgressTrackerStage item={item} render={render} />,
    );
    expect(wrapper.find(ProgressTrackerLink)).toHaveLength(0);
  });
});
