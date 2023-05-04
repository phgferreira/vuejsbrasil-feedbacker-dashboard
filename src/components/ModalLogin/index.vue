<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800 focus:outline-none">Entre na sua conta</h1>
    <button class="text-4xl text-gray-600" @click="close">
      Fechar
    </button>
  </div>
  <div class="vt-16">
    <form @submit.prevent="handleSubmit">

      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-Mail</span>
        <input v-model="state.email.value" type="email"
               class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
               :class="{'border-brand-danger' : !!state.email.errorMessage}"
               placeholder="paulo.ferreira@vuejs.com.br"
        >
        <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">{{ state.email.errorMessage }}</span>
      </label>

      <label class="block">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input v-model="state.password.value" type="password"
               class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
               :class="{'border-brand-danger' : !!state.password.errorMessage}"
        >
        <span v-if="!!state.password.errorMessage" class="block font-medium text-brand-danger">{{ state.password.errorMessage }}</span>
      </label>

      <button type="submit" :disabled="state.isLoading"
              class="px-8 py-3 mt-10 text-2x1 font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
              :class="{'opacity-50' : state.isLoading }"
      >
        Entrar
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import useModal from '@/hooks/useModal'

export default {
  setup () {
    const modal = useModal()
    const state = reactive({
      hasError: false,
      isLoading: false,
      email: {
        value: '',
        errorMessage: ''
      },
      password: {
        value: '',
        errorMessage: ''
      }
    })

    function handleSubmit () {
      alert(`Login com usuário ${state.email.value} e senha ${state.password.value}`)
    }

    return { state, close: modal.close, handleSubmit }
  }
}
</script>
