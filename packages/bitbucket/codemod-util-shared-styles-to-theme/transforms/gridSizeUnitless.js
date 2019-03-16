import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { getSharedStyles, addNamedImport, removeNamedImport } from '../utils';
export default function gridSizeUnitless(root, j) {
  // Check if we import shared styles
  var sharedStylesCollections = getSharedStyles(root, j);

  if (!sharedStylesCollections) {
    return root;
  }

  var _sharedStylesCollecti = _slicedToArray(sharedStylesCollections, 3),
      sharedStylesImport = _sharedStylesCollecti[0],
      gridSizeImportSpecifier = _sharedStylesCollecti[1],
      oldLocalName = _sharedStylesCollecti[2]; // There is a chance that gridSize is already imported from akTheme under
  // a different name, so we reassign that here.


  var localName = addNamedImport(root, j, '@atlaskit/theme', 'gridSize', oldLocalName, sharedStylesImport);
  root.find(j.Identifier, {
    name: oldLocalName
  }).filter(function (node) {
    return j(node).closest(j.ImportDeclaration).size() === 0;
  }).filter(function (node) {
    return j(node).closest(j.CallExpression).size() === 0;
  }).replaceWith(function () {
    return j.callExpression(j.identifier(localName), []);
  });
  removeNamedImport(root, j, '@atlaskit/util-shared-styles', 'akGridSizeUnitless', gridSizeImportSpecifier);
  return root;
}