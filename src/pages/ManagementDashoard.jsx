import React from 'react'
import Navbar from '../components/Navbar'

const ManagementDashoard = () => {
  return (
    <div>
      <Navbar />
      <div class="bg-white p-6 mx-10 mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 class="font-bold text-lg">Total SOW In Progress</h2>
            <p class="text-3xl font-semibold">27</p>
          </div>

          <div class="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 class="font-bold text-lg">Total Value in Progress</h2>
            <p class="text-3xl font-semibold">17M</p>
          </div>

          <div class="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 class="font-bold text-lg">Total SOWs expiring in 60 days</h2>
            <p class="text-3xl font-semibold">27</p>
          </div>

          <div class="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 class="font-bold text-lg">Total projects in progress</h2>
            <p class="text-3xl font-semibold">27</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="font-bold text-lg mb-2">Contract value by supplier</h2>
            <img
              src="https://placehold.co/600x300"
              alt="Contract value by supplier chart"
              class="w-full"
            />
          </div>

          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="font-bold text-lg mb-2">Active SOW Trend</h2>
            <img src="https://placehold.co/600x300" alt="Active SOW Trend chart" class="w-full" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">


          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="font-bold text-lg mb-2">Contract Type View</h2>
            <img src="https://placehold.co/600x300" alt="Contract Type View chart" class="w-full" />
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="font-bold text-lg mb-2">Practice View of Active SOWs</h2>
            <img
              src="https://placehold.co/600x300"
              alt="Practice View of Active SOWs chart"
              class="w-full"
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default ManagementDashoard