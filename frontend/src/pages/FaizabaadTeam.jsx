import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

import JoinCommunity from "../components/JoinCommunity";

import "./LocationTeam.css";

function FaizabaadTeam() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="location-team-page">
      <section className="location-team-hero">
        <div className="location-team-container">
          <a href="/gallery" className="location-team-back">
            <ArrowLeft size={15} />
            BACK TO GALLERY
          </a>

          <div className="location-team-heading">
            <div className="location-team-badge">OUR TEAM</div>
            <h1>FAIZABAAD</h1>
          </div>

          <div className="location-team-gallery">
            <div
              className="location-team-card"
              style={{ "--location-delay": "0s" }}
            >
              <div className="location-team-image">
                <img
                  src="/assets/images/faizabaad-team.webp"
                  alt="Faizabaad Team"
                />
              </div>

              <div className="location-team-card-info">
                <h2>FAIZABAAD TEAM</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JoinCommunity />
    </main>
  );
}

export default FaizabaadTeam;