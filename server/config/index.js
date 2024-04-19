require('dotenv')
  .config()
const errorMessages = require('../constants/errorMessages')
const {
  DB_URL_MISSING,
  PORT_MISSING,
  SMS_KEY_MISSING,
  SMS_HOSTNAME_MISSING,
  SMS_DESTINATION_MISSING } = errorMessages

if (!process.env.DB_URL) {
  throw new Error(DB_URL_MISSING)
} else if (!process.env.PORT) {
  throw new Error(PORT_MISSING)
} else if (!process.env.SMS_KEY) {
  throw new Error(SMS_KEY_MISSING)
} else if (!process.env.SMS_HOSTNAME) {
  throw new Error(SMS_HOSTNAME_MISSING)
} else if (!process.env.SMS_DESTINATION) {
  throw new Error(SMS_DESTINATION_MISSING)
}

const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  smsKey: process.env.SMS_KEY,
  smsHostname: process.env.SMS_HOSTNAME,
  smsFrom: process.env.SMS_FROM,
  smsDestination: process.env.SMS_DESTINATION
}

module.exports = config