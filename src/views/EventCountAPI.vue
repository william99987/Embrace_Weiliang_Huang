<template>
  <div id="app">
    <pre> {{ jsondata }}</pre>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const count = ref(null)
const error = ref(null)

const getEventsCount = async () => {
  try {
    const response = await axios.get(
      'https://countevents-tvbscw7eca-uc.a.run.app'
    )
    count.value = response.data
    jsondata.value = response.data
    error.value = null
  } catch (error) {
    console.error('Error fetching event count:', error)
    error.value = error
    count.value = null
    jsondata.value = null
  }
}

onMounted(getEventsCount)
</script>
