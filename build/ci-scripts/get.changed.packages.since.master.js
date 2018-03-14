const bolt = require('bolt');
const path = require('path');
const packages = require('../utils/packages');

/**
 * NOTE: This prints the list of changed packages since master ONLY if they have been commited.
 * It will print them all out as a json array of relative paths
 * i.e: $ node build/ci-scripts/get.changed.packages.since.master.js
 *        ["packages/core/avatar", "packages/core/badge"]
 * */
(async () => {
  const cwd = process.cwd();
  const allPackages = await bolt.getWorkspaces({ cwd });
  const changedPackages = await packages.getChangedPackagesSinceMaster();
  const changedPackagesRelativePaths = changedPackages.map(
    pkg => pkg.relativeDir,
  );

  console.log(JSON.stringify(changedPackagesRelativePaths));
})();
