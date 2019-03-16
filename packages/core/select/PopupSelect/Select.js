import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import Select from 'react-select';
import createFocusTrap from 'focus-trap';
import { Manager, Reference, Popper } from 'react-popper';
import NodeResolver from 'react-node-resolver';
import shallowEqualObjects from 'shallow-equal/objects';
import { colors } from '@atlaskit/theme';
import { MenuDialog, DummyControl, defaultComponents } from './components';
/** Are we rendering on the client or server? */

var canUseDOM = function canUseDOM() {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}; // ==============================
// Types
// ==============================


// ==============================
// Class
// ==============================
var defaultStyles = {
  groupHeading: function groupHeading(provided) {
    return _objectSpread({}, provided, {
      color: colors.N80
    });
  }
};
var defaultPopperProps = {
  modifiers: {
    offset: {
      offset: "0, 8"
    }
  },
  placement: 'bottom-start'
};

var isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0;
};

var PopupSelect =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PopupSelect, _PureComponent);

  function PopupSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PopupSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PopupSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "focusTrap", void 0);

    _defineProperty(_assertThisInitialized(_this), "menuRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "selectRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "targetRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: false,
      mergedComponents: defaultComponents,
      mergedPopperProps: defaultPopperProps
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var key = event.key;

      switch (key) {
        case 'Escape':
        case 'Esc':
          _this.close();

          break;

        default:
      }

      if (_this.props.handleKeyDown) {
        _this.props.handleKeyDown(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (_ref) {
      var target = _ref.target;
      var isOpen = _this.state.isOpen; // appease flow

      if (!(target instanceof Element)) return; // NOTE: Why not use the <Blanket /> component to close?
      // We don't want to interupt the user's flow. Taking this approach allows
      // user to click "through" to other elements and close the popout.

      if (isOpen && !_this.menuRef.contains(target)) {
        _this.close();
      } // open on target click -- we can't trust consumers to spread the onClick
      // property to the target


      if (!isOpen && _this.targetRef.contains(target)) {
        _this.open();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectChange", function (value, actionMeta) {
      var _this$props = _this.props,
          closeMenuOnSelect = _this$props.closeMenuOnSelect,
          onChange = _this$props.onChange;
      if (closeMenuOnSelect) _this.close();
      if (onChange) onChange(value, actionMeta);
    });

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      var onOpen = _this.props.onOpen;
      if (onOpen) onOpen();

      _this.setState({
        isOpen: true
      }, _this.initialiseFocusTrap);

      _this.selectRef.select.openMenu('first'); // HACK


      if (typeof window === 'undefined') return;
      window.addEventListener('keydown', _this.handleKeyDown);
    });

    _defineProperty(_assertThisInitialized(_this), "initialiseFocusTrap", function () {
      var trapConfig = {
        clickOutsideDeactivates: true,
        escapeDeactivates: true,
        fallbackFocus: _this.menuRef,
        returnFocusOnDeactivate: true
      };
      _this.focusTrap = createFocusTrap(_this.menuRef, trapConfig); // allow time for the HTMLElement to render

      setTimeout(function () {
        return _this.focusTrap.activate();
      }, 1);
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      var onClose = _this.props.onClose;
      if (onClose) onClose();

      _this.setState({
        isOpen: false
      });

      _this.focusTrap.deactivate();

      if (typeof window === 'undefined') return;
      window.removeEventListener('keydown', _this.handleKeyDown);
    });

    _defineProperty(_assertThisInitialized(_this), "resolveTargetRef", function (popperRef) {
      return function (ref) {
        // avoid thrashing fn calls
        if (!_this.targetRef && popperRef && ref) {
          _this.targetRef = ref;
          popperRef(ref);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "resolveMenuRef", function (popperRef) {
      return function (ref) {
        _this.menuRef = ref;
        popperRef(ref);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectRef", function (ref) {
      _this.selectRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getItemCount", function () {
      var options = _this.props.options;
      var count = 0;
      options.forEach(function (groupOrOption) {
        if (groupOrOption.options) {
          groupOrOption.options.forEach(function () {
            return count++;
          });
        } else {
          count++;
        }
      });
      return count;
    });

    _defineProperty(_assertThisInitialized(_this), "getMaxHeight", function () {
      var maxMenuHeight = _this.props.maxMenuHeight;
      if (!_this.selectRef) return maxMenuHeight; // subtract the control height to maintain consistency

      var showSearchControl = _this.showSearchControl();

      var offsetHeight = showSearchControl ? _this.selectRef.select.controlRef.offsetHeight : 0;
      var maxHeight = maxMenuHeight - offsetHeight;
      return maxHeight;
    });

    _defineProperty(_assertThisInitialized(_this), "showSearchControl", function () {
      var searchThreshold = _this.props.searchThreshold;
      return _this.getItemCount() > searchThreshold;
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelect", function () {
      var _this$props2 = _this.props,
          footer = _this$props2.footer,
          maxMenuWidth = _this$props2.maxMenuWidth,
          minMenuWidth = _this$props2.minMenuWidth,
          target = _this$props2.target,
          props = _objectWithoutProperties(_this$props2, ["footer", "maxMenuWidth", "minMenuWidth", "target"]);

      var _this$state = _this.state,
          isOpen = _this$state.isOpen,
          mergedComponents = _this$state.mergedComponents,
          mergedPopperProps = _this$state.mergedPopperProps;

      var showSearchControl = _this.showSearchControl();

      var portalDestination = canUseDOM() ? document.body : null;

      var components = _objectSpread({}, mergedComponents, {
        Control: showSearchControl ? mergedComponents.Control : DummyControl
      });

      if (!portalDestination || !isOpen) return null;
      var popper = React.createElement(Popper, mergedPopperProps, function (_ref2) {
        var placement = _ref2.placement,
            ref = _ref2.ref,
            style = _ref2.style;
        return React.createElement(NodeResolver, {
          innerRef: _this.resolveMenuRef(ref)
        }, React.createElement(MenuDialog, {
          style: style,
          "data-placement": placement,
          minWidth: minMenuWidth,
          maxWidth: maxMenuWidth
        }, React.createElement(Select, _extends({
          backspaceRemovesValue: false,
          controlShouldRenderValue: false,
          isClearable: false,
          tabSelectsValue: false,
          menuIsOpen: true,
          ref: _this.getSelectRef
        }, props, {
          styles: _objectSpread({}, defaultStyles, props.styles),
          maxMenuHeight: _this.getMaxHeight(),
          components: components,
          onChange: _this.handleSelectChange
        })), footer));
      });
      return mergedPopperProps.positionFixed ? popper : createPortal(popper, portalDestination);
    });

    return _this;
  }

  _createClass(PopupSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window === 'undefined') return;
      window.addEventListener('click', this.handleClick);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (typeof window === 'undefined') return;
      window.removeEventListener('click', this.handleClick);
    } // Event Handlers
    // ==============================

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var target = this.props.target;
      var isOpen = this.state.isOpen;
      return React.createElement(Manager, null, React.createElement(Reference, null, function (_ref3) {
        var ref = _ref3.ref;
        return target({
          ref: _this2.resolveTargetRef(ref),
          isOpen: isOpen
        });
      }), this.renderSelect());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var newState = {}; // Merge consumer and default popper props

      var mergedPopperProps = _objectSpread({}, defaultPopperProps, props.popperProps);

      if (!shallowEqualObjects(mergedPopperProps, state.mergedPopperProps)) {
        newState.mergedPopperProps = mergedPopperProps;
      } // Merge consumer and default components


      var mergedComponents = _objectSpread({}, defaultComponents, props.components);

      if (!shallowEqualObjects(mergedComponents, state.mergedComponents)) {
        newState.mergedComponents = mergedComponents;
      }

      if (!isEmpty(newState)) return newState;
      return null;
    }
  }]);

  return PopupSelect;
}(PureComponent);

_defineProperty(PopupSelect, "defaultProps", {
  closeMenuOnSelect: true,
  components: {},
  maxMenuHeight: 300,
  maxMenuWidth: 440,
  minMenuWidth: 220,
  popperProps: {},
  searchThreshold: 5,
  styles: {}
});

export { PopupSelect as default };