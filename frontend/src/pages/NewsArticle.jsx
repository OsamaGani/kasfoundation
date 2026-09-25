import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JoinCommunity from "../components/JoinCommunity";

import "./NewsArticle.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/news`;

function NewsArticle() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError("");
        setArticle(null);

        const response = await fetch(
          `${API_URL}/slug/${slug}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "News article not found."
          );
        }

        setArticle(data.news);
      } catch (err) {
        console.error(
          "News article fetch error:",
          err
        );

        setError(
          err.message ||
            "Unable to load news article."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  /* =========================================
     SEO
  ========================================= */

  useEffect(() => {
    if (!article) {
      return;
    }

    const siteName = "Khel Aur Shiksha Foundation";

    const articleTitle =
      article.title || "News Article";

    const title = `${articleTitle} | Khel Aur Shiksha Foundation`;

    const rawDescription =
      article.shortDescription ||
      article.description ||
      "Read the latest news, stories, achievements and updates from Khel Aur Shiksha Foundation.";

    const description = rawDescription
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);

    const keywords =
      `${articleTitle}, Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation news, Khel Aur Shiksha Foundation latest news, Khel Aur Shiksha Foundation stories, Khel Aur Shiksha Foundation football, Khel Aur Shiksha Foundation achievements, Khel Aur Shiksha Foundation community, Khel Aur Shiksha Foundation programs`;

    const currentUrl = window.location.href;
    const siteUrl = window.location.origin;

    const imageUrl = article.image?.fileId
      ? `${API_URL}/image/${article.image.fileId}`
      : `${siteUrl}/logo.png`;

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
      "article"
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
      imageUrl
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
      imageUrl
    );

    setLink(
      "canonical",
      currentUrl
    );

    const existingSchema =
      document.head.querySelector(
        'script[data-seo="news-article"]'
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: articleTitle,
      description,
      url: currentUrl,
      image: [imageUrl],
      datePublished:
        article.date || undefined,
      dateModified:
        article.date || undefined,
      author: {
        "@type": "Organization",
        name: siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": currentUrl,
      },
    };

    const schemaScript =
      document.createElement("script");

    schemaScript.type =
      "application/ld+json";

    schemaScript.setAttribute(
      "data-seo",
      "news-article"
    );

    schemaScript.textContent =
      JSON.stringify(schema);

    document.head.appendChild(
      schemaScript
    );

    return () => {
      const currentSchema =
        document.head.querySelector(
          'script[data-seo="news-article"]'
        );

      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, [article]);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="news-article-page">
          <section className="news-article-hero">
            <h1>LOADING ARTICLE...</h1>

            <Link
              to="/news"
              className="news-article-back"
            >
              <ArrowLeft size={16} />
              BACK TO NEWS
            </Link>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  /* =========================================
     ARTICLE NOT FOUND / ERROR
  ========================================= */

  if (!article || error) {
    return (
      <>
        <Navbar />

        <main className="news-article-page">
          <section className="news-article-hero">
            <h1>NEWS ARTICLE NOT FOUND</h1>

            <Link
              to="/news"
              className="news-article-back"
            >
              <ArrowLeft size={16} />
              BACK TO NEWS
            </Link>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  /* =========================================
     DESCRIPTION PARAGRAPHS
  ========================================= */

  const paragraphs = article.description
    ? article.description
        .split("\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : article.shortDescription
    ? article.shortDescription
        .split("\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  /* =========================================
     ARTICLE IMAGE
  ========================================= */

  const imageURL = article.image?.fileId
    ? `${API_URL}/image/${article.image.fileId}`
    : null;

  return (
    <>
      <Navbar />

      <main className="news-article-page">
        <section className="news-article-hero">
          <Link
            to="/news"
            className="news-article-back"
          >
            <ArrowLeft size={16} />
            BACK TO NEWS
          </Link>

          <div className="news-article-layout">

            {/* =========================================
                IMAGE HALF
            ========================================= */}

            <div className="news-article-image">
              {imageURL ? (
                <img
                  src={imageURL}
                  alt={article.title}
                />
              ) : (
                <div className="news-article-image-placeholder"></div>
              )}
            </div>

            {/* =========================================
                CONTENT HALF
            ========================================= */}

            <div className="news-article-content">
              <span className="news-article-date">
                {article.date}
              </span>

              <h1>{article.title}</h1>

              <div className="news-article-line"></div>

              {paragraphs.length > 0 ? (
                paragraphs.map(
                  (paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  )
                )
              ) : (
                <p>
                  No detailed information has
                  been added for this news
                  article yet.
                </p>
              )}

              <Link
                to="/contact"
                className="news-article-contact"
              >
                CONTACT US
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <JoinCommunity />
      </main>

      {/* =========================================
          FLOATING CONTACT
      ========================================= */}

      <div className="news-article-floating-contact">
        <a
          href="tel:+919004630950"
          className="news-article-phone"
          aria-label="Call us"
        >
          <Phone size={23} />
        </a>

        <a
          href="https://wa.me/919004630950"
          target="_blank"
          rel="noopener noreferrer"
          className="news-article-whatsapp"
          aria-label="WhatsApp"
        >
          <MessageCircle
            size={28}
            strokeWidth={2.5}
          />
        </a>
      </div>

      <Footer />
    </>
  );
}

export default NewsArticle;