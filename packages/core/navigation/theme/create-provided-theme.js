// 'chromatism' adds 1.9kb to the bundle.
// After the nwb merge it should be able to be tree shaken out for those who are not using it
import chromatism from 'chromatism';
import * as presets from './presets';
var globalTheme = presets.global; // eslint-disable-next-line import/prefer-default-export

export var createGlobalTheme = function createGlobalTheme(text, background) {
  var active = chromatism.brightness(10, background).hex;
  var item = {
    default: {
      background: 'transparent'
    },
    hover: {
      background: chromatism.brightness(-10, background).hex
    },
    active: {
      background: active
    },
    selected: {
      background: chromatism.brightness(-20, background).hex,
      text: text
    },
    focus: {
      outline: text
    },
    dragging: {
      background: active
    }
  }; // Here we take the default global theme and selectively override some of the customisable values
  // with values based on the function input. We are currently not encouraging the overriding of
  // these default properties.

  var customisedGlobal = {
    background: {
      primary: background,
      secondary: background,
      tertiary: globalTheme.background.tertiary
    },
    text: text,
    subText: chromatism.brightness(20, text).hex,
    keyline: globalTheme.keyline,
    item: item,
    dropdown: globalTheme.dropdown
  };
  return customisedGlobal;
};