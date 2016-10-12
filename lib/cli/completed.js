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
    .getCompletedWorkflowsActivities(argv)
    .then(data => consolidate(data))
    .then(data => {
      const { activities } = report(data);

      const headers = [
        'Activity',
        'Count',
        '⏰ Start',
        '⏰ Respond',
        '⏰ Complete',
        '⏰ Finish',
      ].map(d => chalk.cyan(d));

      const body = activities.map(activity => [
        `${chalk.yellow(activity.name)} ${activity.version}`,
        `${chalk.white(activity.totalCount)}`,
        seconds(activity.timeToStartAverage, argv.timeThreshold),
        seconds(activity.timeToRespondAverage, argv.timeThreshold),
        seconds(activity.timeToCompleteAverage, argv.timeThreshold),
        seconds(activity.timeToFinishAverage, argv.timeThreshold),
      ]);

      // eslint-disable-next-line no-console
      console.log(table([headers, ...body]));
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('Error: %o', err);
    });
};
