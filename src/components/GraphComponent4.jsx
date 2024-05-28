// // src/SlicingDicingChart.js
// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const GraphComponent4 = () => {
//   const [dataRange, setDataRange] = useState('all');

//   const rawData = {
//     all: {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//         {
//           label: 'Dataset 1',
//           data: [65, 59, 80, 81, 56, 55, 40],
//           borderColor: 'rgba(75,192,192,1)',
//           backgroundColor: 'rgba(75,192,192,0.2)',
//         },
//         {
//           label: 'Dataset 2',
//           data: [28, 48, 40, 19, 86, 27, 90],
//           borderColor: 'rgba(153,102,255,1)',
//           backgroundColor: 'rgba(153,102,255,0.2)',
//         },
//       ],
//     },
//     firstHalf: {
//       labels: ['January', 'February', 'March', 'April'],
//       datasets: [
//         {
//           label: 'Dataset 1',
//           data: [65, 59, 80, 81],
//           borderColor: 'rgba(75,192,192,1)',
//           backgroundColor: 'rgba(75,192,192,0.2)',
//         },
//         {
//           label: 'Dataset 2',
//           data: [28, 48, 40, 19],
//           borderColor: 'rgba(153,102,255,1)',
//           backgroundColor: 'rgba(153,102,255,0.2)',
//         },
//       ],
//     },
//     secondHalf: {
//       labels: ['May', 'June', 'July'],
//       datasets: [
//         {
//           label: 'Dataset 1',
//           data: [56, 55, 40],
//           borderColor: 'rgba(75,192,192,1)',
//           backgroundColor: 'rgba(75,192,192,0.2)',
//         },
//         {
//           label: 'Dataset 2',
//           data: [86, 27, 90],
//           borderColor: 'rgba(153,102,255,1)',
//           backgroundColor: 'rgba(153,102,255,0.2)',
//         },
//       ],
//     },
//   };

//   const chartData = rawData[dataRange];

//   return (
//     <div>
//       <div>
//         <select className='border rounded-lg border-black' id="dataRange" value={dataRange} onChange={(e) => setDataRange(e.target.value)}>
//           <option value="all">All Data</option>
//           <option value="firstHalf">First Half</option>
//           <option value="secondHalf">Second Half</option>
//         </select>
//       </div>
//       <Line data={chartData} options={{ responsive: true }} />
//     </div>
//   );
// };

// export default GraphComponent4;

// src/SlicingDicingChart.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphComponent4 = () => {
  const [selectedDataset, setSelectedDataset] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const rawData = [
    { date: '2023-01-01', dataset1: 65, dataset2: 28 },
    { date: '2023-02-01', dataset1: 59, dataset2: 48 },
    { date: '2023-03-01', dataset1: 80, dataset2: 40 },
    { date: '2023-04-01', dataset1: 81, dataset2: 19 },
    { date: '2023-05-01', dataset1: 56, dataset2: 86 },
    { date: '2023-06-01', dataset1: 55, dataset2: 27 },
    { date: '2023-07-01', dataset1: 40, dataset2: 90 },
  ];

  const filterData = (data, dataset, start, end) => {
    return data.filter((entry) => {
      const date = new Date(entry.date);
      const startDate = start ? new Date(start) : null;
      const endDate = end ? new Date(end) : null;

      return (!startDate || date >= startDate) && (!endDate || date <= endDate);
    }).map(entry => ({
      x: entry.date,
      y: entry[dataset]
    }));
  };

  const chartData = {
    labels: rawData.map(entry => entry.date),
    datasets: [
      {
        label: 'Dataset 1',
        data: filterData(rawData, selectedDataset === 'all' || selectedDataset === 'dataset1' ? 'dataset1' : null, startDate, endDate),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: 'Dataset 2',
        data: filterData(rawData, selectedDataset === 'all' || selectedDataset === 'dataset2' ? 'dataset2' : null, startDate, endDate),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
      },
    ].filter(dataset => dataset.data.length > 0),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <div>
        <label className="font-semibold" htmlFor="dataset">Select Dataset: </label>
        <select className="border border-black rounded-lg" id="dataset" value={selectedDataset} onChange={(e) => setSelectedDataset(e.target.value)}>
          <option value="all">All Data</option>
          <option value="dataset1">Dataset 1</option>
          <option value="dataset2">Dataset 2</option>
        </select>
      </div>
      <div>
        <label className="font-semibold" htmlFor="startDate">Start Date: </label>
        <input className='border border-black mx-2 my-2 rounded-lg' type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label className="font-semibold" htmlFor="endDate">End Date: </label>
        <input className='border border-black mx-2 my-2 rounded-lg' type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraphComponent4;

