import { EmailValidatorAdapter } from './email-validator'

test('Should return false if validator returns false', () => {
  const sut = new EmailValidatorAdapter()
  const isValid = sut.isValid('invalid_email')
  expect(isValid).toBe(false)
})

test('Should return true if validator returns true', () => {
  const sut = new EmailValidatorAdapter()
  const isValid = sut.isValid('invalid_email@email.com')
  expect(isValid).toBe(true)
})
