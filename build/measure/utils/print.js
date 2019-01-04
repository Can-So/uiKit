function processJoinedStats(measureGroups, stats) {
  return measureGroups
    .map(group => ({
      ...group,
      stats: group.stats
        .reduce((acc, statDecl) => {
          if (statDecl.group) {
            acc.push(...processJoinedStats([statDecl], stats));
          } else {
            acc.push(stats[statDecl.id]);
          }
          return acc;
        }, [])
        .filter(Boolean),
    }))
    .filter(gr => gr.stats.length);
}

function prepareForPrint(measureGroups, stats) {
  const joinedStats = stats.reduce((acc, stat) => {
    acc[stat.id] = stat;
    return acc;
  }, {});

  return processJoinedStats(measureGroups, joinedStats);
}

module.exports = { prepareForPrint };
