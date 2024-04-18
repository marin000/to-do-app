const { body } = require('express-validator');
const message = require('../constants/validatorMessages');

exports.validate = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('text')
          .exists().withMessage(message.TEXT_REQUIRED)
          .isLength({ min: 3 }).withMessage(message.TEXT_SHORT),
        body('done')
          .optional()
          .isBoolean().withMessage(message.DONE_BOOL)
      ]
    }
  }
}