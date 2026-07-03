import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div
            className="bg-dark text-white p-3"
            style={{
                minHeight: "100vh",
                width: "250px"
            }}
        >

            <h4 className="mb-4">
                Admin Panel
            </h4>

            <ul className="nav flex-column">

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/dashboard"
                    >
                        📊 Dashboard
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/orders"
                    >
                        📦 Orders
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/zones"
                    >
                        📍 Zones
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/areas"
                    >
                        🏙 Areas
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/ratecards"
                    >
                        💰 Rate Cards
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/agents"
                    >
                        🚚 Delivery Agents
                    </Link>
                </li>

                <hr className="bg-light" />

                <li className="nav-item">
                    <button
                        className="btn btn-danger w-100"
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.href = "/";
                        }}
                    >
                        🚪 Logout
                    </button>
                </li>

            </ul>

        </div>

    );

}

export default Sidebar;