import { useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./TeamMember.css";

import muhammadHaris from "../assets/images/muhammad-haris.webp";

function MuhammadHaris() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="team-member-page">
        <section className="team-member-profile">
          <div className="team-member-badge">LEFT BACK</div>

          <div className="team-member-grid">
            <div className="team-member-image-wrap">
              <img
                src={muhammadHaris}
                alt="Muhammad Haris"
                className="team-member-image"
              />
            </div>

            <div className="team-member-description">
              <p>
                Muhammad Haris, 13 years old, is a talented left back known for
                his pace and defensive awareness. He combines solid tackling
                with the ability to support attacks down the flank, making him a
                versatile presence on the field.
              </p>

              <p>
                Haris shows great stamina, discipline, and commitment to his
                role, proving to be a reliable option for both defense and
                build-up play. His energy and determination make him an
                important part of the team's backline.
              </p>
            </div>
          </div>
        </section>

        <section className="team-member-cta">
          <div className="team-member-cta-content">
            <h2>JOIN OUR COMMUNITY</h2>

            <Link to="/contact" className="team-member-cta-button">
              GET IN TOUCH
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default MuhammadHaris;
