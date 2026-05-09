const { validationResult } = require('express-validator');

/**
 * Generic middleware to handle validation results.
 * If errors exist, returns 422 with the list of errors.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map(({ msg, path, location }) => ({
        msg,
        path,
        location,
      })),
    });
  }
  next();
};

module.exports = { validate };
