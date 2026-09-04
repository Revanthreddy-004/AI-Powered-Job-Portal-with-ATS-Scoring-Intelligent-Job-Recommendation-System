import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({allowedRole}) {

    const token = localStorage.getItem("token");

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    try {

        const payload = JSON.parse(
            atob(token.split(".")[1])
        );


        const role =
            payload.role ||
            payload.roles?.[0];


        console.log(
            "PROTECTED ROUTE ROLE =",
            role
        );


        // =========================
        // WRONG ROLE
        // =========================

        if (
            allowedRole &&
            role !== allowedRole
        ) {

            if (
                role === "RECRUITER"
            ) {

                return (
                    <Navigate
                        to="/recruiter-dashboard"
                        replace
                    />
                );
            }


            return (
                <Navigate
                    to="/candidate-dashboard"
                    replace
                />
            );
        }


        return <Outlet />;

    } catch (error) {

        console.error(
            "INVALID JWT =",
            error
        );

        localStorage.removeItem(
            "token"
        );

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }
}

export default ProtectedRoute;