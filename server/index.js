const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./docs/options-config');
const app = express();
const config = require('./config/index');
const dbMessages = require('./constants/dbMessages');
require('dotenv')
  .config();

const specs = swaggerJsDoc(swaggerOptions.options)
const router = require('./router');

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(cors());
app.use(router);

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const { CONNECTED, ERROR_CONNECTING, PORT_LISTENING } = dbMessages;
const { dbUrl, port } = config;

mongoose.set('strictQuery', false);
mongoose.connect(dbUrl, connectionParams)
  .then(() => {
    console.log(CONNECTED);
  })
  .catch((err) => {
    console.log(ERROR_CONNECTING + err);
  })

app.listen(port, function () {
  console.log(PORT_LISTENING + port);
});

module.exports = app;