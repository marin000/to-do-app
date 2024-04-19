const https = require('follow-redirects').https;
const config = require('../config/index');
const { createRequestOptions, serializeData } = require('../utils/sms');

const sendSMS = (todoText) => {
  const { smsFrom, smsDestination } = config;
  const options = createRequestOptions();

  const req = https.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  const postData = serializeData(todoText, smsDestination, smsFrom);

  req.write(postData);
  req.end();
}

module.exports = {
  sendSMS
}
