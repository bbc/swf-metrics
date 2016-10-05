const moment = require('moment');

module.exports.countOpenWorkflows = (client, options) => {
  const DEFAULTS = {
    for: [1, 'hour'],
    since: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const { for:duration, since } = Object.assign({}, DEFAULTS, options);

    const params = {
      domain: 'ExampleFreebird',
      startTimeFilter: {
        latestDate: moment(since).unix(),
        oldestDate: moment(since).subtract(duration[0], duration[1]).unix()
      },
    };

    client.countOpenWorkflowExecutions(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}
