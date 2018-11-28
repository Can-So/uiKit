// @flow

import type { Node } from 'react';
import type {
  OnDragEndResponder,
  OnDragStartResponder,
  OnDragUpdateResponder,
} from 'react-beautiful-dnd';

export type SortableContextProps = {
  children: Node,
  /** Called when a sortable item drag has started. See react-beautiful-dnd's [onDragStart](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/responders.md#ondragstart-optional) responder. */
  onDragStart?: OnDragStartResponder,
  /** Called when a sortable item has updated position. See react-beautiful-dnd's [onDragUpdate](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/responders.md#ondragupdate-optional) responder. */
  onDragUpdate?: OnDragUpdateResponder,
  /** Called when a sortable item drag has ended. See react-beautiful-dnd's
   * [onDragEnd](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/responders.md#ondragend-required) responder.
   * Note the droppableId fields correspond to the id's of a SortableGroup component.
   */
  onDragEnd: OnDragEndResponder,
};
