import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
function Zones() {

    const [zones, setZones] = useState([]);
    const [zoneName, setZoneName] = useState("");

    useEffect(() => {
        loadZones();
    }, []);

    const loadZones = async () => {
        try {

            const res = await api.get("/admin/zones");

            setZones(res.data.zones);

        } catch (err) {
            console.log(err);
        }
    };

    const createZone = async (e) => {

        e.preventDefault();

        try {

            await api.post("/admin/zones", {
                zoneName
            });

            setZoneName("");

            loadZones();

        } catch (err) {

            alert(err.response?.data?.message);

        }

    };

    return (

        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="mb-4">

                        Zone Management

                    </h2>

                    <form
                        onSubmit={createZone}
                        className="mb-4"
                    >

                        <div className="row">

                            <div className="col-md-6">

                                <input
                                    className="form-control"
                                    placeholder="Zone Name"
                                    value={zoneName}
                                    onChange={(e)=>setZoneName(e.target.value)}
                                />

                            </div>

                            <div className="col-md-2">

                                <button className="btn btn-success w-100">

                                    Add Zone

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

                                <th>Zone Name</th>

                            </tr>

                        </thead>

                        <tbody>

                            {zones.map((zone,index)=>(

                                <tr key={zone._id}>

                                    <td>{index+1}</td>

                                    <td>{zone.zoneName}</td>

                                </tr>

                            ))}

                        </tbody>


                </div>

            </div>

        </>

    );

}

export default Zones;