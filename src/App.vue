<script setup>
import EHeader from './components/EHeader.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const showHeader = computed(() => {
  return route.name !== 'GetAllEventsAPI' && route.name !== 'EventCountAPI'
})
</script>

<template>
  <div class="container">
    <div class="row">
      <header v-if="showHeader">
        <EHeader />
      </header>
    </div>

    <!-- <div class="row"> -->
    <div class="justify-content-center">
      <main>
        <router-view></router-view>
      </main>
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped></style>
