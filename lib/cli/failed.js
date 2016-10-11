const api = require('../..');
const chalk = require('chalk');
const { join } = require('path');
const table = require('table').default;
const consolidate = require('../activity/consolidate.js');
const { report, reasons } = require('../reports/failed-executions.js');

module.exports.builder = (yargs) => {
  return yargs.option('breakdown', {
      type: 'boolean',
      default: true,
      describe: 'Display (or not) the metrics breakdown.',
    })
};

module.exports.handler = (argv) => {
  api
    .getFailedWorkflowsActivities(argv)
    .then(data => consolidate(data))
    .then(data => {
      const { activities } = report(data);

      const output = table(activities.map(activity => [
        `${chalk.red(activity.name)} ${activity.version}`,
        activity.totalCount,
        activity.failedCount,
        `${chalk.white.bold(activity.failedRatio)}%`,
        activity.failedUniqueReasonsCount,
      ]));

      console.log(output);

      return data;
    })
    .then(data => {
      if (!argv.breakdown) {
        return data;
      }

      const tableConfig = {
        columns: {
          0: {
            width: 60,
            truncate: 1300
          },
          2: {
            width: 36,
            truncate: 36 * 10
          }
        }
      };

      const output = table(reasons(data).map(reason => {
        const { activity } = reason;

        return [
          `${chalk.red(activity.name)} ${activity.version} ${chalk.dim(reason.label)}`,
          `${chalk.white.bold(reason.totalCount)}`,
          `${chalk.dim(reason.executionIds.join(''))}`
        ];
      }), tableConfig);

      console.log(output);
    })
    .catch(err => console.error('Error: %o', err));
}
