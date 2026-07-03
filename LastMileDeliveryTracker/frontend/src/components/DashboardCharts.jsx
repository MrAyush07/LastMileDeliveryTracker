import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function DashboardCharts({ stats }) {

  const pieData = {
    labels: [
      "Pending",
      "Assigned",
      "In Transit",
      "Delivered",
      "Cancelled"
    ],
    datasets: [
      {
        data: [
          stats.pendingOrders,
          stats.assignedOrders,
          stats.inTransitOrders,
          stats.deliveredOrders,
          stats.cancelledOrders
        ]
      }
    ]
  };

  const barData = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Revenue",
        data: [stats.revenue]
      }
    ]
  };

  return (
    <div className="row mt-4">

      <div className="col-md-6">
        <div className="card shadow p-3">
          <h5>Orders by Status</h5>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="col-md-6">
        <div className="card shadow p-3">
          <h5>Total Revenue</h5>
          <Bar data={barData} />
        </div>
      </div>

    </div>
  );
}

export default DashboardCharts;