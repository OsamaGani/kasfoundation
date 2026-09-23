import { Menu, Bell, UserCircle } from "lucide-react";

function AdminHeader({ onMenuClick }) {
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-menu-button"
          onClick={onMenuClick}
          aria-label="Open admin menu"
        >
          <Menu size={24} />
        </button>

        <div className="admin-header-title">
          <span>ADMIN PANEL</span>
          <h1>KAS Foundation</h1>
        </div>
      </div>

      <div className="admin-header-right">
        <button
          type="button"
          className="admin-header-icon"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="admin-notification-dot"></span>
        </button>

        <div className="admin-profile">
          <div className="admin-profile-icon">
            <UserCircle size={34} />
          </div>

          <div className="admin-profile-info">
            <strong>Administrator</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;