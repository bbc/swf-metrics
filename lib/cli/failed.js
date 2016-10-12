const api = require('../..');
const chalk = require('chalk');
const table = require('table').default;
const consolidate = require('../activity/consolidate.js');
const { report, reasons } = require('../reports/failed-executions.js');

module.exports.builder = (yargs) => {
  return yargs.option('breakdown', {
    type: 'boolean',
    default: true,
    describe: 'Display (or not) the metrics breakdown.',
  });
};

module.exports.handler = (argv) => {
  api
    .getFailedWorkflowsActivities(argv)
    .then(data => consolidate(data))
    .then(data => {
      const { activities } = report(data);

      const headers = [
        'Activity',
        '# All',
        '# Failed',
        '% Failed',
        '≠ Reasons',
      ].map(d => chalk.cyan(d));

      const body = activities.map(activity => [
        `${chalk.yellow(activity.name)} ${activity.version}`,
        activity.totalCount,
        activity.failedCount,
        `${chalk.white.bold(activity.failedRatio)}%`,
        activity.failedUniqueReasonsCount,
      ]);

      // eslint-disable-next-line no-console
      console.log(table([headers, ...body]));

      return data;
    })
    .then(data => {
      if (!argv.breakdown) {
        return data;
      }

      const headers = [
        'Failure Reason',
        'Count',
        'Workflow Ids',
      ].map(d => chalk.cyan(d));
      
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

      const body = reasons(data).map(reason => {
        const { activity } = reason;

        return [
          `${chalk.yellow(activity.name)} ${activity.version} ${chalk.dim(reason.label)}`,
          `${chalk.white.bold(reason.totalCount)}`,
          `${chalk.dim(reason.executionIds.join(''))}`
        ];
      });

      // eslint-disable-next-line no-console
      console.log(table([headers, ...body], tableConfig));
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('Error: %o', err);
    });
};
