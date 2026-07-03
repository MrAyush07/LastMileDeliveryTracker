import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function OrdersPieChart({ stats }) {

    const data = {

        labels: [
            "Pending",
            "Assigned",
            "In Transit",
            "Delivered",
            "Cancelled"
        ],

        datasets: [
            {
                label: "Orders",
                data: [
                    stats.pendingOrders,
                    stats.assignedOrders,
                    stats.inTransitOrders,
                    stats.deliveredOrders,
                    stats.cancelledOrders
                ],
                backgroundColor: [
                    "#6c757d",
                    "#0d6efd",
                    "#0dcaf0",
                    "#198754",
                    "#dc3545"
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {

        responsive: true,

        plugins: {

            legend: {
                position: "bottom"
            }

        }

    };

    return <Pie data={data} options={options} />;

}

export default OrdersPieChart;