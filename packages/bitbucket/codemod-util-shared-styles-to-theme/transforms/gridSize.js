import { addNamedImport, removeNamedImport } from '../utils';
export default function gridSize(root, j) {
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

  var importSpecifier = sharedStylesImport.find(j.ImportSpecifier, {
    imported: {
      name: 'akGridSize'
    }
  });

  if (!importSpecifier.size()) {
    return root;
  } // Find what we are calling akGridSizeUnitless locally


  var localName = importSpecifier.get(0).node.local.name; // There is a chance that gridSize is already imported from akTheme under
  // a different name, so we reassign that here.

  localName = addNamedImport(root, j, '@atlaskit/theme', 'gridSize', localName, sharedStylesImport); // Convert uses of the old akBorderRadius to template `${akBorderRadius()}px`

  root.find(j.Identifier, {
    name: localName
  }).filter(function (node) {
    return j(node).closest(j.ImportDeclaration).size() === 0;
  }).filter(function (node) {
    return j(node).closest(j.CallExpression).size() === 0;
  }).replaceWith(function () {
    return j.templateLiteral([j.templateElement({
      cooked: '',
      raw: ''
    }, false), j.templateElement({
      cooked: 'px',
      raw: 'px'
    }, true)], [j.callExpression(j.identifier(localName), [])]);
  }); // Fix up double-templated gridSize calls

  root.find(j.Identifier, {
    name: localName
  }).filter(function (node) {
    var n = j(node);
    var isInsideTemplateLiteral = n.closest(j.TemplateLiteral).closest(j.TemplateLiteral).size() > 0;
    return isInsideTemplateLiteral;
  }).forEach(function (node) {
    var n = j(node);
    var parentTemplateLiteral = n.closest(j.TemplateLiteral);
    var grandparentTemplateLiteral = parentTemplateLiteral.closest(j.TemplateLiteral);
    var indexOfParentLiteral = grandparentTemplateLiteral.get().node.expressions.findIndex(function (subNode) {
      return subNode.type === 'TemplateLiteral' && subNode.expressions && subNode.expressions.length && subNode.expressions[0].callee.name === localName;
    });

    if (grandparentTemplateLiteral.get().node.quasis.length >= indexOfParentLiteral + 1) {
      // console.log(endOfLine);
      var endOfLine = grandparentTemplateLiteral.get().node.quasis[indexOfParentLiteral + 1];
      endOfLine.value.raw = "px".concat(endOfLine.value.raw);
      endOfLine.value.cooked = "px".concat(endOfLine.value.cooked);
    }

    n.closest(j.TemplateLiteral).replaceWith(j.callExpression(j.identifier(localName), []));
  });
  removeNamedImport(root, j, '@atlaskit/util-shared-styles', 'akGridSize', importSpecifier);
  return root;
}