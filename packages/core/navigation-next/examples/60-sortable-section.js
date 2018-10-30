// @flow

import React, { Component, Fragment } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { colors } from '@atlaskit/theme';

import { SortableItem, SortableGroup, SortableSection } from '../src';
import { CONTENT_NAV_WIDTH } from '../src/common/constants';

const SectionWrapper = (props: *) => (
  <div
    css={{
      backgroundColor: colors.N20,
      height: '100%',
      overflow: 'hidden',
      paddingBottom: 8,
      position: 'relative',
      width: `${CONTENT_NAV_WIDTH}px`,
    }}
    {...props}
  />
);

const DEFAULT_ITEMS = [
  {
    id: 'dashboards',
    text: 'Dashboards',
    onClick: () => console.log('dashboards'),
  },
  {
    id: 'projects',
    text: 'projects',
    onClick: () => console.log('projects'),
  },
  {
    id: 'settings',
    text: 'settings',
    onClick: () => console.log('settings'),
  },
  {
    id: 'backlog',
    text: 'backlog',
    onClick: () => console.log('backlog'),
  },
  {
    id: 'active-sprint',
    text: 'active-sprint',
    onClick: () => console.log('active-sprint'),
  },
  {
    id: 'issues-and-filters',
    text: 'issues-and-filters',
    onClick: () => console.log('issues-and-filters'),
  },
  {
    id: 'viewed-recently',
    text: 'viewed-recently',
    onClick: () => console.log('viewed-recently'),
  },
  {
    component: ({ children, className, draggableProps, innerRef }: *) => (
      <div className={className} to="/" {...draggableProps} ref={innerRef}>
        {children}
      </div>
    ),
    subText: "Pretend I'm a react-router <Link>",
    text: 'Custom component',
    id: 'custom-component',
  },
];

/** Reorders an item in items from startIndex to endIndex.
 *  If endIndex is null, the item will be
 *  removed (used when moving an item to a different group). */
const reorderItems = <T>(
  items: Array<T>,
  startIndex: number,
  endIndex: number | null,
): Array<T> => {
  const result = Array.from(items);
  const [removed] = result.splice(startIndex, 1);
  if (typeof endIndex === 'number') {
    result.splice(endIndex, 0, removed);
  }

  return result;
};

const addItem = <T>(items: Array<T>, item: T, index: number): Array<T> => {
  const result = Array.from(items);
  result.splice(index, 0, item);

  return result;
};

const updateGroups = (
  groups: $PropertyType<State, 'groups'>,
  dropResult: DropResult,
): ?$PropertyType<State, 'groups'> => {
  const { destination, source } = dropResult;
  if (
    // Dropped outside a droppable area
    !destination ||
    // Dropped in original position
    (source.droppableId === destination.droppableId &&
      source.index === destination.index)
  ) {
    return null;
  }

  const sourceGroupId = source.droppableId;
  const destinationGroupId = destination.droppableId;

  if (sourceGroupId === destinationGroupId) {
    // Dropped within group

    const modifiedGroup = reorderItems(
      groups[sourceGroupId],
      source.index,
      destination.index,
    );

    return {
      ...groups,
      [sourceGroupId]: modifiedGroup,
    };
  }

  // Dropped in a different group
  const reorderedItem = groups[sourceGroupId][source.index];
  const modifiedSourceGroup = reorderItems(
    groups[sourceGroupId],
    source.index,
    null,
  );
  const modifiedDestinationGroup = addItem(
    groups[destinationGroupId],
    reorderedItem,
    destination.index,
  );

  return {
    ...groups,
    [sourceGroupId]: modifiedSourceGroup,
    [destinationGroupId]: modifiedDestinationGroup,
  };
};

type State = {
  groups: {
    [groupId: string]: Array<any>,
  },
  showContainer: boolean,
};

export default class Example extends Component<{}, State> {
  state = {
    groups: {
      first: (DEFAULT_ITEMS.slice(0, 4): typeof DEFAULT_ITEMS),
      second: (DEFAULT_ITEMS.slice(4, 8): typeof DEFAULT_ITEMS),
    },
    showContainer: true,
  };
  onDragEnd = (dropResult: DropResult) => {
    const updatedGroups = updateGroups(this.state.groups, dropResult);
    if (updatedGroups) {
      this.setState({
        groups: updatedGroups,
      });
    }
  };
  render() {
    const { groups } = this.state;
    return (
      <SectionWrapper>
        {/* <ViewRenderer items={this.props.items} /> */}
        <SortableSection onDragEnd={this.onDragEnd}>
          {({ css }) => (
            <Fragment>
              <SortableGroup id="first" heading="First" innerStyle={css}>
                {groups.first.map((itemProps, i) => (
                  <SortableItem key={itemProps.id} index={i} {...itemProps} />
                ))}
              </SortableGroup>
              <SortableGroup id="second" heading="Second" innerStyle={css}>
                {groups.second.map((itemProps, i) => (
                  <SortableItem key={itemProps.id} index={i} {...itemProps} />
                ))}
              </SortableGroup>
            </Fragment>
          )}
        </SortableSection>
      </SectionWrapper>
    );
  }
}
