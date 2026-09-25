import { useEffect } from "react";
import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const siteName = "Khel Aur Shiksha Foundation";

    const title =
      "Privacy Policy | Khel Aur Shiksha Foundation";

    const description =
      "Read the Privacy Policy of Khel Aur Shiksha Foundation to understand how we collect, use, protect, and manage personal information of players, parents, supporters, and website visitors.";

    const keywords =
      "Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation privacy policy, Khel Aur Shiksha Foundation data privacy, Khel Aur Shiksha Foundation personal information, Khel Aur Shiksha Foundation data protection, Khel Aur Shiksha Foundation website privacy";

    const currentUrl = window.location.href;
    const siteUrl = window.location.origin;

    document.title = title;

    const setMeta = (
      attribute,
      name,
      content
    ) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute(
        "content",
        content
      );
    };

    const setLink = (rel, href) => {
      let element = document.head.querySelector(
        `link[rel="${rel}"]`
      );

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }

      element.setAttribute("href", href);
    };

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

    setLink(
      "canonical",
      currentUrl
    );

    const existingSchema =
      document.head.querySelector(
        'script[data-seo="privacy-policy"]'
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: currentUrl,
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
    };

    const schemaScript =
      document.createElement("script");

    schemaScript.type =
      "application/ld+json";

    schemaScript.setAttribute(
      "data-seo",
      "privacy-policy"
    );

    schemaScript.textContent =
      JSON.stringify(schema);

    document.head.appendChild(
      schemaScript
    );

    return () => {
      const currentSchema =
        document.head.querySelector(
          'script[data-seo="privacy-policy"]'
        );

      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="privacy-page">

        {/* =========================================
            PRIVACY POLICY HEADER
        ========================================= */}

        <section className="privacy-header">

          <div className="privacy-header-line"></div>

          <span className="privacy-eyebrow">
            KHEL AUR SHIKSHA FOUNDATION
          </span>

          <h1>PRIVACY POLICY</h1>

          <p>
            We are committed to protecting the privacy of our players, parents,
            supporters, and website visitors.
          </p>

        </section>

        {/* =========================================
            PRIVACY POLICY CONTENT
        ========================================= */}

        <section className="privacy-content-section">

          <div className="privacy-content">

            <p>
              At Khel Aur Shiksha Foundation, we are committed to protecting
              the privacy of our players, parents, supporters, and website
              visitors. This Privacy Policy explains how we collect, use, and
              safeguard your personal information.
            </p>

            <div className="privacy-block">

              <h2>1. Information We Collect</h2>

              <p>
                We may collect the following information when you interact
                with us:
              </p>

              <ul>

                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, age, and details provided during registrations,
                  inquiries, or camp sign-ups.
                </li>

                <li>
                  <strong>Non-Personal Information:</strong> Browser type,
                  IP address, and website usage data collected automatically
                  through cookies or analytics tools.
                </li>

                <li>
                  <strong>Sensitive Information:</strong> For players
                  registering for programs, we may collect limited health or
                  emergency contact details (only when necessary for safety).
                </li>

              </ul>

            </div>

            <div className="privacy-block">

              <h2>2. How We Use Your Information</h2>

              <p>
                We may use your information to:
              </p>

              <ul>

                <li>
                  Process registrations and participation in camps, training,
                  and events.
                </li>

                <li>
                  Communicate updates, schedules, or opportunities.
                </li>

                <li>
                  Improve our website, services, and outreach.
                </li>

                <li>
                  Ensure safeguarding, child protection, and compliance with
                  local regulations.
                </li>

                <li>
                  Share achievements or stories (only with prior consent).
                </li>

              </ul>

            </div>

            <div className="privacy-block">

              <h2>3. Sharing of Information</h2>

              <p>
                We do not sell, trade, or rent personal information. We may
                share data only when:
              </p>

              <ul>

                <li>
                  Required by law or authorities.
                </li>

                <li>
                  Necessary for safety and safeguarding.
                </li>

                <li>
                  With trusted service providers (e.g., IT support,
                  communication tools) under confidentiality agreements.
                </li>

              </ul>

            </div>

            <div className="privacy-block">

              <h2>4. Data Security</h2>

              <p>
                We take appropriate measures to protect your data from
                unauthorized access, misuse, or disclosure. However, please
                note that no online transmission can be guaranteed to be 100%
                secure.
              </p>

            </div>

            <div className="privacy-block">

              <h2>5. Your Rights</h2>

              <p>
                You have the right to:
              </p>

              <ul>

                <li>
                  Access, correct, or request deletion of your personal
                  information.
                </li>

                <li>
                  Withdraw consent for the use of your information.
                </li>

                <li>
                  Request details on how your data is stored and used.
                </li>

              </ul>

              <p>
                For requests, contact us at{" "}
                <a href="mailto:mailnow.kasf@gmail.com">
                  mailnow.kasf@gmail.com
                </a>
              </p>

            </div>

            <div className="privacy-block">

              <h2>6. Cookies and Analytics</h2>

              <p>
                Our website may use cookies and third-party analytics to
                improve performance and user experience. You may disable
                cookies in your browser if you prefer.
              </p>

            </div>

            <div className="privacy-block">

              <h2>7. Children’s Privacy</h2>

              <p>
                Protecting children’s privacy is a priority. Information of
                players under 18 is collected only with parental or guardian
                consent and is used strictly for participation in our
                programs.
              </p>

            </div>

            <div className="privacy-block">

              <h2>8. Updates to This Policy</h2>

              <p>
                We may update this Privacy Policy periodically. Any changes
                will be posted on this page with an updated effective date.
              </p>

            </div>

            <div className="privacy-block">

              <h2>9. Contact Us</h2>

              <p>
                For questions about this Privacy Policy or how we handle your
                information, please contact:
              </p>

              <h3>
                Khel Aur Shiksha Foundation
              </h3>

              <div className="privacy-contact">

                <a href="mailto:mailnow.kasf@gmail.com">
                  mailnow.kasf@gmail.com
                </a>

                <a href="tel:+919004630950">
                  +91 9004630950
                </a>

              </div>

            </div>

          </div>

        </section>

        <JoinCommunity />

      </main>
    </>
  );
}

export default PrivacyPolicy;