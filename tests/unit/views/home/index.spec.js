import Home from '../../../../src/views/home'
import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'
import { shallowMount } from '@vue/test-utils'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('<Home />', () => {
  it('deve renderizar a Home corretamente', async function () {
    // Acessa a rota '/' e espera até ficar pronto
    await router.push('/')
    await router.isReady()

    // Cria um embrulho da Home
    const wrapper = shallowMount(Home, {
      global: { plugins: [router] }
    })

    // Verifica se algo mudou em comparação ao último snapshot do código HTML
    expect(wrapper.html()).toMatchSnapshot()
  })
})
