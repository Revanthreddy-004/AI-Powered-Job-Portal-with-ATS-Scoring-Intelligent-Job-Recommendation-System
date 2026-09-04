import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/dashboard.css";

function RecruiterDashboard() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    const [totalApplications, setTotalApplications] =
        useState(0);

    const [shortlisted, setShortlisted] =
        useState(0);

    const [hired, setHired] =
        useState(0);

    const [loading, setLoading] =
        useState(true);


    // =========================
    // LOAD RECRUITER DASHBOARD
    // =========================

    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }


            // =========================
            // GET RECRUITER ID
            // =========================

            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const recruiterId =
                payload.userId;


            console.log(
                "RECRUITER ID =",
                recruiterId
            );


            // =========================
            // LOAD RECRUITER JOBS
            // =========================

            const response =
                await axiosInstance.get(
                    `jobs/recruiter/${recruiterId}`
                );

            const recruiterJobs =
                response.data || [];


            console.log(
                "RECRUITER JOBS =",
                recruiterJobs
            );


            setJobs(recruiterJobs);


            // =========================
            // APPLICATION COUNTS
            // =========================

            let applicationCount = 0;
            let shortlistedCount = 0;
            let hiredCount = 0;


            for (const job of recruiterJobs) {

                try {

                    const applicationResponse =
                        await axiosInstance.get(
                            `applications/job/${job.id}`
                        );

                    const applications =
                        applicationResponse.data || [];


                    applicationCount +=
                        applications.length;


                    shortlistedCount +=
                        applications.filter(
                            (application) =>
                                application.status ===
                                "SHORTLISTED"
                        ).length;


                    hiredCount +=
                        applications.filter(
                            (application) =>
                                application.status === "HIRED" || application.status === "SELECTED"
                        ).length;

                } catch (error) {

                    console.error(
                        "APPLICATION COUNT ERROR =",
                        error
                    );
                }
            }


            // =========================
            // SET COUNTS
            // =========================

            setTotalApplications(
                applicationCount
            );

            setShortlisted(
                shortlistedCount
            );

            setHired(
                hiredCount
            );


        } catch (error) {

            console.error(
                "RECRUITER DASHBOARD ERROR =",
                error
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
                    Recruiter Dashboard
                </h1>

                <p>
                    Loading dashboard...
                </p>

            </div>
        );
    }


    // =========================
    // UI
    // =========================

    return (

        <div className="dashboard-container">


            {/* =========================
                HEADER
            ========================= */}

            <h1>
                Recruiter Dashboard
            </h1>

            <p className="dashboard-welcome">
                Manage your job postings and applications.
            </p>


            {/* =========================
                SUMMARY CARDS
            ========================= */}

            <div className="dashboard-summary">


                {/* TOTAL JOBS */}

                <div className="summary-card">

                    <h3>
                        Total Jobs
                    </h3>

                    <p>
                        {jobs.length}
                    </p>

                </div>


                {/* TOTAL APPLICATIONS */}

                <div className="summary-card">

                    <h3>
                        Total Applications
                    </h3>

                    <p>
                        {totalApplications}
                    </p>

                </div>


                {/* SHORTLISTED */}

                <div className="summary-card">

                    <h3>
                        Shortlisted
                    </h3>

                    <p>
                        {shortlisted}
                    </p>

                </div>


                {/* HIRED */}

                <div className="summary-card">

                    <h3>
                        Hired
                    </h3>

                    <p>
                        {hired}
                    </p>

                </div>

            </div>


            {/* =========================
                CREATE JOB
            ========================= */}

            <div className="dashboard-section">

                <div className="dashboard-actions">

                    <button
                        onClick={() =>
                            navigate("/create-job")
                        }
                    >
                        Create New Job
                    </button>

                </div>

            </div>


            {/* =========================
                MY JOBS
            ========================= */}

            <div className="dashboard-section">

                <h2>
                    My Jobs
                </h2>


                {jobs.length === 0 ? (

                    <p>
                        You haven't posted any jobs yet.
                    </p>

                ) : (

                    <div className="recruiter-jobs">

                        {jobs.map((job) => (

                            <div
                                className="recruiter-job"
                                key={job.id}
                            >


                                {/* JOB TITLE */}

                                <h3>
                                    {job.title}
                                </h3>


                                {/* COMPANY */}

                                <p>
                                    <strong>
                                        Company:
                                    </strong>{" "}

                                    {job.company?.companyName ||
                                        job.company?.name ||
                                        "N/A"}
                                </p>


                                {/* DESCRIPTION */}

                                <p>
                                    <strong>
                                        Description:
                                    </strong>{" "}

                                    {job.description ||
                                        "N/A"}
                                </p>


                                {/* SKILLS */}

                                <p>
                                    <strong>
                                        Skills:
                                    </strong>{" "}

                                    {job.skills ||
                                        job.skill ||
                                        job.skillsRequired ||
                                        "N/A"}
                                </p>


                                {/* LOCATION */}

                                <p>
                                    <strong>
                                        Location:
                                    </strong>{" "}

                                    {job.location ||
                                        "N/A"}
                                </p>


                                {/* EXPERIENCE */}

                                <p>
                                    <strong>
                                        Experience:
                                    </strong>{" "}

                                    {job.experience ?? 0}
                                </p>


                                {/* SALARY */}

                                <p>
                                    <strong>
                                        Salary:
                                    </strong>{" "}

                                    ₹{job.salary}
                                </p>


                                {/* ACTIONS */}

                                <div className="recruiter-job-actions">


                                    {/* EDIT */}

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/edit-job/${job.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    {/* VIEW APPLICATIONS */}

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/job-applications/${job.id}`
                                            )
                                        }
                                    >
                                        View Applications
                                    </button>


                                    {/* DELETE */}

                                    <button
                                        onClick={async () => {

                                            const confirmed =
                                                window.confirm(
                                                    "Are you sure you want to delete this job?"
                                                );

                                            if (!confirmed) {
                                                return;
                                            }


                                            try {

                                                await axiosInstance.delete(
                                                    `jobs/${job.id}`
                                                );


                                                // Remove deleted job
                                                setJobs(
                                                    (currentJobs) =>
                                                        currentJobs.filter(
                                                            (currentJob) =>
                                                                currentJob.id !==
                                                                job.id
                                                        )
                                                );


                                            } catch (error) {

                                                console.error(
                                                    "DELETE JOB ERROR =",
                                                    error
                                                );

                                                alert(
                                                    error.response?.data?.message ||
                                                    error.response?.data ||
                                                    "Failed to delete job"
                                                );
                                            }

                                        }}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default RecruiterDashboard;