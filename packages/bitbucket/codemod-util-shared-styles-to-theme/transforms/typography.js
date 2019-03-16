import { addNamedImport, removeNamedImport } from '../utils';
export default function gridSizeUnitlessTransform(root, j) {
  // Check if we import shared styles
  var sharedStylesImport = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: '@atlaskit/util-shared-styles'
    }
  });

  if (!sharedStylesImport.size()) {
    return root;
  }

  var typogImportSpecifier = sharedStylesImport.find(j.ImportSpecifier, {
    imported: {
      name: 'akTypographyMixins'
    }
  });

  if (!typogImportSpecifier.size()) {
    return root;
  } // Find what we are calling akGridSizeUnitless locally


  var localName = typogImportSpecifier.get(0).node.local.name;
  root.find(j.MemberExpression, {
    object: {
      type: 'Identifier',
      name: localName
    }
  }).replaceWith(function (nodePath) {
    return j.memberExpression(j.identifier(localName), j.callExpression(j.identifier(nodePath.value.property.name), []));
  });
  addNamedImport(root, j, '@atlaskit/theme', 'typography', localName, sharedStylesImport);
  removeNamedImport(root, j, '@atlaskit/util-shared-styles', 'akTypographyMixins', typogImportSpecifier);
  return root;
}