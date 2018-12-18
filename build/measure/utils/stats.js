const path = require('path');
const fs = require('fs');
const { fStats, fExists } = require('./fs');

function buildStats(outputPath, statsGroups) {
  return statsGroups.reduce((acc, group) => {
    return group.stats.reduce((acc, stat) => {
      if (stat.group) {
        acc.push(...buildStats(outputPath, [stat]));
        return acc;
      }

      if (!stat.fileName) return acc;

      const filePath = path.resolve(outputPath, stat.fileName);
      if (!fExists(filePath)) return acc;

      acc.push({
        id: stat.id,
        name: stat.name,
        threshold: stat.threshold,
        stats: fStats(filePath),
      });
      return acc;
    }, acc);
  }, []);
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
        name,
        group: true,
        stats: [
          {
            id: `atlaskit.${name}.main`,
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
            id: `atlaskit.${name}.async`,
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

function diff(origOldStats, origNewStats) {
  const oldStats = [].concat(origOldStats);
  const newStats = [].concat(origNewStats);
  const statsWithDiff = [];

  while (oldStats.length) {
    const old = oldStats.shift();
    const matchIndex = newStats.findIndex(st => st.id === old.id);
    if (matchIndex > -1) {
      let isTooBig;
      const match = newStats[matchIndex];
      const gzipSizeDiff = match.stats.gzipSize - old.stats.gzipSize;

      if (match.threshold) {
        const maxSize =
          match.threshold * old.stats.gzipSize + old.stats.gzipSize;
        isTooBig = maxSize < match.stats.gzipSize;
      }

      statsWithDiff.push({
        ...match,
        isTooBig,
        stats: {
          ...match.stats,
          sizeDiff: match.stats.size - old.stats.size,
          gzipSizeDiff,
        },
      });

      newStats.splice(matchIndex, 1);
    } else {
      statsWithDiff.push({
        ...old,
        deleted: true,
        stats: {
          size: 0,
          gzipSize: 0,
          sizeDiff: -old.stats.size,
          gzipSizeDiff: -old.stats.gzipSize,
        },
      });
    }
  }

  return [
    ...statsWithDiff,
    ...newStats.map(stat => {
      stat.new = true;
      return stat;
    }),
  ];
}

function clearStats(stats) {
  return stats.map(item => ({
    ...item,
    threshold: undefined,
    isTooBig: undefined,
  }));
}

module.exports = { buildStats, createAtlaskitStatsGroups, diff, clearStats };
