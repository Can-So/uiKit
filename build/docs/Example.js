import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';
import styled from 'styled-components';
import { colors, gridSize, themed } from '@findable/theme';
import { AkCodeBlock } from '@findable/code';
import ToggleIcon from '@findable/icon/glyph/code';
import ErrorBoundary from './ErrorBoundary';
import replaceSrc from './replaceSrc';

var Example =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Example, _React$Component);

    function Example() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Example);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(
        this,
        (_getPrototypeOf2 = _getPrototypeOf(Example)).call.apply(
          _getPrototypeOf2,
          [this].concat(args),
        ),
      );

      _defineProperty(_assertThisInitialized(_this), 'state', {
        isSourceVisible: false,
        isHover: false,
      });

      _defineProperty(
        _assertThisInitialized(_this),
        'toggleSource',
        function() {
          _this.setState({
            isSourceVisible: !_this.state.isSourceVisible,
          });
        },
      );

      _defineProperty(_assertThisInitialized(_this), 'onError', function(
        error,
        info,
      ) {
        console.error(error);
        console.error(info);
      });

      return _this;
    }

    _createClass(Example, [
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var _this$props = this.props,
            Component = _this$props.Component,
            source = _this$props.source,
            language = _this$props.language,
            title = _this$props.title,
            packageName = _this$props.packageName;
          var _this$state = this.state,
            isHover = _this$state.isHover,
            isSourceVisible = _this$state.isSourceVisible;
          var toggleLabel = isSourceVisible
            ? 'Hide Code Snippet'
            : 'Show Code Snippet';
          var state = isHover ? 'hover' : 'normal';
          var mode = isSourceVisible ? 'open' : 'closed';
          return React.createElement(
            Wrapper,
            {
              state: state,
              mode: mode,
            },
            React.createElement(
              Toggle,
              {
                onClick: this.toggleSource,
                onMouseOver: function onMouseOver() {
                  return _this2.setState({
                    isHover: true,
                  });
                },
                onMouseOut: function onMouseOut() {
                  return _this2.setState({
                    isHover: false,
                  });
                },
                title: toggleLabel,
                mode: mode,
              },
              React.createElement(
                ToggleTitle,
                {
                  mode: mode,
                },
                title,
              ),
              React.createElement(ToggleIcon, {
                label: toggleLabel,
              }),
            ),
            isSourceVisible
              ? React.createElement(
                  CodeWrapper,
                  null,
                  React.createElement(AkCodeBlock, {
                    text: packageName
                      ? replaceSrc(source, packageName)
                      : source,
                    language: language,
                    showLineNumbers: false,
                  }),
                )
              : null,
            React.createElement(
              Showcase,
              null,
              React.createElement(
                ErrorBoundary,
                {
                  onError: this.onError,
                },
                React.createElement(Component, null),
              ),
            ),
          );
        },
      },
    ]);

    return Example;
  })(React.Component);

_defineProperty(Example, 'defaultProps', {
  language: 'javascript',
});

export { Example as default };
var TRANSITION_DURATION = '200ms';
var exampleBackgroundColor = {
  open: themed('state', {
    normal: {
      light: colors.N30,
      dark: colors.N700,
    },
    hover: {
      light: colors.N40,
      dark: colors.N600,
    },
  }),
  closed: themed('state', {
    normal: {
      light: colors.N20,
      dark: colors.DN50,
    },
    hover: {
      light: colors.N40,
      dark: colors.DN60,
    },
  }),
};
var toggleColor = themed('mode', {
  closed: {
    light: colors.N600,
    dark: colors.DN100,
  },
  open: {
    light: colors.N600,
    dark: colors.DN100,
  },
});
var Wrapper = styled.div.withConfig({
  displayName: 'Example__Wrapper',
  componentId: 'sc-1iit96v-0',
})(
  [
    '\n  background-color: ',
    ';\n  border-radius: 5px;\n  color: ',
    ';\n  margin-top: 20px;\n  padding: 0 ',
    'px ',
    'px;\n  transition: background-color ',
    ';\n',
  ],
  function(p) {
    return exampleBackgroundColor[p.mode];
  },
  toggleColor,
  gridSize,
  gridSize,
  TRANSITION_DURATION,
);
export var Toggle = styled.div.withConfig({
  displayName: 'Example__Toggle',
  componentId: 'sc-1iit96v-1',
})(
  [
    '\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  padding: ',
    'px;\n  transition: color ',
    ', fill ',
    ';\n',
  ],
  gridSize,
  TRANSITION_DURATION,
  TRANSITION_DURATION,
); // NOTE: use of important necessary to override element targeted headings

export var ToggleTitle = styled.h4.withConfig({
  displayName: 'Example__ToggleTitle',
  componentId: 'sc-1iit96v-2',
})(['\n  color: ', ' !important;\n  margin: 0;\n'], toggleColor);
var Showcase = styled.div.withConfig({
  displayName: 'Example__Showcase',
  componentId: 'sc-1iit96v-3',
})(
  [
    '\n  background-color: ',
    ';\n  border-radius: 3px;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n  padding: ',
    'px;\n',
  ],
  colors.background,
  gridSize,
);
var CodeWrapper = styled.div.withConfig({
  displayName: 'Example__CodeWrapper',
  componentId: 'sc-1iit96v-4',
})(['\n  margin: 0 0 ', 'px;\n'], gridSize);
