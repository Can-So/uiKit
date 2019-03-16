import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default function withColumnWidth(Cell) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(CellWithColumnWidth, _Component);

    function CellWithColumnWidth() {
      _classCallCheck(this, CellWithColumnWidth);

      return _possibleConstructorReturn(this, _getPrototypeOf(CellWithColumnWidth).apply(this, arguments));
    }

    _createClass(CellWithColumnWidth, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.setColumnWidth(this.props.width);
      }
    }, {
      key: "setColumnWidth",
      value: function setColumnWidth(width) {
        if (width !== undefined) {
          this.context.tableTree.setColumnWidth(this.props.columnIndex, width);
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        this.setColumnWidth(nextProps.width);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            width = _this$props.width,
            columnIndex = _this$props.columnIndex;
        var columnWidth = width !== null && width !== undefined ? width : this.context.tableTree.getColumnWidth(columnIndex);
        return React.createElement(Cell, _extends({}, this.props, {
          width: columnWidth
        }));
      }
    }]);

    return CellWithColumnWidth;
  }(Component), _defineProperty(_class, "contextTypes", {
    tableTree: PropTypes.object.isRequired
  }), _temp;
}