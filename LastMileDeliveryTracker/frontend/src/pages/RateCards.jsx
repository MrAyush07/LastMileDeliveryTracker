import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
function RateCards() {

    const [rateCards, setRateCards] = useState([]);
    const [zones, setZones] = useState([]);

    const [form, setForm] = useState({
        zone: "",
        serviceType: "Standard",
        minWeight: "",
        maxWeight: "",
        price: "",
        codCharge: ""
    });

    useEffect(() => {
        loadZones();
        loadRateCards();
    }, []);

    const loadZones = async () => {
        try {
            const res = await api.get("/admin/zones");
            setZones(res.data.zones);
        } catch (err) {
            console.log(err);
        }
    };

    const loadRateCards = async () => {
        try {
            const res = await api.get("/admin/ratecards");
            setRateCards(res.data.rateCards);
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

            await api.post("/admin/ratecards", form);

            alert("Rate Card Added Successfully");

            setForm({
                zone: "",
                serviceType: "Standard",
                minWeight: "",
                maxWeight: "",
                price: "",
                codCharge: ""
            });

            loadRateCards();

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
                        Rate Card Management
                    </h2>

                    <form onSubmit={handleSubmit} className="mb-4">

                        <div className="row g-3">

                            <div className="col-md-4">
                                <select
                                    className="form-control"
                                    name="zone"
                                    value={form.zone}
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

                            <div className="col-md-4">
                                <select
                                    className="form-control"
                                    name="serviceType"
                                    value={form.serviceType}
                                    onChange={handleChange}
                                >
                                    <option>Standard</option>
                                    <option>Express</option>
                                </select>
                            </div>

                            <div className="col-md-2">
                                <input
                                    className="form-control"
                                    placeholder="Min Weight"
                                    name="minWeight"
                                    value={form.minWeight}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-2">
                                <input
                                    className="form-control"
                                    placeholder="Max Weight"
                                    name="maxWeight"
                                    value={form.maxWeight}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    placeholder="Price"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    placeholder="COD Charge"
                                    name="codCharge"
                                    value={form.codCharge}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-2">
                                <button className="btn btn-success w-100">
                                    Add
                                </button>
                            </div>

                        </div>

                    </form>
                    <div className="table-responsive">
    <table className="table table-bordered table-hover">
        ...
    </table>
</div>

                        <thead className="table-dark">

                            <tr>

                                <th>#</th>
                                <th>Zone</th>
                                <th>Service</th>
                                <th>Weight</th>
                                <th>Price</th>
                                <th>COD</th>

                            </tr>

                        </thead>

                        <tbody>

                            {rateCards.map((card, index) => (

                                <tr key={card._id}>

                                    <td>{index + 1}</td>

                                    <td>{card.zone?.zoneName}</td>

                                    <td>{card.serviceType}</td>

                                    <td>
                                        {card.minWeight} - {card.maxWeight} kg
                                    </td>

                                    <td>₹{card.price}</td>

                                    <td>₹{card.codCharge}</td>

                                </tr>

                            ))}

                        </tbody>

                </div>

            </div>

        </>
    );
}

export default RateCards;