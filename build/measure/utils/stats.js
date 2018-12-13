const path = require('path');
const fs = require('fs');
const { fStats, fExists } = require('./fs');

function buildStats(outputPath, statsGroups) {
  return statsGroups
    .map(group => {
      return {
        title: group.title,
        group: group.group,
        stats: group.stats.reduce((acc, stat) => {
          if (stat.group) {
            acc.push(...buildStats(outputPath, [stat]));
            return acc;
          }

          if (!stat.fileName) return acc;

          const filePath = path.resolve(outputPath, stat.fileName);
          if (!fExists(filePath)) return acc;

          acc.push({
            name: stat.name,
            stats: fStats(filePath),
          });
          return acc;
        }, []),
      };
    })
    .filter(group =>
      Array.isArray(group.stats) ? group.stats.length : group.stats,
    );
}

/**
 * Creates an array of all packages groups in the repo
 * and cacheGroups for them.
 */
function createAtlaskitStatsGroups(packagesDir, packagePath) {
  return fs
    .readdirSync(packagesDir)
    .filter(gr => !gr.startsWith('.'))
    .map(name => {
      const chunkName = `atlaskit-${name}`;
      const test = module =>
        module.context &&
        // is inside packages directory
        module.context.includes(`packages/${name}/`) &&
        // ignore a package that is being measured
        !module.context.includes(packagePath);

      return {
        title: name,
        group: true,
        stats: [
          {
            name: 'main',
            fileName: `${chunkName}.js`,
            cacheGroup: {
              name: chunkName,
              test,
              enforce: true,
              chunks: 'all',
              priority: -5,
            },
          },
          {
            name: 'async',
            fileName: `${chunkName}-async.js`,
            cacheGroup: {
              name: `${chunkName}-async`,
              test,
              enforce: true,
              chunks: 'async',
              priority: 5,
            },
          },
        ],
      };
    });
}

module.exports = { buildStats, createAtlaskitStatsGroups };
