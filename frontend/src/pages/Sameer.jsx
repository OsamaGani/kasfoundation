import { useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./TeamMember.css";

import sameer from "../assets/images/sameer.jpeg";

function Sameer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="team-member-page">
        <section className="team-member-profile">
          <div className="team-member-badge">STOPPER</div>

          <div className="team-member-grid">
            <div className="team-member-image-wrap">
              <img
                src={sameer}
                alt="Sameer"
                className="team-member-image"
              />
            </div>

            <div className="team-member-description">
              <p>
                Sameer is an attacking player who brings energy, movement,
                and determination to the forward line. His attacking mindset
                allows him to create opportunities and put pressure on opposing
                defences.
              </p>

              <p>
                Sameer continues to improve his finishing, movement, and overall
                attacking play through focused training. His confidence and
                willingness to work for the team make him an important option in
                the attacking third.
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

export default Sameer;