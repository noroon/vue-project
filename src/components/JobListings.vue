<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { VueSpinner } from 'vue3-spinners'
import JobCard from './JobCard.vue'
import type { Job } from '@/types/job'

interface Props {
  limit?: number
  showButton?: boolean
}

interface State {
  jobs: Job[]
  loading: boolean
  error: string | null
}

const props = withDefaults(defineProps<Props>(), {
  showButton: false,
})

const state = reactive<State>({
  jobs: [],
  loading: true,
  error: '',
})

const visibleJobs = computed(() => (props.limit ? state.jobs.slice(0, props.limit) : state.jobs))

onMounted(async () => {
  try {
    const { data } = await axios.get<Job[]>('http://localhost:8000/jobs')
    state.jobs = data
  } catch (err) {
    state.error = 'Failed to load jobs'
    console.error(err)
  } finally {
    state.loading = false
  }
})
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">Browse Jobs</h2>
      <div v-if="state.loading" class="flex justify-center text-green-500 text-5xl py-6">
        <VueSpinner />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobCard v-for="job in visibleJobs" :key="job.id" :job="job" />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
