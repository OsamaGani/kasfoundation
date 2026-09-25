import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./FAQ.css";

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const siteName = "Khel Aur Shiksha Foundation";

    const title =
      "Frequently Asked Questions | Khel Aur Shiksha Foundation";

    const description =
      "Find answers to common questions about Khel Aur Shiksha Foundation, including football programs, players, parents, donations, volunteers, coaches, and community initiatives.";

    const keywords =
      "Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation FAQ, Khel Aur Shiksha Foundation frequently asked questions, Khel Aur Shiksha Foundation football, Khel Aur Shiksha Foundation players, Khel Aur Shiksha Foundation parents, Khel Aur Shiksha Foundation donations, Khel Aur Shiksha Foundation volunteers, Khel Aur Shiksha Foundation coaches";

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
        'script[data-seo="faq"]'
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    const faqEntities = [];

    faqSections.forEach((section) => {
      section.questions.forEach((item) => {
        faqEntities.push({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        });
      });
    });

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: title,
      description,
      url: currentUrl,
      mainEntity: faqEntities,
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
      "faq"
    );

    schemaScript.textContent =
      JSON.stringify(schema);

    document.head.appendChild(
      schemaScript
    );

    return () => {
      const currentSchema =
        document.head.querySelector(
          'script[data-seo="faq"]'
        );

      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, []);

  const toggleQuestion = (index) => {
    setOpenQuestion(
      openQuestion === index
        ? null
        : index
    );
  };

  const faqSections = [
    {
      title: "About Khel Aur Shiksha Foundation",
      questions: [
        {
          question:
            "What is Khel Aur Shiksha Foundation?",
          answer:
            "Khel Aur Shiksha Foundation is a football development foundation dedicated to discovering, nurturing, and empowering talented children through football.",
        },
        {
          question:
            "Where does Khel Aur Shiksha Foundation operate?",
          answer:
            "We currently operate through our football and community initiatives with a growing network of training centers.",
        },
        {
          question:
            "Who founded Khel Aur Shiksha Foundation?",
          answer:
            "Khel Aur Shiksha Foundation was founded with a vision to provide young footballers with opportunities to develop their talent and reach higher levels of football.",
        },
      ],
    },

    {
      title: "For Players & Parents",
      questions: [
        {
          question:
            "At what age can children join the programs?",
          answer:
            "We accept players from under-10 to under-17 levels through tailored development pathways.",
        },
        {
          question:
            "Is there a fee to join?",
          answer:
            "Our programs are designed to make football accessible to children, especially those from underprivileged communities. Program availability and participation conditions may vary by location and initiative.",
        },
        {
          question:
            "How can my child get selected?",
          answer:
            "Selections may be made through open trials, referrals from schools, and scouting at local communities. Details are announced through our website and social media pages.",
        },
      ],
    },

    {
      title: "For Donors & Supporters",
      questions: [
        {
          question:
            "How can I support the foundation's mission?",
          answer:
            "You can support us by donating, sponsoring a child, funding equipment, or partnering with us to expand football opportunities for young players.",
        },
        {
          question:
            "Are donations tax-deductible?",
          answer:
            "Donation-related tax benefits depend on the applicable registration status, documentation, and local regulations. Please contact the foundation for current details.",
        },
        {
          question:
            "Can I sponsor a specific player or team?",
          answer:
            "Sponsorship opportunities may be available for individual players, teams, or development programs. Please contact us to discuss available sponsorship options.",
        },
      ],
    },

    {
      title: "For Volunteers & Coaches",
      questions: [
        {
          question:
            "Can I volunteer with Khel Aur Shiksha Foundation?",
          answer:
            "Absolutely. We welcome volunteers who can contribute in areas such as coaching, events, administration, and fundraising. You can contact us to learn about current opportunities.",
        },
        {
          question:
            "Do you offer coaching opportunities?",
          answer:
            "Yes. Certified coaches and aspiring trainers may have opportunities to join our structured programs and receive mentorship under experienced professionals.",
        },
      ],
    },

    {
      title: "General Questions",
      questions: [
        {
          question:
            "What is the foundation's long-term vision?",
          answer:
            "Our goal is to build a strong football development system that helps young players grow through football, education, discipline, and meaningful opportunities.",
        },
        {
          question:
            "How can I stay updated about the foundation?",
          answer:
            "Follow our social media channels, subscribe to our newsletter, and visit our website regularly for updates about trials, events, programs, and other activities.",
        },
        {
          question:
            "How can I contact Khel Aur Shiksha Foundation?",
          answer:
            "You can reach us through the Contact Us section of our website, by email at mailnow.kasf@gmail.com, or by phone at +91 9004630950.",
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <main className="faq-page">

        {/* =========================================
            FAQ HEADER
        ========================================= */}

        <section className="faq-header">

          <div className="faq-header-line"></div>

          <span className="faq-eyebrow">
            KHEL AUR SHIKSHA FOUNDATION
          </span>

          <h1>
            FREQUENTLY ASKED QUESTIONS
          </h1>

          <p>
            Find answers to common questions about our programs, players,
            supporters, volunteers, and foundation.
          </p>

        </section>

        {/* =========================================
            FAQ CONTENT
        ========================================= */}

        <section className="faq-content-section">

          <div className="faq-content">

            {faqSections.map(
              (section, sectionIndex) => (
                <div
                  className="faq-section"
                  key={section.title}
                >

                  <h2>{section.title}</h2>

                  <div className="faq-list">

                    {section.questions.map(
                      (item, questionIndex) => {
                        const index =
                          `${sectionIndex}-${questionIndex}`;

                        const isOpen =
                          openQuestion === index;

                        return (
                          <div
                            className={`faq-item ${
                              isOpen
                                ? "faq-item-open"
                                : ""
                            }`}
                            key={item.question}
                          >

                            <button
                              type="button"
                              className="faq-question"
                              onClick={() =>
                                toggleQuestion(index)
                              }
                              aria-expanded={isOpen}
                            >

                              <span>
                                {item.question}
                              </span>

                              <span className="faq-plus">

                                <span className="faq-plus-horizontal"></span>

                                <span className="faq-plus-vertical"></span>

                              </span>

                            </button>

                            <div
                              className={`faq-answer-wrapper ${
                                isOpen
                                  ? "faq-answer-open"
                                  : ""
                              }`}
                            >

                              <div className="faq-answer">

                                <p>
                                  {item.answer}
                                </p>

                              </div>

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>
              )
            )}

          </div>

        </section>

        <JoinCommunity />

      </main>
    </>
  );
}

export default FAQ;