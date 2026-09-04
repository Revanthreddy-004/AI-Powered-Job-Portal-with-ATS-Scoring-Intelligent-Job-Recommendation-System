import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/cards.css";

function JobRecommendations() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================
    // LOAD RECOMMENDATIONS
    // =========================

    useEffect(() => {
        loadRecommendations();
    }, []);


    const loadRecommendations = async () => {

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

            const userId =
                payload.userId;


            if (!userId) {

                setError(
                    "User ID not found in token"
                );

                return;
            }


            console.log(
                "RECOMMENDATION USER ID =",
                userId
            );


            const response =
                await axiosInstance.get(
                    `recommendations/${userId}`
                );


            console.log(
                "RECOMMENDATION RESPONSE =",
                response.data
            );


            setJobs(
                response.data || []
            );


        } catch (error) {

            console.error(
                "RECOMMENDATION ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load recommended jobs"
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
                    Recommended Jobs
                </h1>

                <p>
                    Loading recommended jobs...
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
                Recommended Jobs
            </h1>

            <p className="dashboard-welcome">
                Jobs recommended based on your profile.
            </p>


            {error && (

                <p style={{ color: "red" }}>
                    {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}
                </p>

            )}


            {jobs.length === 0 ? (

                <div className="empty-state">

                    <p>
                        No recommended jobs found.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Browse All Jobs
                    </button>

                </div>

            ) : (

                <div>

                    {jobs.map((job) => (

                        <div
                            className="recommendation-card"
                            key={job.id}
                        >

                            <h2>
                                {job.title}
                            </h2>


                            <p>
                                <strong>
                                    Company:
                                </strong>{" "}

                                {job.company?.name ||
                                    job.company?.companyName ||
                                    "N/A"}
                            </p>


                            <p>
                                <strong>
                                    Location:
                                </strong>{" "}

                                {job.location ||
                                    "N/A"}
                            </p>


                            <p>
                                <strong>
                                    Experience:
                                </strong>{" "}

                                {job.experience ||
                                    "N/A"}
                            </p>


                            <p>
                                <strong>
                                    Salary:
                                </strong>{" "}

                                {job.salary ||
                                    "N/A"}
                            </p>


                            <div className="card-actions">

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/ats-analysis/${job.id}`
                                        )
                                    }
                                >
                                    Analyze ATS
                                </button>


                                <button
                                    onClick={() =>
                                        navigate("/jobs")
                                    }
                                >
                                    View Jobs
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default JobRecommendations;