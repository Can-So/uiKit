import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableTreeContainer } from '../styled';
import Rows from './Rows';
import Row from './Row';
import Headers from './Headers';
import Header from './Header';
import Cell from './Cell';

var TableTree =
/*#__PURE__*/
function (_Component) {
  _inherits(TableTree, _Component);

  function TableTree() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TableTree);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TableTree)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      columnWidths: []
    });

    _defineProperty(_assertThisInitialized(_this), "setColumnWidth", function (columnIndex, width) {
      var columnWidths = _this.state.columnWidths;

      if (width === columnWidths[columnIndex]) {
        return;
      }

      columnWidths[columnIndex] = width;

      _this.setState({
        columnWidths: columnWidths
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getColumnWidth", function (columnIndex) {
      return _this.state && _this.state.columnWidths[columnIndex] || null;
    });

    return _this;
  }

  _createClass(TableTree, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var widths = this.props.columnWidths;

      if (widths) {
        this.setState({
          columnWidths: widths
        }); // eslint-disable-line
      }
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        tableTree: {
          columnWidths: this.state.columnWidths,
          setColumnWidth: this.setColumnWidth,
          getColumnWidth: this.getColumnWidth
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          headers = _this$props.headers,
          columns = _this$props.columns,
          _this$props$columnWid = _this$props.columnWidths,
          columnWidths = _this$props$columnWid === void 0 ? [] : _this$props$columnWid;
      var heads = headers && React.createElement(Headers, null, headers.map(function (header, index) {
        return (// eslint-disable-next-line react/no-array-index-key
          React.createElement(Header, {
            key: index,
            columnIndex: index,
            width: columnWidths[index]
          }, header)
        );
      }));
      var rows = null;

      if (columns && items) {
        rows = React.createElement(Rows, {
          items: items,
          render: function render(_ref) {
            var id = _ref.id,
                children = _ref.children,
                hasChildren = _ref.hasChildren,
                content = _ref.content;
            return React.createElement(Row, {
              itemId: id,
              items: children,
              hasChildren: hasChildren
            }, columns.map(function (CellContent, index) {
              return React.createElement(Cell // eslint-disable-next-line react/no-array-index-key
              , {
                key: index,
                columnIndex: index,
                width: columnWidths[index]
              }, React.createElement(CellContent, content));
            }));
          }
        });
      }

      return React.createElement(TableTreeContainer, {
        role: 'treegrid',
        "aria-readonly": true
      }, heads, rows, this.props.children);
    }
  }]);

  return TableTree;
}(Component);

_defineProperty(TableTree, "childContextTypes", {
  tableTree: PropTypes.object.isRequired
});

export { TableTree as default };