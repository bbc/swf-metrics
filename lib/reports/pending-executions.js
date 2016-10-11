const group = require('group-array');
const moment = require('moment');
const { hasFailed, hasCompleted, hasStarted } = require('../workflow-has.js');
const activity = require('../activity.js');

const timeDiffMap = (from, to) => {
  return (execution) => {
    return new Date(to(execution)).getTime() - new Date(from(execution)).getTime();
  }
}

const sum = (acc, val) => acc + val;

const durationMap = (workflows, mapFn) => {
  return moment.duration(
    workflows.map(mapFn).reduce(sum, 0) / workflows.length
  ).asSeconds().toFixed(2);
}

module.exports.report = (consolidatedData) => {
  const totalCount = Object.keys(consolidatedData).reduce((count, key) => {
    return count + consolidatedData[key].length;
  }, 0);

  return {
    totalCount,
    activities: Object.keys(consolidatedData).map(key => {
      const all = consolidatedData[key];
      const failed = all.filter(hasFailed);
      const completed = all.filter(hasCompleted);
      const started = all.filter(hasStarted);
      const { name, version } = activity(key);

      const createdAt = (workflow) => workflow.execution.startedAt;
      const scheduledAt = (workflow) => workflow.scheduledAt;
      const startedAt = (workflow) => workflow.startedAt;
      const completedAt = (workflow) => workflow.completedAt;

      return {
        name,
        version,
        totalCount: all.length,
        startedCount: started.length,
        completedCount: completed.length,
        failedCount: failed.length,
        timeToStartAverage: durationMap(completed, timeDiffMap(createdAt, scheduledAt)),
        timeToRespondAverage: durationMap(completed, timeDiffMap(scheduledAt, startedAt)),
        timeToCompleteAverage: durationMap(completed, timeDiffMap(startedAt, completedAt)),
        timeToFinishAverage: durationMap(completed, timeDiffMap(createdAt, completedAt)),
      }
    })
  }
};
