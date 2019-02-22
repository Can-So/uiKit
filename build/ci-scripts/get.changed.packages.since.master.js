const bolt = require('bolt');
const path = require('path');
const packages = require('../utils/packages');
const flattenDeep = require('lodash.flattendeep');
/**
 * NOTE: This prints the list of changed packages and dependent packages since master ONLY if they have been commited.
 * It will print them all out as a json array of relative paths
 * i.e: $ node build/ci-scripts/get.changed.packages.since.master.js
 *        ["packages/core/avatar", "packages/core/badge"]
 * */
(async () => {
  const cwd = process.cwd();
  const allPackages = await bolt.getWorkspaces({ cwd });
  // Changed packages that have been worked on since master.
  const changedPackages = await packages.getChangedPackagesSinceMaster();
  const changedPackagesRelativePaths = changedPackages.map(
    pkg => pkg.relativeDir,
  );
  // Packages that are dependent on the changed packages.
  // If dependencies flag is passed, CHANGED_PACKAGES will return packages that are dependent on the changed packages.
  // Get dependency graph for all packages.
  if (process.argv[2] && process.argv[2].includes('--dependents')) {
    const typeOfDep = process.argv[2].split('=')[1];
    const dependencyGraph = await bolt.getDependentsGraph({ cwd });
    // 1. Match with changed packages
    // 2. Get the package.json from those packages
    // 3. Map and filter the changed packages with its own dependent packages
    // 4. Based on the argument passed, it will return the direct dependencies or all (dev and peer)
    // 4. Return a flatten array of changed packages relative path
    const getPackageJSON = pkgName =>
      allPackages.find(({ name }) => name === pkgName);
    const changedPackagesWithDependent = flattenDeep(
      changedPackages.map(({ name: changedPkgName }) =>
        dependencyGraph
          .get(changedPkgName)
          .filter(dependent => {
            const dependentPkgJSON = getPackageJSON(dependent).config;
            // Direct dependencies will return packages with direct dependencies on the changed packages.
            // When a package does not have dependent or not required such as the build script.
            if (typeOfDep.includes('direct'))
              return (
                dependentPkgJSON.dependencies[changedPkgName] !== undefined
              );
            // All dependencies will return packages with direct, dev and peer dependencies on the changed packages.
            // For peerDependencies, some packages do not have it that's why it needed to check for its existence.
            if (typeOfDep.includes('all'))
              return (
                dependentPkgJSON.dependencies[changedPkgName] !== undefined ||
                (dependentPkgJSON.peerDependencies &&
                  dependentPkgJSON.peerDependencies[changedPkgName] !==
                    undefined) ||
                dependentPkgJSON.devDependencies[changedPkgName] !== undefined
              );
            else
              throw new Error(
                `The parsed flag is not recognised ${process.argv}`,
              );
          })
          .map(pkg => getPackageJSON(pkg).dir)
          .map(pkg => path.relative(cwd, pkg)),
      ),
    );
    // Set is used to avoid the case of multiple changed packages with the same dependent packages.
    const changedPackagesRelativePathsWithDependent = [
      ...new Set(
        changedPackagesRelativePaths.concat(changedPackagesWithDependent),
      ),
    ];
    console.log(JSON.stringify(changedPackagesRelativePathsWithDependent));
  } else {
    // Those exceptions scripts are related to the measure of the bundle size.
    // This check if the `--only='folderName'` flag is set when using the measure tool.
    if (process.argv[3] && process.argv[3].includes('--only')) {
      const includedPattern = process.argv[3].split('=')[1];
      // For example, if we need to `only` include the component 'packages' when measuring the package bundle size.
      changedPackagesRelativePaths = changedPackagesRelativePaths.filter(pkg =>
        pkg.includes(includedPattern),
      );
    }
    // This check is only for the way of changed packages output is displayed:
    // '--spaceDelimited' - using the measure tool, will return the changedPackages
    // like 'packages/core/button packages/editor/editor-core ...'.
    // Otherwise, the standard output will be ["packages/core/button", "packages/editor/editor-core", ...].
    if (process.argv.includes('--spaceDelimited')) {
      console.log(changedPackagesRelativePaths.join(' '));
    } else {
      console.log(JSON.stringify(changedPackagesRelativePaths));
    }
  }
})();
