import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./News.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/news`;

function News() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     SEO
  ========================================================= */

  useEffect(() => {
    const siteName =
      "Khel Aur Shiksha Foundation";

    const title =
      "News | Khel Aur Shiksha Foundation";

    const description =
      "Discover the latest news, stories, achievements, community activities, football development programs and journeys from Khel Aur Shiksha Foundation.";

    const keywords =
      "Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation news, Khel Aur Shiksha Foundation latest news, Khel Aur Shiksha Foundation football, Khel Aur Shiksha Foundation achievements, Khel Aur Shiksha Foundation community, Khel Aur Shiksha Foundation football programs, Khel Aur Shiksha Foundation stories";

    const currentUrl =
      `${window.location.origin}/news`;

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
        "kas-foundation-news-structured-data"
      );

    if (!structuredData) {
      structuredData =
        document.createElement(
          "script"
        );

      structuredData.id =
        "kas-foundation-news-structured-data";

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
          "CollectionPage",

        name: title,

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
          "kas-foundation-news-structured-data"
        );

      if (existingStructuredData) {
        existingStructuredData.remove();
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(API_URL);

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch news."
          );
        }

        setNewsArticles(
          data.news || []
        );
      } catch (err) {
        console.error(
          "News fetch error:",
          err
        );

        setError(
          err.message ||
            "Unable to load news articles."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Navbar />

      <main className="news-page">

        {/* =========================================
            HEADER
        ========================================= */}

        <section className="news-header">

          <div className="news-header-line"></div>

          <h1>
            KHEL AUR SHIKSHA FOUNDATION NEWS
          </h1>

          <p>
            Discover the latest stories,
            achievements, community activities,
            football development programs, and
            journeys from Khel Aur Shiksha Foundation.
          </p>

        </section>


        {/* =========================================
            NEWS CARDS
        ========================================= */}

        <section className="news-section">

          <div className="news-grid">

            {loading ? (
              <div className="news-loading">
                Loading news...
              </div>
            ) : error ? (
              <div className="news-error">
                {error}
              </div>
            ) : newsArticles.length === 0 ? (
              <div className="news-empty">
                No news articles available.
              </div>
            ) : (
              newsArticles.map(
                (article, index) => (
                  <article
                    className="news-card"
                    key={article._id}
                    style={{
                      "--news-delay":
                        `${index * 0.08}s`,
                    }}
                  >

                    {/* =========================================
                        LEFT HALF - IMAGE
                    ========================================= */}

                    <Link
                      to={`/news/${article.slug}/`}
                      className="news-image-link"
                    >

                      <div className="news-image-wrapper">

                        {article.image?.fileId ? (
                          <img
                            src={`${API_URL}/image/${article.image.fileId}`}
                            alt={article.title}
                            className="news-image"
                          />
                        ) : (
                          <div className="news-image-placeholder"></div>
                        )}

                        <div className="news-image-overlay">

                          <span>
                            READ ARTICLE
                          </span>

                          <ArrowRight
                            size={19}
                          />

                        </div>

                      </div>

                    </Link>


                    {/* =========================================
                        RIGHT HALF - CONTENT
                    ========================================= */}

                    <div className="news-content">

                      <span className="news-date">
                        {article.date}
                      </span>

                      <div className="news-content-middle">

                        <h2>
                          {article.title}
                        </h2>

                        <p className="news-card-description">
                          {article.shortDescription}
                        </p>

                      </div>

                      <Link
                        to={`/news/${article.slug}/`}
                        className="news-read-more"
                      >

                        <span>
                          READ MORE
                        </span>

                        <ArrowRight
                          size={18}
                        />

                      </Link>

                    </div>

                  </article>
                )
              )
            )}

          </div>

        </section>

        <JoinCommunity />

      </main>
    </>
  );
}

export default News;