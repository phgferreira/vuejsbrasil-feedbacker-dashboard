<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Loading from './Loading.vue'
import Copy from '@/components/Icon/Copy.vue'
import ChevronDown from '@/components/Icon/ChevronDown.vue'
export default {
  components: { Loading, Copy, ChevronDown },
  props: {
    name: { type: String, required: true }
  }
}

</script>
