import React from 'react'

const CardComponent = () => {
  return (
    <div>
      <div class="bg-white p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p class="text-2xl font-semibold">$3.456K</p>
            <p class="text-zinc-600">Total views</p>
            <p class="text-green-500 flex items-center mt-1">0.43%</p>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p class="text-2xl font-semibold">$45.2K</p>
            <p class="text-zinc-600">Total Profit</p>
            <p class="text-green-500 flex items-center mt-1">4.35%</p>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p class="text-2xl font-semibold">2.450</p>
            <p class="text-zinc-600">Total Product</p>
            <p class="text-green-500 flex items-center mt-1">2.59%</p>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p class="text-2xl font-semibold">3.456</p>
            <p class="text-zinc-600">Total Users</p>
            <p class="text-red-500 flex items-center mt-1">0.95%</p>
          </div>
        </div>
    </div>
  )
}

export default CardComponent
