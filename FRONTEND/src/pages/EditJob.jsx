import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function EditJob() {

    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


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

            const job = response.data;

            console.log(
                "EDIT JOB DATA =",
                job
            );

            setFormData({
                title: job.title || "",
                description: job.description || "",
                location: job.location || "",
                experience: job.experience ?? "",
                salary: job.salary ?? "",
                skills: job.skills || "",
                companyId: job.company?.id ?? ""
            });

        } catch (error) {

            console.error(
                "LOAD JOB ERROR =",
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
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // =========================
    // UPDATE JOB
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            setSaving(true);

            if (!formData.companyId) {

                setError(
                    "Company ID is missing for this job."
                );

                return;
            }


            const response =
                await axiosInstance.put(
                    `jobs/${id}`,
                    {
                        title:
                        formData.title,

                        description:
                        formData.description,

                        skills:
                        formData.skills,

                        location:
                        formData.location,

                        experience:
                            Number(
                                formData.experience
                            ),

                        salary:
                            Number(
                                formData.salary
                            ),

                        companyId:
                            Number(
                                formData.companyId
                            )
                    }
                );


            console.log(
                "UPDATE JOB RESPONSE =",
                response.data
            );


            setMessage(
                "Job updated successfully!"
            );


            setTimeout(() => {

                navigate(
                    "/recruiter-dashboard"
                );

            }, 1000);


        } catch (error) {

            console.error(
                "UPDATE JOB ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update job"
            );

        } finally {

            setSaving(false);
        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div>

                <h1>
                    Edit Job
                </h1>

                <p>
                    Loading job...
                </p>

            </div>
        );
    }


    // =========================
    // UI
    // =========================

    return (

        <div>

            <h1>
                Edit Job
            </h1>

            <p>
                Job ID: {id}
            </p>


            <form
                onSubmit={handleSubmit}
            >

                {/* TITLE */}

                <div>

                    <label>
                        Job Title
                    </label>

                    <br />

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />


                {/* DESCRIPTION */}

                <div>

                    <label>
                        Job Description
                    </label>

                    <br />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />


                {/* SKILLS */}
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
                        placeholder="Java, Spring Boot, MySQL, Docker"
                        required
                    />

                </div>

                <br />


                {/* LOCATION */}

                <div>

                    <label>
                        Location
                    </label>

                    <br />

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />


                {/* EXPERIENCE */}

                <div>

                    <label>
                        Experience
                    </label>

                    <br />

                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />


                {/* SALARY */}

                <div>

                    <label>
                        Salary
                    </label>

                    <br />

                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />


                {/* COMPANY ID */}

                <div>

                    <label>
                        Company ID
                    </label>

                    <br />

                    <input
                        type="number"
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />


                {/* UPDATE */}

                <button
                    type="submit"
                    disabled={saving}
                >

                    {saving
                        ? "Updating..."
                        : "Update Job"}

                </button>

            </form>


            {/* MESSAGE */}

            {message && (

                <p
                    style={{
                        color: "green"
                    }}
                >
                    {message}
                </p>

            )}


            {/* ERROR */}

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


            <br />


            <button
                onClick={() =>
                    navigate(
                        "/recruiter-dashboard"
                    )
                }
            >
                Back to Recruiter Dashboard
            </button>

        </div>
    );
}

export default EditJob;