const group = require('group-array');

module.exports = (workflows, ...groups) => {
  return group(workflows
    .reduce((acc, workflow) => {
      return acc.concat(workflow.activities.map(d => {
        const { execution } = workflow;
        d.execution = execution;

        return d;
      }));
    }, []), d => `${d.activityType.name}@${d.activityType.version}`, ...groups)

}
