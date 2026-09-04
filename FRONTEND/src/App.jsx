import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import CandidateDashboard from "./pages/CandidateDashboard";
import MyApplications from "./pages/MyApplications";
import ResumeUpload from "./pages/ResumeUpload";
import ATSAnalysis from "./pages/ATSanalysis";
import JobRecommendations from "./pages/JobRecommendations";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import JobApplications from "./pages/JobApplications";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar.jsx";
import NotFound from "./pages/NotFound";
import JobDetails from "./pages/JobDetails";
import { Suspense } from "react";
function App() {

    return (

        <BrowserRouter>
            <Suspense fallback={<h1>wait,the page is loading</h1>}>
            <Routes>

                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>

                <Route element={ <ProtectedRoute allowedRole="CANDIDATE"/>}>

                    <Route path="/jobs" element={
                        <>
                                <NavBar />
                                <Jobs />
                        </>
                        }
                    />

                    <Route
                        path="/candidate-dashboard"
                        element={
                            <>
                                <NavBar />
                                <CandidateDashboard />
                            </>
                        }
                    />

                    <Route
                        path="/my-applications"
                        element={
                            <>
                                <NavBar />
                                <MyApplications />
                            </>
                        }
                    />

                    <Route
                        path="/resume-upload"
                        element={
                            <>
                                <NavBar />
                                <ResumeUpload />
                            </>
                        }
                    />

                    <Route
                        path="/ats-analysis/:jobId"
                        element={
                            <>
                                <NavBar />
                                <ATSAnalysis />
                            </>
                        }
                    />

                    <Route
                        path="/recommended-jobs"
                        element={
                            <>
                                <NavBar />
                                <JobRecommendations />
                            </>
                        }
                    />
                    <Route
                        path="/job-details/:id"
                        element={<JobDetails />}
                    />

                </Route>

                <Route element={ <ProtectedRoute allowedRole="RECRUITER"/>}>

                    <Route path="/recruiter-dashboard"
                        element={
                            <>
                                <NavBar />
                                <RecruiterDashboard />
                            </>
                        }
                    />

                    <Route path="/create-job"
                        element={
                            <>
                                <NavBar />
                                <CreateJob />
                            </>
                        }
                    />

                    <Route path="/edit-job/:id"
                           element={
                            <>
                                <NavBar />
                                <EditJob />
                            </>
                        }
                    />

                    <Route path="/job-applications/:id" element={
                        <>
                                <NavBar />
                                <JobApplications />
                            </>
                        }
                    />

                </Route>
                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;