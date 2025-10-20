/**
 *
 * @param {RegExp} emailRegExp - email pattern
 **/
const emailRegExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 *
 * @param {RegExp} passwordRegExp - password pattern - must contain at least 8 characters, one letter and one number
 * and one special character
 **/
const passwordRegExp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

/**
 *
 * @param {RegExp} mobileNumberRegExp - mobile number pattern
 **/
const mobileNumberRegExp: RegExp = /^\d{10}$/;

/**
 *
 * @param {RegExp} stringRegExp - string pattern
 **/
const stringRegExp: RegExp = /^[a-zA-Z\s]*$/;

const stringWithCharRegExp: RegExp = /^[a-zA-Z\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

export const RegExpPatterns = {
  email: emailRegExp,
  password: passwordRegExp,
  mobileNumber: mobileNumberRegExp,
  string: stringRegExp,
  stringWithChar: stringWithCharRegExp,
};
