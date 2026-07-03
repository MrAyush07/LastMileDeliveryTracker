import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function RevenueBarChart({ revenue }) {

    const data = {

        labels: ["Revenue"],

        datasets: [
            {
                label: "Revenue (₹)",
                data: [revenue],
                backgroundColor: [
                    "#198754"
                ]
            }
        ]
    };

    const options = {

        responsive: true,

        plugins: {

            legend: {
                display: false
            },

            title: {
                display: true,
                text: "Total Revenue"
            }

        }

    };

    return <Bar data={data} options={options} />;

}

export default RevenueBarChart;