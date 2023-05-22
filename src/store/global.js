import { reactive } from 'vue'

const state = reactive({
  isLoading: false
})

export function setGlobalLoading (state) {
  debugger
  state.isLoading = status
  // FIXME: Typescript Error right here
  console.log(state.isLoading)
}

export default state
