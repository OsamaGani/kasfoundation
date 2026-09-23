import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

/* =========================================
   PUBLIC PAGES
========================================= */

import Home from "./pages/Home";
import OurTrainingProgram from "./pages/OurTrainingProgram";
import EducationProgram from "./pages/EducationProgram";
import About from "./pages/about";

import OurTeam from "./pages/OurTeam";
import TeamMember from "./pages/TeamMember";

import Contact from "./pages/contact";

import Gallery from "./pages/gallery";
import GalleryAlbum from "./pages/GalleryAlbum";

import GondaTeam from "./pages/GondaTeam";
import FaizabaadTeam from "./pages/FaizabaadTeam";
import BalrampurTeam from "./pages/BalrampurTeam";
import LucknowTeam from "./pages/LucknowTeam";
import BastiTeam from "./pages/BastiTeam";
import AzamgarhTeam from "./pages/AzamgarhTeam";

import Achievements from "./pages/achievements";

import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";

import Venues from "./pages/Venues";

/* =========================================
   ADMIN
========================================= */

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminGallery from "./admin/pages/AdminGallery";
import AdminTeam from "./admin/pages/AdminTeam";
import AdminNews from "./admin/pages/AdminNews";
import AdminAchievements from "./admin/pages/AdminAchievements";
import AdminVenues from "./admin/pages/AdminVenues";

/* =========================================
   PAGE TITLE
========================================= */

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const path =
      location.pathname.replace(/\/+$/, "") || "/";

    const pageTitles = {
      /* =====================================
         PUBLIC PAGES
      ===================================== */

      "/":
        "Home | KAS Foundation",

      "/our-training-program":
        "Our Training Program | KAS Foundation",

      "/education-program":
        "Education Program | KAS Foundation",

      "/about":
        "About Us | KAS Foundation",

      "/team":
        "Our Team | KAS Foundation",

      "/contact":
        "Contact | KAS Foundation",

      "/gallery":
        "Gallery | KAS Foundation",

      "/achievements":
        "Achievements | KAS Foundation",

      "/news":
        "News | KAS Foundation",

      "/venues":
        "Venues | KAS Foundation",

      /* =====================================
         LOCATION TEAM TITLES
      ===================================== */

      "/team/gonda-team":
        "Gonda Team | KAS Foundation",

      "/team/faizabaad-team":
        "Faizabaad Team | KAS Foundation",

      "/team/balrampur-team":
        "Balrampur Team | KAS Foundation",

      "/team/lucknow-team":
        "Lucknow Team | KAS Foundation",

      "/team/basti-team":
        "Basti Team | KAS Foundation",

      "/team/azamgarh-team":
        "Azamgarh Team | KAS Foundation",

      /* =====================================
         ADMIN TITLES
      ===================================== */

      "/admin/login":
        "Admin Login | KAS Foundation",

      "/admin/dashboard":
        "Admin Dashboard | KAS Foundation",

      "/admin/gallery":
        "Gallery Management | KAS Foundation",

      "/admin/team":
        "Team Management | KAS Foundation",

      "/admin/news":
        "News Management | KAS Foundation",

      "/admin/achievements":
        "Achievements Management | KAS Foundation",

      "/admin/venues":
        "Venues Management | KAS Foundation",
    };

    if (pageTitles[path]) {
      document.title = pageTitles[path];
    } else if (path.startsWith("/team/")) {
      /*
        Dynamic team member page.
        Actual member name comes from MongoDB,
        so a generic title is used here.
      */
      document.title =
        "Team Member | KAS Foundation";
    } else if (path.startsWith("/gallery/")) {
      document.title =
        "Gallery | KAS Foundation";
    } else if (path.startsWith("/news/")) {
      document.title =
        "News Article | KAS Foundation";
    } else {
      document.title =
        "KAS Foundation";
    }
  }, [location.pathname]);

  return null;
}

/* =========================================
   APP
========================================= */

function App() {
  return (
    <BrowserRouter>

      <PageTitle />

      <Routes>

        {/* =========================================
            PUBLIC WEBSITE
        ========================================= */}

        <Route element={<MainLayout />}>

          {/* =====================================
              HOME
          ===================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* =====================================
              PROGRAMS
          ===================================== */}

          <Route
            path="/our-training-program"
            element={<OurTrainingProgram />}
          />

          <Route
            path="/education-program"
            element={<EducationProgram />}
          />

          {/* =====================================
              ABOUT
          ===================================== */}

          <Route
            path="/about"
            element={<About />}
          />

          {/* =====================================
              OUR TEAM
          ===================================== */}

          <Route
            path="/team"
            element={<OurTeam />}
          />

          {/* =====================================
              DYNAMIC TEAM MEMBER
          ===================================== */}

          <Route
            path="/team/:slug"
            element={<TeamMember />}
          />

          {/* =====================================
              CONTACT
          ===================================== */}

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* =====================================
              GALLERY
          ===================================== */}

          <Route
            path="/gallery"
            element={<Gallery />}
          />

          <Route
            path="/gallery/:slug"
            element={<GalleryAlbum />}
          />

          {/* =====================================
              LOCATION TEAM PAGES
          ===================================== */}

          <Route
            path="/team/gonda-team"
            element={<GondaTeam />}
          />

          <Route
            path="/team/faizabaad-team"
            element={<FaizabaadTeam />}
          />

          <Route
            path="/team/balrampur-team"
            element={<BalrampurTeam />}
          />

          <Route
            path="/team/lucknow-team"
            element={<LucknowTeam />}
          />

          <Route
            path="/team/basti-team"
            element={<BastiTeam />}
          />

          <Route
            path="/team/azamgarh-team"
            element={<AzamgarhTeam />}
          />

          {/* =====================================
              ACHIEVEMENTS
          ===================================== */}

          <Route
            path="/achievements"
            element={<Achievements />}
          />

          {/* =====================================
              NEWS
          ===================================== */}

          <Route
            path="/news"
            element={<News />}
          />

          <Route
            path="/news/:slug"
            element={<NewsArticle />}
          />

          {/* =====================================
              VENUES
          ===================================== */}

          <Route
            path="/venues"
            element={<Venues />}
          />

        </Route>

        {/* =========================================
            ADMIN LOGIN
        ========================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =========================================
            ADMIN PANEL
        ========================================= */}

        <Route element={<AdminLayout />}>

          {/* ADMIN DASHBOARD */}

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          {/* ADMIN GALLERY */}

          <Route
            path="/admin/gallery"
            element={<AdminGallery />}
          />

          {/* ADMIN TEAM */}

          <Route
            path="/admin/team"
            element={<AdminTeam />}
          />

          {/* ADMIN NEWS */}

          <Route
            path="/admin/news"
            element={<AdminNews />}
          />

          {/* ADMIN ACHIEVEMENTS */}

          <Route
            path="/admin/achievements"
            element={<AdminAchievements />}
          />

          {/* ADMIN VENUES */}

          <Route
            path="/admin/venues"
            element={<AdminVenues />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;