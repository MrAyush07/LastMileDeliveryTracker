import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function CreateOrder() {

    const navigate = useNavigate();

    const [areas, setAreas] = useState([]);

    const [form, setForm] = useState({
        customerName: "",
        customerPhone: "",
        pickupArea: "",
        deliveryArea: "",
        weight: "",
        serviceType: "Express",
        paymentType: "COD"
    });

    useEffect(() => {
        loadAreas();
    }, []);

    const loadAreas = async () => {

        try {

            const res = await api.get("/admin/areas");

            setAreas(res.data.areas);

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

            await api.post("/orders", form);

            alert("Order Created Successfully");

            navigate("/orders");

        } catch (err) {

            alert(err.response?.data?.message || "Failed");

        }

    };

    return (

        <div className="container mt-4">

            <h2>Create Order</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    placeholder="Customer Name"
                    name="customerName"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Customer Phone"
                    name="customerPhone"
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="pickupArea"
                    onChange={handleChange}
                >

                    <option value="">Select Pickup Area</option>

                    {areas.map(area => (

                        <option
                            key={area._id}
                            value={area._id}
                        >
                            {area.areaName}
                        </option>

                    ))}

                </select>

                <select
                    className="form-control mb-3"
                    name="deliveryArea"
                    onChange={handleChange}
                >

                    <option value="">Select Delivery Area</option>

                    {areas.map(area => (

                        <option
                            key={area._id}
                            value={area._id}
                        >
                            {area.areaName}
                        </option>

                    ))}

                </select>

                <input
                    className="form-control mb-3"
                    type="number"
                    placeholder="Weight"
                    name="weight"
                    onChange={handleChange}
                />

                <button
                    className="btn btn-success"
                >
                    Create Order
                </button>

            </form>

        </div>

    );

}

export default CreateOrder;