<template>
  <div id="app">
    <pre> {{ jsondata }}</pre>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const events = ref(null)
const error = ref(null)

const getAllEvents = async () => {
  try {
    const response = await axios.get(
      'https://getevents-tvbscw7eca-uc.a.run.app'
    )
    events.value = response.data
    jsondata.value = response.data
    error.value = null
  } catch (error) {
    console.error('Error fetching events:', error)
    error.value = error
    events.value = null
    jsondata.value = null
  }
}

onMounted(getAllEvents)
</script>
