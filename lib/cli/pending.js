const api = require('../..');
const chalk = require('chalk');
const table = require('table').default;
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

      // eslint-disable-next-line no-console
      console.log(output);
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('Error: %o', err);
    });
};