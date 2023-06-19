<template>
  <span
    class="p-2 text-xs font-black text-white uppercase rounded-full"
    :class="`bg-${classColor}`"
  >
    {{ label }}
  </span>
</template>
<script>
import { computed } from 'vue'
const types = {
  ISSUE: 'problema',
  IDEA: 'ideia'
}
const colors = {
  ISSUE: 'brand-danger',
  IDEA: 'brand-warning'
}

export default {
  props: {
    type: { type: String, required: true }
  },
  setup (props) {
    const label = computed(() => types[props.type] ?? 'outros')
    const classColor = computed(() => colors[props.type] ?? 'brand-graydark')

    return { label, classColor }
  }
}
</script>
