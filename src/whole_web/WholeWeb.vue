<script setup>
import EHeader from '../components/EHeader.vue';
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <EHeader />
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
            <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>