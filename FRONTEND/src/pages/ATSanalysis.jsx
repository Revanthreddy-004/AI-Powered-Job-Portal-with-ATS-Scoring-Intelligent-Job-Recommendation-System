import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/cards.css";

function ATSAnalysis() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        analyzeATS();
    }, [jobId]);


    const analyzeATS = async () => {

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
                setError("User ID not found in token");
                return;
            }

            console.log("ATS JOB ID =", jobId);
            console.log("ATS USER ID =", userId);

            const response =
                await axiosInstance.get(
                    `ats/job/${jobId}/user/${userId}`
                );

            console.log(
                "ATS RESPONSE =",
                response.data
            );

            setResult(response.data);

        } catch (error) {

            console.error(
                "ATS ANALYSIS ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to analyze resume"
            );

        } finally {

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <div className="page-container">
                <div className="page-header">
                    <h1>ATS Resume Analysis</h1>
                    <p>
                        Analyzing your resume against this job...
                    </p>
                </div>

                <div className="info-card">
                    <p>⏳ Please wait while we analyze your resume.</p>
                </div>
            </div>
        );
    }


    return (

        <div className="page-container">

            <div className="page-header">

                <h1>
                    ATS Resume Analysis
                </h1>

                <p>
                    See how well your resume matches this job.
                </p>

            </div>


            {error && (

                <div className="error-message">

                    {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}

                </div>

            )}


            {!error && result && (

                <div className="ats-result-card">

                    <h2>
                        ATS Analysis Result
                    </h2>


                    <div className="ats-score">

                        <span className="score-label">
                            ATS Score
                        </span>

                        <span className="score-value">
                            {result.score ?? result.atsScore ?? "N/A"}
                        </span>

                    </div>


                    {result.message && (

                        <p className="ats-message">
                            {result.message}
                        </p>

                    )}


                    {result.feedback && (

                        <div className="ats-section">

                            <h3>
                                Feedback
                            </h3>

                            <p>
                                {result.feedback}
                            </p>

                        </div>

                    )}


                    {result.matchedSkills && (

                        <div className="ats-section">

                            <h3>
                                Matched Skills
                            </h3>

                            <p>
                                {Array.isArray(result.matchedSkills)
                                    ? result.matchedSkills.join(", ")
                                    : result.matchedSkills}
                            </p>

                        </div>

                    )}


                    {result.missingSkills && (

                        <div className="ats-section">

                            <h3>
                                Missing Skills
                            </h3>

                            <p>
                                {Array.isArray(result.missingSkills)
                                    ? result.missingSkills.join(", ")
                                    : result.missingSkills}
                            </p>

                        </div>

                    )}

                </div>

            )}


            <div className="ats-actions">

                <button
                    onClick={() => navigate("/jobs")}
                >
                    Back to Jobs
                </button>

                <button
                    onClick={() =>
                        navigate("/recommended-jobs")
                    }
                >
                    View Recommendations
                </button>

            </div>

        </div>
    );
}

export default ATSAnalysis;