import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
function Agents() {

    const [agents, setAgents] = useState([]);
    const [zones, setZones] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        vehicleType: "Bike",
        assignedZone: ""
    });

    useEffect(() => {
        loadAgents();
        loadZones();
    }, []);

    const loadAgents = async () => {

        try {

            const res = await api.get("/admin/agents");

            setAgents(res.data.agents);

        } catch (err) {

            console.log(err);

        }

    };

    const loadZones = async () => {

        try {

            const res = await api.get("/admin/zones");

            setZones(res.data.zones);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/admin/agents", form);

            alert("Delivery Agent Added Successfully");

            setForm({
                name: "",
                email: "",
                phone: "",
                vehicleType: "Bike",
                assignedZone: ""
            });

            loadAgents();

        } catch (err) {

            alert(err.response?.data?.message || "Error");

        }

    };

    return (

        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="mb-4">

                        Delivery Agent Management

                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="mb-4"
                    >

                        <div className="row g-3">

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-2">

                                <input
                                    className="form-control"
                                    placeholder="Phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-2">

                                <select
                                    className="form-control"
                                    name="vehicleType"
                                    value={form.vehicleType}
                                    onChange={handleChange}
                                >

                                    <option>Bike</option>
                                    <option>Scooter</option>
                                    <option>Car</option>
                                    <option>Van</option>

                                </select>

                            </div>

                            <div className="col-md-2">

                                <select
                                    className="form-control"
                                    name="assignedZone"
                                    value={form.assignedZone}
                                    onChange={handleChange}
                                >

                                    <option value="">Select Zone</option>

                                    {zones.map(zone => (

                                        <option
                                            key={zone._id}
                                            value={zone._id}
                                        >
                                            {zone.zoneName}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>

                        <button
                            className="btn btn-success mt-3"
                        >
                            Add Agent
                        </button>

                    </form>

<div className="table-responsive">
    <table className="table table-bordered table-hover">
        ...
    </table>
</div>

                        <thead className="table-dark">

                            <tr>

                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Vehicle</th>
                                <th>Zone</th>
                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {agents.map(agent => (

                                <tr key={agent._id}>

                                    <td>{agent.name}</td>

                                    <td>{agent.email}</td>

                                    <td>{agent.phone}</td>

                                    <td>{agent.vehicleType}</td>

                                    <td>{agent.assignedZone?.zoneName}</td>

                                    <td>

                                        {agent.isAvailable
                                            ? "Available"
                                            : "Busy"}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                </div>

            </div>

        </>

    );

}

export default Agents; 