<script setup>
import EHeader from './components/EHeader.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <header>
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
