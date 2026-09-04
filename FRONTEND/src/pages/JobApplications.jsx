import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/cards.css";

function JobApplications() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);


    useEffect(() => {
        loadApplications();
    }, [id]);


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


            console.log(
                "JOB APPLICATIONS JOB ID =",
                id
            );


            const response =
                await axiosInstance.get(
                    `applications/job/${id}`
                );


            console.log(
                "JOB APPLICATIONS RESPONSE =",
                response.data
            );


            setApplications(
                response.data || []
            );

        } catch (error) {

            console.error(
                "JOB APPLICATIONS ERROR =",
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


    const updateStatus = async (
        applicationId,
        newStatus
    ) => {

        try {

            setUpdatingId(applicationId);

            console.log(
                "UPDATING APPLICATION =",
                applicationId
            );

            console.log(
                "NEW STATUS =",
                newStatus
            );


            const response =
                await axiosInstance.put(
                    `applications/${applicationId}/status`,
                    {
                        status: newStatus
                    }
                );


            console.log(
                "STATUS UPDATE RESPONSE =",
                response.data
            );


            setApplications((current) =>
                current.map((application) =>
                    application.id === applicationId
                        ? {
                            ...application,
                            status:
                                response.data?.status ||
                                newStatus
                        }
                        : application
                )
            );

        } catch (error) {

            console.error(
                "STATUS UPDATE ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update application status"
            );

        } finally {

            setUpdatingId(null);
        }
    };


    if (loading) {

        return (
            <div className="page-container">

                <div className="page-header">
                    <h1>Job Applications</h1>
                    <p>Loading applications...</p>
                </div>

            </div>
        );
    }


    return (

        <div className="page-container">

            <div className="page-header">

                <h1>
                    Job Applications
                </h1>

                <p>
                    Applications received for this job.
                </p>

            </div>


            {error && (

                <div className="error-message">
                    {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}
                </div>

            )}


            <div className="info-card">

                <strong>
                    Total Applications:
                </strong>{" "}
                {applications.length}

            </div>


            {applications.length === 0 ? (

                <div className="info-card">

                    <p>
                        No applications received for this job yet.
                    </p>

                </div>

            ) : (

                applications.map(
                    (application) => {

                        const candidate =
                            application.candidate;

                        return (

                            <div
                                className="application-card"
                                key={application.id}
                            >

                                <h2>
                                    Candidate
                                </h2>


                                <p>
                                    <strong>
                                        Name:
                                    </strong>{" "}
                                    {candidate?.name || "N/A"}
                                </p>


                                <p>
                                    <strong>
                                        Email:
                                    </strong>{" "}
                                    {candidate?.email || "N/A"}
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
                                        Current Status:
                                    </strong>{" "}
                                    {application.status ||
                                        "APPLIED"}
                                </p>


                                <div className="status-actions">

                                    <button
                                        disabled={
                                            updatingId ===
                                            application.id
                                        }
                                        onClick={() =>
                                            updateStatus(
                                                application.id,
                                                "SHORTLISTED"
                                            )
                                        }
                                    >
                                        Shortlist
                                    </button>


                                    <button
                                        disabled={
                                            updatingId ===
                                            application.id
                                        }
                                        onClick={() =>
                                            updateStatus(
                                                application.id,
                                                "REJECTED"
                                            )
                                        }
                                    >
                                        Reject
                                    </button>


                                    <button
                                        disabled={
                                            updatingId ===
                                            application.id
                                        }
                                        onClick={() =>
                                            updateStatus(
                                                application.id,
                                                "HIRED"
                                            )
                                        }
                                    >
                                        Select
                                    </button>

                                </div>

                            </div>
                        );
                    }
                )

            )}


            <div className="ats-actions">

                <button
                    onClick={() =>
                        navigate("/recruiter-dashboard")
                    }
                >
                    Back to Dashboard
                </button>

            </div>

        </div>
    );
}

export default JobApplications;