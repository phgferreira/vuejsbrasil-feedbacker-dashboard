<template>
  <custom-header
    @create-account="handleAccountCreate"
    @login="handleLogin"/>
  <contact/>
  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker 2023</p>
  </footer>
</template>

<script>
import CustomHeader from '@/views/home/CustomHeader.vue'
import Contact from '@/views/home/Contact.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import useModal from '../../hooks/useModal'

export default {
  components: { CustomHeader, Contact },
  setup () {
    const router = useRouter()
    const modal = useModal()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })
    function handleLogin () {
      modal.open({ component: 'ModalLogin' })
    }
    function handleAccountCreate () {
      modal.open({ component: 'ModalCreateAccount' })
    }

    return {
      handleLogin,
      handleAccountCreate
    }
  }
}
</script>

<style scoped>
</style>
