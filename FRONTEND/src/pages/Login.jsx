import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService.js";
import "../styles/forms.css";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        try {

            setLoading(true);

            const token =
                await loginUser(email, password);

            localStorage.setItem(
                "token",
                token
            );

            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const role =
                payload.role ||
                payload.roles?.[0];

            if (role === "RECRUITER") {

                navigate("/recruiter-dashboard");

            } else {

                navigate("/candidate-dashboard");
            }

        } catch (error) {

            console.error(
                "LOGIN ERROR =",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="form-container">

            <h1>
                Login
            </h1>

            {error && (
                <p className="error-message">
                    {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}
                </p>
            )}


            <form onSubmit={handleLogin}>

                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter your email"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter your password"
                    />

                </div>


                <button
                    type="submit"
                    className="form-submit"
                    disabled={loading}
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>

            </form>


            <p className="form-text">

                Don't have an account?{" "}

                <button
                    type="button"
                    className="form-link-button"
                    onClick={() =>
                        navigate("/register")
                    }
                >
                    Register
                </button>

            </p>

        </div>
    );
}

export default Login;