import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

import "./admin.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />

      <div className="admin-main">

        <AdminHeader
          onMenuClick={handleMenuClick}
        />

        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;