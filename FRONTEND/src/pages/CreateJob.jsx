import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/forms.css";

function CreateJob() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        experience: "",
        salary: "",
        skills: "",
        companyId: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }


            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const recruiterId =
                payload.userId;


            if (!recruiterId) {

                setError(
                    "Recruiter ID not found in token"
                );

                return;
            }


            const jobData = {

                title: formData.title,

                description:
                formData.description,

                location:
                formData.location,

                experience:
                    Number(formData.experience),

                salary:
                    Number(formData.salary),
                skills: formData.skills,

                companyId:
                    Number(formData.companyId)
            };


            console.log(
                "CREATE JOB RECRUITER ID =",
                recruiterId
            );

            console.log(
                "CREATE JOB DATA =",
                jobData
            );


            const response =
                await axiosInstance.post(
                    `jobs?recruiterId=${recruiterId}`,
                    jobData
                );


            console.log(
                "CREATE JOB RESPONSE =",
                response.data
            );


            setMessage(
                "Job created successfully!"
            );


            setFormData({
                title: "",
                description: "",
                location: "",
                experience: "",
                salary: "",
                skills: "",
                companyId: ""
            });


        } catch (error) {

            console.error(
                "CREATE JOB ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to create job"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="form-container">

            <h1>
                Create Job
            </h1>

            <p>
                Create a new job posting.
            </p>


            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>
                        Job Title
                    </label>

                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Java Developer"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Job Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Java Spring Boot MySQL Docker..."
                        required
                    />

                </div>
                <div>

                    <label>
                        Skills
                    </label>

                    <br />

                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="Java,Python,Spring Boot, MySQL, Docker"
                        required
                    />

                </div>

                <br />


                <div className="form-group">

                    <label>
                        Location
                    </label>

                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Hyderabad"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Experience
                    </label>

                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="2"
                        min="0"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Salary
                    </label>

                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="800000"
                        min="0"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Company ID
                    </label>

                    <input
                        type="number"
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}
                        placeholder="1"
                        min="1"
                        required
                    />

                </div>


                {message && (

                    <p className="success-message">
                        {message}
                    </p>

                )}


                {error && (

                    <p className="error-message">
                        {typeof error === "object"
                            ? JSON.stringify(error)
                            : error}
                    </p>

                )}


                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Creating..."
                        : "Create Job"}

                </button>

            </form>


            <button
                type="button"
                onClick={() =>
                    navigate("/recruiter-dashboard")
                }
            >
                Back to Recruiter Dashboard
            </button>

        </div>
    );
}

export default CreateJob;