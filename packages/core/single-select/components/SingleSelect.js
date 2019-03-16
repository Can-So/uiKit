import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import StatelessSelect, { getTextContent } from './StatelessSelect';
// =============================================================
// NOTE: Duplicated in ./internal/appearances until docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================
var appearances = {
  values: ['default', 'subtle'],
  default: 'default'
};

var AkSingleSelect =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AkSingleSelect, _PureComponent);

  function AkSingleSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AkSingleSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AkSingleSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: _this.props.isDefaultOpen,
      selectedItem: _this.props.defaultSelected,
      filterValue: _this.props.defaultSelected ? getTextContent(_this.props.defaultSelected) : ''
    });

    _defineProperty(_assertThisInitialized(_this), "selectItem", function (item) {
      _this.setState({
        isOpen: false,
        selectedItem: item
      });

      if (_this.props.onSelected) {
        _this.props.onSelected({
          item: item
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpenChange", function (attrs) {
      // allows consuming components to look for `defaultPrevented` on the event
      // where they can handle internal state e.g. prevent InlineDialog from closing when
      // the target DOM node no-longer exists
      if (!attrs.isOpen) attrs.event.preventDefault();

      _this.setState({
        isOpen: attrs.isOpen
      });

      if (_this.props.onOpenChange) {
        _this.props.onOpenChange(attrs);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFilterChange", function (value) {
      if (_this.props.onFilterChange) {
        _this.props.onFilterChange(value);
      }

      _this.setState({
        filterValue: value
      });
    });

    return _this;
  }

  _createClass(AkSingleSelect, [{
    key: "render",
    value: function render() {
      return React.createElement(StatelessSelect, {
        appearance: this.props.appearance,
        droplistShouldFitContainer: this.props.droplistShouldFitContainer,
        filterValue: this.state.filterValue,
        hasAutocomplete: this.props.hasAutocomplete,
        id: this.props.id,
        isDisabled: this.props.isDisabled,
        isFirstChild: this.props.isFirstChild,
        isInvalid: this.props.isInvalid,
        invalidMessage: this.props.invalidMessage,
        isOpen: this.state.isOpen,
        isRequired: this.props.isRequired,
        items: this.props.items,
        label: this.props.label,
        name: this.props.name,
        noMatchesFound: this.props.noMatchesFound,
        onFilterChange: this.handleFilterChange,
        onOpenChange: this.handleOpenChange,
        onSelected: this.selectItem,
        placeholder: this.props.placeholder,
        position: this.props.position,
        selectedItem: this.state.selectedItem,
        shouldFitContainer: this.props.shouldFitContainer,
        shouldFocus: this.props.shouldFocus,
        shouldFlip: this.props.shouldFlip,
        maxHeight: this.props.maxHeight
      });
    }
  }]);

  return AkSingleSelect;
}(PureComponent);

_defineProperty(AkSingleSelect, "defaultProps", {
  appearance: appearances.default,
  droplistShouldFitContainer: true,
  isRequired: false,
  items: [],
  label: '',
  onFilterChange: function onFilterChange() {},
  onOpenChange: function onOpenChange() {},
  onSelected: function onSelected() {},
  placeholder: '',
  position: 'bottom left',
  shouldFocus: false,
  shouldFlip: true
});

export { AkSingleSelect as default };