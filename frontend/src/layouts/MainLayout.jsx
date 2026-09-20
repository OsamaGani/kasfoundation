import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import FloatingActions from "../components/FloatingActions";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="website">
      <Navbar />

      <main className="page-content">
        <Outlet />
      </main>

      <FloatingActions />

      <Footer />
    </div>
  );
}

export default MainLayout;
