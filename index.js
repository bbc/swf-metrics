const { SWF } = require('aws-sdk');
const moment = require('moment');
const each = require('each-async');
const { consolidate } = require('./lib/workflow/history.js');

const client = new SWF({ region: process.env.AWS_DEFAULT_REGION });

function getPendingActivities() {
  return Promise.resolve(client)
    .then(client => getOpenWorkflows(client))
    .then(data => getWorkflowsHistory(client, data));
}

function getWorkflowsHistory (client, data) {
  return new Promise((resolve, reject) => {
    const DEFAULT_PARAMS = {
      domain: 'ExampleFreebird',
    };

    each(data, (execution, index, next) => {
      const params = Object.assign({}, DEFAULT_PARAMS, { execution });

      client.getWorkflowExecutionHistory(params, (err, history) => {
        if (err) {
          return reject(err);
        }

        try {
          data[index] = consolidate(execution, history.events);
          next();
        }
        catch(err) {
          next(err);
        }
      });
    }, err => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

function getOpenWorkflows (client) {
  const now = moment();

  return new Promise((resolve, reject) => {
    const params = {
      domain: 'ExampleFreebird',
      startTimeFilter: {
        latestDate: now.unix(),
        oldestDate: now.subtract(1, 'day').unix()
      },
      reverseOrder: false
    };

    // will have to repeat until pagination has expired
    client.listOpenWorkflowExecutions(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data.executionInfos.map(d => d.execution));
    })
  });
}

module.exports = {
  getPendingActivities
};
