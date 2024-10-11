<template>
  <div class="container mt-4">
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedEvent"
      :value="events"
      stateStorage="session"
      stateKey="dt-state-demo-session"
      paginator
      :rows="10"
      selectionMode="single"
      dataKey="id"
      :globalFilterFields="['name', 'location', 'date', 'status', 'rating']"
      tableStyle="min-width: 50rem"
    >
      <!-- Global Search in Header -->
      <template #header>
        <div class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <InputText
            v-model="filters['global'].value"
            placeholder="Global Search"
          />
        </div>
      </template>

      <!-- Event Name Column -->
      <Column field="name" header="Event Name" sortable style="width: 25%">
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by event name"
          />
        </template>
      </Column>

      <!-- Event Location Column -->
      <Column
        field="location"
        header="Location"
        sortable
        filterField="location"
        filterMatchMode="contains"
        style="width: 25%"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by location"
          />
        </template>
      </Column>

      <!-- Event Date Column -->
      <Column field="date" header="Event Date" sortable style="width: 25%">
        <template #body="{ data }">
          <span>{{ formatDate(data.date) }}</span>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by date"
          />
        </template>
      </Column>

      <!-- Rating Column -->
      <Column field="rating" header="Rating" sortable style="width: 25%">
        <template #body="{ data }">
          <span>{{ data.rating }}</span>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by rating"
          />
        </template>
      </Column>

      <!-- Status Column -->
      <Column
        field="status"
        header="Status"
        sortable
        filterMatchMode="equals"
        style="width: 25%"
      >
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel }">
          <Select
            v-model="filterModel.value"
            :options="statuses"
            placeholder="Select One"
            showClear
          >
            <template #option="slotProps">
              <Tag
                :value="slotProps.option"
                :severity="getSeverity(slotProps.option)"
              />
            </template>
          </Select>
        </template>
      </Column>

      <!-- Fallback when no events found -->
      <template #empty> No events found. </template>
    </DataTable>
  </div>

  <div class="d-flex justify-content-center">
    <button @click="downloadCsv" class="btn btn-outline-success">
      Download events as .csv format
    </button>
  </div>

  <div class="d-flex justify-content-center">
    <button @click="downloadPdf" class="btn btn-outline-success">
      Download events as .pdf format
    </button>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input
      type="email"
      class="form-control"
      id="exampleInputEmail1"
      v-model="email"
      aria-describedby="emailHelp"
    />
    <div id="emailHelp" class="form-text">
      We'll never share your email with anyone else.
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <button @click="getAllEventsByEmail" class="btn btn-outline-success">
      Send me an email about the events
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '@/firebase/init'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import axios from 'axios'

const error = ref(null)
const email = ref('')
const count = ref(null)
// Initialize reactive variables
const events = ref([]) // Event data will be fetched from Firestore
const filters = ref({
  global: { value: null }
})
const selectedEvent = ref(null)
const statuses = ref(['Active', 'Completed', 'Upcoming'])

// Function to fetch event data from Firestore
const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'events')) // Fetch events collection from Firestore
    const fetchedEvents = []
    querySnapshot.forEach((doc) => {
      fetchedEvents.push({ id: doc.id, ...doc.data() }) // Add document data to events array
    })
    events.value = fetchedEvents // Set the events to the fetched data
  } catch (error) {
    console.error('Error fetching events from Firestore:', error)
  }
}

// Function to determine severity for status
const getSeverity = (status) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Completed':
      return 'info'
    case 'Upcoming':
      return 'warning'
    default:
      return 'neutral'
  }
}

// Function to format Firestore timestamp to a readable date
const formatDate = (timestamp) => {
  if (timestamp && timestamp.toDate) {
    const date = timestamp.toDate() // Convert Firestore timestamp to JS Date
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date) // Format date as MM/DD/YYYY or similar
  }
  return ''
}

const getAllEventsByEmail = async () => {
  try {
    const receiverEmail = email.value
    const response = await axios.post(
      'https://sendeventemail-tvbscw7eca-uc.a.run.app',
      {
        email: receiverEmail
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('Email sent successfully', response.data)
    alert('Email sent!')
    email.value = ''
  } catch (error) {
    console.log('Error sending email', error)
  }
}

const getEvents = async () => {
  try {
    const response = await axios.get(
      'https://getevents-tvbscw7eca-uc.a.run.app'
    )
    events.value = response.data
    error.value = null
    console.log(events.value)
  } catch (error) {
    console.error('Error fetching events', error)
    error.value = error
    count.value = null
  }
}

const downloadCsv = async () => {
  try {
    const response = await axios.get(
      'https://downloadeventscsv-tvbscw7eca-uc.a.run.app',
      {
        responseType: 'blob'
      }
    )

    // Create a link element to trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'events.csv') // Specify the filename
    document.body.appendChild(link)
    link.click() // Trigger the download
  } catch (error) {
    console.error('Error downloading CSV:', error)
  }
}

const downloadPdf = async () => {
  try {
    const response = await axios.get(
      'https://downloadeventspdf-tvbscw7eca-uc.a.run.app',
      {
        responseType: 'blob'
      }
    )

    // Create a link element to trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'events.pdf') // Specify the filename
    document.body.appendChild(link)
    link.click() // Trigger the download
  } catch (error) {
    console.error('Error downloading PDF:', error)
  }
}
// Fetch data when component is mounted
onMounted(() => {
  fetchEvents() // Fetch the events from Firestore on mount
})
</script>
