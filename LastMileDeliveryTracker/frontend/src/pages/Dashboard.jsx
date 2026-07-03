import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

import OrdersPieChart from "../components/charts/OrdersPieChart";
import RevenueBarChart from "../components/charts/RevenueBarChart";

import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {

    const [stats, setStats] = useState({

        totalOrders: 0,
        deliveredOrders: 0,
        pendingOrders: 0,
        assignedOrders: 0,
        inTransitOrders: 0,
        cancelledOrders: 0,
        totalAgents: 0,
        revenue: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data.dashboard);

        } catch (error) {

            console.error(error);

            alert("Unable to load dashboard.");

        }

    };

    return (

        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="mb-4">
                        Dashboard
                    </h2>

                    {/* Statistics Cards */}

                    <div className="row">

                        <div className="col-md-3 mb-4">
                            <StatCard
                                title="Total Orders"
                                value={stats.totalOrders}
                            />
                        </div>

                        <div className="col-md-3 mb-4">
                            <StatCard
                                title="Delivered Orders"
                                value={stats.deliveredOrders}
                            />
                        </div>

                        <div className="col-md-3 mb-4">
                            <StatCard
                                title="Delivery Agents"
                                value={stats.totalAgents}
                            />
                        </div>

                        <div className="col-md-3 mb-4">
                            <StatCard
                                title="Revenue"
                                value={`₹${stats.revenue}`}
                            />
                        </div>

                    </div>

                    {/* Charts */}

                    <div className="row">

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow">

                                <div className="card-body">

                                    <h4 className="mb-3">
                                        Orders Overview
                                    </h4>

                                    <OrdersPieChart
                                        stats={stats}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow">

                                <div className="card-body">

                                    <h4 className="mb-3">
                                        Revenue Overview
                                    </h4>

                                    <RevenueBarChart
                                        revenue={stats.revenue}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Extra Statistics */}

                    <div className="row">

                        <div className="col-md-12">

                            <div className="card shadow">

                                <div className="card-body">

                                    <h4 className="mb-3">
                                        Order Statistics
                                    </h4>

                                    <table className="table table-bordered">

                                        <thead className="table-dark">

                                            <tr>

                                                <th>Pending</th>
                                                <th>Assigned</th>
                                                <th>In Transit</th>
                                                <th>Delivered</th>
                                                <th>Cancelled</th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            <tr>

                                                <td>{stats.pendingOrders}</td>
                                                <td>{stats.assignedOrders}</td>
                                                <td>{stats.inTransitOrders}</td>
                                                <td>{stats.deliveredOrders}</td>
                                                <td>{stats.cancelledOrders}</td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;