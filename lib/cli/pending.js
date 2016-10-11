const api = require('../..');
const chalk = require('chalk');
const { join } = require('path');
const table = require('table').default;
const fs = require('fs');
const consolidate = require('../activity/consolidate.js');
const { report } = require('../reports/pending-executions.js');

const seconds = (value, threshold) => {
  return parseFloat(value) < threshold ? '-' : value + 's.';
};

module.exports.handler = (argv) => {
  api
    .getPendingWorkflowsActivities(argv)
    .then(data => consolidate(data))
    .then(data => {
      const { activities } = report(data);

      const output = table(activities.map(activity => [
        `${chalk.yellow(activity.name)} ${activity.version}`,
        `${chalk.dim(activity.startedCount)}/${chalk.white(activity.completedCount)}/${activity.totalCount}`,
        activity.failedCount ? chalk.red(activity.failedCount) : activity.failedCount,
        seconds(activity.timeToStartAverage, argv.timeThreshold),
        seconds(activity.timeToRespondAverage, argv.timeThreshold),
        seconds(activity.timeToCompleteAverage, argv.timeThreshold),
      ]));

      console.log(output);
    })
    .catch(err => console.error('Error: %o', err));
}
