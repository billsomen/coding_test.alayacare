// Validator.js

const CreditCardValidator = function () {}

CreditCardValidator.prototype.challenges = {
  visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
  mastercard: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
}

CreditCardValidator.prototype.check = function (cardNumber, code = null) {
  if (!code) {
    return false
  }
  return this.challenges[code].test(cardNumber)
}

const Validator = function () {}

Validator.prototype.validate = function (value, rules) {
  const self = this
  if (this.isNotEmpty(value.input)) {
    return rules.every(function (rule) {
      return self[rule](value)
    })
  } else {
    return false
  }
}

Validator.prototype.isString = function (value) {
  if (typeof value.input === 'string') {
    return true
  }
  return false
}

Validator.prototype.isDateValid = function (value) {
  const { input, dateMin, dateMax } = value
  const flagLen = input.length === 4
  const flagMin = dateMin.split('-').reverse().join('') <= input
  const flagMax = dateMax.split('-').reverse().join('') >= input

  return flagLen && flagMin && flagMax
}

Validator.prototype.isNotEmpty = function (value) {
  if (value !== '' && value !== null && typeof value !== 'undefined') {
    return true
  }
  return false
}

Validator.prototype.isValidCard = function (value) {
  const { input, cardType: type } = value
  return CreditCardValidator.prototype.check(input, type)
}

Validator.prototype.isValidCVV = function (value) {
  const { input, blocks } = value
  const flagNumeric = +input
  const flagLen = blocks && input.length === blocks[0]

  return flagLen && flagNumeric
}

Validator.prototype.isAddress = function (value) {
  return this.isString(value) && value.input.length > 5
}

export default Validator
