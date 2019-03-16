import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TableRow from './TableRow';
import withSortedPageRows from '../../hoc/withSortedPageRows';

// computes destination of ranking
// - if drag was cancelled returns undefined
// - if drag was finished, returns new position and after/before key
var computeRankDestination = function computeRankDestination(result, pageRows) {
  var sourceIndex = result.source.index,
      destination = result.destination;

  if (destination) {
    var index = destination.index;
    var keyIndex = index < sourceIndex ? index - 1 : index;
    var afterKey = keyIndex !== -1 ? pageRows[keyIndex].key : undefined;
    var beforeIndex = keyIndex === -1 ? 0 : keyIndex + 1;
    var beforeKey = beforeIndex < pageRows.length ? pageRows[beforeIndex].key : undefined;
    return {
      index: index,
      afterKey: afterKey,
      beforeKey: beforeKey
    };
  }

  return undefined;
};

export var RankableBody =
/*#__PURE__*/
function (_Component) {
  _inherits(RankableBody, _Component);

  function RankableBody() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RankableBody);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RankableBody)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onBeforeDragStart", function (dragStart) {
      var key = dragStart.draggableId,
          index = dragStart.source.index;
      var rankStartProps = {
        index: index,
        key: key
      };

      _this.props.onRankStart(rankStartProps);
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnd", function (result) {
      var _this$props = _this.props,
          pageRows = _this$props.pageRows,
          onRankEnd = _this$props.onRankEnd;
      var sourceKey = result.draggableId,
          sourceIndex = result.source.index;
      var destination = computeRankDestination(result, pageRows);
      var rankEndProps = {
        sourceIndex: sourceIndex,
        sourceKey: sourceKey,
        destination: destination
      };
      onRankEnd(rankEndProps);
    });

    return _this;
  }

  _createClass(RankableBody, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          pageRows = _this$props2.pageRows,
          head = _this$props2.head,
          isFixedSize = _this$props2.isFixedSize,
          isRanking = _this$props2.isRanking,
          isRankingDisabled = _this$props2.isRankingDisabled;
      return React.createElement(DragDropContext, {
        onBeforeDragStart: this.onBeforeDragStart,
        onDragEnd: this.onDragEnd
      }, React.createElement(Droppable, {
        droppableId: "dynamic-table-droppable",
        isDropDisabled: isRankingDisabled
      }, function (provided) {
        return React.createElement("tbody", _extends({
          ref: provided.innerRef
        }, provided.droppableProps), pageRows.map(function (row, rowIndex) {
          return React.createElement(TableRow, {
            head: head,
            isRanking: isRanking,
            isFixedSize: isFixedSize,
            key: row.key,
            rowIndex: rowIndex,
            row: row,
            isRankingDisabled: isRankingDisabled
          });
        }), provided.placeholder);
      }));
    }
  }]);

  return RankableBody;
}(Component);
export default withSortedPageRows(RankableBody);