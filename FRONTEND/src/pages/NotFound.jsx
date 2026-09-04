import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();

    return (

        <div
            style={{
                textAlign: "center",
                padding: "50px"
            }}
        >

            <h1>
                404
            </h1>

            <h2>
                Page Not Found
            </h2>

            <p>
                The page you are looking for
                does not exist.
            </p>

            <button
                onClick={() =>
                    navigate("/")
                }
            >
                Go Home
            </button>

        </div>
    );
}

export default NotFound;