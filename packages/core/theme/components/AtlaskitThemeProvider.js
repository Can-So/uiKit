import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import exenv from 'exenv';
import * as colors from '../colors';
import { CHANNEL, DEFAULT_THEME_MODE } from '../constants'; // For forward-compat until everything is upgraded.

import Theme from './Theme';

function getStylesheetResetCSS(state) {
  var backgroundColor = colors.background(state);
  return "\n    body { background: ".concat(backgroundColor, "; }\n  ");
}

function buildThemeState(mode) {
  return {
    theme: _defineProperty({}, CHANNEL, {
      mode: mode
    })
  };
}

var LegacyReset = styled.div.withConfig({
  displayName: "AtlaskitThemeProvider__LegacyReset",
  componentId: "sc-431dkp-0"
})(["\n  background-color: ", ";\n  color: ", ";\n\n  a {\n    color: ", ";\n  }\n  a:hover {\n    color: ", ";\n  }\n  a:active {\n    color: ", ";\n  }\n  a:focus {\n    outline-color: ", ";\n  }\n  h1 {\n    color: ", ";\n  }\n  h2 {\n    color: ", ";\n  }\n  h3 {\n    color: ", ";\n  }\n  h4 {\n    color: ", ";\n  }\n  h5 {\n    color: ", ";\n  }\n  h6 {\n    color: ", ";\n  }\n  small {\n    color: ", ";\n  }\n"], colors.background, colors.text, colors.link, colors.linkHover, colors.linkActive, colors.linkOutline, colors.heading, colors.heading, colors.heading, colors.heading, colors.heading, colors.subtleHeading, colors.subtleText);

var AtlaskitThemeProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(AtlaskitThemeProvider, _Component);

  function AtlaskitThemeProvider(props) {
    var _this;

    _classCallCheck(this, AtlaskitThemeProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AtlaskitThemeProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "stylesheet", void 0);

    _this.state = buildThemeState(props.mode);
    return _this;
  }

  _createClass(AtlaskitThemeProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        hasAtlaskitThemeProvider: true
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!this.context.hasAtlaskitThemeProvider && exenv.canUseDOM) {
        var css = getStylesheetResetCSS(this.state);
        this.stylesheet = document.createElement('style');
        this.stylesheet.type = 'text/css';
        this.stylesheet.innerHTML = css;

        if (document && document.head) {
          document.head.appendChild(this.stylesheet);
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.mode !== this.props.mode) {
        var newThemeState = buildThemeState(newProps.mode);

        if (this.stylesheet) {
          var css = getStylesheetResetCSS(newThemeState);
          this.stylesheet.innerHTML = css;
        }

        this.setState(newThemeState);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.stylesheet && document && document.head) {
        document.head.removeChild(this.stylesheet);
        delete this.stylesheet;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var theme = this.state.theme;
      return (
        /* Wrapping the new provider around the old one provides forward
        compatibility when using the old provider for styled components. This
        allows us to use components converted to use the new API with consumers
        using the old provider along side components that may still be using the
        old theming API. */
        React.createElement(Theme.Provider, {
          value: function value() {
            return {
              mode: theme[CHANNEL].mode
            };
          }
        }, React.createElement(ThemeProvider, {
          theme: theme
        }, React.createElement(LegacyReset, null, children)))
      );
    }
  }]);

  return AtlaskitThemeProvider;
}(Component);

_defineProperty(AtlaskitThemeProvider, "defaultProps", {
  mode: DEFAULT_THEME_MODE
});

_defineProperty(AtlaskitThemeProvider, "childContextTypes", {
  hasAtlaskitThemeProvider: PropTypes.bool
});

_defineProperty(AtlaskitThemeProvider, "contextTypes", {
  hasAtlaskitThemeProvider: PropTypes.bool
});

export { AtlaskitThemeProvider as default };