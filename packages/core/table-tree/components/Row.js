import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Fragment, Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import { TreeRowContainer } from '../styled';
import Chevron from './Chevron';
import Cell from './Cell';
import toItemId from '../utils/toItemId';

var Row =
/*#__PURE__*/
function (_Component) {
  _inherits(Row, _Component);

  function Row() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Row);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Row)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isExpanded: _this.props.isDefaultExpanded || false
    });

    _defineProperty(_assertThisInitialized(_this), "onExpandToggle", function () {
      var isExpanded = _this.props.isExpanded;

      if (isExpanded !== undefined) {
        _this.onExpandStateChange(!isExpanded);
      } else {
        _this.setState({
          isExpanded: !_this.state.isExpanded
        });

        _this.onExpandStateChange(!_this.state.isExpanded);
      }
    });

    return _this;
  }

  _createClass(Row, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          isDefaultExpanded = _this$props.isDefaultExpanded,
          isExpanded = _this$props.isExpanded;

      if (isExpanded === undefined && isDefaultExpanded !== undefined && prevProps.isDefaultExpanded !== isDefaultExpanded && this.state.isExpanded !== isDefaultExpanded) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isExpanded: isDefaultExpanded
        });
      }
    }
  }, {
    key: "onExpandStateChange",
    value: function onExpandStateChange(isExpanded) {
      if (this.props.data) {
        if (isExpanded && this.props.onExpand) {
          this.props.onExpand(this.props.data);
        } else if (!isExpanded && this.props.onCollapse) {
          this.props.onCollapse(this.props.data);
        }
      }
    }
  }, {
    key: "isExpanded",
    value: function isExpanded() {
      var isExpanded = this.props.isExpanded;
      return isExpanded !== undefined ? isExpanded : this.state.isExpanded;
    }
  }, {
    key: "renderCell",
    value: function renderCell(cell, cellIndex) {
      var props = this.props;
      var isExpanded = this.isExpanded();
      var hasChildren = props.hasChildren,
          depth = props.depth;
      var isFirstCell = cellIndex === 0;
      var indentLevel = isFirstCell ? depth : 0;
      var cellContent = cell.props.children || [];

      if (isFirstCell && hasChildren) {
        cellContent = [React.createElement(Chevron, {
          key: "chevron",
          expandLabel: props.expandLabel,
          collapseLabel: props.collapseLabel,
          isExpanded: isExpanded,
          onExpandToggle: this.onExpandToggle,
          ariaControls: toItemId(props.itemId)
        })].concat(cellContent);
      }

      return React.cloneElement(cell, {
        key: cellIndex,
        columnIndex: cellIndex,
        indentLevel: indentLevel
      }, cellContent);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          hasChildren = _this$props2.hasChildren,
          depth = _this$props2.depth,
          renderChildren = _this$props2.renderChildren;
      var isExpanded = this.isExpanded();
      var ariaAttrs = {};

      if (hasChildren) {
        ariaAttrs['aria-expanded'] = isExpanded;
      }

      if (depth !== undefined) {
        ariaAttrs['aria-level'] = depth;
      }

      return React.createElement(Fragment, null, React.createElement(TreeRowContainer, _extends({
        role: 'row'
      }, ariaAttrs), React.Children.map(this.props.children, function (cell, index) {
        return _this2.renderCell(cell, index);
      })), hasChildren && isExpanded && renderChildren && renderChildren());
    }
  }]);

  return Row;
}(Component);

export { Row as RowWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'row',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onExpand: createAndFireEventOnAtlaskit({
    action: 'expanded',
    actionSubject: 'tableTree',
    attributes: {
      componentName: 'row',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onCollapse: createAndFireEventOnAtlaskit({
    action: 'collapsed',
    actionSubject: 'tableTree',
    attributes: {
      componentName: 'row',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Row));