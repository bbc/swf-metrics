const { getWorkflowsHistory } = require('./lib/workflow/history.js');
const { getOpenWorkflows, getFailedWorkflows, getCompletedWorkflows } = require('./lib/workflow/get.js');

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

module.exports = {
  getPendingWorkflowsActivities,
  getCompletedWorkflowsActivities,
  getFailedWorkflowsActivities,
  getWorkflowsHistory,
};
