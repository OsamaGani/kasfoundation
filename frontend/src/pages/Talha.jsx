import { useEffect } from "react";
import { Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Talha.css";

function Talha() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="member-page">
        <section className="member-hero">
          <div className="member-hero-content">
            <Link to="/team/" className="member-back">
              <ArrowLeft size={18} />
              <span>BACK TO OUR TEAM</span>
            </Link>

            <div className="member-profile">
              <div className="member-image-box">
                <img
                  src="https://placehold.co/800x1000/e9ebf5/0637a5?text=Talha"
                  alt="Talha"
                />
              </div>

              <div className="member-details">
                <span className="member-label">THE GRASSROOTS FOUNDATION</span>
                <h1>TALHA</h1>
                <h2>Central Midfielder</h2>

                <div className="member-line"></div>

                <p>
                  Talha is part of the young football talent developing through
                  The Grassroots Foundation.
                </p>

                <p>
                  The training environment encourages players to build technical
                  ability, teamwork, discipline, and confidence.
                </p>

                <Link to="/contact" className="member-contact-button">
                  GET IN TOUCH
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="member-floating-contact">
        <a href="tel:+0000000000" className="member-phone" aria-label="Call us">
          <Phone size={23} />
        </a>

        <a
          href="https://wa.me/0000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="member-whatsapp"
          aria-label="WhatsApp"
        >
          <MessageCircle size={28} strokeWidth={2.5} />
        </a>
      </div>

      <Footer />
    </>
  );
}

export default Talha;
