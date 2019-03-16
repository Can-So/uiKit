import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent, createContext } from 'react';
import memoizeOne from 'memoize-one';
import Portal from '@findable/portal';
import { layers } from '@findable/theme';
import { Fade } from './Animation';
import Blanket from '../styled/Blanket';

var noop = function noop() {};

var _createContext = createContext(),
    TargetConsumer = _createContext.Consumer,
    TargetProvider = _createContext.Provider;

var _createContext2 = createContext({
  opened: noop,
  closed: noop,
  targets: {}
}),
    SpotlightStateConsumer = _createContext2.Consumer,
    SpotlightStateProvider = _createContext2.Provider;

export { TargetConsumer };
export { SpotlightStateConsumer as SpotlightConsumer };

var Container = function Container(_ref) {
  var Wrapper = _ref.component,
      children = _ref.children;
  return React.createElement(Wrapper, null, children);
};

var SpotlightManager =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SpotlightManager, _PureComponent);

  function SpotlightManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SpotlightManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SpotlightManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      spotlightCount: 0,
      targets: {}
    });

    _defineProperty(_assertThisInitialized(_this), "targetRef", function (name) {
      return function (element) {
        _this.setState(function (state) {
          return {
            targets: _objectSpread({}, state.targets, _defineProperty({}, name, element || undefined))
          };
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "spotlightOpen", function () {
      _this.setState(function (state) {
        return {
          spotlightCount: state.spotlightCount + 1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "spotlightClose", function () {
      _this.setState(function (state) {
        return {
          spotlightCount: state.spotlightCount - 1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getStateProviderValue", memoizeOne(function (targets) {
      return {
        opened: _this.spotlightOpen,
        closed: _this.spotlightClose,
        targets: targets
      };
    }));

    return _this;
  }

  _createClass(SpotlightManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (process.env.NODE_ENV !== 'production') {
        if (this.props.component) {
          // eslint-disable-next-line no-console
          console.warn("Atlaskit: The SpotlightManager 'component' prop is deprecated. Please wrap the SpotlightManager in the component instead.");
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          blanketIsTinted = _this$props.blanketIsTinted,
          children = _this$props.children,
          Tag = _this$props.component;
      return React.createElement(SpotlightStateProvider, {
        value: this.getStateProviderValue(this.state.targets)
      }, React.createElement(TargetProvider, {
        value: this.targetRef
      }, React.createElement(Container, {
        component: Tag || React.Fragment
      }, React.createElement(Fade, {
        in: this.state.spotlightCount > 0
      }, function (animationStyles) {
        return React.createElement(Portal, {
          zIndex: layers.spotlight()
        }, React.createElement(Blanket, {
          style: animationStyles,
          isTinted: blanketIsTinted
        }));
      }), children)));
    }
  }]);

  return SpotlightManager;
}(PureComponent);

_defineProperty(SpotlightManager, "defaultProps", {
  blanketIsTinted: true
});

export { SpotlightManager as default };