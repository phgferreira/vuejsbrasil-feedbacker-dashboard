import { validateEmptyAndEmail, validateEmptyAndLength3 } from '@/utils/validators'

describe('Validators utils', () => {
  it('deve alertar com erro se valor for vazio', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório')
  })

  it('deve alertar com erro se valor tiver menos de 3 caracteres', () => {
    expect(validateEmptyAndLength3('12')).toBe('*Este campo precisa de no mínimo 3 caracteres')
  })

  it('deve passar quando valor tiver 3 caracteres ou mais', () => {
    expect(validateEmptyAndLength3('123')).toBeTruthy()
    expect(validateEmptyAndLength3('1234')).toBeTruthy()
  })

  it('deve alertar com erro quando email estiver vazio', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório')
  })

  it('deve alertar com erro email for inválido', () => {
    expect(validateEmptyAndEmail('admin@admin')).toBe('*Este campo precisa ser um e-mail válido')
  })

  it('deve passar quando email for válido', () => {
    expect(validateEmptyAndEmail('admin@admin.com')).toBeTruthy()
  })
})
