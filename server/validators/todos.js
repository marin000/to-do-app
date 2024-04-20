const { body, query, param } = require('express-validator');
const { v4: isUUID } = require('uuid');
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
    case 'fetch': {
      return [
        query('sort')
          .optional()
          .isIn(['ASC', 'DESC']).withMessage(message.SORT_INVALID)
      ]
    }
    case 'checkId': {
      return [
        param('id')
          .exists().withMessage(message.ID_REQUIRED)
          .custom((value) => {
            if (!isUUID(value)) {
              throw new Error(message.INVALID_ID);
            }
            return true;
          })
      ];
    }
    case 'update': {
      return [
        param('id')
          .exists().withMessage(message.ID_REQUIRED)
          .custom((value) => {
            if (!isUUID(value)) {
              throw new Error(message.INVALID_ID);
            }
            return true;
          }),
        body('text')
          .optional()
          .isLength({ min: 3 }).withMessage(message.TEXT_SHORT),
        body('done')
          .optional()
          .isBoolean().withMessage(message.DONE_BOOL)
      ]
    }
  }
}