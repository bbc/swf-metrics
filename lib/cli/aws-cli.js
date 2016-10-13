const { SWF } = require ('aws-sdk');

module.exports = new SWF({
  region: process.env.AWS_DEFAULT_REGION,
  retryDelayOptions: {
    base: 1000,
  }
});
