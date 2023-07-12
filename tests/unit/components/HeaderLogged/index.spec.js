import { shallowMount } from '@vue/test-utils'
import HeaderLogged from '@/components/HeaderLogged/index.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = { currentUser: {} }
jest.mock('@/hooks/useStore', () => {
  return () => mockStore
})

describe('<HeaderLogged />', () => {
  it('deve renderizar o cabeçalho quando logado corretamente', async () => {
    await router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugings: [router]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('deve renderizar três pontos quando usuário não estiver logado', async () => {
    await router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugings: [router]
      }
    })
    const buttonLogout = wrapper.find('[data-test="logout-button"]')
    expect(buttonLogout.text()).toEqual('...')
  })

  it('deve renderizar usuário quando estiver logado', async () => {
    await router.push('/')
    await router.isReady()
    mockStore.currentUser.name = 'Fulano'
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugings: [router]
      }
    })
    const buttonLogout = wrapper.find('[data-test="logout-button"]')
    expect(buttonLogout.text()).toEqual('Fulano (sair)')
  })
})
