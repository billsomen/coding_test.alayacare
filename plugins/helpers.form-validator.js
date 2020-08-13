// Validator.js

const CreditCardValidator = function () {
  this.challenges = {
    visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
    mastercard: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
    amex: /^3[47][0-9]{13}$/,
  }
}

CreditCardValidator.prototype = {
  check(cardNumber, code = null) {
    if (!code) {
      code = Object.keys(this.challenges)[0]
    }
    return this.challenges[code].test(cardNumber)
  },
}

const Validator = function () {}

Validator.prototype.validate = function (value, rules, type = null) {
  const self = this
  return rules.every(function (rule) {
    return self[rule](value, type)
  })
}

Validator.prototype.isString = function (value, type = null) {
  if (typeof value === 'string') {
    return true
  }
  return false
}

Validator.prototype.isNotEmpty = function (value, type = null) {
  if (value !== '' && value !== null && typeof value !== 'undefined') {
    return true
  }
  return false
}

Validator.prototype.isValidCard = function (value, type = null) {
  CreditCardValidator.prototype.check(value, type)
}

Validator.prototype.isInt = function (value) {
  return Number.isInteger(value)
}
