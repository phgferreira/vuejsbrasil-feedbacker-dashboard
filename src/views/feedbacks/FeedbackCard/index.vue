<template>
  <div
    class="flex flex-col px-8 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type" />
      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>
  </div>
</template>

<script>
import Badge from '@/views/feedbacks/FeedbackCard/Badge.vue'
import { getDiffTimeBetweenCurrentDate } from '@/utils/date'

export default {
  methods: { getDiffTimeBetweenCurrentDate },
  components: { Badge },
  props: {
    feedback: { type: Object, required: true }
  },
  setup () {
    function handleToggle () {

    }

    return { handleToggle }
  }
}
</script>
