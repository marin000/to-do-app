const config = require('../config/index');

const createRequestOptions = () => {
  const { smsHostname, smsKey } = config;
  return {
    method: 'POST',
    hostname: smsHostname,
    path: '/sms/2/text/advanced',
    headers: {
      Authorization: smsKey,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    maxRedirects: 20
  };
};

const serializeData = (todoText, smsDestination, smsFrom) => {
  return JSON.stringify({
    messages: [
      {
        destinations: [{ to: smsDestination }],
        from: smsFrom,
        text: `Your ${todoText} is marked as done.`
      }
    ]
  });
};

module.exports = {
  createRequestOptions,
  serializeData
}
