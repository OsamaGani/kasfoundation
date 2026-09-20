import { useEffect } from "react";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JoinCommunity from "../components/JoinCommunity";

import "./LocationTeam.css";

function AzamgarhTeam() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="location-team-page">
        <section className="location-team-hero">
          <div className="location-team-container">
            <a href="/gallery" className="location-team-back">
              <ArrowLeft size={15} />
              BACK TO GALLERY
            </a>

            <div className="location-team-heading">
              <div className="location-team-badge">OUR TEAM</div>
              <h1>AZAMGARH</h1>
            </div>

            <div className="location-team-gallery">
              <div
                className="location-team-card"
                style={{ "--location-delay": "0s" }}
              >
                <div className="location-team-image">
                  <img
                    src="/assets/images/azamgarh-team.webp"
                    alt="Azamgarh Team"
                  />
                </div>

                <div className="location-team-card-info">
                  <h2>AZAMGARH TEAM</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <JoinCommunity />
      </main>

      <div className="location-team-floating-contact">
        <a href="tel:+0000000000" className="location-team-phone">
          <Phone size={23} />
        </a>

        <a
          href="https://wa.me/0000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="location-team-whatsapp"
        >
          <MessageCircle size={27} />
          <span>How can I help you?</span>
        </a>
      </div>

      <Footer />
    </>
  );
}

export default AzamgarhTeam;
