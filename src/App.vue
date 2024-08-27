<script setup>
import EHeader from './components/EHeader.vue';
</script>

<template>
  <header>
    <EHeader />
  </header>
  
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
</style>