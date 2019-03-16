import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Component } from 'react';
import PropTypes from 'prop-types';
import { clickManagerContext } from '../../util/contextNamespace';

var DropdownItemClickManager =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItemClickManager, _Component);

  function DropdownItemClickManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownItemClickManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownItemClickManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleItemClicked", function (event) {
      _this.props.onItemClicked(event);
    });

    return _this;
  }

  _createClass(DropdownItemClickManager, [{
    key: "getChildContext",
    value: function getChildContext() {
      return _defineProperty({}, clickManagerContext, {
        itemClicked: this.handleItemClicked
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return DropdownItemClickManager;
}(Component);

_defineProperty(DropdownItemClickManager, "childContextTypes", _defineProperty({}, clickManagerContext, PropTypes.object));

export { DropdownItemClickManager as default };