import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import OurTrainingProgram from "./pages/OurTrainingProgram";
import EducationProgram from "./pages/EducationProgram";

import About from "./pages/about";

import OurTeam from "./pages/OurTeam";
import Contact from "./pages/contact";

import SaudYousaf from "./pages/SaudYousaf";
import ZohairAltafGondal from "./pages/ZohairAltafGondal";
import ArshadNadeem from "./pages/ArshadNadeem";

import Shuraim from "./pages/shuraim";
import IrfanYousuf from "./pages/irfanYousuf";
import Sameer from "./pages/Sameer";

import Ramzan from "./pages/Ramzan";
import Walid from "./pages/Walid";
import Hamad from "./pages/Hamad";
import Rehan from "./pages/Rehan";
import Talha from "./pages/Talha";
import Kashif from "./pages/Kashif";

import MoosaYousuf from "./pages/Moosa";

import Gallery from "./pages/gallery";

import GondaTeam from "./pages/GondaTeam";
import FaizabaadTeam from "./pages/FaizabaadTeam";
import BalrampurTeam from "./pages/BalrampurTeam";
import LucknowTeam from "./pages/LucknowTeam";
import BastiTeam from "./pages/BastiTeam";
import AzamgarhTeam from "./pages/AzamgarhTeam";

import Achievements from "./pages/achievements";

import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================================
            MAIN LAYOUT
        ========================================= */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/our-training-program"
            element={<OurTrainingProgram />}
          />

          <Route path="/education-program" element={<EducationProgram />} />
        </Route>

        {/* =========================================
            ABOUT
        ========================================= */}

        <Route path="/about" element={<About />} />

        {/* =========================================
            OUR TEAM
        ========================================= */}

        <Route path="/team/" element={<OurTeam />} />

        {/* =========================================
            TEAM MEMBERS
        ========================================= */}

        <Route path="/team/saud-yousaf/" element={<SaudYousaf />} />

        <Route
          path="/team/zohair-altaf-gondal/"
          element={<ZohairAltafGondal />}
        />

        <Route path="/team/arshad-nadeem/" element={<ArshadNadeem />} />

        <Route path="/team/shuraim/" element={<Shuraim />} />

        <Route path="/team/irfan-yousuf/" element={<IrfanYousuf />} />

        <Route path="/team/sameer/" element={<Sameer />} />

        <Route path="/team/ramzan/" element={<Ramzan />} />

        <Route path="/team/walid/" element={<Walid />} />

        <Route path="/team/hamad/" element={<Hamad />} />

        <Route path="/team/rehan/" element={<Rehan />} />

        <Route path="/team/talha/" element={<Talha />} />

        <Route path="/team/kashif/" element={<Kashif />} />

        <Route path="/team/moosa-yousuf/" element={<MoosaYousuf />} />

        {/* =========================================
            CONTACT
        ========================================= */}

        <Route path="/contact" element={<Contact />} />

        {/* =========================================
            GALLERY
        ========================================= */}

        <Route path="/gallery" element={<Gallery />} />

        {/* =========================================
            LOCATION TEAMS
        ========================================= */}

        <Route path="/team/gonda-team/" element={<GondaTeam />} />

        <Route path="/team/faizabaad-team/" element={<FaizabaadTeam />} />

        <Route path="/team/balrampur-team/" element={<BalrampurTeam />} />

        <Route path="/team/lucknow-team/" element={<LucknowTeam />} />

        <Route path="/team/basti-team/" element={<BastiTeam />} />

        <Route path="/team/azamgarh-team/" element={<AzamgarhTeam />} />

        {/* =========================================
            ACHIEVEMENTS
        ========================================= */}

        <Route path="/achievements" element={<Achievements />} />

        {/* =========================================
            NEWS
        ========================================= */}

        <Route path="/news" element={<News />} />

        <Route path="/news/:slug/" element={<NewsArticle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
