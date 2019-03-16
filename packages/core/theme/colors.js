import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import themed from './utils/themed';
// Reds
export var R50 = '#FFEBE6';
export var R75 = '#FFBDAD';
export var R100 = '#FF8F73';
export var R200 = '#FF7452';
export var R300 = '#FF5630';
export var R400 = '#DE350B';
export var R500 = '#BF2600'; // Yellows

export var Y50 = '#FFFAE6';
export var Y75 = '#FFF0B3';
export var Y100 = '#FFE380';
export var Y200 = '#FFC400';
export var Y300 = '#FFAB00';
export var Y400 = '#FF991F';
export var Y500 = '#FF8B00'; // Greens

export var G50 = '#E3FCEF';
export var G75 = '#ABF5D1';
export var G100 = '#79F2C0';
export var G200 = '#57D9A3';
export var G300 = '#36B37E';
export var G400 = '#00875A';
export var G500 = '#006644'; // Blues

export var B50 = '#dbe3fa';
export var B75 = '#b8c7f6';
export var B100 = '#4f74ea';
export var B200 = '#2150e5';
export var B300 = '#1946d3';
export var B400 = '#2b4bb0';
export var B500 = '#1438a8'; // Purples

export var P50 = '#EAE6FF';
export var P75 = '#C0B6F2';
export var P100 = '#998DD9';
export var P200 = '#8777D9';
export var P300 = '#6554C0';
export var P400 = '#5243AA';
export var P500 = '#403294'; // Teals

export var T50 = '#E6FCFF';
export var T75 = '#B3F5FF';
export var T100 = '#79E2F2';
export var T200 = '#00C7E6';
export var T300 = '#00B8D9';
export var T400 = '#00A3BF';
export var T500 = '#008DA6'; // Neutrals

export var N0 = '#FFFFFF';
export var N10 = '#FAFBFC';
export var N20 = '#F4F5F7';
export var N30 = '#EBECF0';
export var N40 = '#DFE1E6';
export var N50 = '#C1C7D0';
export var N60 = '#B3BAC5';
export var N70 = '#A5ADBA';
export var N80 = '#97A0AF';
export var N90 = '#8993A4';
export var N100 = '#7A869A';
export var N200 = '#6B778C';
export var N300 = '#5E6C84';
export var N400 = '#505F79';
export var N500 = '#42526E';
export var N600 = '#344563';
export var N700 = '#253858';
export var N800 = '#172B4D'; // ATTENTION: update the tints if you update this

export var N900 = '#172246'; // Each tint is made of N900 and an alpha channel

export var N10A = 'rgba(23, 34, 70, 0.02)';
export var N20A = 'rgba(23, 34, 70, 0.04)';
export var N30A = 'rgba(23, 34, 70, 0.08)';
export var N40A = 'rgba(23, 34, 70, 0.13)';
export var N50A = 'rgba(23, 34, 70, 0.25)';
export var N60A = 'rgba(23, 34, 70, 0.31)';
export var N70A = 'rgba(23, 34, 70, 0.36)';
export var N80A = 'rgba(23, 34, 70, 0.42)';
export var N90A = 'rgba(23, 34, 70, 0.48)';
export var N100A = 'rgba(23, 34, 70, 0.54)';
export var N200A = 'rgba(23, 34, 70, 0.60)';
export var N300A = 'rgba(23, 34, 70, 0.66)';
export var N400A = 'rgba(23, 34, 70, 0.71)';
export var N500A = 'rgba(23, 34, 70, 0.77)';
export var N600A = 'rgba(23, 34, 70, 0.82)';
export var N700A = 'rgba(23, 34, 70, 0.89)';
export var N800A = 'rgba(23, 34, 70, 0.95)'; // Dark Mode Neutrals

export var DN900 = '#E6EDFA';
export var DN800 = '#DCE5F5';
export var DN700 = '#CED9EB';
export var DN600 = '#B8C7E0';
export var DN500 = '#ABBBD6';
export var DN400 = '#9FB0CC';
export var DN300 = '#8C9CB8';
export var DN200 = '#7988A3';
export var DN100 = '#67758F';
export var DN90 = '#56637A';
export var DN80 = '#455166';
export var DN70 = '#3B475C';
export var DN60 = '#313D52';
export var DN50 = '#283447';
export var DN40 = '#202B3D';
export var DN30 = '#1B2638';
export var DN20 = '#121A29';
export var DN10 = '#0E1624'; // ATTENTION: update the tints if you update this

