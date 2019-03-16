import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { css as _css3 } from "emotion";
import { css as _css2 } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import { css as _css } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React, { PureComponent, cloneElement } from 'react';
import NodeResolver from 'react-node-resolver';
import shallowEqualObjects from 'shallow-equal/objects';
import { components, PopupSelect, mergeStyles } from '@atlaskit/select';
import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';
import AddIcon from '@atlaskit/icon/glyph/add';
import Option from './Option';
import { UIControllerSubscriber } from '../../../ui-controller';
import { CONTENT_NAV_WIDTH } from '../../../common/constants';
var gridSize = gridSizeFn();
var defaultStyles = {
  option: function option(provided, _ref) {
    var isActive = _ref.isActive,
        isFocused = _ref.isFocused;
    return _objectSpread({}, provided, {
      alignItems: 'center',
      border: 'none',
      backgroundColor: isFocused ? colors.N30 : 'transparent',
      boxSizing: 'border-box',
      color: 'inherit',
      cursor: 'default',
      display: 'flex',
      flexShrink: 0,
      fontSize: 'inherit',
      height: gridSize * 6,
      outline: 'none',
      paddingRight: gridSize,
      paddingLeft: gridSize,
      textAlign: 'left',
      textDecoration: 'none',
      width: '100%'
    }, isActive && {
      backgroundColor: colors.B50
    });
  }
}; // ==============================
// Custom Functions
// ==============================

export var createStyles = function createStyles() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return mergeStyles(defaultStyles, styles);
};
export var filterOption = function filterOption(_ref2, input) {
  var data = _ref2.data;
  return data.text.toLowerCase().includes(input.toLowerCase());
};
export var isOptionSelected = function isOptionSelected(option, selected) {
  if (!selected || !selected.length) return false;
  return option.id === selected[0].id;
};
export var getOptionValue = function getOptionValue(option) {
  return option.id;
}; // ==============================
// Custom Components
// ==============================

export var Control = function Control(_ref3) {
  var _ref3$innerProps = _ref3.innerProps,
      innerRef = _ref3$innerProps.innerRef,
      innerProps = _objectWithoutProperties(_ref3$innerProps, ["innerRef"]),
      props = _objectWithoutProperties(_ref3, ["innerProps"]);

  return React.createElement("div", {
    ref: innerRef,
    className: _css({
      boxShadow: "0 2px 0 ".concat(colors.N40A),
      padding: gridSize,
      position: 'relative'
    })
  }, React.createElement(components.Control, _extends({}, props, {
    innerProps: innerProps
  })));
};
var _ref5 = {
  marginLeft: gridSize
};
export var Footer = function Footer(_ref4) {
  var text = _ref4.text,
      onClick = _ref4.onClick;
  return React.createElement("button", {
    className: _css2({
      background: 0,
      border: 0,
      boxShadow: "0 -2px 0 ".concat(colors.N40A),
      boxSizing: 'border-box',
      color: colors.N200,
      cursor: 'pointer',
      alignItems: 'center',
      display: 'flex',
      fontSize: 'inherit',
      padding: "".concat(gridSize * 1.5, "px ").concat(gridSize, "px"),
      position: 'relative',
      textAlign: 'left',
      width: '100%',
      ':hover, :focus': {
        color: colors.B300,
        outline: 0,
        textDecoration: 'underline'
      }
    }),
    onClick: onClick
  }, React.createElement(AddIcon, {
    label: "Add icon",
    size: "small"
  }), React.createElement("span", {
    className: _css3(_ref5)
  }, text));
};
var defaultComponents = {
  Control: Control,
  Option: Option
};

var isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}; // ==============================
// Class
// ==============================


var Switcher =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Switcher, _PureComponent);

  function Switcher() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Switcher);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Switcher)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      mergedComponents: defaultComponents
    });

    _defineProperty(_assertThisInitialized(_this), "selectRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "targetRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "targetWidth", 0);

    _defineProperty(_assertThisInitialized(_this), "resolveTargetRef", function (popupRef) {
      return function (ref) {
        // avoid thrashing fn calls
        if (!_this.targetRef && popupRef && ref) {
          _this.targetRef = ref;
          popupRef(ref);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setTargetWidth", function () {
      _this.targetWidth = _this.props.navWidth - gridSize * 2;
    });

    _defineProperty(_assertThisInitialized(_this), "getFooter", function () {
      var _this$props = _this.props,
          closeMenuOnCreate = _this$props.closeMenuOnCreate,
          create = _this$props.create,
          footer = _this$props.footer;
      if (footer) return footer;
      if (!create) return null;
      var onClick = create.onClick;

      if (closeMenuOnCreate) {
        onClick = function onClick(e) {
          if (_this.selectRef.current) {
            _this.selectRef.current.close();
          }

          create.onClick(e);
        };
      }

      return React.createElement(Footer, {
        text: create.text,
        onClick: onClick
      });
    });

    return _this;
  }

  _createClass(Switcher, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setTargetWidth();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref6) {
      var navWidth = _ref6.navWidth,
          isNavResizing = _ref6.isNavResizing;

      // reset the target width if the user has resized the navigation pane
      if (navWidth !== this.props.navWidth) {
        this.setTargetWidth();
      }

      if (isNavResizing && this.selectRef.current && this.selectRef.current.state.isOpen) {
        this.selectRef.current.close();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          create = _this$props2.create,
          options = _this$props2.options,
          _target = _this$props2.target,
          props = _objectWithoutProperties(_this$props2, ["create", "options", "target"]);

      var mergedComponents = this.state.mergedComponents;
      return React.createElement(PopupSelect, _extends({
        ref: this.selectRef,
        filterOption: filterOption,
        isOptionSelected: isOptionSelected,
        footer: this.getFooter(),
        getOptionValue: getOptionValue,
        options: options,
        maxMenuWidth: this.targetWidth,
        minMenuWidth: this.targetWidth,
        target: function target(_ref7) {
          var ref = _ref7.ref,
              isOpen = _ref7.isOpen;
          return React.createElement(NodeResolver, {
            innerRef: _this2.resolveTargetRef(ref)
          }, cloneElement(_target, {
            isSelected: isOpen
          }));
        }
      }, props, {
        styles: createStyles(this.props.styles),
        components: mergedComponents
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var newState = {}; // Merge consumer and default components

      var mergedComponents = _objectSpread({}, defaultComponents, props.components);

      if (!shallowEqualObjects(mergedComponents, state.mergedComponents)) {
        newState.mergedComponents = mergedComponents;
      }

      if (!isEmpty(newState)) return newState;
      return null;
    }
  }]);

  return Switcher;
}(PureComponent);

_defineProperty(Switcher, "defaultProps", {
  closeMenuOnCreate: true,
  components: {},
  navWidth: CONTENT_NAV_WIDTH,
  isNavResizing: false
});

export { Switcher as BaseSwitcher };
export default (function (props) {
  return React.createElement(UIControllerSubscriber, null, function (_ref8) {
    var state = _ref8.state;
    return React.createElement(Switcher, _extends({
      navWidth: state.productNavWidth,
      isNavResizing: state.isResizing
    }, props));
  });
});