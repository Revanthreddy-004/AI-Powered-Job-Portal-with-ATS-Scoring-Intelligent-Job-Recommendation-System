import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/forms.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "CANDIDATE"
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


    const handleRegister = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.password
        ) {
            setError("Please fill all required fields");
            return;
        }

        try {

            setLoading(true);

            await registerUser(formData);

            setMessage(
                "Registration successful! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {

            console.error(
                "REGISTER ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Registration failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="form-container">

            <h1>
                Create Account
            </h1>


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


            <form onSubmit={handleRegister}>

                <div className="form-group">

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Role
                    </label>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >

                        <option value="CANDIDATE">
                            Candidate
                        </option>

                        <option value="RECRUITER">
                            Recruiter
                        </option>

                    </select>

                </div>


                <button
                    type="submit"
                    className="form-submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creating Account..."
                        : "Register"}
                </button>

            </form>


            <p className="form-text">

                Already have an account?{" "}

                <button
                    type="button"
                    className="form-link-button"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    Login
                </button>

            </p>

        </div>
    );
}

export default Register;