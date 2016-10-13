const Batch = require('batch');
const { consolidate } = require('./lib/workflow/history.js');
const { getOpenWorkflows, getFailedWorkflows, getCompletedWorkflows } = require('./lib/workflow/get.js');
const { countOpenWorkflows } = require('./lib/workflow/count.js');

// so far, this is a good number for large workflows but maybe it should be adapted based on the number of history to retrieve
const DEFAULT_CONCURRENCY = 15;

function getPendingWorkflowsActivities(client, options) {
  return Promise.resolve(client)
    .then(() => getOpenWorkflows(client, options))
    .then(data => getWorkflowsHistory(client, data, options));
}

function getFailedWorkflowsActivities(client, options) {
  return Promise.resolve(client)
    .then(() => getFailedWorkflows(client, options))
    .then(data => getWorkflowsHistory(client, data, options));
}

function getCompletedWorkflowsActivities(client, options) {
  return Promise.resolve(client)
    .then(() => getCompletedWorkflows(client, options))
    .then(data => getWorkflowsHistory(client, data, options));
}

function countPendingWorkflowsActivities(client, options) {
  return Promise.resolve(client)
    .then(() => countOpenWorkflows(client, options));
}

function getWorkflowsHistory (client, data, options) {
  return new Promise((resolve, reject) => {
    const { domain } = options;
    const b = new Batch();
    b.concurrency(DEFAULT_CONCURRENCY);

    data.forEach((execution, index) => {
      b.push(next => {
        const params = Object.assign({}, { execution }, { domain });
        client.getWorkflowExecutionHistory(params, (err, history) => {
          if (err) {
            return next(err);
          }

          try {
            data[index] = consolidate(execution, history.events);
            next();
          }
          catch(err) {
            return next(err);
          }
        });
      });
    });

    b.end(err => {
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
