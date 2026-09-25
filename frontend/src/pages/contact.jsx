import { useEffect } from "react";
import { Send } from "lucide-react";

import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./contact.css";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);

    /* =====================================================
       SEO
    ===================================================== */

    const siteName =
      "Khel Aur Shiksha Foundation";

    const title =
      "Contact Us | Khel Aur Shiksha Foundation";

    const description =
      "Contact Khel Aur Shiksha Foundation for football programs, training, partnerships, volunteering, support and other inquiries.";

    const keywords =
      "Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation contact, Khel Aur Shiksha Foundation contact us, Khel Aur Shiksha Foundation football, Khel Aur Shiksha Foundation football training, Khel Aur Shiksha Foundation programs, Khel Aur Shiksha Foundation partnerships, Khel Aur Shiksha Foundation volunteering";

    const currentUrl =
      `${window.location.origin}/contact`;

    const siteUrl =
      window.location.origin;

    document.title = title;

    const setMeta = (
      attribute,
      name,
      content
    ) => {
      let element =
        document.head.querySelector(
          `meta[${attribute}="${name}"]`
        );

      if (!element) {
        element =
          document.createElement("meta");

        element.setAttribute(
          attribute,
          name
        );

        document.head.appendChild(
          element
        );
      }

      element.setAttribute(
        "content",
        content
      );
    };

    const setLink = (
      rel,
      href
    ) => {
      let element =
        document.head.querySelector(
          `link[rel="${rel}"]`
        );

      if (!element) {
        element =
          document.createElement("link");

        element.setAttribute(
          "rel",
          rel
        );

        document.head.appendChild(
          element
        );
      }

      element.setAttribute(
        "href",
        href
      );
    };

    /* Basic SEO */

    setMeta(
      "name",
      "description",
      description
    );

    setMeta(
      "name",
      "keywords",
      keywords
    );

    setMeta(
      "name",
      "author",
      siteName
    );

    setMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    /* Open Graph */

    setMeta(
      "property",
      "og:title",
      title
    );

    setMeta(
      "property",
      "og:description",
      description
    );

    setMeta(
      "property",
      "og:type",
      "website"
    );

    setMeta(
      "property",
      "og:url",
      currentUrl
    );

    setMeta(
      "property",
      "og:site_name",
      siteName
    );

    setMeta(
      "property",
      "og:image",
      `${siteUrl}/logo.png`
    );

    /* Twitter */

    setMeta(
      "name",
      "twitter:card",
      "summary_large_image"
    );

    setMeta(
      "name",
      "twitter:title",
      title
    );

    setMeta(
      "name",
      "twitter:description",
      description
    );

    setMeta(
      "name",
      "twitter:image",
      `${siteUrl}/logo.png`
    );

    /* Canonical */

    setLink(
      "canonical",
      currentUrl
    );

    /* Structured Data */

    let structuredData =
      document.getElementById(
        "kas-foundation-contact-structured-data"
      );

    if (!structuredData) {
      structuredData =
        document.createElement(
          "script"
        );

      structuredData.id =
        "kas-foundation-contact-structured-data";

      structuredData.type =
        "application/ld+json";

      document.head.appendChild(
        structuredData
      );
    }

    structuredData.textContent =
      JSON.stringify({
        "@context":
          "https://schema.org",

        "@type":
          "ContactPage",

        name:
          title,

        url:
          currentUrl,

        description:
          description,

        isPartOf: {
          "@type":
            "Organization",

          name:
            siteName,

          url:
            siteUrl,
        },

        publisher: {
          "@type":
            "Organization",

          name:
            siteName,

          url:
            siteUrl,
        },
      });

    return () => {
      const existingStructuredData =
        document.getElementById(
          "kas-foundation-contact-structured-data"
        );

      if (existingStructuredData) {
        existingStructuredData.remove();
      }
    };
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

            <h1>
              REQUEST MORE INFORMATION
            </h1>

            <p className="contact-intro">
              I appreciate your interest in
              Khel Aur Shiksha Foundation.
              Fill in your information and
              someone from our team will
              contact you shortly to answer
              any questions you have.
            </p>

            <p className="contact-note">
              Note: Please give us 24-48 hours
              to return your request.
            </p>

          </div>

        </section>


        {/* ================================
            CONTACT FORM
        ================================= */}

        <section className="contact-form-section">

          <div className="contact-form-card">

            <div className="contact-form-title">

              <h2>
                YOUR INFORMATION
              </h2>

            </div>


            <form className="contact-form">

              {/* First + Last Name */}

              <div className="contact-form-row">

                <div className="contact-field">

                  <label htmlFor="firstName">
                    First Name
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    placeholder="e.g. Anas"
                  />

                </div>


                <div className="contact-field">

                  <label htmlFor="lastName">
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    placeholder="e.g. Rasheed"
                  />

                </div>

              </div>


              {/* Email + Phone */}

              <div className="contact-form-row">

                <div className="contact-field">

                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. abc@youremail.com"
                  />

                </div>


                <div className="contact-field">

                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 123 1800-567-8990"
                  />

                </div>

              </div>


              {/* Address */}

              <div className="contact-field contact-full-field">

                <label htmlFor="address">
                  Address
                </label>

                <input
                  id="address"
                  type="text"
                />

              </div>


              {/* Academy + Age */}

              <div className="contact-form-row">

                <div className="contact-field">

                  <label htmlFor="academy">
                    Last Academy or Club Name
                  </label>

                  <input
                    id="academy"
                    type="text"
                  />

                </div>


                <div className="contact-field">

                  <label htmlFor="age">
                    Your Age
                  </label>

                  <input
                    id="age"
                    type="number"
                    min="1"
                    max="100"
                  />

                </div>

              </div>


              {/* Photo */}

              <div className="contact-field contact-full-field">

                <label htmlFor="photo">
                  Upload Your Photo
                </label>

                <div className="contact-file-wrapper">

                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                  />

                </div>

              </div>


              {/* Message */}

              <div className="contact-field contact-full-field">

                <label htmlFor="message">
                  Questions/Comments
                </label>

                <textarea
                  id="message"
                  rows="5"
                  placeholder="Enter your message here"
                ></textarea>

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="contact-submit-button"
              >

                <span>
                  SUBMIT
                </span>

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