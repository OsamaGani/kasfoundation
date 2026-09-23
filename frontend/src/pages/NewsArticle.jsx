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

const API_URL = "http://localhost:5000/api/news";

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