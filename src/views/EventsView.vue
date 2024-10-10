<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-center">
      <div class="row">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="card mb-3"
          style="max-width: 800px"
          role="region"
          :aria-labelledby="'event-title-' + index"
          aria-describedby="'event-description-' + index"
        >
          <div class="row g-0">
            <!-- Image Section -->
            <div class="col-md-4">
              <img
                :src="event.image"
                class="img-fluid rounded-start"
                :alt="'Image of ' + event.title"
                width="300"
                height="180"
              />
            </div>

            <!-- Event Information Section -->
            <div class="col-md-8">
              <div class="card-body">
                <h5 id="'event-title-' + index" class="card-title">
                  {{ event.title }}
                </h5>
                <p id="'event-description-' + index" class="card-text">
                  {{ event.description }}
                </p>
                <p class="card-text">
                  <small class="text-body-secondary"
                    >Last updated {{ event.updated }}</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
// Sample volunteer events data
const events = ref([
  {
    title: 'Volunteer for Nike Melbourne Marathon Festival',
    description:
      'Join our crew of volunteers to run two drinks stations located at the iconic MCG. You’ll be serving water and Gatorade to runners and cheering them on as they cross the finish line!',
    updated: '13 October 2024',
    image: '../assets/marathon.jpg' // Placeholder image
  },
  {
    title: 'Mental Health Match',
    description:
      'Encourage sporting teams to go beyond the match by raising awareness and crucial mental health topics during games.',
    updated: 'Last updated 2 days ago',
    image: '../assets/sport.jpg' // Placeholder image
  }
  // Add more event data here...
])
</script>

<style scoped></style>
