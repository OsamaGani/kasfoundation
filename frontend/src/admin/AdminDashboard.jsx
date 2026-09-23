import {
  Images,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-dashboard-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="admin-page-heading">
        <div>
          <span className="admin-page-eyebrow">
            ADMINISTRATION
          </span>

          <h2>Dashboard</h2>

          <p>
            Welcome to the KAS Foundation Admin Panel.
            Manage your website content from here.
          </p>
        </div>
      </div>


      {/* =========================================
          STAT CARDS
      ========================================= */}

      <div className="admin-dashboard-stats">

        {/* Gallery */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <Images size={25} />
          </div>

          <div className="admin-stat-content">
            <span>Gallery</span>

            <h3>Manage</h3>

            <p>
              Manage city galleries and photos.
            </p>
          </div>

        </div>


        {/* Team */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <Users size={25} />
          </div>

          <div className="admin-stat-content">
            <span>Team</span>

            <h3>Manage</h3>

            <p>
              Manage foundation team members.
            </p>
          </div>

        </div>


        {/* News */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <FileText size={25} />
          </div>

          <div className="admin-stat-content">
            <span>News</span>

            <h3>Manage</h3>

            <p>
              Manage foundation news and updates.
            </p>
          </div>

        </div>

      </div>


      {/* =========================================
          QUICK ACTIONS
      ========================================= */}

      <section className="admin-dashboard-section">

        <div className="admin-section-heading">

          <div>
            <span>QUICK ACTIONS</span>

            <h3>Website Management</h3>
          </div>

        </div>


        <div className="admin-quick-actions">

          {/* Gallery */}

          <Link
            to="/admin/gallery"
            className="admin-quick-action-card"
          >

            <div className="admin-quick-action-icon">
              <Images size={24} />
            </div>

            <div className="admin-quick-action-content">
              <h4>Gallery Management</h4>

              <p>
                Add cities, upload cover images,
                manage gallery photos and update
                gallery status.
              </p>
            </div>

            <ArrowRight
              size={20}
              className="admin-quick-action-arrow"
            />

          </Link>


          {/* Team */}

          <Link
            to="/admin/team"
            className="admin-quick-action-card"
          >

            <div className="admin-quick-action-icon">
              <Users size={24} />
            </div>

            <div className="admin-quick-action-content">
              <h4>Team Management</h4>

              <p>
                Manage KAS Foundation team members
                and their information.
              </p>
            </div>

            <ArrowRight
              size={20}
              className="admin-quick-action-arrow"
            />

          </Link>


          {/* News */}

          <div className="admin-quick-action-card">

            <div className="admin-quick-action-icon">
              <FileText size={24} />
            </div>

            <div className="admin-quick-action-content">
              <h4>News Management</h4>

              <p>
                News management will be available
                from the admin panel.
              </p>
            </div>

            <ArrowRight
              size={20}
              className="admin-quick-action-arrow"
            />

          </div>

        </div>

      </section>

    </div>
  );
}

export default AdminDashboard;