import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { css as _css2 } from "emotion";
import { css as _css } from "emotion";
import React from 'react';
import { groupedCountries } from './data/countries';
import Select from './Select'; // flow stuff

// custom option renderer
var labelCSS = function labelCSS() {
  return {
    alignItems: 'center',
    display: 'flex',
    lineHeight: 1.2
  };
};

var flagCSS = function flagCSS() {
  return {
    fontSize: '18px',
    marginRight: '8px'
  };
};

var Opt = function Opt(_ref) {
  var children = _ref.children,
      icon = _ref.icon;
  return React.createElement("div", {
    className: _css(labelCSS())
  }, React.createElement("span", {
    className: _css2(flagCSS())
  }, icon), children);
}; // return the country name; used for searching


var getOptionLabel = function getOptionLabel(opt) {
  return opt.name;
}; // set the country's abbreviation for the option value, (also searchable)


var getOptionValue = function getOptionValue(opt) {
  return opt.abbr;
}; // the text node of the control


var controlLabel = function controlLabel(opt) {
  return React.createElement(Opt, {
    icon: opt.icon
  }, opt.abbr.toUpperCase());
}; // the text node for an option


var optionLabel = function optionLabel(_ref2) {
  var abbr = _ref2.abbr,
      code = _ref2.code,
      icon = _ref2.icon,
      name = _ref2.name;
  return React.createElement(Opt, {
    icon: icon
  }, name, " (", abbr.toUpperCase(), ") +", code);
}; // switch formatters based on render context (menu | value)


var formatOptionLabel = function formatOptionLabel(opt, _ref3) {
  var context = _ref3.context;
  return context === 'value' ? controlLabel(opt) : optionLabel(opt);
}; // put it all together


var CountrySelect = function CountrySelect(props) {
  return React.createElement(Select, _extends({
    isClearable: false,
    formatOptionLabel: formatOptionLabel,
    getOptionLabel: getOptionLabel,
    getOptionValue: getOptionValue,
    isMulti: false,
    options: groupedCountries,
    styles: {
      container: function container(css) {
        return _objectSpread({}, css, {
          width: 105
        });
      },
      dropdownIndicator: function dropdownIndicator(css) {
        return _objectSpread({}, css, {
          paddingLeft: 0
        });
      },
      menu: function menu(css) {
        return _objectSpread({}, css, {
          width: 300
        });
      }
    }
  }, props));
};

export default CountrySelect;