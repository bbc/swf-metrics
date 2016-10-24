const { getWorkflowsHistory } = require('./lib/workflow/history.js');
const { getOpenWorkflows, getFailedWorkflows, getCompletedWorkflows } = require('./lib/workflow/get.js');
const { countOpenWorkflows } = require('./lib/workflow/count.js');

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

module.exports = {
  getPendingWorkflowsActivities,
  getCompletedWorkflowsActivities,
  getFailedWorkflowsActivities,
  countPendingWorkflowsActivities,
  getWorkflowsHistory,
};
