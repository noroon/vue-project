<script setup lang="ts">
import { toRefs } from 'vue'

interface CardProps {
  bg?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  bg: 'bg-gray-100',
})

const { bg } = toRefs(props)
</script>

<template>
  <div :class="`${bg} p-6 rounded-lg shadow-md`">
    <slot></slot>
  </div>
</template>
