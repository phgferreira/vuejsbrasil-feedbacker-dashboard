import mockAxios from 'axios'
import AuthService from '../../../src/services/auth.js'

jest.mock('axios')

describe('Service Auth', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('deve retornar um token quando usuário fizer login', async () => {
    const token = '123456789'
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios).login(({ email: 'admin@admin.com', password: '123456' }))
    expect(response.data).toHaveProperty('token')
    expect(response).toMatchSnapshot()
  })

  it('deve retornar um usuário quando registrado', async () => {
    const usuario = { name: 'Admin', email: 'admin@admin.com', password: '123456' }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: usuario })
    })

    const response = await AuthService(mockAxios).register(usuario)
    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('email')
    expect(response.data).toHaveProperty('password')
    expect(response.data).toMatchSnapshot()
  })

  it('deve apresentar erro quando quando não for encontrado', async () => {
    const errors = { status: 404, statusText: 'Not Found' }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await AuthService(mockAxios).login(({ email: 'admin@admin.com', password: '123456' }))
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })
})
