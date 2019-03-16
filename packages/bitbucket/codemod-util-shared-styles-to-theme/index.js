import gridSizeTransform from './transforms/gridSize';
import gridSizeUnitlessTransform from './transforms/gridSizeUnitless';
import colorTransform from './transforms/color';
import borderRadiusTransform from './transforms/borderRadius';
import typographyTransform from './transforms/typography';
import codeFontTransform from './transforms/codeFont';
import fixRedundantRenamesTransform from './transforms/fixRedundantRenames';
import fontSize from './transforms/fontSize';
import fontFamily from './transforms/fontFamily';
import layers from './transforms/layers'; // This function gets called by jscodeshift.
// It gets passed the file info and a reference to the jscodeshift API.

export default function utilSharedStylesToThemeCodeshift(fileInfo, api) {
  var j = api.jscodeshift;
  var root = j(fileInfo.source);
  var transforms = [fontFamily, gridSizeTransform, gridSizeUnitlessTransform, colorTransform, borderRadiusTransform, typographyTransform, codeFontTransform, fontSize, layers, fixRedundantRenamesTransform];
  var transformed = root;
  transforms.forEach(function (transform) {
    transformed = transform(transformed, j);
  });
  return transformed.toSource({
    quote: 'double'
  });
}