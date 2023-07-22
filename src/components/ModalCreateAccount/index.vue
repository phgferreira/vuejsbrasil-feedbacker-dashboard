<template>
  <div class="flex justify-between" data-cy="modal-create-account">
    <h1 class="text-4xl font-black text-gray-800 focus:outline-none">Crie uma conta</h1>
    <button class="text-4xl text-gray-600" @click="close">
      Fechar
    </button>
  </div>
  <div class="vt-16">
    <form @submit.prevent="handleSubmit">

      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input v-model="state.name.value" type="text"
               class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
               :class="{'border-brand-danger' : !!state.name.errorMessage}"
               placeholder="Fulano de Tal"
        >
        <span v-if="!!state.name.errorMessage" class="block font-medium text-brand-danger">{{ state.name.errorMessage }}</span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-Mail</span>
        <input v-model="state.email.value" type="email"
               class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
               :class="{'border-brand-danger' : !!state.email.errorMessage}"
               placeholder="paulo.ferreira@vuejs.com.br"
        >
        <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">{{ state.email.errorMessage }}</span>
      </label>

      <label class="block mt-9">
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
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import useModal from '@/hooks/useModal'
import { useField } from 'vee-validate'
import { validateEmptyAndEmail, validateEmptyAndLength3 } from '@/utils/validators'
import services from '@/services'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Icon from '@/components/Icon/index.vue'

export default {
  components: { Icon },
  setup () {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndLength3)
    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)
    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasError: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({
        email: email,
        password: password
      })
      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        modal.close()
      }
      state.isLoading = false
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })
        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })
          return
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao criar a conta')
        }
        state.isLoading = false
      } catch (exception) {
        state.isLoading = false
        state.hasError = !!exception
        toast.error('Ocorreu um erro ao criar a conta')
      }
    }

    return { state, close: modal.close, handleSubmit }
  }
}
</script>
