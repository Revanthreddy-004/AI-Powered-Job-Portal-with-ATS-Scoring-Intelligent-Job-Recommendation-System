import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/dashboard.css";

function CandidateDashboard() {

    const navigate = useNavigate();

    const [jobsCount, setJobsCount] = useState("-");
    const [applicationsCount, setApplicationsCount] = useState("-");
    const [recommendedCount, setRecommendedCount] = useState("-");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        loadDashboardData();
    }, []);


    const loadDashboardData = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }


            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const userId = payload.userId;


            if (!userId) {
                console.error("User ID not found in token");
                return;
            }


            // =========================
            // AVAILABLE JOBS
            // =========================

            try {

                const jobsResponse =
                    await axiosInstance.get("/jobs");

                setJobsCount(
                    Array.isArray(jobsResponse.data)
                        ? jobsResponse.data.length
                        : 0
                );

            } catch (error) {

                console.error(
                    "Failed to load jobs:",
                    error
                );

                setJobsCount("-");
            }


            // =========================
            // APPLICATIONS
            // =========================

            try {

                const applicationsResponse =
                    await axiosInstance.get(
                        `/applications/candidate/${userId}`
                    );

                setApplicationsCount(
                    Array.isArray(applicationsResponse.data)
                        ? applicationsResponse.data.length
                        : 0
                );

            } catch (error) {

                console.error(
                    "Failed to load applications:",
                    error
                );

                setApplicationsCount("-");
            }


            // =========================
            // RECOMMENDED JOBS
            // =========================

            try {

                const recommendationsResponse =
                    await axiosInstance.get(
                        `/recommendations/${userId}`
                    );

                setRecommendedCount(
                    Array.isArray(recommendationsResponse.data)
                        ? recommendationsResponse.data.length
                        : 0
                );

            } catch (error) {

                console.error(
                    "Failed to load recommendations:",
                    error
                );

                setRecommendedCount("-");
            }


        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <div className="dashboard-container">

            <h1>Candidate Dashboard</h1>

            <p className="dashboard-welcome">
                Welcome to your job portal dashboard.
            </p>


            <div className="dashboard-summary">

                {/* AVAILABLE JOBS */}

                <div className="summary-card">

                    <h3>
                        Available Jobs
                    </h3>

                    <p>
                        {loading ? "..." : jobsCount}
                    </p>

                </div>


                {/* APPLICATIONS */}

                <div className="summary-card">

                    <h3>
                        Applications
                    </h3>

                    <p>
                        {loading
                            ? "..."
                            : applicationsCount}
                    </p>

                </div>


                {/* RECOMMENDED JOBS */}

                <div className="summary-card">

                    <h3>
                        Recommended Jobs
                    </h3>

                    <p>
                        {loading
                            ? "..."
                            : recommendedCount}
                    </p>

                </div>


                {/* RESUME */}

                <div className="summary-card">

                    <h3>
                        Resume
                    </h3>

                    <p>
                        ✓
                    </p>

                </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="dashboard-section">

                <h2>Quick Actions</h2>

                <div className="dashboard-actions">

                    <button
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Browse Jobs
                    </button>


                    <button
                        onClick={() =>
                            navigate("/recommended-jobs")
                        }
                    >
                        Job Recommendations
                    </button>


                    <button
                        onClick={() =>
                            navigate("/my-applications")
                        }
                    >
                        My Applications
                    </button>


                    <button
                        onClick={() =>
                            navigate("/resume-upload")
                        }
                    >
                        Upload Resume
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CandidateDashboard;