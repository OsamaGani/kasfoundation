import { useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./TeamMember.css";

import irfanYousuf from "../assets/images/irfanyousuf.jpeg";

function IrfanYousuf() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="team-member-page">
        <section className="team-member-profile">
          <div className="team-member-badge">ATTACKER</div>

          <div className="team-member-grid">
            <div className="team-member-image-wrap">
              <img
                src={irfanYousuf}
                alt="Irfan Yousuf"
                className="team-member-image"
              />
            </div>

            <div className="team-member-description">
              <p>
                Muhammad Noor is a dedicated centre back who brings strength,
                focus, and determination to the defensive line. His ability to
                read the game helps him respond quickly to attacking situations.
              </p>

              <p>
                Noor continues to develop his defensive skills through regular
                training, teamwork, and match experience. His commitment and
                discipline make him a valuable presence at the heart of the
                team's defence.
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

export default IrfanYousuf;
