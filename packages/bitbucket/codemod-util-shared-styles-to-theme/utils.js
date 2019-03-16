// Finds the ImportDeclaration from '@atlaskit/util-shared-styles' and
// the child 'akGridSizeUnitless' ImportSpecifier. Returns undefined if
// either are not found, otherwise an array of
// [declaration, specifier, localName]
function getSharedStyles(root, j) {
  var sharedStylesImport = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: '@atlaskit/util-shared-styles'
    }
  });

  if (!sharedStylesImport.size()) {
    return;
  }

  var gridSizeImportSpecifier = sharedStylesImport.find(j.ImportSpecifier, {
    imported: {
      name: 'akGridSizeUnitless'
    }
  });

  if (!gridSizeImportSpecifier.size()) {
    return;
  } // Find what we are calling akGridSizeUnitless locally


  var localName = gridSizeImportSpecifier.get(0).node.local.name; // eslint-disable-next-line consistent-return

  return [sharedStylesImport, gridSizeImportSpecifier, localName];
} // Converts varName to varName()


function convertVarLiteralToFn(root, j, varName) {
  root.find(j.Identifier, {
    name: varName
  }).filter(function (node) {
    return j(node).closest(j.ImportDeclaration).size() === 0;
  }).replaceWith(function () {
    return j.callExpression(j.identifier(varName), []);
  });
} // Adds a named import from a package. If the package is already present,
// only the import is added. If the import is also already present, nothing
// is added. If the package is not present, a whole new import line is added.
// Always returns the local name of the import.


function addNamedImport(root, j, pkg, importedName, localName, otherImport) {
  var themeImportDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: pkg
    }
  }); // Bail if we've already imported this

  var existingNamedImport = themeImportDeclaration.find(j.ImportSpecifier, {
    imported: {
      name: importedName
    }
  });

  if (existingNamedImport.size() > 0) {
    return existingNamedImport.get().node.local.name;
  }

  var importSpecifier = j.importSpecifier(j.identifier(importedName), j.identifier(localName));

  if (themeImportDeclaration.size()) {
    // Add to the import
    themeImportDeclaration.get(0).node.specifiers.push(importSpecifier);
  } else {
    // Insert a new import
    var s = j.importDeclaration([importSpecifier], j.literal(pkg));
    otherImport.insertAfter(s); // after the imports
  }

  return localName;
}

function removeNamedImport(root, j, pkg, importToRemove, namedImportSpecifier) {
  // If it's the only import, remove the whole ImportDeclaration (whole line)
  var declaration = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: pkg
    }
  });

  if (declaration.find(j.ImportSpecifier).size() === 1) {
    var getFirstNode = function getFirstNode() {
      return root.find(j.Program).get('body', 0).node;
    }; // Save the comments attached to the first node


    var firstNode = getFirstNode();
    var comments = firstNode.comments;
    declaration.remove(); // If the first node has been modified or deleted, reattach the comments

    var firstNode2 = getFirstNode();

    if (firstNode2 !== firstNode) {
      firstNode2.comments = comments;
    }
  } else {
    namedImportSpecifier.remove();
  }
}

module.exports = {
  getSharedStyles: getSharedStyles,
  convertVarLiteralToFn: convertVarLiteralToFn,
  addNamedImport: addNamedImport,
  removeNamedImport: removeNamedImport
};