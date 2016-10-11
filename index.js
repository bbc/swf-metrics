const { SWF } = require('aws-sdk');
const each = require('each-async');
const limit = require('simple-rate-limiter');
const { consolidate } = require('./lib/workflow/history.js');
const { getOpenWorkflows, getFailedWorkflows, getCompletedWorkflows } = require('./lib/workflow/get.js');
const { countOpenWorkflows } = require('./lib/workflow/count.js');

const client = new SWF({ region: process.env.AWS_DEFAULT_REGION });

function getPendingWorkflowsActivities(options) {
  return Promise.resolve(client)
    .then(client => getOpenWorkflows(client, options))
    .then(data => getWorkflowsHistory(client, data));
}

function getFailedWorkflowsActivities(options) {
  return Promise.resolve(client)
    .then(client => getFailedWorkflows(client, options))
    .then(data => getWorkflowsHistory(client, data));
}

function getCompletedWorkflowsActivities(options) {
  return Promise.resolve(client)
    .then(client => getCompletedWorkflows(client, options))
    .then(data => getWorkflowsHistory(client, data));
}

function countPendingWorkflowsActivities(options) {
  return Promise.resolve(client)
    .then(client => countOpenWorkflows(client, options));
}

function getWorkflowsHistory (client, data) {
  return new Promise((resolve, reject) => {
    const DEFAULT_PARAMS = {
      domain: 'ExampleFreebird',
    };
    const apiCall = limit(client.getWorkflowExecutionHistory.bind(client))
      .evenly()
      .to(80)
      .per(1000);

    each(data, (execution, index, next) => {
      const params = Object.assign({}, DEFAULT_PARAMS, { execution });

      apiCall(params, (err, history) => {
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
      })
      .on('error', err => next(err));
    }, err => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}


module.exports = {
  getPendingWorkflowsActivities,
  getCompletedWorkflowsActivities,
  getFailedWorkflowsActivities,
  countPendingWorkflowsActivities,
};
