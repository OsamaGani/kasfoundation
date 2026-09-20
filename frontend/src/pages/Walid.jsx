import { useEffect } from "react";
import { Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Walid.css";

function Walid() {
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
                  src="https://placehold.co/800x1000/e9ebf5/0637a5?text=Walid"
                  alt="Walid"
                />
              </div>

              <div className="member-details">
                <span className="member-label">THE GRASSROOTS FOUNDATION</span>
                <h1>WALID</h1>
                <h2>Right Back</h2>

                <div className="member-line"></div>

                <p>
                  Walid is part of the football programme at The Grassroots
                  Foundation, developing his skills through regular training.
                </p>

                <p>
                  The programme provides young players with an environment to
                  improve technique, teamwork, discipline, and confidence.
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

export default Walid;
