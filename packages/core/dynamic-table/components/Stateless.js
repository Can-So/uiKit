import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent, UIAnalyticsEvent } from '@findable/analytics-next';
import ManagedPagination from './managedPagination';
import { name as packageName, version as packageVersion } from '../version.json';
import { ASC, DESC, SMALL, LARGE } from '../internal/constants';
import { getPageRows, validateSortKey, assertIsSortable } from '../internal/helpers';
import TableHead from './TableHead';
import Body from './Body';
import RankableTableBody from './rankable/Body';
import LoadingContainer from './LoadingContainer';
import LoadingContainerAdvanced from './LoadingContainerAdvanced';
import { EmptyViewContainer, EmptyViewWithFixedHeight } from '../styled/EmptyBody';
import { Table, Caption, PaginationWrapper } from '../styled/DynamicTable';

function toggleSortOrder(currentSortOrder) {
  switch (currentSortOrder) {
    case DESC:
      return ASC;

    case ASC:
      return DESC;

    default:
      return currentSortOrder;
  }
}

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

    _defineProperty(_assertThisInitialized(_this), "tableBody", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isRanking: false
    });

    _defineProperty(_assertThisInitialized(_this), "onSort", function (item) {
      return function () {
        var _this$props = _this.props,
            sortKey = _this$props.sortKey,
            sortOrder = _this$props.sortOrder,
            onSort = _this$props.onSort,
            isRankable = _this$props.isRankable;
        var key = item.key;
        if (!key) return;

        _this.onSetPage(1, undefined);

        if (isRankable && key === sortKey && sortOrder === DESC) {
          onSort({
            key: null,
            sortOrder: null,
            item: item
          });
          return;
        }

        var sortOrderFormatted = key !== sortKey ? ASC : toggleSortOrder(sortOrder);
        onSort({
          key: key,
          item: item,
          sortOrder: sortOrderFormatted
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onSetPage", function (page, event) {
      _this.props.onSetPage(page, event);
    });

    _defineProperty(_assertThisInitialized(_this), "onRankStart", function (params) {
      _this.setState({
        isRanking: true
      });

      if (_this.props.onRankStart) {
        _this.props.onRankStart(params);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRankEnd", function (params) {
      _this.setState({
        isRanking: false
      });

      if (_this.props.onRankEnd) {
        _this.props.onRankEnd(params);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getSpinnerSize", function () {
      var _this$props2 = _this.props,
          page = _this$props2.page,
          rows = _this$props2.rows,
          rowsPerPage = _this$props2.rowsPerPage,
          loadingSpinnerSize = _this$props2.loadingSpinnerSize;

      if (loadingSpinnerSize) {
        return loadingSpinnerSize;
      }

      return getPageRows(page, rows || [], rowsPerPage).length > 2 ? LARGE : SMALL;
    });

    _defineProperty(_assertThisInitialized(_this), "renderEmptyBody", function () {
      var _this$props3 = _this.props,
          emptyView = _this$props3.emptyView,
          isLoading = _this$props3.isLoading;

      if (isLoading) {
        return React.createElement(EmptyViewWithFixedHeight, null);
      }

      return emptyView && React.createElement(EmptyViewContainer, null, emptyView);
    });

    return _this;
  }

  _createClass(DynamicTable, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      validateSortKey(this.props.sortKey, this.props.head);
      assertIsSortable(this.props.head);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.sortKey !== nextProps.sortKey || this.props.head !== nextProps.head) {
        validateSortKey(nextProps.sortKey, nextProps.head);
      }

      if (this.props.head !== nextProps.head) {
        assertIsSortable(nextProps.head);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          caption = _this$props4.caption,
          head = _this$props4.head,
          isFixedSize = _this$props4.isFixedSize,
          page = _this$props4.page,
          rows = _this$props4.rows,
          rowsPerPage = _this$props4.rowsPerPage,
          sortKey = _this$props4.sortKey,
          sortOrder = _this$props4.sortOrder,
          isLoading = _this$props4.isLoading,
          isRankable = _this$props4.isRankable,
          isRankingDisabled = _this$props4.isRankingDisabled,
          paginationi18n = _this$props4.paginationi18n;
      var rowsLength = rows && rows.length;
      var bodyProps = {
        rows: rows,
        head: head,
        sortKey: sortKey,
        sortOrder: sortOrder,
        rowsPerPage: rowsPerPage,
        page: page,
        isFixedSize: isFixedSize,
        ref: function ref(el) {
          _this2.tableBody = el;
        }
      };
      var totalPages = rowsLength && rowsPerPage ? Math.ceil(rowsLength / rowsPerPage) : 0;
      var rowsExist = !!rowsLength;
      var spinnerSize = this.getSpinnerSize();
      var emptyBody = this.renderEmptyBody();
      var canRank = isRankable && !sortKey;
      return React.createElement(React.Fragment, null, React.createElement(LoadingContainerAdvanced, {
        isLoading: isLoading && rowsExist,
        spinnerSize: spinnerSize,
        targetRef: function targetRef() {
          return _this2.tableBody;
        }
      }, React.createElement(Table, {
        isFixedSize: isFixedSize
      }, !!caption && React.createElement(Caption, null, caption), head && React.createElement(TableHead, {
        head: head,
        onSort: this.onSort,
        sortKey: sortKey,
        sortOrder: sortOrder,
        isRanking: this.state.isRanking,
        isRankable: canRank
      }), rowsExist && (canRank ? React.createElement(RankableTableBody, _extends({}, bodyProps, {
        isRanking: this.state.isRanking,
        onRankStart: this.onRankStart,
        onRankEnd: this.onRankEnd,
        isRankingDisabled: isRankingDisabled || isLoading
      })) : React.createElement(Body, bodyProps)))), !totalPages ? null : React.createElement(PaginationWrapper, null, React.createElement(ManagedPagination, {
        value: page,
        onChange: this.onSetPage,
        total: totalPages,
        i18n: paginationi18n
      })), !rowsExist && emptyBody && React.createElement(LoadingContainer, {
        isLoading: isLoading,
        spinnerSize: LARGE
      }, emptyBody));
    }
  }]);

  return DynamicTable;
}(Component);

_defineProperty(DynamicTable, "defaultProps", {
  isLoading: false,
  isFixedSize: false,
  rowsPerPage: Infinity,
  onSetPage: function onSetPage() {},
  onSort: function onSort() {},
  page: 1,
  isRankable: false,
  isRankingDisabled: false,
  onRankStart: function onRankStart() {},
  onRankEnd: function onRankEnd() {},
  paginationi18n: {
    prev: 'Prev',
    next: 'Next'
  }
});

export { DynamicTable as DynamicTableWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'dynamicTable',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onSort: createAndFireEventOnAtlaskit({
    action: 'sorted',
    actionSubject: 'dynamicTable',
    attributes: {
      componentName: 'dynamicTable',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onRankEnd: createAndFireEventOnAtlaskit({
    action: 'ranked',
    actionSubject: 'dynamicTable',
    attributes: {
      componentName: 'dynamicTable',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(DynamicTable));