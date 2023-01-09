import { EmailValidatorAdapter } from './email-validator'

test('Should return false if validator returns false ', () => {
  const sut = new EmailValidatorAdapter()
  const isValid = sut.isValid('invalid_email@email.com')
  expect(isValid).toBe(false)
})

test('Should return true if validator returns true ', () => {
  const sut = new EmailValidatorAdapter()
  jest.spyOn(sut, 'isValid').mockReturnValueOnce(true)
  const isValid = sut.isValid('invalid_email@email.com')
  expect(isValid).toBe(true)
})
