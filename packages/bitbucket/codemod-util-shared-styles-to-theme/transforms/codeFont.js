import { addNamedImport, removeNamedImport } from '../utils';
export default function codeFont(root, j) {
  // Check if we import shared styles
  var sharedStylesImport = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: '@findable/util-shared-styles'
    }
  });

  if (!sharedStylesImport.size()) {
    return root;
  }

  var codeFontImportSpecifier = sharedStylesImport.find(j.ImportSpecifier, {
    imported: {
      name: 'akCodeFontFamily'
    }
  });

  if (!codeFontImportSpecifier.size()) {
    return root;
  } // Find what we are calling akGridSizeUnitless locally


  var localName = codeFontImportSpecifier.get(0).node.local.name; // Convert uses of the old akCodeFontFamily to template `${akCodeFontFamily()}px`

  root.find(j.Identifier, {
    name: localName
  }).replaceWith(function () {
    return j.callExpression(j.identifier(localName), []);
  });
  addNamedImport(root, j, '@findable/theme', 'codeFontFamily', localName, sharedStylesImport);
  removeNamedImport(root, j, '@findable/util-shared-styles', 'akCodeFontFamily', codeFontImportSpecifier);
  return root;
}