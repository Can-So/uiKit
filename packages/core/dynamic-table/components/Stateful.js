import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import DynamicTableStateless from './Stateless';
import { reorderRows } from '../internal/helpers';

var DynamicTable =
/*#__PURE__*/
function (_Component) {
  _inherits(DynamicTable, _Component);

  function DynamicTable() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DynamicTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DynamicTable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      page: _this.props.defaultPage,
      sortKey: _this.props.defaultSortKey,
      sortOrder: _this.props.defaultSortOrder,
      rows: _this.props.rows
    });

    _defineProperty(_assertThisInitialized(_this), "onSetPage", function (page, event) {
      _this.props.onSetPage(page, event);

      _this.setState({
        page: page
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSort", function (_ref) {
      var key = _ref.key,
          item = _ref.item,
          sortOrder = _ref.sortOrder;

      _this.props.onSort({
        key: key,
        item: item,
        sortOrder: sortOrder
      });

      _this.setState({
        sortKey: key,
        sortOrder: sortOrder,
        page: 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRankEndIfExists", function (params) {
      if (_this.props.onRankEnd) {
        _this.props.onRankEnd(params);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRankEnd", function (params) {
      var destination = params.destination;
      var _this$state = _this.state,
          rows = _this$state.rows,
          page = _this$state.page;
      var rowsPerPage = _this.props.rowsPerPage;

      if (!destination || !rows) {
        _this.onRankEndIfExists(params);

        return;
      }

      var reordered = reorderRows(params, rows, page, rowsPerPage);

      _this.setState({
        rows: reordered
      });

      _this.onRankEndIfExists(params);
    });

    return _this;
  }

  _createClass(DynamicTable, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      this.setState({
        page: newProps.page,
        sortKey: newProps.defaultSortKey,
        sortOrder: newProps.defaultSortOrder,
        rows: newProps.rows
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          page = _this$state2.page,
          sortKey = _this$state2.sortKey,
          sortOrder = _this$state2.sortOrder,
          rows = _this$state2.rows;
      var _this$props = this.props,
          caption = _this$props.caption,
          emptyView = _this$props.emptyView,
          head = _this$props.head,
          loadingSpinnerSize = _this$props.loadingSpinnerSize,
          isLoading = _this$props.isLoading,
          isFixedSize = _this$props.isFixedSize,
          isRankable = _this$props.isRankable,
          isRankingDisabled = _this$props.isRankingDisabled,
          rowsPerPage = _this$props.rowsPerPage,
          paginationi18n = _this$props.paginationi18n,
          onRankStart = _this$props.onRankStart;
      return React.createElement(DynamicTableStateless, {
        paginationi18n: paginationi18n,
        caption: caption,
        emptyView: emptyView,
        head: head,
        loadingSpinnerSize: loadingSpinnerSize,
        isLoading: isLoading,
        isFixedSize: isFixedSize,
        onSetPage: this.onSetPage,
        onSort: this.onSort,
        page: page,
        rows: rows,
        rowsPerPage: rowsPerPage,
        sortKey: sortKey,
        sortOrder: sortOrder,
        isRankable: isRankable,
        isRankingDisabled: isRankingDisabled,
        onRankEnd: this.onRankEnd,
        onRankStart: onRankStart
      });
    }
  }]);

  return DynamicTable;
}(Component);

_defineProperty(DynamicTable, "defaultProps", {
  defaultPage: 1,
  isLoading: false,
  isFixedSize: false,
  isRankable: false,
  onSetPage: function onSetPage() {},
  onSort: function onSort() {},
  rowsPerPage: Infinity
});

export { DynamicTable as default };