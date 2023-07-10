import useStore from '../../../src/hooks/useStore'
import { cleanCurrentUser, resetUserStore, setApiKey, setCurrentUser } from '@/store/user'

describe('UserStore', () => {
  let store

  beforeEach(() => {
    store = useStore()
  })

  afterEach(() => {
    resetUserStore()
  })

  it('deve mudar o usuário atual', () => {
    setCurrentUser({ name: 'Paulo' })
    expect(store.User.currentUser.name).toBe('Paulo')
  })

  it('deve mudar o apiKey', () => {
    setApiKey('123')
    expect(store.User.currentUser.apiKey).toBe('123')
  })

  it('deve limpar o usuário atual', () => {
    setCurrentUser({ name: 'Paulo' })
    expect(store.User.currentUser.name).toBe('Paulo')
    cleanCurrentUser()

    expect(store.User.currentUser.name).toBeFalsy()
  })
})
