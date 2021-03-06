const { body } = require('express-validator/check');
const moment = require('moment');
const Employee = require('../../api/employee/employeeModel');

exports.createFields = [
  body('firstName')
    .exists().withMessage('firstName must not be empty')
    .isString()
    .withMessage('firstName must be a string'),

  body('lastName', 'Must specify a valid string')
    .exists().withMessage('lastName must not be empty')
    .isString()
    .withMessage('lastName must be a string'),

  body('birthday')
    .custom((birthday) => {
      const birthDate = moment(birthday, 'YYYY/MM/DD', true);
      if (birthDate.isValid()) {
        return true;
      }
      return false;
    }).withMessage('birthday is not a valid format')
    .custom((birthday) => {
      const fifteenYearsAgo = moment().subtract(15, 'years');
      const birthDate = moment(birthday, 'YYYY/MM/DD', true);
      // test om det er nødvendigt at tjekke om validt date igen
      // if (!birthDate.isValid()) {
      //    return false;
      // }
      if (fifteenYearsAgo > birthDate) {
        return true;
      }
      return false;
    })
    .withMessage('birthday must be at least 15 years or older'),

  body('email', 'Must specify a valid email')
    .isString().withMessage('email must be a string')
    .isEmail()
    .withMessage('email must be a valid email')
    .custom(async (email) => {
      const foundEmail = await Employee.findOne({ email }).lean();
      if (!foundEmail) {
        return true;
      }
      return false;
    })
    .withMessage('email already exists'),

  body('city')
    .exists().withMessage('city must not be empty')
    .isString()
    .withMessage('city must be a string'),

  body('country')
    .exists().withMessage('country must not be empty')
    .isString()
    .withMessage('country must be a string'),

  body('street')
    .exists().withMessage('street must not be empty')
    .isString()
    .withMessage('street must be a string'),

  body('phoneNumber')
    .isNumeric().withMessage('phoneNumber must be a number')
    .isMobilePhone('da-DK')
    .withMessage('phoneNumber must be a valid danish phone number'),

  body('startDate')
    .custom((startDate) => {
      const startDay = moment(startDate, 'YYYY/MM/DD', true);
      if (startDay.isValid()) {
        return true;
      }
      return false;
    })
    .withMessage('startDate is not a valid date format')
    .optional(),
];

exports.updateFields = [
  body('firstName')
    .isString().withMessage('firstName must be a string')
    .optional(),

  body('lastName')
    .isString().withMessage('lastName must be a string')
    .optional(),

  body('birthday')
    .custom((birthday) => {
      const birthDate = moment(birthday, 'YYYY/MM/DD', true);
      if (birthDate.isValid()) {
        return true;
      }
      return false;
    }).withMessage('birthday is not a valid date format')
    .custom((birthday) => {
      const fifteenYearsAgo = moment().subtract(15, 'years');
      const birthDate = moment(birthday, 'YYYY/MM/DD', true);
      // test om det er nødvendigt at tjekke om valid date igen
      // if (!birthDate.isValid()) {
      //    return false;
      // }
      if (fifteenYearsAgo > birthDate) {
        return true;
      }
      return false;
    })
    .withMessage('birthday must be at least 15 years or older')
    .optional(),

  body('email', 'Must specify a valid email')
    .isString().withMessage('email must be a string')
    .isEmail()
    .withMessage('email must be a valid email')
    .custom(async (email) => {
      const foundEmail = await Employee.findOne({ email }).lean();
      if (!foundEmail) {
        return true;
      }
      return false;
    })
    .withMessage('email already exists'),

  body('city')
    .isString().withMessage('city must be a string')
    .optional(),

  body('country')
    .isString().withMessage('country must be a string')
    .optional(),

  body('street')
    .isString().withMessage('street must be a string')
    .optional(),

  body('phoneNumber')
    .isNumeric().withMessage('phoneNumber must be a number')
    .isMobilePhone('da-DK')
    .withMessage('phoneNumber must be a valid danish phone number')
    .optional(),

  body('startDate')
    .custom((startDate) => {
      const startDay = moment(startDate, 'YYYY/MM/DD', true);
      if (startDay.isValid()) {
        return true;
      }
      return false;
    })
    .withMessage('startDate is not a valid date format')
    .optional(),

];
