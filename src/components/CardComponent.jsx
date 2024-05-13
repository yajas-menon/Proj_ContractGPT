import React from 'react'

const CardComponent = () => {
  return (
    <div>
      <div class="bg-white p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p class="text-2xl font-semibold">10</p>
            <p class="text-zinc-600">Renewal Rate-Y2D</p>
            <p class="text-green-500 flex items-center mt-1">0.43%</p>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p class="text-2xl font-semibold">78</p>
            <p class="text-zinc-600">Compliance adherence</p>
            <p class="text-green-500 flex items-center mt-1">4.35%</p>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p class="text-2xl font-semibold">20</p>
            <p class="text-zinc-600">Contract Due for Renewal</p>
            <p class="text-green-500 flex items-center mt-1">2.59%</p>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p class="text-2xl font-semibold">36</p>
            <p class="text-zinc-600">Contracts Executed</p>
            <p class="text-red-500 flex items-center mt-1">0.95%</p>
          </div>
        </div>
    </div>
  )
}

export default CardComponent
