import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, X } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./about.css";

import aboutLeft from "../assets/images/about-left.jpeg"
import aboutRight from "../assets/images/about-right.jpeg";
import aboutLeft1 from "../assets/images/about-left1.jpeg";
import aboutRight1 from "../assets/images/about-right1.jpeg";
import logo from "../assets/images/logo.png";
import aboutVideo from "../assets/videos/about-video.mp4";

function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <>
      <Navbar />

      <main className="about-page">
        {/* =========================================
            ABOUT INTRO
        ========================================= */}
        <section className="about-intro-section">
          <div className="about-intro-container">
            <div className="about-intro-image">
              <img src={aboutLeft} alt="Khel Aur Shiksha Foundation" />
            </div>

            <div className="about-intro-content">
              <span className="about-small-title">ABOUT US</span>

              <h1>
                <span>WE HELP PEOPLE FIND A</span>
                <span>PLACE TO BELONG</span>
              </h1>

              <p>
                When I founded The Khel Aur Shiksha Foundations Foundation, my
                vision was clear — to give every child in Pakistan, regardless
                of their background, the opportunity to dream through football.
                I have witnessed how this game can transform lives, instill
                discipline, and open doors to possibilities that once seemed out
                of reach.
              </p>

              <p>
                At TGF, we are not only developing footballers but nurturing
                confident, educated, and empowered individuals who can lead
                communities and inspire the next generation. Our goal goes far
                beyond local impact — we are building a foundation that can
                stand on a global level, creating pathways for young players to
                reach the top-tier leagues of the world and put Pakistan on the
                map of footballing world.
              </p>

              <p>
                This is just the beginning of our journey. With passion,
                perseverance, and purpose, we are determined to make football a
                true force for change in Pakistan and beyond.
              </p>

              <strong className="about-founder">– Saud Yousaf, Founder</strong>
            </div>
          </div>
        </section>

        {/* =========================================
            OUR MISSION
        ========================================= */}
        <section className="about-mission-section">
          <div className="about-mission-container">
            <div className="about-mission-content">
              <h2>OUR MISSION</h2>

              <p>
                Transform lives through football by providing underprivileged
                youth with access to world-class training, education, and
                mentorship. We aim to nurture talent from the Khel Aur Shiksha
                Foundations to the elite level, creating opportunities for
                players to succeed locally and globally, and to represent
                Pakistan with pride on the world stage.
              </p>
            </div>

            <div className="about-mission-image">
              <img src={aboutRight} alt="Young football players" />
            </div>
          </div>
        </section>

        {/* =========================================
            OUR VISION
        ========================================= */}
        <section className="about-vision-section">
          <div className="about-mission-container">
            <div className="about-mission-image">
              <img src={aboutRight1} alt="Football players" />
            </div>

            <div className="about-mission-content">
              <h2>OUR VISION</h2>

              <p>
                To create a future where every young person has access to
                football, education, mentorship, and meaningful opportunities to
                grow. We envision a strong football community that develops
                talented players, builds confident individuals, and creates
                pathways for young athletes to represent Pakistan at the highest
                level.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================
            IMAGE GALLERY
        ========================================= */}
        <section className="about-gallery-section">
          <div className="about-gallery-container">
            {/* LEFT IMAGE */}
            <button
              type="button"
              className="about-gallery-card about-gallery-left"
              onClick={() => setSelectedImage(aboutRight1)}
              aria-label="Open image"
            >
              <img
                src={aboutRight1}
                alt="Khel Aur Shiksha Foundation football training"
              />
            </button>

            {/* CENTER IMAGE */}
            <button
              type="button"
              className="about-gallery-card about-gallery-center"
              onClick={() => setSelectedImage(aboutLeft1)}
              aria-label="Open image"
            >
              <img
                src={aboutLeft1}
                alt="Khel Aur Shiksha Foundation football"
              />
            </button>

            {/* RIGHT IMAGE */}
            <button
              type="button"
              className="about-gallery-card about-gallery-right"
              onClick={() => setSelectedImage(aboutRight)}
              aria-label="Open image"
            >
              <img
                src={aboutRight}
                alt="Khel Aur Shiksha Foundation football player"
              />
            </button>
          </div>
        </section>

        {/* =========================================
            COMMUNITY + VIDEO
        ========================================= */}
        <section className="about-community-section">
          {/* LEFT CONTENT */}
          <div className="about-community-content">
            <div className="about-community-logo">
              <img src={logo} alt="The Khel Aur Shiksha Foundation" />
            </div>

            <h3>Khel Aur Shiksha Foundation</h3>

            <p>
              At The Khel Aur Shiksha Foundations Foundation, we go beyond
              training athletes — we build a community. Through football, we
              connect people, inspire dreams, and create a space where every
              child has the chance to grow, belong, and succeed.
            </p>

            <Link to="/contact" className="about-community-contact">
              CONTACT US
            </Link>
          </div>

          {/* RIGHT VIDEO */}
          <div className="about-community-video">
            <video autoPlay muted loop playsInline controls preload="auto">
              <source src={aboutVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* =========================================
            IMAGE POPUP
        ========================================= */}
        {selectedImage && (
          <div
            className="about-image-modal"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="about-image-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              <X size={30} />
            </button>

            <div
              className="about-image-modal-content"
              onClick={(event) => event.stopPropagation()}
            >
              <img src={selectedImage} alt="Khel Aur Shiksha Foundation" />
            </div>
          </div>
        )}
      </main>

      {/* =========================================
          FLOATING CONTACT
      ========================================= */}
      <div className="about-floating-contact">
        <a
          href="tel:+0000000000"
          className="about-floating-phone"
          aria-label="Call us"
        >
          <Phone size={23} />
        </a>

        <a
          href="#"
          className="about-floating-whatsapp"
          aria-label="WhatsApp"
          onClick={(event) => event.preventDefault()}
        >
          <MessageCircle size={28} strokeWidth={2.5} />
        </a>
      </div>

      <Footer />
    </>
  );
}

export default About;
