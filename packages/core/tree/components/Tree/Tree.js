import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { getBox } from 'css-box-model';
import { calculateFinalDropPositions } from './Tree-utils';
import { noop } from '../../utils/handy';
import { flattenTree, mutateTree } from '../../utils/tree';
import TreeItem from '../TreeItem';
import { getDestinationPath, getItemById, getIndexById } from '../../utils/flat-tree';
import DelayedFunction from '../../utils/delayed-function';

var Tree =
/*#__PURE__*/
function (_Component) {
  _inherits(Tree, _Component);

  function Tree() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tree);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tree)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      flattenedTree: [],
      draggedItemId: null
    });

    _defineProperty(_assertThisInitialized(_this), "dragState", null);

    _defineProperty(_assertThisInitialized(_this), "itemsElement", {});

    _defineProperty(_assertThisInitialized(_this), "containerElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "expandTimer", new DelayedFunction(500));

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (result) {
      var onDragStart = _this.props.onDragStart;
      _this.dragState = {
        source: result.source,
        destination: result.source,
        mode: result.mode
      };

      _this.setState({
        draggedItemId: result.draggableId
      });

      if (onDragStart) {
        onDragStart(result.draggableId);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDragUpdate", function (update) {
      var onExpand = _this.props.onExpand;
      var flattenedTree = _this.state.flattenedTree;

      if (!_this.dragState) {
        return;
      }

      _this.expandTimer.stop();

      if (update.combine) {
        var draggableId = update.combine.draggableId;
        var item = getItemById(flattenedTree, draggableId);

        if (item && _this.isExpandable(item)) {
          _this.expandTimer.start(function () {
            return onExpand(draggableId, item.path);
          });
        }
      }

      _this.dragState = _objectSpread({}, _this.dragState, {
        destination: update.destination,
        combine: update.combine
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDropAnimating", function () {
      _this.expandTimer.stop();
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnd", function (result) {
      var _this$props = _this.props,
          onDragEnd = _this$props.onDragEnd,
          tree = _this$props.tree;
      var flattenedTree = _this.state.flattenedTree;

      _this.expandTimer.stop();

      var finalDragState = _objectSpread({}, _this.dragState, {
        source: result.source,
        destination: result.destination,
        combine: result.combine
      });

      _this.setState({
        draggedItemId: null
      });

      var _calculateFinalDropPo = calculateFinalDropPositions(tree, flattenedTree, finalDragState),
          sourcePosition = _calculateFinalDropPo.sourcePosition,
          destinationPosition = _calculateFinalDropPo.destinationPosition;

      onDragEnd(sourcePosition, destinationPosition);
      _this.dragState = null;
    });

    _defineProperty(_assertThisInitialized(_this), "onPointerMove", function () {
      if (_this.dragState) {
        _this.dragState = _objectSpread({}, _this.dragState, {
          horizontalLevel: _this.getDroppedLevel()
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "calculateEffectivePath", function (flatItem, snapshot) {
      var _this$state = _this.state,
          flattenedTree = _this$state.flattenedTree,
          draggedItemId = _this$state.draggedItemId;

      if (_this.dragState && draggedItemId === flatItem.item.id && (_this.dragState.destination || _this.dragState.combine)) {
        var _this$dragState = _this.dragState,
            source = _this$dragState.source,
            destination = _this$dragState.destination,
            combine = _this$dragState.combine,
            horizontalLevel = _this$dragState.horizontalLevel,
            mode = _this$dragState.mode; // We only update the path when it's dragged by keyboard or drop is animated

        if (mode === 'SNAP' || snapshot.isDropAnimating) {
          if (destination) {
            // Between two items
            return getDestinationPath(flattenedTree, source.index, destination.index, horizontalLevel);
          }

          if (combine) {
            // Hover on other item while dragging
            return getDestinationPath(flattenedTree, source.index, getIndexById(flattenedTree, combine.draggableId), horizontalLevel);
          }
        }
      }

      return flatItem.path;
    });

    _defineProperty(_assertThisInitialized(_this), "isExpandable", function (item) {
      return !!item.item.hasChildren && !item.item.isExpanded;
    });

    _defineProperty(_assertThisInitialized(_this), "getDroppedLevel", function () {
      var offsetPerLevel = _this.props.offsetPerLevel;
      var draggedItemId = _this.state.draggedItemId;

      if (!_this.dragState || !_this.containerElement) {
        return undefined;
      }

      var containerLeft = getBox(_this.containerElement).contentBox.left;
      var itemElement = _this.itemsElement[draggedItemId];

      if (itemElement) {
        var currentLeft = getBox(itemElement).contentBox.left;
        var relativeLeft = Math.max(currentLeft - containerLeft, 0);
        return Math.floor((relativeLeft + offsetPerLevel / 2) / offsetPerLevel) + 1;
      }

      return undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "patchDroppableProvided", function (provided) {
      return _objectSpread({}, provided, {
        innerRef: function innerRef(el) {
          _this.containerElement = el;
          provided.innerRef(el);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setItemRef", function (itemId, el) {
      _this.itemsElement[itemId] = el;
    });

    _defineProperty(_assertThisInitialized(_this), "renderItems", function () {
      var flattenedTree = _this.state.flattenedTree;
      return flattenedTree.map(_this.renderItem);
    });

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (flatItem, index) {
      var isDragEnabled = _this.props.isDragEnabled;
      return React.createElement(Draggable, {
        draggableId: flatItem.item.id,
        index: index,
        key: flatItem.item.id,
        isDragDisabled: !isDragEnabled
      }, _this.renderDraggableItem(flatItem));
    });

    _defineProperty(_assertThisInitialized(_this), "renderDraggableItem", function (flatItem) {
      return function (provided, snapshot) {
        var _this$props2 = _this.props,
            renderItem = _this$props2.renderItem,
            onExpand = _this$props2.onExpand,
            onCollapse = _this$props2.onCollapse,
            offsetPerLevel = _this$props2.offsetPerLevel;

        var currentPath = _this.calculateEffectivePath(flatItem, snapshot);

        if (snapshot.isDropAnimating) {
          _this.onDropAnimating();
        }

        return React.createElement(TreeItem, {
          key: flatItem.item.id,
          item: flatItem.item,
          path: currentPath,
          onExpand: onExpand,
          onCollapse: onCollapse,
          renderItem: renderItem,
          provided: provided,
          snapshot: snapshot,
          itemRef: _this.setItemRef,
          offsetPerLevel: offsetPerLevel
        });
      };
    });

    return _this;
  }

  _createClass(Tree, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var isNestingEnabled = this.props.isNestingEnabled;
      var renderedItems = this.renderItems();
      return React.createElement(DragDropContext, {
        onDragStart: this.onDragStart,
        onDragEnd: this.onDragEnd,
        onDragUpdate: this.onDragUpdate
      }, React.createElement(Droppable, {
        droppableId: "tree",
        isCombineEnabled: isNestingEnabled,
        ignoreContainerClipping: true
      }, function (provided) {
        var finalProvided = _this2.patchDroppableProvided(provided);

        return React.createElement("div", _extends({
          ref: finalProvided.innerRef,
          style: {
            pointerEvents: 'auto'
          },
          onTouchMove: _this2.onPointerMove,
          onMouseMove: _this2.onPointerMove
        }, finalProvided.droppableProps), renderedItems);
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var draggedItemId = state.draggedItemId;
      var tree = props.tree;
      var finalTree = Tree.closeParentIfNeeded(tree, draggedItemId);
      var flattenedTree = flattenTree(finalTree);
      return _objectSpread({}, state, {
        flattenedTree: flattenedTree
      });
    }
  }, {
    key: "closeParentIfNeeded",
    value: function closeParentIfNeeded(tree, draggedItemId) {
      if (draggedItemId !== null) {
        // Closing parent internally during dragging, because visually we can only move one item not a subtree
        return mutateTree(tree, draggedItemId, {
          isExpanded: false
        });
      }

      return tree;
    }
  }]);

  return Tree;
}(Component);

_defineProperty(Tree, "defaultProps", {
  tree: {
    children: []
  },
  onExpand: noop,
  onCollapse: noop,
  onDragStart: noop,
  onDragEnd: noop,
  renderItem: noop,
  offsetPerLevel: 35,
  isDragEnabled: false,
  isNestingEnabled: false
});

export { Tree as default };