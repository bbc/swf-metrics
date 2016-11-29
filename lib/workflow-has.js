module.exports.hasFailed = (execution) => {
  return ['Failed', 'Canceled', 'Terminated', 'TimedOut'].indexOf(execution.status) !== -1;
};

module.exports.hasCompleted = (execution) => {
  return execution.status === 'Completed';
};

module.exports.hasStarted = (execution) => {
  return execution.status === 'Started';
};
