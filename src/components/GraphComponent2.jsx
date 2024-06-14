import React from "react";
import WorldMap from "react-svg-worldmap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphComponent2 = () => {
  const data = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
  ];
  const data1 = {
    labels: ["Compliance", "Non-Compliance"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {};

  return (
    <div>
      <div class="flex flex-wrap gap-8 p-8 ">
        <div class="flex-1">
          <div class="bg-white shadow rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h2 class="text-2xl font-semibold">Compliance Analysis-Y2D</h2>
                <hr className="h-px bg-gray-400 border-0 dark:bg-gray-700" />
              </div>
              <select class="border border-zinc-300 rounded p-2 text-sm">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            </div>
            <div class="flex justify-center items-center w-6/12 ml-40">
              <Doughnut data={data1} options={options}></Doughnut>
            </div>
          </div>
        </div>

        <div class="flex-1">
          <div class="bg-white shadow rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h2 class="text-2xl font-semibold">
                  Contract Based on Geo Location
                </h2>
                <hr className="h-px bg-gray-400 border-0 dark:bg-gray-700" />
              </div>
            </div>
            <div class="flex justify-center items-center">
              <WorldMap
                color="red"
                value-suffix="people"
                size="lg"
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphComponent2;
