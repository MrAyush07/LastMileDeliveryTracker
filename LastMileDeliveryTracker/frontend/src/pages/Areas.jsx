import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
function Areas() {

    const [areas, setAreas] = useState([]);
    const [zones, setZones] = useState([]);

    const [form, setForm] = useState({
        areaName: "",
        zone: ""
    });

    useEffect(() => {
        loadAreas();
        loadZones();
    }, []);

    const loadAreas = async () => {

        try {

            const res = await api.get("/admin/areas");

            setAreas(res.data.areas);

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

            await api.post("/admin/areas", form);

            alert("Area Added Successfully");

            setForm({
                areaName: "",
                zone: ""
            });

            loadAreas();

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
                        Area Management
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="mb-4"
                    >

                        <div className="row">

                            <div className="col-md-4">

                                <input
                                    className="form-control"
                                    placeholder="Area Name"
                                    name="areaName"
                                    value={form.areaName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4">

                                <select
                                    className="form-control"
                                    name="zone"
                                    value={form.zone}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Zone
                                    </option>

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

                            <div className="col-md-2">

                                <button className="btn btn-success w-100">

                                    Add Area

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

                                <th>Area</th>

                                <th>Zone</th>

                            </tr>

                        </thead>

                        <tbody>

                            {areas.map((area,index)=>(

                                <tr key={area._id}>

                                    <td>{index+1}</td>

                                    <td>{area.areaName}</td>

                                    <td>{area.zone?.zoneName}</td>

                                </tr>

                            ))}

                        </tbody>

                </div>

            </div>

        </>

    );

}

export default Areas;