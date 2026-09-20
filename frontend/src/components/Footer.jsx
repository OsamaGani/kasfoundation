import React from "react";
import "./Footer.css";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* LEFT SECTION */}
        <div className="footer-about">
          <div className="footer-logo">
            <img src={logo} alt="KAS Foundation" />
          </div>

          <p className="footer-description">
            The Grassroots Foundation is dedicated to empowering youth through
            football, education, and community initiatives, helping every child
            dream bigger.
          </p>

          <div className="footer-subscribe">
            <p>
              Subscribe to receive registration perks,
              <br />
              exclusive offers & more!
            </p>

            <form className="subscribe-form">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
              />

              <button type="submit" aria-label="Subscribe">
                <span>→</span>
              </button>
            </form>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3>Quick Link</h3>

          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/venues">Venues</a>
            <a href="/team">Our Team</a>
            <a href="/achievements">Our Achievements</a>
            <a href="/gallery">Gallery</a>
            <a href="/news">News</a>
          </div>
        </div>

        {/* POLICY */}
        <div className="footer-column">
          <h3>Policy</h3>

          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/faqs">FAQs</a>
          </div>
        </div>

        {/* CONTACT */}
        <div className="footer-column footer-contact">
          <h3>Contacts</h3>

          <a href="tel:+923263900818" className="footer-contact-link">
            +92 326 3900818
          </a>

          <a
            href="mailto:info@thegrassrootsfoundation.co"
            className="footer-contact-link"
          >
            info@thegrassrootsfoundation.co
          </a>

          <p>
            70 – CCA sector A commercial phase 9 town
            <br />
            Dha Lahore
          </p>

          {/* SOCIAL ICONS */}
          <div className="footer-socials">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="social-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="social-icon">
              <svg viewBox="0 0 24 24">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="social-icon">
              <svg viewBox="0 0 24 24">
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="1"
                  fill="currentColor"
                />

                <rect x="7" y="10" width="2" height="7" fill="#ffffff" />

                <circle cx="8" cy="7.5" r="1" fill="#ffffff" />

                <path
                  d="M12 10h2v1c.5-.8 1.4-1.3 2.5-1.3 2 0 2.5 1.3 2.5 3.5V17h-2v-3.3c0-1.1-.4-1.8-1.3-1.8s-1.7.7-1.7 2V17h-2v-7Z"
                  fill="#ffffff"
                />
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="social-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C1.9 9 1.9 12 1.9 12s0 3 .5 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8Z"
                  fill="currentColor"
                />

                <path d="m10 15.5 5-3.5-5-3.5v7Z" fill="#ffffff" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>
          © Khel Aur Shiksha Foundation. All Rights Reserved – Develop by{" "}
          <a href="#">Usama Gani kk</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
