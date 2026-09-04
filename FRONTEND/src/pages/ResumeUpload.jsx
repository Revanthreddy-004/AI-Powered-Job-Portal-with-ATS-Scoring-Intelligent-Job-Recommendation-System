import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/forms.css";

function ResumeUpload() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);


    const handleFileChange = (event) => {

        const selectedFile = event.target.files[0];

        setFile(selectedFile);
        setMessage("");
        setError("");
    };


    const handleUpload = async () => {

        if (!file) {
            setError("Please select a PDF file");
            return;
        }


        if (file.type !== "application/pdf") {
            setError("Only PDF files are allowed");
            return;
        }


        try {

            setUploading(true);
            setError("");
            setMessage("");


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


            const formData = new FormData();

            formData.append("file", file);


            console.log(
                "RESUME USER ID =",
                userId
            );

            console.log(
                "RESUME FILE =",
                file.name
            );


            const response =
                await axiosInstance.post(
                    `resume/upload/${userId}`,
                    formData
                );


            console.log(
                "RESUME UPLOAD RESPONSE =",
                response.data
            );


            setMessage(
                response.data ||
                "Resume uploaded successfully"
            );


            setFile(null);


        } catch (error) {

            console.error(
                "RESUME UPLOAD ERROR =",
                error
            );


            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to upload resume"
            );

        } finally {

            setUploading(false);
        }
    };


    return (

        <div className="form-container">

            <h1>
                Upload Resume
            </h1>

            <p>
                Upload your resume in PDF format.
            </p>


            <div className="form-group">

                <label>
                    Resume
                </label>

                <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                />

            </div>


            {file && (

                <p>
                    <strong>
                        Selected File:
                    </strong>{" "}
                    {file.name}
                </p>

            )}


            {error && (

                <p className="error-message">
                    {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}
                </p>

            )}


            {message && (

                <p className="success-message">
                    {message}
                </p>

            )}


            <button
                onClick={handleUpload}
                disabled={uploading}
            >

                {uploading
                    ? "Uploading..."
                    : "Upload Resume"}

            </button>

        </div>
    );
}

export default ResumeUpload;