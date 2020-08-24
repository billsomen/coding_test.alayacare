import ValidatorObject from '~/static/js/validator'
const Validator = new ValidatorObject()

describe('validator', () => {
  test('is validating address', () => {
    expect(
      Validator.validate({ input: '1234' }, ['isAddress']).all
    ).not.toBeTruthy()

    expect(
      Validator.validate({ input: 'Bill Somen' }, ['isAddress']).all
    ).toBeTruthy()

    expect(
      Validator.validate({ input: '255 rue' }, ['isAddress']).all
    ).toBeTruthy()
  })
  test('is validating card', () => {
    expect(
      Validator.validate({ input: '1242424242424242' }, ['isValidCard']).all
    ).not.toBeTruthy()

    expect(
      Validator.validate({ input: '4242424242424242' }, ['isValidCard']).all
    ).toBeTruthy()

    expect(
      Validator.validate(
        { input: '4242424242424242', cardType: 'mastercard' },
        ['isValidCard']
      ).all
    ).not.toBeTruthy()
  })
  test('is validating cvv', () => {
    expect(
      Validator.validate({ input: '121', blocks: [3] }, ['isValidCVV']).all
    ).toBeTruthy()

    expect(
      Validator.validate({ input: '3434', blocks: [3] }, ['isValidCVV']).all
    ).not.toBeTruthy()
  })

  test('is validating date', () => {
    expect(
      Validator.validate({ input: '121', dateMin: '20-01', dateMax: '31-12' }, [
        'isDateValid',
      ]).all
    ).not.toBeTruthy()

    expect(
      Validator.validate(
        { input: '3434', dateMin: '20-01', dateMax: '31-12' },
        ['isDateValid']
      ).all
    ).not.toBeTruthy()
    expect(
      Validator.validate(
        { input: '0221', dateMin: '20-01', dateMax: '31-12' },
        ['isDateValid']
      ).all
    ).toBeTruthy()
  })
})
