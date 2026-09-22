import { useEffect } from "react";
import { Send } from "lucide-react";

import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./contact.css";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="contact-page">
        {/* ================================
            CONTACT HEADER
        ================================= */}
        <section className="contact-header-section">
          <div className="contact-header-content">
            <h1>REQUEST MORE INFORMATION</h1>

            <p className="contact-intro">
              I appreciate your interest in The Grassroots Foundation. Fill in
              your information and someone from our team will contact you
              shortly to answer any questions you have.
            </p>

            <p className="contact-note">
              Note: Please give us 24-48 hours to return your request.
            </p>
          </div>
        </section>

        {/* ================================
            CONTACT FORM
        ================================= */}
        <section className="contact-form-section">
          <div className="contact-form-card">
            <div className="contact-form-title">
              <h2>YOUR INFORMATION</h2>
            </div>

            <form className="contact-form">
              {/* First + Last Name */}
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" type="text" placeholder="e.g. Anas" />
                </div>

                <div className="contact-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" type="text" placeholder="e.g. Rasheed" />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. abc@youremail.com"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 123 1800-567-8990"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="contact-field contact-full-field">
                <label htmlFor="address">Address</label>
                <input id="address" type="text" />
              </div>

              {/* Academy + Age */}
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="academy">Last Academy or Club Name</label>
                  <input id="academy" type="text" />
                </div>

                <div className="contact-field">
                  <label htmlFor="age">Your Age</label>
                  <input id="age" type="number" min="1" max="100" />
                </div>
              </div>

              {/* Photo */}
              <div className="contact-field contact-full-field">
                <label htmlFor="photo">Upload Your Photo</label>

                <div className="contact-file-wrapper">
                  <input id="photo" type="file" accept="image/*" />
                </div>
              </div>

              {/* Message */}
              <div className="contact-field contact-full-field">
                <label htmlFor="message">Questions/Comments</label>

                <textarea
                  id="message"
                  rows="5"
                  placeholder="Enter your message here"
                ></textarea>
              </div>

              {/* Submit */}
              <button type="submit" className="contact-submit-button">
                <span>SUBMIT</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        </section>
      </main>

      <JoinCommunity />
    </>
  );
}

export default Contact;