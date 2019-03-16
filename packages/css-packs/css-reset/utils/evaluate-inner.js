import _typeof from "@babel/runtime/helpers/typeof";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import hyphenate from 'fbjs/lib/hyphenateStyleName';
/**
 * The below code is inspired by the css function in styled components
 * https://github.com/styled-components/styled-components/blob/master/src/constructors/css.js
 */

export default function evaluateInner(styles) {
  for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  return flatten(interleave(styles, interpolations)).join('');
}

function interleave(strings, interpolations) {
  var result = [strings[0]];

  for (var i = 0; i < interpolations.length; i++) {
    result.push(interpolations[i], strings[i + 1]);
  }

  return result;
}

function flatten(chunks) {
  var executionContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    theme: {
      __ATLASKIT_THEME__: {
        mode: 'light'
      }
    }
  };
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') {
      return ruleSet;
    }
    /* Flatten ruleSet */


    if (Array.isArray(chunk)) {
      ruleSet.push.apply(ruleSet, _toConsumableArray(flatten(chunk, executionContext)));
      return ruleSet;
    }
    /* Either execute or defer the function */


    if (typeof chunk === 'function') {
      if (executionContext) {
        var nextChunk = chunk(executionContext);
        ruleSet.push.apply(ruleSet, _toConsumableArray(flatten([nextChunk], executionContext)));
      } else ruleSet.push(chunk);

      return ruleSet;
    } //$FlowFixMe


    ruleSet.push(isPlainObject(chunk) ? objToCss(chunk) : chunk.toString());
    return ruleSet;
  }, []);
}

function isPlainObject(x) {
  return _typeof(x) === 'object' && x.constructor === Object;
}

function objToCss(obj, prevKey) {
  var css = Object.keys(obj).filter(function (key) {
    var chunk = obj[key];
    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
  }).map(function (key) {
    if (isPlainObject(obj[key])) return objToCss(obj[key], key);
    return "".concat(hyphenate(key), ": ").concat(obj[key], ";");
  }).join(' ');
  return prevKey ? "".concat(prevKey, " {\n    ").concat(css, "\n  }") : css;
}