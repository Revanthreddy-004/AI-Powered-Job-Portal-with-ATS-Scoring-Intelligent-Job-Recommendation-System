import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import "../styles/cards.css";
import { useNavigate } from "react-router-dom";

function Jobs() {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [location, setLocation] = useState("");
    const [experience, setExperience] = useState("");
    const [salary, setSalary] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const jobsPerPage = 4;


    // =========================
    // LOAD JOBS
    // =========================

    const loadJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await axiosInstance.get("/jobs");

            console.log(
                "JOBS RESPONSE =",
                response.data
            );

            setJobs(response.data || []);
            setCurrentPage(1);

        } catch (error) {

            console.error(
                "LOAD JOBS ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load jobs"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        loadJobs();
    }, []);


    // =========================
    // APPLY JOB
    // =========================

    const applyJob = async (jobId) => {

        try {

            setError("");
            setMessage("");

            const token =
                localStorage.getItem("token");

            if (!token) {

                setError(
                    "Please login again."
                );

                return;
            }


            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const candidateId =
                payload.userId;


            if (!candidateId) {

                setError(
                    "Candidate ID not found in token."
                );

                return;
            }


            console.log(
                "APPLY CANDIDATE ID =",
                candidateId
            );

            console.log(
                "APPLY JOB ID =",
                jobId
            );


            const response =
                await axiosInstance.post(
                    `/applications/apply?candidateId=${candidateId}&jobId=${jobId}`
                );


            console.log(
                "APPLY RESPONSE =",
                response.data
            );


            setMessage(
                response.data ||
                "Job applied successfully!"
            );


        } catch (error) {

            console.error(
                "APPLY JOB ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to apply for job"
            );
        }
    };


    // =========================
    // FILTER JOBS
    // =========================

    const filterJobs = async () => {

        try {

            setLoading(true);
            setError("");
            setMessage("");

            let response;

            // All three filters
            if (location && experience && salary) {

                response = await axiosInstance.get(
                    `/jobs/filter?location=${encodeURIComponent(location)}&experience=${experience}&salary=${salary}`
                );

            }

            // Location only
            else if (location) {

                response = await axiosInstance.get(
                    `/jobs/search/location?location=${encodeURIComponent(location)}`
                );

            }

            // Experience only
            else if (experience) {

                response = await axiosInstance.get(
                    `/jobs/search/experience?experience=${experience}`
                );

            }

            // Salary only
            else if (salary) {

                response = await axiosInstance.get(
                    `/jobs/search/salary?salary=${salary}`
                );

            }

            // No filters
            else {

                response = await axiosInstance.get(
                    "/jobs"
                );
            }

            console.log(
                "FILTER RESPONSE =",
                response.data
            );

            setJobs(response.data || []);
            setCurrentPage(1);

        } catch (error) {

            console.error(
                "FILTER ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to filter jobs"
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // CLEAR FILTERS
    // =========================

    const clearFilters = () => {

        setLocation("");
        setExperience("");
        setSalary("");
        setError("");
        setMessage("");

        loadJobs();
    };


    // =========================
    // PAGINATION
    // =========================

    const totalPages =
        Math.ceil(
            jobs.length / jobsPerPage
        );


    const startIndex =
        (currentPage - 1) *
        jobsPerPage;


    const currentJobs =
        jobs.slice(
            startIndex,
            startIndex + jobsPerPage
        );


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="page-container">

                <h1>
                    Available Jobs
                </h1>

                <p>
                    Loading jobs...
                </p>

            </div>
        );
    }


    // =========================
    // UI
    // =========================

    return (

        <div className="page-container">

            <h1>
                Available Jobs
            </h1>


            {/* =========================
                SEARCH & FILTER
            ========================= */}

            <div className="search-box">

                <h2>
                    Search Jobs
                </h2>


                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                />


                <input
                    type="number"
                    placeholder="Experience"
                    value={experience}
                    onChange={(e) =>
                        setExperience(e.target.value)
                    }
                />


                <input
                    type="number"
                    placeholder="Minimum Salary"
                    value={salary}
                    onChange={(e) =>
                        setSalary(e.target.value)
                    }
                />


                <button
                    onClick={filterJobs}
                >
                    Search
                </button>


                <button
                    onClick={clearFilters}
                >
                    Clear
                </button>

            </div>


            {/* =========================
                MESSAGES
            ========================= */}

            {message && (

                <p
                    style={{
                        color: "green"
                    }}
                >
                    {message}
                </p>

            )}


            {error && (

                <p
                    style={{
                        color: "red"
                    }}
                >
                    {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}
                </p>

            )}


            {/* =========================
                JOB COUNT
            ========================= */}

            <h2>
                Jobs
            </h2>

            <p>
                Total Jobs: {jobs.length}
            </p>


            {/* =========================
                JOB CARDS
            ========================= */}

            {currentJobs.length === 0 ? (

                <p>
                    No jobs found.
                </p>

            ) : (

                currentJobs.map(
                    (job) => (

                        <div
                            className="job-card"
                            key={job.id}
                        >

                            <h3>
                                {job.title}
                            </h3>


                            <p>
                                Company:{" "}
                                {job.company?.name ||
                                    job.companyName ||
                                    "N/A"}
                            </p>


                            <p>
                                Description:{" "}
                                {job.description ||
                                    "N/A"}
                            </p>


                            <p>
                                Location:{" "}
                                {job.location ||
                                    "N/A"}
                            </p>


                            <p>
                                Experience:{" "}
                                {job.experience}
                            </p>
                            <p>
                                Skills: {job.skills || "N/A"}
                            </p>


                            <p>
                                Salary:{" "}
                                {job.salary}
                            </p>


                            {/* APPLY */}

                            <button
                                onClick={() =>
                                    applyJob(job.id)
                                }
                            >
                                Apply
                            </button>


                            {/* ATS */}

                            <button
                                onClick={() =>
                                    window.location.href =
                                        `/ats-analysis/${job.id}`
                                }
                            >
                                Analyze ATS
                            </button>
                            <button
                                onClick={() =>
                                    navigate(`/job-details/${job.id}`)
                                }
                            >
                                View Details
                            </button>

                        </div>

                    )
                )

            )}


            {/* =========================
                PAGINATION
            ========================= */}

            {totalPages > 1 && (

                <div className="pagination">

                    <button
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage - 1
                            )
                        }
                    >
                        Previous
                    </button>


                    {Array.from(
                        {
                            length: totalPages
                        },
                        (_, index) => (

                            <button
                                key={index + 1}
                                className={
                                    currentPage ===
                                    index + 1
                                        ? "active-page"
                                        : ""
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        index + 1
                                    )
                                }
                            >
                                {index + 1}
                            </button>

                        )
                    )}


                    <button
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            )}

        </div>
    );
}

export default Jobs;