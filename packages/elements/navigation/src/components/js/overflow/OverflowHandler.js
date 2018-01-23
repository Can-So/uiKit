// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import PropTypes from 'prop-types';
import OverflowHeightReportEnabler from './OverflowHeightReportEnabler';
import OverflowDropdown from './OverflowDropdown';
import HeightDetector from './HeightDetector';
import {
  overflowManagerNamespace,
  dropdownHeight,
  reservedGapHeight,
  isArrayFilled,
} from './shared-variables';

type Props = {
  groupCount: number,
  children: Node,
};

type State = {
  breakAt: { group: number, item: number },
};

export default class OverflowManager extends Component<Props, State> {
  static childContextTypes = {
    [overflowManagerNamespace]: PropTypes.object,
  };

  getChildContext() {
    return {
      [overflowManagerNamespace]: {
        reportGroupHeightToManager: this.handleItemGroupHeightReport,
        isGroupVisibleInNav: this.isGroupVisibleInNav,
        isGroupItemVisibleInNav: this.isGroupItemVisibleInNav,
        isGroupVisibleInDropdown: this.isGroupVisibleInDropdown,
        isGroupItemVisibleInDropdown: this.isGroupItemVisibleInDropdown,
      },
    };
  }

  constructor(props: Props) {
    super(props);

    this.groupHeights = new Array(this.props.groupCount);
  }

  state = {
    // eslint-disable-line react/sort-comp
    breakAt: { group: 999, item: 999 },
  };

  availableHeight = 0;
  groupHeights: Array<{ nonItemHeight: number, itemHeights: Array<any> }> = [];

  isGroupVisibleInNav = (groupIndex: number) =>
    groupIndex < this.state.breakAt.group ||
    (groupIndex === this.state.breakAt.group && this.state.breakAt.item !== 0);
  isGroupItemVisibleInNav = (groupIndex: number, itemIndex: number) =>
    groupIndex < this.state.breakAt.group ||
    (groupIndex === this.state.breakAt.group &&
      itemIndex < this.state.breakAt.item);
  isGroupVisibleInDropdown = (groupIndex: number) =>
    groupIndex >= this.state.breakAt.group;
  isGroupItemVisibleInDropdown = (groupIndex: number, itemIndex: number) =>
    groupIndex > this.state.breakAt.group ||
    (groupIndex === this.state.breakAt.group &&
      itemIndex >= this.state.breakAt.item);

  //  works out the first group+item that CANNOT fit in the nav
  calculateBreakItem = () => {
    if (!this.hasAllGroupHeights()) {
      return;
    }

    const newBreak = { group: 999, item: 999 };
    const { availableHeight, groupHeights } = this;
    let cumulativeHeight = dropdownHeight + reservedGapHeight;
    // eslint-disable-line no-restricted-syntax,no-labels

    groupLoop: for (let g = 0; g < this.props.groupCount; g++) {
      const group = groupHeights[g];

      cumulativeHeight += group.nonItemHeight;
      if (cumulativeHeight >= availableHeight) {
        newBreak.group = g;
        newBreak.item = 0;
        break;
      }
      const itemCount = group.itemHeights.length;
      for (let i = 0; i < itemCount; i++) {
        cumulativeHeight += group.itemHeights[i];
        if (cumulativeHeight >= availableHeight) {
          newBreak.group = g;
          newBreak.item = i;
          break groupLoop; // eslint-disable-line no-restricted-syntax,no-labels
        }
      }
    }
    if (
      this.state.breakAt.group !== newBreak.group ||
      this.state.breakAt.item !== newBreak.item
    ) {
      this.setState({ breakAt: newBreak });
    }
  };

  hasAllGroupHeights = () => isArrayFilled(this.groupHeights);

  /* eslint-disable react/no-unused-prop-types */
  handleItemGroupHeightReport = ({
    groupIndex,
    ...groupHeightInfo
  }: {
    groupIndex: number,
    nonItemHeight: number,
    itemHeights: Array<any>,
  }) => {
    this.groupHeights[groupIndex] = groupHeightInfo;
    this.calculateBreakItem();
  };
  /* eslint-enable react/no-unused-prop-types */

  handleAvailableHeightChange = (availableHeight: number) => {
    if (availableHeight === this.availableHeight) {
      return;
    }
    this.availableHeight = availableHeight;
    this.calculateBreakItem();
  };

  render() {
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <HeightDetector onHeightChange={this.handleAvailableHeightChange}>
          <OverflowHeightReportEnabler>
            {this.props.children}
          </OverflowHeightReportEnabler>
          {this.state.breakAt.group <= this.props.groupCount ? (
            <OverflowDropdown>{this.props.children}</OverflowDropdown>
          ) : null}
        </HeightDetector>
      </div>
    );
  }
}
