import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphComponent3 = () => {
  const chartRef = useRef(null);

  const mainChartData = {
    labels: ['DPA', 'PDES', 'Analytics'],
    datasets: [
      {
        label: 'Company COE Departments',
        data: [56.74, 62.57, 44.23],
        backgroundColor: ['#4285F4', '#FF7139', '#1EBBEE'],
      },
    ],
  };

  const [chartData, setChartData] = useState(mainChartData);

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      
    },
    onClick: handleClick,
  });

  const drilldownData = {
    DPA: {
      labels: ['v65.0', 'v64.0', 'v63.0', 'v62.0', 'v61.0'],
      datasets: [
        {
          label: 'DPA Versions',
          data: [0.1, 1.3, 53.02, 1.4, 0.88],
          backgroundColor: '#4285F4',
        },
      ],
    },
    PDES: {
      labels: ['v58.0', 'v57.0', 'v56.0'],
      datasets: [
        {
          label: 'PDES Versions',
          data: [1.02, 7.36, 0.35],
          backgroundColor: '#FF7139',
        },
      ],
    },
    'Analytics': {
      labels: ['v11.0', 'v10.0', 'v9.0'],
      datasets: [
        {
          label: 'Analytics Versions',
          data: [6.2, 0.29, 0.27],
          backgroundColor: '#1EBBEE',
        },
      ],
    },
  };

  function handleClick(event) {
    const chart = chartRef.current;
    if (!chart) return;

    const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

    if (points.length) {
      const firstPoint = points[0];
      const label = chartData.labels[firstPoint.index];
      const data = drilldownData[label];

      if (data) {
        setChartData(data);
        setChartOptions({
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
          },
        });
      }
    }
  }

  function handleBackClick() {
    setChartData(mainChartData);
    setChartOptions({
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        
      },
    });
  }

  return (
    <div>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
      {chartData !== mainChartData && (
        <button className="bg-purple hover:bg-dark-purple font-sans textm-medium text-white rounded-lg px-2 py-2" onClick={handleBackClick}>Back</button>
      )}
    </div>
  );
};

export default GraphComponent3;