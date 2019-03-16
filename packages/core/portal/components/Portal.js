import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import ReactDOM from 'react-dom';
import invariant from 'tiny-invariant';
import { canUseDOM } from 'exenv';

var createContainer = function createContainer(zIndex) {
  var container = document.createElement('div');
  container.setAttribute('class', 'atlaskit-portal');
  container.setAttribute('style', "z-index: ".concat(zIndex, ";"));
  return container;
};

var body = function body() {
  invariant(document && document.body, 'cannot find document.body');
  return document.body;
};

var portalParent = function portalParent() {
  var parentElement = document.querySelector('body > .atlaskit-portal-container');

  if (!parentElement) {
    var parent = document.createElement('div');
    parent.setAttribute('class', 'atlaskit-portal-container');
    parent.setAttribute('style', "display: flex;");
    body().appendChild(parent);
    return parent;
  }

  return parentElement;
}; // This is a generic component does two things:
// 1. Portals it's children using React.createPortal
// 2. Creates the DOM node container for the portal based on props
// 3. Ensures DOM the container creates it's own stacking context


var Portal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Portal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      container: canUseDOM ? createContainer(_this.props.zIndex) : undefined,
      portalIsMounted: false
    });

    return _this;
  }

  _createClass(Portal, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var container = this.state.container;
      var zIndex = this.props.zIndex;

      if (container && prevProps.zIndex !== zIndex) {
        var newContainer = createContainer(zIndex);
        portalParent().replaceChild(container, newContainer); // eslint-disable-next-line react/no-did-update-set-state

        this.setState({
          container: newContainer
        });
      } else if (!prevState.container && container) {
        // SSR path
        portalParent().appendChild(container);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var container = this.state.container;
      var zIndex = this.props.zIndex;

      if (container) {
        portalParent().appendChild(container);
      } else {
        // SSR path
        var newContainer = createContainer(zIndex); // eslint-disable-next-line react/no-did-mount-set-state

        this.setState({
          container: newContainer
        });
      } // eslint-disable-next-line react/no-did-mount-set-state


      this.setState({
        portalIsMounted: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var container = this.state.container;

      if (container) {
        portalParent().removeChild(container); // clean up parent element if there are no more portals

        var portals = !!document.querySelector('body > .atlaskit-portal-container > .atlaskit-portal');

        if (!portals) {
          body().removeChild(portalParent());
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          container = _this$state.container,
          portalIsMounted = _this$state.portalIsMounted;
      return container && portalIsMounted ? ReactDOM.createPortal(this.props.children, container) : null;
    }
  }]);

  return Portal;
}(React.Component);

_defineProperty(Portal, "defaultProps", {
  zIndex: 0
});

export default Portal;