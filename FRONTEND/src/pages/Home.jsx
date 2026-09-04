import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {

    const navigate = useNavigate();

    return (
        <div className="home-page">

            {/* HERO */}

            <section className="home-hero">

                <h1>
                    Find Your Dream Job
                </h1>

                <p>
                    Discover jobs, apply easily,
                    and build your career with
                    our smart job portal.
                </p>

                <div className="home-buttons">

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>

                </div>

            </section>


            {/* FEATURES */}

            <section className="home-features">

                <h2>
                    Why Use Our Job Portal?
                </h2>

                <div className="feature-grid">

                    <div className="feature-card">

                        <h3>
                            Find Jobs
                        </h3>

                        <p>
                            Search and filter jobs
                            based on location,
                            experience and salary.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            ATS Analysis
                        </h3>

                        <p>
                            Check how well your
                            resume matches a
                            particular job.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            Smart Recommendations
                        </h3>

                        <p>
                            Get job recommendations
                            based on your profile.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;