import { useState } from "react";
import api from "../services/api";

function Tracking() {
    const [trackingId, setTrackingId] = useState("");
    const [order, setOrder] = useState(null);

    const handleTrack = async () => {
        if (!trackingId.trim()) {
            alert("Please enter a Tracking ID");
            return;
        }

        try {
            const res = await api.get(`/orders/track/${trackingId}`);
            setOrder(res.data.order);
        } catch (err) {
            alert(err.response?.data?.message || "Tracking ID not found");
            setOrder(null);
        }
    };

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Track Your Order
            </h2>

            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <div className="input-group">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Tracking ID"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={handleTrack}
                        >
                            Track
                        </button>

                    </div>
                </div>
            </div>

            {order && (
                <div className="card shadow">

                    <div className="card-body">

                        <h4>Order Details</h4>

                        <hr />

                        <p><strong>Tracking ID:</strong> {order.trackingId}</p>

                        <p><strong>Customer:</strong> {order.customerName}</p>

                        <p><strong>Phone:</strong> {order.customerPhone}</p>

                        <p><strong>Status:</strong> {order.status}</p>

                        <p><strong>Pickup:</strong> {order.pickupArea?.areaName}</p>

                        <p><strong>Delivery:</strong> {order.deliveryArea?.areaName}</p>

                        <p><strong>Delivery Charge:</strong> ₹{order.deliveryCharge}</p>

                        <p>
                            <strong>Delivery Agent:</strong>{" "}
                            {order.assignedAgent
                                ? order.assignedAgent.name
                                : "Not Assigned"}
                        </p>

                        <hr />

                        <h5>Timeline</h5>

                        <ul className="list-group">

                            {order.timeline.map((item, index) => (
                                <li
                                    key={index}
                                    className="list-group-item"
                                >
                                    <strong>{item.status}</strong>

                                    <br />

                                    <small>
                                        {new Date(item.timestamp).toLocaleString()}
                                    </small>
                                </li>
                            ))}

                        </ul>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Tracking;