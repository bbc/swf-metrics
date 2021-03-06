const api = require('../..');
const chalk = require('chalk');
const table = require('table').default;
const consolidate = require('../activity/consolidate.js');
const { report } = require('../reports/pending-executions.js');
const seconds = require('../seconds.js');
const client = require('./aws-cli.js');

module.exports.handler = (argv) => {
  api
    .getPendingWorkflowsActivities(client, argv)
    .then(data => consolidate(data))
    .then(data => {
      const { activities } = report(data);

      const headers = [
        'Activity',
        '# Processing',
        '# Completion',
        '# Failed',
        'Start',
        'Respond',
      ].map(d => chalk.cyan(d));

      const tableConfig = {
        columnDefault: {
          alignment: 'right'
        },
        columns: {
          0: {
            alignment: 'left'
          }
        }
      };

      const body = activities.map(activity => [
        `${chalk.yellow(activity.name)} ${activity.version}`,
        chalk.dim(activity.startedCount),
        `${chalk.white(activity.completedCount)}/${activity.totalCount}`,
        activity.failedCount ? chalk.red(activity.failedCount) : activity.failedCount,
        seconds(activity.timeToStartAverage, argv.timeThreshold, chalk.red),
        seconds(activity.timeToRespondAverage, argv.timeThreshold, chalk.red),
      ]);

      // eslint-disable-next-line no-console
      console.log(table([headers, ...body], tableConfig));
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
};
