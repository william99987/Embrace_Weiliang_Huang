<template>
  <div>
    <!-- Search Input for Places -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a place"
      @keyup.enter="searchPlace"
      class="search-input"
    />

    <!-- Search Result -->
    <div v-if="searchResult">
      <h3>Search Result:</h3>
      <p>{{ searchResult.place_name }}</p>
      <button @click="navigateTo(searchResult.geometry.coordinates)">
        Navigate to this location
      </button>
    </div>

    <!-- Map Container -->
    <div id="map" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

// State Variables
const searchQuery = ref('')
const searchResult = ref(null)
let map, directions, startMarker, endMarker

// Initialize the map
onMounted(() => {
  map = new mapboxgl.Map({
    container: 'map', // Container ID
    style: 'mapbox://styles/mapbox/streets-v11', // Map style
    center: [144.9631, -37.8136],
    zoom: 12
  })

  // Add directions control
  directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
    interactive: false
  })

  // Add Directions control to the map
  map.addControl(directions, 'top-left')
})

// Search for places using Geocoding API
const searchPlace = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchQuery.value
      )}.json?access_token=${mapboxgl.accessToken}`
    )
    const data = await response.json()
    if (data.features.length > 0) {
      searchResult.value = data.features[0]
      // Get the coordinates of the search result
      const [longitude, latitude] = searchResult.value.geometry.coordinates

      // Center the map on the search result's location
      map.setCenter([longitude, latitude])
      map.setZoom(14)

      // Add a marker to the search result's location
      if (endMarker) endMarker.remove() // Remove previous marker, if any
      endMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([longitude, latitude])
        .addTo(map)
    } else {
      alert('No results found')
    }
  } catch (error) {
    console.error('Error searching place:', error)
  }
}

// Navigate to the selected place
const navigateTo = (coordinates) => {
  if (endMarker) endMarker.remove() // Remove previous end marker

  // Add a marker for the destination
  endMarker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .addTo(map)

  // Get current location as the start point
  navigator.geolocation.getCurrentPosition((position) => {
    const start = [position.coords.longitude, position.coords.latitude]
    if (startMarker) startMarker.remove() // Remove previous start marker

    // Add a marker for the start location
    startMarker = new mapboxgl.Marker({ color: 'blue' })
      .setLngLat(start)
      .addTo(map)

    // Get the route using Mapbox Directions API
    directions.setOrigin(start) // Start point
    directions.setDestination(coordinates) // End point
  })
}
</script>

<style scoped>
@import 'https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css';
/* @import 'https://api.mapbox.com/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css'; */

.map-container {
  width: 100%;
  height: 500px;
}

.search-input {
  margin-bottom: 10px;
  padding: 10px;
  width: 300px;
}
</style>
