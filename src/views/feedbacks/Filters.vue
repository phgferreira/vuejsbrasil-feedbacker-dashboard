<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-brand-darkgray">Filtros</h1>
  </div>
  <ul class="flex flex-col mt-3 list-none">
    <li
      v-for="filter in state.filters"
      :key="filter.label"
      :class="{ 'bg-gray-200 bg-opacity-50': filter.active }"
      @click="() => handleSelect(filter)"
      class="flex items-center justify-between px-4 py-1 rounded cursor-pointer"
    >
      <div class="flex items-center">
        <span
          :class="`bg-${filter.color}`"
          class="inline-block w-2 h-2 rounded-full"
        />
        {{ filter.label }}
      </div>
      <span
        :class="filter.active ? `text-${filter.color}` : 'text-brand-graydark'"
        class="font-bold"
      >
          {{ filter.amount }}
        </span>
    </li>
  </ul>
</template>

<script>
import useStore from '@/hooks/useStore'
import { reactive } from 'vue'
import services from '@/services'

const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideia',
  other: 'Outros'
}

const COLORS = {
  all: 'brand-info',
  issue: 'brand-danger',
  idea: 'brand-warning',
  other: 'brand-graydark'
}

export default {
  async setup (props, { emit }) {
    const store = useStore('Global')
    const state = reactive({
      hasError: false,
      filters: [
        { label: null, amount: null }
      ]
    })

    function applyFiltersStructure (summary) {
      return Object.keys(summary).reduce((old, current) => {
        const currentFilter = {
          label: LABELS[current],
          color: COLORS[current],
          amount: summary[current]
        }

        if (current === 'all') {
          currentFilter.active = true
        } else {
          currentFilter.type = current
        }

        return [...old, currentFilter]
      }, [])
    }

    try {
      const { data } = await services.feedbacks.getSummary()
      state.filters = applyFiltersStructure(data)
    } catch (error) {
      state.hasError = !!error
      state.filters = applyFiltersStructure({ all: '', issue: '', idea: '', other: '' })
    }

    function handleSelect ({ type }) {
      if (store.isLoading) {
        return
      }
      state.filters = state.filters.map((filter) => {
        if (filter.type === type) {
          return { ...filter, active: true }
        }
        return { ...filter, active: false }
      })
      emit('select', type)
    }

    return { state, handleSelet: handleSelect }
  }
}
</script>
