import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { colors } from '@findable/theme';
import PropTypes from 'prop-types';
import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';
import { selectionManagerContext } from '../../util/contextNamespace';
import { KEY_ENTER, KEY_SPACE } from '../../util/keys';

// HOC that typically wraps @findable/item
var withToggleInteraction = function withToggleInteraction(WrappedComponent, SelectionIcon, getAriaRole) {
  var WithToggleInteraction =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithToggleInteraction, _Component);

    function WithToggleInteraction() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WithToggleInteraction);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithToggleInteraction)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "getIconColors", function () {
        var isSelected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (isSelected) {
          return {
            primary: colors.B400,
            secondary: colors.N40
          };
        }

        return {
          primary: colors.N40,
          secondary: colors.N40
        };
      });

      _defineProperty(_assertThisInitialized(_this), "warnIfUseControlledAndUncontrolledState", function () {
        if (process.env.NODE_ENV !== 'production') {
          if (_this.props.defaultSelected && _this.props.isSelected) {
            // eslint-disable-next-line no-console
            console.warn('DropdownItem defaultSelected and isSelected props should not be used at the same time.');
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "callContextFn", safeContextCall(_assertThisInitialized(_this), selectionManagerContext));

      _defineProperty(_assertThisInitialized(_this), "handleKeyboard", function (event) {
        var key = event.key;

        if (key === KEY_ENTER || key === KEY_SPACE) {
          // We prevent default here to avoid page scroll
          event.preventDefault();

          _this.handleItemActivated(event);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "handleItemActivated", function (event) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }

        _this.callContextFn('itemClicked', _this.props.id);
      });

      _defineProperty(_assertThisInitialized(_this), "isSelectedInDropdown", function () {
        return _this.callContextFn('isItemSelected', _this.props.id);
      });

      return _this;
    }

    _createClass(WithToggleInteraction, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$props = this.props,
            defaultSelected = _this$props.defaultSelected,
            isSelected = _this$props.isSelected,
            id = _this$props.id;
        this.warnIfUseControlledAndUncontrolledState();
        this.callContextFn('setItemSelected', id, isSelected, defaultSelected);
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var id = nextProps.id,
            defaultSelected = nextProps.defaultSelected,
            isSelected = nextProps.isSelected;

        if (this.props.isSelected !== isSelected) {
          this.callContextFn('setItemSelected', id, isSelected, defaultSelected);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            children = _this$props2.children,
            otherProps = _objectWithoutProperties(_this$props2, ["children"]);

        var isSelected = this.isSelectedInDropdown();
        var iconColors = this.getIconColors(isSelected);
        var ariaRole = getAriaRole();
        return React.createElement(WrappedComponent, _extends({}, otherProps, {
          role: ariaRole,
          "aria-checked": isSelected,
          isSelected: isSelected,
          onClick: this.handleItemActivated,
          onKeyDown: this.handleKeyboard,
          elemBefore: React.createElement(SelectionIcon, {
            primaryColor: iconColors.primary,
            secondaryColor: iconColors.secondary,
            size: "medium",
            label: ""
          })
        }), children);
      }
    }]);

    return WithToggleInteraction;
  }(Component);

  _defineProperty(WithToggleInteraction, "defaultProps", {
    onClick: function onClick() {}
  });

  _defineProperty(WithToggleInteraction, "contextTypes", _defineProperty({}, selectionManagerContext, PropTypes.object.isRequired));

  WithToggleInteraction.displayName = "WithToggleInteraction(".concat(getDisplayName(WrappedComponent), ")");
  return WithToggleInteraction;
};

export default withToggleInteraction;