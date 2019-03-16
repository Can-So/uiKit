import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Children, Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { withTheme, ThemeProvider } from 'styled-components';
import { TransitionGroup } from 'react-transition-group';

var FirstChild = function FirstChild(_ref) {
  var children = _ref.children;
  return Children.toArray(children)[0] || null;
};

var Portal =
/*#__PURE__*/
function (_Component) {
  _inherits(Portal, _Component);

  function Portal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Portal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "portalElement", null);

    _defineProperty(_assertThisInitialized(_this), "mountTimeout", null);

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function (children) {
      var _this$props = _this.props,
          theme = _this$props.theme,
          withTransitionGroup = _this$props.withTransitionGroup;
      return React.createElement(ThemeProvider, {
        theme: theme
      }, withTransitionGroup ? React.createElement(TransitionGroup, {
        component: FirstChild
      }, children) : children);
    });

    return _this;
  }

  _createClass(Portal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var node = document.createElement('span');

      if (document.body) {
        document.body.appendChild(node);
        this.portalElement = node; // mounting components in portals can have side effects (e.g. modals
        // applying scroll / focus locks). Because the unmounting of other portals
        // happens asynchronously, we wait for a moment before mounting new
        // portals to avoid race conditions in unmount handlers

        this.mountTimeout = setTimeout(function () {
          return _this2.componentDidUpdate();
        }, 1);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var children = this.props.children;

      if (this.portalElement) {
        var portal = this.portalElement;
        render(this.renderChildren(children), portal);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // re-render an empty react tree into the portal element so that any
      // mounted components get cleaned up and have a chance to complete their
      // lifecycle before the portal is removed from the dom entirely
      if (this.mountTimeout) {
        clearTimeout(this.mountTimeout);
      }

      if (this.portalElement) {
        var portal = this.portalElement;
        render(this.renderChildren(), portal, function () {
          // allow time for transitions to complete before the dom is cleaned up
          // five seconds is an arbitary number, but is more than any of our
          // animations need to complete
          setTimeout(function () {
            var target = document.body;
            if (!target) return;
            unmountComponentAtNode(portal);
            target.removeChild(portal);
          }, 5000);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Portal;
}(Component); // Pass theme through to be consumed
// TODO: @thejameskyle - Fix Styled Components for Flow 53+


var PortalWithTheme = withTheme(Portal); // Wrap the default export in a ThemeProvider component so that withTheme
// doesn't freak out if the app doesn't have one already

export default function PortalWithThemeProvider(props) {
  return React.createElement(ThemeProvider, {
    theme: {}
  }, React.createElement(PortalWithTheme, props));
}