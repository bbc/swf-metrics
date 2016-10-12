const group = require('group-array');
const { hasFailed } = require('../workflow-has.js');
const activity = require('../activity.js');

const reasons = (executions) => {
  return group(executions, 'stderr');
};

module.exports.reasons = (consolidatedData) => {
  return Object.keys(consolidatedData).reduce((acc, key) => {
    const failed = consolidatedData[key].filter(hasFailed);
    const uniqueReasons = reasons(failed);
    const { name, version } = activity(key);

    const totalCount = Object.keys(uniqueReasons).reduce((count, key) => {
      return count + uniqueReasons[key].length;
    }, 0);

    Object.keys(uniqueReasons).forEach(label => {
      const executions = uniqueReasons[label];

      acc.push({
        activity: { name, version },
        label,
        totalCount: executions.length,
        totalRatio: (executions.length / totalCount * 100).toFixed(2),
        executions,
        executionIds: executions.map(d => d.execution.workflowId),
      });
    });

    return acc;
  }, []).sort((a, b) => (b.executions.length * b.totalRatio) - (a.executions.length * a.totalRatio));
};

module.exports.report = (consolidatedData) => {
  const totalCount = Object.keys(consolidatedData).reduce((count, key) => {
    return count + consolidatedData[key].filter(hasFailed).length;
  }, 0);

  return {
    totalCount,
    activities: Object.keys(consolidatedData).map(key => {
      const all = consolidatedData[key];
      const failed = all.filter(hasFailed);
      const uniqueReasons = reasons(failed);
      const { name, version } = activity(key);

      return {
        name,
        version,
        totalCount: all.length,
        failedCount: failed.length,
        failedRatio: (failed.length / totalCount * 100).toFixed(2),
        failedUniqueReasonsCount: Object.keys(uniqueReasons).length,
      };
    })
    .filter(d => d.failedCount > 0)
    .sort((a, b) => b.failedRatio.localeCompare(a.failedRatio)),
  };
};
