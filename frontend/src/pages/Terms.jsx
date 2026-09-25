import { useEffect } from "react";

import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./Terms.css";

function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const siteName = "Khel Aur Shiksha Foundation";

    const title =
      "Terms & Conditions | Khel Aur Shiksha Foundation";

    const description =
      "Read the Terms & Conditions of Khel Aur Shiksha Foundation covering website use, program participation, donations, privacy, intellectual property, code of conduct, and other important guidelines.";

    const keywords =
      "Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation terms, Khel Aur Shiksha Foundation terms and conditions, Khel Aur Shiksha Foundation program rules, Khel Aur Shiksha Foundation website terms, Khel Aur Shiksha Foundation donations, Khel Aur Shiksha Foundation privacy, Khel Aur Shiksha Foundation code of conduct";

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

      element.setAttribute("content", content);
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
        'script[data-seo="terms"]'
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
      "terms"
    );

    schemaScript.textContent =
      JSON.stringify(schema);

    document.head.appendChild(
      schemaScript
    );

    return () => {
      const currentSchema =
        document.head.querySelector(
          'script[data-seo="terms"]'
        );

      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="terms-page">

        {/* =========================================
            TERMS HEADER
        ========================================= */}

        <section className="terms-header">

          <div className="terms-header-line"></div>

          <span className="terms-eyebrow">
            KHEL AUR SHIKSHA FOUNDATION
          </span>

          <h1>
            TERMS &amp; CONDITIONS
          </h1>

          <p>
            Please read these Terms &amp; Conditions carefully before using
            our website or participating in our programs.
          </p>

        </section>

        {/* =========================================
            TERMS CONTENT
        ========================================= */}

        <section className="terms-content-section">

          <div className="terms-content">

            <p>
              Welcome to <strong>Khel Aur Shiksha Foundation</strong>{" "}
              (“we,” “our,” or “us”). By accessing or using our website,
              social media pages, or participating in any of our programs,
              you agree to comply with these Terms and Conditions. Please
              read them carefully.
            </p>

            <p>
              Khel Aur Shiksha Foundation is a nonprofit organization founded
              in 2025 with the mission to identify and nurture young football
              talent from underprivileged communities. We provide training,
              education, and opportunities for aspiring footballers.
            </p>

            {/* =========================================
                ELIGIBILITY
            ========================================= */}

            <div className="terms-block">

              <h2>Eligibility</h2>

              <ol>

                <li>
                  Our programs are open primarily to youth from
                  underprivileged backgrounds, subject to our selection
                  criteria.
                </li>

                <li>
                  By registering or applying, you confirm that all
                  information provided is accurate and truthful.
                </li>

                <li>
                  Minors must have parental or guardian consent to
                  participate.
                </li>

              </ol>

            </div>

            {/* =========================================
                WEBSITE & SOCIAL MEDIA
            ========================================= */}

            <div className="terms-block">

              <h2>
                Use of Website &amp; Social Media
              </h2>

              <ul>

                <li>
                  You may use our website and social media platforms for
                  informational and non-commercial purposes only.
                </li>

                <li>
                  Unauthorized use of our content, including our slogan
                  <strong> “#GrassrootsToGlory”</strong>, logos, or training
                  materials, is prohibited without prior written consent.
                </li>

                <li>
                  You agree not to engage in any activity that may damage,
                  disrupt, or impair our platforms.
                </li>

              </ul>

            </div>

            {/* =========================================
                PROGRAM PARTICIPATION
            ========================================= */}

            <div className="terms-block">

              <h2>Program Participation</h2>

              <ul>

                <li>
                  Participation in training sessions, events, or tournaments
                  is subject to availability, eligibility, and selection by
                  our coaches and management.
                </li>

                <li>
                  The Foundation reserves the right to modify, suspend, or
                  cancel programs without prior notice.
                </li>

                <li>
                  We are not liable for injuries, losses, or damages arising
                  during training or matches. Participants are encouraged to
                  follow safety and medical guidance at all times.
                </li>

              </ul>

            </div>

            {/* =========================================
                DONATIONS
            ========================================= */}

            <div className="terms-block">

              <h2>Donations &amp; Funding</h2>

              <ul>

                <li>
                  As a nonprofit, we may receive donations and sponsorships
                  to support our activities.
                </li>

                <li>
                  All donations are non-refundable and used strictly for
                  program development and organizational sustainability.
                </li>

              </ul>

            </div>

            {/* =========================================
                PRIVACY
            ========================================= */}

            <div className="terms-block">

              <h2>Privacy &amp; Data Protection</h2>

              <ul>

                <li>
                  We respect your privacy. Any personal information shared
                  with us, such as name, contact details, or application
                  data, will be handled according to our{" "}
                  <a href="/privacy-policy">
                    Privacy Policy
                  </a>.
                </li>

                <li>
                  We do not sell or misuse participant data.
                </li>

              </ul>

            </div>

            {/* =========================================
                INTELLECTUAL PROPERTY
            ========================================= */}

            <div className="terms-block">

              <h2>Intellectual Property</h2>

              <ul>

                <li>
                  All content on our platforms, including text, images,
                  videos, and training resources, is the property of
                  Khel Aur Shiksha Foundation unless otherwise stated.
                </li>

                <li>
                  You may not copy, reproduce, or distribute our content
                  without permission.
                </li>

              </ul>

            </div>

            {/* =========================================
                LIABILITY
            ========================================= */}

            <div className="terms-block">

              <h2>Limitation of Liability</h2>

              <ul>

                <li>
                  Khel Aur Shiksha Foundation provides training and
                  opportunities on a goodwill, nonprofit basis.
                </li>

                <li>
                  We are not responsible for indirect, incidental, or
                  consequential damages that may arise from participation
                  in our programs or use of our website.
                </li>

              </ul>

            </div>

            {/* =========================================
                CODE OF CONDUCT
            ========================================= */}

            <div className="terms-block">

              <h2>Code of Conduct</h2>

              <ul>

                <li>
                  Participants and visitors are expected to act with
                  respect, discipline, and sportsmanship.
                </li>

                <li>
                  Any form of misconduct, discrimination, or harassment
                  will not be tolerated and may result in removal from
                  our programs.
                </li>

              </ul>

            </div>

            {/* =========================================
                CHANGES
            ========================================= */}

            <div className="terms-block">

              <h2>Changes to Terms</h2>

              <p>
                We may update these Terms &amp; Conditions from time to time.
                Any changes will be posted on our website with the updated
                date.
              </p>

            </div>

            {/* =========================================
                CONTACT
            ========================================= */}

            <div className="terms-block">

              <h2>Contact Us</h2>

              <p>
                For questions or concerns regarding these Terms, please
                contact us at:
              </p>

              <div className="terms-contact">

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

export default Terms;