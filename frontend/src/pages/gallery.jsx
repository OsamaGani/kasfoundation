import { useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JoinCommunity from "../components/JoinCommunity";

import "./gallery.css";

const galleryCards = [
  {
    name: "GONDA",
    path: "/team/gonda-team/",
    image: "/assets/images/gonda-team.webp",
  },
  {
    name: "FAIZABAAD",
    path: "/team/faizabaad-team/",
    image: "/assets/images/faizabaad-team.webp",
  },
  {
    name: "BALRAMPUR",
    path: "/team/balrampur-team/",
    image: "/assets/images/balrampur-team.webp",
  },
  {
    name: "LUCKNOW",
    path: "/team/lucknow-team/",
    image: "/assets/images/lucknow-team.webp",
  },
  {
    name: "BASTI",
    path: "/team/basti-team/",
    image: "/assets/images/basti-team.webp",
  },
  {
    name: "AZAMGARH",
    path: "/team/azamgarh-team/",
    image: "/assets/images/azamgarh-team.webp",
  },
];

function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="gallery-page">
        {/* GALLERY HERO */}
        <section className="gallery-hero">
          <div className="gallery-hero-content">
            <div className="gallery-badge">GALLERY</div>

            <h1>KHEL AUR SHIKSHA FOUNDATION</h1>
          </div>
        </section>

        {/* GALLERY CARDS */}
        <section className="gallery-section">
          <div className="gallery-grid">
            {galleryCards.map((card, index) => (
              <a
                href={card.path}
                className="gallery-card"
                key={card.name}
                style={{
                  "--gallery-delay": `${index * 0.12}s`,
                }}
              >
                <div className="gallery-image-wrapper">
                  <img src={card.image} alt={`${card.name} Team`} />

                  <div className="gallery-image-overlay">
                    <span>VIEW TEAM</span>
                  </div>
                </div>

                <div className="gallery-card-title">{card.name}</div>
              </a>
            ))}
          </div>
        </section>

        {/* JOIN COMMUNITY */}
        <JoinCommunity />
      </main>

      {/* FLOATING CONTACT */}
      <div className="gallery-floating-contact">
        <a
          href="tel:+0000000000"
          className="gallery-floating-phone"
          aria-label="Call us"
        >
          <Phone size={23} />
        </a>

        <a
          href="https://wa.me/0000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="gallery-floating-whatsapp"
          aria-label="WhatsApp"
        >
          <MessageCircle size={27} strokeWidth={2.5} />

          <span>How can I help you?</span>
        </a>
      </div>

      <Footer />
    </>
  );
}

export default Gallery;
