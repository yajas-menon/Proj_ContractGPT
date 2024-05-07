import React from 'react'

const GraphComponent = () => {
  return (
    <div>
      <body class="bg-zinc-100 p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h2 class="text-lg font-semibold">Total Revenue</h2>
                    <p class="text-sm text-zinc-600">12.04.2022 - 12.05.2022</p>
                </div>
                <select class="border p-1 rounded">
                    <option>Day</option>
                    <option selected>Week</option>
                    <option>Month</option>
                </select>
            </div>
            <img src="https://placehold.co/400x250?text=Line+Chart" alt="Line Chart"/>
        </div>

        
        <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Profit this week</h2>
                <select class="border p-1 rounded">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                </select>
            </div>
            <img src="https://placehold.co/400x250?text=Bar+Chart" alt="Bar Chart"/>
        </div>
    </div>
</body>

    </div>
  )
}

export default GraphComponent