export var DN0 = '#070b17'; // Each dark tint is made of DN0 and an alpha channel

export var DN800A = 'rgba(7, 11, 23, 0.06)';
export var DN700A = 'rgba(7, 11, 23, 0.14)';
export var DN600A = 'rgba(7, 11, 23, 0.18)';
export var DN500A = 'rgba(7, 11, 23, 0.29)';
export var DN400A = 'rgba(7, 11, 23, 0.36)';
export var DN300A = 'rgba(7, 11, 23, 0.40)';
export var DN200A = 'rgba(7, 11, 23, 0.47)';
export var DN100A = 'rgba(7, 11, 23, 0.53)';
export var DN90A = 'rgba(7, 11, 23, 0.63)';
export var DN80A = 'rgba(7, 11, 23, 0.73)';
export var DN70A = 'rgba(7, 11, 23, 0.78)';
export var DN60A = 'rgba(7, 11, 23, 0.81)';
export var DN50A = 'rgba(7, 11, 23, 0.85)';
export var DN40A = 'rgba(7, 11, 23, 0.89)';
export var DN30A = 'rgba(7, 11, 23, 0.92)';
export var DN20A = 'rgba(7, 11, 23, 0.95)';
export var DN10A = 'rgba(7, 11, 23, 0.97)'; // Themed colors

export var background = themed({
  light: N0,
  dark: DN30
});
export var backgroundActive = themed({
  light: B50,
  dark: B75
});
export var backgroundHover = themed({
  light: N30,
  dark: DN70
});
export var backgroundOnLayer = themed({
  light: N0,
  dark: DN50
});
export var text = themed({
  light: N900,
  dark: DN600
});
export var textHover = themed({
  light: N800,
  dark: DN600
});
export var textActive = themed({
  light: B400,
  dark: B400
});
export var subtleText = themed({
  light: N200,
  dark: DN300
});
export var placeholderText = themed({
  light: N100,
  dark: DN200
});
export var heading = themed({
  light: N800,
  dark: DN600
});
export var subtleHeading = themed({
  light: N200,
  dark: DN300
});
export var codeBlock = themed({
  light: N20,
  dark: DN50
});
export var link = themed({
  light: B400,
  dark: B100
});
export var linkHover = themed({
  light: B300,
  dark: B200
});
export var linkActive = themed({
  light: B500,
  dark: B100
});
export var linkOutline = themed({
  light: B100,
  dark: B200
});
export var primary = themed({
  light: B400,
  dark: B100
});
export var blue = themed({
  light: B400,
  dark: B100
});
export var teal = themed({
  light: T300,
  dark: T200
});
export var purple = themed({
  light: P300,
  dark: P100
});
export var red = themed({
  light: R300,
  dark: R300
});
export var yellow = themed({
  light: Y300,
  dark: Y300
});
export var green = themed({
  light: G300,
  dark: G300
}); // Jira Portfolio

export var colorPalette8 = [{
  background: N800,
  text: N0
}, {
  background: R400,
  text: N0
}, {
  background: P400,
  text: P50
}, {
  background: B400,
  text: B75
}, {
  background: T300,
  text: N800
}, {
  background: G400,
  text: N0
}, {
  background: Y400,
  text: N800
}, {
  background: N70,
  text: N800
}];
export var colorPalette16 = [].concat(colorPalette8, [{
  background: N500,
  text: N0
}, {
  background: R100,
  text: N800
}, {
  background: P75,
  text: N800
}, {
  background: B100,
  text: N800
}, {
  background: T100,
  text: N800
}, {
  background: G100,
  text: G500
}, {
  background: Y200,
  text: N800
}, {
  background: N0,
  text: N800
}]);
export var colorPalette24 = [].concat(_toConsumableArray(colorPalette16), [{
  background: N100,
  text: N0
}, {
  background: N40,
  text: N800
}, {
  background: N50,
  text: R500
}, {
  background: P50,
  text: P500
}, {
  background: B50,
  text: B500
}, {
  background: T75,
  text: N800
}, {
  background: G50,
  text: G500
}, {
  background: Y75,
  text: N800
}]);
export var colorPalette = function colorPalette() {
  var palette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '8';

  switch (palette) {
    case '8':
      return colorPalette8;

    case '16':
      return colorPalette16;

    case '24':
      return colorPalette24;

    default:
      throw new Error('The only available color palette is 8, 16, 24');
  }
};