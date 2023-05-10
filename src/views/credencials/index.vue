<template>
  <h1>Credencials</h1>
</template>

<script>
import { onMounted } from 'vue'

export default {
  setup () {
    onMounted(() => {
      // FIXME: Temporário apenas para forçar o logoff
      window.localStorage.setItem('token', '')
    })
  }
}
</script>

<style scoped>

</style>
