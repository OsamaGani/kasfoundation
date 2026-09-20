import { useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./TeamMember.css";

import shahbazAli from "../assets/images/shahbaz-ali.webp";

function ShahbazAli() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="team-member-page">
        <section className="team-member-profile">
          <div className="team-member-badge">CENTRE BACK</div>

          <div className="team-member-grid">
            <div className="team-member-image-wrap">
              <img
                src={shahbazAli}
                alt="Shahbaz Ali"
                className="team-member-image"
              />
            </div>

            <div className="team-member-description">
              <p>
                Shahbaz Ali is a committed centre back who focuses on defensive
                positioning, strength, and maintaining composure on the field.
                His approach helps provide stability to the defensive unit.
              </p>

              <p>
                Shahbaz continues to build his football abilities through
                consistent training and teamwork. His discipline, determination,
                and defensive awareness support his development as a dependable
                player at the back.
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

export default ShahbazAli;
