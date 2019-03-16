import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import GlobalTheme from '@atlaskit/theme';
import React, { PureComponent } from 'react';
import { canUseDOM } from 'exenv';
import { Slot, ShapeGroup, Svg } from '../styled/AvatarImage';
export function DefaultImage(_ref) {
  var appearance = _ref.appearance,
      size = _ref.size,
      title = _ref.title,
      isLoading = _ref.isLoading;
  var rectBounds = 128;
  return React.createElement(GlobalTheme.Consumer, null, function (_ref2) {
    var mode = _ref2.mode;
    return React.createElement(Svg, {
      appearance: appearance,
      isLoading: isLoading,
      size: size,
      viewBox: "0 0 ".concat(rectBounds, " ").concat(rectBounds),
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      role: "img",
      "aria-label": title
    }, appearance === 'circle' ? React.createElement(ShapeGroup, {
      mode: mode
    }, React.createElement("circle", {
      cx: "64",
      cy: "64",
      r: "64"
    }), React.createElement("g", null, React.createElement("path", {
      d: "M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
    }), React.createElement("path", {
      d: "M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
    }))) : React.createElement(ShapeGroup, {
      mode: mode
    }, React.createElement("rect", {
      x: "0",
      y: "0",
      width: rectBounds,
      height: rectBounds
    }), React.createElement("g", {
      transform: "translate(19.000000, 32.000000)"
    }, React.createElement("path", {
      d: "M18.25,32.5 L54.5833333,32.5 L54.5833333,23.4166667 L18.25,23.4166667 L18.25,32.5 Z M9.16666667,18.8331166 C9.16666667,16.3479549 11.236581,14.3333333 13.7195662,14.3333333 L59.1137671,14.3333333 C61.6282641,14.3333333 63.6666667,16.3815123 63.6666667,18.8331166 L63.6666667,41.5833333 L9.16666667,41.5833333 L9.16666667,18.8331166 Z"
    }), React.createElement("path", {
      d: "M18.25,9.81383682 C18.25,4.7850061 22.3296003,0.708333333 27.3238554,0.708333333 L36.4261446,0.708333333 C41.4374965,0.708333333 45.5,4.76812825 45.5,9.81383682 L45.5,23.4166667 L18.25,23.4166667 L18.25,9.81383682 Z M36.4166667,9.81383682 C36.4166667,9.79803315 36.4184748,9.79303784 36.4207515,9.79166667 L27.3238554,9.79166667 C27.3447224,9.79166667 27.3333333,9.80308059 27.3333333,9.81383682 L27.3333333,14.3333333 L36.4166667,14.3333333 L36.4166667,9.81383682 Z"
    }), React.createElement("path", {
      d: "M11.4386532,55.2083333 L74.9953562,55.2083333 L79.5452242,41.5833333 L9.80449752,41.5833333 L11.4386532,55.2083333 Z M0.1048547,36.987541 C-0.192399775,34.5091405 1.5865717,32.5 4.09502839,32.5 L87.6264735,32.5 C90.1274401,32.5 91.5225656,34.393506 90.7231047,36.7875656 L82.9702846,60.004101 C82.1795402,62.3720582 79.5279445,64.2916667 76.9985338,64.2916667 L7.91963924,64.2916667 C5.41227673,64.2916667 3.14113571,62.3029555 2.84143097,59.8041257 L0.1048547,36.987541 Z"
    }))));
  });
}
var cache = {};
export var clearCache = function clearCache() {
  cache = {};
};

var AvatarImage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AvatarImage, _PureComponent);

  function AvatarImage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AvatarImage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AvatarImage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasError: false,
      // if provided a src - we need to load it
      isLoading: Boolean(_this.props.src)
    });

    _defineProperty(_assertThisInitialized(_this), "isComponentMounted", void 0);

    _defineProperty(_assertThisInitialized(_this), "loadImage", function () {
      // nothing to load
      if (!_this.props.src) {
        return;
      }

      var img = new Image();
      img.onload = _this.handleLoadSuccess;
      img.onerror = _this.handleLoadError;
      img.src = _this.props.src;
    });

    _defineProperty(_assertThisInitialized(_this), "handleLoad", function (hasError) {
      if (_this.isComponentMounted) {
        _this.setState({
          hasError: hasError,
          isLoading: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLoadSuccess", function () {
      if (typeof _this.props.src === 'string') {
        cache[_this.props.src] = true;
      }

      _this.handleLoad(false);
    });

    _defineProperty(_assertThisInitialized(_this), "handleLoadError", function () {
      _this.handleLoad(true);
    });

    return _this;
  }

  _createClass(AvatarImage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isComponentMounted = true;
      this.loadImage();
    } // handle case where `src` is modified after mount

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.src && this.props.src !== nextProps.src) {
        this.setState({
          isLoading: true
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.src && this.props.src !== prevProps.src) {
        this.loadImage();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isComponentMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          alt = _this$props.alt,
          src = _this$props.src,
          appearance = _this$props.appearance,
          size = _this$props.size;
      var _this$state = this.state,
          hasError = _this$state.hasError,
          isLoading = _this$state.isLoading;
      var showDefault = !isLoading && (!src || hasError);
      var imageUrl = src && (!isLoading || cache[src] || !canUseDOM) ? src : null;
      return showDefault ? React.createElement(DefaultImage, {
        appearance: appearance,
        size: size,
        title: alt,
        isLoading: isLoading
      }) : React.createElement(Slot, {
        appearance: appearance,
        isLoading: isLoading,
        size: size,
        role: "img",
        label: alt,
        backgroundImage: imageUrl
      });
    }
  }]);

  return AvatarImage;
}(PureComponent);

export { AvatarImage as default };