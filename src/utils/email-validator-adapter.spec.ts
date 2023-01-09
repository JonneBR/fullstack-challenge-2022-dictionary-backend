import { EmailValidatorAdapter } from './email-validator'

test('Should return false if validator retuns false ', () => {
  const sut = new EmailValidatorAdapter()
  const isValid = sut.isValid('invalid_email@email.com')
  expect(isValid).toBe(false)
})
