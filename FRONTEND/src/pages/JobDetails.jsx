import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/cards.css";

function JobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [applying, setApplying] =
        useState(false);

    const [message, setMessage] =
        useState("");


    // =========================
    // LOAD JOB
    // =========================

    useEffect(() => {

        loadJob();

    }, [id]);


    const loadJob = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await axiosInstance.get(
                    `jobs/${id}`
                );

            console.log(
                "JOB DETAILS RESPONSE =",
                response.data
            );

            setJob(response.data);

        } catch (error) {

            console.error(
                "JOB DETAILS ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load job"
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // APPLY JOB
    // =========================

    const applyJob = async () => {

        try {

            setApplying(true);
            setMessage("");
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


            const candidateId =
                payload.userId;


            console.log(
                "DETAILS APPLY CANDIDATE ID =",
                candidateId
            );

            console.log(
                "DETAILS APPLY JOB ID =",
                id
            );


            const response =
                await axiosInstance.post(
                    `applications/apply?candidateId=${candidateId}&jobId=${id}`
                );


            console.log(
                "APPLY RESPONSE =",
                response.data
            );


            setMessage(
                "Applied successfully!"
            );


        } catch (error) {

            console.error(
                "APPLY JOB ERROR =",
                error
            );


            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to apply for this job"
            );

        } finally {

            setApplying(false);
        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="page-container">

                <div className="page-header">

                    <h1>
                        Job Details
                    </h1>

                    <p>
                        Loading job...
                    </p>

                </div>

            </div>
        );
    }


    // =========================
    // ERROR
    // =========================

    if (error && !job) {

        return (

            <div className="page-container">

                <div className="error-message">
                    {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}
                </div>


                <button
                    onClick={() =>
                        navigate("/jobs")
                    }
                >
                    Back to Jobs
                </button>

            </div>
        );
    }


    // =========================
    // JOB DETAILS
    // =========================

    return (

        <div className="page-container">


            <div className="page-header">

                <h1>
                    {job?.title || "Job Details"}
                </h1>

                <p>
                    View complete job information.
                </p>

            </div>


            {error && (

                <div className="error-message">

                    {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}

                </div>

            )}


            {message && (

                <div
                    className="success-message"
                    style={{
                        color: "green",
                        marginBottom: "20px"
                    }}
                >
                    {message}
                </div>

            )}


            <div className="application-card">


                {/* COMPANY */}

                <p>

                    <strong>
                        Company:
                    </strong>{" "}

                    {job?.company?.companyName ||
                        job?.company?.name ||
                        "N/A"}

                </p>


                {/* LOCATION */}

                <p>

                    <strong>
                        Location:
                    </strong>{" "}

                    {job?.location || "N/A"}

                </p>


                {/* EXPERIENCE */}

                <p>

                    <strong>
                        Experience:
                    </strong>{" "}

                    {job?.experience ?? 0} years

                </p>


                {/* SALARY */}

                <p>

                    <strong>
                        Salary:
                    </strong>{" "}

                    ₹{job?.salary ?? "N/A"}

                </p>


                {/* DESCRIPTION */}

                <div
                    style={{
                        marginTop: "25px"
                    }}
                >

                    <h2>
                        Job Description
                    </h2>

                    <p>
                        {job?.description ||
                            "No description available."}
                    </p>

                </div>


                {/* SKILLS */}

                <div
                    style={{
                        marginTop: "25px"
                    }}
                >

                    <h2>
                        Skills Required
                    </h2>

                    <p>

                        {job?.skills ||
                            job?.skill ||
                            job?.skillsRequired ||
                            "No skills specified."}

                    </p>

                </div>


                {/* ACTIONS */}

                <div
                    style={{
                        marginTop: "30px"
                    }}
                >

                    <button
                        onClick={applyJob}
                        disabled={applying}
                    >

                        {applying
                            ? "Applying..."
                            : "Apply Now"}

                    </button>


                    <button
                        style={{
                            marginLeft: "10px"
                        }}
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Back to Jobs
                    </button>

                </div>

            </div>

        </div>
    );
}

export default JobDetails;