import { useEffect } from "react";
import { Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JoinCommunity from "../components/JoinCommunity";

import "./SaudYousaf.css";

function SaudYousaf() {
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
                  src="https://placehold.co/800x1000/e9ebf5/0637a5?text=Saud+Yousaf"
                  alt="Saud Yousaf"
                />
              </div>

              <div className="member-details">
                <span className="member-label">THE GRASSROOTS FOUNDATION</span>

                <h1>SAUD YOUSAF</h1>

                <h2>Founder & Chairman</h2>

                <div className="member-line"></div>

                <p>
                  Saud Yousaf is the Founder and Chairman of The Grassroots
                  Foundation, working to create opportunities for young talent
                  through football, education, and community development.
                </p>

                <p>
                  His vision is focused on creating an environment where young
                  people can develop their skills, confidence, discipline, and
                  passion while receiving the support they need to grow.
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
      <JoinCommunity />
      <Footer />
    </>
  );
}

export default SaudYousaf;
