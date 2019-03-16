import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import rafSchedule from 'raf-schd';
// Need to make outer div full height in case consumer wants to align
// child content vertically center. These styles can be overridden by the
// product using the optional SizeDetector.containerStyle prop.
var containerDivStyle = {
  height: '100%',
  flex: '1 0 auto',
  position: 'relative'
}; // Not using styled-components here for performance
// and framework-agnostic reasons.

var objectStyle = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  opacity: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: -1
};

var SizeDetector =
/*#__PURE__*/
function (_Component) {
  _inherits(SizeDetector, _Component);

  function SizeDetector() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SizeDetector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SizeDetector)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "resizeObjectDocument", void 0);

    _defineProperty(_assertThisInitialized(_this), "containerRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "objectElementRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      sizeMetrics: {
        width: null,
        height: null
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleObjectLoad", function () {
      if (!_this.objectElementRef.current) {
        return;
      }

      _this.resizeObjectDocument = _this.objectElementRef.current.contentDocument.defaultView;

      _this.resizeObjectDocument.addEventListener('resize', _this.handleResize);

      _this.handleResize();
    });

    _defineProperty(_assertThisInitialized(_this), "handleResize", rafSchedule(function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          containerRef = _assertThisInitialize.containerRef;

      if (!containerRef.current) {
        return;
      }

      var sizeMetrics = {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      };

      _this.setState({
        sizeMetrics: sizeMetrics
      });

      if (_this.props.onResize) {
        _this.props.onResize(sizeMetrics);
      }
    }));

    return _this;
  }

  _createClass(SizeDetector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.objectElementRef.current) {
        this.objectElementRef.current.data = 'about:blank';
      }

      this.handleResize();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleResize.cancel();

      if (this.resizeObjectDocument) {
        this.resizeObjectDocument.removeEventListener('resize', this.handleResize);
      }
    } // Attach the resize event to object when it loads

  }, {
    key: "render",
    value: function render() {
      var sizeMetrics = this.state.sizeMetrics;
      var children = this.props.children;
      return React.createElement("div", {
        style: _objectSpread({}, containerDivStyle, this.props.containerStyle),
        ref: this.containerRef
      }, React.createElement("object", {
        type: "text/html",
        style: objectStyle,
        ref: this.objectElementRef,
        onLoad: this.handleObjectLoad,
        "aria-hidden": true,
        tabIndex: -1
      }), children(sizeMetrics));
    }
  }]);

  return SizeDetector;
}(Component);

_defineProperty(SizeDetector, "defaultProps", {
  containerStyle: {}
});

export { SizeDetector as default };