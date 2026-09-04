import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
function NavBar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    let role = null;

    if (token) {
        try {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            role =
                payload.role ||
                payload.roles?.[0];

        } catch (error) {
            console.error("JWT ERROR =", error);
        }
    }


    // =========================
    // RECRUITER NAVBAR
    // =========================

    if (role === "RECRUITER") {

        return (
            <nav className="navbar">

                <div className="navbar-logo">
                    JobPortal
                </div>

                <div className="navbar-links">

                    <Link to="/create-job">
                        Create Job
                    </Link>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>
        );
    }


    // =========================
    // CANDIDATE NAVBAR
    // =========================

    if (role === "CANDIDATE") {

        return (
            <nav className="navbar">

                <div className="navbar-logo">
                    JobPortal
                </div>

                <div className="navbar-links">

                    <Link to="/candidate-dashboard">
                        Dashboard
                    </Link>

                    <Link to="/jobs">
                        Jobs
                    </Link>

                    <Link to="/recommended-jobs">
                        Recommendations
                    </Link>

                    <Link to="/my-applications">
                        Applications
                    </Link>

                    <Link to="/resume-upload">
                        Resume
                    </Link>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>
        );
    }

    return null;
}

export default NavBar;