<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-center">
      <div class="row">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="card mb-3"
          style="max-width: 800px"
        >
          <div class="row g-0">
            <!-- Image Section -->
            <div class="col-md-4">
              <img :src="event.image" class="img-fluid rounded-start" :alt="event.title" />
            </div>

            <!-- Event Information Section -->
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ event.title }}</h5>
                <p class="card-text">{{ event.description }}</p>
                <p class="card-text">
                  <small class="text-body-secondary">Last updated {{ event.updated }}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="d-flex justify-content-center">
    <button class="btn btn-outline-success">Send me an email about the events</button>
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
    image: 'https://placehold.co/300x180' // Placeholder image
  },
  {
    title: 'Mental Health Match',
    description:
      'Encourage sporting teams to go beyond the match by raising awareness and crucial mental health topics during games.',
    updated: 'Last updated 2 days ago',
    image: 'https://placehold.co/300x180' // Placeholder image
  }
  // Add more event data here...
])

const getEventInfor = async () => {
  try {
  } catch (error) {}
}
</script>

<style scoped>
/* Optional: add any additional styling here if needed */
</style>
