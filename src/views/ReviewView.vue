<template>
    <div class="container-fluid py-4">
      <div class="row">
        <!-- Event Details Section -->
        <div class="col-md-6">
          <div class="event-details p-3">
            <h2 class="event-title">Sunshine Marathon Charity Fundraiser</h2>
            <p><strong>Date:</strong> 12.08.2024</p>
            <p><strong>Time:</strong> 9:30 am</p>
            <p><strong>Location:</strong> Clayton</p>
            <p><strong>Status:</strong> Closed</p>
            <p><strong>Rating:</strong> {{ averageRating.toFixed(2) }}</p>
            <p>
              Join us for the "Sunshine Marathon," a vibrant and energetic charity fundraiser dedicated
              to supporting mental health initiatives. This marathon is not just about running—it's
              about coming together as a community to bring light and hope to those facing mental
              health challenges.
            </p>
          </div>
        </div>
  
        <!-- Image and Carousel Section -->
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="image-carousel">
            <!-- Placeholder for Image Carousel -->
            <img src="https://via.placeholder.com/300x200" alt="Event Image" class="img-fluid" />
            <div class="carousel-controls mt-2 d-flex justify-content-center">
              <span class="carousel-dot mx-1"></span>
              <span class="carousel-dot mx-1"></span>
              <span class="carousel-dot mx-1"></span>
            </div>
            <div class="row mt-4">
                <div class="col-md-12 offset-3">
                <button class="btn btn-primary mt-3" @click="writeReview">Write a review</button>
                </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Review Input and Rating Section -->
    </div>
  </template>
  
  <script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { reviews,isReviewed } from '@/composables/review';

  // Computed property to calculate average rating
  const averageRating = computed(() => {
    if (reviews.value.length === 0) return 0;
    const total = reviews.value.reduce((sum, rating) => sum + rating, 0);
    return total / reviews.value.length;
  });
const router = useRouter();

  const writeReview = () =>{
    if (isReviewed.value === true)
    {
        alert('You have already reviewed');
        router.push('/Review');
    } 
    else
    {
        router.push('/AddReview');
    }
  }


  </script>
  
  <style scoped>
  /* .container-fluid {
    max-width: 1200px;
  } */
  
  /* Event details styling */
  .event-details {
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  /* Event title styling */
  .event-title {
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }
  
  /* Image carousel styling */
  .image-carousel img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  /* Carousel controls styling */
  .carousel-controls {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  /* Carousel dots styling */
  .carousel-dot {
    width: 10px;
    height: 10px;
    background-color: #ddd;
    border-radius: 50%;
    display: inline-block;
  }
  
  /* Star rating styling */
  .star {
    font-size: 24px; /* Star size */
    color: #ffc107;  /* Star color */
    cursor: pointer; /* Pointer cursor for interactive elements */
    margin: 0 5px;   /* Spacing between stars */
    transition: color 0.3s ease; /* Smooth color transition */
  }
  
  .star:hover,
  .star:hover ~ .star {
    color: #ffeb3b; /* Color change on hover */
  }
  
  /* Textarea styling */
  .form-control {
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    resize: none; /* Prevent resizing */
  }
  
  /* Submit button styling */
  .btn-primary {
    color: #fff;
    background-color: #0066ff;
    border-color: #0066ff;
    padding: 8px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #0056d2;
    border-color: #0056d2;
  }
  </style>
  