import { reactive } from 'vue'

const state = reactive({
  isLoading: false
})

export function setGlobalLoading (newStatus) {
  state.isLoading = newStatus
}

export default state
