<script setup lang="ts">
import type { Job } from '@/types/job'
import { ref } from 'vue'

const { job } = defineProps<{
  job: Job
}>()

const showFullDescription = ref(false)
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ job.type }}</div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
      </div>

      <div class="mb-5">
        <div :class="showFullDescription ? '' : 'line-clamp-3'">
          {{ job.description }}
        </div>
        <!-- don't show the button if job.description is less than 3 lines -->
        <button
          class="flex justify-self-end text-green-500 hover:text-green-600 text-sm"
          @click="showFullDescription = !showFullDescription"
        >
          {{ showFullDescription ? 'Show less' : 'Show more' }}
        </button>
      </div>

      <h3 class="text-green-500 mb-2">{{ job.salary }} / Year</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-map-marker"></i>
          {{ job.location }}
        </div>

        <a
          :href="'/job/' + job.id"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
</template>
