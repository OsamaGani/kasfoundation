import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();

  const isAdminLoggedIn =
    localStorage.getItem("kas_admin_logged_in") === "true";

  if (!isAdminLoggedIn) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;