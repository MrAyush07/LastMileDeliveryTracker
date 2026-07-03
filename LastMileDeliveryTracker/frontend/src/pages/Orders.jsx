import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {

    let data = [...orders];
    if (search !== "") {
        data = data.filter(order =>order.trackingId.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (statusFilter !== "") {
        data = data.filter(
            order => order.status === statusFilter
        );
    }

    setFilteredOrders(data);

}, [search, statusFilter, orders]);

    const loadOrders = async () => {
        try {
            const res = await api.get("/orders");
            setOrders(res.data.orders);
            setFilteredOrders(res.data.orders);
        } catch (err) {
            console.log(err);
        }
    };
    const updateStatus = async (id, status) => {
        try {
            await api.put(`/orders/${id}/status`, {
                status,
            });

            alert("Status Updated Successfully");

            loadOrders();
        } catch (err) {
            alert(err.response?.data?.message || "Update Failed");
        }
    };

    const getBadge = (status) => {
        switch (status) {
            case "Pending":
                return "bg-secondary";

            case "Assigned":
                return "bg-primary";

            case "Picked Up":
                return "bg-warning text-dark";

            case "In Transit":
                return "bg-info text-dark";

            case "Delivered":
                return "bg-success";

            case "Cancelled":
                return "bg-danger";

            default:
                return "bg-dark";
        }
    };

    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="mb-4">
                        Orders Management
                    </h2>

                    <div className="row mb-4">

                        <div className="col-md-4">

                            <input
                                className="form-control"
                                placeholder="Search Tracking ID"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                        <div className="col-md-3">

                            <select
                                className="form-control"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >
                                <option value="">
                                    All Status
                                </option>

                                <option>Pending</option>
                                <option>Assigned</option>
                                <option>Picked Up</option>
                                <option>In Transit</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>

                            </select>

                        </div>

                    </div>

                    <div className="table-responsive"><table className="table table-bordered table-hover">...</table>
                    </div>

                        <thead className="table-dark">

                            <tr>

                                <th>#</th>
                                <th>Tracking ID</th>
                                <th>Customer</th>
                                <th>Pickup</th>
                                <th>Delivery</th>
                                <th>Agent</th>
                                <th>Status</th>
                                <th>Charge</th>
                                <th>Update</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredOrders.map((order, index) => (

                                <tr key={order._id}>

                                    <td>{index + 1}</td>

                                    <td>{order.trackingId}</td>

                                    <td>
                                        {order.customerName}
                                        <br />
                                        <small>
                                            {order.customerPhone}
                                        </small>
                                    </td>

                                    <td>
                                        {order.pickupArea?.areaName}
                                    </td>

                                    <td>
                                        {order.deliveryArea?.areaName}
                                    </td>

                                    <td>
                                        {order.assignedAgent?.name}
                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${getBadge(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>

                                    </td>

                                    <td>
                                        ₹{order.deliveryCharge}
                                    </td>

                                    <td>

                                        <select
                                            className="form-select"
                                            value={order.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option>Pending</option>
                                            <option>Assigned</option>
                                            <option>Picked Up</option>
                                            <option>In Transit</option>
                                            <option>Delivered</option>
                                            <option>Cancelled</option>
                                        </select>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                </div>

            </div>

        </>
    );
}

export default Orders;