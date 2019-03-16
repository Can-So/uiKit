import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import Base, { Label } from '@findable/field-base';
import { name as packageName, version as packageVersion } from './version.json';
import Radio from './Radio';

var FieldRadioGroupStateless =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldRadioGroupStateless, _Component);

  function FieldRadioGroupStateless() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FieldRadioGroupStateless);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldRadioGroupStateless)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderItems", function () {
      // Check items to avoid flow typing issue
      if (_this.props.items) {
        return _this.props.items.map(function (item, index) {
          return React.createElement(Radio, {
            key: index,
            isDisabled: item.isDisabled,
            isRequired: _this.props.isRequired,
            isSelected: item.isSelected,
            name: item.name,
            onChange: _this.props.onRadioChange,
            value: item.value
          }, item.label);
        });
      }

      return null;
    });

    return _this;
  }

  _createClass(FieldRadioGroupStateless, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement(Label // FIXME: Once label is properly typed as required we can remove this
      , {
        label: this.props.label || '',
        isRequired: this.props.isRequired
      }), React.createElement(Base, {
        appearance: "none",
        isRequired: this.props.isRequired
      }, React.createElement("div", {
        "aria-label": this.props.label,
        role: "group"
      }, this.renderItems())));
    }
  }]);

  return FieldRadioGroupStateless;
}(Component);

_defineProperty(FieldRadioGroupStateless, "defaultProps", {
  isRequired: false,
  items: [],
  label: ''
});

export { FieldRadioGroupStateless as AkFieldRadioGroupWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'fieldRadioGroup',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onRadioChange: createAndFireEventOnAtlaskit({
    action: 'selected',
    actionSubject: 'radioItem',
    attributes: {
      componentName: 'fieldRadioGroup',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(FieldRadioGroupStateless));