// @flow
import React, { Component, type Node } from 'react';
import {
  Draggable,
  Droppable,
  DragDropContext,
  type DragStart,
  type DropResult,
  type DragUpdate,
  type DraggableProvided,
  type DraggableStateSnapshot,
  type DroppableProvided,
} from 'react-beautiful-dnd';
import { getBox } from 'css-box-model';
import { calculateFinalDropPositions } from './Tree-utils';
import type { Props, State, DragState } from './Tree-types';
import { noop } from '../../utils/handy';
import { flattenTree } from '../../utils/tree';
import type { FlattenedItem, ItemId, Path } from '../../types';
import TreeItem from '../TreeItem';
import { type DragActionType } from '../TreeItem/TreeItem-types';
import { getDestinationPath } from '../../utils/flat-tree';

export default class Tree extends Component<Props, State> {
  static defaultProps = {
    tree: { children: [] },
    onExpand: noop,
    onCollapse: noop,
    onDragStart: noop,
    onDragEnd: noop,
    renderItem: noop,
    offsetPerLevel: 35,
    isDragEnabled: false,
  };

  state = {
    flattenedTree: [],
  };

  // Action caused dragging
  dragAction: DragActionType = null;
  // State of dragging. Null when resting
  dragState: ?DragState = null;
  // HTMLElement for each rendered item
  itemsElement: { [ItemId]: ?HTMLElement } = {};
  // HTMLElement of the container element
  containerElement: ?HTMLElement;

  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      ...state,
      flattenedTree: flattenTree(props.tree),
    };
  }

  onDragStart = (result: DragStart) => {
    this.dragState = {
      draggedItemId: result.draggableId,
      source: result.source,
      destination: result.source,
    };
  };

  onDragUpdate = (update: DragUpdate) => {
    if (!this.dragState) {
      return;
    }
    this.dragState = {
      ...this.dragState,
      destination: update.destination,
    };
  };

  onDragEnd = (result: DropResult) => {
    const { onDragEnd, tree } = this.props;
    const { flattenedTree } = this.state;
    const finalDragState: DragState = {
      ...this.dragState,
      source: result.source,
      destination: result.destination,
    };
    const { sourcePosition, destinationPosition } = calculateFinalDropPositions(
      tree,
      flattenedTree,
      finalDragState,
    );
    onDragEnd(sourcePosition, destinationPosition);
    this.dragState = null;
  };

  onDragAction = (actionType: DragActionType) => {
    this.dragAction = actionType;
  };

  onPointerMove = () => {
    if (this.dragState) {
      this.dragState = {
        ...this.dragState,
        horizontalLevel: this.getDroppedLevel(),
      };
    }
  };

  calculateEffectivePath = (
    flatItem: FlattenedItem,
    snapshot: DraggableStateSnapshot,
  ): Path => {
    const { flattenedTree } = this.state;

    if (
      this.dragState &&
      this.dragState.draggedItemId === flatItem.item.id &&
      this.dragState.destination
    ) {
      // We only change the if it's being dragged by keyboard or just dropped
      if (this.dragAction === 'key' || snapshot.isDropAnimating) {
        const { source, destination, horizontalLevel } = this.dragState;
        return getDestinationPath(
          flattenedTree,
          source.index,
          destination.index,
          horizontalLevel,
        );
      }
    }
    return flatItem.path;
  };

  isDraggable = (item: FlattenedItem): boolean =>
    this.props.isDragEnabled && !item.item.isExpanded;

  getDroppedLevel = (): ?number => {
    const { offsetPerLevel } = this.props;

    if (!this.dragState || !this.containerElement) {
      return undefined;
    }

    const { draggedItemId } = this.dragState;
    const containerLeft = getBox(this.containerElement).contentBox.left;
    const itemElement = this.itemsElement[draggedItemId];
    if (itemElement) {
      const currentLeft: number = getBox(itemElement).contentBox.left;
      const relativeLeft: number = Math.max(currentLeft - containerLeft, 0);
      return (
        Math.floor((relativeLeft + offsetPerLevel / 2) / offsetPerLevel) + 1
      );
    }
    return undefined;
  };

  patchDroppableProvided = (provided: DroppableProvided): DroppableProvided => {
    return {
      ...provided,
      innerRef: (el: ?HTMLElement) => {
        this.containerElement = el;
        provided.innerRef(el);
      },
    };
  };

  setItemRef = (itemId: ItemId, el: ?HTMLElement) => {
    this.itemsElement[itemId] = el;
  };

  renderItems = (): Array<Node> => {
    const { renderItem, onExpand, onCollapse, offsetPerLevel } = this.props;
    const { flattenedTree } = this.state;

    return flattenedTree.map((flatItem: FlattenedItem, index: number) => (
      <Draggable
        draggableId={flatItem.item.id}
        index={index}
        key={flatItem.item.id}
        isDragDisabled={!this.isDraggable(flatItem)}
      >
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          const currentPath: Path = this.calculateEffectivePath(
            flatItem,
            snapshot,
          );
          return (
            <TreeItem
              key={flatItem.item.id}
              item={flatItem.item}
              path={currentPath}
              onExpand={onExpand}
              onCollapse={onCollapse}
              onDragAction={this.onDragAction}
              renderItem={renderItem}
              provided={provided}
              snapshot={snapshot}
              itemRef={this.setItemRef}
              offsetPerLevel={offsetPerLevel}
            />
          );
        }}
      </Draggable>
    ));
  };

  render() {
    const renderedItems = this.renderItems();

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}
      >
        <Droppable droppableId="list">
          {(provided: DroppableProvided) => {
            const finalProvided: DroppableProvided = this.patchDroppableProvided(
              provided,
            );
            return (
              <div
                ref={finalProvided.innerRef}
                onTouchMove={this.onPointerMove}
                onMouseMove={this.onPointerMove}
                {...finalProvided.droppableProps}
              >
                {renderedItems}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  }
}
