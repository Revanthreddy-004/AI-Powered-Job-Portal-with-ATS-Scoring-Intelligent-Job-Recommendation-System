import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/cards.css";

function MyApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================
    // LOAD APPLICATIONS
    // =========================

    useEffect(() => {
        loadApplications();
    }, []);


    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }


            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const userId = payload.userId;

            if (!userId) {

                setError(
                    "User ID not found in token"
                );

                return;
            }


            console.log(
                "MY APPLICATIONS USER ID =",
                userId
            );


            const response =
                await axiosInstance.get(
                    `applications/candidate/${userId}`
                );


            console.log(
                "MY APPLICATIONS =",
                response.data
            );


            setApplications(
                response.data || []
            );


        } catch (error) {

            console.error(
                "MY APPLICATIONS ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load applications"
            );


        } finally {

            setLoading(false);

        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="dashboard-container">

                <h1>
                    My Applications
                </h1>

                <p>
                    Loading applications...
                </p>

            </div>
        );
    }


    // =========================
    // PAGE
    // =========================

    return (

        <div className="dashboard-container">

            <h1>
                My Applications
            </h1>


            <p className="dashboard-welcome">
                Track the jobs you have applied for.
            </p>


            {error && (

                <p style={{ color: "red" }}>
                    {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}
                </p>

            )}


            <p>
                <strong>
                    Total Applications:
                </strong>{" "}
                {applications.length}
            </p>


            {/* =========================
                NO APPLICATIONS
            ========================= */}

            {applications.length === 0 ? (

                <div className="empty-state">

                    <p>
                        You haven't applied
                        for any jobs yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Browse Jobs
                    </button>

                </div>

            ) : (


                /* =========================
                   APPLICATION CARDS
                ========================= */

                <div>

                    {applications.map(
                        (application) => (

                            <div
                                className="application-card"
                                key={application.id}
                            >

                                <h3>
                                    {application.job?.title ||
                                        "Job Title N/A"}
                                </h3>


                                <p>
                                    <strong>
                                        Company:
                                    </strong>{" "}

                                    {application.job?.company?.name ||
                                        application.job?.company?.companyName ||
                                        "N/A"}
                                </p>


                                <p>
                                    <strong>
                                        Location:
                                    </strong>{" "}

                                    {application.job?.location ||
                                        "N/A"}
                                </p>


                                <p>
                                    <strong>
                                        Applied At:
                                    </strong>{" "}

                                    {application.appliedAt ||
                                        "N/A"}
                                </p>


                                <p>
                                    <strong>
                                        Status:
                                    </strong>{" "}

                                    <span className="status">
                                        {application.status ||
                                            "PENDING"}
                                    </span>

                                </p>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}

export default MyApplications;