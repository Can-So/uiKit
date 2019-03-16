import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { PureComponent } from 'react';

var toggleExpandedStateUpdater = function toggleExpandedStateUpdater(prevState) {
  var isExpanded = prevState.isExpanded;
  return {
    isExpanded: !isExpanded
  };
};

var Expandable =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Expandable, _PureComponent);

  function Expandable(props) {
    var _this;

    _classCallCheck(this, Expandable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Expandable).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "toggleExpanded", function (isExpanded) {
      if (typeof isExpanded !== 'boolean') {
        _this.setState(toggleExpandedStateUpdater);
      } else {
        _this.setState({
          isExpanded: isExpanded
        });
      }
    });

    var defaultIsExpanded = _this.props.defaultIsExpanded;
    _this.state = {
      isExpanded: defaultIsExpanded
    };
    return _this;
  }

  _createClass(Expandable, [{
    key: "render",
    value: function render() {
      var isExpanded = this.state.isExpanded;
      var toggleExpanded = this.toggleExpanded;
      return this.props.children({
        isExpanded: isExpanded,
        toggleExpanded: toggleExpanded
      });
    }
  }]);

  return Expandable;
}(PureComponent);

_defineProperty(Expandable, "defaultProps", {
  defaultIsExpanded: false
});

export { Expandable as default };