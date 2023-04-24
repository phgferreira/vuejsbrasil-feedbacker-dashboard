<template>
  <h1 class="font-black text-brand-main">Aqui é a Home</h1>
<!--  <custom-header-->
<!--    @create-account="handleAccountCreate"-->
<!--    @login="handleLogin"/>-->
<!--  <contact/>-->
<!--  <footer class="flex justify-center py-10 bg-brand-gray">-->
<!--    <p class="font-medium text-center text-gray-800">feedbacker 2023</p>-->
<!--  </footer>-->
</template>

<script>
// import CustomHeader from '@/views/home/CustomHeader.vue'
// import Contact from '@/views/home/Contact.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

export default {
  components: { },
  setup () {
    const router = useRouter()
    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })
    function handleLogin () {
      console.log('Não implementado handleLogin ainda')
    }
    function handleAccountCreate () {
      console.log('Não implementado handleAccountCreate ainda')
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
