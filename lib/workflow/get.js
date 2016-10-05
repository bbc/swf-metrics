const moment = require('moment');
const asyncWhile = require('../while.js');

module.exports.getOpenWorkflows = (client, options) => {
  return getWorkflows(client, Object.assign({}, options, {
    apiCall: 'listOpenWorkflowExecutions',
    template: {
      domain: null,
      reverseOrder: false
    }
  }));
};

module.exports.getFailedWorkflows = (client, options) => {
  return getWorkflows(client, Object.assign({}, options, {
    apiCall: 'listClosedWorkflowExecutions',
    template: {
      domain: null,
      closeStatusFilter: {
        status: 'FAILED'
      }
    }
  }));
};

module.exports.getClosedWorkflows = (client, options) => {
  return getWorkflows(client, Object.assign({}, options, {
    apiCall: 'listClosedWorkflowExecutions',
    template: {
      domain: null,
      closeStatusFilter: {
        status: 'COMPLETED'
      }
    }
  }));
};

function getWorkflows(client, options) {
  const USER_DEFAULTS = {
    domain: null,
    workflowId: null,
    for: [1, 'hour'],
    since: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const { for:duration, since, workflowId, domain, template } = Object.assign({}, USER_DEFAULTS, options);

    const workflows = [];
    const params = Object.assign({}, template, {
      domain,
      executionFilter: {
        workflowId,
      },
      startTimeFilter: {
        latestDate: moment(since).unix(),
        oldestDate: moment(since).subtract(duration[0], duration[1]).unix()
      }
    });

    if (params.executionFilter.workflowId) {
      delete params.closeStatusFilter;
    }
    else {
      delete params.executionFilter;
    }

    asyncWhile((next, nextPageToken) => {
      params.nextPageToken = nextPageToken;

      client[ options.apiCall ](params, (err, data) => {
        if (err) {
          return next(err);
        }

        workflows.push(...data.executionInfos.map(d => d.execution));
        next(null, data.nextPageToken);
      });
    }).then(() => resolve(workflows), reject);
  });
}
