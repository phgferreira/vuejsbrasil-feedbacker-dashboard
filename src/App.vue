<template>
  <modal-factory />
  <router-view/>
</template>

<script>
import ModalFactory from '@/components/ModalFactory/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
import services from './services'

export default {
  components: { ModalFactory },
  setup () {
    // Realiza ações relacionadas a rotas
    const router = useRouter()
    // Pega as informações da rota atual
    const route = useRoute()

    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem('token')

        if (!token) {
          router.push({ name: 'Home' })
          return
        }

        const data = await services.users.getMe()
        console.log(data)
      }
    })
  }
}
</script>
