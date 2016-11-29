const test = require('tape');
const { consolidate } = require('../lib/workflow/history.js');
const fixtures = require('./fixtures/history.json');

test('workflow/history#consolidate', t => {
  t.plan(3);

  const execution = {
    workflowId: 'foo',
    runId: 'bar'
  };

  const EXPECTED_EXECUTION = Object.assign({}, execution, {
    startedAt: '2016-10-04T11:46:51.301Z',
    completedAt: '',
    stdin: '13002810:http://g1.globo.com/sp/bauru-marilia/noticia/2016/10/homem-morre-atropelado-por-caminhao-em-rodovia-de-bauru.html'
  });

  const EXPECTED_ACTIVITY = {
    activityType: {
      name: 'RenderHtml',
      version: '20150917'
    },
    status: 'Completed',
    scheduledAt: '2016-10-04T11:53:41.691Z',
    startedAt: '2016-10-04T11:53:41.710Z',
    completedAt: '2016-10-04T11:53:47.605Z',
    identity: 'efa9db31b6b5:1',
    activityId: 'ce4ced6e-649d-4f9a-85e4-2cbaa71f8528',
    stdout: '{"properties":["http://schema.org/url","http://prototyping.bbc.co.uk/ns#html"]}'
  };

  const workflow = consolidate(execution, fixtures);

  t.equal(workflow.activities.length, 16);
  t.deepEqual(workflow.execution, EXPECTED_EXECUTION);
  t.deepEqual(workflow.activities[0], EXPECTED_ACTIVITY);
});
