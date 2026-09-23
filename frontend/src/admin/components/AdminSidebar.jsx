import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Images,
  Users,
  Newspaper,
  Trophy,
  MapPin,
  LogOut,
  X,
} from "lucide-react";

function AdminSidebar({ isOpen, onClose }) {
  const handleLogout = () => {
    localStorage.removeItem("kas_admin_logged_in");

    window.location.href = "/admin/login";
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`admin-sidebar ${
          isOpen ? "admin-sidebar-open" : ""
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <img
              src="/assets/images/kaslogo.png"
              alt="KAS Foundation"
            />

            <div>
              <h2>KAS Foundation</h2>

              <span>
                Admin Panel
              </span>
            </div>
          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* SIDEBAR NAVIGATION */}
        <nav className="admin-sidebar-nav">
          <p className="admin-sidebar-label">
            MAIN MENU
          </p>

          {/* DASHBOARD */}
          <NavLink
            to="/admin/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <LayoutDashboard size={20} />

            <span>
              Dashboard
            </span>
          </NavLink>

          {/* GALLERY */}
          <NavLink
            to="/admin/gallery"
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <Images size={20} />

            <span>
              Gallery
            </span>
          </NavLink>

          {/* TEAM */}
          <NavLink
            to="/admin/team"
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <Users size={20} />

            <span>
              Team
            </span>
          </NavLink>

          {/* NEWS */}
          <NavLink
            to="/admin/news"
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <Newspaper size={20} />

            <span>
              News
            </span>
          </NavLink>

          {/* ACHIEVEMENTS */}
          <NavLink
            to="/admin/achievements"
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <Trophy size={20} />

            <span>
              Achievements
            </span>
          </NavLink>

          {/* VENUES */}
          <NavLink
            to="/admin/venues"
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <MapPin size={20} />

            <span>
              Venues
            </span>
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="admin-sidebar-bottom">
          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={20} />

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;