<template>
  <div class="container">
    <h2>Admin Dashboard - User Management</h2>

    <!-- Chart for showing user data -->
    <div class="card">
      <h3>Users by Role</h3>
      <h4>Filter by Role</h4>
      <div>
        <input
          type="checkbox"
          id="admin"
          value="admin"
          v-model="selectedRoles"
          @change="filterUsers"
        />
        <label for="admin">Admin</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="user"
          value="user"
          v-model="selectedRoles"
          @change="filterUsers"
        />
        <label for="user">User</label>
      </div>
      <Chart
        type="bar"
        :data="chartData"
        :options="chartOptions"
        class="h-80"
      />
    </div>

    <!-- User Table -->
    <div class="card">
      <DataTable
        :value="users"
        selectionMode="checkbox"
        v-model:selection="selectedUsers"
        :paginator="true"
        :rows="5"
        responsiveLayout="scroll"
      >
        <Column selectionMode="multiple" style="width: 3rem"></Column>
        <Column field="email" header="Email" sortable>
          <template #body="{ data }">
            <span>{{ data.email }}</span>
          </template>
        </Column>
        <Column field="role" header="Role" sortable>
          <template #body="{ data }">
            <span>{{ data.role }}</span>
          </template>
        </Column>
      </DataTable>

      <!-- Bulk Email Button -->
      <div class="mt-4">
        <Button
          label="Send Bulk Email"
          icon="pi pi-envelope"
          :disabled="!selectedUsers.length"
          @click="sendBulkEmail"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import axios, { all } from 'axios' // For fetching users and sending emails
import db from '@/firebase/init'
import { getDocs, collection } from 'firebase/firestore'

const chartData = ref(null)
const chartOptions = ref(null)
const users = ref([]) // Holds the user data
const selectedUsers = ref([]) // Holds the selected users for bulk email
const roleCounts = ref({
  admin: 0, // Predefine 'admin' role
  user: 0 // Predefine 'user' role
})
const selectedRoles = ref([]) // Holds selected roles for the filter
const filteredUsers = ref([]) // Filtered users list

// Function to fetch user data from Firestore
const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users')) // Fetch events collection from Firestore
    const fetchedUsers = []
    roleCounts.value.admin = 0
    roleCounts.value.user = 0
    querySnapshot.forEach((doc) => {
      const user = doc.data()
      fetchedUsers.push({ id: doc.id, ...doc.data() })
      // console.log(user.role)
      if (user.role === 'admin') {
        roleCounts.value.admin += 1
      } else if (user.role === 'user') {
        roleCounts.value.user += 1
      }
      console.log(roleCounts.value)
    })
    users.value = fetchedUsers // Set the events to the fetched data
    updateChartData(roleCounts)
  } catch (error) {
    console.error('Error fetching events from Firestore:', error)
  }
}

// Send bulk email to selected users
const sendBulkEmail = async () => {
  if (!selectedUsers.value.length) {
    alert('Please select at least one user to send an email.')
    return
  }

  try {
    const emailList = selectedUsers.value.map((user) => user.email) // Get the email addresses of selected users

    // Call your backend function to send the email
    await axios.post('https://sendpromoteemail-tvbscw7eca-uc.a.run.app', {
      emails: emailList
    })

    alert('Bulk email sent successfully!')
  } catch (error) {
    console.error('Error sending bulk email:', error)
    alert('Failed to send bulk email.')
  }
}

// Function to update the chart with user data
const updateChartData = (roleCounts) => {
  chartData.value = setChartData(roleCounts)
  chartOptions.value = setChartOptions()
}

const filterUsers = () => {
  if (!selectedRoles.value.length) {
    filteredUsers.value = users.value // Show all users if no roles are selected
  } else {
    filteredUsers.value = users.value.filter((user) =>
      selectedRoles.value.includes(user.role)
    )
  }
}

// Initialize chart data with dynamic user counts
function setChartData(roleCounts) {
  const documentStyle = getComputedStyle(document.documentElement)
  // const labels = Object.keys(roleCounts) // Dynamically use roles as labels
  const data = roleCounts.value
  console.log(data)
  return {
    datasets: [
      {
        type: 'bar',
        label: 'Number of Users',
        backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
        data: data,
        barThickness: 32,
        borderRadius: { topLeft: 8, topRight: 8 }
      }
    ]
  }
}

function setChartOptions() {
  const documentStyle = getComputedStyle(document.documentElement)
  const borderColor = documentStyle.getPropertyValue('--surface-border')
  const textMutedColor = documentStyle.getPropertyValue(
    '--text-color-secondary'
  )

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    scales: {
      x: {
        ticks: {
          color: textMutedColor
        },
        grid: {
          color: 'transparent',
          borderColor: 'transparent'
        }
      },
      y: {
        ticks: {
          color: textMutedColor
        },
        grid: {
          color: borderColor,
          borderColor: 'transparent',
          drawTicks: false
        }
      }
    }
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.container {
  padding: 20px;
}

.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.mt-4 {
  margin-top: 16px;
}
</style>
